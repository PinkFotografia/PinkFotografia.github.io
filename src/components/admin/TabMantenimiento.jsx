import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { compressImage } from '../../lib/imageCompress'

function extractPath(url) {
  try {
    const pathname = new URL(url).pathname
    const marker = '/storage/v1/object/public/imagenes/'
    const idx = pathname.indexOf(marker)
    if (idx === -1) return null
    return decodeURIComponent(pathname.slice(idx + marker.length))
  } catch {
    return null
  }
}

async function reoptimizePath(path) {
  const { data: pub } = supabase.storage.from('imagenes').getPublicUrl(path)
  const res = await fetch(pub.publicUrl)
  if (!res.ok) throw new Error(`No se pudo descargar (${res.status})`)
  const blob = await res.blob()
  const originalSize = blob.size
  const file = new File([blob], path.split('/').pop(), { type: blob.type || 'image/jpeg' })
  const compressed = await compressImage(file)

  if (compressed.size >= originalSize) {
    return { originalSize, newSize: originalSize, skipped: true }
  }
  const { error } = await supabase.storage.from('imagenes').upload(path, compressed, { upsert: true })
  if (error) throw error
  return { originalSize, newSize: compressed.size, skipped: false }
}

export default function TabMantenimiento() {
  const [running, setRunning] = useState(false)
  const [log, setLog] = useState([])
  const [summary, setSummary] = useState(null)

  async function handleRun() {
    if (!window.confirm(
      'Esto va a descargar y volver a subir todas las fotos ya existentes para achicarlas (álbumes, temáticas, hero, servicios, sobre mí). ' +
      'Puede tardar varios minutos y consume cuota de transferencia de Supabase. ¿Continuar?'
    )) return

    setRunning(true)
    setLog([])
    setSummary(null)

    let totalOriginal = 0
    let totalNew = 0
    let processed = 0
    let skipped = 0
    let failed = 0

    const addLog = (msg) => setLog(prev => [...prev, msg])

    const { data: albumes, error: albErr } = await supabase.from('albumes').select('*')
    if (albErr) {
      addLog(`Error leyendo álbumes: ${albErr.message}`)
      setRunning(false)
      return
    }

    for (const album of albumes || []) {
      const fotos = Array.isArray(album.fotos) ? album.fotos : []
      const newFotos = [...fotos]
      let changed = false

      for (let i = 0; i < fotos.length; i++) {
        const path = extractPath(fotos[i])
        if (!path) continue
        const label = `${album.nombre || album.categoria} · foto ${i + 1}`
        try {
          const { originalSize, newSize, skipped: wasSkipped } = await reoptimizePath(path)
          totalOriginal += originalSize
          totalNew += newSize
          if (wasSkipped) {
            skipped++
            addLog(`— ${label} ya era liviana (${(originalSize / 1024).toFixed(0)}KB)`)
          } else {
            processed++
            changed = true
            const { data } = supabase.storage.from('imagenes').getPublicUrl(path)
            newFotos[i] = `${data.publicUrl}?t=${Date.now()}`
            addLog(`✓ ${label} — ${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB`)
          }
        } catch (err) {
          failed++
          addLog(`✗ ${label} — ${err.message}`)
        }
      }

      if (changed) {
        await supabase.from('albumes').update({ fotos: newFotos }).eq('id', album.id)
      }
    }

    const { data: config, error: cfgErr } = await supabase.from('configuracion').select('*')
    if (cfgErr) {
      addLog(`Error leyendo configuración: ${cfgErr.message}`)
    } else {
      for (const row of config || []) {
        const path = extractPath(row.valor || '')
        if (!path) continue
        try {
          const { originalSize, newSize, skipped: wasSkipped } = await reoptimizePath(path)
          totalOriginal += originalSize
          totalNew += newSize
          if (wasSkipped) {
            skipped++
            addLog(`— ${row.clave} ya era liviana (${(originalSize / 1024).toFixed(0)}KB)`)
          } else {
            processed++
            const { data } = supabase.storage.from('imagenes').getPublicUrl(path)
            await supabase
              .from('configuracion')
              .upsert({ clave: row.clave, valor: `${data.publicUrl}?t=${Date.now()}` }, { onConflict: 'clave' })
            addLog(`✓ ${row.clave} — ${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB`)
          }
        } catch (err) {
          failed++
          addLog(`✗ ${row.clave} — ${err.message}`)
        }
      }
    }

    setSummary({ totalOriginal, totalNew, processed, skipped, failed })
    setRunning(false)
  }

  return (
    <div className="p-4 md:p-8 max-w-[800px]">
      <h1 className="text-[1.4rem] font-serif italic text-white/80 mb-2">Mantenimiento</h1>
      <p className="text-[13px] text-white/35 mb-6 leading-relaxed">
        Achica las fotos que ya están subidas (álbumes, temáticas, hero, servicios, sobre mí) sin
        cambiar cómo se ven en el sitio. Sirve para bajar el consumo de transferencia de Supabase
        y evitar que se vuelva a bloquear el servicio.
      </p>

      <button
        onClick={handleRun}
        disabled={running}
        className="bg-pink text-white px-5 py-2 rounded-[6px] text-[11px] tracking-[0.08em] uppercase font-sans hover:bg-pink-dark transition-colors disabled:opacity-50 mb-6"
      >
        {running ? 'Optimizando…' : 'Optimizar fotos existentes'}
      </button>

      {summary && (
        <div className="bg-[#1A1A1A] rounded-[10px] p-5 border border-white/[0.06] mb-6 text-[13px] text-white/70 font-sans">
          <div>{summary.processed} fotos optimizadas, {summary.skipped} ya estaban livianas, {summary.failed} con error.</div>
          {summary.totalOriginal > 0 && (
            <div className="mt-1 text-emerald-400/80">
              {(summary.totalOriginal / 1024 / 1024).toFixed(1)} MB → {(summary.totalNew / 1024 / 1024).toFixed(1)} MB
            </div>
          )}
        </div>
      )}

      {log.length > 0 && (
        <div className="bg-[#111] rounded-[10px] border border-white/[0.06] p-4 max-h-[420px] overflow-y-auto text-[11px] font-mono text-white/40 space-y-1">
          {log.map((line, i) => <div key={i}>{line}</div>)}
        </div>
      )}
    </div>
  )
}

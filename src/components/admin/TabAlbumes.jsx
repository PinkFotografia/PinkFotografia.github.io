import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../lib/supabase'
import { CATEGORIES } from '../../lib/categories'

export default function TabAlbumes() {
  const [categoria, setCategoria] = useState('estudio')
  const [albumes, setAlbumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ nombre: '', fecha: '' })
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 0 })
  const [error, setError] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => { fetchAlbumes() }, [categoria])

  async function fetchAlbumes() {
    setLoading(true)
    const { data } = await supabase
      .from('albumes')
      .select('*')
      .eq('categoria', categoria)
      .order('created_at', { ascending: false })
    setAlbumes(data || [])
    setLoading(false)
  }

  function addFiles(newFiles) {
    const imgs = [...newFiles].filter(f => f.type.startsWith('image/'))
    setFiles(prev => {
      const combined = [...prev, ...imgs]
      setPreviews(combined.map(f => URL.createObjectURL(f)))
      return combined
    })
  }

  function removeFile(i) {
    setFiles(prev => {
      const next = prev.filter((_, idx) => idx !== i)
      setPreviews(next.map(f => URL.createObjectURL(f)))
      return next
    })
  }

  function resetForm() {
    setShowForm(false)
    setForm({ nombre: '', fecha: '' })
    setFiles([])
    setPreviews([])
    setError(null)
  }

  async function handleSave(e) {
    e.preventDefault()
    if (!files.length) { setError('Seleccioná al menos una foto.'); return }
    setUploading(true)
    setError(null)
    const albumId = Date.now()
    const urls = []

    try {
      for (let i = 0; i < files.length; i++) {
        setProgress({ current: i + 1, total: files.length })
        const f = files[i]
        const ext = f.name.split('.').pop().toLowerCase()
        const path = `albumes/${categoria}/${albumId}/${i + 1}.${ext}`
        const { error: upErr } = await supabase.storage
          .from('imagenes')
          .upload(path, f, { upsert: true })
        if (upErr) throw upErr
        const { data } = supabase.storage.from('imagenes').getPublicUrl(path)
        urls.push(data.publicUrl)
      }

      const { error: dbErr } = await supabase.from('albumes').insert({
        categoria,
        nombre: form.nombre,
        fecha: form.fecha || null,
        fotos: urls,
        activo: true,
      })
      if (dbErr) throw dbErr

      resetForm()
      fetchAlbumes()
    } catch (err) {
      setError(err.message)
    }
    setUploading(false)
    setProgress({ current: 0, total: 0 })
  }

  async function handleDelete(id) {
    if (!window.confirm('¿Eliminar este álbum?')) return
    await supabase.from('albumes').delete().eq('id', id)
    fetchAlbumes()
  }

  return (
    <div className="p-8 max-w-[1000px]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[1.4rem] font-serif italic text-white/80">Álbumes</h1>
        <button
          onClick={() => { setShowForm(v => !v); setError(null) }}
          className="bg-pink text-white px-5 py-2 rounded-[6px] text-[11px] tracking-[0.08em] uppercase font-sans hover:bg-pink-dark transition-colors"
        >
          + Nuevo álbum
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {Object.entries(CATEGORIES).map(([key, cat]) => (
          <button
            key={key}
            onClick={() => { setCategoria(key); setShowForm(false) }}
            className={`text-[11px] tracking-[0.08em] uppercase px-4 py-[0.4rem] rounded-[20px] border font-sans transition-colors
              ${categoria === key
                ? 'bg-pink text-white border-pink'
                : 'bg-transparent text-white/35 border-white/10 hover:text-white/60 hover:border-white/20'
              }`}
          >
            {cat.es}
          </button>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSave} className="bg-[#1A1A1A] rounded-[10px] p-6 border border-white/[0.06] mb-8">
          <div className="text-[10px] tracking-[0.12em] uppercase text-white/30 mb-5">Nuevo álbum</div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-[10px] tracking-[0.08em] uppercase text-white/30 mb-1">Nombre *</label>
              <input
                type="text"
                value={form.nombre}
                onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                required
                placeholder="Ej: Familia García · 2025"
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-[6px] px-3 py-[0.55rem] text-[13px] text-white/80 placeholder:text-white/15 focus:outline-none focus:border-pink"
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.08em] uppercase text-white/30 mb-1">Año / fecha</label>
              <input
                type="text"
                value={form.fecha}
                onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))}
                placeholder="Ej: 2025"
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-[6px] px-3 py-[0.55rem] text-[13px] text-white/80 placeholder:text-white/15 focus:outline-none focus:border-pink"
              />
            </div>
          </div>

          {/* Drop zone */}
          <div className="mb-5">
            <label className="block text-[10px] tracking-[0.08em] uppercase text-white/30 mb-2">
              Fotos * <span className="text-white/20 normal-case tracking-normal">— la primera es la portada</span>
            </label>
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files) }}
              onClick={() => inputRef.current?.click()}
              className={`border-2 border-dashed rounded-[8px] p-8 text-center cursor-pointer transition-colors
                ${dragOver ? 'border-pink bg-pink/[0.06]' : 'border-white/10 hover:border-white/20'}`}
            >
              <div className="text-3xl mb-2">📸</div>
              <div className="text-[13px] text-white/35">
                Arrastrá las fotos acá o <span className="text-pink">hacé clic para seleccionar</span>
              </div>
              <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={e => addFiles(e.target.files)}
              />
            </div>

            {previews.length > 0 && (
              <div className="grid grid-cols-5 gap-2 mt-3">
                {previews.map((src, i) => (
                  <div key={i} className="relative aspect-square rounded-[6px] overflow-hidden bg-white/[0.05]">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white rounded-full text-[12px] leading-none flex items-center justify-center hover:bg-red-500 transition-colors"
                    >
                      ×
                    </button>
                    {i === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-[9px] text-white/70 text-center py-[2px] font-sans">
                        portada
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Progress bar */}
          {uploading && (
            <div className="mb-5">
              <div className="flex justify-between text-[11px] text-white/30 mb-1 font-sans">
                <span>Subiendo foto {progress.current} de {progress.total}…</span>
                <span>{Math.round((progress.current / progress.total) * 100)}%</span>
              </div>
              <div className="h-[4px] bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full bg-pink rounded-full transition-all duration-300"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
                />
              </div>
            </div>
          )}

          {error && <p className="text-red-400 text-[12px] mb-4 font-sans">{error}</p>}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={uploading}
              className="bg-pink text-white px-5 py-2 rounded-[6px] text-[11px] tracking-[0.08em] uppercase font-sans hover:bg-pink-dark transition-colors disabled:opacity-50"
            >
              {uploading ? `Subiendo ${progress.current}/${progress.total}…` : 'Guardar álbum'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="text-white/35 hover:text-white text-[11px] tracking-[0.08em] uppercase font-sans transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Albums grid */}
      {loading ? (
        <div className="text-white/20 text-[13px] text-center py-16 font-sans">Cargando…</div>
      ) : albumes.length === 0 ? (
        <div className="text-white/20 text-[13px] text-center py-16 font-sans">No hay álbumes para esta categoría</div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {albumes.map(a => {
            const fotos = Array.isArray(a.fotos) ? a.fotos : []
            return (
              <div key={a.id} className="bg-[#1A1A1A] rounded-[10px] border border-white/[0.06] overflow-hidden">
                {fotos[0] && (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={fotos[0]} alt={a.nombre} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-4">
                  <div className="font-serif italic text-[1rem] text-white/75 mb-1 truncate">{a.nombre}</div>
                  <div className="text-[11px] text-white/30 mb-3 font-sans">
                    {fotos.length} {fotos.length === 1 ? 'foto' : 'fotos'}{a.fecha ? ` · ${a.fecha}` : ''}
                  </div>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="text-[11px] text-white/25 hover:text-red-400 transition-colors font-sans"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

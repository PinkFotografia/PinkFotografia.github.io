import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../lib/supabase'
import { CATEGORIES } from '../../lib/categories'

// ─── Config keys ─────────────────────────────────────────────────────────────
const HERO_SLOTS = [
  { key: 'hero1', label: 'Posición 1', path: 'hero/hero1' },
  { key: 'hero2', label: 'Posición 2', path: 'hero/hero2' },
  { key: 'hero3', label: 'Posición 3', path: 'hero/hero3' },
  { key: 'hero4', label: 'Posición 4', path: 'hero/hero4' },
  { key: 'hero5', label: 'Posición 5', path: 'hero/hero5' },
]

const SOBREMI_SLOTS = [
  { key: 'sobremi1', label: 'Foto 1', path: 'sobremi/sobremi1' },
  { key: 'sobremi2', label: 'Foto 2', path: 'sobremi/sobremi2' },
  { key: 'sobremi3', label: 'Foto 3', path: 'sobremi/sobremi3' },
  { key: 'sobremi4', label: 'Foto 4', path: 'sobremi/sobremi4' },
  { key: 'sobremi5', label: 'Foto 5', path: 'sobremi/sobremi5' },
]

const SERVICIO_SLOTS = [
  { key: 'srv-estudio',    label: 'Pre Cumple',           path: 'servicios/srv-estudio'    },
  { key: 'srv-cake-smash', label: 'Cake Smash',           path: 'servicios/srv-cake-smash' },
  { key: 'srv-embarazo',   label: 'Maternidad',           path: 'servicios/srv-embarazo'   },
  { key: 'srv-exterior',   label: 'Individual / Familiar', path: 'servicios/srv-exterior'   },
  { key: 'srv-pelotero',   label: 'Pelotero',             path: 'servicios/srv-pelotero'   },
  { key: 'srv-evento',     label: 'Evento Social',        path: 'servicios/srv-evento'     },
  { key: 'srv-casamiento', label: 'Casamientos',          path: 'servicios/srv-casamiento' },
  { key: 'srv-quince',     label: '15 Años',              path: 'servicios/srv-quince'     },
  { key: 'srv-bautismo',   label: 'Bautismo',             path: 'servicios/srv-bautismo'   },
  { key: 'srv-comunion',   label: 'Comuniones',           path: 'servicios/srv-comunion'   },
  { key: 'srv-babyshower', label: 'Baby Shower',          path: 'servicios/srv-babyshower' },
  { key: 'srv-revelacion', label: 'Revelación de Género', path: 'servicios/srv-revelacion' },
  { key: 'srv-combo',      label: 'Combo',                path: 'servicios/srv-combo'      },
  { key: 'srv-productos',  label: 'Productos',            path: 'servicios/srv-productos'  },
  { key: 'srv-temporada',  label: 'Temporada',            path: 'servicios/srv-temporada'  },
]

const PORTFOLIO_SLOTS = Object.entries(CATEGORIES).map(([key, cat]) => ({
  key: `port-${key}`,
  label: cat.es,
  path: `portfolio/${key}`,
}))

// ─── Helpers ──────────────────────────────────────────────────────────────────
async function uploadAndSave(storagePath, file, configKey, onProgress) {
  const ext = file.name.split('.').pop().toLowerCase()
  const fullPath = `${storagePath}.${ext}`

  const { error: upErr } = await supabase.storage
    .from('imagenes')
    .upload(fullPath, file, { upsert: true })
  if (upErr) throw upErr

  const { data } = supabase.storage.from('imagenes').getPublicUrl(fullPath)
  const url = data.publicUrl + `?t=${Date.now()}`

  const { error: dbErr } = await supabase
    .from('configuracion')
    .upsert({ clave: configKey, valor: url }, { onConflict: 'clave' })
  if (dbErr) throw dbErr

  return url
}

// ─── ImageSlot ────────────────────────────────────────────────────────────────
function ImageSlot({ slot, currentUrl, onUploaded }) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState(null)
  const inputRef = useRef(null)

  async function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    setUploading(true)
    setError(null)
    try {
      const url = await uploadAndSave(slot.path, file, slot.key)
      onUploaded(slot.key, url)
      setPreview(null)
    } catch (err) {
      setError(err.message)
      setPreview(null)
    }
    setUploading(false)
    e.target.value = ''
  }

  const displayUrl = preview || currentUrl

  return (
    <div className="bg-[#111] rounded-[8px] border border-white/[0.06] overflow-hidden">
      {/* Image preview */}
      <div
        className="aspect-[4/3] relative overflow-hidden bg-white/[0.03] cursor-pointer group"
        onClick={() => !uploading && inputRef.current?.click()}
      >
        {displayUrl ? (
          <img src={displayUrl} alt={slot.label} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/10 text-[28px]">📷</div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] tracking-[0.1em] uppercase text-white font-sans">
            {uploading ? 'Subiendo…' : 'Cambiar'}
          </span>
        </div>
        {/* Uploading overlay */}
        {uploading && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white/20 border-t-pink rounded-full animate-spin" />
          </div>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>

      <div className="px-3 py-2">
        <div className="text-[10px] tracking-[0.08em] uppercase text-white/30 font-sans">{slot.label}</div>
        {currentUrl && !error && (
          <div className="text-[9px] text-emerald-400/60 font-sans mt-[2px]">✓ cargada</div>
        )}
        {!currentUrl && !error && (
          <div className="text-[9px] text-white/20 font-sans mt-[2px]">vacía</div>
        )}
        {error && (
          <div className="text-[9px] text-red-400 font-sans mt-[2px] truncate" title={error}>Error al subir</div>
        )}
      </div>
    </div>
  )
}

// ─── PortfolioNameSlot ────────────────────────────────────────────────────────
function PortfolioNameSlot({ catKey, defaultLabel, currentName, onSaved }) {
  const [value, setValue] = useState(currentName || '')
  const [saving, setSaving] = useState(false)

  useEffect(() => { setValue(currentName || '') }, [currentName])

  async function handleBlur() {
    const trimmed = value.trim()
    if (trimmed === (currentName || '')) return
    setSaving(true)
    await supabase
      .from('configuracion')
      .upsert({ clave: `port-label-${catKey}`, valor: trimmed || null }, { onConflict: 'clave' })
    onSaved(`port-label-${catKey}`, trimmed || '')
    setSaving(false)
  }

  return (
    <div className="bg-[#111] rounded-[8px] border border-white/[0.06] px-3 py-3">
      <div className="text-[9px] tracking-[0.08em] uppercase text-white/25 mb-1 font-sans">{defaultLabel}</div>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={handleBlur}
        placeholder={defaultLabel}
        className="w-full bg-transparent text-[13px] text-white/75 placeholder:text-white/20 focus:outline-none border-b border-white/10 focus:border-pink pb-[2px] transition-colors"
      />
      {saving && <div className="text-[9px] text-white/20 mt-1 font-sans">Guardando…</div>}
    </div>
  )
}

// ─── TabFotos ─────────────────────────────────────────────────────────────────
function TabFotos({ config, onConfigChange }) {
  const [section, setSection] = useState('hero')

  const sections = [
    { id: 'hero',      label: 'Hero (inicio)' },
    { id: 'servicios', label: 'Servicios (acordeón)' },
    { id: 'portfolio', label: 'Tarjetas de portafolio' },
    { id: 'sobremi',   label: 'Sobre mí' },
  ]

  function handleUploaded(key, url) {
    onConfigChange(key, url)
  }

  const slots =
    section === 'hero'      ? HERO_SLOTS :
    section === 'servicios' ? SERVICIO_SLOTS :
    section === 'portfolio' ? PORTFOLIO_SLOTS :
    SOBREMI_SLOTS

  return (
    <div>
      {/* Section switcher */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setSection(s.id)}
            className={`text-[11px] tracking-[0.08em] uppercase px-4 py-[0.4rem] rounded-[20px] border font-sans transition-colors
              ${section === s.id
                ? 'bg-pink text-white border-pink'
                : 'bg-transparent text-white/35 border-white/10 hover:text-white/60 hover:border-white/20'
              }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <p className="text-[12px] text-white/25 font-sans mb-5">
        {section === 'hero' && 'Las 5 fotos que rotan en el inicio. Hacé clic en cualquiera para reemplazarla.'}
        {section === 'servicios' && 'Fotos de las tarjetas dentro del acordeón de servicios. Cada imagen corresponde a una sesión específica.'}
        {section === 'portfolio' && 'Fotos de las tarjetas polaroid en la sección Portafolio del inicio. Si no se carga ninguna, usa las fotos de servicios como fallback.'}
        {section === 'sobremi' && 'Las 5 fotos que alternan en la sección "Sobre mí". Hacé clic para reemplazar.'}
      </p>

      <div className={`grid gap-4 ${section === 'sobremi' || section === 'hero' ? 'grid-cols-5' : section === 'portfolio' ? 'grid-cols-5' : 'grid-cols-3'}`}>
        {slots.map(slot => (
          <ImageSlot
            key={slot.key}
            slot={slot}
            currentUrl={config[slot.key] || null}
            onUploaded={handleUploaded}
          />
        ))}
      </div>

      {section === 'portfolio' && (
        <div className="mt-8">
          <div className="text-[10px] tracking-[0.12em] uppercase text-white/20 mb-2 font-sans">Nombres en las tarjetas polaroid</div>
          <p className="text-[12px] text-white/25 font-sans mb-4">El texto que aparece debajo de cada foto. Si lo dejás vacío usa el nombre de categoría por defecto.</p>
          <div className="grid grid-cols-5 gap-3">
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <PortfolioNameSlot
                key={key}
                catKey={key}
                defaultLabel={cat.es}
                currentName={config[`port-label-${key}`] || ''}
                onSaved={onConfigChange}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── TabTextos ────────────────────────────────────────────────────────────────
function TabTextos() {
  const [textos, setTextos] = useState({
    bienvenida_es: '', bienvenida_en: '',
    sobremi_es: '', sobremi_en: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    supabase.from('textos').select('*').then(({ data }) => {
      if (data) {
        const bienve = data.find(t => t.clave === 'bienvenida')
        const sobre  = data.find(t => t.clave === 'sobre_mi')
        setTextos({
          bienvenida_es: bienve?.valor_es || '',
          bienvenida_en: bienve?.valor_en || '',
          sobremi_es:    sobre?.valor_es  || '',
          sobremi_en:    sobre?.valor_en  || '',
        })
      }
      setLoading(false)
    })
  }, [])

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSaved(false)
    try {
      const updates = [
        { clave: 'bienvenida', valor_es: textos.bienvenida_es, valor_en: textos.bienvenida_en },
        { clave: 'sobre_mi',   valor_es: textos.sobremi_es,    valor_en: textos.sobremi_en },
      ]
      for (const u of updates) {
        const { error: err } = await supabase
          .from('textos')
          .upsert(u, { onConflict: 'clave' })
        if (err) throw err
      }
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError(err.message)
    }
    setSaving(false)
  }

  if (loading) return <div className="text-white/20 text-[13px] py-8 font-sans">Cargando…</div>

  const field = (label, key, rows = 4) => (
    <div>
      <label className="block text-[10px] tracking-[0.08em] uppercase text-white/30 mb-1 font-sans">{label}</label>
      <textarea
        value={textos[key]}
        onChange={e => setTextos(t => ({ ...t, [key]: e.target.value }))}
        rows={rows}
        className="w-full bg-[#0A0A0A] border border-white/10 rounded-[6px] px-3 py-[0.55rem] text-[13px] text-white/80 placeholder:text-white/15 focus:outline-none focus:border-pink resize-y font-sans leading-relaxed"
      />
    </div>
  )

  return (
    <form onSubmit={handleSave} className="max-w-[800px]">
      <div className="mb-8">
        <div className="text-[10px] tracking-[0.15em] uppercase text-white/20 mb-4 font-sans">Bienvenida</div>
        <div className="grid grid-cols-2 gap-4">
          {field('Español', 'bienvenida_es', 5)}
          {field('English', 'bienvenida_en', 5)}
        </div>
      </div>

      <div className="mb-8">
        <div className="text-[10px] tracking-[0.15em] uppercase text-white/20 mb-4 font-sans">Sobre mí</div>
        <div className="grid grid-cols-2 gap-4">
          {field('Español', 'sobremi_es', 6)}
          {field('English', 'sobremi_en', 6)}
        </div>
      </div>

      {error && <p className="text-red-400 text-[12px] mb-4 font-sans">{error}</p>}

      <div className="flex items-center gap-5">
        <button
          type="submit"
          disabled={saving}
          className="bg-pink text-white px-5 py-2 rounded-[6px] text-[11px] tracking-[0.08em] uppercase font-sans hover:bg-pink-dark transition-colors disabled:opacity-50"
        >
          {saving ? 'Guardando…' : 'Guardar textos'}
        </button>
        {saved && (
          <span className="text-[12px] text-emerald-400 font-sans">✓ Guardado</span>
        )}
      </div>
    </form>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function TabConfiguracion() {
  const [activeTab, setActiveTab] = useState('fotos')
  const [config, setConfig] = useState({})
  const [loadingConfig, setLoadingConfig] = useState(true)

  useEffect(() => {
    supabase.from('configuracion').select('clave, valor').then(({ data }) => {
      if (data) {
        const map = {}
        data.forEach(row => { map[row.clave] = row.valor })
        setConfig(map)
      }
      setLoadingConfig(false)
    })
  }, [])

  function handleConfigChange(key, url) {
    setConfig(prev => ({ ...prev, [key]: url }))
  }

  const tabs = [
    { id: 'fotos',  label: 'Fotos' },
    { id: 'textos', label: 'Textos' },
  ]

  return (
    <div className="p-8 max-w-[1100px]">
      <h1 className="text-[1.4rem] font-serif italic text-white/80 mb-6">Configuración</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-[11px] tracking-[0.08em] uppercase px-5 py-[0.45rem] rounded-[20px] border font-sans transition-colors
              ${activeTab === tab.id
                ? 'bg-pink text-white border-pink'
                : 'bg-transparent text-white/35 border-white/10 hover:text-white/60 hover:border-white/20'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'fotos' && (
        loadingConfig
          ? <div className="text-white/20 text-[13px] font-sans">Cargando…</div>
          : <TabFotos config={config} onConfigChange={handleConfigChange} />
      )}

      {activeTab === 'textos' && <TabTextos />}
    </div>
  )
}

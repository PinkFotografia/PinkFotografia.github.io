import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { CATEGORIES } from '../../lib/categories'

function emptyForm(categoria) {
  return { nombre: '', precio: '', featured: false, items: [{ es: '', en: '' }], categoria, orden: 0 }
}

function normalizeItem(item) {
  if (typeof item === 'string') return { es: item, en: item }
  return item
}

export default function TabPaquetes() {
  const [categoria, setCategoria] = useState('estudio')
  const [paquetes, setPaquetes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm('estudio'))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => { fetchPaquetes() }, [categoria])

  async function fetchPaquetes() {
    setLoading(true)
    const { data } = await supabase
      .from('paquetes')
      .select('*')
      .eq('categoria', categoria)
      .order('orden', { ascending: true })
    setPaquetes(data || [])
    setLoading(false)
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const payload = {
      nombre:   form.nombre,
      precio:   form.precio || null,
      featured: form.featured,
      items:    form.items.filter(item => normalizeItem(item).es.trim()),
      categoria: form.categoria,
      orden:    form.orden ?? 0,
    }
    const { error } = form.id
      ? await supabase.from('paquetes').update(payload).eq('id', form.id)
      : await supabase.from('paquetes').insert(payload)
    if (error) { setError(error.message); setSaving(false); return }
    setShowForm(false)
    fetchPaquetes()
    setSaving(false)
  }

  async function handleDelete(id) {
    if (!window.confirm('¿Eliminar este paquete?')) return
    await supabase.from('paquetes').delete().eq('id', id)
    fetchPaquetes()
  }

  function handleEdit(p) {
    setForm({
      id: p.id,
      nombre:   p.nombre || '',
      precio:   p.precio || '',
      featured: p.featured || false,
      items:    (p.items || []).length > 0 ? p.items.map(normalizeItem) : [{ es: '', en: '' }],
      categoria: p.categoria,
      orden:    p.orden ?? 0,
    })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function setItem(i, field, value) {
    setForm(f => {
      const items = f.items.map((item, idx) => idx === i ? { ...normalizeItem(item), [field]: value } : item)
      return { ...f, items }
    })
  }

  return (
    <div className="p-8 max-w-[1000px]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[1.4rem] font-serif italic text-white/80">Paquetes</h1>
        <button
          onClick={() => { setForm(emptyForm(categoria)); setShowForm(v => !v) }}
          className="bg-pink text-white px-5 py-2 rounded-[6px] text-[11px] tracking-[0.08em] uppercase font-sans hover:bg-pink-dark transition-colors"
        >
          + Nuevo paquete
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
          <div className="text-[10px] tracking-[0.12em] uppercase text-white/30 mb-5">
            {form.id ? 'Editar paquete' : 'Nuevo paquete'}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-[10px] tracking-[0.08em] uppercase text-white/30 mb-1">Nombre *</label>
              <input
                type="text"
                value={form.nombre}
                onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                required
                placeholder="Ej: Paquete Completo"
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-[6px] px-3 py-[0.55rem] text-[13px] text-white/80 placeholder:text-white/15 focus:outline-none focus:border-pink"
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.08em] uppercase text-white/30 mb-1">Precio</label>
              <input
                type="text"
                value={form.precio}
                onChange={e => setForm(f => ({ ...f, precio: e.target.value }))}
                placeholder="Ej: $45.000 ARS  (dejar vacío = a consultar)"
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-[6px] px-3 py-[0.55rem] text-[13px] text-white/80 placeholder:text-white/15 focus:outline-none focus:border-pink"
              />
            </div>
          </div>

          {/* Destacado toggle */}
          <div className="flex items-center gap-3 mb-5">
            <button
              type="button"
              onClick={() => setForm(f => ({ ...f, featured: !f.featured }))}
              className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 ${form.featured ? 'bg-pink' : 'bg-white/10'}`}
            >
              <span className={`absolute top-[2px] w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${form.featured ? 'translate-x-5' : 'translate-x-[2px]'}`} />
            </button>
            <span className="text-[12px] text-white/45">Destacado — muestra badge "Más popular"</span>
          </div>

          {/* Items list */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] tracking-[0.08em] uppercase text-white/30">Qué incluye</label>
              <button
                type="button"
                onClick={() => setForm(f => ({ ...f, items: [...f.items, { es: '', en: '' }] }))}
                className="text-[11px] text-pink hover:text-pink-mid font-sans transition-colors"
              >
                + Agregar ítem
              </button>
            </div>
            {form.items.map((item, i) => {
              const norm = normalizeItem(item)
              return (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={norm.es}
                    onChange={e => setItem(i, 'es', e.target.value)}
                    placeholder="Español"
                    className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-[6px] px-3 py-[0.5rem] text-[12px] text-white/80 placeholder:text-white/15 focus:outline-none focus:border-pink"
                  />
                  <input
                    type="text"
                    value={norm.en}
                    onChange={e => setItem(i, 'en', e.target.value)}
                    placeholder="English"
                    className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-[6px] px-3 py-[0.5rem] text-[12px] text-white/80 placeholder:text-white/15 focus:outline-none focus:border-pink"
                  />
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, items: f.items.filter((_, idx) => idx !== i) }))}
                    className="w-8 text-white/20 hover:text-red-400 text-[18px] transition-colors flex-shrink-0 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              )
            })}
          </div>

          {error && <p className="text-red-400 text-[12px] mb-4">{error}</p>}
          <div className="flex gap-4">
            <button type="submit" disabled={saving} className="bg-pink text-white px-5 py-2 rounded-[6px] text-[11px] tracking-[0.08em] uppercase font-sans hover:bg-pink-dark transition-colors disabled:opacity-50">
              {saving ? 'Guardando…' : 'Guardar'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="text-white/35 hover:text-white text-[11px] tracking-[0.08em] uppercase font-sans transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Packages */}
      {loading ? (
        <div className="text-white/20 text-[13px] text-center py-16">Cargando…</div>
      ) : paquetes.length === 0 ? (
        <div className="text-white/20 text-[13px] text-center py-16">No hay paquetes para esta categoría</div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {paquetes.map(p => (
            <div
              key={p.id}
              className={`bg-[#1A1A1A] rounded-[10px] p-5 border ${p.featured ? 'border-pink/40' : 'border-white/[0.06]'}`}
            >
              {p.featured && (
                <div className="text-[10px] tracking-[0.1em] uppercase text-pink mb-2">Destacado</div>
              )}
              <div className="font-serif italic text-[1.05rem] text-white/75 mb-1">{p.nombre}</div>
              <div className="text-[12px] text-white/35 mb-3">{p.precio || 'A consultar'}</div>
              <div className="text-[11px] text-white/25 mb-4">
                {(p.items || []).length} {(p.items || []).length === 1 ? 'ítem' : 'ítems'}
              </div>
              <div className="flex gap-4">
                <button onClick={() => handleEdit(p)} className="text-[11px] text-white/25 hover:text-pink transition-colors font-sans">Editar</button>
                <button onClick={() => handleDelete(p.id)} className="text-[11px] text-white/25 hover:text-red-400 transition-colors font-sans">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

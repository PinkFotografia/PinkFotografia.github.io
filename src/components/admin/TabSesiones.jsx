import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { CATEGORIES } from '../../lib/categories'

const ESTADOS = ['pendiente', 'pagado', 'cancelado']

const ESTADO_STYLE = {
  pendiente: 'bg-amber-400/15 text-amber-400',
  pagado:    'bg-emerald-400/15 text-emerald-400',
  cancelado: 'bg-white/[0.06] text-white/25',
}

const EMPTY = {
  cliente: '',
  categoria: 'estudio',
  fecha: new Date().toISOString().split('T')[0],
  monto: '',
  estado: 'pendiente',
  notas: '',
}

const fmt = n =>
  n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

const fmtFecha = str =>
  str ? new Date(str + 'T00:00:00').toLocaleDateString('es-AR') : '—'

export default function TabSesiones() {
  const [sesiones, setSesiones] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => { fetchSesiones() }, [])

  async function fetchSesiones() {
    setLoading(true)
    const { data } = await supabase
      .from('sesiones')
      .select('*')
      .order('fecha', { ascending: false })
    setSesiones(data || [])
    setLoading(false)
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const payload = { ...form, monto: form.monto !== '' ? parseFloat(form.monto) : null }
    const { error } = form.id
      ? await supabase.from('sesiones').update(payload).eq('id', form.id)
      : await supabase.from('sesiones').insert(payload)
    if (error) { setError(error.message); setSaving(false); return }
    setShowForm(false)
    setForm(EMPTY)
    fetchSesiones()
    setSaving(false)
  }

  async function handleDelete(id) {
    if (!window.confirm('¿Eliminar esta sesión?')) return
    await supabase.from('sesiones').delete().eq('id', id)
    fetchSesiones()
  }

  function handleEdit(s) {
    setForm({
      id: s.id,
      cliente: s.cliente || '',
      categoria: s.categoria || 'estudio',
      fecha: s.fecha || '',
      monto: s.monto ?? '',
      estado: s.estado || 'pendiente',
      notas: s.notas || '',
    })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const totalPendiente = sesiones.filter(s => s.estado === 'pendiente').reduce((a, s) => a + (s.monto || 0), 0)
  const totalCobrado   = sesiones.filter(s => s.estado === 'pagado').reduce((a, s) => a + (s.monto || 0), 0)

  return (
    <div className="p-8 max-w-[1100px]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[1.4rem] font-serif italic text-white/80">Sesiones</h1>
        <button
          onClick={() => { setForm(EMPTY); setShowForm(v => !v) }}
          className="bg-pink text-white px-5 py-2 rounded-[6px] text-[11px] tracking-[0.08em] uppercase font-sans hover:bg-pink-dark transition-colors"
        >
          + Nueva sesión
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total sesiones', value: sesiones.length },
          { label: 'Por cobrar',     value: fmt(totalPendiente) },
          { label: 'Cobrado',        value: fmt(totalCobrado) },
        ].map(s => (
          <div key={s.label} className="bg-[#1A1A1A] rounded-[10px] px-5 py-4 border border-white/[0.06]">
            <div className="text-[10px] tracking-[0.1em] uppercase text-white/25 mb-2">{s.label}</div>
            <div className="text-[1.4rem] font-serif italic text-white/70">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSave} className="bg-[#1A1A1A] rounded-[10px] p-6 border border-white/[0.06] mb-8">
          <div className="text-[10px] tracking-[0.12em] uppercase text-white/30 mb-5">
            {form.id ? 'Editar sesión' : 'Nueva sesión'}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-[10px] tracking-[0.08em] uppercase text-white/30 mb-1">Cliente *</label>
              <input
                type="text"
                value={form.cliente}
                onChange={e => setForm(f => ({ ...f, cliente: e.target.value }))}
                required
                placeholder="Nombre del cliente"
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-[6px] px-3 py-[0.55rem] text-[13px] text-white/80 placeholder:text-white/15 focus:outline-none focus:border-pink"
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.08em] uppercase text-white/30 mb-1">Categoría</label>
              <select
                value={form.categoria}
                onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-[6px] px-3 py-[0.55rem] text-[13px] text-white/80 focus:outline-none focus:border-pink"
              >
                {Object.entries(CATEGORIES).map(([k, cat]) => (
                  <option key={k} value={k}>{cat.es}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.08em] uppercase text-white/30 mb-1">Fecha *</label>
              <input
                type="date"
                value={form.fecha}
                onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))}
                required
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-[6px] px-3 py-[0.55rem] text-[13px] text-white/80 focus:outline-none focus:border-pink"
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.08em] uppercase text-white/30 mb-1">Monto (ARS)</label>
              <input
                type="number"
                value={form.monto}
                onChange={e => setForm(f => ({ ...f, monto: e.target.value }))}
                placeholder="0"
                min="0"
                step="100"
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-[6px] px-3 py-[0.55rem] text-[13px] text-white/80 placeholder:text-white/15 focus:outline-none focus:border-pink"
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.08em] uppercase text-white/30 mb-1">Estado</label>
              <select
                value={form.estado}
                onChange={e => setForm(f => ({ ...f, estado: e.target.value }))}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-[6px] px-3 py-[0.55rem] text-[13px] text-white/80 focus:outline-none focus:border-pink"
              >
                {ESTADOS.map(e => (
                  <option key={e} value={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.08em] uppercase text-white/30 mb-1">Notas</label>
              <input
                type="text"
                value={form.notas}
                onChange={e => setForm(f => ({ ...f, notas: e.target.value }))}
                placeholder="Opcional"
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-[6px] px-3 py-[0.55rem] text-[13px] text-white/80 placeholder:text-white/15 focus:outline-none focus:border-pink"
              />
            </div>
          </div>
          {error && <p className="text-red-400 text-[12px] mb-4">{error}</p>}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-pink text-white px-5 py-2 rounded-[6px] text-[11px] tracking-[0.08em] uppercase font-sans hover:bg-pink-dark transition-colors disabled:opacity-50"
            >
              {saving ? 'Guardando…' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); setForm(EMPTY) }}
              className="text-white/35 hover:text-white text-[11px] tracking-[0.08em] uppercase font-sans transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-white/20 text-[13px] text-center py-16">Cargando…</div>
      ) : sesiones.length === 0 ? (
        <div className="text-white/20 text-[13px] text-center py-16">No hay sesiones registradas</div>
      ) : (
        <div className="bg-[#1A1A1A] rounded-[10px] border border-white/[0.06] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['Cliente', 'Categoría', 'Fecha', 'Monto', 'Estado', ''].map(h => (
                  <th key={h} className={`px-5 py-3 text-[10px] tracking-[0.1em] uppercase text-white/25 font-normal ${h === '' ? '' : 'text-left'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sesiones.map((s, i) => (
                <tr key={s.id} className={`border-b border-white/[0.03] ${i % 2 ? 'bg-white/[0.01]' : ''}`}>
                  <td className="px-5 py-3 text-[13px] text-white/70">{s.cliente}</td>
                  <td className="px-5 py-3 text-[13px] text-white/45">{CATEGORIES[s.categoria]?.es || s.categoria}</td>
                  <td className="px-5 py-3 text-[13px] text-white/45">{fmtFecha(s.fecha)}</td>
                  <td className="px-5 py-3 text-[13px] text-white/70">{s.monto ? fmt(s.monto) : '—'}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] tracking-[0.08em] uppercase px-2 py-[2px] rounded-[4px] ${ESTADO_STYLE[s.estado] || 'bg-white/[0.06] text-white/25'}`}>
                      {s.estado}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right whitespace-nowrap">
                    <button onClick={() => handleEdit(s)} className="text-[11px] text-white/25 hover:text-pink transition-colors mr-4 font-sans">Editar</button>
                    <button onClick={() => handleDelete(s.id)} className="text-[11px] text-white/25 hover:text-red-400 transition-colors font-sans">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const CATS = ['equipo', 'alquiler', 'marketing', 'traslado', 'otro']

const EMPTY = {
  descripcion: '',
  monto: '',
  fecha: new Date().toISOString().split('T')[0],
  categoria: 'equipo',
  notas: '',
}

const fmt = n =>
  n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

const fmtFecha = str =>
  str ? new Date(str + 'T00:00:00').toLocaleDateString('es-AR') : '—'

export default function TabGastos() {
  const [gastos, setGastos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => { fetchGastos() }, [])

  async function fetchGastos() {
    setLoading(true)
    const { data } = await supabase
      .from('gastos')
      .select('*')
      .order('fecha', { ascending: false })
    setGastos(data || [])
    setLoading(false)
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const payload = { ...form, monto: form.monto !== '' ? parseFloat(form.monto) : null }
    const { error } = form.id
      ? await supabase.from('gastos').update(payload).eq('id', form.id)
      : await supabase.from('gastos').insert(payload)
    if (error) { setError(error.message); setSaving(false); return }
    setShowForm(false)
    setForm(EMPTY)
    fetchGastos()
    setSaving(false)
  }

  async function handleDelete(id) {
    if (!window.confirm('¿Eliminar este gasto?')) return
    await supabase.from('gastos').delete().eq('id', id)
    fetchGastos()
  }

  function handleEdit(g) {
    setForm({
      id: g.id,
      descripcion: g.descripcion || '',
      monto: g.monto ?? '',
      fecha: g.fecha || '',
      categoria: g.categoria || 'otro',
      notas: g.notas || '',
    })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const thisMonth = new Date().toISOString().slice(0, 7)
  const totalMes = gastos.filter(g => g.fecha?.startsWith(thisMonth)).reduce((a, g) => a + (g.monto || 0), 0)
  const total    = gastos.reduce((a, g) => a + (g.monto || 0), 0)

  return (
    <div className="p-8 max-w-[1100px]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[1.4rem] font-serif italic text-white/80">Gastos</h1>
        <button
          onClick={() => { setForm(EMPTY); setShowForm(v => !v) }}
          className="bg-pink text-white px-5 py-2 rounded-[6px] text-[11px] tracking-[0.08em] uppercase font-sans hover:bg-pink-dark transition-colors"
        >
          + Nuevo gasto
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { label: 'Total registrado', value: fmt(total) },
          { label: 'Este mes',         value: fmt(totalMes) },
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
            {form.id ? 'Editar gasto' : 'Nuevo gasto'}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="col-span-2">
              <label className="block text-[10px] tracking-[0.08em] uppercase text-white/30 mb-1">Descripción *</label>
              <input
                type="text"
                value={form.descripcion}
                onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))}
                required
                placeholder="Ej: Nuevo lente 50mm"
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-[6px] px-3 py-[0.55rem] text-[13px] text-white/80 placeholder:text-white/15 focus:outline-none focus:border-pink"
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.08em] uppercase text-white/30 mb-1">Monto (ARS) *</label>
              <input
                type="number"
                value={form.monto}
                onChange={e => setForm(f => ({ ...f, monto: e.target.value }))}
                required
                min="0"
                step="100"
                placeholder="0"
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-[6px] px-3 py-[0.55rem] text-[13px] text-white/80 placeholder:text-white/15 focus:outline-none focus:border-pink"
              />
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
              <label className="block text-[10px] tracking-[0.08em] uppercase text-white/30 mb-1">Categoría</label>
              <select
                value={form.categoria}
                onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-[6px] px-3 py-[0.55rem] text-[13px] text-white/80 focus:outline-none focus:border-pink"
              >
                {CATS.map(c => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
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
            <button type="submit" disabled={saving} className="bg-pink text-white px-5 py-2 rounded-[6px] text-[11px] tracking-[0.08em] uppercase font-sans hover:bg-pink-dark transition-colors disabled:opacity-50">
              {saving ? 'Guardando…' : 'Guardar'}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setForm(EMPTY) }} className="text-white/35 hover:text-white text-[11px] tracking-[0.08em] uppercase font-sans transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-white/20 text-[13px] text-center py-16">Cargando…</div>
      ) : gastos.length === 0 ? (
        <div className="text-white/20 text-[13px] text-center py-16">No hay gastos registrados</div>
      ) : (
        <div className="bg-[#1A1A1A] rounded-[10px] border border-white/[0.06] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left px-5 py-3 text-[10px] tracking-[0.1em] uppercase text-white/25 font-normal">Descripción</th>
                <th className="text-left px-5 py-3 text-[10px] tracking-[0.1em] uppercase text-white/25 font-normal">Categoría</th>
                <th className="text-left px-5 py-3 text-[10px] tracking-[0.1em] uppercase text-white/25 font-normal">Fecha</th>
                <th className="text-right px-5 py-3 text-[10px] tracking-[0.1em] uppercase text-white/25 font-normal">Monto</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {gastos.map((g, i) => (
                <tr key={g.id} className={`border-b border-white/[0.03] ${i % 2 ? 'bg-white/[0.01]' : ''}`}>
                  <td className="px-5 py-3 text-[13px] text-white/70">{g.descripcion}</td>
                  <td className="px-5 py-3 text-[13px] text-white/45">{g.categoria}</td>
                  <td className="px-5 py-3 text-[13px] text-white/45">{fmtFecha(g.fecha)}</td>
                  <td className="px-5 py-3 text-right text-[13px] text-white/70">{g.monto ? fmt(g.monto) : '—'}</td>
                  <td className="px-5 py-3 text-right whitespace-nowrap">
                    <button onClick={() => handleEdit(g)} className="text-[11px] text-white/25 hover:text-pink transition-colors mr-4 font-sans">Editar</button>
                    <button onClick={() => handleDelete(g.id)} className="text-[11px] text-white/25 hover:text-red-400 transition-colors font-sans">Eliminar</button>
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

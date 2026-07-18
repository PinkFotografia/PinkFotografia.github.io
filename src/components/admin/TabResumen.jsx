import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../../lib/supabase'

// ─── Constants ────────────────────────────────────────────────────────────────
const PERIODS = [
  { id: 'semana',   label: 'Semana',   trendN: 8  },
  { id: 'mes',      label: 'Mes',      trendN: 6  },
  { id: 'semestre', label: 'Semestre', trendN: 4  },
  { id: 'año',      label: 'Año',      trendN: 5  },
  { id: 'todo',     label: 'Todo',     trendN: 12 },
]

const MESES_CORTO = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
const MESES_LARGO = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

const ESTADO_COLOR = {
  pagado:    'bg-emerald-400',
  confirmada:'bg-blue-400',
  pendiente: 'bg-amber-400',
  cancelado: 'bg-white/20',
}

const DONUT_COLORS = ['#E8698A','#F59E0B','#60A5FA','#34D399','#A78BFA','#FB923C','#E879F9']

const fmt = n => n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
const deltaPct = (curr, prev) => prev === 0 ? null : Math.round(((curr - prev) / prev) * 100)

// ─── Period math ──────────────────────────────────────────────────────────────
function getRangeForPeriod(type, offset) {
  const now = new Date()
  if (type === 'semana') {
    const mon = new Date(now)
    mon.setDate(now.getDate() - ((now.getDay() + 6) % 7) + offset * 7)
    mon.setHours(0, 0, 0, 0)
    const sun = new Date(mon)
    sun.setDate(mon.getDate() + 6)
    sun.setHours(23, 59, 59, 999)
    return { start: mon, end: sun }
  }
  if (type === 'mes') {
    const d = new Date(now.getFullYear(), now.getMonth() + offset, 1)
    return { start: d, end: new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59) }
  }
  if (type === 'semestre') {
    const baseSem = now.getFullYear() * 2 + (now.getMonth() < 6 ? 0 : 1) + offset
    const year = Math.floor(baseSem / 2)
    const half = ((baseSem % 2) + 2) % 2
    const sm = half === 0 ? 0 : 6
    return { start: new Date(year, sm, 1), end: new Date(year, sm + 6, 0, 23, 59, 59) }
  }
  if (type === 'año') {
    const y = now.getFullYear() + offset
    return { start: new Date(y, 0, 1), end: new Date(y, 11, 31, 23, 59, 59) }
  }
  return { start: null, end: null }
}

function getPeriodLabel(type, offset) {
  const now = new Date()
  if (type === 'semana') {
    const { start, end } = getRangeForPeriod(type, offset)
    return `${start.getDate()} ${MESES_CORTO[start.getMonth()]} – ${end.getDate()} ${MESES_CORTO[end.getMonth()]} ${end.getFullYear()}`
  }
  if (type === 'mes') {
    const d = new Date(now.getFullYear(), now.getMonth() + offset, 1)
    return `${MESES_LARGO[d.getMonth()]} ${d.getFullYear()}`
  }
  if (type === 'semestre') {
    const baseSem = now.getFullYear() * 2 + (now.getMonth() < 6 ? 0 : 1) + offset
    const year = Math.floor(baseSem / 2)
    const half = ((baseSem % 2) + 2) % 2
    return `${half === 0 ? '1er' : '2do'} semestre ${year}`
  }
  if (type === 'año') return String(now.getFullYear() + offset)
  return 'Todo el tiempo'
}

function getShortLabel(type, offset) {
  const now = new Date()
  if (type === 'semana') {
    const { start } = getRangeForPeriod(type, offset)
    return `${start.getDate()}/${start.getMonth() + 1}`
  }
  if (type === 'mes') {
    const d = new Date(now.getFullYear(), now.getMonth() + offset, 1)
    return MESES_CORTO[d.getMonth()]
  }
  if (type === 'semestre') {
    const baseSem = now.getFullYear() * 2 + (now.getMonth() < 6 ? 0 : 1) + offset
    const year = Math.floor(baseSem / 2)
    const half = ((baseSem % 2) + 2) % 2
    return `${half === 0 ? '1S' : '2S'}'${String(year).slice(2)}`
  }
  if (type === 'año') return String(now.getFullYear() + offset)
  return ''
}

// ─── Data helpers ─────────────────────────────────────────────────────────────
function filterRange(items, start, end, field = 'fecha') {
  if (!start) return items
  return items.filter(item => {
    const d = new Date(item[field] + 'T00:00:00')
    return d >= start && d <= end
  })
}

function calcStats(sesiones, gastos) {
  const activas    = sesiones.filter(s => s.estado !== 'cancelado')
  const ingresos   = activas.reduce((a, s) => a + (s.monto_total || 0), 0)
  const cobrado    = activas.reduce((a, s) =>
    a + (s.estado === 'pagado' ? (s.monto_total || 0) : (s.sena || 0)), 0)
  const pendiente  = activas.reduce((a, s) =>
    a + (s.estado === 'pagado' ? 0 : (s.monto_total || 0) - (s.sena || 0)), 0)
  const gastoTotal = gastos.reduce((a, g) => a + (g.monto || 0), 0)
  const ganancia   = cobrado - gastoTotal
  const ticket     = activas.length ? Math.round(ingresos / activas.length) : 0
  const canceladas = sesiones.filter(s => s.estado === 'cancelado').length
  const tasaCancel = sesiones.length ? Math.round((canceladas / sesiones.length) * 100) : 0
  const pctCobrado = ingresos ? Math.round((cobrado / ingresos) * 100) : 0
  return { count: sesiones.length, ingresos, cobrado, pendiente, gastoTotal, ganancia, ticket, tasaCancel, pctCobrado, canceladas }
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function Delta({ value }) {
  if (value === null || value === undefined) return null
  const up = value >= 0
  return (
    <span className={`text-[10px] font-sans ${up ? 'text-emerald-400' : 'text-red-400'}`}>
      {up ? '▲' : '▼'} {Math.abs(value)}%
    </span>
  )
}

function TrendBars({ items }) {
  const maxVal = Math.max(...items.flatMap(d => [d.ingresos, d.cobrado, d.gastos]), 1)
  const chartH = 110
  // Y-axis scale: 3 lines at 25%, 50%, 75%
  const scaleLines = [0.75, 0.5, 0.25].map(f => ({ pct: f, val: maxVal * f }))

  return (
    <div>
      {/* Leyenda */}
      <div className="flex gap-5 mb-4">
        {[
          { label: 'Ingresos', color: 'bg-pink' },
          { label: 'Cobrado',  color: 'bg-emerald-400' },
          { label: 'Gastos',   color: 'bg-amber-400' },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-[6px]">
            <div className={`w-[10px] h-[10px] rounded-sm ${l.color} opacity-70`} />
            <span className="text-[10px] text-white/30 font-sans">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Chart area con eje Y */}
      <div className="flex gap-2">
        {/* Eje Y */}
        <div className="relative shrink-0 w-14" style={{ height: chartH }}>
          {scaleLines.map(({ pct, val }) => (
            <div
              key={pct}
              className="absolute right-0 text-[9px] text-white/20 font-sans"
              style={{ bottom: `${pct * 100}%`, transform: 'translateY(50%)' }}
            >
              {val >= 1000 ? `$${Math.round(val / 1000)}k` : `$${Math.round(val)}`}
            </div>
          ))}
        </div>

        {/* Barras con líneas de referencia */}
        <div className="flex-1 relative">
          {/* Líneas horizontales */}
          {scaleLines.map(({ pct }) => (
            <div
              key={pct}
              className="absolute left-0 right-0 border-t border-white/[0.04]"
              style={{ bottom: `${pct * 100}%` }}
            />
          ))}

          <div className="flex items-end gap-[6px]" style={{ height: chartH }}>
            {items.map((d, i) => {
              const isCurrent = i === items.length - 1
              const opacity = isCurrent ? '' : 'opacity-50'
              return (
                <div key={d.label} className={`flex-1 flex flex-col items-center transition-opacity ${opacity}`}>
                  <div className="w-full flex items-end gap-[2px]" style={{ height: chartH }}>
                    <div
                      title={`Ingresos: ${fmt(d.ingresos)}`}
                      className={`flex-1 rounded-t-[2px] transition-all duration-500 cursor-default ${isCurrent ? 'bg-pink' : 'bg-pink/60'}`}
                      style={{ height: `${Math.max((d.ingresos / maxVal) * 100, d.ingresos > 0 ? 2 : 0)}%` }}
                    />
                    <div
                      title={`Cobrado: ${fmt(d.cobrado)}`}
                      className={`flex-1 rounded-t-[2px] transition-all duration-500 cursor-default ${isCurrent ? 'bg-emerald-400' : 'bg-emerald-400/60'}`}
                      style={{ height: `${Math.max((d.cobrado / maxVal) * 100, d.cobrado > 0 ? 2 : 0)}%` }}
                    />
                    <div
                      title={`Gastos: ${fmt(d.gastos)}`}
                      className={`flex-1 rounded-t-[2px] transition-all duration-500 cursor-default ${isCurrent ? 'bg-amber-400' : 'bg-amber-400/60'}`}
                      style={{ height: `${Math.max((d.gastos / maxVal) * 100, d.gastos > 0 ? 2 : 0)}%` }}
                    />
                  </div>
                  <div className={`text-[9px] font-sans mt-[6px] text-center ${isCurrent ? 'text-white/50' : 'text-white/20'}`}>
                    {d.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function RentabilidadPorTipo({ sesiones }) {
  const activas = sesiones.filter(s => s.estado !== 'cancelado')
  const map = {}
  activas.forEach(s => {
    const t = s.tipo || 'Sin tipo'
    if (!map[t]) map[t] = { count: 0, ingresos: 0 }
    map[t].count++
    map[t].ingresos += s.monto_total || 0
  })
  const items = Object.entries(map)
    .map(([tipo, d]) => ({ tipo, count: d.count, ingresos: d.ingresos, ticket: d.count ? Math.round(d.ingresos / d.count) : 0 }))
    .sort((a, b) => b.ingresos - a.ingresos)

  if (items.length === 0) return <div className="text-white/20 text-[12px] font-sans">Sin datos para este período</div>

  const maxIngresos = items[0].ingresos

  return (
    <div className="space-y-5">
      {items.map((item, i) => (
        <div key={item.tipo}>
          <div className="flex items-center justify-between mb-[6px]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-[7px] h-[7px] rounded-full shrink-0" style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }} />
              <span className="text-[12px] text-white/65 font-sans truncate">{item.tipo}</span>
              <span className="text-[10px] text-white/25 font-sans shrink-0">{item.count} ses.</span>
            </div>
            <div className="text-right shrink-0 ml-3">
              <span className="text-[12px] text-white/65 font-sans">{fmt(item.ingresos)}</span>
              <span className="text-[10px] text-white/25 font-sans ml-2">· {fmt(item.ticket)} c/u</span>
            </div>
          </div>
          <div className="h-[5px] bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(item.ingresos / maxIngresos) * 100}%`, background: DONUT_COLORS[i % DONUT_COLORS.length] }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function ProximasSesiones({ sesiones }) {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const in30 = new Date(today); in30.setDate(today.getDate() + 30)

  const proximas = sesiones
    .filter(s => {
      const d = new Date(s.fecha + 'T00:00:00')
      return d >= today && d <= in30 && s.estado !== 'cancelado' && s.estado !== 'pagado'
    })
    .sort((a, b) => a.fecha.localeCompare(b.fecha))

  if (proximas.length === 0) return (
    <div className="text-white/20 text-[12px] font-sans text-center py-6">Sin sesiones próximas</div>
  )

  return (
    <div className="space-y-2">
      {proximas.map(s => {
        const d = new Date(s.fecha + 'T00:00:00')
        const diff = Math.round((d - today) / 86400000)
        return (
          <div key={s.id} className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-[8px] border border-white/[0.04]">
            <div className="text-center shrink-0 w-9">
              <div className="text-[17px] font-serif italic text-white/60 leading-none">{d.getDate()}</div>
              <div className="text-[9px] text-white/25 uppercase font-sans mt-[2px]">{MESES_CORTO[d.getMonth()]}</div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[12px] text-white/70 truncate font-sans">{s.cliente}</div>
              <div className="text-[10px] text-white/30 font-sans">{s.tipo || '—'}</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[11px] text-white/50 font-sans">{fmt(s.monto_total || 0)}</div>
              <div className="text-[9px] text-white/20 font-sans">{diff === 0 ? 'Hoy' : `en ${diff}d`}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}


const ESTADO_TEXT = {
  pagado:    'text-emerald-400',
  confirmada:'text-blue-400',
  pendiente: 'text-amber-400',
  cancelado: 'text-white/25',
}

function HBar({ items, colorFn, textColorFn, formatVal = v => v }) {
  const max = Math.max(...items.map(i => i.value), 1)
  return (
    <div className="space-y-[14px]">
      {items.map(({ label, value, extra }) => (
        <div key={label}>
          <div className="flex justify-between items-baseline mb-[5px]">
            <span className={`text-[12px] font-sans capitalize truncate mr-2 ${textColorFn ? textColorFn(label) : 'text-white/55'}`}>
              {label}
            </span>
            <span className="text-[11px] text-white/30 font-sans shrink-0">
              {formatVal(value)}{extra != null ? ` · ${extra}%` : ''}
            </span>
          </div>
          <div className="h-[5px] bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${colorFn ? colorFn(label) : 'bg-pink'}`}
              style={{ width: `${(value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function TabResumen() {
  const [period, setPeriod]   = useState('mes')
  const [offset, setOffset]   = useState(0)
  const [sesiones, setSesiones] = useState([])
  const [gastos, setGastos]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      supabase.from('sesiones').select('*'),
      supabase.from('gastos').select('*'),
    ]).then(([{ data: s }, { data: g }]) => {
      setSesiones(s || [])
      setGastos(g || [])
      setLoading(false)
    })
  }, [])

  function changePeriod(newPeriod) {
    setPeriod(newPeriod)
    setOffset(0)
  }

  const { start, end } = useMemo(() => getRangeForPeriod(period, offset), [period, offset])

  const currSesiones = useMemo(() => filterRange(sesiones, start, end), [sesiones, start, end])
  const currGastos   = useMemo(() => filterRange(gastos, start, end),   [gastos,   start, end])
  const stats        = useMemo(() => calcStats(currSesiones, currGastos), [currSesiones, currGastos])

  const { start: ps, end: pe } = useMemo(() => getRangeForPeriod(period, offset - 1), [period, offset])
  const prevStats = useMemo(() =>
    calcStats(filterRange(sesiones, ps, pe), filterRange(gastos, ps, pe)),
    [sesiones, gastos, ps, pe]
  )

  // Trend data
  const trendN = PERIODS.find(p => p.id === period)?.trendN ?? 6
  const trendData = useMemo(() => {
    if (period === 'todo') {
      // last 12 months
      return Array.from({ length: 12 }, (_, i) => {
        const o = offset - 11 + i
        const { start: ts, end: te } = getRangeForPeriod('mes', o)
        const s = filterRange(sesiones, ts, te)
        const g = filterRange(gastos, ts, te)
        const st = calcStats(s, g)
        return { label: getShortLabel('mes', o), ingresos: st.ingresos, cobrado: st.cobrado, gastos: st.gastoTotal }
      })
    }
    return Array.from({ length: trendN }, (_, i) => {
      const o = offset - (trendN - 1) + i
      const { start: ts, end: te } = getRangeForPeriod(period, o)
      const s = filterRange(sesiones, ts, te)
      const g = filterRange(gastos, ts, te)
      const st = calcStats(s, g)
      return { label: getShortLabel(period, o), ingresos: st.ingresos, cobrado: st.cobrado, gastos: st.gastoTotal }
    })
  }, [sesiones, gastos, period, offset, trendN])

  const topSesion = useMemo(() =>
    currSesiones
      .filter(s => s.estado !== 'cancelado')
      .sort((a, b) => (b.monto_total || 0) - (a.monto_total || 0))[0] || null
  , [currSesiones])

  const porTipo = useMemo(() => {
    const map = {}
    currSesiones.filter(s => s.estado !== 'cancelado').forEach(s => {
      const t = s.tipo || 'Sin tipo'
      map[t] = (map[t] || 0) + 1
    })
    return Object.entries(map).sort((a, b) => b[1] - a[1]).map(([label, value]) => ({ label, value }))
  }, [currSesiones])

  const porEstado = useMemo(() => {
    const order = ['pagado', 'confirmada', 'pendiente', 'cancelado']
    return order
      .map(e => ({ label: e, value: currSesiones.filter(s => s.estado === e).length }))
      .filter(e => e.value > 0)
  }, [currSesiones])

  const porCategoria = useMemo(() => {
    const map = {}
    currGastos.forEach(g => {
      const c = g.categoria || 'otro'
      map[c] = (map[c] || 0) + (g.monto || 0)
    })
    const total = Object.values(map).reduce((a, v) => a + v, 0)
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(([label, value]) => ({ label, value, extra: total ? Math.round((value / total) * 100) : 0 }))
  }, [currGastos])

  if (loading) return <div className="p-8 text-white/20 text-[13px] font-sans">Cargando…</div>

  const showDelta = period !== 'todo'
  const canGoForward = offset < 0

  const kpis = [
    { label: 'Sesiones',  value: stats.count,      prev: prevStats.count,      display: String(stats.count) },
    { label: 'Ingresos',  value: stats.ingresos,   prev: prevStats.ingresos,   display: fmt(stats.ingresos) },
    { label: 'Cobrado',   value: stats.cobrado,    prev: prevStats.cobrado,    display: fmt(stats.cobrado) },
    { label: 'Pendiente', value: stats.pendiente,  prev: prevStats.pendiente,  display: fmt(stats.pendiente) },
    { label: 'Gastos',    value: stats.gastoTotal, prev: prevStats.gastoTotal, display: fmt(stats.gastoTotal) },
  ]

  return (
    <div className="p-4 md:p-8 max-w-[1100px]">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
        <h1 className="text-[1.4rem] font-serif italic text-white/80">Resumen</h1>

        <div className="flex flex-col items-start md:items-end gap-3">
          {/* Tipo de período */}
          <div className="flex gap-2 flex-wrap">
            {PERIODS.map(p => (
              <button
                key={p.id}
                onClick={() => changePeriod(p.id)}
                className={`text-[11px] tracking-[0.08em] uppercase px-4 py-[0.4rem] rounded-[20px] border font-sans transition-colors
                  ${period === p.id
                    ? 'bg-pink text-white border-pink'
                    : 'bg-transparent text-white/35 border-white/10 hover:text-white/60 hover:border-white/20'}`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Navegación de período */}
          <div className="flex items-center gap-3">
              {period !== 'todo' && (
                <button
                  onClick={() => setOffset(o => o - 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-full border border-white/10 text-white/35 hover:text-white hover:border-white/30 transition-colors text-[13px]"
                >
                  ←
                </button>
              )}
              <span className="text-[12px] text-white/55 font-sans min-w-[180px] text-center">
                {getPeriodLabel(period, offset)}
              </span>
              {period !== 'todo' && (
              <button
                onClick={() => setOffset(o => o + 1)}
                disabled={!canGoForward}
                className={`w-7 h-7 flex items-center justify-center rounded-full border transition-colors text-[13px]
                  ${canGoForward
                    ? 'border-white/10 text-white/35 hover:text-white hover:border-white/30'
                    : 'border-white/[0.04] text-white/10 cursor-default'}`}
              >
                →
              </button>
              )}
            </div>
        </div>
      </div>

      {/* ── KPIs principales ── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-4">
        {kpis.map(k => (
          <div key={k.label} className="bg-[#1A1A1A] rounded-[10px] px-5 py-4 border border-white/[0.06]">
            <div className="text-[10px] tracking-[0.1em] uppercase text-white/25 mb-2 font-sans">{k.label}</div>
            <div className="text-[1.2rem] font-serif italic text-white/75 mb-1">{k.display}</div>
            {showDelta && <Delta value={deltaPct(k.value, k.prev)} />}
          </div>
        ))}
      </div>

      {/* ── KPIs derivados ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-[#1A1A1A] rounded-[10px] px-5 py-4 border border-white/[0.06]">
          <div className="text-[10px] tracking-[0.1em] uppercase text-white/25 mb-2 font-sans">Ganancia neta</div>
          <div className={`text-[1.2rem] font-serif italic mb-1 ${stats.ganancia >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {fmt(stats.ganancia)}
          </div>
          <div className="text-[10px] text-white/20 font-sans">cobrado − gastos</div>
        </div>
        <div className="bg-[#1A1A1A] rounded-[10px] px-5 py-4 border border-white/[0.06]">
          <div className="text-[10px] tracking-[0.1em] uppercase text-white/25 mb-2 font-sans">Ticket promedio</div>
          <div className="text-[1.2rem] font-serif italic text-white/75 mb-1">{fmt(stats.ticket)}</div>
          <div className="text-[10px] text-white/20 font-sans">por sesión activa</div>
        </div>
        <div className="bg-[#1A1A1A] rounded-[10px] px-5 py-4 border border-white/[0.06]">
          <div className="text-[10px] tracking-[0.1em] uppercase text-white/25 mb-2 font-sans">% cobrado</div>
          <div className="text-[1.2rem] font-serif italic text-white/75 mb-1">{stats.pctCobrado}%</div>
          <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden mt-2">
            <div className="h-full bg-emerald-400 rounded-full transition-all duration-500" style={{ width: `${stats.pctCobrado}%` }} />
          </div>
        </div>
        <div className="bg-[#1A1A1A] rounded-[10px] px-5 py-4 border border-white/[0.06]">
          <div className="text-[10px] tracking-[0.1em] uppercase text-white/25 mb-2 font-sans">Mayor sesión</div>
          {topSesion ? (
            <>
              <div className="text-[1.2rem] font-serif italic text-white/75 mb-1">{fmt(topSesion.monto_total || 0)}</div>
              <div className="text-[10px] text-white/30 font-sans truncate">{topSesion.cliente}</div>
              <div className="text-[9px] text-white/20 font-sans">{topSesion.tipo || '—'}</div>
            </>
          ) : (
            <div className="text-[10px] text-white/20 font-sans mt-1">Sin datos</div>
          )}
        </div>
      </div>

      {/* ── Trend chart ── */}
      <div className="bg-[#1A1A1A] rounded-[10px] p-6 border border-white/[0.06] mb-6">
        <div className="text-[10px] tracking-[0.12em] uppercase text-white/25 mb-5 font-sans">
          Evolución histórica
        </div>
        <TrendBars items={trendData} />
      </div>

      {/* ── Bottom charts row 1 ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="col-span-2 bg-[#1A1A1A] rounded-[10px] p-6 border border-white/[0.06]">
          <div className="text-[10px] tracking-[0.12em] uppercase text-white/25 mb-5 font-sans">
            Rentabilidad por tipo
            <span className="ml-2 normal-case tracking-normal text-white/15">ingresos · ticket promedio</span>
          </div>
          <RentabilidadPorTipo sesiones={currSesiones} />
        </div>

        <div className="bg-[#1A1A1A] rounded-[10px] p-6 border border-white/[0.06]">
          <div className="text-[10px] tracking-[0.12em] uppercase text-white/25 mb-5 font-sans">
            Próximas sesiones
            <span className="ml-2 normal-case tracking-normal text-white/15">30 días</span>
          </div>
          <ProximasSesiones sesiones={sesiones} />
        </div>
      </div>

      {/* ── Bottom charts row 2 ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#1A1A1A] rounded-[10px] p-6 border border-white/[0.06]">
          <div className="text-[10px] tracking-[0.12em] uppercase text-white/25 mb-5 font-sans">Sesiones por estado</div>
          {porEstado.length === 0
            ? <div className="text-white/20 text-[12px] font-sans">Sin datos</div>
            : <HBar items={porEstado} colorFn={l => ESTADO_COLOR[l] || 'bg-white/20'} textColorFn={l => ESTADO_TEXT[l] || 'text-white/55'} />}
        </div>

        <div className="bg-[#1A1A1A] rounded-[10px] p-6 border border-white/[0.06]">
          <div className="text-[10px] tracking-[0.12em] uppercase text-white/25 mb-5 font-sans">Gastos por categoría</div>
          {porCategoria.length === 0
            ? <div className="text-white/20 text-[12px] font-sans">Sin datos</div>
            : <HBar items={porCategoria} colorFn={() => 'bg-amber-400'} formatVal={fmt} />}
        </div>
      </div>

    </div>
  )
}

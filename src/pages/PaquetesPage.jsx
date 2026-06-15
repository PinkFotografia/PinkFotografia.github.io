import { useParams, useNavigate } from 'react-router-dom'
import { usePaquetes } from '../hooks/usePaquetes'
import { useLang } from '../context/LangContext'
import { PAQUETE_CATEGORIES } from '../lib/categories'
import { FALLBACK_PAQUETES } from '../lib/fallbackPaquetes'
import CategoryTabs from '../components/ui/CategoryTabs'
import PaqueteCard from '../components/ui/PaqueteCard'
import Reveal from '../components/ui/Reveal'

const WA = 'https://wa.me/5492974197787?text='
const SUBCATS = ['pre-cumple', 'individual-familiar']
const GROUPED  = ['casamientos', 'quince']

function priceValidUntil() {
  const d = new Date()
  d.setMonth(d.getMonth() + 3)
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const k = item[key] || ''
    if (!acc[k]) acc[k] = []
    acc[k].push(item)
    return acc
  }, {})
}

function CardGrid({ paquetes, catLabel }) {
  return (
    <div className={`grid gap-4 ${paquetes.length === 1 ? 'max-w-[320px] mx-auto' : paquetes.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-[640px] mx-auto' : 'grid-cols-1 sm:grid-cols-3'}`}>
      {paquetes.map(p => (
        <PaqueteCard key={p.id} paquete={p} categoriaLabel={catLabel} />
      ))}
    </div>
  )
}

function ServiciosIndividuales({ items, catLabel }) {
  const waBase = encodeURIComponent(`Hola Fernanda! Me interesa consultar por`)
  return (
    <div className="rounded-[12px] border border-black/[0.07] overflow-hidden bg-white">
      {items.map((p, idx) => (
        <a
          key={p.id}
          href={`${WA}${encodeURIComponent(`Hola Fernanda! Me interesa consultar por ${p.nombre} de ${catLabel}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-between px-4 py-3 no-underline hover:bg-pink/[0.04] transition-colors ${idx > 0 ? 'border-t border-black/[0.05]' : ''}`}
        >
          <span className="text-[14px] text-ink font-sans">{p.nombre}</span>
          <span className="text-[14px] font-semibold text-pink ml-4 shrink-0">{p.precio}</span>
        </a>
      ))}
    </div>
  )
}

function ProductosList({ paquetes }) {
  const grupos = groupBy(paquetes, 'grupo')
  const notaDescuento = paquetes.find(p => p.nota)?.nota

  return (
    <div className="space-y-6">
      {Object.entries(grupos).map(([grupo, items]) => (
        <div key={grupo}>
          <div className="text-[10px] tracking-[0.14em] uppercase text-ink/40 mb-2 font-sans">{grupo}</div>
          <div className="rounded-[12px] border border-black/[0.07] overflow-hidden bg-white">
            {items.map((p, idx) => (
              <div
                key={p.id}
                className={`flex items-center justify-between px-4 py-3 ${idx > 0 ? 'border-t border-black/[0.05]' : ''}`}
              >
                <span className="text-[14px] text-ink font-sans">{p.nombre}</span>
                <span className="text-[14px] font-semibold text-pink ml-4 shrink-0">{p.precio}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      {notaDescuento && (
        <div className="bg-pink/[0.06] border border-pink/20 rounded-[10px] px-4 py-3 text-[12px] text-ink/60 leading-relaxed">
          🏷️ {notaDescuento}
        </div>
      )}
    </div>
  )
}

function Adicionales({ adicionales, t, lang }) {
  if (!adicionales?.length) return null
  return (
    <div className="mt-5 rounded-[10px] bg-black/[0.03] border border-black/[0.06] px-4 py-3">
      <div className="text-[10px] tracking-[0.12em] uppercase text-ink/40 mb-2 font-sans">{t('Adicionales', 'Add-ons')}</div>
      <div className="flex flex-wrap gap-2">
        {adicionales.map((a, i) => {
          const txt = typeof a === 'string' ? a : (lang === 'es' ? a.es : (a.en || a.es))
          return (
            <span key={i} className="text-[12px] text-ink/60 bg-white border border-black/[0.08] rounded-[20px] px-3 py-1">{txt}</span>
          )
        })}
      </div>
    </div>
  )
}

export default function PaquetesPage() {
  const { categoria } = useParams()
  const navigate = useNavigate()
  const { data, loading, error } = usePaquetes(categoria)
  const { t, lang } = useLang()

  const cat = PAQUETE_CATEGORIES[categoria]
  if (!cat) return null

  const paquetes = (!loading && !error && data.length > 0)
    ? data
    : (FALLBACK_PAQUETES[categoria] || [])

  const hasSubcats  = SUBCATS.includes(categoria)
  const hasGrupos   = GROUPED.includes(categoria)
  const isProductos = categoria === 'productos'

  const waConsulta = `${WA}${encodeURIComponent(`Hola Fernanda! Quiero consultar sobre ${cat.es}`)}`

  const globalNota = paquetes.find(p => p.nota)?.nota
  const globalAds  = paquetes.find(p => p.adicionales?.length)?.adicionales

  return (
    <>
      {/* Tabs */}
      <CategoryTabs basePath="/paquetes" categories={PAQUETE_CATEGORIES} />

      {/* Header compacto */}
      <div className="bg-[#1A1A1A] pt-6 pb-5 px-5 text-center border-b border-white/[0.04]">
        <div className="text-[9px] tracking-[0.2em] uppercase text-pink/70 mb-1 font-sans">Paquetes</div>
        <h1 className="font-serif text-[1.6rem] italic font-light text-white">{t(cat.es, cat.en)}</h1>
      </div>

      {/* Contenido */}
      <div className="bg-cream min-h-screen">
        <div className="max-w-[900px] mx-auto px-4 py-8">

          {/* ── PRODUCTOS ───────────────────────────── */}
          {isProductos && (
            <Reveal>
              <ProductosList paquetes={paquetes} />
            </Reveal>
          )}

          {/* ── SUBCATEGORÍAS (estudio / exterior) ──── */}
          {hasSubcats && (() => {
            const porSubcat = groupBy(paquetes, 'subcategoria')
            return Object.entries(porSubcat).map(([subcat, items]) => (
              <Reveal key={subcat} className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[11px] tracking-[0.14em] uppercase text-pink font-sans">{subcat}</span>
                  <div className="flex-1 h-px bg-black/10" />
                </div>
                <CardGrid paquetes={items} catLabel={cat.es} />
              </Reveal>
            ))
          })()}

          {/* ── GRUPOS (casamientos / quince) ───────── */}
          {hasGrupos && (() => {
            const porGrupo = groupBy(paquetes, 'grupo')
            return Object.entries(porGrupo).map(([grupo, items]) => (
              <Reveal key={grupo} className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[11px] tracking-[0.14em] uppercase text-ink/50 font-sans">{grupo}</span>
                  <div className="flex-1 h-px bg-black/10" />
                </div>
                {grupo === 'Servicios individuales'
                  ? <ServiciosIndividuales items={items} catLabel={cat.es} />
                  : <CardGrid paquetes={items} catLabel={cat.es} />
                }
              </Reveal>
            ))
          })()}

          {/* ── ESTÁNDAR ────────────────────────────── */}
          {!hasSubcats && !hasGrupos && !isProductos && (
            <Reveal>
              <CardGrid paquetes={paquetes} catLabel={cat.es} />
            </Reveal>
          )}

          {/* Nota + Adicionales globales */}
          {!isProductos && (
            <Reveal className="mt-6">
              {globalNota && (
                <div className="bg-pink/[0.05] border border-pink/15 rounded-[10px] px-4 py-3 text-[12px] text-ink/55 mb-3 leading-relaxed">
                  ℹ️ {globalNota}
                </div>
              )}
              {!hasGrupos && <Adicionales adicionales={globalAds} t={t} lang={lang} />}
            </Reveal>
          )}

          {/* Validez de precios */}
          {!isProductos && (
            <Reveal className="mt-4">
              <div className="text-[11px] text-ink/35 text-center font-sans">
                {t(`Precios válidos hasta el ${priceValidUntil()}`, `Prices valid until ${priceValidUntil()}`)}
              </div>
            </Reveal>
          )}

          {/* CTA WhatsApp */}
          <Reveal className="text-center mt-8">
            <button
              onClick={() => navigate(`/portafolio/${categoria === 'combo' ? 'pelotero' : categoria}`)}
              className="text-[11px] tracking-[0.08em] uppercase text-pink hover:text-pink-dark transition-colors font-sans mb-4 block mx-auto"
            >
              {t('Ver portafolio →', 'View portfolio →')}
            </button>
            <a
              href={waConsulta}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-[0.8rem] rounded-[25px] bg-pink text-white no-underline text-[12px] tracking-[0.08em] uppercase hover:bg-pink-dark transition-colors font-sans"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.134.558 4.133 1.535 5.867L.057 23.454a.5.5 0 0 0 .613.613l5.588-1.478A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.7-.504-5.255-1.385l-.376-.217-3.892 1.029 1.029-3.892-.217-.376A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              {t('Consultar por WhatsApp', 'Ask via WhatsApp')}
            </a>
          </Reveal>

        </div>
      </div>
    </>
  )
}

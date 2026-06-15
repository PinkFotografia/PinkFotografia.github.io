import { useLang } from '../../context/LangContext'

const WA_BASE = 'https://wa.me/5492974197787?text='

function itemText(item, lang) {
  if (typeof item === 'string') return item
  return lang === 'es' ? item.es : (item.en || item.es)
}

export default function PaqueteCard({ paquete, categoriaLabel }) {
  const { lang, t } = useLang()
  const { nombre, precio, items = [], featured } = paquete

  const waMsg = encodeURIComponent(`Hola Fernanda! Me interesa el paquete ${nombre} de ${categoriaLabel}`)
  const waLink = `${WA_BASE}${waMsg}`

  return (
    <div
      className={`relative flex flex-col rounded-[16px] overflow-hidden transition-all duration-300
        ${featured
          ? 'bg-white border-2 border-pink shadow-[0_8px_32px_rgba(212,83,126,0.18)] md:-translate-y-2'
          : 'bg-white border border-black/[0.07] shadow-sm hover:shadow-md hover:-translate-y-1'
        }`}
    >
      {featured && (
        <div className="absolute top-3 right-3 text-[9px] tracking-[0.12em] uppercase bg-pink text-white px-[10px] py-[3px] rounded-[20px] font-sans">
          {t('Más popular', 'Most popular')}
        </div>
      )}

      {/* Header */}
      <div className={`px-5 pt-5 pb-4 border-b border-black/[0.06] ${featured ? 'pt-6' : ''}`}>
        <div className="font-serif text-[1.35rem] italic font-normal text-ink leading-tight mb-1">
          {nombre}
        </div>
        <div className={`text-[1.05rem] font-sans font-semibold tracking-tight ${featured ? 'text-pink' : 'text-ink'}`}>
          {precio || t('A consultar', 'On request')}
        </div>
      </div>

      {/* Items */}
      {items.length > 0 && (
        <div className="px-5 py-4 flex-1">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-[13px] text-ink-muted mb-2 leading-snug">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] flex-shrink-0 mt-[1px] ${featured ? 'bg-pink/10 text-pink' : 'bg-black/[0.05] text-ink-muted'}`}>
                ✓
              </span>
              <span>{itemText(item, lang)}</span>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="px-5 pb-5 pt-3 border-t border-black/[0.05]">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 w-full py-[0.65rem] rounded-[25px] text-[11px] tracking-[0.08em] uppercase no-underline transition-all duration-[250ms] font-sans
            ${featured
              ? 'bg-pink text-white hover:bg-pink-dark'
              : 'border border-black/15 text-ink-muted hover:border-pink hover:text-pink'
            }`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-[13px] h-[13px] shrink-0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.134.558 4.133 1.535 5.867L.057 23.454a.5.5 0 0 0 .613.613l5.588-1.478A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.7-.504-5.255-1.385l-.376-.217-3.892 1.029 1.029-3.892-.217-.376A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          {t('Consultar', 'Ask')}
        </a>
      </div>
    </div>
  )
}

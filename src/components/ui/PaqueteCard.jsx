import { useLang } from '../../context/LangContext'
import Reveal from './Reveal'

const WA_BASE = 'https://wa.me/5492974197787?text='

function getItemText(item, lang) {
  if (typeof item === 'string') return item
  return lang === 'es' ? item.es : (item.en || item.es)
}

export default function PaqueteCard({ paquete, categoriaLabel, delay = 0 }) {
  const { lang, t } = useLang()
  const { nombre, precio, items = [], featured } = paquete

  const waMsg = encodeURIComponent(`Hola Fernanda! Me interesa el paquete ${nombre} de ${categoriaLabel}`)
  const waLink = `${WA_BASE}${waMsg}`

  return (
    <Reveal delay={delay}>
      <div
        className={`relative bg-white rounded-[20px] overflow-hidden flex flex-col
          transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]
          ${featured
            ? 'border-2 border-pink shadow-[0_8px_30px_rgba(212,83,126,0.15)]'
            : 'border border-black/[0.06]'
          }`}
      >
        {/* Badge "Más popular" */}
        {featured && (
          <div className="absolute top-4 right-4 text-[10px] tracking-[0.1em] uppercase bg-pink text-white px-[10px] py-[3px] rounded-[20px]">
            {t('Más popular', 'Most popular')}
          </div>
        )}

        {/* Header */}
        <div className="px-7 pt-8 pb-6 border-b border-black/[0.06]">
          <div className="font-serif text-[1.6rem] italic font-normal text-ink mb-2">
            {nombre}
          </div>
          <div className="text-[13px] text-ink-muted tracking-[0.04em]">
            {precio || t('Consultá el precio por WhatsApp', 'Ask for pricing via WhatsApp')}
          </div>
        </div>

        {/* Items */}
        <div className="px-7 py-6 flex-1">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-[10px] text-[14px] text-ink-muted mb-3 leading-[1.5]">
              <div className="w-[18px] h-[18px] rounded-full bg-pink-light text-pink flex items-center justify-center text-[10px] flex-shrink-0 mt-[2px]">
                ✓
              </div>
              <span>{getItemText(item, lang)}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-7 pb-7 pt-5 border-t border-black/[0.06]">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full text-center py-3 rounded-[25px] text-[12px] tracking-[0.08em] uppercase no-underline transition-all duration-[250ms] font-sans
              ${featured
                ? 'bg-pink text-white hover:bg-pink-dark'
                : 'border border-black/15 text-ink-muted hover:border-pink hover:text-pink'
              }`}
          >
            📱 {t('Consultar precio', 'Ask for price')}
          </a>
        </div>
      </div>
    </Reveal>
  )
}

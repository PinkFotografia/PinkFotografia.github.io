import { useLang } from '../../context/LangContext'
import { CATEGORIES, CATEGORY_SUBTITLES } from '../../lib/categories'
import { useConfiguracion } from '../../hooks/useConfiguracion'

export default function CategoryHero({ categoria, type = 'paquetes' }) {
  const { t } = useLang()
  const { config } = useConfiguracion()

  const cat = CATEGORIES[categoria]
  const sub = CATEGORY_SUBTITLES[categoria]
  if (!cat) return null

  const bgImage = config[cat.imgKey] || cat.fallback
  const typeLabel = type === 'paquetes' ? t('Paquetes', 'Packages') : t('Portafolio', 'Portfolio')

  return (
    <div
      className="relative bg-[#1A1A1A] pt-32 pb-16 text-center overflow-hidden"
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/75" />
      {/* Resplandor pink sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,83,126,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10">
        <div className="text-[10px] tracking-[0.2em] uppercase text-pink-mid mb-4">
          {typeLabel}
        </div>
        <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] italic font-light text-white mb-2">
          <em className="text-pink-mid not-italic">{t(cat.es, cat.en)}</em>
        </h1>
        {sub && (
          <p className="text-[14px] text-white/45 mt-2">
            {t(sub.es, sub.en)}
          </p>
        )}
      </div>
    </div>
  )
}

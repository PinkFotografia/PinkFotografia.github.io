import { useParams, Link, useNavigate } from 'react-router-dom'
import { usePaquetes } from '../hooks/usePaquetes'
import { useLang } from '../context/LangContext'
import { CATEGORIES } from '../lib/categories'
import { FALLBACK_PAQUETES } from '../lib/fallbackPaquetes'
import { SESIONES_INFO } from '../lib/sesionesInfo'
import CategoryHero from '../components/ui/CategoryHero'
import CategoryTabs from '../components/ui/CategoryTabs'
import PaqueteCard from '../components/ui/PaqueteCard'
import SesionInfoSection from '../components/ui/SesionInfoSection'
import Reveal from '../components/ui/Reveal'
import SectionKicker from '../components/ui/SectionKicker'

const WA_GENERAL = 'https://wa.me/5492974197787?text='

export default function PaquetesPage() {
  const { categoria } = useParams()
  const navigate = useNavigate()
  const { data, loading, error } = usePaquetes(categoria)
  const { t } = useLang()

  const cat = CATEGORIES[categoria]
  if (!cat) return null

  const paquetes = (!loading && !error && data.length > 0)
    ? data
    : FALLBACK_PAQUETES[categoria] || []

  const sesionesInfo = SESIONES_INFO[categoria] || null

  const waConsulta = `${WA_GENERAL}${encodeURIComponent(`Hola Fernanda! Me gustaria consultar paquetes de ${cat.es}`)}`

  return (
    <>
      <CategoryHero categoria={categoria} type="paquetes" />
      <CategoryTabs basePath="/paquetes" />

      <div className="bg-cream py-14 md:py-20 px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto">

          {/* Encabezado */}
          <Reveal className="text-center mb-10 md:mb-14">
            <SectionKicker centered>{t('Nuestros paquetes', 'Our packages')}</SectionKicker>
            <p className="text-[14px] text-ink-muted mt-3 mb-5">
              {t(
                'Todos los precios son a consultar — cada sesión es única y puede adaptarse a tus necesidades.',
                'All prices are on request — every session is unique and can be tailored to your needs.'
              )}
            </p>
            <div className="flex flex-col items-center gap-3">
              <Link
                to="/terminos"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.08em] uppercase text-pink border border-pink/30 bg-pink/[0.06] hover:bg-pink/[0.12] hover:border-pink/60 transition-all duration-200 rounded-[20px] px-5 py-2 no-underline font-sans"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[14px] h-[14px] shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                {t('Ver Términos y Condiciones', 'View Terms & Conditions')}
              </Link>
              <button
                onClick={() => navigate(`/portafolio/${categoria}`)}
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase text-pink hover:gap-4 transition-all duration-200"
              >
                {t('Ver portafolio de esta categoría →', 'View portfolio for this category →')}
              </button>
            </div>
          </Reveal>

          {/* Grid de paquetes — 1 col mobile, 2 o 3 en desktop */}
          <div className={`grid gap-6 grid-cols-1 ${paquetes.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
            {paquetes.map((p, i) => (
              <PaqueteCard
                key={p.id}
                paquete={p}
                categoriaLabel={cat.es}
                delay={(i % 3) + 1}
              />
            ))}
          </div>

          {/* CTA WhatsApp general */}
          <Reveal className="text-center mt-14">
            <a
              href={waConsulta}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[10px] px-8 py-[0.85rem] rounded-[25px] bg-pink text-white no-underline text-[12px] tracking-[0.08em] uppercase hover:bg-pink-dark transition-colors font-sans"
            >
              📱 {t('Consultar por WhatsApp', 'Ask via WhatsApp')}
            </a>
          </Reveal>

        </div>
      </div>

      {sesionesInfo && <SesionInfoSection sesiones={sesionesInfo} />}
    </>
  )
}

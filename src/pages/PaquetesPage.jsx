import { useParams } from 'react-router-dom'
import { usePaquetes } from '../hooks/usePaquetes'
import { useLang } from '../context/LangContext'
import { CATEGORIES } from '../lib/categories'
import { FALLBACK_PAQUETES } from '../lib/fallbackPaquetes'
import CategoryHero from '../components/ui/CategoryHero'
import CategoryTabs from '../components/ui/CategoryTabs'
import PaqueteCard from '../components/ui/PaqueteCard'
import Reveal from '../components/ui/Reveal'
import SectionKicker from '../components/ui/SectionKicker'

const WA_GENERAL = 'https://wa.me/5492974197787?text='

export default function PaquetesPage() {
  const { categoria } = useParams()
  const { data, loading, error } = usePaquetes(categoria)
  const { t } = useLang()

  const cat = CATEGORIES[categoria]
  if (!cat) return null

  // Si Supabase devuelve datos los usamos; si no, mostramos los hardcodeados
  const paquetes = (!loading && !error && data.length > 0)
    ? data
    : FALLBACK_PAQUETES[categoria] || []

  const waConsulta = `${WA_GENERAL}${encodeURIComponent(`Hola Fernanda! Me gustaria consultar paquetes de ${cat.es}`)}`

  return (
    <>
      <CategoryHero categoria={categoria} type="paquetes" />
      <CategoryTabs basePath="/paquetes" />

      <div className="bg-cream py-20 px-12">
        <div className="max-w-[1000px] mx-auto">

          {/* Encabezado */}
          <Reveal className="text-center mb-14">
            <SectionKicker centered>{t('Nuestros paquetes', 'Our packages')}</SectionKicker>
            <p className="text-[14px] text-ink-muted mt-3">
              {t(
                'Todos los precios son a consultar — cada sesión es única y puede adaptarse a tus necesidades.',
                'All prices are on request — every session is unique and can be tailored to your needs.'
              )}
            </p>
          </Reveal>

          {/* Grid de paquetes — 2 o 3 columnas según cantidad */}
          <div className={`grid gap-6 ${paquetes.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
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
    </>
  )
}

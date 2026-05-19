import { useNavigate } from 'react-router-dom'
import { useLang } from '../../context/LangContext'
import { useConfiguracion } from '../../hooks/useConfiguracion'
import Reveal from '../ui/Reveal'
import SectionKicker from '../ui/SectionKicker'
import CategoryCard from '../ui/CategoryCard'

const SERVICES = [
  { cat: 'estudio',     imgKey: 'srv-estudio',   fallback: '/assets/srv-estudio.jpg',   position: 'center',     tag: { es: 'Estudio',    en: 'Studio'   }, name: { es: 'Sesiones estudio infantiles y familiares', en: 'Studio sessions for kids & families' } },
  { cat: 'exterior',    imgKey: 'srv-exterior',   fallback: '/assets/srv-exterior.jpg',  position: 'center',     tag: { es: 'Exterior',   en: 'Outdoor'  }, name: { es: 'Sesiones al aire libre',                  en: 'Outdoor sessions'                    } },
  { cat: 'embarazadas', imgKey: 'srv-embarazo',   fallback: '/assets/srv-embarazo.jpg',  position: 'center top', tag: { es: 'Maternidad', en: 'Maternity'}, name: { es: 'Sesiones de embarazo',                    en: 'Maternity sessions'                  } },
  { cat: 'pelotero',    imgKey: 'srv-pelotero',   fallback: '/assets/srv-pelotero.jpg',  position: 'center',     tag: { es: 'Cumpleaños', en: 'Birthday' }, name: { es: 'Pelotero y fiestas infantiles',            en: 'Kids parties & celebrations'         } },
  { cat: 'casamientos', imgKey: 'srv-casamiento', fallback: '/assets/srv-casamiento.jpg',position: 'center',     tag: { es: 'Eventos',    en: 'Events'   }, name: { es: 'Casamientos y 15 años',                   en: 'Weddings & Quinceañera'              } },
  { cat: 'comuniones',  imgKey: 'srv-comunion',   fallback: '/assets/srv-comunion.jpg',  position: 'center top', tag: { es: 'Religioso',  en: 'Religious'}, name: { es: 'Comuniones y Confirmaciones',              en: 'Communions & Confirmations'          } },
]

export default function Servicios() {
  const navigate = useNavigate()
  const { t } = useLang()
  const { config } = useConfiguracion()

  return (
    <section id="servicios" className="bg-cream-dark py-16 md:py-24 px-6 md:px-12">

      <Reveal className="text-center mb-12 md:mb-16">
        <SectionKicker centered>{t('Servicios', 'Services')}</SectionKicker>
        <h2 className="font-serif text-[clamp(1.8rem,2.8vw,2.6rem)] italic font-normal text-ink mt-2">
          {t('¿Qué sesión estás buscando?', 'What session are you looking for?')}
        </h2>
      </Reveal>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {SERVICES.map((s, i) => (
          <Reveal key={s.cat} delay={(i % 3) + 1}>
            <CategoryCard
              image={config[s.imgKey] || s.fallback}
              position={s.position}
              tag={t(s.tag.es, s.tag.en)}
              name={t(s.name.es, s.name.en)}
              cta={t('Ver paquetes', 'View packages')}
              onClick={() => navigate(`/paquetes/${s.cat}`)}
              className="h-[320px]"
            />
          </Reveal>
        ))}
      </div>

    </section>
  )
}

import { useNavigate } from 'react-router-dom'
import { useLang } from '../../context/LangContext'
import { useConfiguracion } from '../../hooks/useConfiguracion'
import Reveal from '../ui/Reveal'
import SectionKicker from '../ui/SectionKicker'
import CategoryCard from '../ui/CategoryCard'

const CATS = [
  { cat: 'estudio',     imgKey: 'srv-estudio',   fallback: '/assets/srv-estudio.jpg',    position: 'center',     tag: { es: 'Estudio',    en: 'Studio'   }, name: { es: 'Sesiones de estudio',      en: 'Studio sessions'     } },
  { cat: 'exterior',    imgKey: 'srv-exterior',   fallback: '/assets/srv-exterior.jpg',   position: 'center',     tag: { es: 'Exterior',   en: 'Outdoor'  }, name: { es: 'Sesiones al aire libre',   en: 'Outdoor sessions'    } },
  { cat: 'embarazadas', imgKey: 'srv-embarazo',   fallback: '/assets/srv-embarazo.jpg',   position: 'center top', tag: { es: 'Maternidad', en: 'Maternity'}, name: { es: 'Embarazadas',              en: 'Maternity'           } },
  { cat: 'pelotero',    imgKey: 'srv-pelotero',   fallback: '/assets/srv-pelotero.jpg',   position: 'center',     tag: { es: 'Cumpleaños', en: 'Birthday' }, name: { es: 'Pelotero y fiestas',       en: 'Kids parties'        } },
  { cat: 'casamientos', imgKey: 'srv-casamiento', fallback: '/assets/srv-casamiento.jpg', position: 'center',     tag: { es: 'Eventos',    en: 'Events'   }, name: { es: 'Casamientos y 15 años',   en: 'Weddings & Quinceañera' } },
  { cat: 'comuniones',  imgKey: 'srv-comunion',   fallback: '/assets/srv-comunion.jpg',   position: 'center top', tag: { es: 'Religioso',  en: 'Religious'}, name: { es: 'Comuniones y Confirmaciones', en: 'Communions'      } },
]

export default function PortfolioPreview() {
  const navigate = useNavigate()
  const { t } = useLang()
  const { config } = useConfiguracion()

  return (
    <section id="portafolio" className="bg-cream py-24 px-12">

      <Reveal className="text-center mb-16">
        <SectionKicker centered>{t('Portafolio', 'Portfolio')}</SectionKicker>
        <h2 className="font-serif text-[clamp(1.8rem,2.8vw,2.6rem)] italic font-normal text-ink mt-2">
          {t('Momentos que guardamos juntos', 'Moments we preserve together')}
        </h2>
      </Reveal>

      <div className="max-w-[1200px] mx-auto grid grid-cols-3 gap-6">
        {CATS.map((c, i) => (
          <Reveal key={c.cat} delay={(i % 3) + 1}>
            <CategoryCard
              image={config[c.imgKey] || c.fallback}
              position={c.position}
              tag={t(c.tag.es, c.tag.en)}
              name={t(c.name.es, c.name.en)}
              cta={t('Ver álbumes', 'View albums')}
              onClick={() => navigate(`/portafolio/${c.cat}`)}
              className="h-[280px]"
            />
          </Reveal>
        ))}
      </div>

    </section>
  )
}

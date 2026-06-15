import { useNavigate } from 'react-router-dom'
import { useLang } from '../../context/LangContext'
import { useConfiguracion } from '../../hooks/useConfiguracion'
import { PAQUETE_CATEGORIES } from '../../lib/categories'
import Reveal from '../ui/Reveal'
import SectionKicker from '../ui/SectionKicker'
import CategoryCard from '../ui/CategoryCard'

const SERVICES = [
  { cat: 'pre-cumple',          imgKey: 'srv-estudio',    fallback: '/assets/srv-estudio.jpg',    position: 'center',     name: { es: 'Pre Cumple',                    en: 'Pre Birthday'           } },
  { cat: 'cake-smash',          imgKey: 'srv-cake-smash', fallback: '/assets/srv-estudio.jpg',    position: 'center',     name: { es: 'Cake Smash',                    en: 'Cake Smash'             } },
  { cat: 'maternidad',          imgKey: 'srv-embarazo',   fallback: '/assets/srv-embarazo.jpg',   position: 'center top', name: { es: 'Maternidad',                    en: 'Maternity'              } },
  { cat: 'individual-familiar', imgKey: 'srv-exterior',   fallback: '/assets/srv-exterior.jpg',   position: 'center',     name: { es: 'Individual y Familiar',         en: 'Individual & Family'    } },
  { cat: 'pelotero',            imgKey: 'srv-pelotero',   fallback: '/assets/srv-pelotero.jpg',   position: 'center',     name: { es: 'Pelotero',                      en: 'Kids Parties'           } },
  { cat: 'evento-social',       imgKey: 'srv-evento',     fallback: '/assets/srv-casamiento.jpg', position: 'center',     name: { es: 'Evento Social',                 en: 'Social Event'           } },
  { cat: 'baby-shower',         imgKey: 'srv-babyshower', fallback: '/assets/srv-embarazo.jpg',   position: 'center top', name: { es: 'Baby Shower',                   en: 'Baby Shower'            } },
  { cat: 'revelacion-genero',   imgKey: 'srv-revelacion', fallback: '/assets/srv-embarazo.jpg',   position: 'center',     name: { es: 'Revelación de Género',          en: 'Gender Reveal'          } },
  { cat: 'casamientos',         imgKey: 'srv-casamiento', fallback: '/assets/srv-casamiento.jpg', position: 'center',     name: { es: 'Casamientos',                   en: 'Weddings'               } },
  { cat: 'quince',              imgKey: 'srv-quince',     fallback: '/assets/srv-casamiento.jpg', position: 'center',     name: { es: '15 Años',                       en: 'Quinceañera'            } },
  { cat: 'bautismo',            imgKey: 'srv-bautismo',   fallback: '/assets/srv-comunion.jpg',   position: 'center top', name: { es: 'Bautismo',                      en: 'Baptism'                } },
  { cat: 'comuniones',          imgKey: 'srv-comunion',   fallback: '/assets/srv-comunion.jpg',   position: 'center top', name: { es: 'Comuniones',                    en: 'Communions'             } },
  { cat: 'temporada',           imgKey: 'srv-temporada',  fallback: '/assets/srv-exterior.jpg',   position: 'center',     name: { es: 'Sesiones de Temporada',         en: 'Seasonal Sessions'      } },
  { cat: 'combo',               imgKey: 'srv-combo',      fallback: '/assets/srv-pelotero.jpg',   position: 'center',     name: { es: 'Combo Pre Cumple + Pelotero',   en: 'Bundle'                 } },
  { cat: 'productos',           imgKey: 'srv-productos',  fallback: '/assets/srv-estudio.jpg',    position: 'center',     name: { es: 'Productos',                     en: 'Products'               } },
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

      <div className="max-w-[1200px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {SERVICES.map((s, i) => (
          <Reveal key={s.cat} delay={(i % 3) + 1}>
            <CategoryCard
              image={config[s.imgKey] || s.fallback}
              position={s.position}
              tag={t(PAQUETE_CATEGORIES[s.cat]?.es ?? '', PAQUETE_CATEGORIES[s.cat]?.en ?? '')}
              name={t(s.name.es, s.name.en)}
              cta={t('Ver paquetes', 'View packages')}
              onClick={() => navigate(`/paquetes/${s.cat}`)}
className="h-[240px]"
            />
          </Reveal>
        ))}
      </div>

    </section>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../../context/LangContext'
import { useConfiguracion } from '../../hooks/useConfiguracion'
import Reveal from '../ui/Reveal'
import SectionKicker from '../ui/SectionKicker'

const ACCORDION = [
  {
    id: 'bebes-ninos',
    label:   { es: 'Bebés y niños',           en: 'Babies & Kids' },
    sessions: [
      { cat: 'pre-cumple',  label: { es: 'Pre Cumple',  en: 'Pre Birthday' }, imgKey: 'srv-estudio',    fallback: '/assets/srv-estudio.jpg'  },
      { cat: 'cake-smash',  label: { es: 'Cake Smash y Baby Bath', en: 'Cake Smash & Baby Bath' }, imgKey: 'srv-cake-smash', fallback: '/assets/srv-estudio.jpg'  },
    ],
  },
  {
    id: 'retratos',
    label:   { es: 'Retratos',                en: 'Portraits' },
    sessions: [
      { cat: 'maternidad',          label: { es: 'Maternidad',           en: 'Maternity'      }, imgKey: 'srv-embarazo', fallback: '/assets/srv-embarazo.jpg' },
      { cat: 'individual-familiar', label: { es: 'Individual / Familiar', en: 'Family Session' }, imgKey: 'srv-exterior', fallback: '/assets/srv-exterior.jpg' },
      { cat: 'profesional',         label: { es: 'Profesional',          en: 'Professional'   }, imgKey: 'srv-profesional', fallback: '/assets/srv-exterior.jpg' },
    ],
  },
  {
    id: 'eventos-celebraciones',
    label:   { es: 'Eventos y celebraciones', en: 'Events & Celebrations' },
    sessions: [
      { cat: 'pelotero',          label: { es: 'Pelotero',           en: 'Kids Parties'  }, imgKey: 'srv-pelotero',   fallback: '/assets/srv-pelotero.jpg'   },
      { cat: 'evento-social',     label: { es: 'Evento Social',       en: 'Social Event'  }, imgKey: 'srv-evento',     fallback: '/assets/srv-casamiento.jpg' },
      { cat: 'casamientos',       label: { es: 'Casamientos',        en: 'Weddings'      }, imgKey: 'srv-casamiento', fallback: '/assets/srv-casamiento.jpg' },
      { cat: 'quince',            label: { es: '15 Años',            en: 'Quinceañera'   }, imgKey: 'srv-quince',     fallback: '/assets/srv-casamiento.jpg' },
      { cat: 'bautismo',          label: { es: 'Bautismo',           en: 'Baptism'       }, imgKey: 'srv-bautismo',   fallback: '/assets/srv-comunion.jpg'   },
      { cat: 'comuniones',        label: { es: 'Comuniones',         en: 'Communions'    }, imgKey: 'srv-comunion',   fallback: '/assets/srv-comunion.jpg'   },
      { cat: 'baby-shower',       label: { es: 'Baby Shower',        en: 'Baby Shower'   }, imgKey: 'srv-babyshower', fallback: '/assets/srv-embarazo.jpg'   },
      { cat: 'revelacion-genero', label: { es: 'Revelación de Género',en: 'Gender Reveal' }, imgKey: 'srv-revelacion', fallback: '/assets/srv-embarazo.jpg'   },
    ],
  },
  {
    id: 'especiales',
    label:   { es: 'Especiales',              en: 'Specials' },
    sessions: [
      { cat: 'combo',     label: { es: 'Combo Pre Cumple + Pelotero', en: 'Bundle'   }, imgKey: 'srv-combo',     fallback: '/assets/srv-pelotero.jpg' },
      { cat: 'productos', label: { es: 'Productos fotográficos',       en: 'Products' }, imgKey: 'srv-productos', fallback: '/assets/srv-estudio.jpg'  },
      { cat: 'temporada', label: { es: 'Sesión de Temporada',          en: 'Seasonal Session' }, imgKey: 'srv-temporada', fallback: '/assets/srv-exterior.jpg' },
    ],
  },
]

const ChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
)

export default function Servicios() {
  const navigate = useNavigate()
  const { t } = useLang()
  const { config } = useConfiguracion()
  const [openIdx, setOpenIdx] = useState(null)

  const toggle = (i) => setOpenIdx(prev => prev === i ? null : i)

  return (
    <section id="servicios" className="py-16 md:py-24 px-6 md:px-12" style={{ backgroundColor: '#F0C0B0' }}>

      <Reveal className="text-center mb-12 md:mb-16">
        <SectionKicker centered>{t('Servicios', 'Services')}</SectionKicker>
        <h2 className="font-serif text-[clamp(1.8rem,2.8vw,2.6rem)] italic font-normal mt-2" style={{ color: '#3D2B1F' }}>
          {t('¿Qué sesión estás buscando?', 'What session are you looking for?')}
        </h2>
      </Reveal>

      <div className="max-w-[1200px] mx-auto flex flex-col gap-3">
        {ACCORDION.map((cat, i) => {
          const isOpen = openIdx === i
          const sessionNames = cat.sessions.map(s => t(s.label.es, s.label.en)).join(' · ')

          return (
            <Reveal key={cat.id} delay={i + 1}>

              {/* Barra — paleta nude/crema */}
              <button
                onClick={() => toggle(i)}
                className="relative w-full min-h-[120px] sm:h-[144px] rounded-[14px] overflow-hidden flex flex-col items-center justify-center gap-2 px-6 sm:px-14 py-5 sm:py-0 text-center group transition-colors duration-300"
                style={{ backgroundColor: '#F5ECD7' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ede4cc'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F5ECD7'}
                aria-expanded={isOpen}
              >
                {/* Acento lateral izquierdo */}
                <div className="absolute left-0 top-0 bottom-0 w-[5px] rounded-l-[14px]" style={{ backgroundColor: '#C9956E' }} />

                {/* Título */}
                <span className="font-serif text-[clamp(1.7rem,2.8vw,2.2rem)] italic font-normal leading-[1.2]" style={{ color: '#3D2B1F' }}>
                  {t(cat.label.es, cat.label.en)}
                </span>

                {/* Sesiones incluidas */}
                <span className="text-[13px] md:text-[14px] leading-relaxed tracking-wide" style={{ color: '#7A5C4A' }}>
                  {sessionNames}
                </span>

                {/* Chevron — círculo terracota */}
                <span
                  className={`absolute top-1/2 -translate-y-1/2 right-5 flex items-center justify-center w-9 h-9 rounded-full transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                  style={{ backgroundColor: '#C9956E', color: '#F5ECD7' }}
                >
                  <ChevronDown />
                </span>
              </button>

              {/* Panel desplegable */}
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pt-4 pb-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {cat.sessions.map((s) => {
                    const img = config[s.imgKey] || s.fallback
                    return (
                      <button
                        key={s.cat}
                        onClick={() => navigate(`/paquetes/${s.cat}`)}
                        className="relative rounded-[12px] overflow-hidden aspect-[3/4] group cursor-pointer border-0 p-0 bg-transparent w-full"
                      >
                        <img
                          src={img}
                          alt={t(s.label.es, s.label.en)}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                        {/* Línea decorativa inferior */}
                        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundColor: '#C9A882' }} />
                        <div className="absolute bottom-0 left-0 right-0 p-4 pb-5 text-left">
                          <div className="font-serif text-[1rem] italic font-normal text-white leading-[1.3] mb-1">
                            {t(s.label.es, s.label.en)}
                          </div>
                          <div className="text-[10px] tracking-[0.08em] uppercase transition-colors duration-200" style={{ color: 'rgba(245,236,215,0.7)' }}>
                            {t('Ver paquetes →', 'View packages →')}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

            </Reveal>
          )
        })}
      </div>

    </section>
  )
}

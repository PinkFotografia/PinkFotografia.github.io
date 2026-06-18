import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../../context/LangContext'
import { useConfiguracion } from '../../hooks/useConfiguracion'
import Reveal from '../ui/Reveal'
import SectionKicker from '../ui/SectionKicker'

const PHOTOS = [
  { cat: 'bebes-ninos',           portKey: 'port-bebes-ninos',           srvKey: 'srv-estudio',    fallback: '/assets/srv-estudio.jpg',    rot: -4, yOff: 0,   name: { es: 'Bebés y niños',           en: 'Babies & Kids'         } },
  { cat: 'retratos',              portKey: 'port-retratos',              srvKey: 'srv-embarazo',   fallback: '/assets/srv-embarazo.jpg',   rot:  3, yOff: 28,  name: { es: 'Retratos',                en: 'Portraits'             } },
  { cat: 'eventos-celebraciones', portKey: 'port-eventos-celebraciones', srvKey: 'srv-casamiento', fallback: '/assets/srv-casamiento.jpg', rot: -2, yOff: -14, name: { es: 'Eventos',                 en: 'Events'                } },
  { cat: 'especiales',            portKey: 'port-especiales',            srvKey: 'srv-pelotero',   fallback: '/assets/srv-pelotero.jpg',   rot:  5, yOff: 18,  name: { es: 'Especiales',              en: 'Specials'              } },
  { cat: 'tematicas',             portKey: 'port-tematicas',             srvKey: 'srv-temporada',  fallback: '/assets/srv-exterior.jpg',   rot: -3, yOff: -6,  name: { es: 'Temáticas',               en: 'Themed'                } },
]

function PolaroidCard({ src, label, rot, yOff, onClick }) {
  const [hovered, setHovered] = useState(false)
  const isMd = typeof window !== 'undefined' && window.innerWidth >= 768

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered
          ? (isMd ? 'rotate(0deg) translateY(-12px) scale(1.07)' : 'translateY(-4px) scale(1.03)')
          : (isMd ? `rotate(${rot}deg) translateY(${yOff}px)` : 'none'),
        transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'pointer',
        willChange: 'transform',
      }}
    >
      {/* Marco polaroid */}
      <div
        className="relative"
        style={{
          background: '#FAF8F6',
          padding: '10px 10px 48px',
          boxShadow: hovered
            ? '0 24px 56px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.08)'
            : '0 6px 20px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* Foto */}
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={src}
            alt={label}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.6s ease',
            }}
          />
        </div>

        {/* Caption dentro del borde inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-center px-3">
          <span
            className="font-serif italic font-bold text-[1rem] truncate"
            style={{
              color: hovered ? '#72243E' : '#9B3D5E',
              transition: 'color 0.3s ease',
            }}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function PortfolioPreview() {
  const navigate = useNavigate()
  const { t } = useLang()
  const { config } = useConfiguracion()

  return (
    <section id="portafolio" className="bg-cream py-16 md:py-24 px-6 md:px-12" style={{ overflowX: 'hidden', overflowY: 'visible' }}>

      <Reveal className="text-center mb-20">
        <SectionKicker centered>{t('Portafolio', 'Portfolio')}</SectionKicker>
        <h2 className="font-serif text-[clamp(1.8rem,2.8vw,2.6rem)] italic font-normal text-ink mt-2">
          {t('Momentos que guardamos juntos', 'Moments we preserve together')}
        </h2>
      </Reveal>

      <div
        className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-x-8 md:gap-y-0"
        style={{ paddingBottom: '2rem' }}
      >
        {PHOTOS.map((p, i) => (
          <Reveal key={p.cat} delay={(i % 5) + 1}>
            <div className={i < 2 ? 'md:mb-14' : ''}>
              <PolaroidCard
                src={config[p.portKey] || config[p.srvKey] || p.fallback}
                label={config[`port-label-${p.cat}`] || t(p.name.es, p.name.en)}
                rot={p.rot}
                yOff={p.yOff}
                onClick={() => navigate(`/portafolio/${p.cat}`)}
              />
            </div>
          </Reveal>
        ))}
      </div>

    </section>
  )
}

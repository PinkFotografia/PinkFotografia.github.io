import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../../context/LangContext'
import { useConfiguracion } from '../../hooks/useConfiguracion'
import { CATEGORIES } from '../../lib/categories'
import Reveal from '../ui/Reveal'
import SectionKicker from '../ui/SectionKicker'

const PHOTOS = [
  { cat: 'estudio',     portKey: 'port-estudio',     srvKey: 'srv-estudio',    fallback: '/assets/srv-estudio.jpg',    rot: -4, yOff: 0   },
  { cat: 'exterior',    portKey: 'port-exterior',    srvKey: 'srv-exterior',   fallback: '/assets/srv-exterior.jpg',   rot:  3, yOff: 28  },
  { cat: 'embarazadas', portKey: 'port-embarazadas', srvKey: 'srv-embarazo',   fallback: '/assets/srv-embarazo.jpg',   rot: -2, yOff: -14 },
  { cat: 'pelotero',    portKey: 'port-pelotero',    srvKey: 'srv-pelotero',   fallback: '/assets/srv-pelotero.jpg',   rot:  5, yOff: 18  },
  { cat: 'casamientos', portKey: 'port-casamientos', srvKey: 'srv-casamiento', fallback: '/assets/srv-casamiento.jpg', rot: -3, yOff: -6  },
  { cat: 'comuniones',  portKey: 'port-comuniones',  srvKey: 'srv-comunion',   fallback: '/assets/srv-comunion.jpg',   rot:  1, yOff: 22  },
  { cat: 'tematicas',  portKey: 'port-tematicas',  srvKey: 'srv-tematicas',  fallback: '/assets/port-04.jpg',        rot: -2, yOff: 8,  name: { es: 'Catálogo de Temáticas', en: 'Themes Catalogue' } },
]

function PolaroidCard({ src, label, rot, yOff, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered
          ? 'rotate(0deg) translateY(-12px) scale(1.07)'
          : `rotate(${rot}deg) translateY(${yOff}px)`,
        transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'pointer',
        willChange: 'transform',
      }}
    >
      {/* Marco polaroid */}
      <div
        className="relative bg-white"
        style={{
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
            className="font-serif italic text-[1rem] truncate"
            style={{
              color: hovered ? '#D4537E' : 'rgba(44,44,42,0.4)',
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
        className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-10"
        style={{ paddingBottom: '3rem' }}
      >
        {PHOTOS.map((p, i) => (
          <Reveal key={p.cat} delay={(i % 3) + 1}>
            <div style={{ marginBottom: i < 3 ? '3.5rem' : '0' }}>
              <PolaroidCard
                src={config[p.portKey] || config[p.srvKey] || p.fallback}
                label={p.name ? t(p.name.es, p.name.en) : t(CATEGORIES[p.cat].es, CATEGORIES[p.cat].en)}
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

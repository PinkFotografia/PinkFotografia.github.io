import { useState, useEffect } from 'react'
import { useLang } from '../../context/LangContext'
import { useConfiguracion } from '../../hooks/useConfiguracion'

const SLIDES = [
  { key: 'hero1', fallback: '/assets/hero1.jpg', position: 'center top' },
  { key: 'hero2', fallback: '/assets/hero2.jpg', position: 'center center' },
  { key: 'hero3', fallback: '/assets/hero3.jpg', position: 'center top' },
  { key: 'hero4', fallback: '/assets/hero1.jpg', position: 'center center' },
  { key: 'hero5', fallback: '/assets/hero2.jpg', position: 'center top' },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [loadedSlides, setLoadedSlides] = useState(new Set([0]))
  const { config } = useConfiguracion()
  const { lang, toggle, t } = useLang()

  const slides = SLIDES.map(s => ({
    image: config[s.key] || s.fallback,
    position: s.position,
  }))

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 5500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const next = (current + 1) % SLIDES.length
    setLoadedSlides(prev => {
      if (prev.has(current) && prev.has(next)) return prev
      return new Set([...prev, current, next])
    })
  }, [current])

  function goSlide(n) { setCurrent(n) }

  return (
    <section id="inicio" className="relative h-screen min-h-[650px] overflow-hidden">

      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover transition-opacity duration-[1800ms] ease-in-out
            ${i === current ? 'opacity-100' : 'opacity-0'}
            ${i === 0 ? 'animate-hero-zoom' : ''}`}
          style={{
            backgroundImage: loadedSlides.has(i) ? `url('${slide.image}')` : undefined,
            backgroundPosition: slide.position,
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/65 pointer-events-none" />

      {/* Contenido centrado */}
      <div className="animate-fade-in-up absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-[90%] max-w-[700px]">
        <div className="flex items-center justify-center gap-3 text-[10px] tracking-[0.22em] uppercase text-white/55 mb-5">
          <span className="block w-9 h-px bg-white/30 flex-shrink-0" />
          {t('Fotografía profesional · Comodoro Rivadavia', 'Professional photography · Comodoro Rivadavia')}
          <span className="block w-9 h-px bg-white/30 flex-shrink-0" />
        </div>

        <h1 className="font-serif text-[clamp(2.8rem,6vw,5.5rem)] font-light italic text-white leading-[1.15] [text-shadow:0_2px_30px_rgba(0,0,0,0.2)] mb-4">
          {t(
            <>Cada instante<br />merece ser <em className="not-italic text-pink-mid font-normal">eterno</em></>,
            <>Every moment<br />deserves to be <em className="not-italic text-pink-mid font-normal">eternal</em></>
          )}
        </h1>

        <div className="w-px h-10 bg-white/25 mx-auto my-5" />

        <button
          onClick={() => document.getElementById('bienvenida')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex items-center gap-[10px] px-8 py-3 rounded-[25px] text-[11px] tracking-[0.12em] uppercase text-white/80 border border-white/30 bg-transparent hover:bg-pink hover:border-pink hover:text-white hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(212,83,126,0.4)] transition-all duration-300 cursor-pointer font-sans"
        >
          {t('Ver más', 'Discover')} <span>↓</span>
        </button>
      </div>

      {/* Wordmark */}
      <div className="absolute bottom-10 left-6 md:left-12 pointer-events-none select-none">
        <div className="font-serif text-[clamp(2.5rem,5vw,4rem)] italic font-light text-white/[0.18] leading-none">
          Pink
        </div>
        <div className="text-[9px] tracking-[0.25em] uppercase text-white/20 mt-[3px] font-sans">
          {t('Fotografía', 'Photography')}
        </div>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-11 right-6 md:right-12 flex gap-[6px] z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goSlide(i)}
            className={`h-[5px] rounded-[3px] border-none cursor-pointer transition-all duration-400 p-0
              ${i === current ? 'w-5 bg-pink' : 'w-[5px] bg-white/25'}`}
          />
        ))}
      </div>

    </section>
  )
}

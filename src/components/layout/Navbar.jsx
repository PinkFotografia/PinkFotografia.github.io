import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLang } from '../../context/LangContext'

const NAV_SECTIONS = [
  { id: 'servicios',  es: 'Servicios',  en: 'Services' },
  { id: 'portafolio', es: 'Portafolio', en: 'Portfolio' },
  { id: 'sobre-mi',   es: 'Sobre mí',   en: 'About' },
  { id: 'resenas',    es: 'Reseñas',    en: 'Reviews' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { lang, toggle, t } = useLang()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToSection(id) {
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Navigate home and pass the target section via state
      navigate('/', { state: { scrollTo: id } })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between transition-all duration-400
        px-12
        ${scrolled
          ? 'py-3 bg-[rgba(17,17,17,0.96)] backdrop-blur-[16px] border-b border-white/[0.04]'
          : 'py-[1.1rem]'
        }`}
    >
      {/* Logo */}
      <button
        onClick={() => scrollToSection('inicio')}
        className="cursor-pointer bg-transparent border-none p-0"
      >
        <img
          src="/assets/logo.png"
          alt="Pink Fotografía"
          className={`brightness-0 invert transition-all duration-400 ${scrolled ? 'h-10' : 'h-12'}`}
        />
      </button>

      {/* Links centrales */}
      <div className="flex items-center gap-8">
        {NAV_SECTIONS.map(({ id, es, en }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className="nav-link-underline relative text-[11px] tracking-[0.12em] uppercase text-white/70 hover:text-white transition-colors duration-200 pb-[3px] bg-transparent border-none cursor-pointer font-sans"
          >
            {t(es, en)}
          </button>
        ))}
      </div>

      {/* Derecha: idioma + CTA */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          className="text-[10px] tracking-[0.08em] text-white/35 border border-white/15 px-[10px] py-1 rounded-[10px] hover:text-white/80 hover:border-white/35 transition-all duration-200 bg-transparent cursor-pointer font-sans"
        >
          {lang === 'es' ? 'EN' : 'ES'}
        </button>

        <button
          onClick={() => scrollToSection('reservas')}
          className="text-[11px] tracking-[0.1em] uppercase px-6 py-[0.55rem] rounded-[20px] bg-pink text-white hover:bg-pink-dark transition-all duration-[250ms] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(212,83,126,0.35)] border-none cursor-pointer font-sans"
        >
          {t('Reservar', 'Book now')}
        </button>
      </div>
    </nav>
  )
}

import { useState, useEffect } from 'react'
import { useLang } from '../../context/LangContext'
import { useConfiguracion } from '../../hooks/useConfiguracion'
import { useTextos } from '../../hooks/useTextos'
import Reveal from '../ui/Reveal'
import SectionKicker from '../ui/SectionKicker'

const SM_KEYS = ['sobremi1', 'sobremi2', 'sobremi3', 'sobremi4', 'sobremi5']

const FALLBACK = {
  es: 'Soy Fernanda Randazzo, fotógrafa profesional con base en Comodoro Rivadavia. Lo que empezó como un hobby en 2016 se convirtió en mi vocación: en 2018 di el salto y nunca miré atrás. Me especializo en sesiones de bebés y niños — esos momentos llenos de vida, espontaneidad y ternura que pasan volando y merecen quedarse para siempre. Cada sesión es única para mí, porque detrás de cada foto hay una familia que confió en mí para guardar algo que no tiene precio.',
  en: "I'm Fernanda Randazzo, a professional photographer based in Comodoro Rivadavia. What started as a hobby in 2016 became my calling: in 2018 I took the leap and never looked back. I specialize in baby and children sessions — those moments full of life, spontaneity and tenderness that fly by and deserve to last forever.",
}

const TAGS = [
  { es: 'Bebés y niños', en: 'Babies & kids' },
  { es: 'Familias',      en: 'Families' },
  { es: 'Embarazadas',   en: 'Maternity' },
  { es: 'Eventos',       en: 'Events' },
  { es: 'Comodoro Rivadavia', en: 'Comodoro Rivadavia' },
]

const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
    <path d="M.057 24 1.744 17.837A11.867 11.867 0 0 1 .157 11.89C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448zm6.54-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1 3.648 3.743-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.867-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.372-.025-.521-.074-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.148.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
  </svg>
)

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
)

const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
    <path d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const IconTikTok = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
    <path d="M19.321 5.562a5.122 5.122 0 0 1-2.806 2.291V12a3 3 0 1 1-3.6-2.957v2.538A1.5 1.5 0 1 0 10.5 15v-5.445A5.002 5.002 0 0 0 5 5c0-2.761 2.239-5 5-5s5 2.239 5 5v5.562z"/>
  </svg>
)

const IconEmail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/>
  </svg>
)

const CONTACT = [
  { Icon: IconWhatsApp, label: '+54 9 297 419-7787',        href: 'https://wa.me/5492974197787' },
  { Icon: IconInstagram, label: '@pinkk.ph',                 href: 'https://www.instagram.com/pinkk.ph' },
  { Icon: IconFacebook,  label: 'Pink Fotografía',          href: 'https://www.facebook.com/pinkk.ph' },
  { Icon: IconTikTok,    label: '@pinkfotografia',          href: 'https://www.tiktok.com/@pinkfotografia' },
  { Icon: IconEmail,     label: 'pinkfotografiaph@gmail.com', href: 'mailto:pinkfotografiaph@gmail.com' },
]

export default function SobreMi() {
  const { t, lang } = useLang()
  const { config } = useConfiguracion()
  const { textos } = useTextos()
  const [current, setCurrent] = useState(0)

  const sobremi = textos['sobre_mi']
  const parrafo = sobremi
    ? (lang === 'es' ? sobremi.es : sobremi.en) || FALLBACK[lang]
    : FALLBACK[lang]

  const fotos = SM_KEYS.map(k => config[k] || '/assets/sobre-mi.jpg')

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % SM_KEYS.length), 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="sobre-mi" className="bg-cream-dark py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">

        {/* Fotos alternando */}
        <Reveal>
          <div className="relative rounded-[20px] overflow-hidden aspect-[4/5] shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
            {fotos.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Fernanda Randazzo — Pink Fotografía"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${i === current ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
          </div>
        </Reveal>

        {/* Texto */}
        <Reveal delay={2}>
          <SectionKicker>{t('Sobre mí', 'About me')}</SectionKicker>
          <h2 className="font-serif text-[clamp(1.8rem,2.8vw,2.6rem)] italic font-normal text-ink leading-[1.3] mb-6">
            {t('Quién está detrás del lente', "Who's behind the lens")}
          </h2>
          <p className="text-[15px] text-ink-muted leading-[1.85] mb-8">
            {parrafo}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {TAGS.map((tag, i) => (
              <span
                key={i}
                className="text-[11px] tracking-[0.06em] px-3 py-1 rounded-full border border-pink/30 text-pink bg-pink-light"
              >
                {t(tag.es, tag.en)}
              </span>
            ))}
          </div>

          {/* Firma */}
          <div className="font-serif text-[1.4rem] italic text-ink/50 mb-4">
            Fernanda Randazzo
          </div>

          {/* Contacto */}
          <div className="flex flex-col gap-2">
            {CONTACT.map((c, i) => (
              <a
                key={i}
                href={c.href}
                target={c.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[12px] text-ink-muted hover:text-pink transition-colors no-underline"
              >
                <c.Icon />
                <span>{c.label}</span>
              </a>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  )
}

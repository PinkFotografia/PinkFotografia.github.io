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
    <section id="sobre-mi" className="bg-cream-dark py-24 px-12">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 gap-20 items-center">

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
          <div className="font-serif text-[1.4rem] italic text-ink/50">
            Fernanda Randazzo
          </div>
        </Reveal>

      </div>
    </section>
  )
}

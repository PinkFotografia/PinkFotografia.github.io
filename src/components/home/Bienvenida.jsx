import { useLang } from '../../context/LangContext'
import { useTextos } from '../../hooks/useTextos'
import Reveal from '../ui/Reveal'
import SectionKicker from '../ui/SectionKicker'

const FALLBACK = {
  es: 'En Pink Fotografía capturamos los momentos que el corazón nunca olvida. Desde bodas íntimas hasta sesiones de estudio para bebés y familias, cada imagen lleva nuestra firma: pasión, creatividad y atención a cada detalle. Porque cada historia merece ser contada con luz.',
  en: 'At Pink Fotografía we capture the moments the heart never forgets. From intimate weddings to studio sessions for babies and families, every image carries our signature: passion, creativity and attention to detail.',
}

const STATS = [
  { n: '+7',     es: 'Años de experiencia',   en: 'Years of experience' },
  { n: '+500',   es: 'Familias fotografiadas', en: 'Families photographed' },
  { n: '5.0 ★', es: 'Estrellas en Google',    en: 'Stars on Google' },
  { n: '35',     es: 'Reseñas verificadas',    en: 'Verified reviews' },
]

export default function Bienvenida() {
  const { t, lang } = useLang()
  const { textos } = useTextos()
  const bienvenida = textos['bienvenida']
  const parrafo = bienvenida
    ? (lang === 'es' ? bienvenida.es : bienvenida.en) || FALLBACK[lang]
    : FALLBACK[lang]

  return (
    <section id="bienvenida" className="bg-cream py-16 md:py-28 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-10 md:gap-20 items-center">

        {/* Texto */}
        <Reveal>
          <SectionKicker>{t('Bienvenidos', 'Welcome')}</SectionKicker>
          <h2 className="font-serif text-[clamp(1.8rem,2.8vw,2.6rem)] italic font-normal text-ink leading-[1.3] mb-6">
            {t('Capturamos lo que el corazón nunca olvida', 'We capture what the heart never forgets')}
          </h2>
          <p className="text-[15px] text-ink-muted leading-[1.85] mb-8">
            {parrafo}
          </p>
          <button
            onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-[11px] tracking-[0.1em] uppercase text-pink hover:gap-[14px] transition-all duration-200 bg-transparent border-none cursor-pointer font-sans flex items-center gap-2"
          >
            {t('Ver todos los servicios →', 'See all services →')}
          </button>
        </Reveal>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-5">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i + 1}>
              <div className="bg-white rounded-[12px] p-6 border border-black/[0.06] text-center hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-[250ms]">
                <div className="font-serif text-[2.6rem] italic font-normal text-pink leading-none mb-1">
                  {s.n}
                </div>
                <div className="text-[11px] tracking-[0.08em] uppercase text-ink-muted">
                  {t(s.es, s.en)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}

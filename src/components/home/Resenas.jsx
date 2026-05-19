import { useLang } from '../../context/LangContext'
import Reveal from '../ui/Reveal'
import SectionKicker from '../ui/SectionKicker'

const REVIEWS = [
  { text: '"Nosotros te conocimos en el 2024 con la sesión de otoño, vimos las fotos por Facebook, a mi mamá le encantó, pagó la sesión, y cuando mandaste las fotos quedó enamorada de tu trabajo. Desde ese día dijo que quería que le hagas las sesiones de foto a Ambar."', author: 'Mariia Alvarado' },
  { text: '"Super recomendable. Profesional, atenta y con mucha calidez. Logró captar momentos espontáneos de mis bebes. Feliz con el resultado de la sesión."', author: 'Rocío Orellana' },
  { text: '"Primero que nada excelente persona, con tanto amor y paciencia. Excelentes fotos, me encanta cada sección que tuve. Atesorar cada momento en una foto de tan hermosa y buena calidad. Amamos a Fer."', author: 'Camila Coliboro' },
  { text: '"La mejor, trabaja con dedicación y muchísima paciencia 💪 Te elegimos siempre con Noah, siempre regalándonos fotos y recuerdos hermosos."', author: 'Tatiana Mansilla' },
  { text: '"Una de las mejores!!! Con la paciencia que nadie tiene... Hermoso su trabajo y te saca millones de fotos, ¡una genia Fer! Nosotros ya hicimos la sesión de 1 año, 2 años y esperando los 3 años de los mellizos."', author: 'Daiana Celeste Brizuela' },
  { text: '"Excelente profesional. Super dedicada, está en cada detalle, hace magia con las decoraciones y las fotos son tremendas."', author: 'Brunella Olmos' },
]

export default function Resenas() {
  const { t } = useLang()

  return (
    <section id="resenas" className="bg-cream py-24 px-12">

      <Reveal className="text-center mb-16">
        <SectionKicker centered>{t('Reseñas', 'Reviews')}</SectionKicker>
        <h2 className="font-serif text-[clamp(1.8rem,2.8vw,2.6rem)] italic font-normal text-ink mt-2">
          {t('Lo que dicen las familias', 'What families say')}
        </h2>
      </Reveal>

      <div className="max-w-[1200px] mx-auto grid grid-cols-3 gap-6 mb-12">
        {REVIEWS.map((r, i) => (
          <Reveal key={i} delay={(i % 3) + 1}>
            <div className="bg-white rounded-[12px] p-6 border border-black/[0.06] flex flex-col gap-3">
              <div className="text-pink text-lg tracking-wider">★★★★★</div>
              <p className="text-[14px] text-ink-muted leading-relaxed flex-1">{r.text}</p>
              <div>
                <div className="text-[13px] font-medium text-ink">{r.author}</div>
                <div className="text-[11px] text-ink-muted mt-0.5">Google · Comodoro Rivadavia</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="text-center">
        <a
          href="https://www.google.com/maps/search/Pink+Fotografia+Comodoro+Rivadavia"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase text-pink hover:gap-4 transition-all duration-200 no-underline"
        >
          {t('Ver todas las reseñas en Google →', 'See all Google reviews →')}
        </a>
      </Reveal>

    </section>
  )
}

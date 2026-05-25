import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import Reveal from './Reveal'
import SectionKicker from './SectionKicker'

function QAItem({ pregunta, respuesta }) {
  const { lang } = useLang()
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-black/[0.06] last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left bg-transparent border-none cursor-pointer"
      >
        <span className="text-[13px] font-sans font-medium tracking-[0.03em] text-ink">
          {lang === 'es' ? pregunta.es : pregunta.en}
        </span>
        <span
          className="text-pink text-[18px] flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? '600px' : '0px' }}
      >
        <p className="text-[14px] text-ink-muted leading-[1.8] pb-4">
          {lang === 'es' ? respuesta.es : respuesta.en}
        </p>
      </div>
    </div>
  )
}

function SesionCard({ sesion, delay }) {
  const { lang, t } = useLang()

  return (
    <Reveal delay={delay}>
      <div className="bg-white rounded-[20px] border border-black/[0.06] overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-black/[0.06]">
          {sesion.subtitulo && (
            <p className="text-[11px] tracking-[0.14em] uppercase text-pink-mid font-sans mb-2">
              {lang === 'es' ? sesion.subtitulo.es : sesion.subtitulo.en}
            </p>
          )}
          <h3 className="font-serif text-[1.55rem] italic font-normal text-ink leading-tight mb-4">
            {lang === 'es' ? sesion.titulo.es : sesion.titulo.en}
          </h3>
          <p className="text-[14px] text-ink-muted leading-[1.8]">
            {lang === 'es' ? sesion.intro.es : sesion.intro.en}
          </p>
        </div>

        {/* Q&A */}
        <div className="px-8 py-2">
          {sesion.qa.map((item, i) => (
            <QAItem key={i} pregunta={item.pregunta} respuesta={item.respuesta} />
          ))}
        </div>

        {/* Footer: duración + nota */}
        {(sesion.duracion || sesion.nota) && (
          <div className="px-8 pb-7 pt-4 space-y-3">
            {sesion.duracion && (
              <p className="text-[12px] tracking-[0.05em] text-ink-muted">
                <span className="font-medium text-ink">{t('Duración:', 'Duration:')}</span>{' '}
                {lang === 'es' ? sesion.duracion.es : sesion.duracion.en}
              </p>
            )}
            {sesion.nota && (
              <div className="bg-pink-light border border-pink/20 rounded-[12px] px-5 py-4">
                <p className="text-[12px] text-ink-muted leading-[1.7]">
                  <span className="font-medium text-pink">{t('Importante: ', 'Note: ')}</span>
                  {lang === 'es' ? sesion.nota.es : sesion.nota.en}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Reveal>
  )
}

export default function SesionInfoSection({ sesiones }) {
  const { t } = useLang()
  if (!sesiones || sesiones.length === 0) return null

  return (
    <div className="bg-cream-dark py-14 md:py-20 px-6 md:px-12">
      <div className="max-w-[1000px] mx-auto">
        <Reveal className="text-center mb-10">
          <SectionKicker centered>{t('Sobre estas sesiones', 'About these sessions')}</SectionKicker>
          <h2 className="font-serif text-[clamp(1.6rem,2.4vw,2.2rem)] italic font-normal text-ink mt-2">
            {t('Todo lo que necesitás saber', 'Everything you need to know')}
          </h2>
        </Reveal>

        <div className={`grid gap-6 ${sesiones.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-[680px] mx-auto'}`}>
          {sesiones.map((sesion, i) => (
            <SesionCard key={sesion.id} sesion={sesion} delay={(i % 2) + 1} />
          ))}
        </div>
      </div>
    </div>
  )
}

import { useEffect } from 'react'
import { useLang } from '../../context/LangContext'
import Reveal from '../ui/Reveal'
import SectionKicker from '../ui/SectionKicker'

const WA_LINK = 'https://wa.me/5492974197787?text=Hola%20Fernanda!%20Me%20gustar%C3%ADa%20reservar%20una%20sesi%C3%B3n%20%F0%9F%93%B8'
const IG_LINK = 'https://www.instagram.com/pink.ph'

export default function Reservas() {
  const { t } = useLang()

  useEffect(() => {
    function setupEmbed() {
      window.Cal('init', 'sesion-1-hora', { origin: 'https://app.cal.com' })
      window.Cal.ns['sesion-1-hora']('inline', {
        elementOrSelector: '#cal-embed-sesion',
        config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
        calLink: 'pink-fotografia/sesion-1-hora',
      })
      window.Cal.ns['sesion-1-hora']('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    }

    if (window.Cal) {
      setupEmbed()
    } else {
      const script = document.createElement('script')
      script.src = 'https://app.cal.com/embed/embed.js'
      script.async = true
      script.onload = setupEmbed
      document.head.appendChild(script)
    }
  }, [])

  return (
    <section id="reservas" className="bg-[#111] py-24 px-12">
      <div className="max-w-[900px] mx-auto">

        <Reveal className="text-center mb-12">
          <SectionKicker centered>{t('Reservas', 'Bookings')}</SectionKicker>
          <h2 className="font-serif text-[clamp(1.8rem,2.8vw,2.6rem)] italic font-normal text-white mt-2">
            {t(<>¿Lista para tu <em className="text-pink-mid">sesión?</em></>, <>Ready for your <em className="text-pink-mid">session?</em></>)}
          </h2>
          <p className="text-[13px] text-white/40 mt-4 tracking-wide">
            {t(
              'Elegí la fecha que más te convenga · Confirmación automática · Sin compromisos',
              'Choose the date that suits you · Automatic confirmation · No commitments'
            )}
          </p>
        </Reveal>

        {/* Cal.com embed */}
        <div
          id="cal-embed-sesion"
          className="w-full rounded-[12px] mb-10 overflow-hidden"
          style={{ minHeight: '700px' }}
        />

        {/* Botones */}
        <Reveal className="flex gap-4 justify-center flex-wrap mt-8">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-[25px] bg-pink text-white text-[12px] tracking-[0.08em] uppercase hover:bg-pink-dark transition-colors no-underline"
          >
            📱 {t('Reservar por WhatsApp', 'Book via WhatsApp')}
          </a>
          <a
            href={IG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-[25px] border border-white/20 text-white/70 text-[12px] tracking-[0.08em] uppercase hover:border-white/50 hover:text-white transition-all no-underline"
          >
            📸 {t('Ver en Instagram', 'See on Instagram')}
          </a>
        </Reveal>

      </div>
    </section>
  )
}

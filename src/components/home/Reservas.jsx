import { useLang } from '../../context/LangContext'
import Reveal from '../ui/Reveal'
import SectionKicker from '../ui/SectionKicker'

const WA_LINK = 'https://wa.me/5492974197787?text=Hola%20Fernanda!%20Me%20gustar%C3%ADa%20reservar%20una%20sesi%C3%B3n%20%F0%9F%93%B8'
const IG_LINK = 'https://www.instagram.com/pink.ph'
const CAL_URL = 'https://cal.com/pink-fotografia/sesion-1-hora?embed=true&layout=month_view&theme=light'

export default function Reservas() {
  const { t } = useLang()

  return (
    <section id="reservas" className="bg-[#111] py-16 md:py-24 px-4 md:px-12">
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
        <iframe
          src={CAL_URL}
          title="Reservar sesión — Pink Fotografía"
          className="w-full rounded-[12px] mb-10"
          style={{ minHeight: '700px', border: 'none' }}
          loading="lazy"
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

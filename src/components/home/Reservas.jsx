import { useLang } from '../../context/LangContext'
import Reveal from '../ui/Reveal'
import SectionKicker from '../ui/SectionKicker'

const WA_LINK = 'https://wa.me/5492974197787?text=Hola%20Fernanda!%20Me%20gustar%C3%ADa%20reservar%20una%20sesi%C3%B3n%20%F0%9F%93%B8'
const IG_LINK = 'https://www.instagram.com/pink.ph'
const CAL_URL = 'https://cal.com/pink-fotografia/sesion-1-hora?embed=true&layout=month_view&theme=light'

export default function Reservas() {
  const { t } = useLang()

  return (
    <section id="reservas" className="bg-[#111] py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-[900px] mx-auto">

        <Reveal className="text-center mb-10 md:mb-12">
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

        {/* Mobile: botones grandes directo */}
        <Reveal className="md:hidden flex flex-col gap-4 mb-4">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-5 rounded-[16px] bg-pink text-white text-[13px] tracking-[0.08em] uppercase no-underline font-sans"
          >
            <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {t('Reservar por WhatsApp', 'Book via WhatsApp')}
          </a>
          <a
            href={IG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-5 rounded-[16px] border border-white/20 text-white/70 text-[13px] tracking-[0.08em] uppercase no-underline font-sans"
          >
            📸 {t('Ver en Instagram', 'See on Instagram')}
          </a>
          <a
            href={CAL_URL.replace('embed=true&', '')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-[16px] border border-white/10 text-white/40 text-[11px] tracking-[0.08em] uppercase no-underline font-sans"
          >
            📅 {t('Ver calendario de disponibilidad', 'View availability calendar')}
          </a>
        </Reveal>

        {/* Desktop: iframe de Cal.com */}
        <div className="hidden md:block">
          <iframe
            src={CAL_URL}
            title="Reservar sesión — Pink Fotografía"
            className="w-full rounded-[12px] mb-10"
            style={{ minHeight: '700px', border: 'none' }}
            loading="lazy"
          />
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

      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { useLang } from '../../context/LangContext'

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

const IconEmail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/>
  </svg>
)

const IconTikTok = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.33-.89-.64-.21-1.26-.57-1.87-.10 0 .02 0 .05 0 .07 0 1.86 1.38 3.53 3.17 3.87 1.79.34 3.72-.55 4.6-2.23.52-1.06.78-2.22.92-3.39.54 0 1.08.02 1.63.02.06-2.67-.96-5.44-2.77-7.31-1.81-1.87-4.6-2.73-7.23-2.5-.05 1.97-.1 3.95-.07 5.93z"/>
    <path d="M12.3 5.69c-.72-.07-1.4.18-1.9.66-.5.48-.78 1.18-.73 1.93.04.75.35 1.51.97 1.97.62.46 1.46.67 2.27.60v4.04c-1.48 0-2.94-.5-4.09-1.35-1.15-.85-1.94-2.06-2.25-3.4-.31-1.34-.06-2.81.71-3.97.77-1.16 2.04-1.9 3.37-1.88.05 1.35 0 2.71.05 4.07z"/>
    <path d="M17.84 12.77v4.3c-.79.46-1.84.72-2.89.56-1.05-.16-2.01-.71-2.66-1.44-.65-.73-.95-1.66-.87-2.6.08-.94.51-1.8 1.18-2.4.67-.6 1.63-.93 2.6-.87 1.12.09 2.18.57 2.95 1.3.14-.07.27-.16.39-.25.12-.09.24-.18.35-.28-.65-.57-1.5-1.01-2.41-1.15-2.04-.32-4.14.4-5.34 1.83-1.2 1.43-1.51 3.42-.82 5.16.69 1.74 2.35 2.98 4.18 3.08 1.83.1 3.57-.92 4.33-2.51.38-.79.54-1.66.51-2.54z"/>
  </svg>
)

const SERVICES = [
  { es: 'Sesiones de estudio',   en: 'Studio sessions' },
  { es: 'Sesiones exterior',     en: 'Outdoor sessions' },
  { es: 'Embarazadas',          en: 'Maternity' },
  { es: 'Pelotero y eventos',   en: 'Kids parties & events' },
  { es: 'Casamientos y 15 años', en: 'Weddings & Quinceañera' },
  { es: 'Comuniones',           en: 'Communions' },
]

const CONTACT = [
  { Icon: IconWhatsApp, label: '+54 9 297 419-7787',        href: 'https://wa.me/5492974197787' },
  { Icon: IconInstagram, label: '@pinkk.ph',                 href: 'https://www.instagram.com/pinkk.ph' },
  { Icon: IconFacebook,  label: 'Pink Fotografía',          href: 'https://www.facebook.com/pinkk.ph' },
  { Icon: IconTikTok,    label: '@pinkfotografia',                href: 'https://www.tiktok.com/@pinkfotografia' },
  { Icon: IconEmail,     label: 'pinkfotografiaph@gmail.com', href: 'mailto:pinkfotografiaph@gmail.com' },
]

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="bg-[#111] text-white pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 pb-12 border-b border-white/[0.06]">

          {/* Marca */}
          <div>
            <div className="font-serif text-2xl italic font-light text-white/90 mb-4">
              Pink Fotografía
            </div>
            <p className="text-sm text-white/45 leading-relaxed">
              {t(
                'Fotografía profesional en Comodoro Rivadavia. Sesiones de bebés, familias, embarazadas, casamientos y eventos en toda la región de Chubut.',
                'Professional photography in Comodoro Rivadavia. Sessions for babies, families, maternity, weddings and events throughout Chubut.'
              )}
            </p>
          </div>

          {/* Servicios */}
          <div>
            <div className="text-[10px] tracking-[0.15em] uppercase text-white/30 mb-5 font-medium">
              {t('Servicios', 'Services')}
            </div>
            <div className="flex flex-col gap-2">
              {SERVICES.map((s, i) => (
                <button
                  key={i}
                  onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[13px] text-white/45 hover:text-white/80 transition-colors text-left bg-transparent border-none cursor-pointer font-sans"
                >
                  {t(s.es, s.en)}
                </button>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div>
            <div className="text-[10px] tracking-[0.15em] uppercase text-white/30 mb-5 font-medium">
              {t('Contacto', 'Contact')}
            </div>
            <div className="flex flex-col gap-3">
              {CONTACT.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  target={c.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[13px] text-white/45 hover:text-white/80 transition-colors no-underline"
                >
                  <c.Icon />
                  <span>{c.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center gap-1.5 text-[11px] text-white/30 text-center">
          <p className="text-white/40">
            {t(
              'Las imágenes y contenido de esta web son propiedad de Fernanda Randazzo.',
              'All images and content on this website are property of Fernanda Randazzo.'
            )}
          </p>
          <p>
            {t(
              '© 2025 Pink Fotografía · Todos los derechos reservados al autor · Ley 11.723',
              '© 2025 Pink Fotografía · All rights reserved'
            )}
          </p>
          <p className="text-white/20">Comodoro Rivadavia, Chubut · Argentina</p>
          <Link
            to="/terminos"
            className="text-[12px] tracking-[0.06em] text-white/50 hover:text-white/90 border border-white/15 hover:border-white/35 rounded-[20px] px-4 py-1.5 no-underline transition-all duration-200 mt-2 inline-block"
          >
            {t('Términos y condiciones', 'Terms & conditions')}
          </Link>
        </div>
      </div>
    </footer>
  )
}

import { useLang } from '../../context/LangContext'

const SERVICES = [
  { es: 'Sesiones de estudio',   en: 'Studio sessions' },
  { es: 'Sesiones exterior',     en: 'Outdoor sessions' },
  { es: 'Embarazadas',          en: 'Maternity' },
  { es: 'Pelotero y eventos',   en: 'Kids parties & events' },
  { es: 'Casamientos y 15 años', en: 'Weddings & Quinceañera' },
  { es: 'Comuniones',           en: 'Communions' },
]

const CONTACT = [
  { icon: '📱', label: '+54 9 297 419-7787',      href: 'https://wa.me/5492974197787' },
  { icon: '📸', label: '@pink.ph',                href: 'https://www.instagram.com/pink.ph' },
  { icon: '👤', label: 'Pink Fotografía',         href: 'https://www.facebook.com/Pink-Fotografia' },
  { icon: '✉️', label: 'pinkfotografiaph@gmail.com', href: 'mailto:pinkfotografiaph@gmail.com' },
]

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="bg-[#111] text-white pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-12">

        {/* Top grid */}
        <div className="grid grid-cols-3 gap-12 mb-12 pb-12 border-b border-white/[0.06]">

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
                  <span>{c.icon}</span>
                  <span>{c.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex justify-between items-center text-[11px] text-white/25">
          <span>© 2025 Pink Fotografía · Comodoro Rivadavia, Chubut</span>
          <span>Fernanda Randazzo · Fotografía profesional</span>
        </div>
      </div>
    </footer>
  )
}

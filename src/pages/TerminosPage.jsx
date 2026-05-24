import { Link } from 'react-router-dom'

const TERMS = {
  derechos: {
    title: 'Derechos de imagen y autoría',
    items: [
      { n: '1.', text: <>Al contratar el servicio, el cliente declara conocer y aceptar el estilo estético y artístico de <strong>Fernanda Randazzo (Pink Fotografía)</strong>, siendo consciente del resultado final de las imágenes al momento de su entrega.</> },
      { n: '2.', text: <>Fernanda Randazzo es la autora intelectual de todas las imágenes obtenidas en la sesión contratada. El uso y exhibición de las mismas por cualquiera de las partes queda sujeto a <strong>previo acuerdo entre partes</strong>.</> },
      { n: '3.', text: <>La exhibición de las imágenes en el portfolio profesional y redes sociales de Pink Fotografía, así como cualquier uso público de las mismas, estará sujeto a <strong>previo acuerdo entre partes</strong>, el cual quedará asentado al momento de la contratación del servicio.</> },
      { n: '4.', text: <>Los archivos crudos (RAW) de las imágenes tomadas <strong>no serán entregados bajo ningún concepto</strong>.</> },
    ],
  },
  salud: {
    title: 'Salud y seguridad',
    items: [
      { n: '5.', text: 'El padre, madre o tutor declara que el menor goza de buen estado de salud al momento de la sesión y tiene realizados los controles médicos acordes a su edad.' },
      { n: '6.', text: 'La fotógrafa no se responsabiliza por golpes, caídas u otros accidentes que pudieran ocurrirle al menor fuera del momento de la toma fotográfica. El niño/a debe permanecer bajo la supervisión permanente del padre, madre o tutor durante toda la sesión.' },
      { n: '7.', text: 'Los padres o tutores son responsables del menor y de cualquier daño o rotura que pudiera ocasionarse dentro del espacio de trabajo por descuido de los participantes.' },
    ],
  },
  pagos: {
    title: 'Pagos y aranceles',
    items: [
      { n: '8.', text: <><strong>Modalidad de pago:</strong> Se abona una seña en concepto de reserva con anticipación. El saldo total deberá estar abonado al momento de realizarse la sesión. Se acepta efectivo y transferencia bancaria sin recargo. Para pagos con tarjeta de crédito mediante Mercado Pago se adiciona un <strong>10% de recargo</strong> sobre el total por los costos del servicio.</> },
      { n: '9.', text: <>La seña abonada en concepto de reserva es reembolsable <strong>únicamente si se notifica la cancelación con al menos 2 semanas de anticipación</strong>. Fuera de ese plazo, no se realizarán devoluciones.</>, danger: true },
      { n: '10.', text: 'De solicitarse productos fotográficos impresos (murales, copias, fotolibros, imanes, gráfica en general), los mismos deberán abonarse de manera anticipada a su producción.' },
    ],
  },
  entrega: {
    title: 'Selección y entrega de imágenes',
    items: [
      { n: '11.', text: <>Los archivos fotográficos digitales editados estarán disponibles a partir del <strong>7° día hábil</strong> posterior a la sesión, pudiendo surgir demoras por situaciones imprevistas o técnicas.</> },
      { n: '12.', text: <>Los archivos serán enviados mediante <strong>WhatsApp o link de descarga</strong>. Pasados <strong>6 meses</strong> desde la sesión, los archivos serán eliminados de nuestros sistemas de almacenamiento sin posibilidad de recuperación.</> },
      { n: '13.', text: <>La entrega de productos fotográficos impresos estará sujeta a los tiempos de los proveedores gráficos, con un estimado de <strong>10 días hábiles</strong>.</> },
    ],
  },
  sesiones: {
    title: 'Sesiones, puntualidad y reprogramación',
    items: [
      { n: '14.', text: <>Una demora <strong>superior a 15 minutos</strong> sobre el horario pactado incidirá directamente en el tiempo disponible para la sesión. De querer completar el tiempo original, se deberá abonar un cargo adicional. Si la demora <strong>supera los 30 minutos</strong>, la sesión se dará por cancelada sin derecho a reembolso ni reprogramación, salvo aviso previo.</>, highlight: true },
      { n: '15.', text: <>Ante un imprevisto del cliente que impida presentarse a la sesión, comunicado con al menos <strong>24 horas de anticipación</strong>, la reprogramación estará sujeta a disponibilidad de agenda y al previo pago del saldo pendiente total de la sesión.</> },
      { n: '16.', text: 'También es posible que, por imprevistos de última hora que excedan nuestra organización, se comunique al cliente la necesidad de reprogramar la sesión, sin dar lugar al reintegro de lo abonado.' },
      { n: '17.', text: 'La predisposición y estado anímico de los menores durante la sesión no es responsabilidad de Pink Fotografía, y no constituye motivo válido para la reprogramación de la sesión ni para el reintegro de los costos abonados.' },
    ],
  },
  otros: {
    title: 'Otros',
    items: [
      { n: '18.', text: 'Pink Fotografía realiza únicamente las sesiones y servicios ofrecidos en su página web y canales oficiales de comunicación.' },
    ],
  },
}

function TermItem({ n, text, danger, highlight }) {
  const base = 'flex gap-4 items-start p-4 rounded-lg border text-[14px] leading-relaxed'
  const style = danger
    ? `${base} bg-red-50 border-red-200 text-red-900`
    : highlight
    ? `${base} bg-yellow-50 border-yellow-300 text-yellow-900`
    : `${base} bg-white border-ink/10 text-ink`

  const numColor = danger ? 'text-red-600' : highlight ? 'text-yellow-700' : 'text-pink'

  return (
    <div className={style}>
      <span className={`font-serif text-base shrink-0 pt-px ${numColor}`}>{n}</span>
      <p>{text}</p>
    </div>
  )
}

function Section({ title, items }) {
  return (
    <div className="mb-10">
      <h2 className="font-serif text-[1.35rem] font-normal text-pink-dark mb-5 pb-3 border-b border-ink/10 flex items-center gap-3">
        <span className="block w-[3px] h-[1.2em] bg-pink rounded-full shrink-0" />
        {title}
      </h2>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <TermItem key={item.n} {...item} />
        ))}
      </div>
    </div>
  )
}

export default function TerminosPage() {
  return (
    <main className="bg-cream min-h-screen">

      {/* Hero */}
      <div className="bg-[#111] pt-28 pb-12 text-center border-b border-white/[0.06]">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="block w-10 h-px bg-pink opacity-40" />
          <span className="text-[11px] tracking-[0.2em] uppercase text-pink">Pink Fotografía · Comodoro Rivadavia</span>
          <span className="block w-10 h-px bg-pink opacity-40" />
        </div>
        <h1 className="font-serif text-[clamp(2rem,5vw,3rem)] font-light text-white mb-3">
          Términos y <em className="italic text-pink">Condiciones</em>
        </h1>
        <p className="text-[14px] text-white/45 max-w-md mx-auto px-4">
          Leé con atención antes de confirmar tu sesión fotográfica
        </p>
      </div>

      {/* Contenido */}
      <div className="max-w-[780px] mx-auto px-5 md:px-8 py-12">

        {/* Intro */}
        <div className="bg-pink-light border border-pink/20 rounded-xl px-6 py-5 mb-10 text-[14px] text-pink-dark leading-relaxed">
          Al contratar los servicios de <strong>Pink Fotografía — Fernanda Randazzo</strong>, el cliente declara haber leído, comprendido y aceptado la totalidad de los términos y condiciones que se detallan a continuación. Estos aplican a todas las sesiones fotográficas ofrecidas.
        </div>

        {Object.values(TERMS).map((s) => (
          <Section key={s.title} title={s.title} items={s.items} />
        ))}

        {/* Firma */}
        <div className="bg-[#111] rounded-xl p-8 mt-8 text-center">
          <p className="font-serif text-[1.8rem] italic text-pink mb-1">Fernanda Randazzo</p>
          <p className="text-[11px] tracking-[0.1em] uppercase text-white/40 mb-4">Pink Fotografía · Comodoro Rivadavia</p>
          <p className="text-[13px] text-white/60">
            Consultas:{' '}
            <a href="https://wa.me/5492974197787" className="text-pink hover:underline">WhatsApp +54 9 297 419-7787</a>
            {' · '}
            <a href="mailto:pinkfotografiaph@gmail.com" className="text-pink hover:underline">pinkfotografiaph@gmail.com</a>
          </p>
        </div>

        {/* Volver */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="text-[12px] tracking-wide text-ink-muted hover:text-ink transition-colors no-underline"
          >
            ← Volver al inicio
          </Link>
        </div>

      </div>
    </main>
  )
}

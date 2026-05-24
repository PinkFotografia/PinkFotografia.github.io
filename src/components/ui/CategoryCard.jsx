export default function CategoryCard({ image, position = 'center', tag, name, cta, onClick, className = '' }) {
  return (
    <div
      className={`group flex flex-col rounded-[20px] overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
      onClick={onClick}
    >
      {/* Foto */}
      <div className="relative flex-1 overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-105"
          style={{ objectPosition: position }}
        />
      </div>

      {/* Panel inferior */}
      <div className="bg-cream-dark px-5 py-4 shrink-0">
        <div className="text-[10px] tracking-[0.18em] uppercase text-pink mb-1">{tag}</div>
        <div className="text-ink text-[15px] font-semibold leading-snug">{name}</div>
        <div className="text-pink-dark text-[12px] mt-1.5">{cta} →</div>
      </div>
    </div>
  )
}

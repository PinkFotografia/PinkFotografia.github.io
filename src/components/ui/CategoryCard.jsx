export default function CategoryCard({ image, position = 'center', tag, name, cta, onClick, className = '' }) {
  return (
    <div
      className={`group relative rounded-[20px] overflow-hidden cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Foto de fondo */}
      <div
        className="absolute inset-0 bg-cover transition-transform duration-[600ms] group-hover:scale-105"
        style={{ backgroundImage: `url('${image}')`, backgroundPosition: position }}
      />
      {/* Overlay al hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      {/* Contenido */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="text-[10px] tracking-[0.1em] uppercase text-pink mb-1">{tag}</div>
        <div className="text-white text-[15px] font-medium leading-snug mb-1">{name}</div>
        <div className="text-white/40 text-[12px]">{cta} →</div>
      </div>
    </div>
  )
}

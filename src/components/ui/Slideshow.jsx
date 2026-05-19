import { useEffect, useCallback } from 'react'

export default function Slideshow({ fotos, index, onClose, onNav }) {
  const total = fotos.length

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowRight') onNav(1)
    if (e.key === 'ArrowLeft') onNav(-1)
  }, [onClose, onNav])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [handleKey])

  if (!fotos.length) return null

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-white/70 hover:text-white text-[28px] leading-none z-10 bg-transparent border-0 cursor-pointer"
        aria-label="Cerrar"
      >
        ✕
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-[12px] tracking-[0.12em] z-10">
        {index + 1} / {total}
      </div>

      {/* Prev */}
      {total > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNav(-1) }}
          className="absolute left-4 text-white/60 hover:text-white text-[32px] leading-none z-10 bg-transparent border-0 cursor-pointer px-3 py-4"
          aria-label="Anterior"
        >
          ‹
        </button>
      )}

      {/* Image */}
      <img
        src={fotos[index]}
        alt={`foto ${index + 1}`}
        className="max-h-[88vh] max-w-[90vw] object-contain select-none"
        onClick={(e) => e.stopPropagation()}
        draggable={false}
      />

      {/* Next */}
      {total > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNav(1) }}
          className="absolute right-4 text-white/60 hover:text-white text-[32px] leading-none z-10 bg-transparent border-0 cursor-pointer px-3 py-4"
          aria-label="Siguiente"
        >
          ›
        </button>
      )}
    </div>
  )
}

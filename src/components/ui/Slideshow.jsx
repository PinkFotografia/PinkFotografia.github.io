import { useEffect, useCallback, useState, useRef } from 'react'

export default function Slideshow({ fotos, index, onClose, onNav, onJump }) {
  const total = fotos.length
  const [loaded, setLoaded] = useState(false)
  const touchStartX = useRef(null)
  const thumbsRef = useRef(null)

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape')      onClose()
    if (e.key === 'ArrowRight')  onNav(1)
    if (e.key === 'ArrowLeft')   onNav(-1)
  }, [onClose, onNav])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [handleKey])

  // Reset loaded state on image change
  useEffect(() => { setLoaded(false) }, [index])

  // Auto-scroll thumbnail strip to keep active thumb visible
  useEffect(() => {
    if (!thumbsRef.current) return
    const active = thumbsRef.current.children[index]
    if (active) active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [index])

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) onNav(diff > 0 ? 1 : -1)
    touchStartX.current = null
  }

  if (!fotos.length) return null

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/96 flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={onClose}
    >
      {/* ── Top bar ── */}
      <div
        className="flex items-center justify-between px-5 py-4 shrink-0"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-white/35 text-[12px] tracking-[0.15em] font-sans tabular-nums">
          {index + 1} <span className="text-white/20">/</span> {total}
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.08] hover:bg-white/[0.18] text-white/60 hover:text-white transition-all text-[15px]"
          aria-label="Cerrar"
        >
          ✕
        </button>
      </div>

      {/* ── Image area ── */}
      <div
        className="flex-1 flex items-center justify-center relative min-h-0 px-14 md:px-20"
        onClick={e => e.stopPropagation()}
      >
        {/* Prev button */}
        {total > 1 && (
          <button
            onClick={() => onNav(-1)}
            className="absolute left-3 md:left-5 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/[0.08] hover:bg-white/[0.22] text-white/60 hover:text-white transition-all text-[24px] leading-none"
            aria-label="Anterior"
          >
            ‹
          </button>
        )}

        {/* Photo — key forces re-mount for fade-in */}
        <img
          key={index}
          src={fotos[index]}
          alt={`Foto ${index + 1} de ${total}`}
          onLoad={() => setLoaded(true)}
          draggable={false}
          className={`max-h-full max-w-full object-contain select-none transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Next button */}
        {total > 1 && (
          <button
            onClick={() => onNav(1)}
            className="absolute right-3 md:right-5 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/[0.08] hover:bg-white/[0.22] text-white/60 hover:text-white transition-all text-[24px] leading-none"
            aria-label="Siguiente"
          >
            ›
          </button>
        )}
      </div>

      {/* ── Thumbnail strip ── */}
      {total > 1 && (
        <div
          className="shrink-0 py-3 px-4 overflow-x-auto scrollbar-none"
          onClick={e => e.stopPropagation()}
          style={{ scrollbarWidth: 'none' }}
        >
          <div ref={thumbsRef} className="flex gap-[6px] w-max mx-auto">
            {fotos.map((foto, i) => (
              <button
                key={i}
                onClick={() => onJump ? onJump(i) : onNav(i - index)}
                className={`shrink-0 w-[52px] h-[52px] md:w-[60px] md:h-[60px] rounded-[5px] overflow-hidden transition-all duration-200 ${
                  i === index
                    ? 'ring-2 ring-white/80 opacity-100 scale-[1.05]'
                    : 'opacity-30 hover:opacity-60'
                }`}
                aria-label={`Ir a foto ${i + 1}`}
              >
                <img src={foto} alt="" className="w-full h-full object-cover" draggable={false} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

import { useEffect, useCallback, useState, useRef } from 'react'
import { createPortal } from 'react-dom'

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
    // If touch ended on a button, let the button's onClick handle it
    if (e.target.closest('button')) {
      touchStartX.current = null
      return
    }
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) onNav(diff > 0 ? 1 : -1)
    touchStartX.current = null
  }

  if (!fotos.length) return null

  return createPortal(
    <div className="fixed inset-0 z-[2000] bg-black/96 flex flex-col">

      {/* ── Top bar — padding-top respects iOS notch / safe area ── */}
      <div
        className="flex items-center justify-between px-4 pb-3 shrink-0"
        style={{ paddingTop: 'max(12px, env(safe-area-inset-top, 12px))' }}
      >
        <div className="text-white/40 text-[13px] tracking-[0.12em] font-sans tabular-nums">
          {index + 1} <span className="text-white/25">/</span> {total}
        </div>
        <button
          onClick={onClose}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 text-white text-[20px] border border-white/30 active:bg-white/40"
          aria-label="Cerrar"
        >
          ✕
        </button>
      </div>

      {/* ── Image area — swipe detection only here ── */}
      <div
        className="flex-1 relative min-h-0"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image fills the area with object-contain — never overflows */}
        <img
          key={index}
          src={fotos[index]}
          alt={`Foto ${index + 1} de ${total}`}
          onLoad={() => setLoaded(true)}
          draggable={false}
          className={`absolute inset-0 w-full h-full object-contain select-none transition-opacity duration-300 px-14 md:px-20 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {total > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNav(-1) }}
            className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/[0.08] hover:bg-white/[0.22] text-white/60 hover:text-white transition-all text-[24px] leading-none"
            aria-label="Anterior"
          >
            ‹
          </button>
        )}

        {total > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNav(1) }}
            className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/[0.08] hover:bg-white/[0.22] text-white/60 hover:text-white transition-all text-[24px] leading-none"
            aria-label="Siguiente"
          >
            ›
          </button>
        )}
      </div>

      {/* ── Thumbnail strip — padding-bottom respects iOS home indicator ── */}
      {total > 1 && (
        <div
          className="shrink-0 pt-3 px-4 overflow-x-auto"
          style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom, 12px))', scrollbarWidth: 'none' }}
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

    </div>,
    document.body
  )
}

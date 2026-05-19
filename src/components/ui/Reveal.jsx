import { useEffect, useRef } from 'react'

const DELAY_CLASSES = { 1: 'reveal-delay-1', 2: 'reveal-delay-2', 3: 'reveal-delay-3', 4: 'reveal-delay-4' }

export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const delayClass = DELAY_CLASSES[delay] ?? ''

  return (
    <Tag ref={ref} className={`reveal ${delayClass} ${className}`}>
      {children}
    </Tag>
  )
}

export default function SectionKicker({ children, centered = false }) {
  return (
    <div className={`flex items-center gap-[10px] text-[10px] tracking-[0.18em] uppercase text-pink mb-4 ${centered ? 'justify-center' : ''}`}>
      <span className="block w-7 h-px bg-pink flex-shrink-0" />
      {children}
      {centered && <span className="block w-7 h-px bg-pink flex-shrink-0" />}
    </div>
  )
}

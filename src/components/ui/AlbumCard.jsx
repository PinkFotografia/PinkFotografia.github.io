import { useLang } from '../../context/LangContext'
import Reveal from './Reveal'

export default function AlbumCard({ album, onClick, delay = 0 }) {
  const { t } = useLang()
  const cover = album.fotos?.[0] || ''
  const count = album.fotos?.length || 0

  return (
    <Reveal delay={delay}>
      <button
        onClick={onClick}
        className="group w-full text-left cursor-pointer bg-transparent border-0 p-0"
      >
        <div className="overflow-hidden rounded-[12px] bg-[#1A1A1A] aspect-[4/3] relative">
          {cover && (
            <img
              src={cover}
              alt={album.nombre}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            />
          )}
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-[12px] tracking-[0.15em] uppercase bg-white/15 backdrop-blur-sm px-4 py-2 rounded-[20px]">
              {count} {t('fotos', 'photos')}
            </span>
          </div>
        </div>
        <div className="mt-3 px-1">
          <div className="font-serif italic text-[1.1rem] text-ink leading-tight">
            {album.nombre}
          </div>
          <div className="text-[11px] text-ink-muted mt-1 tracking-[0.06em]">
            {album.fecha}
          </div>
        </div>
      </button>
    </Reveal>
  )
}

import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAlbumes } from '../hooks/useAlbumes'
import { useLang } from '../context/LangContext'
import { CATEGORIES } from '../lib/categories'
import { FALLBACK_ALBUMES } from '../lib/fallbackAlbumes'
import CategoryHero from '../components/ui/CategoryHero'
import CategoryTabs from '../components/ui/CategoryTabs'
import AlbumCard from '../components/ui/AlbumCard'
import Slideshow from '../components/ui/Slideshow'
import Reveal from '../components/ui/Reveal'
import SectionKicker from '../components/ui/SectionKicker'

const ROTS = [-3, 2, -1.5, 3, -2, 1, -3.5, 2.5]

export default function PortafolioPage() {
  const { categoria } = useParams()
  const { data, loading, error } = useAlbumes(categoria)
  const { t } = useLang()

  const [openAlbum, setOpenAlbum] = useState(null)
  const [ssIndex, setSsIndex] = useState(null)

  const cat = CATEGORIES[categoria]
  if (!cat) return null

  const albumes = (!loading && !error && data.length > 0)
    ? data
    : FALLBACK_ALBUMES[categoria] || []

  function handleAlbumClick(album) {
    setOpenAlbum(album)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleBack() {
    setOpenAlbum(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function openSlideshow(i) {
    setSsIndex(i)
  }

  function navSlide(dir) {
    const total = openAlbum.fotos.length
    setSsIndex(i => (i + dir + total) % total)
  }

  return (
    <>
      <CategoryHero categoria={categoria} type="portafolio" />
      <CategoryTabs basePath="/portafolio" />

      <div className="bg-cream py-20 px-12">
        <div className="max-w-[1200px] mx-auto">

          {/* ── ALBUMS VIEW ── */}
          {!openAlbum && (
            <>
              <Reveal className="text-center mb-14">
                <SectionKicker centered>{t('Álbumes', 'Albums')}</SectionKicker>
                <p className="text-[14px] text-ink-muted mt-3">
                  {t('Seleccioná un álbum para ver las fotos.', 'Select an album to view the photos.')}
                </p>
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {albumes.map((album, i) => (
                  <AlbumCard
                    key={album.id}
                    album={album}
                    delay={(i % 3) + 1}
                    onClick={() => handleAlbumClick(album)}
                  />
                ))}
              </div>
            </>
          )}

          {/* ── PHOTOS VIEW ── */}
          {openAlbum && (
            <>
              {/* Back + title */}
              <div className="flex items-center gap-4 mb-10">
                <button
                  onClick={handleBack}
                  className="text-[11px] tracking-[0.12em] uppercase text-ink-muted hover:text-pink transition-colors bg-transparent border-0 cursor-pointer flex items-center gap-2 p-0 font-sans"
                >
                  ← {t('Álbumes', 'Albums')}
                </button>
                <span className="text-ink-muted/40">·</span>
                <h2 className="font-serif italic text-[1.4rem] text-ink m-0">
                  {openAlbum.nombre}
                </h2>
              </div>

              {/* Masonry grid */}
              <div className="port-grid">
                {openAlbum.fotos.map((foto, i) => {
                  const isPol = i % 5 === 2
                  const rot = isPol
                    ? ROTS[i % ROTS.length] * 0.6
                    : ROTS[i % ROTS.length]

                  return (
                    <div
                      key={i}
                      className={`break-inside-avoid mb-4 cursor-pointer group ${isPol ? 'is-polaroid' : ''}`}
                      style={{ transform: `rotate(${rot}deg)` }}
                      onClick={() => openSlideshow(i)}
                    >
                      <div className={`relative overflow-hidden ${isPol ? 'p-3 pb-10 bg-white shadow-[0_4px_18px_rgba(0,0,0,0.18)]' : 'rounded-[6px]'}`}>
                        <img
                          src={foto}
                          alt={openAlbum.nombre}
                          loading="lazy"
                          className="w-full block transition-transform duration-400 group-hover:scale-[1.03]"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-[18px]">
                            🔍
                          </span>
                        </div>
                        {/* Polaroid caption */}
                        {isPol && (
                          <div className="text-center text-[11px] text-ink-muted italic mt-2 font-serif">
                            {openAlbum.nombre}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

        </div>
      </div>

      {/* Slideshow overlay */}
      {openAlbum && ssIndex !== null && (
        <Slideshow
          fotos={openAlbum.fotos}
          index={ssIndex}
          onClose={() => setSsIndex(null)}
          onNav={navSlide}
        />
      )}
    </>
  )
}

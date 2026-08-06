import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../lib/supabase'
import { CATEGORIES } from '../../lib/categories'
import { compressImage } from '../../lib/imageCompress'

export default function TabAlbumes() {
  const [categoria, setCategoria] = useState('estudio')
  const [albumes, setAlbumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ nombre: '', fecha: '', categoria: 'estudio' })
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 0 })
  const [error, setError] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef(null)

  // Album detail / edit view
  const [editingAlbum, setEditingAlbum] = useState(null)
  const [addFiles, setAddFiles] = useState([])
  const [addPreviews, setAddPreviews] = useState([])
  const [addDragOver, setAddDragOver] = useState(false)
  const [addUploading, setAddUploading] = useState(false)
  const [addProgress, setAddProgress] = useState({ current: 0, total: 0 })
  const [addError, setAddError] = useState(null)
  const addInputRef = useRef(null)

  const isTematicas = categoria === 'tematicas' || categoria === 'pelotero'
  const formIsTematicas = form.categoria === 'tematicas' || form.categoria === 'pelotero'
  const dragIdxRef = useRef(null)
  const [dragOverIdx, setDragOverIdx] = useState(null)
  const [tematicasOrder, setTematicasOrder] = useState(null)

  useEffect(() => { fetchAlbumes(); setTematicasOrder(null) }, [categoria])

  // Sync editingAlbum with fresh data after mutations
  useEffect(() => {
    if (editingAlbum) {
      const fresh = albumes.find(a => a.id === editingAlbum.id)
      if (fresh) setEditingAlbum(fresh)
    }
  }, [albumes])

  async function fetchAlbumes() {
    setLoading(true)
    const { data } = await supabase
      .from('albumes')
      .select('*')
      .eq('categoria', categoria)
      .order('created_at', { ascending: false })
    setAlbumes(data || [])
    setLoading(false)
  }

  // ── New album form ──────────────────────────────────────────────
  function addFilesToForm(newFiles) {
    const imgs = [...newFiles].filter(f => f.type.startsWith('image/'))
    setFiles(prev => {
      const combined = [...prev, ...imgs]
      setPreviews(combined.map(f => URL.createObjectURL(f)))
      return combined
    })
  }

  function removeFile(i) {
    setFiles(prev => {
      const next = prev.filter((_, idx) => idx !== i)
      setPreviews(next.map(f => URL.createObjectURL(f)))
      return next
    })
  }

  function resetForm() {
    setShowForm(false)
    setForm({ nombre: '', fecha: '', categoria })
    setFiles([])
    setPreviews([])
    setError(null)
  }

  async function handleSave(e) {
    e.preventDefault()
    if (!files.length) { setError('Seleccioná al menos una foto.'); return }
    setUploading(true)
    setError(null)
    const albumId = Date.now()
    const catSave = form.categoria
    const urls = []

    try {
      for (let i = 0; i < files.length; i++) {
        setProgress({ current: i + 1, total: files.length })
        const f = await compressImage(files[i])
        const ext = f.name.split('.').pop().toLowerCase()
        const path = `albumes/${catSave}/${albumId}/${i + 1}.${ext}`
        const { error: upErr } = await supabase.storage
          .from('imagenes')
          .upload(path, f, { upsert: true })
        if (upErr) throw upErr
        const { data } = supabase.storage.from('imagenes').getPublicUrl(path)
        urls.push(data.publicUrl)
      }

      const nombre = formIsTematicas
        ? `${CATEGORIES[catSave]?.es ?? catSave} · ${new Date().toLocaleDateString('es-AR')}`
        : form.nombre

      const { error: dbErr } = await supabase.from('albumes').insert({
        categoria: catSave,
        nombre,
        fecha: formIsTematicas ? null : (form.fecha || null),
        fotos: urls,
        activo: true,
      })
      if (dbErr) throw dbErr

      resetForm()
      fetchAlbumes()
    } catch (err) {
      setError(err.message)
    }
    setUploading(false)
    setProgress({ current: 0, total: 0 })
  }

  // ── Album detail actions ────────────────────────────────────────
  async function handleChangeCategoria(nuevaCat) {
    if (!nuevaCat || nuevaCat === editingAlbum.categoria) return
    await supabase.from('albumes').update({ categoria: nuevaCat }).eq('id', editingAlbum.id)
    setEditingAlbum(prev => ({ ...prev, categoria: nuevaCat }))
    fetchAlbumes()
  }

  async function handleRenameAlbum(nombre) {
    const trimmed = nombre.trim()
    if (!trimmed || trimmed === editingAlbum.nombre) return
    await supabase.from('albumes').update({ nombre: trimmed }).eq('id', editingAlbum.id)
    setEditingAlbum(prev => ({ ...prev, nombre: trimmed }))
    fetchAlbumes()
  }

  async function handleDeleteAlbum(id) {
    if (!window.confirm('¿Eliminar este álbum completo?')) return
    await supabase.from('albumes').delete().eq('id', id)
    setEditingAlbum(null)
    fetchAlbumes()
  }

  async function handleDeleteFoto(albumId, fotoUrl, currentFotos) {
    const newFotos = currentFotos.filter(f => f !== fotoUrl)
    if (newFotos.length === 0) {
      await supabase.from('albumes').delete().eq('id', albumId)
      setEditingAlbum(null)
    } else {
      await supabase.from('albumes').update({ fotos: newFotos }).eq('id', albumId)
    }
    fetchAlbumes()
  }

  function addFilesToAlbum(newFiles) {
    const imgs = [...newFiles].filter(f => f.type.startsWith('image/'))
    setAddFiles(prev => {
      const combined = [...prev, ...imgs]
      setAddPreviews(combined.map(f => URL.createObjectURL(f)))
      return combined
    })
  }

  function removeAddFile(i) {
    setAddFiles(prev => {
      const next = prev.filter((_, idx) => idx !== i)
      setAddPreviews(next.map(f => URL.createObjectURL(f)))
      return next
    })
  }

  async function handleAddFotos(e) {
    e.preventDefault()
    if (!addFiles.length) { setAddError('Seleccioná al menos una foto.'); return }
    setAddUploading(true)
    setAddError(null)
    const base = `${editingAlbum.id}_${Date.now()}`
    const existingFotos = Array.isArray(editingAlbum.fotos) ? editingAlbum.fotos : []
    const newUrls = []

    try {
      for (let i = 0; i < addFiles.length; i++) {
        setAddProgress({ current: i + 1, total: addFiles.length })
        const f = await compressImage(addFiles[i])
        const ext = f.name.split('.').pop().toLowerCase()
        const path = `albumes/${categoria}/${base}/${i + 1}.${ext}`
        const { error: upErr } = await supabase.storage
          .from('imagenes')
          .upload(path, f, { upsert: true })
        if (upErr) throw upErr
        const { data } = supabase.storage.from('imagenes').getPublicUrl(path)
        newUrls.push(data.publicUrl)
      }

      const { error: dbErr } = await supabase
        .from('albumes')
        .update({ fotos: [...existingFotos, ...newUrls] })
        .eq('id', editingAlbum.id)
      if (dbErr) throw dbErr

      setAddFiles([])
      setAddPreviews([])
      fetchAlbumes()
    } catch (err) {
      setAddError(err.message)
    }
    setAddUploading(false)
    setAddProgress({ current: 0, total: 0 })
  }

  async function handleReorderTematicas(fromIdx, toIdx) {
    if (fromIdx === toIdx || fromIdx == null) return
    const items = [...(tematicasOrder || tematicasFotos)]
    const [moved] = items.splice(fromIdx, 1)
    items.splice(toIdx, 0, moved)
    const firstAlbumId = items[0]?.albumId
    if (!firstAlbumId) return
    const allUrls = items.map(i => i.url)
    const newItems = items.map(i => ({ url: i.url, albumId: firstAlbumId, albumFotos: allUrls }))
    setTematicasOrder(newItems)
    await supabase.from('albumes').update({ fotos: allUrls }).eq('id', firstAlbumId)
    const otherIds = albumes.filter(a => a.id !== firstAlbumId).map(a => a.id)
    for (const id of otherIds) {
      await supabase.from('albumes').delete().eq('id', id)
    }
    fetchAlbumes()
  }

  async function handleReorderFotos(fromIdx, toIdx) {
    if (fromIdx === toIdx || fromIdx == null) return
    const fotos = Array.isArray(editingAlbum.fotos) ? [...editingAlbum.fotos] : []
    const [moved] = fotos.splice(fromIdx, 1)
    fotos.splice(toIdx, 0, moved)
    setEditingAlbum(prev => ({ ...prev, fotos }))
    await supabase.from('albumes').update({ fotos }).eq('id', editingAlbum.id)
    fetchAlbumes()
  }

  // ── Temáticas flat list ─────────────────────────────────────────
  const tematicasFotos = isTematicas
    ? albumes.flatMap(a =>
        (Array.isArray(a.fotos) ? a.fotos : []).map(url => ({
          url,
          albumId: a.id,
          albumFotos: a.fotos,
        }))
      )
    : []

  // ── Album detail view ───────────────────────────────────────────
  if (editingAlbum) {
    const fotos = Array.isArray(editingAlbum.fotos) ? editingAlbum.fotos : []
    return (
      <div className="p-4 md:p-8 max-w-[1000px]">
        {/* Header */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          <button
            onClick={() => { setEditingAlbum(null); setAddFiles([]); setAddPreviews([]); setAddError(null) }}
            className="text-white/35 hover:text-white text-[11px] tracking-[0.08em] uppercase font-sans transition-colors flex items-center gap-1"
          >
            ← Volver
          </button>
          <div className="w-px h-4 bg-white/10" />
          <input
            type="text"
            defaultValue={editingAlbum.nombre}
            key={editingAlbum.id}
            onBlur={e => handleRenameAlbum(e.target.value)}
            className="text-[1.1rem] font-serif italic text-white/80 bg-transparent border-b border-transparent hover:border-white/20 focus:border-pink focus:outline-none truncate transition-colors min-w-0 flex-1"
          />
          <select
            value={editingAlbum.categoria}
            onChange={e => handleChangeCategoria(e.target.value)}
            className="shrink-0 bg-[#1A1A1A] border border-white/10 rounded-[6px] px-2 py-[0.3rem] text-[11px] text-white/50 focus:outline-none focus:border-pink cursor-pointer hover:border-white/20 transition-colors"
          >
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <option key={key} value={key}>{cat.es}</option>
            ))}
          </select>

          {editingAlbum.fecha && (
            <span className="text-[11px] text-white/30 font-sans shrink-0">{editingAlbum.fecha}</span>
          )}
          <div className="ml-auto">
            <button
              onClick={() => handleDeleteAlbum(editingAlbum.id)}
              className="text-[11px] text-white/25 hover:text-red-400 transition-colors font-sans"
            >
              Eliminar álbum
            </button>
          </div>
        </div>

        {/* Existing photos */}
        <div className="mb-8">
          <div className="flex items-baseline gap-3 mb-4">
            <div className="text-[10px] tracking-[0.1em] uppercase text-white/20 font-sans">
              {fotos.length} {fotos.length === 1 ? 'foto' : 'fotos'}
            </div>
            {fotos.length > 1 && (
              <div className="text-[10px] text-white/15 font-sans">· arrastrá para reordenar</div>
            )}
          </div>
          {fotos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {fotos.map((url, i) => (
                <div
                  key={url}
                  draggable
                  onDragStart={() => { dragIdxRef.current = i }}
                  onDragEnter={() => setDragOverIdx(i)}
                  onDragOver={e => e.preventDefault()}
                  onDragEnd={() => { dragIdxRef.current = null; setDragOverIdx(null) }}
                  onDrop={e => { e.preventDefault(); handleReorderFotos(dragIdxRef.current, i); setDragOverIdx(null) }}
                  className={`relative aspect-square rounded-[6px] overflow-hidden bg-white/[0.05] group cursor-grab active:cursor-grabbing transition-all
                    ${dragOverIdx === i ? 'ring-2 ring-pink scale-[0.97]' : ''}
                    ${dragIdxRef.current === i ? 'opacity-40' : ''}`}
                >
                  <img src={url} alt="" className="w-full h-full object-cover pointer-events-none" />
                  <button
                    onClick={() => handleDeleteFoto(editingAlbum.id, url, fotos)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/70 text-white rounded-full text-[13px] leading-none flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all"
                  >
                    ×
                  </button>
                  {i === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-[9px] text-white/70 text-center py-[2px] font-sans">
                      portada
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-white/20 text-[13px] text-center py-8 font-sans">Este álbum no tiene fotos.</div>
          )}
        </div>

        {/* Add more photos */}
        <div className="bg-[#1A1A1A] rounded-[10px] p-6 border border-white/[0.06]">
          <div className="text-[10px] tracking-[0.12em] uppercase text-white/30 mb-5">Agregar fotos al álbum</div>
          <form onSubmit={handleAddFotos}>
            <div
              onDragOver={e => { e.preventDefault(); setAddDragOver(true) }}
              onDragLeave={() => setAddDragOver(false)}
              onDrop={e => { e.preventDefault(); setAddDragOver(false); addFilesToAlbum(e.dataTransfer.files) }}
              onClick={() => addInputRef.current?.click()}
              className={`border-2 border-dashed rounded-[8px] p-8 text-center cursor-pointer transition-colors mb-4
                ${addDragOver ? 'border-pink bg-pink/[0.06]' : 'border-white/10 hover:border-white/20'}`}
            >
              <div className="text-3xl mb-2">📸</div>
              <div className="text-[13px] text-white/35">
                Arrastrá las fotos acá o <span className="text-pink">hacé clic para seleccionar</span>
              </div>
              <input
                ref={addInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={e => addFilesToAlbum(e.target.files)}
              />
            </div>

            {addPreviews.length > 0 && (
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                {addPreviews.map((src, i) => (
                  <div key={i} className="relative aspect-square rounded-[6px] overflow-hidden bg-white/[0.05]">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeAddFile(i)}
                      className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white rounded-full text-[12px] leading-none flex items-center justify-center hover:bg-red-500 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {addUploading && (
              <div className="mb-4">
                <div className="flex justify-between text-[11px] text-white/30 mb-1 font-sans">
                  <span>Subiendo foto {addProgress.current} de {addProgress.total}…</span>
                  <span>{Math.round((addProgress.current / addProgress.total) * 100)}%</span>
                </div>
                <div className="h-[4px] bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-pink rounded-full transition-all duration-300"
                    style={{ width: `${(addProgress.current / addProgress.total) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {addError && <p className="text-red-400 text-[12px] mb-4 font-sans">{addError}</p>}

            <button
              type="submit"
              disabled={addUploading || addFiles.length === 0}
              className="bg-pink text-white px-5 py-2 rounded-[6px] text-[11px] tracking-[0.08em] uppercase font-sans hover:bg-pink-dark transition-colors disabled:opacity-50"
            >
              {addUploading ? `Subiendo ${addProgress.current}/${addProgress.total}…` : 'Agregar fotos'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Main list view ──────────────────────────────────────────────
  return (
    <div className="p-4 md:p-8 max-w-[1000px]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[1.4rem] font-serif italic text-white/80">Álbumes</h1>
        <button
          onClick={() => { setShowForm(v => !v); setForm(f => ({ ...f, categoria })); setError(null) }}
          className="bg-pink text-white px-5 py-2 rounded-[6px] text-[11px] tracking-[0.08em] uppercase font-sans hover:bg-pink-dark transition-colors"
        >
          {isTematicas ? '+ Agregar fotos' : '+ Nuevo álbum'}
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {Object.entries(CATEGORIES).map(([key, cat]) => (
          <button
            key={key}
            onClick={() => { setCategoria(key); setShowForm(false) }}
            className={`text-[11px] tracking-[0.08em] uppercase px-4 py-[0.4rem] rounded-[20px] border font-sans transition-colors
              ${categoria === key
                ? 'bg-pink text-white border-pink'
                : 'bg-transparent text-white/35 border-white/10 hover:text-white/60 hover:border-white/20'
              }`}
          >
            {cat.es}
          </button>
        ))}
      </div>

      {/* New album form */}
      {showForm && (
        <form onSubmit={handleSave} className="bg-[#1A1A1A] rounded-[10px] p-6 border border-white/[0.06] mb-8">
          <div className="text-[10px] tracking-[0.12em] uppercase text-white/30 mb-5">
            {formIsTematicas ? 'Agregar fotos temáticas' : 'Nuevo álbum'}
          </div>

          <div className="mb-5">
            <label className="block text-[10px] tracking-[0.08em] uppercase text-white/30 mb-1">Categoría</label>
            <select
              value={form.categoria}
              onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-[6px] px-3 py-[0.55rem] text-[13px] text-white/80 focus:outline-none focus:border-pink cursor-pointer"
            >
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                <option key={key} value={key}>{cat.es}</option>
              ))}
            </select>
          </div>

          {!formIsTematicas && (
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-[10px] tracking-[0.08em] uppercase text-white/30 mb-1">Nombre *</label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                  required
                  placeholder="Ej: Familia García · 2025"
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-[6px] px-3 py-[0.55rem] text-[13px] text-white/80 placeholder:text-white/15 focus:outline-none focus:border-pink"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.08em] uppercase text-white/30 mb-1">Año / fecha</label>
                <input
                  type="text"
                  value={form.fecha}
                  onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))}
                  placeholder="Ej: 2025"
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-[6px] px-3 py-[0.55rem] text-[13px] text-white/80 placeholder:text-white/15 focus:outline-none focus:border-pink"
                />
              </div>
            </div>
          )}

          <div className="mb-5">
            <label className="block text-[10px] tracking-[0.08em] uppercase text-white/30 mb-2">
              Fotos * {!formIsTematicas && <span className="text-white/20 normal-case tracking-normal">— la primera es la portada</span>}
            </label>
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); addFilesToForm(e.dataTransfer.files) }}
              onClick={() => inputRef.current?.click()}
              className={`border-2 border-dashed rounded-[8px] p-8 text-center cursor-pointer transition-colors
                ${dragOver ? 'border-pink bg-pink/[0.06]' : 'border-white/10 hover:border-white/20'}`}
            >
              <div className="text-3xl mb-2">📸</div>
              <div className="text-[13px] text-white/35">
                Arrastrá las fotos acá o <span className="text-pink">hacé clic para seleccionar</span>
              </div>
              <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={e => addFilesToForm(e.target.files)}
              />
            </div>

            {previews.length > 0 && (
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-3">
                {previews.map((src, i) => (
                  <div key={i} className="relative aspect-square rounded-[6px] overflow-hidden bg-white/[0.05]">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white rounded-full text-[12px] leading-none flex items-center justify-center hover:bg-red-500 transition-colors"
                    >
                      ×
                    </button>
                    {i === 0 && !formIsTematicas && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-[9px] text-white/70 text-center py-[2px] font-sans">
                        portada
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {uploading && (
            <div className="mb-5">
              <div className="flex justify-between text-[11px] text-white/30 mb-1 font-sans">
                <span>Subiendo foto {progress.current} de {progress.total}…</span>
                <span>{Math.round((progress.current / progress.total) * 100)}%</span>
              </div>
              <div className="h-[4px] bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full bg-pink rounded-full transition-all duration-300"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
                />
              </div>
            </div>
          )}

          {error && <p className="text-red-400 text-[12px] mb-4 font-sans">{error}</p>}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={uploading}
              className="bg-pink text-white px-5 py-2 rounded-[6px] text-[11px] tracking-[0.08em] uppercase font-sans hover:bg-pink-dark transition-colors disabled:opacity-50"
            >
              {uploading ? `Subiendo ${progress.current}/${progress.total}…` : (formIsTematicas ? 'Agregar fotos' : 'Guardar álbum')}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="text-white/35 hover:text-white text-[11px] tracking-[0.08em] uppercase font-sans transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* ── TEMÁTICAS: flat photo grid ── */}
      {isTematicas && !loading && (() => {
        const displayFotos = tematicasOrder || tematicasFotos
        return displayFotos.length === 0 ? (
          <div className="text-white/20 text-[13px] text-center py-16 font-sans">
            No hay fotos temáticas aún. Agregá algunas con el botón de arriba.
          </div>
        ) : (
          <>
            <div className="flex items-baseline gap-3 mb-4">
              <div className="text-[10px] tracking-[0.1em] uppercase text-white/20 font-sans">
                {displayFotos.length} {displayFotos.length === 1 ? 'foto' : 'fotos'}
              </div>
              {displayFotos.length > 1 && (
                <div className="text-[10px] text-white/15 font-sans">· arrastrá para reordenar</div>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {displayFotos.map((item, i) => (
                <div
                  key={item.url + i}
                  draggable
                  onDragStart={() => { dragIdxRef.current = i }}
                  onDragEnter={() => setDragOverIdx(i)}
                  onDragOver={e => e.preventDefault()}
                  onDragEnd={() => { dragIdxRef.current = null; setDragOverIdx(null) }}
                  onDrop={e => { e.preventDefault(); handleReorderTematicas(dragIdxRef.current, i); setDragOverIdx(null) }}
                  className={`relative aspect-square rounded-[6px] overflow-hidden bg-white/[0.05] group cursor-grab active:cursor-grabbing transition-all
                    ${dragOverIdx === i ? 'ring-2 ring-pink scale-[0.97]' : ''}`}
                >
                  <img src={item.url} alt="" className="w-full h-full object-cover pointer-events-none" />
                  <button
                    onClick={() => handleDeleteFoto(item.albumId, item.url, item.albumFotos)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/70 text-white rounded-full text-[13px] leading-none flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </>
        )
      })()}

      {/* ── STANDARD CATEGORIES: album grid ── */}
      {!isTematicas && (
        loading ? (
          <div className="text-white/20 text-[13px] text-center py-16 font-sans">Cargando…</div>
        ) : albumes.length === 0 ? (
          <div className="text-white/20 text-[13px] text-center py-16 font-sans">No hay álbumes para esta categoría</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {albumes.map(a => {
              const fotos = Array.isArray(a.fotos) ? a.fotos : []
              return (
                <div
                  key={a.id}
                  onClick={() => setEditingAlbum(a)}
                  className="bg-[#1A1A1A] rounded-[10px] border border-white/[0.06] overflow-hidden cursor-pointer hover:border-white/20 transition-colors group"
                >
                  {fotos[0] && (
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={fotos[0]} alt={a.nombre} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="font-serif italic text-[1rem] text-white/75 mb-1 truncate">{a.nombre}</div>
                    <div className="text-[11px] text-white/30 font-sans">
                      {fotos.length} {fotos.length === 1 ? 'foto' : 'fotos'}{a.fecha ? ` · ${a.fecha}` : ''}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      )}
    </div>
  )
}

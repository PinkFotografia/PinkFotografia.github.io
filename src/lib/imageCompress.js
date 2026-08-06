// Reduce el peso de las fotos antes de subirlas a Supabase Storage, sin
// achicarlas por debajo de lo que cualquier pantalla puede mostrar.
const MAX_DIMENSION = 2400
const QUALITY = 0.87
const SKIP_BELOW_BYTES = 500_000

export async function compressImage(file) {
  if (!file.type.startsWith('image/') || file.size < SKIP_BELOW_BYTES) return file

  try {
    // imageOrientation: 'from-image' respeta el tag EXIF de rotación de fotos
    // de celular, que canvas ignora por defecto (si no, saldrían giradas).
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height))
    const width = Math.round(bitmap.width * scale)
    const height = Math.round(bitmap.height * scale)

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    canvas.getContext('2d').drawImage(bitmap, 0, 0, width, height)
    bitmap.close()

    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', QUALITY))
    if (!blob || blob.size >= file.size) return file

    return new File([blob], file.name.replace(/\.\w+$/, '.jpg'), { type: 'image/jpeg' })
  } catch {
    // Si el navegador no puede decodificar el archivo (ej. algunos HEIC),
    // subimos el original en vez de bloquear al usuario.
    return file
  }
}

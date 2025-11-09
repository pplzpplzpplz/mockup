export async function makeSquareImage(srcUrl, options = {}) {
  const {
    padColor = '#111',
    outputType = 'image/png',
    quality = 0.92,
    squareSize = null, // if null, use max(img.width, img.height)
    background = 'solid', // 'solid' | 'blur' (blur not implemented in v1)
  } = options

  const img = await loadImage(srcUrl)
  const size = squareSize || Math.max(img.naturalWidth || img.width, img.naturalHeight || img.height)

  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  // background
  if (background === 'solid') {
    ctx.fillStyle = padColor
    ctx.fillRect(0, 0, size, size)
  } else {
    // Placeholder for future blur background implementation
    ctx.fillStyle = padColor
    ctx.fillRect(0, 0, size, size)
  }

  // fit image into square, preserving aspect ratio
  const imgW = img.naturalWidth || img.width
  const imgH = img.naturalHeight || img.height
  const scale = Math.min(size / imgW, size / imgH)
  const drawW = Math.round(imgW * scale)
  const drawH = Math.round(imgH * scale)
  const dx = Math.round((size - drawW) / 2)
  const dy = Math.round((size - drawH) / 2)

  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(img, dx, dy, drawW, drawH)

  return canvas.toDataURL(outputType, quality)
}

export function fileToObjectUrl(file) {
  return URL.createObjectURL(file)
}

export function revokeObjectUrl(url) {
  if (url) URL.revokeObjectURL(url)
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}



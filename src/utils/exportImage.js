export async function exportElementToPng(element, options = {}) {
  if (!element) throw new Error('No element provided for export')
  const { fileName = 'mockup.png', pixelRatio = 1 } = options

  // Wait for fonts to be ready to avoid layout shifts during rasterization
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready
    } catch {}
  }

  const { toPng } = await import('html-to-image')
  const dataUrl = await toPng(element, {
    pixelRatio: pixelRatio,
    cacheBust: true,
    backgroundColor: getComputedStyle(element).backgroundColor || '#000',
  })
  downloadDataUrl(dataUrl, fileName)
  return dataUrl
}

function downloadDataUrl(dataUrl, fileName) {
  const link = document.createElement('a')
  link.download = fileName
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}



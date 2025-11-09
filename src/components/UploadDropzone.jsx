import { useCallback, useRef, useState } from 'react'
import { useMockup } from '../state/MockupProvider'
import { makeSquareImage } from '../utils/imageFit'

export default function UploadDropzone() {
  const { actions, state } = useMockup()
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const hasImage = Boolean(state.image?.objectUrl || state.image?.squareDataUrl)

  const onFiles = useCallback(async (files) => {
    const file = files && files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return
    const objectUrl = URL.createObjectURL(file)
    actions.setImageFile({ file, objectUrl })
    try {
      const square = await makeSquareImage(objectUrl, { padColor: '#111' })
      actions.setSquareDataUrl(square)
    } catch (e) {
      // ignore processing errors for v1; user can still see original
      // console.error(e)
    }
  }, [actions])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const files = e.dataTransfer?.files
    if (files && files.length > 0) {
      onFiles(files)
      e.dataTransfer.clearData()
    }
  }, [onFiles])

  const onDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const onDragLeave = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      style={{
        border: '2px dashed #666',
        borderRadius: 8,
        padding: 24,
        textAlign: 'center',
        background: isDragging ? '#1e1e1e' : '#111',
        color: '#ddd',
        cursor: 'pointer',
      }}
      onClick={() => inputRef.current?.click()}
      role="button"
      aria-label="Upload album art"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          inputRef.current?.click()
        }
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => onFiles(e.target.files)}
        capture="environment"
      />
      <div style={{ fontSize: 16, marginBottom: 8 }}>
        {hasImage ? 'Replace album art' : 'Drag & drop album art here'}
      </div>
      <div style={{ fontSize: 13, opacity: 0.7 }}>
        or click to browse files
      </div>
    </div>
  )
}



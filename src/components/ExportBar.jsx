import { useRef } from 'react'
import { useMockup } from '../state/MockupProvider'
import { exportElementToPng } from '../utils/exportImage'

export default function ExportBar({ targetRef }) {
  const { state, actions } = useMockup()
  const exportingRef = useRef(false)
  const { exportScale, meta } = state

  const fileName = buildFileName(meta)

  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        background: '#0f0f0f',
        padding: 12,
        borderRadius: 12,
        color: '#e6e6e6',
      }}
    >
      <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 12, opacity: 0.8 }}>Scale</span>
        <select
          value={exportScale}
          onChange={(e) => actions.setExportScale(Number(e.target.value))}
          style={{
            background: '#151515',
            border: '1px solid #2a2a2a',
            color: '#f2f2f2',
            borderRadius: 8,
            padding: '8px 10px',
          }}
        >
          <option value={1}>1x</option>
          <option value={2}>2x</option>
          <option value={3}>3x</option>
        </select>
      </label>
      <button
        type="button"
        onClick={async () => {
          if (!targetRef?.current || exportingRef.current) return
          exportingRef.current = true
          try {
            await exportElementToPng(targetRef.current, { fileName, pixelRatio: exportScale })
          } catch (err) {
            // eslint-disable-next-line no-alert
            alert('Export failed. Please run: npm i html-to-image')
            // console.error(err)
          } finally {
            exportingRef.current = false
          }
        }}
        style={{
          background: '#1db954',
          color: '#000',
          border: '1px solid #2a2a2a',
          borderRadius: 8,
          padding: '10px 14px',
          cursor: 'pointer',
          fontWeight: 600,
        }}
      >
        Export PNG
      </button>
    </div>
  )
}

function buildFileName(meta) {
  const artist = (meta?.artistName || 'Artist').trim()
  const song = (meta?.songTitle || 'Song').trim()
  return `${slug(artist)}-${slug(song)}.png`
}

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}



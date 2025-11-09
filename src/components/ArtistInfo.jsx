import { useMockup } from '../state/MockupProvider'

export default function ArtistInfo() {
  const { state, actions } = useMockup()
  const { meta, view } = state

  return (
    <div
      style={{
        display: 'grid',
        gap: 12,
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        background: '#0f0f0f',
        padding: 16,
        borderRadius: 12,
        color: '#e6e6e6',
      }}
    >
      <TextField
        label="Song title"
        value={meta.songTitle}
        onChange={(v) => actions.setMeta({ songTitle: v })}
      />
      <TextField
        label="Artist name"
        value={meta.artistName}
        onChange={(v) => actions.setMeta({ artistName: v })}
      />
      <TextField
        label="Album name"
        value={meta.albumTitle}
        onChange={(v) => actions.setMeta({ albumTitle: v })}
      />
      <div style={{ display: 'flex', gap: 8, alignItems: 'end' }}>
        <ToggleButton
          active={view === 'mobile'}
          onClick={() => actions.setView('mobile')}
        >
          Mobile
        </ToggleButton>
        <ToggleButton
          active={view === 'desktop'}
          onClick={() => actions.setView('desktop')}
        >
          Desktop
        </ToggleButton>
      </div>
    </div>
  )
}

function TextField({ label, value, onChange, placeholder }) {
  return (
    <label style={{ display: 'grid', gap: 6 }}>
      <span style={{ fontSize: 12, opacity: 0.8 }}>{label}</span>
      <input
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          background: '#151515',
          border: '1px solid #2a2a2a',
          color: '#f2f2f2',
          borderRadius: 8,
          padding: '10px 12px',
          outline: 'none',
        }}
      />
    </label>
  )
}

function ToggleButton({ children, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: active ? '#1db954' : '#1a1a1a',
        color: active ? '#000' : '#e6e6e6',
        border: '1px solid #2a2a2a',
        borderRadius: 8,
        padding: '10px 12px',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}



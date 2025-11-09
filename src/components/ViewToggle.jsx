import { useMockup } from '../state/MockupProvider'

export default function ViewToggle() {
  const { state, actions } = useMockup()
  const { view } = state
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Btn active={view === 'mobile'} onClick={() => actions.setView('mobile')}>Mobile</Btn>
      <Btn active={view === 'desktop'} onClick={() => actions.setView('desktop')}>Desktop</Btn>
    </div>
  )
}

function Btn({ active, onClick, children }) {
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



import { useMockup } from '../state/MockupProvider'
import { services } from '../skins/registry'

export default function ServiceSwitcher() {
  const { state, actions } = useMockup()
  const { service } = state

  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        background: '#0f0f0f',
        padding: 12,
        borderRadius: 12,
        color: '#e6e6e6',
      }}
    >
      {Object.entries(services).map(([key, svc]) => (
        <button
          key={key}
          type="button"
          onClick={() => actions.setService(key)}
          style={{
            background: service === key ? '#1db954' : '#1a1a1a',
            color: service === key ? '#000' : '#e6e6e6',
            border: '1px solid #2a2a2a',
            borderRadius: 8,
            padding: '10px 12px',
            cursor: 'pointer',
          }}
        >
          {svc.label}
        </button>
      ))}
    </div>
  )
}



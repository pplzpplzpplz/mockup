 
import './App.css'
import { MockupProvider } from './state/MockupProvider'
import PreviewStage from './components/PreviewStage.jsx'
import { useRef } from 'react'
import ControlsPanel from './components/ControlsPanel.jsx'

function App() {
  const previewRef = useRef(null)

  return (
    <MockupProvider>
      <div style={{ maxWidth: 1100, margin: '24px auto', padding: '0 16px' }}>
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h1 style={{ fontSize: 22, margin: 0 }}>Album Art Streaming Mockups</h1>
          <div />
        </header>
        <div className="twoColLayout">
          <div>
            <ControlsPanel targetRef={previewRef} />
          </div>
          <div>
            <PreviewStage ref={previewRef} />
          </div>
        </div>
      </div>
    </MockupProvider>
  )
}

export default App

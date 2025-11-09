 
import './App.css'
import { MockupProvider } from './state/MockupProvider'
import PreviewStage from './components/PreviewStage.jsx'
import { useRef } from 'react'
import ViewToggle from './components/ViewToggle.jsx'
import ServiceSwitcher from './components/ServiceSwitcher.jsx'
import ExportBar from './components/ExportBar.jsx'

function App() {
  const previewRef = useRef(null)

  return (
    <MockupProvider>
      <div style={{ maxWidth: 1100, margin: '24px auto', padding: '0 16px' }}>
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h1 style={{ fontSize: 22, margin: 0 }}>Album Art Streaming Mockups</h1>
          <div />
        </header>
        <div style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <ServiceSwitcher />
            <ViewToggle />
            <ExportBar targetRef={previewRef} />
          </div>
          <PreviewStage ref={previewRef} />
        </div>
      </div>
    </MockupProvider>
  )
}

export default App

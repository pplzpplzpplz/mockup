export default function ServiceFrame({ children, width = 390, height = 844, background = '#000' }) {
  // A simple device-like frame; size roughly like an iPhone 13/14 viewport
  return (
    <div
      style={{
        display: 'inline-block',
        background: '#0a0a0a',
        padding: 16,
        borderRadius: 28,
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      }}
    >
      <div
        style={{
          width,
          height,
          borderRadius: 22,
          overflow: 'hidden',
          background,
          position: 'relative',
        }}
      >
        {children}
      </div>
    </div>
  )
}



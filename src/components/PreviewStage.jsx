import { forwardRef, useMemo } from 'react'
import { resolveServiceView } from '../skins/registry'
import { useMockup } from '../state/MockupProvider'

const PreviewStage = forwardRef(function PreviewStage(props, ref) {
  const { state } = useMockup()
  const { service, view, meta, image } = state
  const Comp = useMemo(() => resolveServiceView(service, view), [service, view])

  const imageUrl = image?.squareDataUrl || image?.objectUrl || null

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        placeItems: 'center',
        padding: 16,
        background: '#0b0b0b',
        borderRadius: 12,
      }}
    >
      {Comp ? <Comp imageUrl={imageUrl} meta={meta} /> : <div>No view</div>}
    </div>
  )
})

export default PreviewStage



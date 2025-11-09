import UploadDropzone from './UploadDropzone'
import ArtistInfo from './ArtistInfo'
import ServiceSwitcher from './ServiceSwitcher'
import ExportBar from './ExportBar'

export default function ControlsPanel({ targetRef }) {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <UploadDropzone />
      <ArtistInfo />
      <ServiceSwitcher />
      <ExportBar targetRef={targetRef} />
    </div>
  )
}



import ServiceFrame from '../ServiceFrame'
import styles from './spotify.module.css'
import topIcons from '../../assets/Top Icons.png'
import playBar from '../../assets/Play Bar.png'
import playIcons from '../../assets/Play Icons.png'
import shareIcons from '../../assets/Share Icons.png'
import { useRef, useCallback } from 'react'
import { useMockup } from '../../state/MockupProvider'
import { makeSquareImage } from '../../utils/imageFit'

export default function SpotifyMobile({ imageUrl, meta }) {
  const artSrc = imageUrl
  const { songTitle = 'Song Name', artistName = 'Artist Name', albumTitle = 'Playlist Name' } = meta || {}
  const { actions } = useMockup()
  const inputRef = useRef(null)

  const onFiles = useCallback(async (files) => {
    const file = files && files[0]
    if (!file || !file.type.startsWith('image/')) return
    const objectUrl = URL.createObjectURL(file)
    actions.setImageFile({ file, objectUrl })
    try {
      const square = await makeSquareImage(objectUrl, { padColor: '#111' })
      actions.setSquareDataUrl(square)
    } catch (e) { void e }
  }, [actions])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    const files = e.dataTransfer?.files
    if (files && files.length > 0) onFiles(files)
  }, [onFiles])

  return (
    <ServiceFrame width={390} background="#121212">
      <div className={styles.screen}>
        <div className={styles.navBar}>
          <img className={styles.topIcons} src={topIcons} alt="" aria-hidden />
          <div className={styles.navIcon} aria-hidden />
          <div className={styles.navCenter}>
            <div className={styles.subHeader}>Playing From Your Library</div>
            <div
              className={`${styles.playlistTitle} ${styles.editable}`}
              contentEditable
              suppressContentEditableWarning
              dir="ltr"
              onFocus={(e) => {
                const t = e.currentTarget
                if ((t.textContent || '').trim() === '' || t.textContent === 'Album Name') t.textContent = ''
              }}
              onBlur={(e) => actions.setMeta({ albumTitle: e.currentTarget.textContent || '' })}
            >
              {albumTitle || 'Album Name'}
            </div>
          </div>
          <div className={styles.navIcon} aria-hidden />
        </div>

        <div className={styles.artWrap}>
          <div
            className={`${styles.art} ${styles.artClickable}`}
            onClick={() => inputRef.current?.click()}
            onDrop={onDrop}
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation() }}
          >
            {artSrc ? <img src={artSrc} alt="Album art" /> : <div style={{ color: '#666' }}>Tap or drag & drop to add art</div>}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => onFiles(e.target.files)}
              capture="environment"
            />
          </div>
        </div>

        <div className={styles.meta}>
          <div
            className={`${styles.songTitle} ${styles.editable}`}
            contentEditable
            suppressContentEditableWarning
            dir="ltr"
            onFocus={(e) => {
              const t = e.currentTarget
              if ((t.textContent || '').trim() === '' || t.textContent === 'Song Name') t.textContent = ''
            }}
            onBlur={(e) => actions.setMeta({ songTitle: e.currentTarget.textContent || '' })}
          >
            {songTitle || 'Song Name'}
          </div>
          <div
            className={`${styles.artist} ${styles.editable}`}
            contentEditable
            suppressContentEditableWarning
            dir="ltr"
            onFocus={(e) => {
              const t = e.currentTarget
              if ((t.textContent || '').trim() === '' || t.textContent === 'Artist Name') t.textContent = ''
            }}
            onBlur={(e) => actions.setMeta({ artistName: e.currentTarget.textContent || '' })}
          >
            {artistName || 'Artist Name'}
          </div>
        </div>

        <div className={styles.playBar}><img src={playBar} alt="Playback bar" /></div>
        <div className={styles.playIconsRow}><img src={playIcons} alt="Playback controls" /></div>
        <div className={styles.shareIconsRow}><img src={shareIcons} alt="Share and queue controls" /></div>
      </div>
    </ServiceFrame>
  )
}



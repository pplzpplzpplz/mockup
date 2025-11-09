import ServiceFrame from '../ServiceFrame'
import styles from './spotify.module.css'
import topIcons from '../../assets/Top Icons.png'
import playBar from '../../assets/Play Bar.png'
import playIcons from '../../assets/Play Icons.png'
import shareIcons from '../../assets/Share Icons.png'

export default function SpotifyMobile({ imageUrl, meta }) {
  const artSrc = imageUrl
  const { songTitle = 'Song Name', artistName = 'Artist Name', albumTitle = 'Playlist Name' } = meta || {}

  return (
    <ServiceFrame width={390} height={710} background="#121212">
      <div className={styles.screen}>
        <div className={styles.navBar}>
          <img className={styles.topIcons} src={topIcons} alt="" aria-hidden />
          <div className={styles.navIcon} aria-hidden />
          <div className={styles.navCenter}>
            <div className={styles.subHeader}>Playing From Your Library</div>
            <div className={styles.playlistTitle}>{albumTitle || 'Playlist Name'}</div>
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
          <div className={styles.songTitle}>{songTitle || 'Song Title'}</div>
          <div className={styles.artist}>{artistName || 'Artist Name'}</div>
        </div>

        <div className={styles.playBar}><img src={playBar} alt="Playback bar" /></div>
        <div className={styles.playIconsRow}><img src={playIcons} alt="Playback controls" /></div>
        <div className={styles.shareIconsRow}><img src={shareIcons} alt="Share and queue controls" /></div>
      </div>
    </ServiceFrame>
  )
}



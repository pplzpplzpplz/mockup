import ServiceFrame from '../ServiceFrame'
import styles from './spotify.module.css'

export default function SpotifyMobile({ imageUrl, meta }) {
  const artSrc = imageUrl
  const { songTitle = 'Song Title', artistName = 'Artist Name', albumTitle = 'Album Name' } = meta || {}

  return (
    <ServiceFrame width={390} height={844} background="#121212">
      <div className={styles.screen}>
        <div className={styles.topBar}>
          <div style={{ width: 24 }} />
          <div className={styles.titleNowPlaying}>Now Playing</div>
          <div style={{ width: 24 }} />
        </div>

        <div className={styles.artWrap}>
          <div className={styles.art}>
            {artSrc ? <img src={artSrc} alt="Album art" /> : <div style={{ color: '#666' }}>No art</div>}
          </div>
        </div>

        <div className={styles.meta}>
          <div className={styles.songTitle}>{songTitle || 'Song Title'}</div>
          <div className={styles.artist}>{artistName || 'Artist Name'}</div>
          {albumTitle ? <div className={styles.album}>{albumTitle}</div> : null}
        </div>

        <div className={styles.spacer} />

        <div className={styles.timeline}>
          <div className={styles.bar}>
            <div className={styles.barFill} />
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.ctl} aria-hidden>⏮</div>
          <div className={`${styles.ctl} ${styles.play}`} aria-hidden>▶</div>
          <div className={styles.ctl} aria-hidden>⏭</div>
        </div>
      </div>
    </ServiceFrame>
  )
}



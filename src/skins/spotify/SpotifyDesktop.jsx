import styles from './spotify.module.css'

export default function SpotifyDesktop({ imageUrl, meta }) {
  const artSrc = imageUrl
  const { songTitle = 'Song Title', artistName = 'Artist Name', albumTitle = 'Album Name' } = meta || {}

  return (
    <div
      style={{
        width: 960,
        height: 540,
        background: '#121212',
        color: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
      }}
    >
      <div style={{ padding: 24, display: 'grid', gridTemplateRows: '1fr auto auto', gap: 16 }}>
        <div className={styles.art} style={{ borderRadius: 8 }}>
          {artSrc ? <img src={artSrc} alt="Album art" /> : <div style={{ color: '#666' }}>No art</div>}
        </div>
        <div>
          <div className={styles.songTitle} style={{ fontSize: 20 }}>{songTitle || 'Song Title'}</div>
          <div className={styles.artist} style={{ fontSize: 14 }}>{artistName || 'Artist Name'}</div>
          {albumTitle ? <div className={styles.album}>{albumTitle}</div> : null}
        </div>
        <div className={styles.timeline}>
          <div className={styles.bar}>
            <div className={styles.barFill} />
          </div>
        </div>
      </div>

      <div style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 16 }}>Now Playing • Spotify</div>
        <div style={{ flex: 1, borderRadius: 8, background: '#181818' }} />
        <div className={styles.controls} style={{ justifyContent: 'flex-start' }}>
          <div className={styles.ctl} aria-hidden>⏮</div>
          <div className={`${styles.ctl} ${styles.play}`} aria-hidden>▶</div>
          <div className={styles.ctl} aria-hidden>⏭</div>
        </div>
      </div>
    </div>
  )
}



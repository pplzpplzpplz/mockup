import SpotifyMobile from './spotify/SpotifyMobile'
import SpotifyDesktop from './spotify/SpotifyDesktop'

export const services = {
  spotify: {
    label: 'Spotify',
    views: {
      mobile: SpotifyMobile,
      desktop: SpotifyDesktop,
    },
  },
  // Future:
  // apple: { label: 'Apple Music', views: { mobile: AppleMobile, desktop: AppleDesktop } }
}

export function resolveServiceView(serviceKey, viewKey) {
  const svc = services[serviceKey]
  if (!svc) return null
  return svc.views?.[viewKey] || null
}



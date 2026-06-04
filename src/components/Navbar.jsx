import { useState } from 'react'

const APPLE_STORE_URL = '#'
const PLAY_STORE_URL  = '#'

const AppleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 814 1000" fill="currentColor">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-43.3-150.3-109.8c-52-78.7-96.8-204-96.8-324.4 0-150.9 98.4-230.4 194.3-230.4 86.5 0 144.7 42.4 183.8 42.4 36 0 103.7-45 197.4-45 32.1 0 134.2 2.6 204.4 119.4z"/>
    <path d="M504.4 80.1c46.7-56.1 78.5-133.3 78.5-210.5 0-10.2-.6-20.7-2.6-29.3-74.3 2.9-162.2 49.8-215.1 113.8-41.5 48.4-80.9 125.6-80.9 204 0 11.5 2 23 2.9 26.6 4.5.6 11.8 1.6 19.1 1.6 66.5 0 150.9-44.4 198.1-106.2z"/>
  </svg>
)

const PlayIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.18 23.76c.3.17.64.22.97.15l12.08-12.08L12.36 8 3.18 23.76zm17.15-10.95L17.5 11.3 4.1.78c.1-.06.2-.1.32-.13L20.33 12.81zm0 2.38L4.42 23.35c-.12-.03-.23-.07-.32-.14l13.4-10.52 2.83-1.5zM2.77 1.12C2.46 1.4 2.28 1.83 2.28 2.4v19.2c0 .57.18 1 .49 1.28L14.9 12 2.77 1.12z"/>
  </svg>
)

export default function Navbar({ onStoreClick }) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#home" className="nav-logo">
          <img src="/icon.png" alt="Pekugara" className="nav-logo-icon" />
          Pekugara
        </a>

        <div className="nav-links">
          {[['#home','Home'],['#features','Features'],['#how','How It Works'],['#about','About'],['#contact','Contact']].map(([href,label]) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
        </div>

        <div className="nav-btns">
          <button className="btn-ios" onClick={() => onStoreClick('ios')}>
            <AppleIcon /> iOS
          </button>
          <button className="btn-android" onClick={() => onStoreClick('android')}>
            <PlayIcon /> Android
          </button>
        </div>

        <button className={`burger${open ? ' open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
          <span className="burger-line" />
          <span className="burger-line" />
          <span className="burger-line" />
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          {[['#home','Home'],['#features','Features'],['#how','How It Works'],['#about','About'],['#contact','Contact']].map(([href,label]) => (
            <a key={href} href={href} className="mobile-link" onClick={() => setOpen(false)}>{label}</a>
          ))}
          <div className="mobile-store-btns">
            <button className="mobile-btn-ios" onClick={() => { setOpen(false); onStoreClick('ios') }}>
              <AppleIcon /> Download on the App Store
            </button>
            <button className="mobile-btn-android" onClick={() => { setOpen(false); onStoreClick('android') }}>
              <PlayIcon /> Get it on Google Play
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

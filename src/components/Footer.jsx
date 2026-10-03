const APPLE_STORE_URL = 'https://apps.apple.com/app/pekugara/id6771945941'
const PLAY_STORE_URL  = '#'

const AppleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 814 1000" fill="currentColor">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-43.3-150.3-109.8c-52-78.7-96.8-204-96.8-324.4 0-150.9 98.4-230.4 194.3-230.4 86.5 0 144.7 42.4 183.8 42.4 36 0 103.7-45 197.4-45 32.1 0 134.2 2.6 204.4 119.4z"/>
    <path d="M504.4 80.1c46.7-56.1 78.5-133.3 78.5-210.5 0-10.2-.6-20.7-2.6-29.3-74.3 2.9-162.2 49.8-215.1 113.8-41.5 48.4-80.9 125.6-80.9 204 0 11.5 2 23 2.9 26.6 4.5.6 11.8 1.6 19.1 1.6 66.5 0 150.9-44.4 198.1-106.2z"/>
  </svg>
)

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.18 23.76c.3.17.64.22.97.15l12.08-12.08L12.36 8 3.18 23.76zm17.15-10.95L17.5 11.3 4.1.78c.1-.06.2-.1.32-.13L20.33 12.81zm0 2.38L4.42 23.35c-.12-.03-.23-.07-.32-.14l13.4-10.52 2.83-1.5zM2.77 1.12C2.46 1.4 2.28 1.83 2.28 2.4v19.2c0 .57.18 1 .49 1.28L14.9 12 2.77 1.12z"/>
  </svg>
)

export default function Footer({ onEulaClick, onTermsClick, onStoreClick }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/icon.png" alt="Pekugara" className="footer-logo-icon" />
              Pekugara
            </div>
            <p>Zimbabwe's trusted rental housing platform. Find your place to stay.</p>
            <div className="store-btns">
              <a className="footer-btn-ios" href={APPLE_STORE_URL} target="_blank" rel="noopener noreferrer">
                <AppleIcon /> App Store
              </a>
              <button className="footer-btn-android" onClick={() => onStoreClick('android')}>
                <PlayIcon /> Google Play
              </button>
            </div>
          </div>

          <div className="footer-links">
            <div className="link-col">
              <p className="link-col-title">Navigation</p>
              {[['#home','Home'],['#features','Features'],['#how','How It Works'],['#about','About'],['#contact','Contact']].map(([href,label]) => (
                <a key={href} href={href}>{label}</a>
              ))}
            </div>
            <div className="link-col">
              <p className="link-col-title">Legal</p>
              <a href="/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a>
              <a href="#" onClick={e => { e.preventDefault(); onTermsClick() }}>Terms of Service</a>
              <a href="#" onClick={e => { e.preventDefault(); onEulaClick() }}>EULA</a>
              <a href="/docs">User Documentation</a>
            </div>
            <div className="link-col">
              <p className="link-col-title">Support</p>
              <a href="mailto:support@pekugara.com">support@pekugara.com</a>
              <a href="#contact">Contact form</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Pekugara. All rights reserved.</p>
          <p className="footer-made">
            Made with
            <svg className="footer-heart" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-label="love" role="img">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            in Zimbabwe
          </p>
        </div>
      </div>
    </footer>
  )
}

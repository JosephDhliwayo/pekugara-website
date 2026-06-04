const APPLE_STORE_URL = '#'
const PLAY_STORE_URL  = '#'

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 814 1000" fill="currentColor">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-43.3-150.3-109.8c-52-78.7-96.8-204-96.8-324.4 0-150.9 98.4-230.4 194.3-230.4 86.5 0 144.7 42.4 183.8 42.4 36 0 103.7-45 197.4-45 32.1 0 134.2 2.6 204.4 119.4z"/>
    <path d="M504.4 80.1c46.7-56.1 78.5-133.3 78.5-210.5 0-10.2-.6-20.7-2.6-29.3-74.3 2.9-162.2 49.8-215.1 113.8-41.5 48.4-80.9 125.6-80.9 204 0 11.5 2 23 2.9 26.6 4.5.6 11.8 1.6 19.1 1.6 66.5 0 150.9-44.4 198.1-106.2z"/>
  </svg>
)
const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.18 23.76c.3.17.64.22.97.15l12.08-12.08L12.36 8 3.18 23.76zm17.15-10.95L17.5 11.3 4.1.78c.1-.06.2-.1.32-.13L20.33 12.81zm0 2.38L4.42 23.35c-.12-.03-.23-.07-.32-.14l13.4-10.52 2.83-1.5zM2.77 1.12C2.46 1.4 2.28 1.83 2.28 2.4v19.2c0 .57.18 1 .49 1.28L14.9 12 2.77 1.12z"/>
  </svg>
)

const PRICES = [120, 85, 150]

export default function Hero({ onStoreClick }) {
  return (
    <section id="home" className="hero">
      <div className="hero-glow" />

      <div className="hero-inner">
        <div className="hero-content">
          <div className="badge">
            <span className="badge-dot" />
            Now available on iOS
          </div>

          <h1 className="hero-headline">
            Find Student Housing{' '}
            <span className="highlight">Near Your Campus</span>
          </h1>

          <p className="hero-sub">
            Pekugara connects Zimbabwean students with verified landlords offering
            affordable, safe accommodation near universities. Browse listings,
            chat with landlords, and book viewings — all in one app.
          </p>

          <div className="hero-actions">
            <button className="btn-store-ios" onClick={() => onStoreClick('ios')}>
              <AppleIcon /> App Store
            </button>
            <button className="btn-store-android" onClick={() => onStoreClick('android')}>
              <PlayIcon /> Google Play
            </button>
            <a href="#how" className="btn-learn">How it works ↓</a>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">500+</span>
              <span className="stat-label">Listings</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">2000+</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">10+</span>
              <span className="stat-label">Cities</span>
            </div>
          </div>
        </div>

        <div className="hero-mockup">
          {/* Orbiting dot */}
          <div className="orbit-ring">
            <div className="orbit-dot" />
          </div>

          <div className="phone">
            <div className="phone-header">
              <span className="phone-title">Pekugara</span>
              <span className="phone-time">9:41</span>
            </div>
            <div className="phone-cards">
              {PRICES.map((price, i) => (
                <div key={i} className="phone-card" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="phone-card-img" />
                  <div className="phone-card-body">
                    <div className="phone-card-bar w70" />
                    <div className="phone-card-bar w50" />
                    <span className="phone-card-price">${price}/mo</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating badges around phone */}
          <div className="float-badge float-badge-1">✅ Verified</div>
          <div className="float-badge float-badge-2">🔒 Safe</div>
          <div className="float-badge float-badge-3">⚡ Instant</div>

          <div className="phone-glow" />
        </div>
      </div>

      {/* Wave divider */}
      <div className="wave-bottom">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#161b22" />
        </svg>
      </div>
    </section>
  )
}

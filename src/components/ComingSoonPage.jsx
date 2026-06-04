const AppleIcon = () => (
  <svg width="40" height="40" viewBox="0 0 814 1000" fill="currentColor">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-43.3-150.3-109.8c-52-78.7-96.8-204-96.8-324.4 0-150.9 98.4-230.4 194.3-230.4 86.5 0 144.7 42.4 183.8 42.4 36 0 103.7-45 197.4-45 32.1 0 134.2 2.6 204.4 119.4z"/>
    <path d="M504.4 80.1c46.7-56.1 78.5-133.3 78.5-210.5 0-10.2-.6-20.7-2.6-29.3-74.3 2.9-162.2 49.8-215.1 113.8-41.5 48.4-80.9 125.6-80.9 204 0 11.5 2 23 2.9 26.6 4.5.6 11.8 1.6 19.1 1.6 66.5 0 150.9-44.4 198.1-106.2z"/>
  </svg>
)

const PlayIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.18 23.76c.3.17.64.22.97.15l12.08-12.08L12.36 8 3.18 23.76zm17.15-10.95L17.5 11.3 4.1.78c.1-.06.2-.1.32-.13L20.33 12.81zm0 2.38L4.42 23.35c-.12-.03-.23-.07-.32-.14l13.4-10.52 2.83-1.5zM2.77 1.12C2.46 1.4 2.28 1.83 2.28 2.4v19.2c0 .57.18 1 .49 1.28L14.9 12 2.77 1.12z"/>
  </svg>
)

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
)

export default function ComingSoonPage({ platform = 'ios', onClose }) {
  const isIos     = platform === 'ios'
  const Icon      = isIos ? AppleIcon : PlayIcon
  const storeName = isIos ? 'App Store' : 'Google Play'
  const color     = isIos ? '#f0f6fc' : '#2dcc7a'
  const bgColor   = isIos ? 'rgba(240,246,252,0.08)' : 'rgba(45,204,122,0.08)'
  const border    = isIos ? 'rgba(240,246,252,0.2)' : 'rgba(45,204,122,0.25)'

  return (
    <div className="cs-overlay">
      {/* Close button */}
      <button className="cs-close" onClick={onClose} aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      {/* Background glow */}
      <div className="cs-glow" style={{ background: `radial-gradient(ellipse, ${color}18 0%, transparent 65%)` }} />

      {/* Animated rings */}
      <div className="cs-rings">
        {[200, 340, 480].map((s, i) => (
          <div key={i} className="cs-ring" style={{
            width: s, height: s,
            borderColor: `${color}20`,
            animationDelay: `${i * 0.8}s`,
          }} />
        ))}
      </div>

      <div className="cs-content">
        {/* Store icon */}
        <div className="cs-icon" style={{ background: bgColor, border: `1px solid ${border}`, color }}>
          <Icon />
        </div>

        {/* Coming soon badge */}
        <div className="cs-badge">
          <span className="cs-badge-dot" />
          In Development
        </div>

        <h1 className="cs-title">Coming Soon</h1>

        <p className="cs-subtitle">
          The Pekugara app is currently under review on the{' '}
          <strong style={{ color }}>{storeName}</strong>.
          We're working hard to get it approved and in your hands as soon as possible.
        </p>

        {/* Feature pills */}
        <div className="cs-pills">
          {['Find accommodation', 'Verified landlords', 'Book viewings', 'In-app chat'].map(f => (
            <span key={f} className="cs-pill">{f}</span>
          ))}
        </div>

        {/* Notify form */}
        <div className="cs-notify">
          <p className="cs-notify-label">
            <BellIcon /> Get notified when we launch
          </p>
          <form className="cs-form" onSubmit={e => { e.preventDefault(); e.target.reset(); alert('You\'ll be the first to know when we launch! 🎉') }}>
            <input
              className="cs-input"
              type="email"
              placeholder="Enter your email address"
              required
            />
            <button type="submit" className="cs-btn" style={{ background: color, color: isIos ? '#0d1117' : '#0a3320' }}>
              Notify Me
            </button>
          </form>
        </div>

        <button className="cs-back" onClick={onClose}>
          ← Back to Pekugara
        </button>
      </div>
    </div>
  )
}

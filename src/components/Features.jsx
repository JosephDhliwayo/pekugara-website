const SearchIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2dcc7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)

const VerifiedIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2dcc7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
)

const ChatIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2dcc7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    <line x1="9" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="13" y2="14"/>
  </svg>
)

const BookingIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2dcc7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <polyline points="9 16 11 18 15 14"/>
  </svg>
)

const SafeIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2dcc7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <circle cx="12" cy="12" r="2" fill="#2dcc7a"/>
    <line x1="12" y1="9" x2="12" y2="10"/><line x1="12" y1="14" x2="12" y2="15"/>
  </svg>
)

const BellIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2dcc7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    <circle cx="18" cy="6" r="3" fill="#2dcc7a" stroke="none"/>
  </svg>
)

const FEATURES = [
  { Icon: SearchIcon,  title: 'Smart Search',       desc: 'Filter by city, university, price, amenities and distance to campus. Find exactly what you need in seconds.' },
  { Icon: VerifiedIcon,title: 'Verified Landlords', desc: "Every landlord goes through an identity verification process so you know who you're dealing with." },
  { Icon: ChatIcon,    title: 'In-App Messaging',   desc: 'Chat directly with landlords, ask questions, and arrange viewings — no need to share your phone number.' },
  { Icon: BookingIcon, title: 'Easy Bookings',      desc: 'Book a viewing with a simple $2 fee. Your booking is confirmed instantly and the landlord is notified.' },
  { Icon: SafeIcon,    title: 'Safe Community',     desc: 'Report and block abusive users. Our moderation team reviews all reports within 24 hours.' },
  { Icon: BellIcon,    title: 'Real-Time Alerts',   desc: 'Get instant push notifications when a landlord confirms your booking or sends you a message.' },
]

export default function Features() {
  return (
    <section id="features" className="features">
      <div className="section-inner">
        <div className="section-header reveal">
          <p className="eyebrow">Why Pekugara</p>
          <h2>Everything you need to find a home</h2>
          <p>Built specifically for Zimbabwean students and landlords, with features that make finding accommodation fast and stress-free.</p>
        </div>
        <div className="features-grid">
          {FEATURES.map(({ Icon, title, desc }, i) => (
            <div key={title} className={`feature-card reveal delay-${(i % 3) + 1}`}>
              <div className="feature-icon"><Icon /></div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

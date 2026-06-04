const TargetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2dcc7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
)
const EyeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2dcc7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)
const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2dcc7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)

const CARDS = [
  { Icon: TargetIcon, title: 'Our Mission', desc: 'Make student housing accessible, transparent, and safe for every student in Zimbabwe.' },
  { Icon: EyeIcon,    title: 'Our Vision',  desc: 'Become the go-to housing platform for every university city across Southern Africa.' },
  { Icon: HeartIcon,  title: 'Our Values',  desc: 'Trust, safety, and community. We moderate every listing and stand behind every user.' },
]

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-inner">
        <div className="about-content reveal-left">
          <p className="eyebrow">Our Story</p>
          <h2>Built for Zimbabwean students</h2>
          <p>Finding student accommodation in Zimbabwe is hard. Listings are scattered across WhatsApp groups, Facebook pages, and word of mouth — making it stressful, slow, and often unsafe.</p>
          <p>Pekugara was built to solve this. We created a trusted marketplace where verified landlords list their properties and students can search, chat, and book viewings safely — all from their phones.</p>
          <p>The name <strong style={{ color: '#f0f6fc' }}>Pekugara</strong> means <em style={{ color: '#2dcc7a' }}>"a place to stay"</em> in Shona. That's exactly what we're here to help you find.</p>
        </div>

        <div className="about-cards">
          {CARDS.map(({ Icon, title, desc }, i) => (
            <div key={title} className={`about-card reveal-right delay-${i + 1}`}>
              <div className="about-card-icon"><Icon /></div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

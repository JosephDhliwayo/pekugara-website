import { useState } from 'react'

const TargetIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
)
const EyeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)
const HeartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)

const TABS = [
  {
    key: 'mission',
    label: 'Mission',
    Icon: TargetIcon,
    title: 'Our Mission',
    desc: 'Make student housing in Zimbabwe accessible, transparent, and safe. We believe every student deserves a secure, affordable place to stay near their university — without the stress of scattered listings and unverified landlords.',
    highlight: 'Every student deserves a safe home.',
  },
  {
    key: 'vision',
    label: 'Vision',
    Icon: EyeIcon,
    title: 'Our Vision',
    desc: 'Become the leading student housing platform across Southern Africa — expanding from Zimbabwe into Zambia, Mozambique, and beyond. We envision a future where finding student accommodation is as easy as ordering food online.',
    highlight: 'Southern Africa\'s #1 student housing platform.',
  },
  {
    key: 'values',
    label: 'Values',
    Icon: HeartIcon,
    title: 'Our Values',
    desc: 'Trust, safety, and community are at the heart of everything we do. We verify every landlord, moderate every listing, and stand behind every user. We build with students in mind and improve based on their feedback.',
    highlight: 'Built with trust. Driven by community.',
  },
]

const MILESTONES = [
  { year: '2021', event: 'The idea is born — originally envisioned as a WhatsApp chatbot for student housing' },
  { year: '2025', event: 'Pekugara reimagined as a full mobile platform and founded in Harare' },
  { year: '2026', event: 'Launched on iOS App Store' },
  { year: '2026', event: '500+ listings across 10 cities' },
  { year: '2026', event: '2,000+ students onboarded' },
]

const STATS = [
  { num: '500+',  label: 'Listings' },
  { num: '2000+', label: 'Students' },
  { num: '10+',   label: 'Cities' },
  { num: '100+',  label: 'Landlords' },
]

export default function About() {
  const [activeTab, setActiveTab] = useState('mission')
  const active = TABS.find(t => t.key === activeTab)

  return (
    <section id="about" className="about">
      <div className="about-inner">

        {/* ── Left: Story + Stats + Timeline ── */}
        <div className="about-content reveal-left">
          <p className="eyebrow">Our Story</p>
          <h2>Built for Zimbabwean students</h2>

          <p>The idea came in 2021 — born out of frustration with how scattered student housing was across WhatsApp groups and Facebook pages. The original vision was a WhatsApp chatbot to simplify the search.</p>
          <p>
            Years of refinement turned that chatbot idea into a full platform.
            The name <strong className="about-name">Pekugara</strong> means{' '}
            <em className="about-em">"a place to stay"</em> in Shona —
            and that's exactly what we help every Zimbabwean student find.
          </p>

          {/* Stats row */}
          <div className="about-stats">
            {STATS.map(s => (
              <div key={s.label} className="about-stat">
                <span className="about-stat-num stat-num">{s.num}</span>
                <span className="about-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="about-timeline">
            <p className="about-timeline-title">Our journey</p>
            {MILESTONES.map((m, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-left">
                  <div className="timeline-dot" />
                  {i < MILESTONES.length - 1 && <div className="timeline-line" />}
                </div>
                <div className="timeline-body">
                  <span className="timeline-year">{m.year}</span>
                  <p className="timeline-event">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Interactive Tabs ── */}
        <div className="about-tabs-wrap reveal-right">
          {/* Tab buttons */}
          <div className="about-tab-btns">
            {TABS.map(t => (
              <button
                key={t.key}
                className={`about-tab-btn${activeTab === t.key ? ' active' : ''}`}
                onClick={() => setActiveTab(t.key)}
              >
                <span className="about-tab-icon"><t.Icon /></span>
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="about-tab-content" key={activeTab}>
            <div className="about-tab-icon-big">
              <active.Icon />
            </div>
            <h3 className="about-tab-title">{active.title}</h3>
            <p className="about-tab-desc">{active.desc}</p>
            <div className="about-tab-highlight">
              <span className="about-tab-highlight-dot" />
              {active.highlight}
            </div>
          </div>

          {/* Decorative glow */}
          <div className="about-tab-glow" />
        </div>

      </div>
    </section>
  )
}

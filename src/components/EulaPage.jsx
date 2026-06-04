export default function EulaPage({ onClose }) {
  const sections = [
    {
      num: '1',
      title: 'ACCEPTABLE USE',
      body: 'You may only use Pekugara to post genuine accommodation listings or to find housing as a student. All content you submit must be truthful, accurate, and lawful.',
    },
    {
      num: '2',
      title: 'ZERO TOLERANCE FOR OBJECTIONABLE CONTENT',
      body: null,
      bullets: [
        'Offensive, obscene, or sexually explicit material',
        'Hate speech, discrimination, or content targeting individuals based on race, religion, gender, sexual orientation, disability, or nationality',
        'Fraudulent, misleading, or deceptive listings',
        'Spam, phishing, or unsolicited commercial messages',
        'Threats, intimidation, or harassment of any user',
      ],
      footer: 'Violation of this policy will result in immediate account suspension and permanent removal from the platform without notice or refund.',
    },
    {
      num: '3',
      title: 'ABUSIVE BEHAVIOUR',
      body: 'Abusive behaviour toward other users — including harassment, bullying, threats, or repeated unsolicited contact — is strictly prohibited. We reserve the right to suspend or permanently ban any account engaged in abusive behaviour.',
    },
    {
      num: '4',
      title: 'REPORTING & MODERATION',
      body: 'Every user has the ability to flag objectionable content and block abusive users. Reports are reviewed by our moderation team within 24 hours. Confirmed violations result in content removal and account ejection.',
    },
    {
      num: '5',
      title: 'DEVELOPER ACTION',
      body: 'Upon receiving a verified report, Pekugara will:',
      bullets: [
        'Remove the offending content within 24 hours',
        'Suspend or permanently eject the offending user',
        'Retain records of violations for safety purposes',
      ],
    },
    {
      num: '6',
      title: 'INTELLECTUAL PROPERTY',
      body: 'You retain ownership of content you post but grant Pekugara a worldwide, royalty-free licence to display it within the app.',
    },
    {
      num: '7',
      title: 'DISCLAIMER',
      body: 'Pekugara acts as a platform connecting landlords and students. We do not guarantee the accuracy of listings or the conduct of users.',
    },
    {
      num: '8',
      title: 'GOVERNING LAW',
      body: 'This agreement is governed by the laws of Zimbabwe.',
    },
  ]

  return (
    <div className="eula-overlay">
      {/* Header */}
      <div className="eula-header">
        <div className="eula-header-inner">
          <div>
            <span className="eula-tag">Legal</span>
            <h1 className="eula-title">End User License Agreement</h1>
            <p className="eula-updated">Last updated: 30 May 2026</p>
          </div>
          <button className="eula-close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="eula-body">
        <div className="eula-inner">

          {/* Intro */}
          <div className="eula-intro">
            <div className="eula-intro-icon">📋</div>
            <p>
              By creating an account on Pekugara, you agree to be bound by this End User License Agreement.
              Please read it carefully before using the app.
            </p>
          </div>

          {/* Sections */}
          {sections.map(s => (
            <div key={s.num} className="eula-section">
              <div className="eula-section-header">
                <span className="eula-num">{s.num}</span>
                <h2 className="eula-section-title">{s.title}</h2>
              </div>
              {s.body && <p className="eula-section-body">{s.body}</p>}
              {s.bullets && (
                <ul className="eula-bullets">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="eula-bullet">
                      <span className="eula-bullet-dot" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {s.footer && <p className="eula-section-footer">{s.footer}</p>}
            </div>
          ))}

          {/* Closing */}
          <div className="eula-closing">
            <p>
              By tapping <strong>"Create account"</strong> in the app, you confirm you have read,
              understood, and agree to this EULA in its entirety.
            </p>
          </div>

          {/* Back button */}
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <button className="eula-back-btn" onClick={onClose}>
              ← Back to Pekugara
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

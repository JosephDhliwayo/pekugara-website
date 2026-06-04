export default function TermsPage({ onClose }) {
  const sections = [
    {
      num: '1',
      title: 'ACCEPTANCE OF TERMS',
      body: 'By downloading, installing, or using the Pekugara mobile application or website, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use Pekugara. These terms apply to all users including students, landlords, and visitors.',
    },
    {
      num: '2',
      title: 'ELIGIBILITY',
      bullets: [
        'You must be at least 18 years old to create an account.',
        'Students must be enrolled at a recognised university or college in Zimbabwe.',
        'Landlords must be the legitimate owner or authorised agent of any property listed.',
        'You must provide accurate and truthful information during registration.',
        'You may not create more than one account per person.',
      ],
    },
    {
      num: '3',
      title: 'STUDENT ACCOUNTS',
      body: 'Students may use Pekugara to search for accommodation near their university. A one-time non-refundable booking fee of $2 USD (paid via EcoCash) is required to unlock messaging with landlords and submit a viewing request. This fee is valid for 30 days from payment.',
    },
    {
      num: '4',
      title: 'LANDLORD ACCOUNTS',
      body: 'Landlords may list properties after their identity has been verified by the Pekugara admin team. All listings are reviewed and approved before becoming visible to students. Landlords must ensure all listing information is accurate, up-to-date, and compliant with Zimbabwean law.',
      bullets: [
        'Listings must represent genuine, available accommodation.',
        'Photos must be of the actual property being listed.',
        'Pricing must be honest and include all mandatory charges.',
        'Landlords must respond to booking requests within a reasonable time.',
      ],
    },
    {
      num: '5',
      title: 'PROHIBITED CONDUCT',
      body: 'The following conduct is strictly prohibited on Pekugara:',
      bullets: [
        'Posting false, misleading, or fraudulent listings.',
        'Harassing, threatening, or abusing other users.',
        'Sharing offensive, obscene, or discriminatory content.',
        'Attempting to bypass or circumvent payment systems.',
        'Creating fake accounts or impersonating others.',
        'Scraping, copying, or reproducing platform content without permission.',
        'Using the platform for any unlawful purpose.',
      ],
      footer: 'Violation of these rules may result in immediate account suspension or permanent ban without notice or refund.',
    },
    {
      num: '6',
      title: 'PAYMENTS & FEES',
      body: 'The $2 USD booking fee is processed securely via Pesepay and EcoCash. This fee is non-refundable once payment has been confirmed. Pekugara does not handle rent payments between students and landlords — all rental agreements are made directly between the parties.',
    },
    {
      num: '7',
      title: 'CONTENT OWNERSHIP',
      body: 'You retain ownership of content you submit (listings, photos, messages). By submitting content to Pekugara, you grant us a non-exclusive, worldwide, royalty-free licence to display, reproduce, and distribute that content solely for the purpose of operating the platform. You represent that you have the right to grant this licence.',
    },
    {
      num: '8',
      title: 'MODERATION & ENFORCEMENT',
      body: 'Pekugara reserves the right to remove any content and suspend or permanently ban any account that violates these Terms. Reports of objectionable content are reviewed within 24 hours. We may take action including:',
      bullets: [
        'Removing offending content immediately.',
        'Suspending the account responsible.',
        'Permanently banning repeat offenders.',
        'Reporting serious violations to law enforcement where required.',
      ],
    },
    {
      num: '9',
      title: 'DISCLAIMERS',
      body: 'Pekugara is a platform that connects students and landlords. We do not own, manage, or inspect any listed properties. We do not guarantee the accuracy of listings, the suitability of accommodation, or the conduct of any user. All agreements made through the platform are solely between the student and landlord.',
    },
    {
      num: '10',
      title: 'LIMITATION OF LIABILITY',
      body: 'To the fullest extent permitted by law, Pekugara shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform, including but not limited to loss of data, loss of revenue, or disputes between students and landlords.',
    },
    {
      num: '11',
      title: 'PRIVACY',
      body: 'Your use of Pekugara is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using Pekugara, you consent to the collection and use of your data as described in the Privacy Policy.',
    },
    {
      num: '12',
      title: 'CHANGES TO TERMS',
      body: 'We may update these Terms of Service from time to time. We will notify you of significant changes via the app or email. Continued use of Pekugara after changes are posted constitutes your acceptance of the updated terms.',
    },
    {
      num: '13',
      title: 'TERMINATION',
      body: 'You may delete your account at any time from the Profile screen in the app. Pekugara reserves the right to terminate or suspend your account at any time for breach of these Terms, without prior notice.',
    },
    {
      num: '14',
      title: 'GOVERNING LAW',
      body: 'These Terms of Service are governed by and construed in accordance with the laws of Zimbabwe. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Zimbabwe.',
    },
  ]

  return (
    <div className="eula-overlay">
      {/* Header */}
      <div className="eula-header">
        <div className="eula-header-inner">
          <div>
            <span className="eula-tag">Legal</span>
            <h1 className="eula-title">Terms of Service</h1>
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
            <div className="eula-intro-icon">📄</div>
            <p>
              Please read these Terms of Service carefully before using the Pekugara app or website.
              By accessing or using our platform, you confirm that you have read, understood, and agree to be bound by these terms.
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
              By using Pekugara, you confirm you have read and agree to these Terms of Service.
              For questions, contact us at{' '}
              <a href="mailto:support@pekugara.com" style={{ color: '#2dcc7a' }}>
                support@pekugara.com
              </a>
            </p>
          </div>

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

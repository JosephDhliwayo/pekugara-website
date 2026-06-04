const STUDENT_STEPS = [
  { num: '01', title: 'Create an account',     desc: 'Sign up as a student with your university email in under a minute.' },
  { num: '02', title: 'Search listings',        desc: 'Browse hundreds of verified properties near your campus using smart filters.' },
  { num: '03', title: 'Pay the booking fee',    desc: 'Pay a small $2 fee via EcoCash to unlock messaging and book a viewing.' },
  { num: '04', title: 'Move in',                desc: 'Confirm your viewing, get accepted by the landlord, and move into your new home.' },
]
const LANDLORD_STEPS = [
  { num: '01', title: 'Create a landlord account', desc: 'Register as a landlord and get verified by our admin team.' },
  { num: '02', title: 'List your property',         desc: 'Add photos, amenities, price and location. Goes live after admin approval.' },
  { num: '03', title: 'Receive booking requests',   desc: 'Students pay a booking fee and send you a viewing request with a message.' },
  { num: '04', title: 'Confirm your tenant',        desc: 'Review student profiles, confirm the best match, and finalize the arrangement.' },
]

export default function HowItWorks() {
  return (
    <section id="how" className="how">
      <div className="section-inner">
        <div className="section-header reveal">
          <p className="eyebrow">Simple Process</p>
          <h2>How it works</h2>
        </div>
        <div className="how-cols">
          <div className="how-col reveal-left">
            <span className="col-badge">🎓 For Students</span>
            {STUDENT_STEPS.map((s, i) => (
              <div key={s.num} className={`step reveal delay-${i + 1}`}>
                <span className="step-num">{s.num}</span>
                <div><h3>{s.title}</h3><p>{s.desc}</p></div>
              </div>
            ))}
          </div>
          <div className="how-divider" />
          <div className="how-col reveal-right">
            <span className="col-badge">🏠 For Landlords</span>
            {LANDLORD_STEPS.map((s, i) => (
              <div key={s.num} className={`step reveal delay-${i + 1}`}>
                <span className="step-num">{s.num}</span>
                <div><h3>{s.title}</h3><p>{s.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2dcc7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2dcc7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2dcc7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)

const CONTACT_ITEMS = [
  { Icon: EmailIcon,    label: 'Email',         value: 'support@pekugara.com', href: 'mailto:support@pekugara.com' },
  { Icon: LocationIcon, label: 'Location',      value: 'Harare, Zimbabwe' },
  { Icon: ClockIcon,    label: 'Response time', value: 'Within 24 hours' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleSubmit = e => { e.preventDefault(); setSent(true) }

  return (
    <section id="contact" className="contact">
      <div className="contact-inner">
        <div className="contact-left reveal-left">
          <p className="eyebrow">Get In Touch</p>
          <h2>Contact us</h2>
          <p>Have a question, want to partner with us, or need help with the app? We'll get back to you within 24 hours.</p>
          <div className="contact-items">
            {CONTACT_ITEMS.map(({ Icon, label, value, href }) => (
              <div key={label} className="contact-item">
                <div className="contact-icon"><Icon /></div>
                <div>
                  <span className="label">{label}</span>
                  {href ? <a href={href} className="val">{value}</a> : <p className="val">{value}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-right reveal-right">
          {sent ? (
            <div className="success-box">
              <div className="success-icon">✅</div>
              <h3>Message sent!</h3>
              <p>We'll get back to you within 24 hours.</p>
              <button className="btn-reset" onClick={() => { setForm({ name: '', email: '', message: '' }); setSent(false) }}>
                Send another message
              </button>
            </div>
          ) : (
            <form className="form" onSubmit={handleSubmit}>
              {[
                { name: 'name',  label: 'Full name',     type: 'text',  ph: 'Tatenda Moyo' },
                { name: 'email', label: 'Email address', type: 'email', ph: 'tatenda@uz.ac.zw' },
              ].map(f => (
                <div key={f.name} className="form-group">
                  <label>{f.label}</label>
                  <input className="form-input" type={f.type} name={f.name} placeholder={f.ph} value={form[f.name]} onChange={handleChange} required />
                </div>
              ))}
              <div className="form-group">
                <label>Message</label>
                <textarea className="form-input" name="message" placeholder="How can we help?" value={form.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn-submit">Send Message →</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'

const WHATSAPP_NUMBER  = '263771283006'
const WHATSAPP_DISPLAY = '+263 77 128 3006'

const buildWhatsAppUrl = ({ name, email, message }) => {
  const text = `Hi Pekugara, I'm ${name} (${email}).

${message}

(Sent from pekugara.com)`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

const WhatsAppIcon = ({ size = 20, color = '#2dcc7a' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88zm8.41-18.3A11.81 11.81 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41z"/>
  </svg>
)

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
  { Icon: WhatsAppIcon, label: 'WhatsApp',      value: WHATSAPP_DISPLAY,       href: `https://wa.me/${WHATSAPP_NUMBER}` },
  { Icon: EmailIcon,    label: 'Email',         value: 'support@pekugara.com', href: 'mailto:support@pekugara.com' },
  { Icon: LocationIcon, label: 'Location',      value: 'Harare, Zimbabwe' },
  { Icon: ClockIcon,    label: 'Response time', value: 'Within 24 hours' },
]

export default function Contact() {
  const [form, setForm]   = useState({ name: '', email: '', message: '' })
  const [waUrl, setWaUrl] = useState('')

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    const url = buildWhatsAppUrl(form)
    // Open synchronously inside the submit handler so popup blockers allow it
    const win = window.open(url, '_blank', 'noopener')
    if (!win) window.location.href = url
    setWaUrl(url)
    setForm({ name: '', email: '', message: '' })
  }

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
          {waUrl ? (
            <div className="success-box">
              <div className="success-icon"><WhatsAppIcon size={44} /></div>
              <h3>Almost there!</h3>
              <p>
                Your message is ready in WhatsApp. Just tap send. Didn't open?{' '}
                <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#2dcc7a', fontWeight: 600 }}>
                  Open WhatsApp
                </a>
              </p>
              <button className="btn-reset" onClick={() => setWaUrl('')}>
                Send another message
              </button>
            </div>
          ) : (
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full name</label>
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  placeholder="Tatenda Moyo"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  placeholder="tatenda@uz.ac.zw"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  className="form-input"
                  name="message"
                  placeholder="How can we help?"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn-submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                <WhatsAppIcon size={20} color="currentColor" /> Send via WhatsApp →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import './App.css'
import './styles.css'
import EulaPage      from './components/EulaPage'
import ComingSoonPage from './components/ComingSoonPage'
import TermsPage  from './components/TermsPage'
import Navbar     from './components/Navbar'
import Hero       from './components/Hero'
import Features   from './components/Features'
import HowItWorks from './components/HowItWorks'
import About      from './components/About'
import Contact    from './components/Contact'
import Footer     from './components/Footer'

// ── Sparkles ─────────────────────────────────────────
const SPARKLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size:  Math.random() * 6 + 2,
  left:  Math.random() * 100,
  top:   Math.random() * 100,
  delay: Math.random() * 8,
  dur:   Math.random() * 3 + 2,
}))

// ── Rings ─────────────────────────────────────────────
const RINGS = [
  { size: 300, delay: 0,   dur: 4 },
  { size: 500, delay: 1.2, dur: 4 },
  { size: 700, delay: 2.4, dur: 4 },
]

export default function App() {
  const progressRef = useRef(null)
  const [showEula,      setShowEula]      = useState(false)
  const [showTerms,     setShowTerms]     = useState(false)
  const [storePlatform, setStorePlatform] = useState(null)

  useEffect(() => {
    // Scroll progress
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current)
        progressRef.current.style.width = `${(window.scrollY / total) * 100}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Scroll reveal
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el))

    // Navbar shrink
    const nav = document.querySelector('.nav')
    const onScrollNav = () => nav?.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', onScrollNav, { passive: true })

    // Ripple
    const addRipple = (e) => {
      const btn = e.currentTarget
      const circle = document.createElement('span')
      const d = Math.max(btn.clientWidth, btn.clientHeight)
      const r = btn.getBoundingClientRect()
      circle.className = 'ripple-circle'
      circle.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px;`
      btn.appendChild(circle)
      circle.addEventListener('animationend', () => circle.remove())
    }
    const rippleEls = document.querySelectorAll('.btn-store-ios,.btn-store-android,.btn-submit,.btn-ios,.btn-android,.mobile-btn-ios,.mobile-btn-android')
    rippleEls.forEach(el => { el.classList.add('ripple-wrap'); el.addEventListener('click', addRipple) })

    // 3D tilt on cards
    document.querySelectorAll('.feature-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width  - 0.5
        const y = (e.clientY - r.top)  / r.height - 0.5
        card.style.transform = `perspective(600px) rotateY(${x*14}deg) rotateX(${-y*14}deg) translateZ(10px)`
      })
      card.addEventListener('mouseleave', () => card.style.transform = '')
    })

    // Magnetic buttons
    document.querySelectorAll('.btn-store-ios,.btn-store-android,.btn-learn').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect()
        const x = (e.clientX - r.left - r.width  / 2) * 0.25
        const y = (e.clientY - r.top  - r.height / 2) * 0.25
        btn.style.transform = `translate(${x}px, ${y}px) scale(1.04)`
      })
      btn.addEventListener('mouseleave', () => btn.style.transform = '')
    })

    // Counter animation
    const countObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        const el = e.target
        const raw = el.textContent
        const num = parseInt(raw.replace(/\D/g,''), 10)
        const suffix = raw.replace(/\d/g,'')
        let cur = 0
        const step = Math.ceil(num / 50)
        const t = setInterval(() => {
          cur = Math.min(cur + step, num)
          el.textContent = cur.toLocaleString() + suffix
          if (cur >= num) clearInterval(t)
        }, 25)
        countObserver.unobserve(el)
      })
    }, { threshold: 0.5 })
    document.querySelectorAll('.stat-num').forEach(el => countObserver.observe(el))

    // Mouse parallax glow + sparkles
    const glow = document.querySelector('.hero-glow')
    const onMouseMove = e => {
      if (glow) {
        const x = (e.clientX / window.innerWidth  - 0.5) * 50
        const y = (e.clientY / window.innerHeight - 0.5) * 50
        glow.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px)`
      }
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Cursor sparkle trail
    const spawnSpark = (e) => {
      const spark = document.createElement('div')
      spark.className = 'cursor-spark'
      spark.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;width:${Math.random()*6+4}px;height:${Math.random()*6+4}px;`
      document.body.appendChild(spark)
      setTimeout(() => spark.remove(), 800)
    }
    window.addEventListener('mousemove', spawnSpark, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('scroll', onScrollNav)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousemove', spawnSpark)
      observer.disconnect()
      countObserver.disconnect()
      rippleEls.forEach(el => el.removeEventListener('click', addRipple))
    }
  }, [])

  return (
    <>
      <div ref={progressRef} className="scroll-progress" />

      {/* Background orbs */}
      <div className="bg-orbs" aria-hidden="true">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
      </div>

      {/* Sparkles */}
      <div className="sparkles" aria-hidden="true">
        {SPARKLES.map(s => (
          <div key={s.id} className="sparkle" style={{
            width: s.size, height: s.size,
            left: `${s.left}%`, top: `${s.top}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }} />
        ))}
      </div>

      {/* Pulse rings in hero */}
      <div className="hero-rings" aria-hidden="true">
        {RINGS.map((r, i) => (
          <div key={i} className="pulse-ring" style={{
            width: r.size, height: r.size,
            animationDelay: `${r.delay}s`,
            animationDuration: `${r.dur}s`,
          }} />
        ))}
      </div>

      {/* Dot grid */}
      <div className="dot-grid" aria-hidden="true" />

      {showEula      && <EulaPage      onClose={() => setShowEula(false)}      />}
      {showTerms     && <TermsPage     onClose={() => setShowTerms(false)}     />}
      {storePlatform && <ComingSoonPage platform={storePlatform} onClose={() => setStorePlatform(null)} />}

      <Navbar onStoreClick={p => setStorePlatform(p)} />
      <main>
        <Hero onStoreClick={p => setStorePlatform(p)} />
        <Features />
        <HowItWorks />
        <About />
        <Contact />
      </main>
      <Footer
        onEulaClick={() => setShowEula(true)}
        onTermsClick={() => setShowTerms(true)}
        onStoreClick={p => setStorePlatform(p)}
      />
    </>
  )
}

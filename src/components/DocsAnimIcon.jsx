export default function DocsAnimIcon({ size = 32 }) {
  const h = Math.round(size * (40 / 52))  // keep aspect ratio for open book
  return (
    <span className="docs-anim-icon" style={{ '--sz': `${size}px` }}>
      <span className="dai-glow" />

      <svg
        className="dai-svg"
        viewBox="0 0 56 44"
        width={size}
        height={h}
        fill="none"
        aria-hidden="true"
      >
        {/* ── Left page ── */}
        <path
          d="M2 6 Q2 2 6 2 L25 2 L25 40 L6 40 Q2 40 2 36 Z"
          fill="#091a10"
          stroke="#2dcc7a"
          strokeWidth="1.5"
        />
        {/* Left page inner glow */}
        <path
          d="M5 5 L23 5 L23 37 L5 37 Q4 37 4 36 L4 8 Q4 5 5 5 Z"
          fill="url(#pageGrad)"
          opacity="0.4"
        />
        {/* Animated lines — left page */}
        <line className="dai-line l1" x1="7"  y1="14" x2="21" y2="14" stroke="#2dcc7a" strokeWidth="1.6" strokeLinecap="round"/>
        <line className="dai-line l2" x1="7"  y1="20" x2="21" y2="20" stroke="#2dcc7a" strokeWidth="1.6" strokeLinecap="round"/>
        <line className="dai-line l3" x1="7"  y1="26" x2="16" y2="26" stroke="#2dcc7a" strokeWidth="1.6" strokeLinecap="round"/>
        <line className="dai-line l4" x1="7"  y1="32" x2="19" y2="32" stroke="#2dcc7a" strokeWidth="1.4" strokeLinecap="round" opacity="0.6"/>

        {/* ── Spine ── */}
        <rect x="24" y="1" width="8" height="42" rx="1" fill="#2dcc7a" opacity="0.18"/>
        <line x1="28" y1="2" x2="28" y2="42" stroke="#2dcc7a" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
        {/* Spine shimmer dot */}
        <circle cx="28" cy="10" r="2" fill="#2dcc7a" opacity="0.5"/>
        <circle cx="28" cy="22" r="1.5" fill="#2dcc7a" opacity="0.35"/>
        <circle cx="28" cy="34" r="2" fill="#2dcc7a" opacity="0.5"/>

        {/* ── Right page ── */}
        <path
          d="M31 2 L50 2 Q54 2 54 6 L54 36 Q54 40 50 40 L31 40 Z"
          fill="#091a10"
          stroke="#2dcc7a"
          strokeWidth="1.5"
        />
        {/* Right page inner glow */}
        <path
          d="M33 5 L51 5 Q52 5 52 8 L52 36 Q52 37 51 37 L33 37 Z"
          fill="url(#pageGrad)"
          opacity="0.4"
        />
        {/* Animated lines — right page */}
        <line className="dai-line l5" x1="35" y1="14" x2="49" y2="14" stroke="#2dcc7a" strokeWidth="1.6" strokeLinecap="round"/>
        <line className="dai-line l6" x1="35" y1="20" x2="49" y2="20" stroke="#2dcc7a" strokeWidth="1.6" strokeLinecap="round"/>
        <line className="dai-line l7" x1="35" y1="26" x2="44" y2="26" stroke="#2dcc7a" strokeWidth="1.6" strokeLinecap="round"/>
        <line className="dai-line l8" x1="35" y1="32" x2="47" y2="32" stroke="#2dcc7a" strokeWidth="1.4" strokeLinecap="round" opacity="0.6"/>

        {/* Gradient defs */}
        <defs>
          <linearGradient id="pageGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#2dcc7a" stopOpacity="0"/>
            <stop offset="50%"  stopColor="#2dcc7a" stopOpacity="1"/>
            <stop offset="100%" stopColor="#2dcc7a" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>

      {/* Sparkle particles */}
      <span className="dai-spark sp1">✦</span>
      <span className="dai-spark sp2">✦</span>
      <span className="dai-spark sp3">★</span>
      <span className="dai-spark sp4">·</span>
    </span>
  )
}

export default function DocsAnimIcon({ size = 32 }) {
  return (
    <span className="docs-anim-icon" style={{ '--sz': `${size}px` }}>
      <span className="dai-glow" />

      <svg
        className="dai-svg"
        viewBox="0 0 56 48"
        width={size}
        height={Math.round(size * 48 / 56)}
        fill="none"
        aria-hidden="true"
      >
        {/* ── Shadow ── */}
        <path d="M28 7 L51 19 L28 31 L5 19 Z" fill="#030c06" opacity="0.5" transform="translate(0 2)"/>

        {/* ── Cap board (diamond) ── */}
        <path d="M28 5 L51 17 L28 29 L5 17 Z" fill="#0c1e12" stroke="#2dcc7a" strokeWidth="1.7"/>

        {/* Top-face highlight gives 3-D lift */}
        <path d="M5 17 L28 5 L51 17 L28 13 Z" fill="#2dcc7a" opacity="0.20"/>

        {/* Left side depth */}
        <path d="M5 17 L5 19 L28 31 L28 29 Z" fill="#2dcc7a" opacity="0.10"/>

        {/* ── Animated highlight lines on cap ── */}
        <line className="dai-line l1"
          x1="17" y1="17" x2="28" y2="11"
          stroke="#2dcc7a" strokeWidth="1.5" strokeLinecap="round"/>
        <line className="dai-line l2"
          x1="21" y1="21" x2="32" y2="15"
          stroke="#2dcc7a" strokeWidth="1.3" strokeLinecap="round" opacity="0.7"/>

        {/* ── Cap base (cylinder) ── */}
        <path
          d="M21 29 L21 37 Q21 42 28 42 Q35 42 35 37 L35 29"
          fill="#0c1e12" stroke="#2dcc7a" strokeWidth="1.4"
        />
        <ellipse cx="28" cy="29" rx="7" ry="2.2"
          fill="#2dcc7a" opacity="0.3" stroke="#2dcc7a" strokeWidth="1"/>

        {/* ── Tassel cord ── */}
        <line x1="51" y1="17" x2="51" y2="33"
          stroke="#2dcc7a" strokeWidth="2.2" strokeLinecap="round"/>

        {/* Tassel ball */}
        <circle cx="51" cy="36" r="4.5" fill="#2dcc7a"/>
        <circle cx="50" cy="34.5" r="1.5" fill="white" opacity="0.35"/>

        {/* Tassel fringe */}
        <line x1="47.5" y1="40" x2="45"   y2="47" stroke="#2dcc7a" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="51"   y1="40" x2="51"   y2="47" stroke="#2dcc7a" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="54.5" y1="40" x2="55.5" y2="47" stroke="#2dcc7a" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>

      {/* Sparkle particles */}
      <span className="dai-spark sp1">✦</span>
      <span className="dai-spark sp2">✦</span>
      <span className="dai-spark sp3">★</span>
      <span className="dai-spark sp4">·</span>
    </span>
  )
}

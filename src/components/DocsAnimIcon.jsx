export default function DocsAnimIcon({ size = 32 }) {
  return (
    <span className="docs-anim-icon" style={{ '--sz': `${size}px` }}>
      {/* Glow ring behind the icon */}
      <span className="dai-glow" />

      {/* The document SVG */}
      <svg
        className="dai-svg"
        viewBox="0 0 48 52"
        width={size}
        height={size * (52 / 48)}
        fill="none"
        aria-hidden="true"
      >
        {/* Page shadow */}
        <rect x="10" y="6" width="28" height="38" rx="4" fill="#072912" />
        {/* Page body */}
        <rect x="8" y="4" width="28" height="38" rx="4" fill="#0d1f15" stroke="#2dcc7a" strokeWidth="1.6" />
        {/* Folded corner — top right */}
        <path d="M28 4 L36 12 L28 12 Z" fill="#2dcc7a" opacity="0.25" />
        <path d="M28 4 L36 12" stroke="#2dcc7a" strokeWidth="1.6" strokeLinecap="round" />
        {/* Animated text lines */}
        <line className="dai-line l1" x1="14" y1="20" x2="30" y2="20" stroke="#2dcc7a" strokeWidth="1.8" strokeLinecap="round" />
        <line className="dai-line l2" x1="14" y1="27" x2="30" y2="27" stroke="#2dcc7a" strokeWidth="1.8" strokeLinecap="round" />
        <line className="dai-line l3" x1="14" y1="34" x2="23" y2="34" stroke="#2dcc7a" strokeWidth="1.8" strokeLinecap="round" />
        {/* Green check badge bottom-right */}
        <circle cx="36" cy="40" r="7" fill="#0d1117" />
        <circle cx="36" cy="40" r="6" fill="#2dcc7a" />
        <path d="M33 40.5 L35.2 42.8 L39.5 37.8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>

      {/* Sparkle particles */}
      <span className="dai-spark sp1">✦</span>
      <span className="dai-spark sp2">✦</span>
      <span className="dai-spark sp3">★</span>
      <span className="dai-spark sp4">·</span>
    </span>
  )
}

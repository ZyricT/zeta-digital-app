// Inline SVG logo — Concept 05 "Orbit AI Z": Z + orbit ring + AI node, gradient wordmark.
// idSuffix keeps gradient IDs unique when multiple logos render on one page.
export default function Logo({ idSuffix = 'a' }: { idSuffix?: string }) {
  const g = `zg-${idSuffix}`
  return (
    <svg className="logo-svg" viewBox="0 0 178 44" role="img" aria-label="Zeta Digital">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#D0FF00" />
          <stop offset="0.5" stopColor="#4D7CFF" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <g transform="translate(23,22)">
        <ellipse rx="19" ry="7" fill="none" stroke="rgba(255,255,255,.32)" strokeWidth="1.3" transform="rotate(-20)" />
        <path d="M-10 -9 L9 -9 L-9 9 L10 9" stroke={`url(#${g})`} strokeWidth="4.2" fill="none" strokeLinejoin="miter" />
        <circle cx="17" cy="-11" r="3.2" fill="#D0FF00" />
      </g>
      <text x="50" y="29" fontFamily="'Space Grotesk',sans-serif" fontWeight="600" fontSize="21" letterSpacing="2" fill={`url(#${g})`}>ZETA</text>
      <text x="51" y="39" fontFamily="'Space Mono',monospace" fontSize="6" letterSpacing="3.2" fill="rgba(255,255,255,.5)">DIGITAL</text>
    </svg>
  )
}

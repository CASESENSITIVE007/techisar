// The hero picture: a chrome sphere lit in red, wrapped in a reflective ring.
// Pure SVG and CSS, so it stays sharp at any size and needs no image file.
export function HeroOrb() {
  return (
    <div className="orb" aria-hidden="true">
      <svg viewBox="0 0 600 600" className="orb__svg">
        <defs>
          <radialGradient id="orb-body" cx="0.36" cy="0.3" r="0.78">
            <stop offset="0" stopColor="#f7f8fa" />
            <stop offset="0.06" stopColor="#cfd2d7" />
            <stop offset="0.24" stopColor="#5d6168" />
            <stop offset="0.5" stopColor="#1b1c20" />
            <stop offset="0.8" stopColor="#09090a" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <radialGradient id="orb-rim" cx="0.78" cy="0.82" r="0.62">
            <stop offset="0" stopColor="#ff3b48" stopOpacity="0.95" />
            <stop offset="0.38" stopColor="#e63946" stopOpacity="0.5" />
            <stop offset="0.75" stopColor="#e63946" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orb-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#e63946" stopOpacity="0.42" />
            <stop offset="0.45" stopColor="#e63946" stopOpacity="0.14" />
            <stop offset="1" stopColor="#e63946" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="orb-ring" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2a2b2f" />
            <stop offset="0.22" stopColor="#f4f5f7" />
            <stop offset="0.42" stopColor="#7d828a" />
            <stop offset="0.7" stopColor="#ff4250" />
            <stop offset="0.86" stopColor="#c9ccd1" />
            <stop offset="1" stopColor="#1c1d20" />
          </linearGradient>
          <radialGradient id="orb-moon" cx="0.35" cy="0.3" r="0.8">
            <stop offset="0" stopColor="#ffb3b8" />
            <stop offset="0.35" stopColor="#e63946" />
            <stop offset="1" stopColor="#5c0a10" />
          </radialGradient>
          <clipPath id="orb-clip">
            <circle cx="300" cy="292" r="150" />
          </clipPath>
          <clipPath id="orb-front">
            <rect x="0" y="300" width="600" height="300" />
          </clipPath>
          <filter id="orb-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id="orb-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
        </defs>

        {/* Frame: a fine red circle with a brighter arc that slowly travels round it */}
        <circle cx="300" cy="300" r="286" className="orb__frame" />
        <circle cx="300" cy="300" r="286" pathLength="100" className="orb__arc" />
        <circle cx="300" cy="300" r="232" className="orb__inner" />

        <circle cx="330" cy="330" r="230" fill="url(#orb-glow)" />

        <g className="orb__float">
          {/* Back half of the ring sits behind the sphere */}
          <g transform="rotate(-16 300 300)">
            <ellipse cx="300" cy="300" rx="236" ry="62" className="orb__ring orb__ring--back" />
          </g>

          <circle cx="300" cy="292" r="150" fill="url(#orb-body)" />
          <circle cx="300" cy="292" r="150" fill="url(#orb-rim)" className="orb__rim" />

          <g clipPath="url(#orb-clip)">
            <g className="orb__sweep">
              <ellipse cx="410" cy="292" rx="70" ry="120" fill="#ff3b48" opacity="0.55" filter="url(#orb-soft)" />
            </g>
            <ellipse cx="300" cy="338" rx="150" ry="30" className="orb__horizon" />
            <ellipse cx="248" cy="226" rx="40" ry="22" fill="#fff" opacity="0.85" filter="url(#orb-blur)" transform="rotate(-32 248 226)" />
          </g>
          <circle cx="300" cy="292" r="150" className="orb__edge" />

          {/* Front half of the ring passes over the sphere */}
          <g transform="rotate(-16 300 300)">
            <ellipse cx="300" cy="300" rx="236" ry="62" className="orb__ring" clipPath="url(#orb-front)" />
          </g>

          <circle cx="496" cy="244" r="17" fill="url(#orb-moon)" className="orb__moon" />
        </g>
      </svg>

      <p className="orb__tag orb__tag--a">
        <span>Design</span>
        <span>Build</span>
        <span>Launch</span>
      </p>
      <p className="orb__tag orb__tag--b">Built to ship · 2026</p>
    </div>
  );
}

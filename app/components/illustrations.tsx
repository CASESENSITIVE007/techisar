// Spot illustrations for the audience cards. Each sits on its own soft colour disc.

export function RocketIllo() {
  return (
    <svg viewBox="0 0 240 190" className="illo" aria-hidden="true">
      <defs>
        <linearGradient id="il-rocket" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c7cacf" />
          <stop offset="1" stopColor="#616469" />
        </linearGradient>
        <linearGradient id="il-flame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c4c7cc" />
          <stop offset="1" stopColor="#8c8f94" />
        </linearGradient>
      </defs>
      <circle cx="120" cy="96" r="82" fill="#616469" opacity="0.16" />
      <circle cx="120" cy="96" r="56" fill="#616469" opacity="0.16" />
      <g fill="#a4a7ac">
        <circle cx="42" cy="46" r="3" className="illo__twinkle" />
        <circle cx="206" cy="58" r="4" className="illo__twinkle" />
        <circle cx="196" cy="152" r="3" className="illo__twinkle" />
      </g>
      <g className="illo__hover">
        <g transform="rotate(32 120 96)">
          <path d="M104 132 Q120 186 136 132Z" fill="url(#il-flame)" className="illo__flame" />
          <path d="M92 108 L68 142 L98 130Z" fill="#a4a7ac" />
          <path d="M148 108 L172 142 L142 130Z" fill="#a4a7ac" />
          <path d="M120 14 C146 40 156 84 148 134 H92 C84 84 94 40 120 14Z" fill="url(#il-rocket)" />
          <circle cx="120" cy="76" r="17" fill="#16191e" />
          <circle cx="120" cy="76" r="11" fill="#a4a7ac" />
          <path d="M96 118 H144" stroke="#16191e" strokeOpacity="0.35" strokeWidth="3" />
        </g>
      </g>
    </svg>
  );
}

export function GrowthIllo() {
  const bars = [
    { x: 54, h: 40 },
    { x: 92, h: 66 },
    { x: 130, h: 92 },
    { x: 168, h: 124 },
  ];
  return (
    <svg viewBox="0 0 240 190" className="illo" aria-hidden="true">
      <defs>
        <linearGradient id="il-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bdc0c5" />
          <stop offset="1" stopColor="#7e8186" />
        </linearGradient>
      </defs>
      <circle cx="120" cy="96" r="82" fill="#a4a7ac" opacity="0.13" />
      <circle cx="120" cy="96" r="56" fill="#a4a7ac" opacity="0.13" />
      {bars.map((b) => (
        <rect key={b.x} x={b.x} y={166 - b.h} width="26" height={b.h} rx="7" fill="url(#il-bar)" className="illo__bar" />
      ))}
      <path d="M36 112 C78 104 118 76 188 22" fill="none" stroke="#8c8f94" strokeWidth="5" strokeLinecap="round" />
      <path d="M164 22 L190 20 L186 46" fill="none" stroke="#8c8f94" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="36" cy="112" r="7" fill="#c4c7cc" className="illo__twinkle" />
      <path d="M34 166 H206" stroke="#93969b" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function LayersIllo() {
  return (
    <svg viewBox="0 0 240 190" className="illo" aria-hidden="true">
      <defs>
        <linearGradient id="il-l1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#bec1c6" />
          <stop offset="1" stopColor="#616469" />
        </linearGradient>
        <linearGradient id="il-l2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b6b9be" />
          <stop offset="1" stopColor="#616469" />
        </linearGradient>
        <linearGradient id="il-l3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#bdc0c5" />
          <stop offset="1" stopColor="#7e8186" />
        </linearGradient>
      </defs>
      <circle cx="120" cy="96" r="82" fill="#8c8f94" opacity="0.13" />
      <circle cx="120" cy="96" r="56" fill="#8c8f94" opacity="0.13" />
      <path d="M120 96 L200 134 L120 172 L40 134Z" fill="url(#il-l3)" />
      <g className="illo__lift illo__lift--a">
        <path d="M120 66 L200 104 L120 142 L40 104Z" fill="url(#il-l2)" />
      </g>
      <g className="illo__lift illo__lift--b">
        <path d="M120 36 L200 74 L120 112 L40 74Z" fill="url(#il-l1)" />
        <path d="M120 58 c2 9 6 13 15 15 -9 2 -13 6 -15 15 -2 -9 -6 -13 -15 -15 9 -2 13 -6 15 -15z" fill="#fff" />
      </g>
      <circle cx="206" cy="46" r="4" fill="#c4c7cc" className="illo__twinkle" />
      <circle cx="34" cy="60" r="3" fill="#a4a7ac" className="illo__twinkle" />
    </svg>
  );
}

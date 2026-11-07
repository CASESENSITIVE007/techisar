"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const v = (n: number) => ({ "--i": n }) as CSSProperties;

const LABELS = [
  { title: "Website", sub: "React · Next.js" },
  { title: "Mobile app", sub: "iOS · Android" },
  { title: "AI features", sub: "Assistants · search" },
];

// The run from the T to Live is true to scale at 60 units a week.
const WEEK = 60;
const RUN = 480;
const TICKS = [RUN, RUN + WEEK, RUN + WEEK * 3, RUN + WEEK * 8];
const STAGES = [
  { name: "Discover", when: "Week 1", from: TICKS[0], to: TICKS[1] },
  { name: "Design", when: "Weeks 2-3", from: TICKS[1], to: TICKS[2] },
  { name: "Build", when: "Weeks 4-8", from: TICKS[2], to: TICKS[3] },
];
const MID = 156;
const DIM = 360;
const LIVE = { x: TICKS[3], y: 24, w: 336, h: 264 };
const ROWS = [24, 120, 216];

function Packets({ paths, r }: { paths: string[]; r: number }) {
  return paths.map((d, n) => (
    <circle
      key={d}
      r={r}
      className="dg-packet"
      style={{ offsetPath: `path("${d}")`, animationDelay: `${2.2 + n * 1.1}s` }}
    />
  ));
}

function WideDrawing() {
  const paths = ROWS.map((y) => `M288 ${y + 36} H336 V${MID} H${LIVE.x}`);

  return (
    <svg viewBox="0 0 1320 432" className="diagram diagram--wide" aria-hidden="true">
      {paths.map((d, n) => (
        <path key={d} d={d} pathLength={1} className="dg-path" style={v(n)} />
      ))}
      <Packets paths={paths} r={5} />
      <circle cx={336} cy={MID} r={5} className="dg-joint" />

      {LABELS.map((b, n) => (
        <g key={b.title} className="dg-node" style={v(n)}>
          <rect x={24} y={ROWS[n]} width={264} height={72} rx={8} className="dg-box" />
          <text x={42} y={ROWS[n] + 32} className="dg-title" fontSize={23}>
            {b.title}
          </text>
          <text x={42} y={ROWS[n] + 56} className="dg-sub" fontSize={15}>
            {b.sub}
          </text>
        </g>
      ))}

      <g className="dg-node" style={v(3)}>
        <rect x={384} y={120} width={72} height={72} rx={12} className="dg-mark" />
        <text x={420} y={172} textAnchor="middle" className="dg-mark-t" fontSize={44}>
          T
        </text>
      </g>

      <g className="dg-stages">
        {STAGES.map((st) => (
          <text key={st.name} x={(st.from + st.to) / 2} y={MID - 14} textAnchor="middle" className="dg-stage" fontSize={15}>
            {st.name}
          </text>
        ))}
        {TICKS.slice(0, 3).map((x) => (
          <circle key={x} cx={x} cy={MID} r={3.5} className="dg-tick" />
        ))}
        {[...STAGES.map((st) => [st.when, st.from, st.to] as const), ["Week 9 on", LIVE.x, LIVE.x + LIVE.w] as const].map(
          ([when, from, to]) => (
            <g key={when}>
              <rect x={from + 1} y={DIM - 24} width={to - from - 2} height={48} rx={6} className="dg-seg" />
              <text x={(from + to) / 2} y={DIM + 5} textAnchor="middle" className="dg-dim-t" fontSize={12.5}>
                {when}
              </text>
            </g>
          ),
        )}
      </g>

      <g className="dg-node" style={v(4)}>
        <rect x={LIVE.x} y={LIVE.y} width={LIVE.w} height={LIVE.h} rx={10} className="dg-box dg-box--lead" />
        <text x={LIVE.x + 30} y={LIVE.y + 48} className="dg-sub" fontSize={16}>
          Launch
        </text>
        <text x={LIVE.x + 30} y={LIVE.y + 160} className="dg-live" fontSize={84}>
          Live.
        </text>
        <text x={LIVE.x + 30} y={LIVE.y + 232} className="dg-ok" fontSize={16}>
          Deployed
        </text>
      </g>

      <text x={24} y={DIM + 12} className="dg-claim" fontSize={37}>
        in weeks, not quarters
      </text>
    </svg>
  );
}

function NarrowDrawing() {
  const rows = [1, 53, 105];
  const paths = rows.map((y) => `M300 ${y + 23} H324 V172 H171 V248`);

  return (
    <svg viewBox="0 0 343 408" className="diagram diagram--narrow" aria-hidden="true">
      {paths.map((d, n) => (
        <path key={d} d={d} pathLength={1} className="dg-path" style={v(n)} />
      ))}
      <Packets paths={paths} r={3.5} />

      {LABELS.map((b, n) => (
        <g key={b.title} className="dg-node" style={v(n)}>
          <rect x={1} y={rows[n]} width={299} height={46} rx={6} className="dg-box" />
          <text x={12} y={rows[n] + 29} className="dg-title" fontSize={16}>
            {b.title}
          </text>
          <text x={289} y={rows[n] + 28} textAnchor="end" className="dg-sub" fontSize={12.5}>
            {b.sub}
          </text>
        </g>
      ))}

      <g className="dg-node" style={v(3)}>
        <rect x={147} y={186} width={48} height={48} rx={8} className="dg-mark" />
        <text x={171} y={220} textAnchor="middle" className="dg-mark-t" fontSize={29}>
          T
        </text>
      </g>

      <g className="dg-node" style={v(4)}>
        <rect x={1} y={248} width={341} height={108} rx={8} className="dg-box dg-box--lead" />
        <text x={20} y={276} className="dg-sub" fontSize={13}>
          Launch
        </text>
        <text x={20} y={330} className="dg-live" fontSize={52}>
          Live.
        </text>
        <text x={322} y={330} textAnchor="end" className="dg-ok" fontSize={13}>
          Deployed
        </text>
      </g>

      <text x={1} y={394} className="dg-claim" fontSize={25}>
        in weeks, not quarters
      </text>
    </svg>
  );
}

// The signals along the lines are the one loop on the site: it stops off-screen,
// on hover and focus, under reduced motion, and from its own Pause button.
export function PipelineFigure() {
  const ref = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    const btn = btnRef.current;
    if (!el || !btn) return;
    const s = {
      seen: false,
      hover: false,
      focus: false,
      held: matchMedia("(prefers-reduced-motion: reduce)").matches,
    };
    const sync = () => {
      el.classList.toggle("is-running", s.seen && !s.hover && !s.focus && !s.held);
      btn.textContent = s.held ? "Play" : "Pause";
    };
    const set = (key: "hover" | "focus", value: boolean) => () => {
      s[key] = value;
      sync();
    };
    const toggle = () => {
      s.held = !s.held;
      sync();
    };
    const handlers: [string, () => void][] = [
      ["pointerenter", set("hover", true)],
      ["pointerleave", set("hover", false)],
      ["focusin", set("focus", true)],
      ["focusout", set("focus", false)],
    ];
    handlers.forEach(([type, fn]) => el.addEventListener(type, fn));
    btn.addEventListener("click", toggle);
    const io = new IntersectionObserver(([entry]) => {
      s.seen = entry.isIntersecting;
      sync();
    });
    io.observe(el);
    return () => {
      io.disconnect();
      btn.removeEventListener("click", toggle);
      handlers.forEach(([type, fn]) => el.removeEventListener(type, fn));
    };
  }, []);

  return (
    <figure ref={ref} className="pipeline" data-loop>
      <WideDrawing />
      <NarrowDrawing />
      <figcaption className="visually-hidden">
        Websites, mobile apps and AI features run through Techisar, from Discover in week 1 and Design in
        weeks 2-3 to Build in weeks 4-8, and launch from week 9: in weeks, not quarters.
      </figcaption>
      <button ref={btnRef} type="button" className="pipeline__pause" data-loop-toggle>
        Pause
      </button>
    </figure>
  );
}

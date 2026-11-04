import Link from "next/link";

const HEADLINE = [
  ["Apps,", "websites"],
  ["and", "AI", "products."],
];

export function Hero() {
  let word = 0;

  return (
    <section className="relative isolate overflow-hidden">
      <HeroBackground />

      <div className="mx-auto grid min-h-[100svh] max-w-6xl items-center gap-16 px-6 pb-16 pt-32 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-24">
        <div>
          <h1 className="text-[clamp(2.75rem,6.2vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.025em] text-[#0b1a44] dark:text-white">
            {HEADLINE.map((line, l) => (
              <span key={l} className="block">
                {line.map((w) => {
                  const i = word++;
                  const highlight = w === "AI";
                  return (
                    <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                      <span
                        className={`hero-word inline-block ${highlight ? "hero-ai relative" : ""}`}
                        style={{ animationDelay: `${150 + i * 85}ms` }}
                      >
                        {w}
                      </span>
                      {" "}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <p
            className="hero-rise mt-7 max-w-[30rem] text-[17px] leading-relaxed text-slate-600 dark:text-slate-400"
            style={{ animationDelay: "650ms" }}
          >
            Techisar is a tech startup. We design, build and launch digital products for businesses,
            from first sketch to live in weeks.
          </p>

          <div className="hero-rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "780ms" }}>
            <Link
              href="/work"
              className="nav-cta group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-[#0b2563] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(11,37,99,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-12px_rgba(29,78,216,0.75)] dark:bg-[#2563eb]"
            >
              <span className="relative z-10">Check our projects</span>
              <svg
                viewBox="0 0 16 16"
                className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl border border-slate-200 bg-white/80 px-6 py-3.5 text-[15px] font-semibold text-slate-800 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)] dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              Talk to us
            </Link>
          </div>

          <p
            className="hero-rise mt-10 text-[13px] text-slate-500 dark:text-slate-400"
            style={{ animationDelay: "900ms" }}
          >
            What we build:{" "}
            {["websites", "mobile apps", "AI features", "design systems"].map((item, i, all) => (
              <span key={item}>
                <Link
                  href="/services"
                  className="text-slate-700 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-[#1d4ed8] hover:decoration-[#1d4ed8] dark:text-slate-300 dark:decoration-slate-600 dark:hover:text-white"
                >
                  {item}
                </Link>
                {i < all.length - 2 ? ", " : i === all.length - 2 ? " and " : ""}
              </span>
            ))}
          </p>
        </div>

        <PipelineDiagram />
      </div>
    </section>
  );
}

function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#f8fafc,#ffffff_60%)] dark:bg-[linear-gradient(to_bottom,#020617,#030a1f)]" />
      <div className="hero-grid absolute inset-0" />
      <div className="hero-blob absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.28),transparent_65%)] blur-2xl dark:bg-[radial-gradient(circle,rgba(37,99,235,0.35),transparent_65%)]" />
      <div className="hero-blob hero-blob-2 absolute -left-48 bottom-[-12rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.18),transparent_65%)] blur-2xl dark:bg-[radial-gradient(circle,rgba(16,185,129,0.16),transparent_65%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent dark:from-[#020617]" />
    </div>
  );
}

// Diagram is laid out on a 560×380 grid; all sizes are percentages of it and
// text uses em units sized off the container width, so it scales as one piece.
const W = 560;
const H = 380;
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

const INPUTS = [
  { title: "Website", sub: "React · Next.js", y: 20, tone: "bg-[#dbe7ff] dark:bg-[#1e3a8a]" },
  { title: "Mobile app", sub: "iOS · Android", y: 153, tone: "bg-white dark:bg-slate-800" },
  { title: "AI features", sub: "Assistants · search", y: 286, tone: "bg-[#d9f5e6] dark:bg-[#065f46]" },
];
const CARD = { w: 160, h: 74 };
const BUS_X = 205;
const MID_Y = 190;
const NODE = { x: 250, size: 40 };
const LIVE = { x: 350, y: 112, w: 196, h: 156 };

const paths = INPUTS.map(
  (c) => `M${CARD.w} ${c.y + CARD.h / 2} H${BUS_X} V${MID_Y} H${LIVE.x}`,
);

function PipelineDiagram() {
  return (
    <div className="@container relative mx-auto w-full max-w-[560px]">
      <div
        className="hero-float relative"
        style={{ aspectRatio: `${W} / ${H}`, fontSize: "calc(100cqw / 35)" }}
      >
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" fill="none">
          {paths.map((d, i) => (
            <path
              key={d}
              d={d}
              pathLength={1}
              className="hero-line stroke-[#0b2563] dark:stroke-slate-400"
              strokeWidth="1.5"
              style={{ animationDelay: `${700 + i * 120}ms` }}
            />
          ))}
          <circle cx={BUS_X} cy={MID_Y} r="3.5" className="hero-pop fill-[#0b2563] dark:fill-slate-300" style={{ animationDelay: "1250ms" }} />

          {/* Packets travelling from each product card into launch. */}
          <g className="hero-packets">
            {paths.map((d, i) => (
              <circle key={d} r="3" className="fill-[#2563eb] dark:fill-sky-400">
                <animateMotion dur="2.8s" begin={`${1.8 + i * 0.9}s`} repeatCount="indefinite" path={d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.55 1" />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="2.8s" begin={`${1.8 + i * 0.9}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>
        </svg>

        {INPUTS.map((c, i) => (
          <div
            key={c.title}
            className="hero-card absolute"
            style={{
              left: 0,
              top: pct(c.y, H),
              width: pct(CARD.w, W),
              height: pct(CARD.h, H),
              animationDelay: `${300 + i * 130}ms`,
            }}
          >
            <div
              className={`group flex h-full flex-col justify-center rounded-[0.5em] border-[1.5px] border-[#0b2563] px-[0.85em] shadow-[0.35em_0.35em_0_#0b2563] transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-x-[0.15em] hover:-translate-y-[0.15em] hover:shadow-[0.55em_0.55em_0_#0b2563] dark:border-slate-500 dark:shadow-[0.35em_0.35em_0_#020617] ${c.tone}`}
            >
              <p className="text-[1.05em] font-semibold leading-tight text-[#0b1a44] dark:text-white">{c.title}</p>
              <p className="mt-[0.3em] text-[0.68em] text-slate-600 dark:text-slate-300">{c.sub}</p>
            </div>
          </div>
        ))}

        <div
          className="hero-pop absolute"
          style={{
            left: pct(NODE.x, W),
            top: pct(MID_Y - NODE.size / 2, H),
            width: pct(NODE.size, W),
            height: pct(NODE.size, H),
            animationDelay: "1150ms",
          }}
        >
          <span className="hero-ring absolute inset-0 rounded-[0.45em] border border-[#2563eb]" />
          <span className="relative flex h-full w-full items-center justify-center rounded-[0.45em] bg-[#0b2563] text-[1.15em] font-bold text-[#9cc0ff] shadow-[0_0.4em_1em_-0.3em_rgba(11,37,99,0.7)] dark:bg-[#2563eb] dark:text-white">
            T
          </span>
        </div>

        <div
          className="hero-card absolute"
          style={{
            left: pct(LIVE.x, W),
            top: pct(LIVE.y, H),
            width: pct(LIVE.w, W),
            height: pct(LIVE.h, H),
            animationDelay: "1350ms",
          }}
        >
          <div className="hero-live relative flex h-full flex-col justify-center overflow-hidden rounded-[0.5em] border-[1.5px] border-[#0b2563] bg-[#0b2563] px-[1em] text-white shadow-[0.4em_0.4em_0_#06133a] dark:border-[#3b82f6] dark:bg-[#1e40af]">
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(147,197,253,0.35),transparent_60%)]" />
            <p className="relative flex items-center gap-[0.4em] text-[0.72em] text-blue-200">
              <span className="relative flex h-[0.5em] w-[0.5em]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-full w-full rounded-full bg-emerald-400" />
              </span>
              Launch
            </p>
            <p className="font-display relative mt-[0.15em] text-[2.6em] font-bold leading-none tracking-tight">Live.</p>
            <p className="relative mt-[0.7em] text-[0.68em] text-blue-200">in weeks, not quarters</p>
          </div>
        </div>

        <div
          className="hero-pop absolute flex items-center gap-[0.4em] rounded-full border border-emerald-200 bg-white px-[0.7em] py-[0.3em] text-[0.65em] font-semibold text-emerald-700 shadow-[0_0.6em_1.4em_-0.6em_rgba(15,23,42,0.35)] dark:border-emerald-800 dark:bg-slate-900 dark:text-emerald-400"
          style={{ left: pct(LIVE.x + 92, W), top: pct(LIVE.y - 18, H), animationDelay: "1900ms" }}
        >
          <svg viewBox="0 0 16 16" className="h-[1.1em] w-[1.1em]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.5 8.5l3 3 6-7" />
          </svg>
          Deployed
        </div>
      </div>
    </div>
  );
}

import type { CSSProperties } from "react";
import { Reveal } from "./reveal";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const LEAD = "One team takes your idea from sketch to a launched product, then stays to help it grow.";

const AUDIENCES = [
  { title: "Startups", body: "launching a first product and needing it built properly." },
  { title: "Growing teams", body: "whose MVP has hit its limits and needs a rebuild." },
  { title: "Established businesses", body: "adding an app, a platform or AI to what they already do." },
];

export function WhoWeWorkWith() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="rv-up mb-5 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#1d4ed8] dark:text-sky-400">
            <span className="h-px w-8 bg-current" />
            Partners
          </p>
          <h2 className="text-[clamp(2.25rem,4.2vw,3.1rem)] font-bold leading-[1.04] tracking-[-0.025em] text-[#0b1a44] dark:text-white">
            {["Who", "we", "work", "with"].map((w, i) => (
              <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <span className="rv-word inline-block" style={d(80 + i * 80)}>
                  {w}
                </span>
                {" "}
              </span>
            ))}
          </h2>
          {/* Lead lights up word by word, like it is being read aloud. */}
          <p className="mt-6 max-w-[29rem] text-[clamp(1.2rem,1.9vw,1.5rem)] font-medium leading-snug tracking-[-0.01em] text-[#0b1a44] dark:text-slate-100">
            {LEAD.split(" ").map((w, i) => (
              <span key={i} className="rv-fadeword" style={d(400 + i * 45)}>
                {w}{" "}
              </span>
            ))}
          </p>
        </Reveal>

        <ol className="lg:pt-2">
          {AUDIENCES.map((a, i) => (
            <li key={a.title}>
              <Reveal style={{ "--base": `${i * 140}ms` } as CSSProperties}>
                <div className="audience group relative grid grid-cols-[auto_1fr_auto] items-start gap-x-5 py-7">
                  <span className="absolute inset-x-0 top-0">
                    <span className="rv-line block h-px bg-[#0b2563]/12 dark:bg-white/10" />
                  </span>
                  <span className="absolute left-0 top-0 h-px w-0 bg-[#1d4ed8] transition-[width] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-full dark:bg-sky-400" />

                  <span className="rv-up mt-2 font-mono text-[12px] text-slate-400 transition-colors duration-300 group-hover:text-[#1d4ed8] dark:group-hover:text-sky-400">
                    0{i + 1}
                  </span>
                  <div className="transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5">
                    <h3
                      className="rv-up text-[clamp(1.5rem,2.4vw,1.9rem)] font-bold leading-tight tracking-[-0.03em] text-[#14307a] dark:text-white"
                      style={d(80)}
                    >
                      {a.title}
                    </h3>
                    <p className="rv-up mt-1.5 max-w-[22rem] text-[15px] leading-relaxed text-slate-600 dark:text-slate-400" style={d(160)}>
                      {a.body}
                    </p>
                  </div>
                  <span className="mt-1.5 flex h-9 w-9 scale-75 items-center justify-center rounded-full bg-[#0b2563] text-white opacity-0 transition-all duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:scale-100 group-hover:opacity-100 dark:bg-[#2563eb]">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 -rotate-45" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

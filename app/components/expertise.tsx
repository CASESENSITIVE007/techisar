import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "./reveal";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const ITEMS: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "Product design",
    body: "Research, flows and interfaces that make sense the first time someone opens them.",
    icon: (
      <>
        <path pathLength={1} d="M4 20l4-1 11-11-3-3L5 16z" />
        <path pathLength={1} d="M14 7l3 3" />
      </>
    ),
  },
  {
    title: "Web engineering",
    body: "React and Next.js products that load fast, stay accessible and are easy to keep building on.",
    icon: (
      <>
        <path pathLength={1} d="M8 8l-4 4 4 4" />
        <path pathLength={1} d="M16 8l4 4-4 4" />
        <path pathLength={1} d="M13.5 5l-3 14" />
      </>
    ),
  },
  {
    title: "Mobile apps",
    body: "iOS and Android from one React Native codebase, with the polish of a native product.",
    icon: (
      <>
        <path pathLength={1} d="M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
        <path pathLength={1} d="M11 18h2" />
      </>
    ),
  },
  {
    title: "AI integration",
    body: "Assistants, search and automation grounded in your own content, with guardrails and review.",
    icon: (
      <>
        <path pathLength={1} d="M11 3l1.8 5.2L18 10l-5.2 1.8L11 17l-1.8-5.2L4 10l5.2-1.8z" />
        <path pathLength={1} d="M18.5 15l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8z" />
      </>
    ),
  },
  {
    title: "Design systems",
    body: "Tokens and components that keep every screen consistent, in light and dark.",
    icon: (
      <>
        <path pathLength={1} d="M12 3l9 5-9 5-9-5z" />
        <path pathLength={1} d="M3 12.5l9 5 9-5" />
        <path pathLength={1} d="M3 17l9 5 9-5" />
      </>
    ),
  },
  {
    title: "Launch and growth",
    body: "Release, measure and iterate once real users arrive, or hand over cleanly.",
    icon: (
      <>
        <path pathLength={1} d="M3 17l6-6 4 4 8-8" />
        <path pathLength={1} d="M15 7h6v6" />
      </>
    ),
  },
];

export function Expertise() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f1f5fe] py-24 lg:py-32 dark:bg-[#050d24]">
      <div aria-hidden className="expertise-bg pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="hero-blob pointer-events-none absolute -left-40 top-1/3 -z-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.14),transparent_65%)] blur-2xl"
      />

      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[0.8fr_1.6fr] lg:gap-10">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="rv-up mb-5 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#1d4ed8] dark:text-sky-400">
            <span className="h-px w-8 bg-current" />
            What we do
          </p>
          <h2 className="text-[clamp(2.25rem,4.2vw,3.1rem)] font-bold leading-[1.04] tracking-[-0.025em] text-[#0b1a44] dark:text-white">
            {["Core", "expertise"].map((w, i) => (
              <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <span className="rv-word inline-block" style={d(80 + i * 90)}>
                  {w}
                </span>
                {" "}
              </span>
            ))}
          </h2>
          <p
            className="rv-up mt-5 max-w-[17rem] text-[15px] leading-relaxed text-slate-600 dark:text-slate-400"
            style={d(260)}
          >
            Six disciplines in one team, so nothing gets lost between design and code.
          </p>
          <Link
            href="/services"
            className="rv-up group mt-8 inline-flex items-center gap-2 text-[14px] font-semibold text-[#0b2563] dark:text-white"
            style={d(380)}
          >
            <span className="relative">
              Explore services
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-100 bg-current transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:origin-left group-hover:animate-[underline-redraw_0.7s_cubic-bezier(.22,1,.36,1)]" />
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#0b2563]/20 transition-all duration-300 group-hover:translate-x-1 group-hover:border-transparent group-hover:bg-[#0b2563] group-hover:text-white dark:border-white/20 dark:group-hover:bg-[#2563eb]">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          </Link>
        </Reveal>

        <ul className="-mx-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
          {ITEMS.map((item, i) => (
            <li key={item.title}>
              <Reveal className="h-full" style={{ "--base": `${(i % 2) * 110 + Math.floor(i / 2) * 70}ms` } as CSSProperties}>
                <div className="expertise-item group relative h-full rounded-2xl p-6 transition-colors duration-500">
                  <span className="absolute inset-x-6 top-0 transition-opacity duration-500 group-hover:opacity-0">
                    <span className="rv-line block h-px bg-[#0b2563]/15 dark:bg-white/10" />
                  </span>

                  <div className="relative flex items-center justify-between">
                    <span className="rv-pop flex h-11 w-11 items-center justify-center rounded-xl border border-[#0b2563]/10 bg-white text-[#0b2563] shadow-[0_4px_14px_-6px_rgba(11,37,99,0.25)] transition-all duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:-rotate-6 group-hover:scale-110 group-hover:border-transparent group-hover:bg-[#0b2563] group-hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-sky-300 dark:group-hover:bg-[#2563eb] dark:group-hover:text-white">
                      <svg
                        viewBox="0 0 24 24"
                        className="rv-draw h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {item.icon}
                      </svg>
                    </span>
                    <span className="rv-up font-mono text-[12px] text-slate-400 transition-colors duration-300 group-hover:text-[#1d4ed8] dark:text-slate-500 dark:group-hover:text-sky-400">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="rv-up relative mt-6 flex items-center gap-2 text-[22px] font-bold tracking-[-0.025em] text-[#0b1a44] dark:text-white" style={d(120)}>
                    {item.title}
                    <svg
                      viewBox="0 0 16 16"
                      className="h-4 w-4 -translate-x-2 -rotate-45 text-[#1d4ed8] opacity-0 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0 group-hover:opacity-100 dark:text-sky-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </h3>
                  <p className="rv-up relative mt-2.5 max-w-[19rem] text-[14px] leading-relaxed text-slate-600 dark:text-slate-400" style={d(200)}>
                    {item.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

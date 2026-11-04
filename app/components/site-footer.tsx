import Link from "next/link";
import type { CSSProperties } from "react";
import { BackToTop, MagneticLink, Reveal } from "./reveal";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const FOOTER_LINKS = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "FAQ", href: "/faq" },
];

// Chips riding the two orbit rings; each ring spins at its own speed.
const ORBIT = [
  { rings: "inset-[16%]", duration: "26s", chips: ["AI", "iOS"] },
  { rings: "inset-0", duration: "40s", chips: ["Web", "Android", "Design"] },
];

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#0a1f5c] text-white dark:bg-[#061440]">
      <div aria-hidden className="footer-aurora pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden className="process-bg pointer-events-none absolute inset-0 -z-10 opacity-70" />

      <Reveal className="mx-auto grid max-w-6xl items-center gap-16 px-6 pb-20 pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:pb-24 lg:pt-32">
        <div>
          <h2 className="text-[clamp(2.6rem,5.4vw,4.2rem)] font-bold leading-[1.02] tracking-[-0.03em]">
            {[["Have", "a", "product"], ["in", "mind?"]].map((line, l) => (
              <span key={l} className="block">
                {line.map((w, i) => (
                  <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <span className="rv-word inline-block" style={d(60 + (l * 3 + i) * 80)}>
                      {w}
                    </span>
                    {" "}
                  </span>
                ))}
              </span>
            ))}
          </h2>
          <p className="rv-up mt-6 max-w-[27rem] text-[16px] leading-relaxed text-blue-100/80" style={d(450)}>
            Tell us what you want to build. You will hear back within one working day, with questions
            or a plan.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticLink
              href="/contact"
              wrapperClassName="rv-up"
              style={d(560)}
              className="nav-cta group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-[#dbe7ff] px-6 py-3.5 text-[15px] font-semibold text-[#0b2563] shadow-[0_14px_36px_-12px_rgba(147,197,253,0.6)] transition-[transform,background-color,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:bg-white hover:shadow-[0_18px_44px_-12px_rgba(147,197,253,0.85)]"
            >
              <span className="relative z-10">Contact us</span>
              <svg viewBox="0 0 16 16" className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </MagneticLink>
            <Link
              href="/work"
              className="rv-up inline-flex items-center rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-[15px] font-semibold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.08]"
              style={d(640)}
            >
              Check our projects
            </Link>
          </div>
        </div>

        {/* Orbit: the studio at the centre, the things we build circling it. */}
        <div aria-hidden className="rv-pop relative mx-auto hidden aspect-square w-full max-w-[380px] lg:block" style={d(400)}>
          <span className="absolute inset-0 rounded-full border border-white/10" />
          <span className="absolute inset-[16%] rounded-full border border-dashed border-white/15" />
          <span className="absolute inset-[32%] rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(96,165,250,0.22),transparent_70%)]" />

          {ORBIT.map((ring) => (
            <div
              key={ring.rings}
              className={`orbit absolute ${ring.rings}`}
              style={{ animationDuration: ring.duration }}
            >
              {ring.chips.map((chip, i) => {
                const angle = (360 / ring.chips.length) * i + (ring.rings === "inset-0" ? 20 : 70);
                return (
                  <span
                    key={chip}
                    className="absolute left-1/2 top-1/2 h-0 w-0"
                    style={{ transform: `rotate(${angle}deg) translateY(-${ring.rings === "inset-0" ? 190 : 129}px)` }}
                  >
                    <span className="absolute" style={{ transform: `translate(-50%, -50%) rotate(${-angle}deg)` }}>
                      <span
                        className="orbit-rev block whitespace-nowrap rounded-full border border-white/15 bg-[#10307a]/90 px-3 py-1 text-[12px] font-medium text-blue-50 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)] backdrop-blur"
                        style={{ animationDuration: ring.duration }}
                      >
                        {chip}
                      </span>
                    </span>
                  </span>
                );
              })}
            </div>
          ))}

          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[22px] bg-[#dbe7ff] text-[38px] font-bold text-[#0b2563] shadow-[0_0_60px_rgba(147,197,253,0.55),inset_0_1px_0_rgba(255,255,255,0.8)]">
            <span className="hero-ring absolute inset-0 rounded-[22px] border border-[#bfdbfe]" />
            T
          </span>
        </div>
      </Reveal>

      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="relative flex flex-col gap-6 border-t border-white/10 py-8 md:flex-row md:items-center md:justify-between">
          <span className="rv-line absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#93c5fd]/60 to-transparent" />
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {FOOTER_LINKS.map((link, i) => (
                <li key={link.href} className="rv-up" style={d(i * 50)}>
                  <Link
                    href={link.href}
                    className="group relative text-[14px] text-blue-100/70 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-[#93c5fd] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:origin-left group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="rv-up flex items-center gap-6 text-[13px] text-blue-100/60" style={d(300)}>
            <span>© 2026 Techisar. All rights reserved.</span>
            <BackToTop className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-[12px] text-blue-50 transition-all duration-300 hover:border-white/35 hover:bg-white/10" />
          </div>
        </Reveal>
      </div>

      {/* Oversized wordmark that rises out of the bottom edge. */}
      <Reveal className="pointer-events-none select-none overflow-hidden">
        <p
          aria-hidden
          className="footer-wordmark font-display rv-word -mb-[0.24em] text-center text-[clamp(5rem,21vw,19rem)] font-bold leading-[0.9] tracking-[-0.06em]"
          style={d(150)}
        >
          Techisar
        </p>
      </Reveal>
    </footer>
  );
}

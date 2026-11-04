"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const STEPS = [
  {
    when: "Week 1",
    title: "Discover",
    body: "We sit with your team, map the users and the risks, and agree what the first release must prove.",
    chips: ["Workshop", "User map", "Release scope"],
  },
  {
    when: "Weeks 2–3",
    title: "Design",
    body: "Flows, then screens, then a clickable prototype you can put in front of real people before a line of code.",
    chips: ["Flows", "Interface", "Prototype"],
  },
  {
    when: "Weeks 4–8",
    title: "Build",
    body: "Two-week sprints with a working build at the end of each. You see progress in a live environment, not a slide.",
    chips: ["Sprints", "Staging", "QA"],
  },
  {
    when: "Week 9 on",
    title: "Launch & grow",
    body: "We ship, watch the numbers and keep improving, or hand everything over cleanly if you prefer to take it from here.",
    chips: ["Release", "Analytics", "Handover"],
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [reached, setReached] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.dataset.inview = "true";
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  // Scroll-linked: the line fills up to a "reading line" 60% down the viewport,
  // and every step whose dot the fill has passed becomes active.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const track = trackRef.current;
      if (!track) return;
      const box = track.getBoundingClientRect();
      const line = window.innerHeight * 0.6;
      const px = Math.min(Math.max(line - box.top, 0), box.height);
      fillRef.current?.style.setProperty("transform", `scaleY(${box.height ? px / box.height : 0})`);
      const count = stepRefs.current.filter((el) => el && el.offsetTop + 14 <= px).length;
      setReached((prev) => (prev === count ? prev : count));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const current = Math.max(reached, 1);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-[#0b2563] py-24 text-white lg:py-36 dark:bg-[#071a4a]">
      <div aria-hidden className="process-bg pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden className="hero-blob pointer-events-none absolute -right-40 -top-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.28),transparent_65%)] blur-2xl" />
      <div aria-hidden className="hero-blob hero-blob-2 pointer-events-none absolute -bottom-56 -left-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.16),transparent_65%)] blur-2xl" />

      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[0.8fr_1.3fr] lg:gap-10">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="rv-up mb-5 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#93c5fd]">
            <span className="h-px w-8 bg-current" />
            How we work
          </p>
          <h2 className="text-[clamp(2.4rem,4.4vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.025em]">
            {[["From", "idea"], ["to", "launch"], ["in", "weeks."]].map((line, l) => (
              <span key={l} className="block">
                {line.map((w, i) => (
                  <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <span className="rv-word inline-block" style={d(80 + (l * 2 + i) * 80)}>
                      {w}
                    </span>
                    {" "}
                  </span>
                ))}
              </span>
            ))}
          </h2>
          <p className="rv-up mt-6 max-w-[18rem] text-[15px] leading-relaxed text-blue-100/75" style={d(550)}>
            A simple rhythm, the same on every project, so you always know what happens next.
          </p>

          <div className="rv-up mt-10 hidden items-center gap-4 lg:flex" style={d(650)}>
            <span className="font-mono text-[13px] tabular-nums text-blue-100/60">
              Step{" "}
              <span key={current} className="process-tick inline-block text-white">
                0{current}
              </span>{" "}
              / 0{STEPS.length}
            </span>
            <span className="flex gap-1.5">
              {STEPS.map((s, i) => (
                <span
                  key={s.title}
                  className={`h-1 rounded-full transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                    i < current ? "w-6 bg-[#93c5fd]" : "w-3 bg-white/20"
                  }`}
                />
              ))}
            </span>
          </div>

          <Link
            href="/process"
            className="rv-up nav-cta group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-white px-5 py-3 text-[14px] font-semibold text-[#0b2563] shadow-[0_12px_30px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-0.5"
            style={d(750)}
          >
            <span className="relative z-10">See our full process</span>
            <svg viewBox="0 0 16 16" className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>

        <ol ref={trackRef} className="relative pl-12 sm:pl-16">
          <span aria-hidden className="absolute bottom-3 left-[11px] top-3 w-[2px] rounded-full bg-white/12" />
          <span aria-hidden className="absolute bottom-3 left-[11px] top-3 w-[2px] overflow-hidden rounded-full">
            <span
              ref={fillRef}
              className="block h-full w-full origin-top scale-y-0 bg-gradient-to-b from-[#bfdbfe] via-[#7ea8ff] to-[#60a5fa] shadow-[0_0_12px_rgba(147,197,253,0.8)]"
            />
          </span>

          {STEPS.map((step, i) => {
            const active = i < reached;
            return (
              <li
                key={step.title}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                data-active={active}
                className="process-step group relative pb-16 last:pb-0"
              >
                <span
                  aria-hidden
                  className={`absolute -left-12 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] sm:-left-16 ${
                    active
                      ? "scale-100 border-[#bfdbfe] bg-[#7ea8ff] shadow-[0_0_0_6px_rgba(126,168,255,0.18),0_0_24px_rgba(126,168,255,0.7)]"
                      : "scale-75 border-white/30 bg-[#0b2563]"
                  }`}
                >
                  {active && <span className="hero-ring absolute inset-0 rounded-full border border-[#bfdbfe]" />}
                </span>

                <div
                  className={`transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
                    active ? "translate-x-0 opacity-100" : "translate-x-2 opacity-35"
                  }`}
                >
                  <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-blue-100/80">
                    {step.when}
                  </p>
                  <h3 className="mt-3 text-[clamp(2.2rem,4.4vw,3.3rem)] font-bold leading-none tracking-[-0.03em]">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-[28rem] text-[15px] leading-relaxed text-blue-100/75">{step.body}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {step.chips.map((chip, j) => (
                      <span
                        key={chip}
                        className={`rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[12px] text-blue-50/90 backdrop-blur transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:border-white/30 hover:bg-white/10 ${
                          active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                        }`}
                        style={{ transitionDelay: active ? `${200 + j * 80}ms` : "0ms" }}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

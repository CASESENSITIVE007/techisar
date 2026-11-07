"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Reveal } from "./reveal";

const v = (n: number) => ({ "--i": n }) as CSSProperties;

// Weeks each stage takes on the ruler; the last runs on, so it is drawn at two.
const STEPS = [
  {
    when: "Week 1",
    mark: "1",
    weeks: 1,
    title: "Discover",
    body: "We sit with your team, map the users and the risks, and agree what the first release must prove.",
    chips: "Workshop, user map, release scope",
  },
  {
    when: "Weeks 2-3",
    mark: "2-3",
    weeks: 2,
    title: "Design",
    body: "Flows, then screens, then a clickable prototype you can put in front of real people before a line of code.",
    chips: "Flows, interface, prototype",
  },
  {
    when: "Weeks 4-8",
    mark: "4-8",
    weeks: 5,
    title: "Build",
    body: "Two-week sprints with a working build at the end of each. You see progress in a live environment, not a slide.",
    chips: "Sprints, staging, QA",
  },
  {
    when: "Week 9 on",
    mark: "9 on",
    weeks: 2,
    title: "Launch & grow",
    body: "We ship, watch the numbers and keep improving, or hand everything over cleanly if you prefer to take it from here.",
    chips: "Release, analytics, handover",
  },
];

const TOTAL = STEPS.reduce((sum, s) => sum + s.weeks, 0);

export function Process() {
  const fillRef = useRef<HTMLSpanElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [reached, setReached] = useState(0);

  // Scroll-linked: a reading line 60% down the viewport walks the stage rows, and
  // the week ruler fills to the same point, each row owning its weeks on the ruler.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.6;
      let weeks = 0;
      let count = 0;
      stepRefs.current.forEach((el, n) => {
        if (!el) return;
        const box = el.getBoundingClientRect();
        const t = Math.min(Math.max((line - box.top) / box.height, 0), 1);
        weeks += STEPS[n].weeks * t;
        if (t > 0) count = n + 1;
      });
      fillRef.current?.style.setProperty("transform", `scaleX(${weeks / TOTAL})`);
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

  return (
    <section className="section band">
      <div className="container">
        <Reveal className="head head--split">
          <h2 data-reveal>From idea to launch in weeks.</h2>
          <div className="head__side" data-reveal style={v(1)}>
            <p className="lead">
              A simple rhythm, the same on every project, so you always know what happens next.
            </p>
            <Link href="/process" className="btn">
              See our full process
            </Link>
          </div>
        </Reveal>

        <div className="process">
          <div className="ruler" aria-hidden="true">
            <span className="ruler__caption">Weeks</span>
            <div className="ruler__scale" style={{ gridTemplateColumns: STEPS.map((s) => `${s.weeks}fr`).join(" ") }}>
              {STEPS.map((s) => (
                <span key={s.when} className="ruler__seg">
                  <span className="ruler__long">{s.when}</span>
                  <span className="ruler__short">{s.mark}</span>
                </span>
              ))}
            </div>
            <span className="ruler__track">
              <span ref={fillRef} className="ruler__fill" />
            </span>
          </div>

          <ol className="stages">
            {STEPS.map((step, n) => (
              <li
                key={step.title}
                ref={(el) => {
                  stepRefs.current[n] = el;
                }}
                className="stage"
                data-active={n < reached}
              >
                <span className="stage__no">{n + 1}</span>
                <div>
                  <h3 className="stage__title">{step.title}</h3>
                  <p className="stage__when">{step.when}</p>
                </div>
                <div>
                  <p>{step.body}</p>
                  <p className="note stage__gets">{step.chips}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

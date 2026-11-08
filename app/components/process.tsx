"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Doodle } from "./doodle";
import { Icon } from "./icons";
import { Reveal } from "./reveal";

const v = (n: number) => ({ "--i": n }) as CSSProperties;

const STEPS = [
  {
    when: "Week 1",
    icon: "search",
    title: "Discover",
    body: "We sit with your team, map the users and the risks, and agree what the first release must prove.",
    chips: ["Workshop", "User map", "Release scope"],
  },
  {
    when: "Weeks 2-3",
    icon: "design",
    title: "Design",
    body: "Flows, then screens, then a clickable prototype you can put in front of real people before a line of code.",
    chips: ["Flows", "Interface", "Prototype"],
  },
  {
    when: "Weeks 4-8",
    icon: "code",
    title: "Build",
    body: "Two-week sprints with a working build at the end of each. You see progress in a live environment, not a slide.",
    chips: ["Sprints", "Staging", "QA"],
  },
  {
    when: "Week 9 on",
    icon: "rocket",
    title: "Launch & grow",
    body: "We ship, watch the numbers and keep improving, or hand everything over cleanly if you prefer to take it from here.",
    chips: ["Release", "Analytics", "Handover"],
  },
];

export function Process({ standalone = false }: { standalone?: boolean }) {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [reached, setReached] = useState(0);

  // A reading line 60% down the screen fills the rail and lights each step it passes.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const list = listRef.current;
      if (!list) return;
      const line = window.innerHeight * 0.6;
      const box = list.getBoundingClientRect();
      const t = Math.min(Math.max((line - box.top) / box.height, 0), 1);
      fillRef.current?.style.setProperty("transform", `scaleY(${t})`);
      const count = stepRefs.current.filter((el) => el && el.getBoundingClientRect().top < line).length;
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
    <section className="section">
      <div className="container">
        <div className="band">
          <span className="glow glow--red" style={{ top: "-20%", left: "-10%" }} aria-hidden="true" />
          <span className="glow glow--mist" style={{ bottom: "-20%", right: "-10%" }} aria-hidden="true" />
          <Doodle name="zigzag" color="ash" className="band__doodle band__doodle--a" />
          <Doodle name="star" color="silver" className="band__doodle band__doodle--b" />

          <Reveal className="head">
            <p className="label" data-reveal>How we work</p>
            <h2 data-reveal>
              From idea to launch <span className="grad">in weeks.</span>
            </h2>
            <p className="lead" data-reveal style={v(1)}>
              A simple rhythm, the same on every project, so you always know what happens next.
            </p>
          </Reveal>

          <ol ref={listRef} className="timeline">
            <span className="timeline__rail" aria-hidden="true">
              <span ref={fillRef} className="timeline__fill" />
            </span>
            {STEPS.map((step, n) => (
              <li
                key={step.title}
                ref={(el) => {
                  stepRefs.current[n] = el;
                }}
                className="stage"
                data-active={n < reached}
              >
                <span className="stage__node">
                  <Icon name={step.icon} />
                </span>
                <Reveal className="stage__body">
                  <div className="stage__card spot" data-reveal>
                    <div className="stage__head">
                      <h3>{step.title}</h3>
                      <span className="tag">{step.when}</span>
                    </div>
                    <p>{step.body}</p>
                    <ul className="stage__chips">
                      {step.chips.map((chip) => (
                        <li key={chip}>{chip}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          {!standalone && (
            <Reveal className="section-foot">
              <Link href="/process" className="btn" data-reveal>
                See our full process
              </Link>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, type CSSProperties } from "react";
import { Doodle } from "./doodle";
import { Icon } from "./icons";
import { useReveal } from "./reveal";

const layer = (depth: number, order: number) => ({ "--d": depth, "--i": order }) as CSSProperties;

const CHART = "M0 92 C30 86 44 60 76 64 S120 84 150 54 S204 40 232 26 S274 10 300 6";

// The hero picture: a product coming together. Layers drift against the pointer at
// different depths, and each one bobs gently on its own timing.
export function HeroArt() {
  const ref = useReveal<HTMLDivElement>();

  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        el.style.setProperty("--px", ((e.clientX / innerWidth - 0.5) * 2).toFixed(3));
        el.style.setProperty("--py", ((e.clientY / innerHeight - 0.5) * 2).toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [ref]);

  return (
    <div ref={ref} className="art" aria-hidden="true">
      <span className="art__orb" />
      <svg viewBox="0 0 600 600" className="art__rings">
        <ellipse cx="300" cy="300" rx="288" ry="288" />
        <ellipse cx="300" cy="300" rx="214" ry="214" />
        <circle cx="300" cy="12" r="7" className="art__planet art__planet--a" />
        <circle cx="514" cy="300" r="5" className="art__planet art__planet--b" />
        <circle cx="86" cy="300" r="6" className="art__planet art__planet--c" />
      </svg>

      <div className="art__layer art__browser" style={layer(10, 1)} data-reveal>
        <div className="float">
          <div className="window">
            <div className="window__bar">
              <i />
              <i />
              <i />
              <span>yourproduct.app</span>
            </div>
            <div className="dash">
              <ul className="dash__nav">
                <li data-on="true" />
                <li />
                <li />
                <li />
              </ul>
              <div className="dash__main">
                <div className="dash__stats">
                  <div>
                    <small>Users</small>
                    <b>24.8k</b>
                  </div>
                  <div>
                    <small>Growth</small>
                    <b className="is-up">+38%</b>
                  </div>
                </div>
                <svg viewBox="0 0 300 110" className="dash__chart" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="art-area" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#7c4dff" stopOpacity="0.55" />
                      <stop offset="1" stopColor="#7c4dff" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="art-line" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="#9b7fff" />
                      <stop offset="1" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                  <path d={`${CHART} V110 H0 Z`} fill="url(#art-area)" />
                  <path d={CHART} pathLength={1} className="dash__line" fill="none" stroke="url(#art-line)" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="art__layer art__chat" style={layer(26, 2)} data-reveal>
        <div className="float float--b">
          <div className="bubble">
            <span className="tile tile--sm">
              <Icon name="ai" />
            </span>
            <div>
              <b>AI assistant</b>
              <span className="typing">
                <i />
                <i />
                <i />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="art__layer art__phone" style={layer(34, 3)} data-reveal>
        <div className="float float--c">
          <div className="handset">
            <span className="handset__notch" />
            <div className="handset__card">
              <small>Balance</small>
              <b>$2,480</b>
            </div>
            <ul className="handset__rows">
              <li />
              <li />
              <li />
            </ul>
            <span className="handset__btn" />
          </div>
        </div>
      </div>

      <div className="art__layer art__code" style={layer(20, 4)} data-reveal>
        <div className="float float--d">
          <pre className="code">
            <code>
              <span className="c-k">const</span> launch = <span className="c-k">await</span> <span className="c-f">ship</span>({"{"}
              {"\n"}  idea: <span className="c-s">&quot;yours&quot;</span>,{"\n"}  weeks: <span className="c-n">8</span>,{"\n"}
              {"}"});
            </code>
          </pre>
        </div>
      </div>

      <div className="art__layer art__live" style={layer(40, 5)} data-reveal>
        <div className="float float--b">
          <span className="live">
            <i />
            Live
          </span>
        </div>
      </div>

      <Doodle name="star" color="sun" className="art__star" />
      <Doodle name="spark" color="pink" className="art__spark" />
    </div>
  );
}

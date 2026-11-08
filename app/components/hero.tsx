import Link from "next/link";
import type { CSSProperties } from "react";
import { HeroOrb } from "./hero-orb";
import { Icon } from "./icons";
import { Reveal } from "./reveal";

const v = (n: number) => ({ "--i": n }) as CSSProperties;

const BUILDS = ["Websites", "Mobile apps", "AI features", "Design systems"];

const STACK = ["React", "Next.js", "TypeScript", "React Native", "Expo", "Figma", "iOS", "Android"];

export function Hero() {
  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <Reveal className="hero__copy">
            <p className="ticks" data-reveal>
              <span>Product studio</span>
              <span>Apps · Web · AI</span>
              <span>Est. 2026</span>
            </p>
            <h1 data-reveal style={v(1)}>
              Apps, websites and <span className="grad">AI products.</span>
            </h1>
            <p className="lead" data-reveal style={v(2)}>
              Techisar is a tech startup. We design, build and launch digital products for businesses,
              from first sketch to live in weeks.
            </p>
            <div className="actions" data-reveal style={v(3)}>
              <Link href="/work" className="btn btn--primary">
                Check our projects
              </Link>
              <Link href="/contact" className="btn">
                Talk to us
              </Link>
            </div>
            <ul className="chips" data-reveal style={v(4)}>
              {BUILDS.map((label) => (
                <li key={label}>
                  <Link href="/services" className="chip">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="hero__art">
            <HeroOrb />
          </div>
        </div>
      </section>

      <div className="strip" aria-label="Tools we build with: React, Next.js, TypeScript, React Native, Expo, Figma, iOS and Android">
        <div className="strip__track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <ul key={copy}>
              {[...STACK, ...STACK].map((name, n) => (
                <li key={`${name}-${n}`}>
                  <Icon name="ai" />
                  {name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}

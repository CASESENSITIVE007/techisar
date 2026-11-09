import Link from "next/link";
import type { CSSProperties } from "react";
import { Doodle } from "./doodle";
import { HeroArt } from "./hero-art";
import { Icon } from "./icons";
import { Reveal } from "./reveal";

const v = (n: number) => ({ "--i": n }) as CSSProperties;

const BUILDS = [
  { label: "Websites", icon: "code" },
  { label: "Mobile apps", icon: "phone" },
  { label: "AI features", icon: "ai" },
  { label: "Design systems", icon: "layers" },
];

const STACK = ["React", "Next.js", "TypeScript", "React Native", "Expo", "Figma", "iOS", "Android"];

export function Hero() {
  return (
    <>
      <section className="hero">
        <Doodle name="zigzag" color="cyan" className="hero__doodle hero__doodle--a" />
        <Doodle name="ring" color="pink" className="hero__doodle hero__doodle--b" />
        <div className="container hero__grid">
          <Reveal className="hero__copy">
            <h1 data-reveal>
              Apps, websites and{" "}
              <span className="hl">
                <span className="grad">AI products.</span>
                <Doodle name="underline" color="cyan" className="hl__line" />
              </span>
            </h1>
            <p className="lead" data-reveal style={v(1)}>
              Techisar is a tech startup. We design, build and launch digital products for businesses,
              from first sketch to live in weeks.
            </p>
            <div className="actions" data-reveal style={v(2)}>
              <Link href="/work" className="btn btn--primary">
                Check our projects
              </Link>
              <Link href="/contact" className="btn">
                Talk to us
              </Link>
            </div>
            <ul className="chips" data-reveal style={v(3)}>
              {BUILDS.map((item) => (
                <li key={item.label}>
                  <Link href="/services" className="chip">
                    <Icon name={item.icon} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="hero__art">
            <HeroArt />
            <p className="hand hero__note">
              live in weeks,
              <br />
              not quarters!
              <Doodle name="arrowDown" color="sun" className="hero__arrow" />
            </p>
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

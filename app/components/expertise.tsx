import Link from "next/link";
import type { CSSProperties } from "react";
import { Icon } from "./icons";
import { Reveal } from "./reveal";

const v = (n: number) => ({ "--i": n }) as CSSProperties;

const ITEMS = [
  {
    title: "Product design",
    icon: "design",
    tone: "red",
    body: "Research, flows and interfaces that make sense the first time someone opens them.",
  },
  {
    title: "Web engineering",
    icon: "code",
    tone: "mist",
    body: "React and Next.js products that load fast, stay accessible and are easy to keep building on.",
  },
  {
    title: "Mobile apps",
    icon: "phone",
    tone: "ash",
    body: "iOS and Android from one React Native codebase, with the polish of a native product.",
  },
  {
    title: "AI integration",
    icon: "ai",
    tone: "silver",
    body: "Assistants, search and automation grounded in your own content, with guardrails and review.",
  },
  {
    title: "Design systems",
    icon: "layers",
    tone: "green",
    body: "Tokens and components that keep every screen consistent, in light and dark.",
  },
  {
    title: "Launch and growth",
    icon: "rocket",
    tone: "steel",
    body: "Release, measure and iterate once real users arrive, or hand over cleanly.",
  },
];

export function Expertise({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className="section">
      <span className="glow glow--mist" style={{ top: "20%", left: "-14%" }} aria-hidden="true" />
      <div className="container">
        <Reveal className="head">
          <p className="label" data-reveal>Capabilities</p>
          <h2 data-reveal>Core expertise</h2>
          <p className="lead" data-reveal style={v(1)}>
            Six disciplines in one team, so nothing gets lost between design and code.
          </p>
        </Reveal>

        <Reveal className="features">
          {ITEMS.map((item, n) => (
            <article
              key={item.title}
              className="feature spot"
              data-reveal
              style={{ "--i": n, "--tone": `var(--${item.tone})` } as CSSProperties}
            >
              <span className="tile">
                <Icon name={item.icon} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </Reveal>

        {!standalone && (
          <Reveal className="section-foot">
            <Link href="/services" className="btn" data-reveal>
              Explore services
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}

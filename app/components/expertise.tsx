import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal } from "./reveal";

const v = (n: number) => ({ "--i": n }) as CSSProperties;

const ITEMS = [
  {
    title: "Product design",
    body: "Research, flows and interfaces that make sense the first time someone opens them.",
  },
  {
    title: "Web engineering",
    body: "React and Next.js products that load fast, stay accessible and are easy to keep building on.",
  },
  {
    title: "Mobile apps",
    body: "iOS and Android from one React Native codebase, with the polish of a native product.",
  },
  {
    title: "AI integration",
    body: "Assistants, search and automation grounded in your own content, with guardrails and review.",
  },
  {
    title: "Design systems",
    body: "Tokens and components that keep every screen consistent, in light and dark.",
  },
  {
    title: "Launch and growth",
    body: "Release, measure and iterate once real users arrive, or hand over cleanly.",
  },
];

export function Expertise() {
  return (
    <section className="section section--tight">
      <div className="container aside-grid">
        <Reveal className="aside-grid__head">
          <h2 data-reveal>Core expertise</h2>
          <p className="lead" data-reveal style={v(1)}>
            Six disciplines in one team, so nothing gets lost between design and code.
          </p>
          <Link href="/services" className="text-link" data-reveal style={v(2)}>
            Explore services
          </Link>
        </Reveal>

        <ul className="rows">
          {ITEMS.map((item) => (
            <li key={item.title}>
              <Reveal className="row">
                <span className="rule" aria-hidden="true" />
                <h3 data-reveal>{item.title}</h3>
                <p data-reveal style={v(1)}>
                  {item.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

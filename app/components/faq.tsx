import Link from "next/link";
import type { CSSProperties } from "react";
import { FaqAccordion, type FaqItem } from "./faq-accordion";
import { Reveal } from "./reveal";

const v = (n: number) => ({ "--i": n }) as CSSProperties;

const FAQS: FaqItem[] = [
  {
    q: "What does Techisar build?",
    a: "Web platforms, mobile apps, AI-powered features and design systems, mostly for startups and growing teams that need a product shipped well.",
  },
  {
    q: "How does a project start?",
    a: "With a short call about what you want to build and why. If it is a good fit, we run a one-week Discover sprint and come back with a scope, a timeline and an estimate for the first release.",
  },
  {
    q: "How long does a first release take?",
    a: "Most first releases go live in about 8 to 10 weeks: a week of discovery, two of design, then build sprints. Smaller sites can be quicker, and larger platforms are planned in phases.",
  },
  {
    q: "Who owns the code and the design?",
    a: "You do. Code lives in your repository and design files in your workspace from day one, so there is no lock-in.",
  },
  {
    q: "Can you keep going after launch?",
    a: "Yes. Many teams keep us on for iteration and new features. If you would rather take it in-house, we hand over documentation and walk your team through the codebase.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function Faq() {
  return (
    <section className="section section--wide section--close">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="container aside-grid">
        <Reveal className="aside-grid__head">
          <h2 data-reveal>Questions, answered.</h2>
          <div className="ask" data-reveal style={v(1)}>
            <p className="ask__q">Still have questions?</p>
            <p className="note">We usually reply within a day.</p>
            <Link href="/contact" className="btn">
              Talk to us
            </Link>
          </div>
        </Reveal>

        <FaqAccordion items={FAQS} />
      </div>
    </section>
  );
}

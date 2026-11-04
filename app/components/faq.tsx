import Link from "next/link";
import type { CSSProperties } from "react";
import { FaqAccordion, type FaqItem } from "./faq-accordion";
import { Reveal } from "./reveal";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

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
    <section className="relative py-24 lg:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Reveal className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="rv-up mb-5 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#1d4ed8] dark:text-sky-400">
            <span className="h-px w-8 bg-current" />
            FAQ
          </p>
          <h2 className="text-[clamp(2.25rem,4.2vw,3.1rem)] font-bold leading-[1.04] tracking-[-0.025em] text-[#0b1a44] dark:text-white">
            {[["Questions,"], ["answered."]].map((line, l) => (
              <span key={l} className="block overflow-hidden pb-[0.08em]">
                <span className="rv-word inline-block" style={d(80 + l * 100)}>
                  {line[0]}
                </span>
              </span>
            ))}
          </h2>

          <div
            className="rv-up mt-10 hidden max-w-[19rem] rounded-2xl border border-[#dbe4f7] bg-gradient-to-br from-white to-[#f1f5fe] p-5 shadow-[0_20px_40px_-30px_rgba(11,37,99,0.4)] lg:block dark:border-white/10 dark:from-white/[0.05] dark:to-transparent"
            style={d(400)}
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#0b2563] text-[15px] font-bold text-[#9cc0ff] dark:bg-[#2563eb] dark:text-white">
                T
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-[#020617]" />
              </span>
              <div>
                <p className="text-[14px] font-semibold text-[#0b1a44] dark:text-white">Still have questions?</p>
                <p className="text-[12.5px] text-slate-500 dark:text-slate-400">We usually reply within a day.</p>
              </div>
            </div>
            <Link
              href="/contact"
              className="group mt-4 flex items-center justify-between rounded-xl bg-[#0b2563] px-4 py-2.5 text-[13.5px] font-semibold text-white transition-all duration-300 hover:bg-[#0f2f7a] dark:bg-[#2563eb]"
            >
              Talk to us
              <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>

        <FaqAccordion items={FAQS} />
      </Reveal>
    </section>
  );
}

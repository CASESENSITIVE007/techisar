import Link from "next/link";
import type { CSSProperties } from "react";
import { Doodle } from "./doodle";
import { LogoMark } from "./navbar";
import { BackToTop, Reveal } from "./reveal";

const v = (n: number) => ({ "--i": n }) as CSSProperties;

const COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "What we do",
    links: [
      { label: "Services", href: "/services" },
      { label: "Process", href: "/process" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <Reveal className="cta">
          <span className="cta__orb cta__orb--a" aria-hidden="true" />
          <span className="cta__orb cta__orb--b" aria-hidden="true" />
          <Doodle name="loop" color="silver" className="cta__doodle cta__doodle--a" />
          <Doodle name="star" color="mist" className="cta__doodle cta__doodle--b" />
          <Doodle name="squiggle" color="ash" className="cta__doodle cta__doodle--c" />
          <h2 data-reveal>Have a product in mind?</h2>
          <p className="lead" data-reveal style={v(1)}>
            Tell us what you want to build. You will hear back within one working day, with questions or
            a plan.
          </p>
          <div className="actions" data-reveal style={v(2)}>
            <Link href="/contact" className="btn btn--light">
              Contact us
            </Link>
            <Link href="/work" className="btn btn--ghost">
              Check our projects
            </Link>
          </div>
        </Reveal>

        <div className="footer__grid">
          <div className="footer__brand">
            <Link href="/" className="wordmark" aria-label="Techisar home">
              <LogoMark />
              <span>Techisar</span>
            </Link>
            <p>We design, build and launch apps, websites and AI products.</p>
          </div>
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title} className="footer__col">
              <p className="footer__title">{col.title}</p>
              <ul>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="mast" aria-hidden="true">
          Techisar
        </p>

        <div className="footer__base">
          <span>© 2026 Techisar. All rights reserved.</span>
          <BackToTop className="footer__top" />
        </div>
      </div>
    </footer>
  );
}

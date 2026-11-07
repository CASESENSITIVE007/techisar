import Link from "next/link";
import type { CSSProperties } from "react";
import { BackToTop, Reveal } from "./reveal";

const v = (n: number) => ({ "--i": n }) as CSSProperties;

const FOOTER_LINKS = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "FAQ", href: "/faq" },
];

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <Reveal className="close">
          <h2 data-reveal>Have a product in mind?</h2>
          <div className="close__side" data-reveal style={v(1)}>
            <p className="lead">
              Tell us what you want to build. You will hear back within one working day, with questions
              or a plan.
            </p>
            <div className="actions">
              <Link href="/contact" className="btn btn--primary">
                Contact us
              </Link>
              <Link href="/work" className="btn">
                Check our projects
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal className="mast">
          <span className="rule" aria-hidden="true" />
          <p className="mast__word" aria-hidden="true">
            <span>Techisar</span>
          </p>
        </Reveal>

        <div className="footer__base">
          <nav aria-label="Footer">
            <ul className="footer__links">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="footer__legal">
            <span>© 2026 Techisar. All rights reserved.</span>
            <BackToTop className="text-link footer__top" />
          </div>
        </div>
      </div>
    </footer>
  );
}

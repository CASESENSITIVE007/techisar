"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "FAQ", href: "/faq" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [marker, setMarker] = useState({ x: 0, w: 0, visible: false });
  const listRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const activeIndex = LINKS.findIndex((l) => isActive(l.href));
  const target = hovered ?? (activeIndex >= 0 ? activeIndex : null);

  // Lock page scroll and allow Escape while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // The rule under the links rests on the current page and slides to the hovered link.
  useEffect(() => {
    const measure = () => {
      const el = target === null ? null : linkRefs.current[target];
      const list = listRef.current;
      if (!el || !list) {
        setMarker((m) => ({ ...m, visible: false }));
        return;
      }
      const box = el.getBoundingClientRect();
      const listBox = list.getBoundingClientRect();
      setMarker({ x: box.left - listBox.left, w: box.width, visible: true });
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (listRef.current) observer.observe(listRef.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <>
      <header className="nav">
        <nav aria-label="Main" className="container nav__bar">
          <Link href="/" className="wordmark" aria-label="Techisar home">
            <LogoMark />
            <span>Techisar</span>
          </Link>

          <ul
            ref={listRef}
            className="nav__links"
            onMouseLeave={() => setHovered(null)}
            onBlur={() => setHovered(null)}
          >
            <span
              aria-hidden="true"
              className="nav__marker"
              style={{
                transform: `translateX(${marker.x}px) scaleX(${marker.w})`,
                opacity: marker.visible ? 1 : 0,
              }}
            />
            {LINKS.map((link, i) => (
              <li key={link.href}>
                <Link
                  ref={(el) => {
                    linkRefs.current[i] = el;
                  }}
                  href={link.href}
                  onMouseEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className="nav__link"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav__end">
            <ThemeToggle />
            <Link href="/contact" className="btn btn--nav">
              Contact us
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="icon-btn nav__burger"
              data-open={menuOpen}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      <div id="mobile-menu" className="menu" data-open={menuOpen} inert={!menuOpen}>
        <ul>
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/contact" onClick={() => setMenuOpen(false)} className="btn btn--primary menu__cta">
          Contact us
        </Link>
      </div>
    </>
  );
}

function LogoMark() {
  return (
    <svg viewBox="0 0 32 32" className="wordmark__mark" aria-hidden="true" fill="none">
      <rect width="32" height="32" rx="7" className="wordmark__frame" />
      <path d="M8 9.5h16M16 9.5V24" className="wordmark__t" />
    </svg>
  );
}

function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Cross-fade the whole page where the View Transitions API is available.
    if (document.startViewTransition && !still) document.startViewTransition(apply);
    else apply();
  };

  // Both icons are always rendered and swapped in CSS, so the server and client
  // markup match regardless of the saved sheet.
  return (
    <button type="button" onClick={toggle} aria-label="Toggle color theme" className="icon-btn theme-toggle">
      <svg viewBox="0 0 24 24" className="theme-toggle__moon" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg viewBox="0 0 24 24" className="theme-toggle__sun" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}

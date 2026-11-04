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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });
  const listRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const activeIndex = LINKS.findIndex((l) => isActive(l.href));
  const target = hovered ?? (activeIndex >= 0 ? activeIndex : null);

  // Turn the bar into a floating glass panel once the page leaves the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  // The pill rests on the current page and slides to whichever link is hovered.
  useEffect(() => {
    const measure = () => {
      const el = target === null ? null : linkRefs.current[target];
      const list = listRef.current;
      if (!el || !list) {
        setPill((p) => ({ ...p, visible: false }));
        return;
      }
      // Measure against the list itself: offsetLeft would be relative to the
      // <li>, which the entrance animation's transform turns into the offset parent.
      const box = el.getBoundingClientRect();
      const listBox = list.getBoundingClientRect();
      setPill({ left: box.left - listBox.left, width: box.width, visible: true });
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (listRef.current) observer.observe(listRef.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center">
        <nav
          aria-label="Main"
          className={`nav-enter relative flex w-full items-center justify-between transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
            scrolled
              ? "mx-4 mt-3 max-w-5xl rounded-2xl border border-slate-200/70 bg-white/75 px-4 py-2.5 shadow-[0_8px_30px_-12px_rgba(11,37,99,0.25)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]"
              : "max-w-6xl border border-transparent px-6 py-5"
          }`}
        >
          <Link href="/" className="group flex items-center gap-2.5" aria-label="Techisar home">
            <LogoMark />
            <span className="font-display text-[21px] font-bold tracking-[-0.03em] text-slate-900 dark:text-white">
              Techisar
            </span>
          </Link>

          <ul
            ref={listRef}
            className="relative hidden items-center gap-1 md:flex"
            onMouseLeave={() => setHovered(null)}
            onBlur={() => setHovered(null)}
          >
            <span
              aria-hidden
              className="absolute top-0 h-full rounded-full bg-slate-100 transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] dark:bg-white/10"
              style={{
                left: pill.left,
                width: pill.width,
                opacity: pill.visible ? 1 : 0,
              }}
            />
            {LINKS.map((link, i) => {
              const active = isActive(link.href);
              return (
                <li key={link.href} className="nav-item" style={{ animationDelay: `${120 + i * 60}ms` }}>
                  <Link
                    ref={(el) => {
                      linkRefs.current[i] = el;
                    }}
                    href={link.href}
                    onMouseEnter={() => setHovered(i)}
                    onFocus={() => setHovered(i)}
                    aria-current={active ? "page" : undefined}
                    className={`relative z-10 block rounded-full px-4 py-2 text-[14px] font-medium transition-colors duration-200 ${
                      active
                        ? "text-[#0b2563] dark:text-white"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#1d4ed8] transition-all duration-300 ${
                        active ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/contact"
              className="nav-cta group relative hidden items-center gap-1.5 overflow-hidden rounded-xl bg-[#0b2563] px-5 py-2.5 text-[14px] font-semibold text-white shadow-[0_6px_20px_-6px_rgba(11,37,99,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0f2f7a] hover:shadow-[0_10px_28px_-8px_rgba(29,78,216,0.7)] active:translate-y-0 sm:inline-flex dark:bg-[#2563eb] dark:hover:bg-[#3b74f0]"
            >
              <span className="relative z-10">Contact us</span>
              <svg
                viewBox="0 0 16 16"
                className="relative z-10 h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="relative z-50 flex h-10 w-10 items-center justify-center rounded-xl text-slate-800 transition-colors hover:bg-slate-100 md:hidden dark:text-slate-100 dark:hover:bg-white/10"
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                    menuOpen ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-0.5 rounded-full bg-current transition-all duration-300 ${
                    menuOpen ? "w-0 opacity-0" : "w-3.5"
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                    menuOpen ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 md:hidden ${menuOpen ? "visible" : "invisible delay-300"}`}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-white/80 backdrop-blur-2xl transition-opacity duration-300 dark:bg-slate-950/85 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="relative flex h-full flex-col justify-between px-6 pb-10 pt-28">
          <ul className="flex flex-col gap-1">
            {LINKS.map((link, i) => (
              <li
                key={link.href}
                className={`transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: menuOpen ? `${80 + i * 55}ms` : "0ms" }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display group flex items-baseline gap-4 border-b border-slate-200/70 py-4 text-3xl font-semibold tracking-tight text-slate-900 dark:border-white/10 dark:text-white"
                >
                  <span className="font-mono text-xs font-normal text-slate-400">0{i + 1}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className={`flex items-center justify-center rounded-2xl bg-[#0b2563] py-4 text-base font-semibold text-white transition-all duration-500 dark:bg-[#2563eb] ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: menuOpen ? "380ms" : "0ms" }}
          >
            Contact us
          </Link>
        </div>
      </div>
    </>
  );
}

function LogoMark() {
  return (
    <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-[9px] bg-[#0b2563] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_4px_12px_-4px_rgba(11,37,99,0.6)] transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:-rotate-6 group-hover:scale-105 dark:bg-[#2563eb]">
      <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      <svg viewBox="0 0 24 24" className="relative h-[18px] w-[18px]" fill="none">
        <path
          d="M12 6.5V18"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M6.5 6.5h11" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    </span>
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
    // Cross-fade the whole page where the View Transitions API is available.
    if (document.startViewTransition) document.startViewTransition(apply);
    else apply();
  };

  // Both icons are always rendered and swapped via the dark: variant, so the
  // server and client markup match regardless of the saved theme.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
    >
      <svg
        viewBox="0 0 24 24"
        className="absolute h-[18px] w-[18px] rotate-0 scale-100 transition-all duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] dark:-rotate-90 dark:scale-0 dark:opacity-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className="absolute h-[18px] w-[18px] rotate-90 scale-0 opacity-0 transition-all duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] dark:rotate-0 dark:scale-100 dark:opacity-100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}

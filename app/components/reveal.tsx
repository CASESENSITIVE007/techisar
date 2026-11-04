"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// Sets data-inview on the element the first time it scrolls into view. CSS in
// globals.css keys the .rv-* entrance animations off that attribute, so the
// animations stay declarative and nothing re-renders.
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.inview = "true";
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export function Reveal({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

// A card link that reveals on scroll and tracks the pointer for a soft spotlight.
export function WorkCard({
  href,
  children,
  className,
  style,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useReveal<HTMLAnchorElement>();
  return (
    <Link
      ref={ref}
      href={href}
      className={`work-card rv-card group ${className ?? ""}`}
      style={style}
      onPointerMove={(e) => {
        const box = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${e.clientX - box.left}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY - box.top}px`);
      }}
    >
      {children}
    </Link>
  );
}

export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1600,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          el.textContent = format(to * (1 - Math.pow(1 - t, 4)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        el.textContent = format(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, decimals, prefix, suffix, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {`${prefix}${to.toFixed(decimals)}${suffix}`}
    </span>
  );
}

// Link that drifts toward the pointer while hovered, then springs back.
export function MagneticLink({
  href,
  children,
  className,
  wrapperClassName = "",
  style,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  style?: CSSProperties;
}) {
  return (
    <span className={`magnetic inline-block ${wrapperClassName}`} style={style}>
      <Link
        href={href}
        className={className}
        onPointerMove={(e) => {
          // Measure the static wrapper, not the moving link, to avoid feedback jitter.
          const box = e.currentTarget.parentElement!.getBoundingClientRect();
          const x = (e.clientX - box.left - box.width / 2) * 0.25;
          const y = (e.clientY - box.top - box.height / 2) * 0.35;
          e.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
        }}
        onPointerLeave={(e) => {
          e.currentTarget.style.transform = "";
        }}
      >
        {children}
      </Link>
    </span>
  );
}

export function BackToTop({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={className}
    >
      Back to top
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 13V3M4 7l4-4 4 4" />
      </svg>
    </button>
  );
}

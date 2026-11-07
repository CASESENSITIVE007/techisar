"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// Sets data-inview on the element the first time it scrolls into view. CSS keys
// every entrance off that attribute, under a .js class, so nothing hides without script.
export function useReveal<T extends HTMLElement | SVGSVGElement>() {
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
      { rootMargin: "0px 0px -8% 0px" },
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

// A project card: the whole card is the link.
export function WorkCard({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useReveal<HTMLAnchorElement>();
  return (
    <Link ref={ref} href={href} className={className}>
      {children}
    </Link>
  );
}

// Feeds the pointer position to any .spot card, which lights up under the cursor.
export function PointerGlow() {
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".spot");
      if (!card) return;
      const box = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - box.left}px`);
      card.style.setProperty("--my", `${e.clientY - box.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}

export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1400,
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

  return <span ref={ref}>{`${prefix}${to.toFixed(decimals)}${suffix}`}</span>;
}

export function BackToTop({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: still ? "auto" : "smooth" });
      }}
      className={className}
    >
      Back to top
    </button>
  );
}

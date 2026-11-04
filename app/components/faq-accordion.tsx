"use client";

import { useId, useState, type CSSProperties } from "react";

export type FaqItem = { q: string; a: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li
            key={item.q}
            className={`faq-item rv-up rounded-2xl border transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
              isOpen
                ? "border-[#dbe4f7] bg-white shadow-[0_24px_48px_-30px_rgba(11,37,99,0.45)] dark:border-white/10 dark:bg-white/[0.06]"
                : "border-transparent bg-[#f1f5fe] hover:bg-[#e8eefc] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
            }`}
            style={{ "--d": `${150 + i * 80}ms` } as CSSProperties}
          >
            <h3>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] sm:px-6 sm:py-5"
              >
                <span
                  className={`font-mono text-[11px] tabular-nums transition-colors duration-300 ${
                    isOpen ? "text-[#1d4ed8] dark:text-sky-400" : "text-slate-400"
                  }`}
                >
                  0{i + 1}
                </span>
                <span
                  className={`flex-1 text-[15px] font-semibold tracking-[-0.01em] transition-colors duration-300 sm:text-[16px] ${
                    isOpen ? "text-[#0b1a44] dark:text-white" : "text-slate-700 group-hover:text-[#0b1a44] dark:text-slate-300 dark:group-hover:text-white"
                  }`}
                >
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] ${
                    isOpen
                      ? "rotate-[135deg] bg-[#0b2563] text-white dark:bg-[#2563eb]"
                      : "bg-white text-[#0b2563] shadow-[0_2px_6px_-2px_rgba(11,37,99,0.2)] group-hover:rotate-90 dark:bg-white/10 dark:text-white"
                  }`}
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M8 3v10M3 8h10" />
                  </svg>
                </span>
              </button>
            </h3>

            {/* grid-template-rows 0fr → 1fr animates to the content's natural height. */}
            <div
              id={`${id}-a${i}`}
              role="region"
              aria-labelledby={`${id}-q${i}`}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`pb-6 pl-[3.25rem] pr-14 text-[14.5px] leading-relaxed text-slate-600 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:pl-[3.6rem] dark:text-slate-400 ${
                    isOpen ? "translate-y-0 opacity-100 blur-0 delay-100" : "-translate-y-2 opacity-0 blur-[2px]"
                  }`}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

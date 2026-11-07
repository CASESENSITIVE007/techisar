"use client";

import { useId, useState } from "react";

export type FaqItem = { q: string; a: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <ul className="faq">
      {items.map((item, n) => {
        const isOpen = open === n;
        return (
          <li key={item.q} className="faq__item" data-open={isOpen}>
            <h3>
              <button
                type="button"
                id={`${id}-q${n}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${n}`}
                onClick={() => setOpen(isOpen ? null : n)}
                className="faq__q"
              >
                <span>{item.q}</span>
                <svg viewBox="0 0 16 16" className="faq__icon" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 2v12M2 8h12" />
                </svg>
              </button>
            </h3>

            {/* grid-template-rows 0fr to 1fr opens to the content's natural height. */}
            <div id={`${id}-a${n}`} role="region" aria-labelledby={`${id}-q${n}`} inert={!isOpen} className="faq__a">
              <div>
                <p>{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

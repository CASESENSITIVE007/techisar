import type { ReactNode } from "react";

const ICONS: Record<string, ReactNode> = {
  design: (
    <>
      <path d="M4 20l1.5-5L16 4.5a2.1 2.1 0 0 1 3 0l.5.5a2.1 2.1 0 0 1 0 3L9 18.5 4 20z" />
      <path d="M14 6.5l3.5 3.5" />
    </>
  ),
  code: (
    <>
      <path d="M8 7l-5 5 5 5" />
      <path d="M16 7l5 5-5 5" />
      <path d="M13.5 5l-3 14" />
    </>
  ),
  phone: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  ai: (
    <>
      <path d="M11 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z" />
      <path d="M19 15.5c.2 1.8 1 2.6 2.5 2.8-1.5.2-2.3 1-2.5 2.7-.2-1.7-1-2.5-2.5-2.7 1.5-.2 2.3-1 2.5-2.8z" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
  rocket: (
    <>
      <path d="M14 4c3-1.5 5-1.5 6-.5 1 1 1 3-.5 6L13 16l-5-5 6-7z" />
      <path d="M8 11l-4 1 2.5-3.5L10 8" />
      <path d="M13 16l-1 4 3.5-2.5L16 14" />
      <circle cx="15.5" cy="8.5" r="1.3" />
      <path d="M5.5 16.5c-1 1-1.5 2.5-1.5 3.5 1 0 2.5-.5 3.5-1.5" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" />
    </>
  ),
  check: <path d="M4.5 12.5l5 5 10-11" />,
};

export type IconName = keyof typeof ICONS;

export function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICONS[name]}
    </svg>
  );
}

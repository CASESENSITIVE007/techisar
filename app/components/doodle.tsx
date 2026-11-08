"use client";

import type { CSSProperties } from "react";
import { useReveal } from "./reveal";

// Hand-drawn marks. Each one draws itself the first time it scrolls into view.
const DOODLES = {
  underline: { box: "0 0 300 24", paths: ["M4 15 C60 4 120 20 170 11 S260 6 296 14"] },
  squiggle: { box: "0 0 130 36", paths: ["M4 20 C14 2 24 2 34 18 S54 34 64 18 S84 2 94 18 S114 34 126 16"] },
  arrow: { box: "0 0 110 80", paths: ["M6 10 C30 60 62 66 98 50", "M78 40 L100 49 L86 70"] },
  arrowDown: { box: "0 0 70 100", paths: ["M50 6 C8 26 10 62 34 90", "M14 76 L36 93 L46 68"] },
  spark: { box: "0 0 48 48", paths: ["M24 4 V44", "M4 24 H44", "M10 10 L38 38", "M38 10 L10 38"] },
  star: { box: "0 0 56 56", paths: ["M28 4 C30 20 36 26 52 28 C36 30 30 36 28 52 C26 36 20 30 4 28 C20 26 26 20 28 4 Z"] },
  loop: { box: "0 0 150 70", paths: ["M4 52 C30 62 54 40 60 22 C64 8 44 4 42 22 C40 42 84 58 104 40 C114 30 120 22 146 18"] },
  ring: { box: "0 0 80 80", paths: ["M40 6 C66 4 76 24 74 42 C72 64 52 76 34 74 C14 72 4 54 6 36 C8 18 24 8 46 8"] },
  zigzag: { box: "0 0 120 40", paths: ["M4 30 L24 10 L44 30 L64 10 L84 30 L104 10 L116 22"] },
  plus: { box: "0 0 32 32", paths: ["M16 4 V28", "M4 16 H28"] },
  brackets: { box: "0 0 90 60", paths: ["M28 6 L8 30 L28 54", "M62 6 L82 30 L62 54", "M52 8 L38 52"] },
};

export type DoodleName = keyof typeof DOODLES;

export function Doodle({
  name,
  className = "",
  style,
  color = "red",
}: {
  name: DoodleName;
  className?: string;
  style?: CSSProperties;
  color?: "red" | "mist" | "ash" | "silver" | "green";
}) {
  const ref = useReveal<SVGSVGElement>();
  const { box, paths } = DOODLES[name];
  return (
    <svg
      ref={ref}
      viewBox={box}
      aria-hidden="true"
      className={`doodle ${className}`}
      style={{ color: `var(--${color})`, ...style }}
    >
      {paths.map((d, n) => (
        <path key={d} d={d} pathLength={1} style={{ "--i": n } as CSSProperties} />
      ))}
    </svg>
  );
}

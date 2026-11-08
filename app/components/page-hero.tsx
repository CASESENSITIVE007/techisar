import type { CSSProperties } from "react";
import { Doodle } from "./doodle";
import { Reveal } from "./reveal";

export function PageHero({ title, intro }: { title: string; intro: string }) {
  return (
    <section className="page-hero">
      <span className="glow glow--red page-hero__glow" aria-hidden="true" />
      <Doodle name="loop" color="ash" className="page-hero__doodle page-hero__doodle--a" />
      <Doodle name="star" color="silver" className="page-hero__doodle page-hero__doodle--b" />
      <Doodle name="brackets" color="mist" className="page-hero__doodle page-hero__doodle--c" />
      <Doodle name="spark" color="red" className="page-hero__doodle page-hero__doodle--d" />
      <Reveal className="container page-hero__inner">
        <h1 data-reveal>
          <span className="hl">
            <span className="grad">{title}</span>
            <Doodle name="underline" color="mist" className="hl__line" />
          </span>
        </h1>
        <p className="lead" data-reveal style={{ "--i": 1 } as CSSProperties}>
          {intro}
        </p>
      </Reveal>
    </section>
  );
}

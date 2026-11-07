import type { CSSProperties } from "react";
import { Reveal } from "./reveal";

const v = (n: number) => ({ "--i": n }) as CSSProperties;

const AUDIENCES = [
  { title: "Startups", body: "launching a first product and needing it built properly." },
  { title: "Growing teams", body: "whose MVP has hit its limits and needs a rebuild." },
  { title: "Established businesses", body: "adding an app, a platform or AI to what they already do." },
];

export function WhoWeWorkWith() {
  return (
    <section className="section section--wide">
      <div className="container">
        <Reveal className="who__head">
          <h2 data-reveal>Who we work with</h2>
          <p className="statement" data-reveal style={v(1)}>
            One team takes your idea from sketch to a launched product, then stays to help it grow.
          </p>
        </Reveal>

        <Reveal className="elevations">
          {AUDIENCES.map((a, n) => (
            <div key={a.title} className="elevation" data-reveal style={v(n)}>
              <h3 className="elevation__name">{a.title}</h3>
              <p>{a.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

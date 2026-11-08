import type { CSSProperties, ReactNode } from "react";
import { GrowthIllo, LayersIllo, RocketIllo } from "./illustrations";
import { Reveal } from "./reveal";

const v = (n: number) => ({ "--i": n }) as CSSProperties;

const AUDIENCES: { title: string; body: string; art: ReactNode }[] = [
  { title: "Startups", body: "Launching a first product and needing it built properly.", art: <RocketIllo /> },
  { title: "Growing teams", body: "Your MVP has hit its limits and needs a rebuild.", art: <GrowthIllo /> },
  {
    title: "Established businesses",
    body: "Adding an app, a platform or AI to what you already do.",
    art: <LayersIllo />,
  },
];

export function WhoWeWorkWith() {
  return (
    <section className="section">
      <span className="glow glow--red" style={{ bottom: "0", right: "-10%" }} aria-hidden="true" />
      <div className="container">
        <Reveal className="head">
          <p className="label" data-reveal>Clients</p>
          <h2 data-reveal>Who we work with</h2>
          <p className="lead" data-reveal style={v(1)}>
            One team takes your idea from sketch to a launched product, then stays to help it grow.
          </p>
        </Reveal>

        <Reveal className="audiences">
          {AUDIENCES.map((a, n) => (
            <article key={a.title} className="audience spot" data-reveal style={v(n)}>
              <div className="audience__art">{a.art}</div>
              <h3>{a.title}</h3>
              <p>{a.body}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

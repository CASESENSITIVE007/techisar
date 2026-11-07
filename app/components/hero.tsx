import Link from "next/link";
import { PipelineFigure } from "./pipeline";

const BUILDS = ["websites", "mobile apps", "AI features", "design systems"];

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <PipelineFigure />

        <div className="hero__foot">
          <h1>
            Apps, websites
            <br />
            and AI products.
          </h1>

          <div className="hero__side">
            <p className="hero__lede">
              Techisar is a tech startup. We design, build and launch digital products for businesses,
              from first sketch to live in weeks.
            </p>
            <div className="actions">
              <Link href="/work" className="btn btn--primary">
                Check our projects
              </Link>
              <Link href="/contact" className="btn">
                Talk to us
              </Link>
            </div>
            <p className="hero__note">
              What we build:{" "}
              {BUILDS.map((item, i) => (
                <span key={item}>
                  <Link href="/services">{item}</Link>
                  {i < BUILDS.length - 2 ? ", " : i === BUILDS.length - 2 ? " and " : ""}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

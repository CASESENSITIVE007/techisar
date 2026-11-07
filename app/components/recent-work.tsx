import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Doodle } from "./doodle";
import { CountUp, Reveal, WorkCard } from "./reveal";

const v = (n: number) => ({ "--i": n }) as CSSProperties;

export function RecentWork({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className="section">
      <span className="glow glow--pink" style={{ top: "12%", right: "-12%" }} aria-hidden="true" />
      <div className="container">
        <Reveal className="head">
          <Doodle name="squiggle" color="pink" className="head__doodle" />
          <h2 data-reveal>Recent product thinking</h2>
          <p className="lead" data-reveal style={v(1)}>
            Concepts from our studio: how we think about real problems before a single line of
            production code.
          </p>
        </Reveal>

        <ul className="works">
          <li className="works__lead">
            <Project tone="violet" lead name="Ledgerly" description="Finance dashboard for startup founders">
              <Ledgerly />
            </Project>
          </li>
          <li>
            <Project tone="cyan" name="Wayfare" description="Trip planning app, iOS and Android">
              <Wayfare />
            </Project>
          </li>
          <li>
            <Project tone="pink" name="Pulse" description="Clinic scheduling for small practices">
              <Pulse />
            </Project>
          </li>
        </ul>

        {!standalone && (
          <Reveal className="section-foot">
            <Link href="/work" className="btn" data-reveal>
              See all work
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function Project({
  tone,
  lead = false,
  name,
  description,
  children,
}: {
  tone: string;
  lead?: boolean;
  name: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <WorkCard href="/work" className={`work work--${tone} spot ${lead ? "work--lead" : ""}`}>
      <div className="work__text" data-reveal>
        <span className="tag">Concept</span>
        <h3 className="work__name">{name}</h3>
        <p>{description}</p>
        <span className="work__more">View project</span>
      </div>
      <div className="work__art" data-reveal style={v(1)}>
        <span className="work__shape work__shape--a" aria-hidden="true" />
        <span className="work__shape work__shape--b" aria-hidden="true" />
        <div className="window">
          <div className="window__bar">
            <i />
            <i />
            <i />
          </div>
          {children}
        </div>
      </div>
    </WorkCard>
  );
}

const BARS = [34, 44, 38, 52, 48, 64, 58, 74, 68, 92];

function Ledgerly() {
  return (
    <div className="mock mock--split">
      <div>
        <div className="mock__head">
          <div>
            <p className="mock__label">Cash position</p>
            <p className="mock__figure">
              <CountUp to={1.28} decimals={2} prefix="$" suffix="M" />
            </p>
          </div>
          <p className="mock__up">+8.1%</p>
        </div>
        <div className="bars" aria-hidden="true">
          {BARS.map((h, n) => (
            <span key={n} className="bar" style={{ height: `${h}%`, "--i": n } as CSSProperties} />
          ))}
        </div>
      </div>
      <ul className="mock__rows">
        {[
          ["Payroll", "−$84,000"],
          ["Stripe payout", "+$126,430"],
          ["AWS", "−$12,880"],
        ].map(([label, amount]) => (
          <li key={label}>
            <span>{label}</span>
            <span className="mock__num">{amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Wayfare() {
  return (
    <div className="mock">
      <p className="mock__label">Good morning</p>
      <p className="mock__title">Your week</p>
      <p className="mock__label mock__gap">Focus time</p>
      <p className="mock__figure">14h 20m</p>
      <div className="bars bars--small" aria-hidden="true">
        {[40, 70, 50, 85, 60, 95, 55].map((h, n) => (
          <span key={n} className="bar" style={{ height: `${h}%`, "--i": n } as CSSProperties} />
        ))}
      </div>
      <ul className="mock__rows">
        <li>Design review</li>
        <li>Ship v1.2</li>
      </ul>
    </div>
  );
}

const DAYS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
const BOOKED = new Set([9, 15, 18]);

function Pulse() {
  return (
    <div className="mock">
      <p className="mock__title">November</p>
      <div className="cal">
        {DAYS.map((day, n) => (
          <span
            key={day}
            className="cal__day"
            data-state={day === 12 ? "today" : BOOKED.has(day) ? "booked" : undefined}
            style={v(n)}
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
}

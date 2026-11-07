import Link from "next/link";
import type { CSSProperties } from "react";
import { CountUp, Reveal, WorkCard } from "./reveal";

const v = (n: number) => ({ "--i": n }) as CSSProperties;

export function RecentWork() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="head head--split">
          <h2 data-reveal>Recent product thinking</h2>
          <p className="lead" data-reveal style={v(1)}>
            Concepts from our studio: how we think about real problems before a single line of
            production code.
          </p>
        </Reveal>

        <ul className="register">
          <li>
            <WorkCard href="/work" className="sheet sheet--lead">
              <SheetText name="Ledgerly" description="Finance dashboard for startup founders" />
              <figure
                className="sheet__fig"
                data-slot="ledgerly"
                data-kind="product"
                data-alt="The Ledgerly dashboard: cash position, a monthly chart and recent transactions"
              >
                <Ledgerly />
              </figure>
            </WorkCard>
          </li>
          <li>
            <WorkCard href="/work" className="sheet sheet--stack">
              <SheetText name="Wayfare" description="Trip planning app, iOS and Android" />
              <figure
                className="sheet__fig"
                data-slot="wayfare"
                data-kind="product"
                data-alt="The Wayfare app: the week ahead, focus time and the next two items"
              >
                <Wayfare />
              </figure>
            </WorkCard>
          </li>
          <li>
            <WorkCard href="/work" className="sheet sheet--stack">
              <SheetText name="Pulse" description="Clinic scheduling for small practices" />
              <figure
                className="sheet__fig"
                data-slot="pulse"
                data-kind="product"
                data-alt="The Pulse calendar for November with booked days marked"
              >
                <Pulse />
              </figure>
            </WorkCard>
          </li>
        </ul>

        <Reveal className="section-foot">
          <Link href="/work" className="btn" data-reveal>
            See all work
          </Link>
          <p className="note" data-reveal style={v(1)}>
            Full case studies, outcomes and process notes on the Work page.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function SheetText({ name, description }: { name: string; description: string }) {
  return (
    <div className="sheet__text">
      <h3 className="sheet__name">{name}</h3>
      <p className="note">concept</p>
      <p className="sheet__line">{description}</p>
    </div>
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
          <p className="mock__num">+8.1%</p>
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
    <div className="mock mock--stack">
      <div>
        <p className="mock__label">Good morning</p>
        <p className="mock__title">Your week</p>
        <p className="mock__label mock__gap">Focus time</p>
        <p className="mock__figure">14h 20m</p>
      </div>
      <div>
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

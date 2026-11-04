import Link from "next/link";
import type { CSSProperties } from "react";
import { CountUp, Reveal, WorkCard } from "./reveal";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function RecentWork() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="rv-up mb-5 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#1d4ed8] dark:text-sky-400">
              <span className="h-px w-8 bg-current" />
              Selected work
            </p>
            <h2 className="text-[clamp(2.25rem,4.6vw,3.4rem)] font-bold leading-[1.04] tracking-[-0.025em] text-[#0b1a44] dark:text-white">
              {[["Recent", "product"], ["thinking"]].map((line, l) => (
                <span key={l} className="block">
                  {line.map((w, i) => (
                    <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                      <span className="rv-word inline-block" style={d(80 + (l * 2 + i) * 90)}>
                        {w}
                      </span>
                      {" "}
                    </span>
                  ))}
                </span>
              ))}
            </h2>
          </div>
          <p
            className="rv-up max-w-xs text-[15px] leading-relaxed text-slate-600 dark:text-slate-400"
            style={d(300)}
          >
            Concepts from our studio: how we think about real problems before a single line of
            production code.
          </p>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-[1.42fr_1fr] lg:grid-rows-[minmax(290px,1fr)_minmax(290px,1fr)]">
          <Ledgerly />
          <Wayfare />
          <Pulse />
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/work"
            className="rv-up nav-cta group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-[#0b2563] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(11,37,99,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-12px_rgba(29,78,216,0.75)] dark:bg-[#2563eb]"
          >
            <span className="relative z-10">See all work</span>
            <Arrow className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <p className="rv-up text-[13px] text-slate-500 dark:text-slate-400" style={d(120)}>
            Full case studies, outcomes and process notes on the Work page.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function CardText({
  name,
  description,
  dark = false,
  small = false,
}: {
  name: string;
  description: string;
  dark?: boolean;
  small?: boolean;
}) {
  return (
    <div className="relative z-10">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h3
          className={`${small ? "text-[clamp(1.75rem,2.4vw,2.15rem)]" : "text-[clamp(1.9rem,3vw,2.6rem)]"} font-bold leading-none tracking-[-0.025em] ${
            dark ? "text-white" : "text-[#0b1a44] dark:text-white"
          }`}
        >
          {name}
        </h3>
        <span className={`text-[13px] ${dark ? "text-blue-200/70" : "text-slate-500 dark:text-slate-400"}`}>
          concept
        </span>
        <Arrow
          className={`ml-1 h-4 w-4 -translate-x-2 -rotate-45 self-center opacity-0 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0 group-hover:opacity-100 ${
            dark ? "text-white" : "text-[#0b2563] dark:text-white"
          }`}
        />
      </div>
      <p
        className={`mt-3 max-w-[16rem] text-[14px] leading-relaxed ${
          dark ? "text-blue-100/80" : "text-slate-600 dark:text-slate-300"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

/* ---------------- Ledgerly ---------------- */

const BARS = [24, 34, 28, 42, 38, 54, 48, 64, 58, 72];
const BAR_COLORS = ["#a8b6d6", "#98a8cf", "#8a9cc6", "#7a8ebe", "#6a80b5", "#5a71ab", "#4a62a1", "#3a5396", "#2c458a", "#1e3a8a"];

function Ledgerly() {
  return (
    <WorkCard
      href="/work"
      className="relative flex min-h-[560px] flex-col justify-end overflow-hidden rounded-[22px] bg-[#0b2563] p-7 sm:p-9 lg:row-span-2"
      style={{ "--glow": "rgba(96,165,250,0.22)" } as CSSProperties}
    >
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(59,130,246,0.35),transparent_55%)]" />
      <span className="work-dots pointer-events-none absolute inset-0 opacity-40" />

      <div className="rv-left absolute left-7 right-[-2.5rem] top-7 sm:left-[24%] sm:top-9" style={d(250)}>
        <div className="rounded-2xl bg-[#f4f7fd] p-5 shadow-[0_30px_60px_-20px_rgba(2,8,30,0.7)] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 sm:p-6">
          <div className="flex items-start justify-between pr-10">
            <div>
              <p className="text-[12px] font-medium text-slate-500">Cash position</p>
              <p className="mt-1 text-[28px] font-bold leading-none tracking-tight text-[#0b1a44]">
                <CountUp to={1.28} decimals={2} prefix="$" suffix="M" />
              </p>
            </div>
            <span className="rv-pop rounded-full bg-[#dbe7ff] px-2 py-0.5 text-[11px] font-semibold text-[#1d4ed8]" style={d(900)}>
              +8.1%
            </span>
          </div>

          <div className="relative mt-5 flex h-[120px] items-end gap-[6px] pr-10">
            {BARS.map((h, i) => (
              <div key={i} className="rv-bar relative flex-1" style={{ ...d(450 + i * 60), height: `${h + 28}%` }}>
                <span
                  className="block h-full w-full rounded-[5px] transition-[filter] duration-300 group-hover:brightness-110"
                  style={{ background: BAR_COLORS[i] }}
                />
                {i === BARS.length - 1 && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-[#0b1a44] px-2 py-1 text-[10px] font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Nov · $1.28M
                  </span>
                )}
              </div>
            ))}
          </div>

          <ul className="mt-4 space-y-2 pr-10 text-[12px]">
            {[
              ["Payroll", "−$84,000", "text-slate-600"],
              ["Stripe payout", "+$126,430", "text-emerald-600"],
              ["AWS", "−$12,880", "text-slate-600"],
            ].map(([label, amount, tone], i) => (
              <li
                key={label}
                className="rv-up flex items-center justify-between rounded-lg bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.05)]"
                style={d(1000 + i * 90)}
              >
                <span className="font-medium text-slate-700">{label}</span>
                <span className={`tabular-nums ${tone}`}>{amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <CardText name="Ledgerly" description="Finance dashboard for startup founders" dark />
    </WorkCard>
  );
}

/* ---------------- Wayfare ---------------- */

function Wayfare() {
  return (
    <WorkCard
      href="/work"
      className="relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[22px] bg-[#d8e3ff] p-7 dark:bg-[#18244d]"
      style={{ ...d(120), "--glow": "rgba(255,255,255,0.55)" } as CSSProperties}
    >
      <div className="rv-rise absolute -bottom-16 right-4 w-[37%] max-w-[172px] sm:right-7 sm:w-[40%]" style={d(350)}>
        <div className="rounded-[30px] border-[5px] border-[#0b1a44] bg-white dark:border-slate-500 px-3 pb-14 pt-2.5 shadow-[0_30px_50px_-20px_rgba(11,26,68,0.55)] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-3 group-hover:-rotate-2">
          <div className="mx-auto h-[14px] w-[54px] rounded-full bg-[#0b1a44]" />
          <p className="mt-4 text-[9px] text-slate-500">Good morning</p>
          <p className="text-[14px] font-bold tracking-tight text-[#0b1a44]">Your week</p>
          <div className="mt-2.5 rounded-xl bg-gradient-to-br from-[#1e40af] to-[#0b2563] p-2.5 text-white">
            <p className="text-[8px] text-blue-200">Focus time</p>
            <p className="text-[17px] font-bold leading-tight tracking-tight">14h 20m</p>
            <div className="mt-1.5 flex h-[22px] items-end justify-between px-0.5">
              {[40, 70, 50, 85, 60, 95, 55].map((h, i) => (
                <span
                  key={i}
                  className="eq w-[5px] rounded-full bg-blue-300/80"
                  style={{ height: `${h}%`, animationDelay: `${i * 110}ms` }}
                />
              ))}
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1.5 rounded-lg border border-slate-100 px-2 py-1.5 text-[8px] font-medium text-slate-700">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0b2563]" />
            Design review
          </div>
          <div className="mt-1.5 flex items-center gap-1.5 rounded-lg border border-slate-100 px-2 py-1.5 text-[8px] font-medium text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
            Ship v1.2
          </div>
        </div>
      </div>

      <div className="max-w-[56%]">
        <CardText name="Wayfare" description="Trip planning app, iOS and Android" small />
      </div>
    </WorkCard>
  );
}

/* ---------------- Pulse ---------------- */

const DAYS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
const BOOKED = new Set([9, 15, 18]);
const TODAY = 12;

function Pulse() {
  return (
    <WorkCard
      href="/work"
      className="relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[22px] bg-[#d8f3e5] p-7 dark:bg-[#0d3528]"
      style={{ ...d(220), "--glow": "rgba(255,255,255,0.6)" } as CSSProperties}
    >
      <div className="rv-left absolute left-[34%] right-[-2rem] top-5" style={d(400)}>
        <div className="rounded-2xl bg-white/90 p-4 shadow-[0_24px_44px_-22px_rgba(6,78,59,0.45)] backdrop-blur transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2">
          <p className="text-[15px] font-bold tracking-tight text-[#0b1a44]">November</p>
          <div className="mt-3 grid grid-cols-7 gap-1.5 pr-6">
            {DAYS.map((day, i) => {
              const booked = BOOKED.has(day);
              const today = day === TODAY;
              return (
                <span
                  key={day}
                  className={`rv-pop relative flex aspect-square items-center justify-center rounded-lg text-[11px] font-medium transition-colors duration-300 ${
                    today
                      ? "bg-[#0b2563] text-white"
                      : booked
                        ? "bg-[#c7d7fb] text-[#0b2563] group-hover:bg-[#b3c8fa]"
                        : "bg-slate-50 text-slate-600"
                  }`}
                  style={d(600 + i * 35)}
                >
                  {today && <span className="hero-ring absolute inset-0 rounded-lg border border-[#2563eb]" />}
                  {day}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <CardText name="Pulse" description="Clinic scheduling for small practices" small />
    </WorkCard>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const INTERVAL = 6500;

const TABS: { label: string; body: string; points: string[]; mock: () => ReactNode }[] = [
  {
    label: "Web platforms",
    body: "Dashboards, SaaS products and marketing sites that load fast, read clearly and scale with you.",
    points: ["React, Next.js and TypeScript", "Auth, billing and admin built in", "Accessible and responsive from day one"],
    mock: WebMock,
  },
  {
    label: "Mobile apps",
    body: "iOS and Android from one React Native codebase, built to feel native and ship to both stores.",
    points: ["React Native and Expo", "Push, offline and in-app payments", "App Store and Play Store releases handled"],
    mock: MobileMock,
  },
  {
    label: "AI features",
    body: "Assistants, search and automation grounded in your own content, with guardrails and review.",
    points: ["Retrieval over your docs and data", "Evaluations before every release", "Guardrails, logging and review queues"],
    mock: AiMock,
  },
  {
    label: "Design systems",
    body: "Tokens and components that keep every screen consistent, in light and dark.",
    points: ["Figma libraries matched to code", "Light and dark themes from tokens", "Documented, versioned components"],
    mock: DesignMock,
  },
];

export function WhatWeBuild() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Reveal on first view; only auto-advance while the section is on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) el.dataset.inview = "true";
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % TABS.length), INTERVAL);
    return () => clearTimeout(t);
  }, [active, inView, paused]);

  const onKeyDown = (e: KeyboardEvent) => {
    const delta = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + TABS.length) % TABS.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const running = inView && !paused;

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="rv-up mb-5 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#1d4ed8] dark:text-sky-400">
          <span className="h-px w-8 bg-current" />
          Capabilities
        </p>
        <h2 className="text-[clamp(2.25rem,4.2vw,3.1rem)] font-bold leading-[1.04] tracking-[-0.025em] text-[#0b1a44] dark:text-white">
          {["What", "we", "build"].map((w, i) => (
            <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <span className="rv-word inline-block" style={d(80 + i * 80)}>
                {w}
              </span>
              {" "}
            </span>
          ))}
        </h2>

        <div
          className="mt-12 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div role="tablist" aria-label="What we build" aria-orientation="vertical" onKeyDown={onKeyDown} className="flex flex-col">
            {TABS.map((tab, i) => {
              const selected = i === active;
              return (
                <button
                  key={tab.label}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`wb-tab-${i}`}
                  aria-selected={selected}
                  aria-controls={`wb-panel-${i}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className="rv-up group relative w-fit py-1.5 text-left outline-none"
                  style={d(250 + i * 80)}
                >
                  <span
                    className={`font-display block text-[clamp(1.9rem,3.4vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.025em] transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-focus-visible:underline ${
                      selected
                        ? "translate-x-0 text-[#0b1a44] dark:text-white"
                        : "text-slate-400/80 hover:translate-x-1.5 hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-400"
                    }`}
                  >
                    {tab.label}
                  </span>
                  <span className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden rounded-full bg-[#0b2563]/8 transition-opacity duration-300 dark:bg-white/10" style={{ opacity: selected ? 1 : 0 }}>
                    {selected && (
                      <span
                        key={active}
                        className="wb-progress block h-full w-full origin-left bg-[#1d4ed8] dark:bg-sky-400"
                        style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: running ? "running" : "paused" }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
            <p className="rv-up mt-8 hidden text-[13px] text-slate-500 lg:block dark:text-slate-500" style={d(650)}>
              Hover to pause · use ↑ ↓ to switch
            </p>
          </div>

          <div className="rv-up grid" style={d(350)}>
            {TABS.map((tab, i) => {
              const selected = i === active;
              const Mock = tab.mock;
              return (
                <div
                  key={tab.label}
                  role="tabpanel"
                  id={`wb-panel-${i}`}
                  aria-labelledby={`wb-tab-${i}`}
                  aria-hidden={!selected}
                  inert={!selected}
                  data-active={selected}
                  className={`wb-panel [grid-area:1/1] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
                    selected ? "translate-y-0 opacity-100 blur-0" : "pointer-events-none translate-y-4 opacity-0 blur-sm"
                  }`}
                >
                  <div
                    className="wb-tilt relative overflow-hidden rounded-[20px] bg-[#0b2563] p-4 shadow-[0_40px_80px_-40px_rgba(11,37,99,0.7)] sm:p-6 dark:bg-[#0f2a6b]"
                    onPointerMove={(e) => {
                      const box = e.currentTarget.getBoundingClientRect();
                      const x = (e.clientX - box.left) / box.width - 0.5;
                      const y = (e.clientY - box.top) / box.height - 0.5;
                      e.currentTarget.style.setProperty("--rx", `${(-y * 5).toFixed(2)}deg`);
                      e.currentTarget.style.setProperty("--ry", `${(x * 6).toFixed(2)}deg`);
                      e.currentTarget.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
                      e.currentTarget.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
                    }}
                    onPointerLeave={(e) => {
                      e.currentTarget.style.setProperty("--rx", "0deg");
                      e.currentTarget.style.setProperty("--ry", "0deg");
                    }}
                  >
                    <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(96,165,250,0.35),transparent_55%)]" />
                    <span className="wb-glare pointer-events-none absolute inset-0" />
                    <div className="relative">
                      <Mock />
                    </div>
                  </div>

                  <p className="wb-in mt-7 max-w-md text-[16px] leading-relaxed text-[#0b1a44] dark:text-slate-200" style={d(250)}>
                    {tab.body}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {tab.points.map((pt, j) => (
                      <li key={pt} className="wb-in flex items-center gap-3 text-[14px] text-slate-600 dark:text-slate-400" style={d(350 + j * 90)}>
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#dbe7ff] text-[#1d4ed8] dark:bg-white/10 dark:text-sky-400">
                          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3.5 8.5l3 3 6-7" />
                          </svg>
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Mockups ---------------- */

function BrowserChrome({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl bg-[#eef3fd] shadow-[0_20px_40px_-20px_rgba(2,8,30,0.6)]">
      <div className="flex items-center gap-3 border-b border-[#dbe4f7] bg-[#dfe7f8] px-3 py-2">
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#b7c3dc]" />
          <span className="h-2 w-2 rounded-full bg-[#b7c3dc]" />
          <span className="h-2 w-2 rounded-full bg-[#b7c3dc]" />
        </span>
        <span className="rounded-md bg-white px-2.5 py-0.5 text-[10px] text-slate-500">{url}</span>
      </div>
      {children}
    </div>
  );
}

function WebMock() {
  const rows = [
    ["Northwind", "Pro", "$420"],
    ["Globex", "Team", "$180"],
    ["Initech", "Pro", "$420"],
    ["Umbra", "Starter", "$60"],
  ];
  return (
    <BrowserChrome url="app.yourproduct.com/overview">
      <div className="grid grid-cols-[30%_1fr]">
        <div className="space-y-1 bg-[#0b2563] p-3 text-[10px] text-blue-100/80">
          <p className="wb-in mb-2 px-2 font-semibold text-white" style={d(150)}>Acme</p>
          {["Overview", "Customers", "Billing", "Reports"].map((item, i) => (
            <p
              key={item}
              className={`wb-in rounded-md px-2 py-1.5 ${i === 0 ? "bg-white/15 text-white" : ""}`}
              style={d(200 + i * 50)}
            >
              {item}
            </p>
          ))}
        </div>
        <div className="space-y-2.5 p-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              ["MRR", "$48.2k"],
              ["Trials", "312"],
              ["Churn", "1.8%"],
            ].map(([k, v], i) => (
              <div key={k} className="wb-in rounded-lg bg-white p-2.5" style={d(250 + i * 70)}>
                <p className="text-[9px] text-slate-500">{k}</p>
                <p className="text-[15px] font-bold tracking-tight text-[#0b1a44]">{v}</p>
                {i === 0 && (
                  <svg viewBox="0 0 60 14" className="mt-1 h-3 w-full" fill="none">
                    <path className="wb-spark" pathLength={1} d="M0 12 L10 10 L20 11 L30 7 L40 8 L50 4 L60 2" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            ))}
          </div>
          <div className="wb-in rounded-lg bg-white p-2.5" style={d(450)}>
            {rows.map(([name, plan, amt], i) => (
              <div key={name} className={`grid grid-cols-3 py-1.5 text-[10px] ${i ? "border-t border-slate-100" : ""}`}>
                <span className="font-semibold text-[#0b1a44]">{name}</span>
                <span className="text-slate-500">{plan}</span>
                <span className="text-right tabular-nums text-[#0b1a44]">{amt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

function Phone({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`w-[42%] max-w-[170px] ${className}`}>
      <div className="wb-rise rounded-[26px] border-[4px] border-[#06133a] bg-[#f4f7fd] p-2.5 shadow-[0_24px_40px_-18px_rgba(2,8,30,0.7)]" style={style}>
        <div className="mx-auto mb-2.5 h-[10px] w-[44px] rounded-full bg-[#06133a]" />
        {children}
      </div>
    </div>
  );
}

function MobileMock() {
  return (
    <div className="flex h-[248px] items-end justify-center gap-4 pt-2 sm:h-[268px]">
      <Phone className="translate-y-4" style={d(150)}>
        <p className="text-[8px] text-slate-500">Today</p>
        <p className="text-[13px] font-bold tracking-tight text-[#0b1a44]">Order #2841</p>
        <div className="mt-2 rounded-lg bg-[#0b2563] p-2 text-white">
          <p className="text-[8px] text-blue-200">Arriving in</p>
          <p className="text-[16px] font-bold leading-tight">12 min</p>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/20">
            <span className="wb-fill block h-full w-[70%] origin-left rounded-full bg-emerald-400" />
          </div>
        </div>
        {["Picked up", "On the way", "Delivered"].map((s, i) => (
          <div key={s} className="mt-1.5 flex items-center gap-1.5 rounded-md bg-white px-2 py-1.5 text-[8px] text-slate-600">
            <span className={`h-1.5 w-1.5 rounded-full ${i < 2 ? "bg-emerald-500" : "bg-slate-300"}`} />
            {s}
          </div>
        ))}
      </Phone>
      <Phone className="-translate-y-2" style={d(300)}>
        <p className="text-[8px] text-slate-500">Wallet</p>
        <p className="text-[13px] font-bold tracking-tight text-[#0b1a44]">$2,480.00</p>
        <div className="mt-2 flex h-[54px] items-end gap-[3px] rounded-lg bg-white p-2">
          {[30, 55, 40, 70, 50, 85, 65].map((h, i) => (
            <span key={i} className="wb-bar flex-1 rounded-sm bg-[#2563eb]" style={{ height: `${h}%`, ...d(450 + i * 50) }} />
          ))}
        </div>
        <div className="mt-1.5 rounded-md bg-[#d9f5e6] px-2 py-1.5 text-[8px] font-semibold text-emerald-700">+ $320 this week</div>
        <div className="mt-1.5 rounded-md bg-white px-2 py-1.5 text-[8px] text-slate-600">Send money</div>
      </Phone>
    </div>
  );
}

function AiMock() {
  return (
    <BrowserChrome url="help.yourproduct.com/assistant">
      <div className="space-y-2.5 p-4 text-[11px]">
        <div className="wb-in ml-auto w-fit max-w-[75%] rounded-2xl rounded-br-md bg-[#0b2563] px-3 py-2 text-white" style={d(150)}>
          How do I change the billing email on my account?
        </div>
        <div className="wb-in flex gap-2" style={d(500)}>
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#0b2563] text-[10px] font-bold text-[#9cc0ff]">T</span>
          <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-white px-3 py-2 text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
            Go to <b className="text-[#0b1a44]">Settings → Billing</b> and choose <b className="text-[#0b1a44]">Edit contact</b>. Changes apply from the next invoice.
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["Billing guide", "Invoices FAQ"].map((s) => (
                <span key={s} className="rounded-full border border-[#dbe4f7] bg-[#f4f7fd] px-2 py-0.5 text-[9px] text-[#1d4ed8]">
                  ↗ {s}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="wb-in ml-auto w-fit rounded-2xl rounded-br-md bg-[#0b2563] px-3 py-2 text-white" style={d(900)}>
          Can I get last month&apos;s invoice?
        </div>
        <div className="wb-in flex items-center gap-2" style={d(1150)}>
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#0b2563] text-[10px] font-bold text-[#9cc0ff]">T</span>
          <span className="flex gap-1 rounded-2xl bg-white px-3 py-2.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="wb-dot h-1.5 w-1.5 rounded-full bg-slate-400" style={{ animationDelay: `${i * 150}ms` }} />
            ))}
          </span>
        </div>
        <div className="wb-in flex items-center justify-between rounded-xl border border-[#dbe4f7] bg-white px-3 py-2 text-slate-400" style={d(300)}>
          Ask anything about your account…
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#0b2563] text-white">↑</span>
        </div>
      </div>
    </BrowserChrome>
  );
}

function DesignMock() {
  const swatches = ["#0b2563", "#1d4ed8", "#60a5fa", "#dbe7ff", "#10b981", "#0b1a44"];
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="wb-in col-span-2 rounded-xl bg-[#eef3fd] p-3.5" style={d(150)}>
        <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">Color tokens</p>
        <div className="mt-2.5 flex gap-2">
          {swatches.map((c, i) => (
            <span key={c} className="wb-pop h-9 flex-1 rounded-lg ring-1 ring-black/5" style={{ background: c, ...d(250 + i * 60) }} />
          ))}
        </div>
      </div>
      <div className="wb-in rounded-xl bg-[#eef3fd] p-3.5" style={d(350)}>
        <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">Type</p>
        <p className="mt-1 text-[34px] font-bold leading-none tracking-tight text-[#0b1a44]">Aa</p>
        <div className="mt-2 space-y-1">
          <span className="block h-1.5 w-[85%] rounded-full bg-[#0b1a44]/80" />
          <span className="block h-1.5 w-[65%] rounded-full bg-slate-300" />
          <span className="block h-1.5 w-[75%] rounded-full bg-slate-300" />
        </div>
      </div>
      <div className="wb-in space-y-2 rounded-xl bg-[#eef3fd] p-3.5" style={d(450)}>
        <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">Components</p>
        <span className="block rounded-lg bg-[#0b2563] py-1.5 text-center text-[10px] font-semibold text-white">Primary</span>
        <span className="block rounded-lg border border-[#c7d3ee] bg-white py-1.5 text-center text-[10px] font-semibold text-[#0b1a44]">Secondary</span>
        <div className="flex items-center justify-between rounded-lg bg-white px-2 py-1.5 text-[10px] text-slate-600">
          Dark mode
          <span className="wb-toggle relative h-3.5 w-6 rounded-full bg-[#1d4ed8]">
            <span className="absolute top-0.5 h-2.5 w-2.5 rounded-full bg-white" />
          </span>
        </div>
      </div>
    </div>
  );
}

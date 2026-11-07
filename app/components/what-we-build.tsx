"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { Reveal } from "./reveal";

const v = (n: number) => ({ "--i": n }) as CSSProperties;

const TABS: { label: string; body: string; points: string[]; caption?: string; mock: () => ReactNode }[] = [
  {
    label: "Web platforms",
    body: "Dashboards, SaaS products and marketing sites that load fast, read clearly and scale with you.",
    points: ["React, Next.js and TypeScript", "Auth, billing and admin built in", "Accessible and responsive from day one"],
    caption: "app.yourproduct.com/overview",
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
    caption: "help.yourproduct.com/assistant",
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
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent) => {
    const delta = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + TABS.length) % TABS.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="section section--close">
      <div className="container">
        <Reveal className="switcher">
          <div className="switcher__side">
            <h2 data-reveal>What we build</h2>
            <div
              role="tablist"
              aria-label="What we build"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="tabs"
            >
              {TABS.map((tab, n) => {
                const selected = n === active;
                return (
                  <button
                    key={tab.label}
                    ref={(el) => {
                      tabRefs.current[n] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`wb-tab-${n}`}
                    aria-selected={selected}
                    aria-controls={`wb-panel-${n}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(n)}
                    className="tab"
                    data-reveal
                    style={v(n + 1)}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="switcher__panels" data-reveal style={v(2)}>
            {TABS.map((tab, n) => {
              const Mock = tab.mock;
              return (
                <div
                  key={tab.label}
                  role="tabpanel"
                  id={`wb-panel-${n}`}
                  aria-labelledby={`wb-tab-${n}`}
                  data-active={n === active}
                  className="panel"
                >
                  <figure
                    className="panel__fig"
                    data-slot={`build-${n + 1}`}
                    data-kind="product"
                    data-alt={`A screen from a ${tab.label.toLowerCase()} project`}
                  >
                    <Mock />
                  </figure>
                  {tab.caption && <p className="note panel__caption">{tab.caption}</p>}
                  <p className="panel__body">{tab.body}</p>
                  <ul className="points">
                    {tab.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Screens, drawn in the sheet's own lines ---------------- */

function WebMock() {
  const rows = [
    ["Northwind", "Pro", "$420"],
    ["Globex", "Team", "$180"],
    ["Initech", "Pro", "$420"],
    ["Umbra", "Starter", "$60"],
  ];
  return (
    <div className="mock mock--app">
      <ul className="mock__nav">
        <li className="mock__title">Example Co</li>
        {["Overview", "Customers", "Billing", "Reports"].map((item, n) => (
          <li key={item} data-current={n === 0 || undefined}>
            {item}
          </li>
        ))}
      </ul>
      <div>
        <dl className="mock__stats">
          {[
            ["MRR", "$48.2k"],
            ["Trials", "312"],
            ["Churn", "1.8%"],
          ].map(([k, val]) => (
            <div key={k}>
              <dt className="mock__label">{k}</dt>
              <dd className="mock__figure">{val}</dd>
            </div>
          ))}
        </dl>
        <ul className="mock__rows mock__rows--three">
          {rows.map(([name, plan, amt]) => (
            <li key={name}>
              <span>{name}</span>
              <span className="mock__muted">{plan}</span>
              <span className="mock__num">{amt}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileMock() {
  return (
    <div className="mock mock--screens">
      <div className="mock__screen">
        <p className="mock__label">Today</p>
        <p className="mock__title">Order #2841</p>
        <p className="mock__label mock__gap">Arriving in</p>
        <p className="mock__figure">12 min</p>
        <span className="meter" aria-hidden="true">
          <span />
        </span>
        <ul className="mock__rows">
          {["Picked up", "On the way", "Delivered"].map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
      <div className="mock__screen">
        <p className="mock__label">Wallet</p>
        <p className="mock__figure">$2,480.00</p>
        <div className="bars bars--small" aria-hidden="true">
          {[30, 55, 40, 70, 50, 85, 65].map((h, n) => (
            <span key={n} className="bar" style={{ height: `${h}%`, "--i": n } as CSSProperties} />
          ))}
        </div>
        <ul className="mock__rows">
          <li>+ $320 this week</li>
          <li>Send money</li>
        </ul>
      </div>
    </div>
  );
}

function AiMock() {
  return (
    <div className="mock mock--chat">
      <p className="msg msg--you">How do I change the billing email on my account?</p>
      <div className="msg">
        <p>
          Go to <b>Settings → Billing</b> and choose <b>Edit contact</b>. Changes apply from the next
          invoice.
        </p>
        <p className="mock__muted">Billing guide, Invoices FAQ</p>
      </div>
      <p className="msg msg--you">Can I get last month&apos;s invoice?</p>
      <p className="mock__ask">Ask anything about your account…</p>
    </div>
  );
}

function DesignMock() {
  const swatches = ["paper", "paper-2", "paper-3", "muted", "ink-2", "ink"];
  return (
    <div className="mock mock--system">
      <div>
        <p className="mock__label">Color tokens</p>
        <div className="swatches">
          {swatches.map((name) => (
            <span key={name} className="swatch" style={{ background: `var(--color-${name})` }} />
          ))}
        </div>
      </div>
      <div className="mock__split2">
        <div>
          <p className="mock__label">Type</p>
          <p className="mock__aa">Aa</p>
        </div>
        <div>
          <p className="mock__label">Components</p>
          <div className="mock__controls">
            <span className="mock__btn mock__btn--fill">Primary</span>
            <span className="mock__btn">Secondary</span>
            <span className="mock__muted">Dark mode</span>
          </div>
        </div>
      </div>
    </div>
  );
}

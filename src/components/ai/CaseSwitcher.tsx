"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Case } from "@/lib/agency-content";
import type { AiCopy } from "./copy";

const TILES = [
  { bg: "bg-[var(--d-blue)]", ink: "text-white", sub: "text-white/75" },
  { bg: "bg-[var(--d-pink)]", ink: "text-[#2b0a33]", sub: "text-[#2b0a33]/70" },
  {
    bg: "bg-[var(--d-lime)]",
    ink: "text-[var(--d-blue)]",
    sub: "text-[var(--d-blue)]/70",
  },
  { bg: "bg-[var(--d-cyan)]", ink: "text-[#06244a]", sub: "text-[#06244a]/70" },
];

export function CaseSwitcher({
  cases,
  showNames,
  t,
  contactHref,
}: {
  cases: Case[];
  showNames: boolean;
  t: AiCopy;
  contactHref: string;
}) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const c = cases[active];
  const tile = TILES[active % TILES.length];
  const name = (x: Case) => (showNames && x.client ? x.client : x.niche);

  return (
    <div className="grid gap-4 lg:grid-cols-[300px_1fr] lg:gap-6">
      {/* Список кейсов: на телефоне листается по горизонтали, на десктопе колонкой */}
      <div
        role="tablist"
        aria-label={t.casesNav}
        className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
      >
        {cases.map((x, i) => {
          const on = i === active;
          return (
            <button
              key={x.niche}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="case-panel"
              onClick={() => setActive(i)}
              className={`flex shrink-0 items-center justify-between gap-4 rounded-2xl px-4 py-3 text-left transition-colors lg:py-4 ${
                on
                  ? "bg-[var(--d-blue)] text-white"
                  : "bg-white hover:bg-[var(--d-lav)]"
              }`}
            >
              <span className="whitespace-nowrap font-bold tracking-[-0.02em] lg:whitespace-normal">
                {name(x)}
              </span>
              <span
                className={`whitespace-nowrap rounded-md px-2 py-0.5 text-sm font-bold ${
                  on
                    ? "bg-[var(--d-lime)] text-[var(--d-blue)]"
                    : "bg-[var(--d-lav)] text-[var(--d-blue)]"
                }`}
              >
                {x.headline}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.article
          key={active}
          id="case-panel"
          role="tabpanel"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-3xl bg-white"
        >
          <div
            className={`relative overflow-hidden p-6 md:p-10 ${tile.bg} ${tile.ink}`}
          >
            <p
              aria-hidden
              className="pointer-events-none absolute -bottom-[0.18em] right-[-0.04em] select-none whitespace-nowrap text-[clamp(80px,14vw,170px)] font-bold uppercase leading-none tracking-[-0.06em] opacity-15"
            >
              {name(c)}
            </p>
            <div className="relative">
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded-md bg-white/90 px-2 py-0.5 text-xs font-bold uppercase text-[var(--d-blue)]">
                  {c.geo}
                </span>
                {showNames && c.client && (
                  <span className="rounded-md bg-white/90 px-2 py-0.5 text-xs font-bold uppercase text-[var(--d-blue)]">
                    {c.niche}
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-[clamp(30px,4.6vw,56px)] font-bold uppercase leading-[0.92] tracking-[-0.05em]">
                {name(c)}
              </h3>
              <p className="mt-6 text-[clamp(56px,9vw,112px)] font-bold leading-none tracking-[-0.06em]">
                {c.headline}
              </p>
              <p
                className={`mt-2 max-w-[30ch] text-lg font-medium leading-tight ${tile.sub}`}
              >
                {c.headlineLabel}
              </p>
            </div>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-2 md:p-10">
            {c.task && (
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-[var(--d-blue)]">
                  {t.task}
                </p>
                <p className="mt-2 leading-relaxed">{c.task}</p>
              </div>
            )}
            {c.done && (
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-[var(--d-blue)]">
                  {t.done}
                </p>
                <p className="mt-2 leading-relaxed">{c.done}</p>
              </div>
            )}
            <div className="md:col-span-2">
              <p className="text-sm font-bold uppercase tracking-wide text-[var(--d-blue)]">
                {t.result}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {c.results.map((r) => (
                  <li
                    key={r}
                    className="rounded-xl bg-[var(--d-lime)] px-3.5 py-2 font-medium text-[var(--d-blue)]"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            {c.campaign && (
              <div className="md:col-span-2 rounded-2xl bg-[var(--d-lav)] p-4">
                <p className="text-sm font-bold uppercase tracking-wide text-[var(--d-blue)]">
                  {t.campaign}
                </p>
                <p className="mt-1 leading-snug">{c.campaign}</p>
              </div>
            )}
            <a
              href={contactHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lime justify-self-start md:col-span-2"
            >
              {t.similar}
            </a>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}

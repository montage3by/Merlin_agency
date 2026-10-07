"use client";

import { useRef } from "react";
import { CONTENT, type Locale } from "@/lib/content";
import { ArrowIcon } from "./Brand";
import { AGENCY_COPY } from "./copy";

export function CasesCarousel({ locale }: { locale: Locale }) {
  const track = useRef<HTMLDivElement>(null);
  const t = AGENCY_COPY[locale];
  const { CASES, SHOW_CLIENT_NAMES } = CONTENT[locale];

  function scroll(dir: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={track}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:px-5"
      >
        {CASES.map((c, i) => {
          const blue = i % 3 === 0;
          return (
            <article
              key={c.niche}
              data-card
              className="flex w-[86vw] shrink-0 snap-start flex-col sm:w-[440px]"
            >
              <div
                className={`relative flex aspect-[5/4] flex-col justify-between overflow-hidden rounded-[22px] p-5 md:p-6 ${
                  blue
                    ? "bg-[var(--a-blue)] text-white"
                    : i % 3 === 1
                      ? "bg-[var(--a-ink)] text-[var(--a-bg)]"
                      : "bg-[var(--a-soft)]"
                }`}
              >
                <div className="flex items-start justify-between gap-3 text-[13px] uppercase tracking-[-0.03em]">
                  <span>( {String(i + 1).padStart(2, "0")} )</span>
                  <span className="text-right">{c.geo}</span>
                </div>
                <div>
                  <p
                    className={`giant whitespace-nowrap ${
                      c.headline.length > 5
                        ? "text-[clamp(56px,6.4vw,92px)]"
                        : "text-[clamp(64px,9vw,120px)]"
                    }`}
                  >
                    {c.headline}
                  </p>
                  <p className="mt-3 max-w-[22ch] text-lg font-medium leading-tight tracking-[-0.04em]">
                    {c.headlineLabel}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-3 px-1 pt-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="pill">{c.niche}</span>
                  {SHOW_CLIENT_NAMES && c.client && (
                    <span className="pill">{c.client}</span>
                  )}
                </div>
                {c.task && (
                  <p className="text-[15px] leading-snug">
                    <span className="text-[var(--a-mute)]">{t.task}</span>
                    {c.task}
                  </p>
                )}
                {c.done && (
                  <p className="text-[15px] leading-snug">
                    <span className="text-[var(--a-mute)]">{t.done}</span>
                    {c.done}
                  </p>
                )}
                <ul className="mt-1 flex flex-col gap-1 border-t border-[var(--a-line)] pt-3 text-[15px] font-medium leading-snug">
                  {c.results.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                  {c.campaign && (
                    <li className="font-normal text-[var(--a-mute)]">
                      {c.campaign}
                    </li>
                  )}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between px-4 md:px-5">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label={t.prevCase}
          className="grid size-11 place-items-center rounded-full border border-current transition-colors hover:bg-[var(--a-ink)] hover:text-[var(--a-bg)]"
        >
          <ArrowIcon flip className="size-5" />
        </button>
        <span className="text-[13px] uppercase tracking-[-0.03em]">
          {t.swipe}
        </span>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label={t.nextCase}
          className="grid size-11 place-items-center rounded-full border border-current transition-colors hover:bg-[var(--a-ink)] hover:text-[var(--a-bg)]"
        >
          <ArrowIcon className="size-5" />
        </button>
      </div>
    </div>
  );
}

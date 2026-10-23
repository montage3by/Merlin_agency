import Link from "next/link";
import type { Case } from "@/lib/agency-content";
import { LOCALE_PATH, type Locale } from "@/lib/content";
import { AI_COPY } from "./copy";

export function CaseDetail({
  c,
  showNames,
  contactHref,
  locale,
}: {
  c: Case;
  showNames: boolean;
  contactHref: string;
  locale: Locale;
}) {
  const t = AI_COPY[locale];
  const home = LOCALE_PATH[locale];
  const casesHref = `${home === "/" ? "" : home}/#cases`;

  return (
    <div className="min-h-full bg-[var(--d-bg)] text-[var(--d-blue)]">
      <header className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-6 md:px-0">
        <Link
          href={home}
          className="text-lg font-bold uppercase tracking-[-0.05em] text-[var(--d-blue)]"
        >
          Merlin<span className="font-light">Agency</span>
        </Link>
        <a
          href={contactHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-lime !py-2 text-sm"
        >
          {t.contactUs}
        </a>
      </header>

      <main className="mx-auto max-w-4xl px-4 pb-24 md:px-0">
        <Link
          href={casesHref}
          className="inline-flex items-center gap-1.5 text-sm font-bold uppercase text-[var(--d-blue)]/70 hover:text-[var(--d-blue)]"
        >
          ← {t.caseBack}
        </Link>

        <div className="mt-6 flex flex-wrap gap-1.5">
          <span className="rounded-md bg-[var(--d-lav)] px-2 py-0.5 text-xs font-bold uppercase text-[var(--d-blue)]">
            {c.geo}
          </span>
          <span className="rounded-md bg-[var(--d-lav)] px-2 py-0.5 text-xs font-bold uppercase text-[var(--d-blue)]">
            {c.niche}
          </span>
          {showNames && c.client && (
            <span className="rounded-md bg-[var(--d-blue)] px-2 py-0.5 text-xs font-bold uppercase text-white">
              {c.client}
            </span>
          )}
        </div>

        <h1 className="head mt-4 text-[clamp(32px,6vw,64px)]">{c.hook}</h1>

        <div className="mt-8 flex flex-wrap items-end gap-4 rounded-3xl bg-[var(--d-blue)] p-6 text-white md:p-10">
          <p className="text-[clamp(48px,8vw,96px)] font-bold leading-none tracking-[-0.06em]">
            {c.headline}
          </p>
          <p className="max-w-[28ch] pb-2 text-lg font-medium leading-tight text-white/75">
            {c.headlineLabel}
          </p>
        </div>

        <article className="prose-case mt-10 flex flex-col gap-5 text-lg leading-relaxed">
          {c.story.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </article>

        <div className="mt-10 grid gap-6 rounded-3xl bg-white p-6 md:grid-cols-2 md:p-10">
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
            <div className="rounded-2xl bg-[var(--d-lav)] p-4 md:col-span-2">
              <p className="text-sm font-bold uppercase tracking-wide text-[var(--d-blue)]">
                {t.campaign}
              </p>
              <p className="mt-1 leading-snug">{c.campaign}</p>
            </div>
          )}
        </div>

        <div className="mt-14 rounded-3xl bg-[var(--d-lav)] p-8 text-center md:p-14">
          <h2 className="head text-[clamp(32px,5vw,56px)]">
            {t.cta.title[0]} {t.cta.title[1]}
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] leading-relaxed">
            {t.cta.text}
          </p>
          <a
            href={contactHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lime mt-6 inline-flex"
          >
            {t.cta.button}
          </a>
        </div>
      </main>
    </div>
  );
}

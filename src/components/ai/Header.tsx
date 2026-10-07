"use client";

import Link from "next/link";
import { useState } from "react";
import { CONTENT, LOCALE_PATH, type Locale } from "@/lib/content";
import { AI_COPY } from "./copy";

const ANCHORS = ["#services", "#cases", "#approach", "#audit"];

export function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const t = AI_COPY[locale];
  const { CONTACTS } = CONTENT[locale];
  const other: Locale = locale === "ru" ? "en" : "ru";

  return (
    <>
      <div className="px-3 pt-3">
        <p className="mx-auto max-w-3xl rounded-xl bg-[var(--d-lav)] px-4 py-2 text-center text-sm leading-snug">
          {t.announce}{" "}
          <Link
            href="/audit"
            className="font-medium text-[var(--d-blue)] underline underline-offset-2"
          >
            {t.announceLink}
          </Link>
        </p>
      </div>
      <header className="sticky top-0 z-50 bg-[var(--d-bg)]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
          <a
            href="#top"
            aria-label={t.toTop}
            className="text-xl font-bold uppercase tracking-[-0.05em] text-[var(--d-blue)]"
          >
            Merlin<span className="font-light">Agency</span>
          </a>
          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label={t.sections}
          >
            {t.nav.map((label, i) => (
              <a
                key={label}
                href={ANCHORS[i]}
                className="text-[15px] hover:text-[var(--d-blue)]"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href={LOCALE_PATH[other]}
              hrefLang={other}
              aria-label={t.langSwitch}
              className="rounded-[10px] px-2 py-2 text-sm font-medium text-[var(--d-blue)] hover:bg-[var(--d-lav)]"
            >
              {other.toUpperCase()}
            </Link>
            <a
              href={CONTACTS.telegram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lime hidden !py-2 text-sm sm:inline-flex"
            >
              {t.contactUs}
            </a>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-[10px] text-[var(--d-blue)] md:hidden"
              aria-expanded={open}
              aria-controls="ai-menu"
              aria-label={open ? t.close : t.menu}
              onClick={() => setOpen((v) => !v)}
            >
              <svg
                viewBox="0 0 24 24"
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                {open ? (
                  <path d="M6 6l12 12M18 6 6 18" />
                ) : (
                  <path d="M4 7h16M8 12h12M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {open && (
          <nav
            id="ai-menu"
            aria-label={t.sections}
            className="flex flex-col gap-1 px-4 pb-5 md:hidden"
          >
            {t.nav.map((label, i) => (
              <a
                key={label}
                href={ANCHORS[i]}
                onClick={() => setOpen(false)}
                className="head py-2 text-4xl"
              >
                {label}
              </a>
            ))}
            <a
              href={CONTACTS.telegram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lime mt-3 self-start"
            >
              {t.contactUs}
            </a>
          </nav>
        )}
      </header>
    </>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { CONTENT, LOCALE_PATH, type Locale } from "@/lib/content";
import { Wordmark } from "./Brand";
import { AGENCY_COPY } from "./copy";

export function AgencyHeader({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const t = AGENCY_COPY[locale];
  const { CONTACTS, NAV } = CONTENT[locale];
  const other: Locale = locale === "ru" ? "en" : "ru";

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[var(--a-bg)]/85 text-[var(--a-ink)] backdrop-blur-md">
      <div className="grid grid-cols-[1fr_auto] items-center gap-4 px-4 py-4 md:grid-cols-[1fr_auto_1fr] md:px-5">
        <a
          href="#top"
          aria-label={t.toTop}
          className="text-[22px] leading-none md:text-[26px]"
        >
          <Wordmark />
        </a>

        <nav className="hidden items-center gap-5 md:flex" aria-label={t.sectionsLabel}>
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="pill">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <Link
            href={LOCALE_PATH[other]}
            hrefLang={other}
            aria-label={t.langSwitch}
            className="pill"
          >
            {other.toUpperCase()}
          </Link>
          <Link href="/audit" className="pill hidden sm:inline-flex">
            {t.headerAudit}
          </Link>
          <a
            href={CONTACTS.telegram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="pill hidden md:inline-flex"
          >
            {t.headerWrite}
          </a>
          <button
            type="button"
            className="pill md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? t.close : t.menu}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label={t.sectionsLabel}
          className="mx-4 flex flex-col items-start gap-3 pb-6 md:hidden"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="giant text-5xl"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href="/audit" className="pill">
              {t.headerAudit}
            </Link>
            <a
              href={CONTACTS.telegram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="pill"
            >
              Telegram
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { CONTACTS, NAV } from "@/lib/agency-content";
import { Wordmark } from "./Brand";

export function AgencyHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[var(--a-bg)]/85 text-[var(--a-ink)] backdrop-blur-md">
      <div className="grid grid-cols-[1fr_auto] items-center gap-4 px-4 py-4 md:grid-cols-[1fr_auto_1fr] md:px-5">
        <a
          href="#top"
          aria-label="Merlin Agency, наверх"
          className="w-[150px] md:w-[180px]"
        >
          <Wordmark />
        </a>

        <nav className="hidden items-center gap-5 md:flex" aria-label="Разделы">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="pill">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <Link href="/audit" className="pill hidden sm:inline-flex">
            Бесплатный аудит
          </Link>
          <a
            href={CONTACTS.telegram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="pill hidden md:inline-flex"
          >
            Написать
          </a>
          <button
            type="button"
            className="pill md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Закрыть" : "Меню"}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Разделы"
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
              Бесплатный аудит
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

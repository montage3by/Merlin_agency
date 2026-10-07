import Link from "next/link";
import { CONTENT, LOCALE_PATH, type Locale } from "@/lib/content";
import { FLIP_COPY } from "./copy";
import { Logo } from "./Logo";

const ANCHORS = ["#services", "#cases", "#approach", "#audit"];

export function Header({ locale }: { locale: Locale }) {
  const t = FLIP_COPY[locale].header;
  const { CONTACTS } = CONTENT[locale];
  const other: Locale = locale === "ru" ? "en" : "ru";

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4">
        <a href="#top" aria-label={t.toTop}>
          <Logo />
        </a>
        <nav
          className="hidden items-center gap-7 text-sm text-[var(--f-mute)] md:flex"
          aria-label={t.sections}
        >
          {t.nav.map((label, i) => (
            <a
              key={label}
              href={ANCHORS[i]}
              className="hover:text-[var(--f-ink)]"
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
            className="rounded-full border border-[var(--f-line)] px-3 py-2 text-sm font-medium hover:border-[var(--f-ink)]"
          >
            {other.toUpperCase()}
          </Link>
          <a
            href={CONTACTS.telegram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-orange !px-4 !py-2 text-sm"
          >
            {t.write}
          </a>
        </div>
      </div>
    </header>
  );
}

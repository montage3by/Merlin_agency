import Link from "next/link";
import { CONTENT, LOCALE_PATH, type Locale } from "@/lib/content";
import { AI_COPY } from "./copy";

export function SiteFooter({
  locale,
  onHomePage = true,
}: {
  locale: Locale;
  /** false на внутренних страницах — якоря в навигации ведут на главную. */
  onHomePage?: boolean;
}) {
  const t = AI_COPY[locale];
  const { CASES, CONTACTS, NAV, SERVICES } = CONTENT[locale];
  const home = LOCALE_PATH[locale];
  const casesPrefix = home === "/" ? "" : home;
  const anchorHref = (a: string) => (onHomePage ? a : `${home}${a}`);

  return (
    <footer className="bg-[var(--d-blue)] px-4 pb-8 pt-14 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.3fr_1.2fr]">
        <div>
          <p className="inline-block rounded bg-white px-1.5 text-[11px] font-bold uppercase text-[var(--d-blue)]">
            {t.footer.company}
          </p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={anchorHref(n.href)}
                  className="font-bold uppercase tracking-[-0.02em] hover:text-[var(--d-lime)]"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="inline-block rounded bg-white px-1.5 text-[11px] font-bold uppercase text-[var(--d-blue)]">
            {t.footer.services}
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-[15px] text-white/85">
            {SERVICES.map((s) => (
              <li key={s.title}>{s.title}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="inline-block rounded bg-white px-1.5 text-[11px] font-bold uppercase text-[var(--d-blue)]">
            {t.footer.cases}
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-[15px] text-white/85">
            {CASES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`${casesPrefix}/cases/${c.slug}`}
                  className="hover:text-[var(--d-lime)]"
                >
                  <span className="font-bold text-white">{c.headline}</span>{" "}
                  {c.niche}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="inline-block rounded bg-white px-1.5 text-[11px] font-bold uppercase text-[var(--d-blue)]">
            {t.footer.contacts}
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-[15px]">
            <li>
              <a
                href={CONTACTS.telegram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--d-lime)]"
              >
                Telegram {CONTACTS.telegram.value}
              </a>
            </li>
            <li>
              <a
                href={CONTACTS.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--d-lime)]"
              >
                WhatsApp {CONTACTS.whatsapp.value}
              </a>
            </li>
            <li>
              <a href={CONTACTS.phone.href} className="hover:text-[var(--d-lime)]">
                {CONTACTS.phone.value}
              </a>
            </li>
            <li>
              <a href={CONTACTS.email.href} className="hover:text-[var(--d-lime)]">
                {CONTACTS.email.value}
              </a>
            </li>
          </ul>
          <div className="mt-6 rounded-2xl bg-[var(--d-pink)] p-5 text-[var(--d-blue)]">
            <p className="font-bold leading-tight">{t.footer.auditCard}</p>
            <Link
              href="/audit"
              className="mt-3 inline-flex rounded-[10px] bg-[var(--d-blue)] px-4 py-2 text-sm font-medium text-white"
            >
              {t.footer.auditButton}
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-white/20 pt-6 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-3xl font-bold uppercase tracking-[-0.05em]">
          Merlin<span className="font-light">Agency</span>
        </p>
        <p className="text-sm text-white/70">
          {t.footer.place} · © {new Date().getFullYear()} Merlin Agency
        </p>
      </div>
    </footer>
  );
}

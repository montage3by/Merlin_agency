import Link from "next/link";
import { AgencyHeader } from "@/components/agency/AgencyHeader";
import {
  Bracket,
  ArrowIcon,
  ChromeStar,
  Sparkle,
  Wordmark,
} from "@/components/agency/Brand";
import { CasesCarousel } from "@/components/agency/CasesCarousel";
import { Marquee } from "@/components/agency/Marquee";
import { MODE_INIT_SCRIPT, ModeToggle } from "@/components/agency/ModeToggle";
import { Reveal } from "@/components/Reveal";
import { CONTENT, type Locale } from "@/lib/content";
import { AGENCY_COPY } from "./copy";

const STICKER_POSITIONS = [
  "left-[2%] top-[18%] -rotate-6",
  "right-[4%] top-[8%] rotate-3",
  "right-[0%] bottom-[30%] -rotate-3",
  "left-[8%] bottom-[16%] rotate-6",
];

export function AgencyLanding({ locale }: { locale: Locale }) {
  const t = AGENCY_COPY[locale];
  const {
    CONTACTS,
    GEO,
    NAV,
    NICHES,
    SERVICES,
    STATS,
    STEPS,
    TICKER,
    TOOLS,
    TRAITS,
    AUDIT_STEPS,
  } = CONTENT[locale];

  return (
    <div
      id="top"
      lang={locale}
      className="agency flex min-h-full flex-1 flex-col overflow-x-clip"
    >
      <script dangerouslySetInnerHTML={{ __html: MODE_INIT_SCRIPT }} />
      <AgencyHeader locale={locale} />

      <main className="flex-1">
        {/* ───── Hero ───── */}
        <section className="relative flex min-h-[100svh] flex-col px-4 pb-6 pt-24 md:px-5 md:pt-28">
          <div className="grid flex-1 items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Reveal>
                <h1 className="giant relative text-[clamp(84px,17vw,280px)] lg:text-[clamp(84px,13.4vw,260px)]">
                  <span className="block">
                    Merlin
                    <span className="ml-3 hidden align-top text-[13px] font-normal tracking-[-0.03em] sm:inline">
                      {t.years}
                    </span>
                  </span>
                  <span className="block">Agency</span>
                </h1>
                <p className="mt-10 pl-2 text-[13px] uppercase tracking-[-0.03em] md:mt-12">
                  {t.tagline}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-[1fr_auto] md:items-start md:gap-10">
                  <div>
                    <p className="max-w-[24ch] text-[clamp(22px,2vw,28px)] font-bold uppercase leading-[0.95] tracking-[-0.06em]">
                      {t.heroTitle}
                    </p>
                    <p className="mt-4 max-w-[46ch] text-[15px] uppercase leading-[1.15] tracking-[-0.03em]">
                      {t.heroText}
                    </p>
                  </div>
                  <a
                    href="#contact"
                    className="pill pill-lg self-start justify-self-start"
                  >
                    {t.discuss}
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal
              delay={0.2}
              className="relative mx-auto w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[520px]"
            >
              <div className="relative aspect-square">
                <div className="absolute inset-[6%] rounded-full bg-[var(--a-blue)]" />
                <div className="float absolute inset-0 grid place-items-center">
                  <ChromeStar
                    id="hero-star"
                    className="w-[78%] drop-shadow-[0_30px_40px_rgba(0,0,40,0.35)]"
                  />
                </div>
                {t.stickers.map((text, i) => (
                  <span
                    key={text}
                    className={`absolute rounded-full border border-[var(--a-ink)] bg-[var(--a-bg)] px-2.5 py-1 text-[11px] font-medium sm:px-3 sm:py-1.5 sm:text-[13px] uppercase leading-none tracking-[-0.03em] shadow-sm ${STICKER_POSITIONS[i]}`}
                  >
                    {text}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-4 text-[15px] tracking-[-0.03em]">
            <Bracket left={t.bracketLeft} right={t.bracketRight} />
            <ModeToggle />
          </div>
        </section>

        {/* ───── Ticker ───── */}
        <div className="border-y border-[var(--a-line)] py-2.5 text-[13px] uppercase tracking-[-0.03em]">
          <Marquee duration={45}>
            {TICKER.map(([a, b]) => (
              <span key={a} className="flex items-center">
                <span className="px-10">
                  <Bracket left={a} right={b} />
                </span>
                <Sparkle className="size-4" />
              </span>
            ))}
          </Marquee>
        </div>

        {/* ───── Statement ───── */}
        <section className="relative px-4 py-20 md:px-5 md:py-32">
          <p className="text-center text-[13px] uppercase tracking-[-0.03em]">
            <Bracket left={t.nichesBracket} />
          </p>
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
            <Reveal>
              <h2 className="giant text-[clamp(52px,6.4vw,104px)] leading-[0.88]">
                {t.statementTitle}
                <span className="ml-2 inline-block whitespace-nowrap align-top text-[13px] font-normal tracking-[-0.03em]">
                  {t.statementNote}
                </span>
              </h2>
            </Reveal>
            <div className="relative mx-auto w-[46vw] max-w-[220px] [perspective:900px] lg:w-[220px]">
              <ChromeStar id="coin-star" className="coin w-full" />
              <a
                href="#cases"
                className="pill absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--a-bg)]"
              >
                {t.casesPill}
              </a>
            </div>
            <Reveal delay={0.1}>
              <p className="giant text-right text-[clamp(40px,4.6vw,76px)] leading-[0.9]">
                {t.statementRight}
              </p>
            </Reveal>
          </div>
          <p className="ml-auto mt-12 max-w-[34ch] text-right text-[13px] uppercase leading-[1.2] tracking-[-0.03em]">
            {t.founder}
          </p>
        </section>

        {/* ───── Stats ───── */}
        <section className="border-t border-[var(--a-line)] px-4 py-16 md:px-5 md:py-24">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="giant text-[clamp(52px,8vw,128px)]">{t.statsTitle}</h2>
            <span className="text-[13px] uppercase tracking-[-0.03em]">
              {t.statsNote}
            </span>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[22px] border border-[var(--a-line)] bg-[var(--a-line)] sm:grid-cols-2 lg:grid-cols-3">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="flex h-full min-h-[220px] flex-col justify-between gap-6 bg-[var(--a-bg)] p-6 transition-colors hover:bg-[var(--a-blue)] hover:text-white"
              >
                <span className="text-[13px] uppercase tracking-[-0.03em]">
                  ( {String(i + 1).padStart(2, "0")} )
                </span>
                <div>
                  <p className="giant text-[clamp(56px,6vw,96px)]">
                    {s.value}
                    {s.unit && (
                      <span className="ml-2 text-[0.4em] tracking-[-0.05em]">
                        {s.unit}
                      </span>
                    )}
                  </p>
                  <p className="mt-3 max-w-[30ch] text-[15px] uppercase leading-[1.15] tracking-[-0.03em]">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───── Services ───── */}
        <section
          id="services"
          className="scroll-mt-16 px-4 py-16 md:px-5 md:py-24"
        >
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="giant text-[clamp(52px,8vw,128px)]">{t.servicesTitle}</h2>
            <span className="text-[13px] uppercase tracking-[-0.03em]">
              {t.servicesNote}
            </span>
          </div>
          <p className="mt-6 max-w-[52ch] text-[15px] uppercase leading-[1.15] tracking-[-0.03em]">
            {t.servicesIntro}
          </p>
          <ol className="mt-12 border-t border-[var(--a-line)]">
            {SERVICES.map((s, i) => (
              <li
                key={s.title}
                className="group border-b border-[var(--a-line)]"
              >
                <Reveal>
                  <div className="grid gap-4 py-6 transition-colors md:grid-cols-[80px_1.1fr_1fr] md:items-baseline md:gap-8 md:py-8">
                    <span className="text-[13px] uppercase tracking-[-0.03em]">
                      ( {String(i + 1).padStart(2, "0")} )
                    </span>
                    <h3 className="giant text-[clamp(34px,4vw,64px)] leading-[0.9] transition-colors group-hover:text-[var(--a-blue)]">
                      {s.title}
                    </h3>
                    <div>
                      <p className="max-w-[48ch] text-[17px] leading-snug tracking-[-0.02em]">
                        {s.body}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {s.tags.map((t) => (
                          <span key={t} className="pill">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        {/* ───── Blue band ───── */}
        <div className="bg-[var(--a-blue)] py-6 text-white md:py-8">
          <Marquee duration={30}>
            {[0, 1].map((k) => (
              <span key={k} className="flex items-center">
                <span className="giant px-8 text-[clamp(56px,9vw,150px)]">
                  {t.band}
                </span>
                <Sparkle className="size-[clamp(40px,6vw,96px)]" />
              </span>
            ))}
          </Marquee>
        </div>

        {/* ───── Cases ───── */}
        <section id="cases" className="scroll-mt-16 py-16 md:py-24">
          <div className="flex items-baseline justify-between gap-4 px-4 md:px-5">
            <h2 className="giant text-[clamp(52px,8vw,128px)]">{t.casesTitle}</h2>
            <span className="hidden text-[13px] uppercase tracking-[-0.03em] sm:inline">
              {t.casesNote}
            </span>
          </div>
          <p className="mt-6 max-w-[52ch] px-4 text-[15px] uppercase leading-[1.15] tracking-[-0.03em] md:px-5">
            {t.casesIntro}
          </p>
          <div className="mt-12">
            <CasesCarousel locale={locale} />
          </div>
        </section>

        {/* ───── Manifest ───── */}
        <section className="border-t border-[var(--a-line)] px-4 py-20 text-center md:px-5 md:py-32">
          <Reveal>
            <p className="mx-auto max-w-[24ch] text-[clamp(26px,3vw,44px)] font-bold uppercase leading-[0.95] tracking-[-0.06em]">
              {t.manifestTitle}
            </p>
            <Sparkle className="mx-auto mt-8 size-10 text-[var(--a-blue)]" />
            <p className="mx-auto mt-8 max-w-[70ch] text-[13px] uppercase leading-[1.25] tracking-[-0.02em]">
              {t.manifestText}
            </p>
            <p className="mt-10 text-[13px] uppercase tracking-[-0.03em]">
              <Bracket left={t.manifestBracket} />
            </p>
          </Reveal>
        </section>

        {/* ───── Approach ───── */}
        <section
          id="approach"
          className="scroll-mt-16 border-t border-[var(--a-line)] px-4 py-16 md:px-5 md:py-24"
        >
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="giant text-[clamp(52px,8vw,128px)]">{t.approachTitle}</h2>
            <span className="text-[13px] uppercase tracking-[-0.03em]">
              {t.approachNote}
            </span>
          </div>
          <Reveal>
            <div className="mt-12 grid gap-px overflow-hidden rounded-[22px] border border-[var(--a-line)] bg-[var(--a-line)] md:grid-cols-5">
              {STEPS.map((s, i) => (
                <div
                  key={s.title}
                  className="flex h-full flex-col gap-10 bg-[var(--a-bg)] p-5 md:min-h-[300px] md:justify-between"
                >
                  <span className="giant text-[clamp(56px,5vw,88px)] text-[var(--a-blue)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-2xl font-medium tracking-[-0.05em]">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-snug">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-x-16">
            {TRAITS.map((t, i) => (
              <Reveal key={t.title} delay={(i % 2) * 0.08}>
                <div className="border-t border-[var(--a-line)] pt-5">
                  <h3 className="text-[clamp(26px,2.4vw,36px)] font-medium leading-none tracking-[-0.06em]">
                    {t.title}
                  </h3>
                  <p className="mt-3 max-w-[50ch] text-[17px] leading-snug tracking-[-0.02em]">
                    {t.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ───── Niches & geography ───── */}
        <section className="border-t border-[var(--a-line)] px-4 py-16 md:px-5 md:py-24">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="giant text-[clamp(44px,5.6vw,96px)]">{t.nichesTitle}</h2>
                <span className="text-[13px] uppercase tracking-[-0.03em]">
                  ( 10+ )
                </span>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {NICHES.map((n) => (
                  <span key={n} className="pill pill-lg">
                    {n}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="giant text-[clamp(44px,5.6vw,96px)]">
                  {t.geoTitle}
                </h2>
                <span className="text-[13px] uppercase tracking-[-0.03em]">
                  {t.geoNote}
                </span>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {GEO.map((g) => (
                  <span key={g} className="pill pill-lg">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── Tools ───── */}
        <div className="border-y border-[var(--a-line)] py-4">
          <Marquee duration={60} reverse>
            {TOOLS.map((t) => (
              <span key={t} className="flex items-center gap-4 pr-4">
                <span className="pill pill-lg">{t}</span>
                <Sparkle className="size-3" />
              </span>
            ))}
          </Marquee>
        </div>

        {/* ───── Audit ───── */}
        <section
          id="audit"
          className="scroll-mt-16 px-4 py-16 md:px-5 md:py-24"
        >
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="giant text-[clamp(52px,8vw,128px)]">{t.auditTitle}</h2>
            <span className="text-[13px] uppercase tracking-[-0.03em]">
              {t.auditNote}
            </span>
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <Reveal>
              <p className="max-w-[22ch] text-[clamp(24px,2.6vw,36px)] font-bold uppercase leading-[0.95] tracking-[-0.06em]">
                {t.auditLead}
              </p>
              <p className="mt-5 max-w-[46ch] text-[15px] uppercase leading-[1.15] tracking-[-0.03em]">
                {t.auditSources}
              </p>
              <Link href="/audit" className="pill pill-lg mt-8">
                {t.auditButton}
              </Link>
            </Reveal>
            <ol className="grid gap-px overflow-hidden rounded-[22px] border border-[var(--a-line)] bg-[var(--a-line)] sm:grid-cols-3">
              {AUDIT_STEPS.map((step, i) => (
                <li
                  key={step.title}
                  className="flex flex-col gap-8 bg-[var(--a-bg)] p-5 sm:min-h-[260px] sm:justify-between"
                >
                  <span className="giant text-[clamp(48px,4.6vw,72px)] text-[var(--a-blue)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-2xl font-medium tracking-[-0.05em]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-snug">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───── CTA ───── */}
        <section
          id="contact"
          className="relative scroll-mt-0 overflow-hidden bg-[var(--a-blue)] px-4 pb-10 pt-20 text-white md:px-5 md:pt-28"
        >
          <div className="relative text-center">
            <h2 className="giant text-[clamp(64px,15vw,250px)] uppercase leading-[0.82]">
              {t.ctaTitle[0]}
              <br />
              {t.ctaTitle[1]}
            </h2>
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="float w-[clamp(90px,14vw,220px)]">
                <ChromeStar
                  id="cta-star"
                  className="w-full drop-shadow-[0_24px_30px_rgba(0,0,40,0.45)]"
                />
              </div>
            </div>
          </div>

          <p className="mx-auto mt-10 max-w-[48ch] text-center text-[13px] uppercase leading-[1.25] tracking-[-0.02em]">
            {t.ctaText}
          </p>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <a
              href={CONTACTS.telegram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-6 border-b border-white pb-2 lg:max-w-[720px]"
            >
              <span className="giant text-[clamp(34px,4.4vw,64px)] leading-none sm:whitespace-nowrap">
                {t.ctaTelegram}
              </span>
              <ArrowIcon className="size-10 shrink-0 transition-transform group-hover:translate-x-2 md:size-14" />
            </a>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <a
                href={CONTACTS.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pill hover:!bg-white hover:!text-[var(--a-blue)]"
              >
                WhatsApp {CONTACTS.whatsapp.value}
              </a>
              <a
                href={CONTACTS.phone.href}
                className="pill hover:!bg-white hover:!text-[var(--a-blue)]"
              >
                {CONTACTS.phone.value}
              </a>
              <a
                href={CONTACTS.email.href}
                className="pill hover:!bg-white hover:!text-[var(--a-blue)]"
              >
                {CONTACTS.email.value}
              </a>
              <Link
                href="/audit"
                className="pill hover:!bg-white hover:!text-[var(--a-blue)]"
              >
                {t.ctaAudit}
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ───── Footer ───── */}
      <footer className="px-4 pb-6 pt-14 md:px-5 md:pt-20">
        <Wordmark className="giant block text-[clamp(48px,14vw,240px)] text-[var(--a-blue)]" />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_auto_auto] lg:items-start lg:gap-16">
          <div>
            <div className="flex flex-wrap gap-2">
              <a
                href={CONTACTS.telegram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pill"
              >
                Telegram
              </a>
              <a
                href={CONTACTS.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pill"
              >
                WhatsApp
              </a>
              <a href={CONTACTS.email.href} className="pill">
                Email
              </a>
            </div>
          </div>
          <Sparkle className="hidden size-6 self-center text-[var(--a-mute)] lg:block" />
          <div className="grid grid-cols-[auto_1fr_1fr] gap-x-8 gap-y-1 text-[13px] uppercase tracking-[-0.03em]">
            <span className="whitespace-nowrap font-bold">( Nav )</span>
            <ul className="flex flex-col gap-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-[var(--a-blue)]">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-1">
              <li>
                <Link href="/audit" className="hover:text-[var(--a-blue)]">
                  {t.footerAudit}
                </Link>
              </li>
              <li>{t.footerCity}</li>
              <li>{t.footerRemote}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-[var(--a-line)] pt-4 text-[13px] uppercase tracking-[-0.03em]">
          <span>© {new Date().getFullYear()} Merlin Agency</span>
          <ModeToggle className="!text-[13px] !font-normal" />
        </div>
      </footer>
    </div>
  );
}

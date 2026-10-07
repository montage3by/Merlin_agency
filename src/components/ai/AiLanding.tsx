import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { CONTENT, type Locale } from "@/lib/content";
import { AI_COPY } from "./copy";
import { Header } from "./Header";
import { GrowthArt, SearchArt, TargetArt } from "./Illustrations";
import { Marquee } from "./Marquee";

// Плашки для трёх главных услуг: цвет фона и иллюстрация.
const FEATURE_TILES = [
  { bg: "bg-[var(--d-pink)]", ink: "text-[#4a1450]", Art: SearchArt },
  { bg: "bg-[var(--d-lime)]", ink: "text-[#23400a]", Art: GrowthArt },
  { bg: "bg-[var(--d-cyan)]", ink: "text-[#062a55]", Art: TargetArt },
];

const CASE_TILES = [
  "bg-[var(--d-blue)] text-white",
  "bg-[var(--d-pink)] text-[#3a0f40]",
  "bg-[var(--d-lime)] text-[var(--d-blue)]",
  "bg-[var(--d-cyan)] text-[#06244a]",
];

// Значения для «дашборда» в тёмном блоке: только цифры из кейсов.
const PANEL_VALUES = {
  ru: ["+320%", "9,65%", "5% до 20%", "−23%"],
  en: ["+320%", "9.65%", "5% to 20%", "−23%"],
};
const CTA_CHIPS = {
  ru: ["+320%", "№1", "CTR 9,65%", "CPA $18", "−23% CPL", "в 4 раза"],
  en: ["+320%", "#1", "CTR 9.65%", "CPA $18", "−23% CPL", "4x"],
};

export function AiLanding({ locale }: { locale: Locale }) {
  const t = AI_COPY[locale];
  const {
    AUDIT_STEPS,
    CASES,
    CONTACTS,
    GEO,
    NAV,
    SERVICES,
    SHOW_CLIENT_NAMES,
    STATS,
    STEPS,
    TOOLS,
    TRAITS,
  } = CONTENT[locale];
  const panelValues = PANEL_VALUES[locale];
  const featured = SERVICES.slice(0, 3);
  const rest = SERVICES.slice(3);

  return (
    <div
      id="top"
      lang={locale}
      className="aid flex min-h-full flex-1 flex-col overflow-x-clip"
    >
      <Header locale={locale} />

      <main className="flex-1">
        {/* ───── Hero ───── */}
        <section className="px-4 pb-10 pt-8 md:px-8 md:pb-16 md:pt-14">
          <div className="relative mx-auto max-w-7xl">
            <svg
              viewBox="0 0 1400 300"
              preserveAspectRatio="none"
              aria-hidden
              className="pointer-events-none absolute -inset-x-6 top-1/2 h-[150%] w-[calc(100%+3rem)] -translate-y-1/2"
            >
              <path
                className="draw-line"
                pathLength={1}
                d="M-30 170 C 90 160 120 40 240 60 S 300 270 410 230 S 500 30 620 70 S 690 290 800 240 S 850 50 960 90 S 1010 270 1110 220 S 1190 30 1290 80 S 1380 140 1440 110"
                fill="none"
                stroke="var(--d-lime)"
                strokeWidth="34"
                strokeLinecap="round"
              />
            </svg>
            <h1 className="head relative text-center text-[clamp(56px,15vw,210px)] leading-[0.86]">
              <span className="block sm:inline">Merlin</span>
              <span
                aria-hidden
                className="mx-[0.12em] hidden w-[0.9em] flex-col justify-center gap-[0.09em] align-middle sm:inline-flex"
              >
                <span className="h-[0.1em] bg-current" />
                <span className="h-[0.1em] bg-current" />
                <span className="h-[0.1em] bg-current" />
              </span>
              <span className="block sm:inline">Agency</span>
            </h1>
          </div>

          <Reveal className="mx-auto mt-14 max-w-3xl text-center md:mt-24">
            <h2 className="head text-[clamp(30px,5vw,56px)] normal-case tracking-[-0.04em]">
              {t.heroTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-[56ch] text-[17px] leading-relaxed md:text-lg">
              {t.heroText}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#contact" className="btn-lime w-full sm:w-auto">
                {t.contactUs}
              </a>
              <a
                href="#cases"
                className="btn-line w-full text-[var(--d-blue)] sm:w-auto"
              >
                {t.results.cases}
              </a>
            </div>
          </Reveal>
        </section>

        {/* ───── Tools strip ───── */}
        <div className="marquee-fade py-6">
          <Marquee duration={55}>
            {TOOLS.map((tool) => (
              <span
                key={tool}
                className="whitespace-nowrap px-7 text-xl font-bold tracking-[-0.04em] text-[var(--d-blue)]/45 md:px-10 md:text-2xl"
              >
                {tool}
              </span>
            ))}
          </Marquee>
        </div>

        {/* ───── Results (dark) ───── */}
        <section className="bg-[radial-gradient(120%_90%_at_80%_20%,#2b2b52_0%,#0b0b14_60%)] px-4 py-16 text-white md:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <Reveal>
              <h2 className="text-[clamp(44px,7vw,80px)] font-bold uppercase leading-[0.9] tracking-[-0.05em]">
                {t.results.title}
              </h2>
              <p className="mt-5 text-[clamp(24px,3vw,34px)] font-medium leading-tight tracking-[-0.03em]">
                {t.results.subtitle}
              </p>
              <p className="mt-5 max-w-[50ch] leading-relaxed text-white/75">
                {t.results.text}
              </p>
              <p className="mt-3 text-white/75">{t.results.note}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#cases" className="btn-lime">
                  {t.results.cases}
                </a>
                <Link href="/audit" className="btn-line">
                  {t.results.audit}
                </Link>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {t.results.panels.map((label, i) => (
                <div
                  key={label}
                  className={`rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur md:p-5 ${
                    i % 2 ? "translate-y-6" : ""
                  }`}
                >
                  <p className="text-xs text-white/60 md:text-sm">{label}</p>
                  <p className="mt-2 text-2xl font-bold tracking-[-0.04em] md:text-4xl">
                    {panelValues[i]}
                  </p>
                  <div className="mt-4 flex h-14 items-end gap-1 md:h-20">
                    {Array.from({ length: 7 }, (_, k) => (
                      <span
                        key={k}
                        className="flex-1 rounded-t"
                        style={{
                          height: `${25 + ((k * 29 + i * 17) % 55) + k * 3}%`,
                          background:
                            k === 6
                              ? [
                                  "var(--d-lime)",
                                  "var(--d-pink)",
                                  "var(--d-cyan)",
                                  "#ffffff",
                                ][i]
                              : "rgba(255,255,255,0.18)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── Services ───── */}
        <section
          id="services"
          className="scroll-mt-20 px-4 py-16 md:px-8 md:py-24"
        >
          <h2 className="head text-center text-[clamp(40px,7vw,80px)]">
            {t.servicesTitle}
          </h2>
          <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-14 md:mt-16 md:gap-20">
            {featured.map((s, i) => {
              const tile = FEATURE_TILES[i];
              return (
                <Reveal key={s.title}>
                  <div className="grid items-center gap-6 md:grid-cols-2 md:gap-14">
                    <div
                      className={`flex aspect-[4/3] items-center justify-center rounded-3xl p-8 ${tile.bg} ${tile.ink} ${
                        i % 2 ? "md:order-2" : ""
                      }`}
                    >
                      <tile.Art className="w-full max-w-[360px]" />
                    </div>
                    <div>
                      <span className="num-badge">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="head mt-3 text-[clamp(32px,4.4vw,52px)] normal-case">
                        {s.title}
                      </h3>
                      <p className="mt-4 max-w-[48ch] leading-relaxed">
                        {s.body}
                      </p>
                      <ul className="mt-4 flex list-disc flex-col gap-1 pl-5">
                        {s.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                      <a href="#contact" className="btn-lime mt-6">
                        {t.discuss}
                      </a>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <h3 className="head mx-auto mt-20 max-w-6xl text-[clamp(26px,3.4vw,40px)] normal-case">
            {t.servicesMore}
          </h3>
          <div className="mx-auto mt-6 grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((s, i) => (
              <div key={s.title} className="rounded-2xl bg-white p-6">
                <span className="num-badge">
                  {String(i + 4).padStart(2, "0")}
                </span>
                <p className="mt-3 text-xl font-bold tracking-[-0.03em] text-[var(--d-blue)]">
                  {s.title}
                </p>
                <p className="mt-2 leading-snug text-[var(--d-mute)]">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ───── Principle ───── */}
        <section className="px-4 py-16 md:px-8 md:py-24">
          <Reveal className="relative mx-auto max-w-4xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--d-blue)]">
              {t.principle.kicker}
            </p>
            <h2 className="head mt-4 text-[clamp(38px,7vw,84px)]">
              {t.principle.title[0]}
              <span className="rounded-lg bg-[var(--d-pink)] px-2">
                {t.principle.title[1]}
              </span>
              <br className="hidden sm:block" />
              {t.principle.title[2]}
            </h2>
            <p className="mx-auto mt-6 max-w-[58ch] leading-relaxed">
              {t.principle.text}
            </p>
            <a href="#approach" className="btn-lime mt-8">
              {t.principle.button}
            </a>
          </Reveal>
          <div className="mx-auto mt-14 grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TRAITS.map((trait, i) => (
              <div
                key={trait.title}
                className={`drift rounded-2xl p-5 ${
                  [
                    "bg-[var(--d-lav)]",
                    "bg-white",
                    "bg-white",
                    "bg-[var(--d-lav)]",
                  ][i]
                }`}
                style={
                  {
                    "--r": `${[-1.5, 1, -1, 1.5][i]}deg`,
                    animationDelay: `${-i * 1.7}s`,
                  } as React.CSSProperties
                }
              >
                <p className="font-bold tracking-[-0.02em] text-[var(--d-blue)]">
                  {trait.title}
                </p>
                <p className="mt-2 text-[15px] leading-snug text-[var(--d-mute)]">
                  {trait.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ───── Global ───── */}
        <section className="px-4 py-16 md:px-8 md:py-24">
          <h2 className="head text-center text-[clamp(38px,6.4vw,76px)]">
            {t.global.title[0]}
            <br />
            {t.global.title[1]}
          </h2>
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              {
                value: STATS[0].value,
                label: `${STATS[0].unit} ${STATS[0].label}`,
              },
              {
                value: STATS[1].value,
                label: `${STATS[1].unit}, ${STATS[1].label}`,
              },
              {
                value: STATS[2].value,
                label: `${STATS[2].unit}, ${STATS[2].label}`,
              },
              { value: t.global.remote, label: t.global.remoteLabel },
            ].map((s) => (
              <div
                key={s.label}
                className="flex min-h-[150px] flex-col justify-end rounded-2xl bg-[var(--d-lime)] p-5 text-[var(--d-blue)]"
              >
                <p className="text-[clamp(28px,4vw,44px)] font-bold leading-none tracking-[-0.05em]">
                  {s.value}
                </p>
                <p className="mt-2 text-[15px] font-medium leading-tight">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-3 max-w-6xl rounded-2xl bg-[var(--d-lav)] p-6 md:p-8">
            <p className="font-bold text-[var(--d-blue)]">{t.global.geo}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {GEO.map((g) => (
                <li
                  key={g}
                  className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[15px]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4 text-[var(--d-blue)]"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
                  </svg>
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───── Cases ───── */}
        <section
          id="cases"
          className="scroll-mt-20 px-4 py-16 md:px-8 md:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="head text-[clamp(40px,7vw,80px)]">{t.casesTitle}</h2>
            <p className="mt-3 text-lg text-[var(--d-mute)]">{t.casesSub}</p>
          </div>
          <div className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CASES.map((c, i) => (
              <article
                key={c.niche}
                className="flex flex-col overflow-hidden rounded-2xl bg-white"
              >
                <div
                  className={`flex aspect-[16/9] flex-col justify-end p-5 ${CASE_TILES[i % CASE_TILES.length]}`}
                >
                  <p className="text-[clamp(40px,5vw,56px)] font-bold leading-none tracking-[-0.05em]">
                    {c.headline}
                  </p>
                  <p className="mt-1 font-medium leading-tight">
                    {c.headlineLabel}
                  </p>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-md bg-[var(--d-lav)] px-2 py-0.5 text-xs font-bold uppercase text-[var(--d-blue)]">
                      {c.geo}
                    </span>
                    {SHOW_CLIENT_NAMES && c.client && (
                      <span className="rounded-md bg-[var(--d-lime)] px-2 py-0.5 text-xs font-bold uppercase text-[var(--d-blue)]">
                        {c.client}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold leading-tight tracking-[-0.02em]">
                    {c.niche}
                  </h3>
                  {c.task && (
                    <p className="text-[15px] leading-snug">
                      <span className="font-medium text-[var(--d-blue)]">
                        {t.task}.{" "}
                      </span>
                      {c.task}
                    </p>
                  )}
                  {c.done && (
                    <p className="text-[15px] leading-snug">
                      <span className="font-medium text-[var(--d-blue)]">
                        {t.done}.{" "}
                      </span>
                      {c.done}
                    </p>
                  )}
                  <ul className="mt-auto flex list-disc flex-col gap-1 pl-5 pt-2 text-[15px] leading-snug">
                    {c.results.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                  {c.campaign && (
                    <p className="text-sm text-[var(--d-mute)]">{c.campaign}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ───── Approach ───── */}
        <section
          id="approach"
          className="scroll-mt-20 px-4 py-16 md:px-8 md:py-24"
        >
          <h2 className="head mx-auto max-w-6xl text-[clamp(40px,7vw,80px)]">
            {t.approachTitle}
          </h2>
          <ol className="mx-auto mt-10 grid max-w-6xl gap-3 md:grid-cols-5">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className="flex flex-col gap-6 rounded-2xl bg-[var(--d-blue)] p-5 text-white md:min-h-[260px] md:justify-between"
              >
                <span className="num-badge self-start">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-2xl font-bold uppercase tracking-[-0.04em]">
                    {s.title}
                  </p>
                  <p className="mt-2 text-[15px] leading-snug text-white/80">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ───── Audit ───── */}
        <section id="audit" className="scroll-mt-20 px-4 py-8 md:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 rounded-3xl bg-[var(--d-lav)] p-6 md:grid-cols-[1fr_1.3fr] md:p-12">
            <div>
              <h2 className="head text-[clamp(34px,5vw,56px)]">
                {t.audit.title}
              </h2>
              <p className="mt-4 max-w-[44ch] leading-relaxed">
                {t.audit.text}
              </p>
              <Link href="/audit" className="btn-lime mt-6">
                {t.audit.button}
              </Link>
            </div>
            <ol className="grid gap-3 sm:grid-cols-3">
              {AUDIT_STEPS.map((s, i) => (
                <li key={s.title} className="rounded-2xl bg-white p-5">
                  <span className="num-badge">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 font-bold text-[var(--d-blue)]">
                    {s.title}
                  </p>
                  <p className="mt-1 text-[15px] leading-snug text-[var(--d-mute)]">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───── CTA ───── */}
        <section
          id="contact"
          className="scroll-mt-20 px-4 py-10 md:px-8 md:py-16"
        >
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[var(--d-blue)] px-6 py-16 text-center text-white md:py-24">
            {CTA_CHIPS[locale].map((chip, i) => (
              <span
                key={chip}
                aria-hidden
                className={`drift pointer-events-none absolute hidden rounded-xl bg-white/10 px-4 py-3 text-xl font-bold tracking-[-0.03em] md:block ${
                  [
                    "left-[5%] top-[12%]",
                    "left-[10%] bottom-[18%]",
                    "right-[6%] top-[14%]",
                    "right-[9%] bottom-[16%]",
                    "left-[24%] top-[6%]",
                    "right-[24%] bottom-[6%]",
                  ][i]
                }`}
                style={
                  {
                    "--r": `${[-6, 4, 5, -4, 3, -3][i]}deg`,
                    animationDelay: `${-i}s`,
                  } as React.CSSProperties
                }
              >
                {chip}
              </span>
            ))}
            <h2 className="relative text-[clamp(44px,8vw,96px)] font-bold uppercase leading-[0.9] tracking-[-0.05em]">
              {t.cta.title[0]}
              <br />
              {t.cta.title[1]}
            </h2>
            <p className="relative mx-auto mt-6 max-w-[44ch] text-lg leading-snug text-white/85">
              {t.cta.text}
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={CONTACTS.telegram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lime w-full sm:w-auto"
              >
                {t.cta.button}
              </a>
              <a
                href={CONTACTS.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-line w-full sm:w-auto"
              >
                WhatsApp {CONTACTS.whatsapp.value}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ───── Footer ───── */}
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
                    href={n.href}
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
                <li key={c.niche}>
                  <a href="#cases" className="hover:text-[var(--d-lime)]">
                    <span className="font-bold text-white">{c.headline}</span>{" "}
                    {c.niche}
                  </a>
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
                <a
                  href={CONTACTS.phone.href}
                  className="hover:text-[var(--d-lime)]"
                >
                  {CONTACTS.phone.value}
                </a>
              </li>
              <li>
                <a
                  href={CONTACTS.email.href}
                  className="hover:text-[var(--d-lime)]"
                >
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
    </div>
  );
}

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { CONTENT, type Locale } from "@/lib/content";
import { AuditPromo } from "./AuditPromo";
import { CaseSwitcher } from "./CaseSwitcher";
import { AI_COPY } from "./copy";
import { GlobalMap } from "./GlobalMap";
import { Header } from "./Header";
import { GrowthArt, SearchArt, TargetArt } from "./Illustrations";
import { Marquee } from "./Marquee";
import { SiteFooter } from "./SiteFooter";

// Плашки для трёх главных услуг: цвет фона и иллюстрация.
const FEATURE_TILES = [
  { bg: "bg-[var(--d-pink)]", ink: "text-[#4a1450]", Art: SearchArt },
  { bg: "bg-[var(--d-lime)]", ink: "text-[#23400a]", Art: GrowthArt },
  { bg: "bg-[var(--d-cyan)]", ink: "text-[#062a55]", Art: TargetArt },
];

// Значения для «дашборда» в тёмном блоке: только цифры из кейсов.
const PANEL_VALUES = {
  ru: ["+320%", "€24,84", "5% до 20%", "−23%"],
  en: ["+320%", "€24.84", "5% to 20%", "−23%"],
};
// Регулярные индикаторы флагов (U+1F1E6–U+1F1FF) теряют контраст в приглушённом
// тексте лейбла, поэтому рендерим их отдельным span без затемнения.
const FLAG_RE = /([\u{1F1E6}-\u{1F1FF}]{2}(?:\s?[\u{1F1E6}-\u{1F1FF}]{2})*)\s*$/u;
function splitFlag(label: string): { text: string; flag: string } {
  const match = label.match(FLAG_RE);
  if (!match) return { text: label, flag: "" };
  return { text: label.slice(0, match.index).trimEnd(), flag: match[1] };
}

const CTA_CHIPS = {
  ru: ["+320%", "5000+", "CPA €24,84", "CPA $18", "−23% CPL", "в 4 раза"],
  en: ["+320%", "5,000+", "CPA €24.84", "CPA $18", "−23% CPL", "4x"],
};

export function AiLanding({ locale }: { locale: Locale }) {
  const t = AI_COPY[locale];
  const { CASES, CONTACTS, GEO, SERVICES, SHOW_CLIENT_NAMES, STATS, STEPS, TOOLS, TRAITS } =
    CONTENT[locale];
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
              preserveAspectRatio="xMidYMid slice"
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-screen -translate-x-1/2 -translate-y-1/2 overflow-visible"
            >
              <path
                pathLength={1}
                d="M-160 190 C -40 180 120 40 240 60 S 300 270 410 230 S 500 30 620 70 S 690 290 800 240 S 850 50 960 90 S 1010 270 1110 220 S 1190 30 1290 80 S 1440 190 1560 150"
                fill="none"
                stroke="var(--d-lime)"
                strokeLinecap="round"
                strokeWidth="30"
                className="draw-line"
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
              {t.results.panels.map((label, i) => {
                const { text, flag } = splitFlag(label);
                return (
                <div
                  key={label}
                  className={`rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur md:p-5 ${
                    i % 2 ? "translate-y-6" : ""
                  }`}
                >
                  <p className="text-xs text-white/60 md:text-sm">
                    {text}
                    {flag && <span className="text-white/95"> {flag}</span>}
                  </p>
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
                );
              })}
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
                      className={`relative aspect-[4/3] overflow-hidden rounded-3xl p-8 ${tile.bg} ${tile.ink} ${
                        i % 2 ? "md:order-2" : ""
                      }`}
                    >
                      <tile.Art className="absolute inset-6" tags={s.tags} />
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
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[var(--d-lav)] p-5 md:p-10">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10">
              <h2 className="head text-[clamp(38px,6.4vw,84px)]">
                {t.global.title[0]}
                <br />
                {t.global.title[1]}
              </h2>
              <p className="max-w-[36ch] leading-relaxed text-[var(--d-mute)]">
                {t.map.sub}
              </p>
            </div>
            <Reveal className="-mx-2 mt-8 md:mx-0 md:mt-10">
              <GlobalMap geo={GEO} hubLabel={t.map.hub} />
            </Reveal>
            <ul
              className="mt-4 flex flex-wrap gap-1.5 md:gap-2"
              aria-label={t.map.legend}
            >
              {GEO.map((g) => (
                <li
                  key={g}
                  className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm md:text-[15px]"
                >
                  <span className="size-2 rounded-full bg-[var(--d-blue)]" />
                  {g}
                </li>
              ))}
            </ul>
            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
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
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`flex min-h-[130px] flex-col justify-end rounded-2xl p-5 ${
                    i === 1
                      ? "bg-[var(--d-blue)] text-white"
                      : "bg-white text-[var(--d-blue)]"
                  }`}
                >
                  <p
                    className={`font-bold leading-none tracking-[-0.05em] ${
                      i === 3
                        ? "text-[clamp(22px,3.2vw,34px)]"
                        : "text-[clamp(25px,4.4vw,52px)]"
                    }`}
                  >
                    {s.value}
                  </p>
                  <p className="mt-2 text-[15px] font-medium leading-tight">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── Cases ───── */}
        <section
          id="cases"
          className="scroll-mt-20 px-4 py-16 md:px-8 md:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <h2 className="head text-[clamp(40px,7vw,80px)]">{t.casesTitle}</h2>
            <p className="mt-3 text-lg text-[var(--d-mute)]">{t.casesSub}</p>
            <div className="mt-10">
              <CaseSwitcher
                cases={CASES}
                showNames={SHOW_CLIENT_NAMES}
                t={t}
                contactHref={CONTACTS.telegram.href}
                locale={locale}
              />
            </div>
          </div>
        </section>

        {/* ───── Approach ───── */}
        <section
          id="approach"
          className="scroll-mt-20 bg-[var(--d-blue)] px-4 py-16 text-white md:px-8 md:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10">
              <h2 className="text-[clamp(40px,7vw,80px)] font-bold uppercase leading-[0.92] tracking-[-0.045em]">
                {t.approachTitle}
              </h2>
              <p className="max-w-[34ch] leading-relaxed text-white/75">
                {t.approachSub}
              </p>
            </div>
            <ol className="relative mt-12 grid gap-10 md:mt-16 md:grid-cols-5 md:gap-6">
              <span
                aria-hidden
                className="absolute bottom-3 left-[23px] top-3 w-[2px] bg-gradient-to-b from-[var(--d-lime)] to-white/15 md:bottom-auto md:left-6 md:right-6 md:top-[23px] md:h-[2px] md:w-auto md:bg-gradient-to-r"
              />
              {STEPS.map((s, i) => (
                <li
                  key={s.title}
                  className="relative pl-[72px] md:pl-0 md:pt-[76px]"
                >
                  <span className="absolute left-0 top-0 grid size-12 place-items-center rounded-full bg-[var(--d-lime)] text-lg font-bold text-[var(--d-blue)] ring-8 ring-[var(--d-blue)]">
                    {i + 1}
                  </span>
                  <Reveal delay={i * 0.08}>
                    <p className="text-2xl font-bold uppercase tracking-[-0.04em]">
                      {s.title}
                    </p>
                    <p className="mt-2 leading-snug text-white/75">{s.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <AuditPromo locale={locale} />

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
                {t.cta.whatsapp}
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}

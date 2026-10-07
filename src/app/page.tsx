import type { Metadata } from "next";
import Link from "next/link";
import { AgencyHeader } from "@/components/agency/AgencyHeader";
import {
  Bracket,
  ArrowIcon,
  Sparkle,
  WizardMark,
  Wordmark,
} from "@/components/agency/Brand";
import { CasesCarousel } from "@/components/agency/CasesCarousel";
import { Marquee } from "@/components/agency/Marquee";
import { MODE_INIT_SCRIPT, ModeToggle } from "@/components/agency/ModeToggle";
import { Reveal } from "@/components/Reveal";
import {
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
} from "@/lib/agency-content";

export const metadata: Metadata = {
  title: {
    absolute: "Merlin Agency: платный трафик и SEO, которые приводят клиентов",
  },
  description:
    "Контекстная реклама, SEO, таргет, маркетплейсы и аналитика. Больше 10 лет в digital-маркетинге, проекты в 14 странах.",
};

const HERO_STICKERS = [
  { text: "+320% заявок", className: "left-[2%] top-[18%] -rotate-6" },
  { text: "CTR 9,65%", className: "right-[4%] top-[8%] rotate-3" },
  { text: "№1 среди франшиз", className: "right-[0%] bottom-[30%] -rotate-3" },
  { text: "Лид $3,2", className: "left-[8%] bottom-[16%] rotate-6" },
];

export default function AgencyHome() {
  return (
    <div
      id="top"
      className="agency flex min-h-full flex-1 flex-col overflow-x-clip"
    >
      <script dangerouslySetInnerHTML={{ __html: MODE_INIT_SCRIPT }} />
      <AgencyHeader />

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
                      ( 10+ лет )
                    </span>
                  </span>
                  <span className="block">Agency</span>
                </h1>
                <p className="mt-10 pl-2 text-[13px] uppercase tracking-[-0.03em] md:mt-12">
                  ( Performance-маркетинг )
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-[1fr_auto] md:items-start md:gap-10">
                  <div>
                    <p className="max-w-[24ch] text-[clamp(22px,2vw,28px)] font-bold uppercase leading-[0.95] tracking-[-0.06em]">
                      Платный трафик и SEO, которые приводят клиентов
                    </p>
                    <p className="mt-4 max-w-[46ch] text-[15px] uppercase leading-[1.15] tracking-[-0.03em]">
                      Контекстная реклама, SEO, таргет и аналитика в одних
                      руках. Больше 10 лет в digital и проекты в 14 странах.
                    </p>
                  </div>
                  <a href="#contact" className="pill pill-lg self-start">
                    Обсудить
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal
              delay={0.2}
              className="relative mx-auto w-full max-w-[520px]"
            >
              <div className="relative aspect-square">
                <div className="absolute inset-[6%] rounded-full bg-[var(--a-blue)]" />
                <div className="float absolute inset-0 grid place-items-center">
                  <WizardMark
                    chrome
                    className="h-[96%] drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)]"
                  />
                </div>
                {HERO_STICKERS.map((s) => (
                  <span
                    key={s.text}
                    className={`absolute rounded-full border border-[var(--a-ink)] bg-[var(--a-bg)] px-3 py-1.5 text-[13px] font-medium uppercase leading-none tracking-[-0.03em] shadow-sm ${s.className}`}
                  >
                    {s.text}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-4 text-[15px] tracking-[-0.03em]">
            <Bracket left="Смотрим не на клики" right="а на клиентов" />
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
            <Bracket left="От медицины до B2B-производства" />
          </p>
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
            <Reveal>
              <h2 className="giant text-[clamp(52px,6.4vw,104px)] leading-[0.88]">
                Агентство с опытом в 14 странах
                <span className="ml-2 align-top text-[13px] font-normal tracking-[-0.03em]">
                  ( Казань. Удалённо )
                </span>
              </h2>
            </Reveal>
            <div className="relative mx-auto w-[46vw] max-w-[220px] [perspective:900px] lg:w-[220px]">
              <WizardMark chrome className="coin w-full" />
              <a
                href="#cases"
                className="pill absolute left-1/2 top-[38%] -translate-x-1/2 bg-[var(--a-bg)]"
              >
                Кейсы
              </a>
            </div>
            <Reveal delay={0.1}>
              <p className="giant text-right text-[clamp(40px,4.6vw,76px)] leading-[0.9]">
                контекст, SEO, таргет, маркетплейсы, сайты и аналитика под ключ
              </p>
            </Reveal>
          </div>
          <p className="ml-auto mt-12 max-w-[34ch] text-right text-[13px] uppercase leading-[1.2] tracking-[-0.03em]">
            Агентство основал digital-маркетолог, который руководил отделами
            маркетинга, работал в агентствах и сам пишет сервисы для сбора
            данных и отчётов.
          </p>
        </section>

        {/* ───── Stats ───── */}
        <section className="border-t border-[var(--a-line)] px-4 py-16 md:px-5 md:py-24">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="giant text-[clamp(52px,8vw,128px)]">Цифры</h2>
            <span className="text-[13px] uppercase tracking-[-0.03em]">
              ( из реальных проектов )
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
            <h2 className="giant text-[clamp(52px,8vw,128px)]">Услуги</h2>
            <span className="text-[13px] uppercase tracking-[-0.03em]">
              ( 09 направлений )
            </span>
          </div>
          <p className="mt-6 max-w-[52ch] text-[15px] uppercase leading-[1.15] tracking-[-0.03em]">
            Порядок не случайный: сверху то, в чём экспертиза глубже всего.
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
                  Клиенты, а не клики
                </span>
                <WizardMark className="h-[clamp(56px,8vw,130px)]" />
              </span>
            ))}
          </Marquee>
        </div>

        {/* ───── Cases ───── */}
        <section id="cases" className="scroll-mt-16 py-16 md:py-24">
          <div className="flex items-baseline justify-between gap-4 px-4 md:px-5">
            <h2 className="giant text-[clamp(52px,8vw,128px)]">Кейсы</h2>
            <span className="hidden text-[13px] uppercase tracking-[-0.03em] sm:inline">
              ( ниша, задача, результат )
            </span>
          </div>
          <p className="mt-6 max-w-[52ch] px-4 text-[15px] uppercase leading-[1.15] tracking-[-0.03em] md:px-5">
            Медицина, общепит, EdTech, недвижимость, право и B2B. Цифры из
            реальных проектов.
          </p>
          <div className="mt-12">
            <CasesCarousel />
          </div>
        </section>

        {/* ───── Manifest ───── */}
        <section className="border-t border-[var(--a-line)] px-4 py-20 text-center md:px-5 md:py-32">
          <Reveal>
            <p className="mx-auto max-w-[24ch] text-[clamp(26px,3vw,44px)] font-bold uppercase leading-[0.95] tracking-[-0.06em]">
              Merlin Agency закрывает трафик целиком: от стратегии до аналитики
            </p>
            <WizardMark className="mx-auto mt-8 h-14 text-[var(--a-blue)]" />
            <p className="mx-auto mt-8 max-w-[70ch] text-[13px] uppercase leading-[1.25] tracking-[-0.02em]">
              Яндекс Директ с 2017 года, Google Ads, SEO, таргет и маркетплейсы.
              Руководство отделом маркетинга, найм удалённых специалистов и
              подрядчиков под точечные задачи. Тексты, сценарии и подача от
              человека с образованием в телевизионной журналистике. Ведение
              клиента на русском, английском и грузинском.
            </p>
            <p className="mt-10 text-[13px] uppercase tracking-[-0.03em]">
              <Bracket left="Одна точка ответственности" />
            </p>
          </Reveal>
        </section>

        {/* ───── Approach ───── */}
        <section
          id="approach"
          className="scroll-mt-16 border-t border-[var(--a-line)] px-4 py-16 md:px-5 md:py-24"
        >
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="giant text-[clamp(52px,8vw,128px)]">Подход</h2>
            <span className="text-[13px] uppercase tracking-[-0.03em]">
              ( 5 шагов )
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
                <h2 className="giant text-[clamp(44px,5.6vw,96px)]">Ниши</h2>
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
                  География
                </h2>
                <span className="text-[13px] uppercase tracking-[-0.03em]">
                  ( 14 стран )
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

        {/* ───── CTA ───── */}
        <section
          id="contact"
          className="relative scroll-mt-0 overflow-hidden bg-[var(--a-blue)] px-4 pb-10 pt-20 text-white md:px-5 md:pt-28"
        >
          <div className="relative text-center">
            <h2 className="giant text-[clamp(64px,15vw,250px)] uppercase leading-[0.82]">
              Обсудим
              <br />
              проект
            </h2>
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="float w-[clamp(90px,14vw,220px)]">
                <WizardMark
                  chrome
                  className="w-full drop-shadow-[0_24px_30px_rgba(0,0,40,0.45)]"
                />
              </div>
            </div>
          </div>

          <p className="mx-auto mt-10 max-w-[48ch] text-center text-[13px] uppercase leading-[1.25] tracking-[-0.02em]">
            Расскажите о бизнесе и задаче в Telegram или WhatsApp. Разберём
            текущую рекламу и сайт и предложим, с чего начать.
          </p>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <a
              href={CONTACTS.telegram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-6 border-b border-white pb-2 lg:max-w-[720px]"
            >
              <span className="giant text-[clamp(34px,4.4vw,64px)] leading-none sm:whitespace-nowrap">
                Написать в Telegram
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
                Бесплатный аудит сайта
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ───── Footer ───── */}
      <footer className="px-4 pb-6 pt-14 md:px-5 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_auto_1fr] lg:items-end">
          <div>
            <Wordmark className="w-full max-w-[980px] text-[var(--a-blue)]" />
            <div className="mt-6 flex flex-wrap gap-2">
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
          <Sparkle className="hidden size-6 text-[var(--a-mute)] lg:block" />
          <div className="grid grid-cols-[auto_1fr_1fr] gap-x-8 gap-y-1 text-[13px] uppercase tracking-[-0.03em]">
            <span className="font-bold">( Nav )</span>
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
                  Аудит
                </Link>
              </li>
              <li>Казань</li>
              <li>Работаем удалённо</li>
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

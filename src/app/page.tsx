import type { Metadata } from "next";
import { PT_Serif } from "next/font/google";
import Link from "next/link";
import { CaseMock } from "@/components/flip/CaseMock";
import { Header } from "@/components/flip/Header";
import { HeroCard } from "@/components/flip/HeroCard";
import { Icon, type IconName } from "@/components/flip/Icons";
import { Logo } from "@/components/flip/Logo";
import { Marquee } from "@/components/flip/Marquee";
import { ServicePicker } from "@/components/flip/ServicePicker";
import { Reveal } from "@/components/Reveal";
import {
  AUDIT_STEPS,
  CASES,
  CONTACTS,
  GEO,
  NICHES,
  SHOW_CLIENT_NAMES,
  STATS,
  STEPS,
  TOOLS,
  TRAITS,
} from "@/lib/agency-content";

// Акцентные слова набраны курсивом с засечками, как у референса. Основной шрифт остаётся Stolzl.
const accentFont = PT_Serif({
  variable: "--font-accent",
  weight: "400",
  style: "italic",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: {
    absolute: "Merlin Agency: платный трафик и SEO, которые приводят клиентов",
  },
  description:
    "Контекстная реклама, SEO, таргет, маркетплейсы и аналитика. Больше 10 лет в digital-маркетинге, проекты в 14 странах.",
};

const COUNTRY_BADGES = [
  { code: "RU", bg: "#1d2230" },
  { code: "GE", bg: "#ff5a1f" },
  { code: "CY", bg: "#3b82f6" },
  { code: "AE", bg: "#10b981" },
  { code: "IL", bg: "#a855f7" },
];

const TRAIT_ICONS: IconName[] = ["user", "target", "globe", "spark"];

function SectionHead({
  label,
  children,
  sub,
}: {
  label: string;
  children: React.ReactNode;
  sub?: React.ReactNode;
}) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <span className="label">{label}</span>
      <h2 className="mt-4 text-[clamp(32px,6vw,56px)] font-medium leading-[1.05] tracking-[-0.04em]">
        {children}
      </h2>
      {sub && (
        <p className="mx-auto mt-4 max-w-[46ch] text-[clamp(17px,2vw,20px)] leading-snug text-[var(--f-mute)]">
          {sub}
        </p>
      )}
    </Reveal>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-[var(--f-line)] bg-white px-4 py-2 text-[15px]">
      {children}
    </span>
  );
}

export default function FlipHome() {
  return (
    <div
      id="top"
      className={`flip ${accentFont.variable} flex min-h-full flex-1 flex-col overflow-x-clip`}
    >
      <Header />

      <main className="flex-1">
        {/* ───── Hero ───── */}
        <section className="mx-auto max-w-6xl px-3 pt-2 md:px-6 md:pt-4">
          <HeroCard>
            <div className="pointer-events-none absolute right-4 top-5 flex md:right-12 md:top-12">
              <span
                className="bob grid size-11 place-items-center rounded-2xl bg-[var(--f-ink)] text-white shadow-xl md:size-20 md:rounded-3xl"
                style={{ "--r": "-8deg" } as React.CSSProperties}
              >
                <Icon name="chart" className="size-5 md:size-9" />
              </span>
              <span
                className="bob -ml-3 mt-5 grid size-11 place-items-center rounded-2xl bg-gradient-to-b from-[#ff6a2c] to-[#ff3d00] text-white shadow-xl md:-ml-4 md:mt-8 md:size-20 md:rounded-3xl"
                style={{ "--r": "8deg", animationDelay: "-3s" } as React.CSSProperties}
              >
                <Icon name="target" className="size-5 md:size-9" />
              </span>
            </div>

            <h1 className="max-w-[15ch] pr-14 text-[clamp(38px,8.4vw,84px)] font-medium leading-[1.04] tracking-[-0.05em] sm:pr-0">
              Платный трафик <span className="accent">и SEO</span>,
              <span className="accent mt-1 block text-[max(17px,0.36em)] leading-none">
                и аналитика под ключ
              </span>
              которые приводят <span className="accent">клиентов</span>
            </h1>

            <p className="mt-6 max-w-[42ch] text-[clamp(17px,2.1vw,22px)] leading-snug text-[#3b4150]">
              Контекстная реклама, SEO, таргет и маркетплейсы в одних руках.
              Больше 10 лет в digital-маркетинге.
            </p>

            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
              <a href="#cases" className="btn-orange self-start text-lg">
                Смотреть кейсы
              </a>
              <div className="flex items-center gap-3">
                <div className="flex">
                  {COUNTRY_BADGES.map((b) => (
                    <span
                      key={b.code}
                      className="-ml-2 grid size-9 place-items-center rounded-full border-2 border-[var(--f-card)] text-[11px] font-bold text-white first:ml-0"
                      style={{ background: b.bg }}
                    >
                      {b.code}
                    </span>
                  ))}
                </div>
                <div className="text-sm leading-tight">
                  <p className="font-medium">Проекты в 14 странах</p>
                  <p className="text-[var(--f-mute)]">от медицины до B2B</p>
                </div>
              </div>
            </div>
          </HeroCard>
        </section>

        {/* ───── Tools strip ───── */}
        <div className="marquee-fade mt-10 md:mt-14">
          <Marquee duration={50}>
            {TOOLS.map((t) => (
              <span
                key={t}
                className="whitespace-nowrap px-6 text-xl font-bold tracking-[-0.04em] text-[#9a9ea9] md:px-9 md:text-2xl"
              >
                {t}
              </span>
            ))}
          </Marquee>
        </div>

        {/* ───── Work strip ───── */}
        <section className="mt-6 bg-gradient-to-b from-white to-[#fff6f1] pb-14 md:mt-10 md:pb-20">
          <Marquee duration={70}>
            {CASES.map((c, i) => (
              <span key={c.niche} className="px-2.5 py-6 md:px-3.5">
                <span
                  className="block"
                  style={{ transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}
                >
                  <CaseMock c={c} index={i} />
                </span>
              </span>
            ))}
          </Marquee>
          <div className="mt-6 text-center">
            <a href="#cases" className="btn-orange">
              Все кейсы
            </a>
          </div>
        </section>

        {/* ───── Services picker ───── */}
        <section id="services" className="scroll-mt-20 px-4 py-16 md:px-6 md:py-24">
          <SectionHead
            label="Услуги"
            sub={
              <>
                Соберите <span className="accent">свою</span> связку из
                направлений, в которых у нас есть опыт
              </>
            }
          >
            Трафик, сайт, аналитика. <span className="accent">Выберите своё</span>
          </SectionHead>
          <div className="mx-auto mt-12 max-w-5xl">
            <ServicePicker />
          </div>
        </section>

        {/* ───── Stats ───── */}
        <section className="px-4 py-16 md:px-6 md:py-24">
          <SectionHead label="Цифры">
            Результаты, <span className="accent">которые видно</span> в отчётах
          </SectionHead>
          <div className="mx-auto mt-12 grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={(i % 3) * 0.06} className="h-full">
                <div className="flex h-full flex-col justify-between gap-6 rounded-3xl bg-[var(--f-card)] p-6 md:p-7">
                  <p className="text-[clamp(44px,6vw,64px)] font-bold leading-none tracking-[-0.05em]">
                    {s.value}
                    {s.unit && <span className="accent ml-2 text-[0.5em]">{s.unit}</span>}
                  </p>
                  <p className="text-[var(--f-mute)]">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ───── Cases wall ───── */}
        <section id="cases" className="scroll-mt-20 px-4 py-16 md:px-6 md:py-24">
          <SectionHead
            label="Кейсы"
            sub="Ниша, задача, что сделали и что получилось. Цифры из реальных проектов."
          >
            Смотрим не на клики, <span className="accent">а на клиентов</span>
          </SectionHead>
          <div className="mx-auto mt-12 max-w-6xl columns-1 gap-4 sm:columns-2 lg:columns-3">
            {CASES.map((c) => (
              <article
                key={c.niche}
                className="mb-4 break-inside-avoid rounded-3xl border border-[var(--f-line)] bg-white p-6 shadow-[0_12px_30px_-24px_rgba(29,34,48,0.4)]"
              >
                <div className="flex items-start gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--f-tint)] text-lg font-bold text-[var(--f-orange-2)]">
                    {c.niche.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium leading-tight">
                      {SHOW_CLIENT_NAMES && c.client ? c.client : c.niche}
                    </p>
                    <p className="text-sm text-[var(--f-mute)]">{c.geo}</p>
                  </div>
                </div>
                <p className="mt-5 text-[40px] font-bold leading-none tracking-[-0.05em]">
                  {c.headline}
                </p>
                <p className="accent mt-1 text-lg">{c.headlineLabel}</p>
                <div className="mt-5 flex flex-col gap-2 leading-relaxed text-[#3b4150]">
                  {c.task && <p>{c.task}</p>}
                  {c.done && <p>{c.done}</p>}
                  <p>
                    {c.results.map((r, i) => (
                      <span key={r}>
                        <span className="mark">{r}</span>
                        {i < c.results.length - 1 ? ". " : "."}
                      </span>
                    ))}
                  </p>
                  {c.campaign && <p className="text-sm text-[var(--f-mute)]">{c.campaign}</p>}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ───── Approach ───── */}
        <section
          id="approach"
          className="scroll-mt-20 bg-[var(--f-card)] px-4 py-16 md:px-6 md:py-24"
        >
          <SectionHead label="Подход">
            Пять шагов <span className="accent">от разбора</span> до отчёта
          </SectionHead>
          <ol className="mx-auto mt-12 grid max-w-6xl gap-3 md:grid-cols-5">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-3xl bg-white p-5 md:flex-col md:gap-8">
                <span className="accent text-4xl leading-none md:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-lg font-medium tracking-[-0.03em]">{s.title}</span>
                  <span className="mt-1 block text-[15px] leading-snug text-[var(--f-mute)]">
                    {s.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-10 grid max-w-6xl gap-3 sm:grid-cols-2 md:mt-14">
            {TRAITS.map((t, i) => (
              <div key={t.title} className="flex gap-4 rounded-3xl bg-white p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--f-tint)] text-[var(--f-orange-2)]">
                  <Icon name={TRAIT_ICONS[i]} />
                </span>
                <div>
                  <h3 className="text-lg font-medium tracking-[-0.03em]">{t.title}</h3>
                  <p className="mt-1 leading-snug text-[var(--f-mute)]">{t.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───── Niches & geography ───── */}
        <section className="px-4 py-16 md:px-6 md:py-24">
          <SectionHead label="Опыт">
            10+ ниш и <span className="accent">14 стран</span>
          </SectionHead>
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
            <div>
              <p className="flex items-center gap-2 font-medium">
                <Icon name="layers" className="size-5 text-[var(--f-orange)]" />
                Ниши
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {NICHES.map((n) => (
                  <Chip key={n}>{n}</Chip>
                ))}
              </div>
            </div>
            <div>
              <p className="flex items-center gap-2 font-medium">
                <Icon name="pin" className="size-5 text-[var(--f-orange)]" />
                География
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {GEO.map((g) => (
                  <Chip key={g}>{g}</Chip>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── Audit ───── */}
        <section id="audit" className="scroll-mt-20 px-4 py-16 md:px-6 md:py-24">
          <SectionHead
            label="Бесплатно"
            sub={
              <>
                Отчёт по конкурентам, SEO и рекламе{" "}
                <span className="accent">за пару минут</span>
              </>
            }
          >
            Нужен <span className="accent">аудит?</span>
          </SectionHead>
          <ol className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">
            {AUDIT_STEPS.map((s, i) => (
              <li
                key={s.title}
                className="rounded-3xl border border-[var(--f-line)] bg-white p-5 text-center"
              >
                <span className="accent text-3xl">{i + 1}</span>
                <p className="mt-2 font-medium">{s.title}</p>
                <p className="mt-1 text-[15px] leading-snug text-[var(--f-mute)]">{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-6 max-w-[56ch] text-center text-sm text-[var(--f-mute)]">
            Данные из публичных источников: ваш сайт, органическая выдача Google,
            Google Ads Transparency Center и Meta Ad Library.
          </p>
          <div className="mt-8 text-center">
            <Link href="/audit" className="btn-orange text-lg">
              Получить аудит
            </Link>
          </div>
        </section>

        {/* ───── Contact ───── */}
        <section id="contact" className="mx-auto max-w-6xl px-3 pb-10 md:px-6 md:pb-16">
          <div className="rounded-[28px] bg-[var(--f-card)] px-5 py-12 text-center sm:px-10 md:rounded-[36px] md:py-20">
            <h2 className="text-[clamp(36px,7vw,72px)] font-medium leading-[1.02] tracking-[-0.05em]">
              Обсудим <span className="accent">ваш</span> проект
            </h2>
            <p className="mx-auto mt-4 max-w-[44ch] text-[clamp(17px,2vw,20px)] leading-snug text-[var(--f-mute)]">
              Расскажите о бизнесе и задаче. Разберём текущую рекламу и сайт и
              предложим, с чего начать.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={CONTACTS.telegram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-orange w-full text-lg sm:w-auto"
              >
                <Icon name="chat" />
                Telegram {CONTACTS.telegram.value}
              </a>
              <a
                href={CONTACTS.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost w-full sm:w-auto"
              >
                WhatsApp {CONTACTS.whatsapp.value}
              </a>
            </div>
            <div className="mt-6 flex flex-col items-center justify-center gap-x-6 gap-y-2 text-[var(--f-mute)] sm:flex-row">
              <a
                href={CONTACTS.phone.href}
                className="flex items-center gap-2 hover:text-[var(--f-ink)]"
              >
                <Icon name="phone" className="size-4" />
                {CONTACTS.phone.value}
              </a>
              <a
                href={CONTACTS.email.href}
                className="flex items-center gap-2 hover:text-[var(--f-ink)]"
              >
                <Icon name="mail" className="size-4" />
                {CONTACTS.email.value}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--f-line)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-[var(--f-mute)] md:flex-row md:items-center md:justify-between md:px-6">
          <Logo className="text-[var(--f-ink)]" />
          <p>Казань. Работаем удалённо</p>
          <p>© {new Date().getFullYear()} Merlin Agency</p>
        </div>
      </footer>
    </div>
  );
}

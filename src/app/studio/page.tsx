import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Merlin Studio: связки, которые продают",
  description:
    "Digital-агентство полного цикла: реклама, брендинг, сайты, SEO, SMM и AI-автоматизация. Без «магии слов», только цифры и рост.",
};

const TRUST_ITEMS = [
  "Полный цикл: от бренда до рекламы",
  "Отчётность по цифрам, а не по ощущениям",
  "Своя команда, без подрядчиков-прослоек",
];

const PRINCIPLES = [
  {
    title: "Цифры, а не обещания",
    body: "Каждое решение подкреплено метриками. Если канал не окупается, мы покажем это в отчёте, а не спрячем.",
  },
  {
    title: "Полный цикл, а не один канал",
    body: "Бренд, сайт, SEO и реклама работают как одна связка вместо набора разрозненных подрядчиков.",
  },
  {
    title: "Прозрачная отчётность",
    body: "Вы видите, куда идёт бюджет и какой у него результат, в любой момент, а не раз в квартал.",
  },
  {
    title: "Долгосрочно, а не разово",
    body: "Настраиваем процессы и аналитику, которые продолжают работать и после сдачи проекта.",
  },
];

const SERVICES = [
  {
    title: "Контекстная и таргетированная реклама",
    body: "Google Ads, Яндекс.Директ и соцсети с фокусом на заявки, а не показы.",
    span: "md:col-span-2",
  },
  {
    title: "Брендинг",
    body: "Фирменный стиль, логотип и нейминг, с которым не стыдно выйти к клиенту.",
  },
  {
    title: "Веб-разработка",
    body: "Сайты и чат-боты, которые конвертируют, а не просто существуют.",
  },
  {
    title: "SEO-продвижение",
    body: "Аудит, техническая оптимизация и контент для органического трафика.",
  },
  {
    title: "SMM",
    body: "Стратегия, контент и реклама в соцсетях под вашу аудиторию.",
  },
  {
    title: "AI-автоматизация",
    body: "Обработка заявок, транскрибация и рутина, снятая с команды.",
    span: "md:col-span-2",
  },
];

const CLIENTS = ["Dodo Pizza", "Azri", "Тюбетей", "Финхак Junior"];

export default function StudioPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader variant="studio" />

      <main className="mx-auto w-full max-w-6xl px-6">
        <section className="grid items-center gap-12 py-12 md:grid-cols-[1.05fr_0.95fr] md:py-20">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-accent-soft">
              Merlin Studio · Digital-агентство
            </p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Связки, которые продают
            </h1>
            <p className="mt-5 max-w-[46ch] text-base text-muted md:text-lg">
              Реклама, сайты и бренд как одна система. Без «магии слов», только цифры и рост.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 font-semibold text-accent-ink transition-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
              >
                Получить бесплатный аудит
              </Link>
              <a
                href="#cases"
                className="text-sm font-semibold text-foreground transition-colors hover:text-accent-soft"
              >
                Смотреть кейсы
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            {/* Слот под графику: сюда встанет маскот (PNG на прозрачном фоне, ~1000x1200).
                Просто замени содержимое этого div на <Image src="/mascot.png" ... />. */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-panel">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,var(--accent)_0%,transparent_60%)] opacity-20" />
            </div>
          </Reveal>
        </section>

        <section className="border-t border-border py-10">
          <Reveal>
            <div className="flex flex-col gap-4 divide-y divide-border md:flex-row md:divide-x md:divide-y-0">
              {TRUST_ITEMS.map((item) => (
                <p key={item} className="pt-4 text-sm text-muted first:pt-0 md:flex-1 md:px-6 md:pt-0 first:md:pl-0">
                  {item}
                </p>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="border-t border-border py-16 md:py-24">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Как мы работаем</h2>
          </Reveal>
          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {PRINCIPLES.map((principle, i) => (
              <Reveal key={principle.title} delay={i * 0.06}>
                <h3 className="font-semibold">{principle.title}</h3>
                <p className="mt-2 max-w-[48ch] text-muted">{principle.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="services" className="border-t border-border py-16 md:py-24">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Услуги</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {SERVICES.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.05} className={service.span}>
                <div className="h-full rounded-2xl border border-border bg-panel p-6">
                  <h3 className="font-semibold">{service.title}</h3>
                  <p className="mt-2 max-w-[48ch] text-muted">{service.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="cases" className="border-t border-border py-16 md:py-24">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Нам доверяют</h2>
            <p className="mt-3 max-w-[52ch] text-muted">
              Работаем с брендами разного масштаба: от локальных сетей до федеральных франшиз.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              {CLIENTS.map((client) => (
                <span key={client} className="text-xl font-semibold text-muted md:text-2xl">
                  {client}
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="border-t border-border py-16 md:py-24">
          <Reveal>
            <div className="rounded-2xl border border-border bg-panel p-8 text-center md:p-16">
              <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">
                Узнайте, сколько вы теряете на рекламе
              </h2>
              <p className="mx-auto mt-4 max-w-[46ch] text-muted">
                Бесплатный аудит покажет, что делают ваши конкуренты и что укрепить у вас.
              </p>
              <Link
                href="/"
                className="mt-8 inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 font-semibold text-accent-ink transition-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
              >
                Получить бесплатный аудит
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

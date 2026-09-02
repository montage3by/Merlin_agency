import type { Metadata } from "next";
import Image from "next/image";
import { AuditForm } from "@/components/AuditForm";
import { Reveal } from "@/components/Reveal";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Бесплатный digital-аудит от Merlin Studio",
  description:
    "Автоматический аудит сайта и конкурентов: SEO, контекстная и таргетированная реклама. Готовый отчёт с рекомендациями за пару минут.",
};

const STEPS = [
  {
    number: "01",
    title: "Оставьте сайт",
    body: "Домен, ниша и город. Этого достаточно, чтобы найти релевантных конкурентов.",
  },
  {
    number: "02",
    title: "Мы анализируем",
    body: "Проверяем ваш SEO, находим конкурентов, смотрим их рекламу в Google и Meta.",
  },
  {
    number: "03",
    title: "Забираете отчёт",
    body: "PDF с находками по конкурентам и рекомендациями. Без «магии слов».",
  },
];

export default function AuditPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl px-6">
        <section className="grid items-center gap-12 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-20">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-accent-soft">
              Merlin Studio · Бесплатный аудит
            </p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Digital-аудит за минуты, не дни
            </h1>
            <p className="mt-5 max-w-[46ch] text-base text-muted md:text-lg">
              Укажите домен, нишу и город, и получите отчёт по конкурентам, SEO и рекламе с рекомендациями.
            </p>
            <a
              href="#audit-form"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 font-semibold text-accent-ink transition-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              Получить бесплатный аудит
            </a>
          </Reveal>

          <Reveal delay={0.15} className="relative">
            <div className="relative aspect-[4/5]">
              <div className="absolute left-0 top-0 aspect-[900/1273] w-[62%] -rotate-3 overflow-hidden rounded-2xl border border-border shadow-2xl">
                <Image
                  src="/report-preview-1.png"
                  alt="Обложка примера отчёта Merlin Studio"
                  fill
                  priority
                  className="object-cover object-top"
                />
              </div>
              <div className="absolute bottom-0 right-0 aspect-[900/1273] w-[62%] rotate-2 overflow-hidden rounded-2xl border border-border shadow-2xl">
                <Image
                  src="/report-preview-2.png"
                  alt="Страница рекомендаций примера отчёта Merlin Studio"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-xl border border-border bg-panel px-5 py-4 shadow-xl md:-left-10">
              <p className="text-xs uppercase tracking-[0.15em] text-muted">Пример отчёта</p>
              <p className="mt-1 font-semibold">SEO · Реклама · Конкуренты</p>
            </div>
          </Reveal>
        </section>

        <section className="border-t border-border py-16 md:py-24">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Как это работает</h2>
          </Reveal>
          <div className="mt-10 divide-y divide-border">
            {STEPS.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.08}>
                <div className="flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:gap-8 md:py-8">
                  <span className="font-mono text-sm text-accent-soft md:w-12">{step.number}</span>
                  <h3 className="font-semibold md:w-56">{step.title}</h3>
                  <p className="max-w-[52ch] text-muted">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="audit-form" className="border-t border-border py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Получите свой аудит
              </h2>
              <p className="mt-4 max-w-[42ch] text-muted">
                Отчёт собирается из публичных источников: вашего сайта, органической выдачи Google, Google Ads Transparency Center и Meta Ad Library. После этого команда Merlin Studio свяжется с вами, чтобы обсудить результаты.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <AuditForm />
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

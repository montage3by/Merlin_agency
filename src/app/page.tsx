import Image from "next/image";
import { AuditForm } from "@/components/AuditForm";
import { Reveal } from "@/components/Reveal";

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

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <span className="font-semibold tracking-tight">Merlin Studio</span>
        <a
          href="https://mrlnstudio.com"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          mrlnstudio.com
        </a>
      </header>

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
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border">
              <Image
                src="https://picsum.photos/seed/merlin-studio-analytics/900/1125"
                alt="Аналитика конкурентов и рекламы"
                fill
                priority
                className="object-cover grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-xl border border-border bg-panel px-5 py-4 shadow-xl md:-left-10">
              <p className="text-xs uppercase tracking-[0.15em] text-muted">В отчёте</p>
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

      <footer className="mt-auto border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <span>Merlin Studio. Связки, которые продают.</span>
          <a
            href="mailto:merlin_studio@gmail.com"
            className="transition-colors hover:text-foreground"
          >
            merlin_studio@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}

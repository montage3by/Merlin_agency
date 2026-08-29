import { AuditForm } from "@/components/AuditForm";

const STEPS = [
  {
    title: "Оставьте сайт",
    body: "Укажите домен, нишу и город — этого достаточно, чтобы найти релевантных конкурентов.",
  },
  {
    title: "Мы анализируем за минуты, не дни",
    body: "Автоматически проверяем ваш SEO, находим конкурентов и смотрим, где и как они рекламируются — в Google и Meta.",
  },
  {
    title: "Готовый PDF-отчёт",
    body: "Конкретные цифры, находки по конкурентам и приоритизированные рекомендации — без «магии слов».",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center">
      <main className="w-full max-w-5xl px-6 py-20 sm:py-28">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent-soft uppercase tracking-[0.2em] text-xs mb-4">
            Merlin Studio · Связки, которые продают
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold leading-tight mb-6">
            Бесплатный digital-аудит — автоматически, за минуты
          </h1>
          <p className="text-muted text-base sm:text-lg">
            Раньше на подготовку аудита уходило несколько дней. Теперь наш инструмент сам
            находит ваших конкурентов, проверяет их SEO и рекламу — и собирает всё
            в готовый отчёт с рекомендациями, как зарабатывать больше.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 mb-16">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="rounded-2xl border border-border bg-panel p-6"
            >
              <div className="text-accent-soft text-sm font-semibold mb-2">
                Шаг {i + 1}
              </div>
              <h2 className="font-semibold mb-2">{step.title}</h2>
              <p className="text-muted text-sm">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <AuditForm />
        </div>

        <p className="text-center text-muted text-xs mt-8 max-w-lg mx-auto">
          Отчёт собирается из публичных источников: вашего сайта, органической выдачи
          Google, Google Ads Transparency Center и Meta Ad Library. После получения
          отчёта команда Merlin Studio свяжется с вами, чтобы обсудить результаты.
        </p>
      </main>
    </div>
  );
}

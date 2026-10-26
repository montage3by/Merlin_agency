import { CONTENT, type Locale } from "@/lib/content";
import { AI_COPY } from "./copy";

export function AuditPromo({ locale }: { locale: Locale }) {
  const t = AI_COPY[locale];
  const { AUDIT_STEPS } = CONTENT[locale];

  return (
    <section id="audit" className="scroll-mt-20 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 overflow-hidden rounded-[28px] bg-[var(--d-lime)] p-6 md:p-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="text-[var(--d-blue)]">
          <h2 className="head text-[clamp(38px,6vw,72px)]">{t.audit.title}</h2>
          <p className="mt-4 max-w-[46ch] text-lg leading-relaxed">
            {t.audit.text}
          </p>
          <form
            action="/audit"
            method="get"
            className="mt-7 flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-[0_18px_40px_-24px_rgba(6,6,154,0.5)] sm:flex-row"
          >
            <label htmlFor="audit-domain" className="sr-only">
              {t.auditForm.label}
            </label>
            <input
              id="audit-domain"
              name="domain"
              required
              inputMode="url"
              autoComplete="url"
              placeholder={t.auditForm.placeholder}
              className="min-w-0 flex-1 rounded-xl px-4 py-3 text-[var(--d-ink)] outline-none placeholder:text-[var(--d-mute)]/70 focus-visible:ring-2 focus-visible:ring-[var(--d-blue)]"
            />
            <button
              type="submit"
              className="rounded-xl bg-[var(--d-blue)] px-5 py-3 font-medium text-white transition-colors hover:bg-[var(--d-blue-deep)]"
            >
              {t.auditForm.submit}
            </button>
          </form>
          <p className="mt-3 text-sm">{t.auditForm.note}</p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {AUDIT_STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-3 sm:block">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--d-blue)] text-sm font-bold text-[var(--d-lime)]">
                  {i + 1}
                </span>
                <span className="sm:mt-3 sm:block">
                  <span className="block font-bold">{s.title}</span>
                  <span className="block text-[15px] leading-snug opacity-80">
                    {s.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Превью отчёта: схематичный макет PDF, без выдуманных цифр */}
        <div aria-hidden className="relative mx-auto w-full max-w-[400px] py-6">
          <div className="absolute inset-x-6 inset-y-2 rotate-[-6deg] rounded-2xl bg-[var(--d-blue)]" />
          <div className="relative rotate-[2deg] overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="bg-[var(--d-blue)] px-6 py-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--d-lime)]">
                Merlin Agency
              </p>
              <p className="mt-2 text-2xl font-bold uppercase tracking-[-0.04em]">
                {t.auditForm.previewTitle}
              </p>
              <p className="mt-1 text-white/70">{t.auditForm.previewDomain}</p>
            </div>
            <ul className="flex flex-col gap-4 px-6 py-6">
              {t.auditForm.previewSections.map((label, i) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[var(--d-lime)] text-[var(--d-blue)]">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="m5 12 4 4 10-10" />
                    </svg>
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-bold text-[var(--d-ink)]">
                      {label}
                    </span>
                    <span
                      className="mt-1.5 block h-1.5 rounded-full bg-[var(--d-lav)]"
                      style={{ width: `${[88, 64, 72, 56, 80][i]}%` }}
                    />
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-[var(--d-lav)] px-6 py-3 text-right text-xs font-bold text-[var(--d-mute)]">
              PDF
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

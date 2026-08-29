"use client";

import { motion } from "motion/react";
import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "error" | "done";

export function AuditForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      domain: String(data.get("domain") ?? ""),
      businessName: String(data.get("businessName") ?? "") || undefined,
      niche: String(data.get("niche") ?? "") || undefined,
      city: String(data.get("city") ?? "") || undefined,
      contactName: String(data.get("contactName") ?? "") || undefined,
      contactEmail: String(data.get("contactEmail") ?? ""),
    };

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Не удалось сформировать отчёт");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `merlin-audit-${payload.domain}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setStatus("done");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Неизвестная ошибка");
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg rounded-2xl border border-border bg-panel p-6 sm:p-8 space-y-4"
    >
      <div>
        <label htmlFor="domain" className="block text-sm text-muted mb-1">
          Сайт вашего бизнеса *
        </label>
        <input
          id="domain"
          name="domain"
          required
          placeholder="mycompany.com"
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground outline-none transition-colors focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="businessName" className="block text-sm text-muted mb-1">
            Название бизнеса
          </label>
          <input
            id="businessName"
            name="businessName"
            placeholder="ООО «Компания»"
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground outline-none transition-colors focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
          />
        </div>
        <div>
          <label htmlFor="niche" className="block text-sm text-muted mb-1">
            Ниша
          </label>
          <input
            id="niche"
            name="niche"
            placeholder="кофейни, стоматологии..."
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground outline-none transition-colors focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
          />
        </div>
      </div>

      <div>
        <label htmlFor="city" className="block text-sm text-muted mb-1">
          Город / регион
        </label>
        <input
          id="city"
          name="city"
          placeholder="Батуми"
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground outline-none transition-colors focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contactName" className="block text-sm text-muted mb-1">
            Ваше имя
          </label>
          <input
            id="contactName"
            name="contactName"
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground outline-none transition-colors focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
          />
        </div>
        <div>
          <label htmlFor="contactEmail" className="block text-sm text-muted mb-1">
            Email *
          </label>
          <input
            id="contactEmail"
            name="contactEmail"
            type="email"
            required
            placeholder="you@company.com"
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground outline-none transition-colors focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
          />
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={status === "loading"}
        whileTap={{ scale: 0.98 }}
        className="w-full rounded-lg bg-accent px-4 py-3 font-semibold text-accent-ink transition-colors hover:bg-accent/90 disabled:opacity-60"
      >
        {status === "loading" ? "Собираем данные, 20-40 сек" : "Получить бесплатный аудит"}
      </motion.button>

      {status === "error" && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}
      {status === "done" && (
        <p className="text-sm text-accent-soft">
          Готово. PDF-отчёт скачался автоматически. Команда Merlin Studio свяжется с вами, чтобы обсудить результаты.
        </p>
      )}
    </form>
  );
}

"use client";

import { useState } from "react";
import { CONTENT, type Locale } from "@/lib/content";
import { FLIP_COPY } from "./copy";
import { Icon, type IconName } from "./Icons";

const ICONS: IconName[] = [
  "search",
  "globe",
  "target",
  "bag",
  "layout",
  "chart",
  "mail",
  "layers",
  "spark",
];

function plural(n: number, locale: Locale) {
  if (locale === "en") return n === 1 ? "service" : "services";
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "направление";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14))
    return "направления";
  return "направлений";
}

export function ServicePicker({ locale }: { locale: Locale }) {
  const [picked, setPicked] = useState<number[]>([0, 1]);
  const t = FLIP_COPY[locale].picker;
  const { CONTACTS, SERVICES } = CONTENT[locale];

  function toggle(i: number) {
    setPicked((p) =>
      p.includes(i)
        ? p.filter((x) => x !== i)
        : [...p, i].sort((a, b) => a - b),
    );
  }

  const chosen = picked.map((i) => SERVICES[i]);
  const message = `${t.message}${chosen.map((s) => s.title).join(", ")}.`;
  const waHref = `${CONTACTS.whatsapp.href}?text=${encodeURIComponent(message)}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-10">
      <div>
        <p className="text-xl font-medium tracking-[-0.03em]">{t.title}</p>
        <p className="mt-1 text-sm text-[var(--f-mute)]">{t.hint}</p>
        <ul className="mt-5 flex flex-col">
          {SERVICES.map((s, i) => {
            const on = picked.includes(i);
            return (
              <li key={s.title}>
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  onClick={() => toggle(i)}
                  className="flex w-full items-center gap-4 border-b border-[var(--f-line)] py-3.5 text-left"
                >
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-full transition-colors ${
                      on
                        ? "bg-[var(--f-tint)] text-[var(--f-orange-2)]"
                        : "bg-[var(--f-card)] text-[var(--f-mute)]"
                    }`}
                  >
                    <Icon name={ICONS[i]} />
                  </span>
                  <span className="flex-1">
                    <span className="block font-medium tracking-[-0.02em]">
                      {s.title}
                    </span>
                    <span className="block text-sm text-[var(--f-mute)]">
                      {s.tags.join(", ")}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                      on ? "bg-[var(--f-orange)]" : "bg-[#e3e1dd]"
                    }`}
                  >
                    <span
                      className={`absolute top-1 size-5 rounded-full bg-white shadow transition-[left] duration-200 ${
                        on ? "left-6" : "left-1"
                      }`}
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="rounded-[28px] border border-[var(--f-line)] bg-white p-6 shadow-[0_24px_60px_-30px_rgba(29,34,48,0.35)] lg:sticky lg:top-24 md:p-8">
        <div className="flex items-center justify-between gap-3">
          <p className="accent text-3xl text-[var(--f-ink)]">{t.bundle}</p>
          <span className="label">
            {picked.length} {plural(picked.length, locale)}
          </span>
        </div>

        {chosen.length === 0 ? (
          <p className="mt-6 text-[var(--f-mute)]">{t.empty}</p>
        ) : (
          <ul className="mt-6 flex flex-col gap-4">
            {chosen.map((s) => (
              <li key={s.title} className="flex gap-3">
                <Icon
                  name="check"
                  className="mt-0.5 size-5 shrink-0 text-[var(--f-orange)]"
                />
                <span>
                  <span className="block font-medium">{s.title}</span>
                  <span className="block text-sm leading-snug text-[var(--f-mute)]">
                    {s.body}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}

        <a
          href={chosen.length ? waHref : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={chosen.length === 0}
          className={`btn-orange mt-8 w-full ${chosen.length ? "" : "pointer-events-none opacity-40"}`}
        >
          {t.button}
        </a>
        <p className="mt-3 text-center text-sm text-[var(--f-mute)]">
          {t.note}
        </p>
      </div>
    </div>
  );
}

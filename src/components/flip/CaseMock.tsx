import type { Case } from "@/lib/agency-content";

// Карточка-«скриншот кабинета» для ленты работ: вместо картинок рисуем интерфейс сами.
export function CaseMock({ c, index }: { c: Case; index: number }) {
  const bars = Array.from({ length: 9 }, (_, i) => 28 + ((i * 37 + index * 23) % 60) + i * 2);
  const dark = index % 2 === 1;
  return (
    <div
      className={`w-[280px] shrink-0 overflow-hidden rounded-2xl border shadow-[0_20px_40px_-24px_rgba(29,34,48,0.45)] sm:w-[340px] ${
        dark ? "border-[#2a2f3d] bg-[#151925] text-white" : "border-[var(--f-line)] bg-white"
      }`}
    >
      <div className={`flex items-center gap-1.5 border-b px-4 py-2.5 ${dark ? "border-[#2a2f3d]" : "border-[var(--f-line)]"}`}>
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className={`ml-3 truncate text-[11px] ${dark ? "text-white/50" : "text-[var(--f-mute)]"}`}>
          {c.niche}
        </span>
      </div>
      <div className="p-5">
        <p className={`text-xs ${dark ? "text-white/60" : "text-[var(--f-mute)]"}`}>{c.geo}</p>
        <p className="mt-1 text-4xl font-bold tracking-[-0.05em]">{c.headline}</p>
        <p className={`mt-1 text-sm ${dark ? "text-white/70" : "text-[var(--f-mute)]"}`}>{c.headlineLabel}</p>
        <div className="mt-5 flex h-20 items-end gap-1.5">
          {bars.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-md"
              style={{
                height: `${Math.min(h, 100)}%`,
                background: i === bars.length - 1 ? "var(--f-orange)" : dark ? "#2f3546" : "#efe9e1",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

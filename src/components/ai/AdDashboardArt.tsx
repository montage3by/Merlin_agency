// Стилизованный, абстрактный макет рекламного кабинета — не реальный скриншот
// и не настоящие цифры, просто визуальный приём, чтобы разбить длинный текст кейса.
const BAR_HEIGHTS = [34, 52, 44, 68, 58, 78, 62, 90];

export function AdDashboardArt({
  accent = "var(--d-lime)",
  className = "",
}: {
  accent?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`overflow-hidden rounded-3xl border border-[var(--d-lav)] bg-white shadow-[0_24px_60px_-32px_rgba(6,6,154,0.35)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-[var(--d-lav)] bg-[var(--d-bg)] px-5 py-3.5">
        <span className="size-2.5 rounded-full bg-[var(--d-pink)]" />
        <span className="size-2.5 rounded-full bg-[var(--d-lime)]" />
        <span className="size-2.5 rounded-full bg-[var(--d-cyan)]" />
        <span className="ml-3 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--d-mute)]">
          Ads Manager
        </span>
      </div>

      <div className="grid gap-5 p-5 sm:grid-cols-[0.9fr_1.4fr] md:p-7">
        <div className="flex flex-col gap-3">
          {["CTR", "CPA", "ROAS"].map((label, i) => (
            <div
              key={label}
              className="flex items-center justify-between gap-3 rounded-xl bg-[var(--d-bg)] px-4 py-3"
            >
              <span className="text-xs font-bold uppercase tracking-wide text-[var(--d-mute)]">
                {label}
              </span>
              <svg viewBox="0 0 64 24" className="h-5 w-16 text-[var(--d-blue)]">
                <path
                  d={
                    [
                      "M2 18 14 12 26 14 38 6 50 9 62 3",
                      "M2 8 14 14 26 10 38 18 50 13 62 20",
                      "M2 16 14 10 26 12 38 4 50 7 62 2",
                    ][i]
                  }
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ))}
          <div className="mt-1 h-2 w-3/4 rounded-full bg-[var(--d-bg)]" />
          <div className="h-2 w-1/2 rounded-full bg-[var(--d-bg)]" />
        </div>

        <div className="flex h-40 items-end gap-2 rounded-2xl bg-[var(--d-bg)] p-5 md:h-48">
          {BAR_HEIGHTS.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-md"
              style={{
                height: `${h}%`,
                background:
                  i === BAR_HEIGHTS.length - 1 ? accent : "var(--d-lav)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

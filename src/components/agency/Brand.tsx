// Логотипы рисуются через маску по PNG из public/brand, поэтому цвет задаётся фоном:
// bg-current берёт цвет текста, .chrome даёт хромированный перелив.

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Merlin Agency"
      className={`mask-wordmark block aspect-[1520/260] bg-current ${className}`}
    />
  );
}

export function WizardMark({
  className = "",
  chrome = false,
}: {
  className?: string;
  chrome?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={`mask-mark block aspect-[142/253] ${chrome ? "chrome" : "bg-current"} ${className}`}
    />
  );
}

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}

export function ArrowIcon({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`${flip ? "rotate-180" : ""} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M3 12h17M13 5l7 7-7 7" />
    </svg>
  );
}

export function Bracket({ left, right }: { left: string; right?: string }) {
  return (
    <span className="inline-flex items-center gap-3 whitespace-nowrap">
      <span>[</span>
      <span>{left}</span>
      {right && (
        <>
          <span
            aria-hidden
            className="inline-block h-px w-10 bg-current md:w-12"
          />
          <span>{right}</span>
        </>
      )}
      <span>]</span>
    </span>
  );
}

// Линейные иллюстрации для плашек услуг, в духе референса.
const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function SearchArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 220" aria-hidden className={className}>
      <rect x="40" y="36" width="190" height="34" rx="17" {...common} />
      <path d="M58 53h120" {...common} strokeDasharray="2 10" />
      <circle cx="232" cy="128" r="44" {...common} />
      <path d="m264 160 34 34" {...common} strokeWidth={10} />
      <path d="M40 104h110M40 128h80M40 152h100M40 176h60" {...common} />
      <path d="M210 40c14-14 30-14 44 0" {...common} />
      <path d="M270 70l10-18 10 18-18-6h16z" fill="currentColor" />
    </svg>
  );
}

export function GrowthArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 220" aria-hidden className={className}>
      <path d="M30 190h260" {...common} />
      <rect x="50" y="130" width="34" height="60" rx="6" {...common} />
      <rect x="104" y="100" width="34" height="90" rx="6" {...common} />
      <rect x="158" y="76" width="34" height="114" rx="6" {...common} />
      <rect
        x="212"
        y="40"
        width="34"
        height="150"
        rx="6"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={3}
      />
      <path
        d="M40 110 C 90 90, 120 70, 170 52 S 250 20, 284 16"
        {...common}
        strokeDasharray="6 10"
      />
      <path d="m270 10 16 6-8 14" {...common} />
    </svg>
  );
}

export function TargetArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 220" aria-hidden className={className}>
      <circle cx="160" cy="112" r="80" {...common} />
      <circle cx="160" cy="112" r="52" {...common} />
      <circle cx="160" cy="112" r="22" fill="currentColor" />
      <path d="M262 30 170 104" {...common} strokeWidth={6} />
      <path d="m246 22 24 4-4 24" {...common} />
      <path
        d="M40 40l14 14M54 40 40 54M270 170l12 12M282 170l-12 12"
        {...common}
      />
    </svg>
  );
}

// Линейные иллюстрации для плашек услуг, в духе референса.
const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function SearchArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 220" aria-hidden className={className}>
      <circle cx="132" cy="108" r="64" {...common} />
      <path d="m178 154 56 56" {...common} strokeWidth={16} />
      <path d="M96 126 122 94 146 114 182 70" {...common} strokeWidth={9} />
      <path d="m166 70 20-4 2 20" {...common} strokeWidth={9} />
      <path
        d="M250 32l9 19 19 9-19 9-9 19-9-19-19-9 19-9z"
        fill="currentColor"
      />
    </svg>
  );
}

export function GrowthArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 220" aria-hidden className={className}>
      <path d="M34 186h252" {...common} />
      <rect x="54" y="140" width="38" height="46" rx="8" {...common} />
      <rect x="114" y="108" width="38" height="78" rx="8" {...common} />
      <rect x="174" y="68" width="38" height="118" rx="8" {...common} />
      <rect x="234" y="30" width="38" height="156" rx="8" fill="currentColor" />
      <path
        d="M44 114c60-18 120-40 184-86"
        {...common}
        strokeWidth={8}
        strokeDasharray="2 18"
      />
      <path d="m206 18 24 8-8 24" {...common} strokeWidth={9} />
    </svg>
  );
}

export function TargetArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 220" aria-hidden className={className}>
      <circle cx="150" cy="110" r="86" {...common} />
      <circle cx="150" cy="110" r="56" {...common} />
      <circle cx="150" cy="110" r="24" fill="currentColor" />
      <path d="M268 24 172 98" {...common} strokeWidth={11} />
      <path d="m246 18 28 4-4 28" {...common} strokeWidth={9} />
    </svg>
  );
}

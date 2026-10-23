// Плотные заливные иллюстрации для плашек услуг: не тонкие линии, а жирные
// силуэты с слоями прозрачности — читаются с первого взгляда, не как скетч.
export function SearchArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 220" aria-hidden className={className}>
      <circle cx="132" cy="106" r="66" fill="currentColor" opacity={0.16} />
      <circle
        cx="132"
        cy="106"
        r="52"
        fill="none"
        stroke="currentColor"
        strokeWidth={22}
      />
      <path
        d="m172 148 66 66"
        fill="none"
        stroke="currentColor"
        strokeWidth={26}
        strokeLinecap="round"
      />
      <circle cx="118" cy="92" r="7" fill="currentColor" />
      <circle cx="142" cy="106" r="7" fill="currentColor" opacity={0.6} />
      <circle cx="118" cy="122" r="7" fill="currentColor" opacity={0.35} />
      <path
        d="M248 28l12 24 24 12-24 12-12 24-12-24-24-12 24-12z"
        fill="currentColor"
      />
    </svg>
  );
}

export function GrowthArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 220" aria-hidden className={className}>
      <rect x="40" y="128" width="46" height="58" rx="10" fill="currentColor" opacity={0.3} />
      <rect x="106" y="96" width="46" height="90" rx="10" fill="currentColor" opacity={0.5} />
      <rect x="172" y="56" width="46" height="130" rx="10" fill="currentColor" opacity={0.75} />
      <rect x="238" y="24" width="46" height="162" rx="10" fill="currentColor" />
      <path
        d="M60 128 230 36"
        fill="none"
        stroke="currentColor"
        strokeWidth={16}
        strokeLinecap="round"
      />
      <path d="M265 17 258 37 244 13Z" fill="currentColor" />
    </svg>
  );
}

export function TargetArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 220" aria-hidden className={className}>
      <circle cx="150" cy="110" r="88" fill="currentColor" opacity={0.18} />
      <circle
        cx="150"
        cy="110"
        r="64"
        fill="none"
        stroke="currentColor"
        strokeWidth={22}
      />
      <circle cx="150" cy="110" r="22" fill="currentColor" />
      <path
        d="M195 65 186 77"
        fill="none"
        stroke="currentColor"
        strokeWidth={14}
        strokeLinecap="round"
      />
      <path d="M158 118 165 62 207 92Z" fill="currentColor" />
    </svg>
  );
}

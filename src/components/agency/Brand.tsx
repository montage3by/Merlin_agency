// Логотип пока только текстом: графический знак устарел и в макете не используется.
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`whitespace-nowrap font-bold tracking-[-0.06em] ${className}`}>
      Merlin Agency
    </span>
  );
}

// Хромированная четырёхлучевая звезда: замена 3D-объекта референса.
export function ChromeStar({ id, className = "" }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className}>
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.18" stopColor="#c9cfdd" />
          <stop offset="0.36" stopColor="#3a4058" />
          <stop offset="0.5" stopColor="#eef1f8" />
          <stop offset="0.64" stopColor="#7d88aa" />
          <stop offset="0.8" stopColor="#1c2a8c" />
          <stop offset="1" stopColor="#b9c6ff" />
        </linearGradient>
        <radialGradient id={`${id}-b`} cx="0.35" cy="0.3" r="0.5">
          <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M50 0c2.6 27.6 22.4 47.4 50 50-27.6 2.6-47.4 22.4-50 50-2.6-27.6-22.4-47.4-50-50C27.6 47.4 47.4 27.6 50 0Z"
        fill={`url(#${id}-a)`}
      />
      <path
        d="M50 0c2.6 27.6 22.4 47.4 50 50-27.6 2.6-47.4 22.4-50 50-2.6-27.6-22.4-47.4-50-50C27.6 47.4 47.4 27.6 50 0Z"
        fill={`url(#${id}-b)`}
      />
    </svg>
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

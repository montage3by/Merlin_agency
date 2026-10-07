// Логотип только текстом: графический знак устарел.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-1 text-[22px] leading-none ${className}`}>
      <span className="font-bold tracking-[-0.05em]">Merlin</span>
      <span className="accent text-[1.08em]">agency</span>
    </span>
  );
}

import Link from "next/link";

const NAV_LINKS = [
  { href: "/#services", label: "Услуги" },
  { href: "/#cases", label: "Кейсы" },
];

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
      <Link href="/" className="font-semibold tracking-tight">
        Merlin Studio
      </Link>
      <nav className="hidden items-center gap-6 md:flex">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/audit"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
        >
          Бесплатный аудит
        </Link>
      </nav>
      <Link
        href="/audit"
        className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink md:hidden"
      >
        Аудит
      </Link>
    </header>
  );
}

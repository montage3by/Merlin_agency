import Link from "next/link";

const STUDIO_NAV_LINKS = [
  { href: "#services", label: "Услуги" },
  { href: "#cases", label: "Кейсы" },
];

export function SiteHeader({ variant = "audit" }: { variant?: "audit" | "studio" }) {
  if (variant === "studio") {
    return (
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-semibold tracking-tight">
          Merlin Studio
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {STUDIO_NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          >
            Бесплатный аудит
          </Link>
        </nav>
        <Link
          href="/"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink md:hidden"
        >
          Аудит
        </Link>
      </header>
    );
  }

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
      <span className="font-semibold tracking-tight">Merlin Studio</span>
      <Link
        href="/studio"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        Услуги агентства
      </Link>
    </header>
  );
}

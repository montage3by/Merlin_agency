import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
      <Link href="/" className="font-semibold tracking-tight">
        Merlin Studio
      </Link>
      <Link href="/" className="text-sm text-muted transition-colors hover:text-foreground">
        Услуги агентства
      </Link>
    </header>
  );
}

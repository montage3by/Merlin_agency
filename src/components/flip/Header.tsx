import { CONTACTS } from "@/lib/agency-content";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4">
        <a href="#top" aria-label="Merlin Agency, наверх">
          <Logo />
        </a>
        <nav className="hidden items-center gap-7 text-sm text-[var(--f-mute)] md:flex" aria-label="Разделы">
          <a href="#services" className="hover:text-[var(--f-ink)]">Услуги</a>
          <a href="#cases" className="hover:text-[var(--f-ink)]">Кейсы</a>
          <a href="#approach" className="hover:text-[var(--f-ink)]">Подход</a>
          <a href="#audit" className="hover:text-[var(--f-ink)]">Аудит</a>
        </nav>
        <a
          href={CONTACTS.telegram.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-orange !px-4 !py-2 text-sm"
        >
          Написать
        </a>
      </div>
    </header>
  );
}

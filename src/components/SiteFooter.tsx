const CONTACTS = [
  { label: "Telegram", href: "https://t.me/ikaINT" },
  {
    label: "WhatsApp",
    href: "https://api.whatsapp.com/send/?phone=%2B79274441668&text&type=phone_number&app_absent=0",
  },
  { label: "Instagram", href: "https://www.instagram.com/mrln_studio" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61562761930572" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-muted md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-semibold text-foreground">Merlin Studio</p>
          <p className="mt-1">Связки, которые продают.</p>
          <a
            href="mailto:merlin_studio@gmail.com"
            className="mt-3 inline-block transition-colors hover:text-foreground"
          >
            merlin_studio@gmail.com
          </a>
        </div>
        <div className="flex gap-5">
          {CONTACTS.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {contact.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

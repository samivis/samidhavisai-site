const links = [
  { label: "Work", href: "#work" },
  { label: "Built", href: "#built" },
  { label: "Story", href: "#story" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-paper/85 backdrop-blur border-b border-line">
      <nav className="mx-auto max-w-[1080px] px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-semibold tracking-tight">Samidha Visai</a>
        <ul className="flex gap-8 text-sm text-ink/60">
          {links.map((l) => (
            <li key={l.href}><a className="hover:text-accent transition-colors" href={l.href}>{l.label}</a></li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

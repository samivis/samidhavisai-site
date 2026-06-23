const links = [
  { label: "Work", href: "#work" },
  { label: "Built", href: "#built" },
  { label: "Story", href: "#story" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <nav className="mx-auto max-w-[1040px] px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-display font-semibold text-lg">Samidha Visai</a>
        <ul className="flex gap-6 text-sm text-gray-600">
          {links.map((l) => (
            <li key={l.href}><a className="hover:text-brand-blue" href={l.href}>{l.label}</a></li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

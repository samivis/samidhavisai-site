import { builds } from "../content";
import { Section } from "./Section";

export function Built() {
  return (
    <Section id="built" heading="Things I've built">
      <div className="grid md:grid-cols-2 gap-px bg-line border border-line">
        {builds.map((b) => (
          <div key={b.name} className="bg-paper p-8">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-xl font-medium">{b.name}</h3>
              <span className="text-xs uppercase tracking-wider text-ink/45 shrink-0">{b.tag}</span>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/65">{b.blurb}</p>
            <p className="mt-4 text-sm text-ink/45">{b.stack}</p>
            {b.link && (
              <a className="mt-5 inline-block text-accent text-sm hover:underline" href={b.link.href} target="_blank" rel="noreferrer">{b.link.label} ↗</a>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

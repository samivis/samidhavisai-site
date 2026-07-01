import { builds } from "../content";
import { Section } from "./Section";

export function Built() {
  return (
    <Section id="built" heading="Things I've built">
      <div className="border-t border-line">
        {builds.map((b) => (
          <div key={b.name} className="border-b border-line py-8 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-x-10 gap-y-3">
            <div>
              <h3 className="text-xl font-medium">{b.name}</h3>
              <div className="mt-2 text-xs uppercase tracking-wider text-ink/45">{b.tag}</div>
            </div>
            <div className="max-w-2xl">
              <p className="text-[15px] leading-relaxed text-ink/65">{b.blurb}</p>
              <p className="mt-3 text-sm text-ink/45">{b.stack}</p>
              {b.link && (
                <a className="mt-4 inline-block text-accent text-sm hover:underline" href={b.link.href} target="_blank" rel="noreferrer">{b.link.label} ↗</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

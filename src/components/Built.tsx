import { builds } from "../content";
import { Section } from "./Section";

export function Built() {
  return (
    <Section id="built" heading="Things I've built">
      <div className="grid md:grid-cols-2 gap-6">
        {builds.map((b) => (
          <div key={b.name} className="rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{b.name}</h3>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-brand-blue">{b.tag}</span>
            </div>
            <p className="mt-3 text-gray-600">{b.blurb}</p>
            <p className="mt-3 text-sm text-gray-500">{b.stack}</p>
            {b.link && (
              <a className="mt-4 inline-block text-brand-blue hover:underline" href={b.link.href} target="_blank" rel="noreferrer">{b.link.label} →</a>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

import { timeline } from "../content";
import { Section } from "./Section";

export function Story() {
  return (
    <Section id="story" heading="The path here">
      <p className="text-gray-600 max-w-2xl mb-8">
        Engineer first, then product. The thread across every chapter: regulated, high-stakes systems where decisions have to be right.
      </p>
      <ol className="border-l border-gray-200 ml-2">
        {timeline.map((t) => (
          <li key={t.org + t.period} className="ml-6 mb-8 relative">
            <span className="absolute -ml-[31px] mt-1.5 h-3 w-3 rounded-full bg-brand-blue" />
            <div className="text-xs text-gray-400">{t.period}</div>
            <div className="font-semibold">{t.org} · <span className="font-normal text-gray-600">{t.role}</span></div>
            <div className="text-sm text-gray-600 mt-1">{t.note}</div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

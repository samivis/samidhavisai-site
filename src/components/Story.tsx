import { timeline } from "../content";
import { Section } from "./Section";

export function Story() {
  return (
    <Section id="story" heading="The path here">
      <p className="text-lg leading-relaxed text-ink/65 max-w-2xl mb-12 -mt-4">
        Engineer first, then product. The thread across every chapter: regulated, high-stakes systems where decisions have to be right.
      </p>
      <ol>
        {timeline.map((t, i) => (
          <li key={t.org + t.period}
            className={`grid grid-cols-[7rem_1fr] gap-6 py-6 ${i !== 0 ? "border-t border-line" : ""}`}>
            <div className="text-sm tabular-nums text-ink/45">{t.period}</div>
            <div>
              <div className="font-medium">{t.org} <span className="text-ink/45 font-normal">· {t.role}</span></div>
              <div className="text-[15px] text-ink/60 mt-1 leading-relaxed">{t.note}</div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

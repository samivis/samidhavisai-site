import { useState } from "react";
import { caseStudies } from "../content";
import { Section } from "./Section";

export function SelectedWork() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="work" heading="Selected work">
      <div className="border-t border-line">
        {caseStudies.map((cs, i) => {
          const isOpen = open === i;
          return (
            <div key={cs.title} className="border-b border-line">
              <button className="w-full flex items-baseline gap-5 py-6 text-left group"
                onClick={() => setOpen(isOpen ? null : i)}>
                <span className="text-sm tabular-nums text-ink/35 w-7 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1">
                  <span className="block text-xl font-medium group-hover:text-accent transition-colors">{cs.title}</span>
                  <span className="block text-sm text-ink/50 mt-1">{cs.role}</span>
                </span>
                <span className="text-ink/30 text-lg shrink-0">{isOpen ? "–" : "+"}</span>
              </button>
              {isOpen && (
                <div className="pl-12 pb-8 text-[15px] leading-relaxed text-ink/65 space-y-3 max-w-2xl">
                  <p><span className="text-ink/45">Problem.</span> {cs.problem}</p>
                  <p><span className="text-ink/45">What I did.</span> {cs.did}</p>
                  <p><span className="text-ink/45">Outcome.</span> {cs.outcome}</p>
                  {cs.link && (
                    <a className="inline-block text-accent hover:underline pt-1" href={cs.link.href} target="_blank" rel="noreferrer">{cs.link.label} ↗</a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

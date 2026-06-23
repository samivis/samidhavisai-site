import { useState } from "react";
import { caseStudies } from "../content";
import { Section } from "./Section";

export function SelectedWork() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="work" heading="Selected work">
      <div className="divide-y divide-gray-100 border-y border-gray-100">
        {caseStudies.map((cs, i) => {
          const isOpen = open === i;
          return (
            <div key={cs.title} className="py-5">
              <button className="w-full flex items-center justify-between text-left"
                onClick={() => setOpen(isOpen ? null : i)}>
                <div>
                  <div className="text-lg font-semibold">{cs.title}</div>
                  <div className="text-sm text-brand-blue">{cs.role}</div>
                </div>
                <span className="text-gray-400 text-xl">{isOpen ? "–" : "+"}</span>
              </button>
              {isOpen && (
                <div className="mt-4 text-gray-600 space-y-2 max-w-2xl">
                  <p><span className="font-medium text-brand-ink">Problem: </span>{cs.problem}</p>
                  <p><span className="font-medium text-brand-ink">What I did: </span>{cs.did}</p>
                  <p><span className="font-medium text-brand-ink">Outcome: </span>{cs.outcome}</p>
                  {cs.link && (
                    <a className="inline-block text-brand-blue hover:underline" href={cs.link.href} target="_blank" rel="noreferrer">{cs.link.label} →</a>
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

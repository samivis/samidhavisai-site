import { toolkit } from "../content";
import { Section } from "./Section";

export function Toolkit() {
  return (
    <Section id="toolkit" heading="Toolkit">
      <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
        {Object.entries(toolkit).map(([group, items]) => (
          <div key={group} className="grid grid-cols-[8rem_1fr] gap-6 items-baseline">
            <div className="text-sm font-medium text-ink/45">{group}</div>
            <div className="text-[15px] text-ink/75 leading-relaxed">
              {items.join("  ·  ")}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

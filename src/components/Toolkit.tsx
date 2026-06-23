import { toolkit } from "../content";
import { Section } from "./Section";

export function Toolkit() {
  return (
    <Section id="toolkit" heading="Toolkit">
      <div className="grid sm:grid-cols-2 gap-8">
        {Object.entries(toolkit).map(([group, items]) => (
          <div key={group}>
            <div className="text-sm font-semibold text-gray-500 mb-3">{group}</div>
            <div className="flex flex-wrap gap-2">
              {items.map((it) => (
                <span key={it} className="text-sm px-3 py-1 rounded-full border border-gray-200 text-gray-700">{it}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

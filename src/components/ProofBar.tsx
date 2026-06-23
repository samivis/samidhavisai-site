import { proofStats } from "../content";

export function ProofBar() {
  return (
    <div className="border-y border-line">
      <div className="mx-auto max-w-[1080px] px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
        {proofStats.map((s) => (
          <div key={s.label}>
            <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-accent">{s.value}</div>
            <div className="text-sm text-ink/55 mt-2 leading-snug">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { proofStats } from "../content";

export function ProofBar() {
  return (
    <div className="bg-brand-dark text-white">
      <div className="mx-auto max-w-[1040px] px-6 py-10 grid grid-cols-2 md:grid-cols-5 gap-8">
        {proofStats.map((s) => (
          <div key={s.label}>
            <div className="text-2xl font-display font-semibold text-white">{s.value}</div>
            <div className="text-xs text-gray-300 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

import type { ReactNode } from "react";

export function Section({ id, heading, children }: { id: string; heading?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-[1080px] px-6 py-20">
      {heading && (
        <h2 className="text-xs uppercase tracking-[0.18em] text-ink/45 mb-12">{heading}</h2>
      )}
      {children}
    </section>
  );
}

import type { ReactNode } from "react";

export function Section({ id, heading, children }: { id: string; heading?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-[1040px] px-6 py-20">
      {heading && <h2 className="text-3xl sm:text-4xl font-semibold mb-10">{heading}</h2>}
      {children}
    </section>
  );
}

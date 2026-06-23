import { hero } from "../content";

export function Hero() {
  return (
    <section className="mx-auto max-w-[1040px] px-6 pt-16 pb-12 grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
      <div>
        <h1 className="text-4xl sm:text-5xl leading-tight font-semibold tracking-tight">{hero.headline}</h1>
        <p className="mt-6 text-lg text-gray-600 max-w-xl">{hero.subhead}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {hero.chips.map((c) => (
            <span key={c} className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-brand-blue">{c}</span>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {hero.ctas.map((c) => (
            <a key={c.label} href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noreferrer" : undefined}
              className={
                c.kind === "primary" ? "px-5 py-2.5 rounded-lg bg-brand-blue text-white font-medium" :
                c.kind === "secondary" ? "px-5 py-2.5 rounded-lg border border-brand-blue text-brand-blue font-medium" :
                "px-5 py-2.5 rounded-lg text-gray-600 font-medium hover:text-brand-blue"
              }>{c.label}</a>
          ))}
        </div>
      </div>
      <img src={hero.headshot} alt="Samidha Visai" className="rounded-2xl w-full object-cover shadow-sm" />
    </section>
  );
}

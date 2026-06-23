import { hero } from "../content";

export function Hero() {
  return (
    <section className="mx-auto max-w-[1080px] px-6 pt-20 pb-16 grid md:grid-cols-[1.5fr_1fr] gap-14 items-center">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-ink/45">{hero.eyebrow}</p>
        <h1 className="mt-6 text-4xl sm:text-[3.25rem] leading-[1.05] font-semibold">{hero.headline}</h1>
        <p className="mt-7 text-lg leading-relaxed text-ink/65 max-w-xl">{hero.subhead}</p>
        <div className="mt-9 flex flex-wrap items-center gap-6">
          <a href="#work" className="px-5 py-2.5 rounded-md bg-accent text-paper text-sm font-medium hover:opacity-90 transition-opacity">See my work</a>
          <a href={hero.ctas[1].href} target="_blank" rel="noreferrer" className="text-sm font-medium text-ink/70 hover:text-accent transition-colors">LinkedIn ↗</a>
        </div>
      </div>
      <div className="md:justify-self-end mx-auto md:mx-0 w-full max-w-[260px] aspect-[4/5] overflow-hidden rounded-md">
        <img src={hero.headshot} alt="Samidha Visai"
          className="w-full h-full object-cover object-top scale-[1.45] origin-top grayscale-[12%]" />
      </div>
    </section>
  );
}

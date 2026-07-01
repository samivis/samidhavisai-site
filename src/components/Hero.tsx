import { useEffect, useRef } from "react";
import { hero, contact } from "../content";
import { LinkedInIcon, GitHubIcon } from "./SocialIcons";

export function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);

  // Subtle parallax on scroll — image drifts slower than the page.
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        el.style.transform = `translateY(${y * 0.06}px) scale(1.06)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="mx-auto max-w-[1080px] px-6 pt-20 pb-16 grid md:grid-cols-[1.15fr_1fr] gap-14 items-stretch">
      <div className="hero-rise self-center">
        <p className="text-xs uppercase tracking-[0.18em] text-ink/45">{hero.eyebrow}</p>
        <h1 className="mt-6 text-4xl sm:text-[3.25rem] leading-[1.05] font-semibold">{hero.headline}</h1>
        <p className="mt-7 text-lg leading-relaxed text-ink/65 max-w-xl">{hero.subhead}</p>
        <div className="mt-9 flex flex-wrap items-center gap-6">
          <a href="#work" className="px-5 py-2.5 rounded-md bg-accent text-paper text-sm font-medium hover:opacity-90 transition-opacity">See my work</a>
          <a href={hero.ctas[1].href} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-ink/60 hover:text-accent transition-colors"><LinkedInIcon className="w-6 h-6" /></a>
          <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-ink/60 hover:text-accent transition-colors"><GitHubIcon className="w-6 h-6" /></a>
        </div>
      </div>
      <div className="hero-reveal md:justify-self-end w-full min-h-[420px] md:min-h-[560px] overflow-hidden rounded-lg">
        <img ref={imgRef} src={hero.headshot} alt="Samidha Visai"
          className="w-full h-full object-cover object-top grayscale-[10%] will-change-transform"
          style={{ transform: "scale(1.06)" }} />
      </div>
    </section>
  );
}

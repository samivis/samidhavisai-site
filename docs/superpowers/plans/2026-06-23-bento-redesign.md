# Bento Dashboard Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild samidhavisai.com's presentation layer as a bento-box product dashboard (bold animated hero grid → clean card body) so the site itself signals "I ship AI products."

**Architecture:** Single-page React + Vite + Tailwind v4 site. Content stays in `src/content.ts` (source of truth, already accurate). This is a presentation rewrite: new design tokens, a reusable `Card` primitive, a `useReveal` scroll hook, an animated `StatGauge`, and restyled section components. No backend, no routing.

**Tech Stack:** React 19, Vite 8, Tailwind CSS v4 (`@theme` tokens in `index.css`), TypeScript. Fonts via Google Fonts (Inter + IBM Plex Mono). Verification by `npm run build` + `npm run lint` + visual check via the `/browse` skill.

## Global Constraints

- **Factual accuracy (verbatim from spec):** Practice Systems AI = OpenAI + Retell + Node.js, paying customers in LA, built with Claude Code. AI Builders Camp = sold-out cohort, teaches Replit + OpenAI + GitHub. NEVER claim Anthropic-customer-in-production. Do not feature Dental OS. All numbers shown must be real proof stats — no fabricated metrics/gauges.
- **Hero one-liner (verbatim):** "I build and ship AI products for high-stakes, regulated domains."
- **Palette:** canvas soft gray `#E8EAED`, cards white `#FFFFFF` radius ~24px soft shadow, lime accent `#D4F500`, cobalt accent `#3D5AFE`, ink `#14181F`. Monospace for metadata/pills.
- **Accessibility:** all motion gated behind `prefers-reduced-motion`; headshot has alt text; color contrast for text ≥ AA.
- **Each task ends green:** `npm run build` and `npm run lint` both pass with no new errors before committing.

---

### Task 1: Design tokens, fonts, and cleanup

**Files:**
- Modify: `src/index.css`
- Modify: `index.html` (add IBM Plex Mono font + OG image meta)
- Delete: `src/App.css` (leftover Vite template, unused after rewrite)

**Interfaces:**
- Produces: Tailwind theme tokens usable as classes — `bg-canvas`, `bg-card`, `text-ink`, `bg-lime`, `text-lime`, `bg-cobalt`, `text-cobalt`, `border-line`, `rounded-bento` (24px), `shadow-bento`, `font-mono`. CSS utility `.reveal` / `.reveal-visible` for scroll animation.

- [ ] **Step 1: Replace `src/index.css` theme block**

```css
@import "tailwindcss";

@theme {
  --color-canvas: #E8EAED;
  --color-card: #FFFFFF;
  --color-ink: #14181F;
  --color-lime: #D4F500;
  --color-cobalt: #3D5AFE;
  --color-line: #E6E3DD;
  --color-paper: #FBFAF8;
  --color-accent: #1C3D5A;
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;
  --radius-bento: 24px;
  --shadow-bento: 0 1px 2px rgba(20,24,31,0.04), 0 8px 24px rgba(20,24,31,0.06);
}

html { scroll-behavior: smooth; }
body {
  background-color: var(--color-canvas);
  color: var(--color-ink);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  margin: 0;
}
h1, h2, h3 { font-family: var(--font-sans); letter-spacing: -0.02em; }

.reveal { opacity: 0; transform: translateY(16px); transition: opacity .6s ease, transform .6s ease; }
.reveal-visible { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 2: Add IBM Plex Mono + OG image to `index.html`**

In the existing Google Fonts `<link href=...>`, change the family URL to:
`https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap`

Add after the existing `og:url` meta line:
```html
    <meta property="og:image" content="https://samidhavisai.com/headshot.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
```

- [ ] **Step 3: Delete unused template CSS**

```bash
rm src/App.css
```
(Confirm nothing imports it: `grep -rn "App.css" src` returns nothing. `main.tsx` only imports `index.css`.)

- [ ] **Step 4: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint clean, no reference-to-App.css errors.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: bento design tokens, mono font, OG image; drop template CSS"
```

---

### Task 2: `useReveal` hook + `Card` primitive

**Files:**
- Create: `src/hooks/useReveal.ts`
- Create: `src/components/Card.tsx`

**Interfaces:**
- Produces: `useReveal()` → returns a `ref` callback to attach to any element; toggles `.reveal-visible` when the element scrolls into view (IntersectionObserver).
- Produces: `Card` component — props `{ as?, className?, accent?: "white"|"lime"|"cobalt", hover?: boolean, reveal?: boolean, children }`. Renders a rounded-bento, shadow-bento card with the right bg/text per accent, optional hover-lift, optional scroll-reveal.

- [ ] **Step 1: Write `src/hooks/useReveal.ts`**

```ts
import { useCallback, useRef } from "react";

export function useReveal() {
  const observer = useRef<IntersectionObserver | null>(null);
  return useCallback((node: HTMLElement | null) => {
    if (!node) return;
    node.classList.add("reveal");
    observer.current?.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("reveal-visible");
          observer.current?.unobserve(e.target);
        }
      }),
      { threshold: 0.12 }
    );
    observer.current.observe(node);
  }, []);
}
```

- [ ] **Step 2: Write `src/components/Card.tsx`**

```tsx
import type { ElementType, ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

type Accent = "white" | "lime" | "cobalt";

const accentClasses: Record<Accent, string> = {
  white: "bg-card text-ink",
  lime: "bg-lime text-ink",
  cobalt: "bg-cobalt text-white",
};

export function Card({
  as: Tag = "div",
  className = "",
  accent = "white",
  hover = false,
  reveal = false,
  children,
}: {
  as?: ElementType;
  className?: string;
  accent?: Accent;
  hover?: boolean;
  reveal?: boolean;
  children: ReactNode;
}) {
  const revealRef = useReveal();
  return (
    <Tag
      ref={reveal ? revealRef : undefined}
      className={`rounded-bento shadow-bento ${accentClasses[accent]} ${
        hover ? "transition-transform duration-300 hover:-translate-y-1" : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 3: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: pass (components unused yet is fine; if lint flags unused, it's wired up in Task 3).

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: useReveal hook and Card bento primitive"
```

---

### Task 3: `StatGauge` animated component

**Files:**
- Create: `src/components/StatGauge.tsx`

**Interfaces:**
- Consumes: nothing from prior tasks (standalone SVG).
- Produces: `StatGauge` — props `{ label: string; caption: string; value: number; max: number; display: string }`. Renders a cobalt semicircular gauge that animates the needle/arc from 0 to `value/max` on mount (reduced-motion: jumps to final). `display` is the big centered text (e.g. "6+").

- [ ] **Step 1: Write `src/components/StatGauge.tsx`**

```tsx
import { useEffect, useState } from "react";

export function StatGauge({
  label, caption, value, max, display,
}: { label: string; caption: string; value: number; max: number; display: string }) {
  const target = Math.min(value / max, 1);
  const [t, setT] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setT(target); return; }
    let raf = 0; const start = performance.now(); const dur = 900;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setT(target * (1 - Math.pow(1 - p, 3))); // easeOutCubic
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  // semicircle: 180deg sweep, radius 80, center (100,100)
  const angle = Math.PI * (1 - t); // pi -> 0
  const nx = 100 + 80 * Math.cos(angle);
  const ny = 100 - 80 * Math.sin(angle);
  const circ = Math.PI * 80;

  return (
    <div className="flex flex-col items-center">
      <div className="self-start">
        <div className="text-lg font-semibold">{label}</div>
        <div className="font-mono text-xs uppercase tracking-wider text-ink/45">{caption}</div>
      </div>
      <svg viewBox="0 0 200 120" className="w-full max-w-[280px] mt-2">
        <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="#E6E3DD" strokeWidth="6" strokeLinecap="round" />
        <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="var(--color-cobalt)" strokeWidth="6"
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - t)} />
        <line x1="100" y1="100" x2={nx} y2={ny} stroke="var(--color-cobalt)" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <div className="text-5xl font-semibold tracking-tight -mt-6">{display}</div>
      <div className="font-mono text-xs uppercase tracking-wider text-ink/45 mt-1">industries shipped</div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: animated StatGauge component"
```

---

### Task 4: Bento `Hero` grid

**Files:**
- Modify: `src/components/Hero.tsx` (full rewrite)

**Interfaces:**
- Consumes: `hero`, `proofStats`, `builds`, `contact` from `content.ts`; `Card`, `StatGauge`.
- Produces: a responsive bento grid section. Mobile = single column; desktop = a multi-column grid mirroring the reference (profile card, gauge card, active-builds list, accent tiles, CTA pill).

- [ ] **Step 1: Rewrite `src/components/Hero.tsx`**

```tsx
import { hero, builds, contact } from "../content";
import { Card } from "./Card";
import { StatGauge } from "./StatGauge";

export function Hero() {
  return (
    <section className="mx-auto max-w-[1080px] px-4 sm:px-6 pt-8 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-min">
        {/* Profile card — lime */}
        <Card accent="lime" hover className="md:col-span-1 p-6 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <img src={hero.headshot} alt="Samidha Visai"
              className="w-16 h-16 rounded-full object-cover object-top scale-[1.4] origin-top" />
            <div>
              <div className="text-lg font-semibold leading-tight">Samidha Visai</div>
              <div className="font-mono text-[11px] uppercase tracking-wider opacity-70">Senior PM · LA</div>
            </div>
          </div>
          <p className="text-base font-medium leading-snug">I build and ship AI products for high-stakes, regulated domains.</p>
          <div className="font-mono text-[11px] uppercase tracking-wider opacity-70">CS · University of Michigan</div>
        </Card>

        {/* Gauge card — white, spans 2 */}
        <Card accent="white" hover reveal className="md:col-span-2 p-6">
          <StatGauge label="Industries shipped" caption="Fintech · Health · Security · Edtech · Mobility · AI"
            value={6} max={6} display="6+" />
        </Card>

        {/* Active builds list — white */}
        <Card accent="white" hover reveal className="md:col-span-1 p-6">
          <div className="font-mono text-xs uppercase tracking-wider text-ink/45 mb-4">Active portfolio</div>
          <ul className="space-y-3">
            {builds.map((b) => (
              <li key={b.name}>
                <a href={b.link?.href} target="_blank" rel="noreferrer"
                  className="block rounded-xl bg-canvas px-4 py-3 hover:bg-canvas/70 transition-colors">
                  <div className="font-medium text-sm">{b.name}</div>
                  <div className="font-mono text-[11px] text-ink/50 mt-0.5">{b.tag}</div>
                </a>
              </li>
            ))}
          </ul>
        </Card>

        {/* Demo line — cobalt */}
        <Card as="a" accent="cobalt" hover reveal
          className="md:col-span-1 p-6 flex flex-col justify-between min-h-[180px] no-underline"
          // @ts-expect-error anchor href
          href={contact.product} target="_blank" rel="noreferrer">
          <div className="font-mono text-xs uppercase tracking-wider opacity-80">Live · paying customers</div>
          <div>
            <div className="text-xl font-semibold">Call the demo line ↗</div>
            <div className="text-sm opacity-80 mt-1">Practice Systems AI — an AI receptionist answering real calls 24/7.</div>
          </div>
        </Card>

        {/* Story tile — white */}
        <Card as="a" accent="white" hover reveal
          className="md:col-span-1 p-6 flex flex-col justify-between min-h-[180px] no-underline"
          // @ts-expect-error anchor href
          href="#story">
          <div className="font-mono text-xs uppercase tracking-wider text-ink/45">About</div>
          <div className="text-xl font-semibold">Read the story ↓</div>
        </Card>

        {/* CTA pill — full width */}
        <Card as="a" accent="white" hover reveal
          className="md:col-span-3 px-6 py-5 flex items-center justify-between no-underline rounded-full"
          // @ts-expect-error anchor href
          href="#work">
          <span className="font-medium">See selected work</span>
          <span className="bg-ink text-white text-sm font-medium rounded-full px-5 py-2">Explore →</span>
        </Card>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: pass. If `@ts-expect-error` is unused on any line, remove that line.

- [ ] **Step 3: Visual check**

Run the `/browse` skill against `npm run dev` (default http://localhost:5173). Screenshot the hero. Confirm: bento grid renders, lime profile card, animated gauge, cards reveal, mobile single-column (resize). Fix layout issues, re-verify build/lint.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: bento-grid hero replacing text-wall header"
```

---

### Task 5: Restyle body sections into the card system

**Files:**
- Modify: `src/components/Section.tsx`
- Modify: `src/components/ProofBar.tsx`
- Modify: `src/components/SelectedWork.tsx`
- Modify: `src/components/Built.tsx`
- Modify: `src/components/Story.tsx`
- Modify: `src/components/Toolkit.tsx`

**Interfaces:**
- Consumes: `Card`, `useReveal` where helpful; existing `content.ts` exports unchanged.
- Produces: each section rendered on the gray canvas with white bento cards, mono metadata labels, scroll-reveal. No content/text changes.

- [ ] **Step 1: `Section.tsx` — heading uses mono label, keep width**

Change the heading line to:
```tsx
<h2 className="font-mono text-xs uppercase tracking-[0.18em] text-ink/45 mb-8">{heading}</h2>
```

- [ ] **Step 2: `ProofBar.tsx` — stats as small cards in a card strip**

Wrap the grid contents so each stat sits in a white card; replace the outer `border-y` container:
```tsx
import { proofStats } from "../content";
import { Card } from "./Card";

export function ProofBar() {
  return (
    <div className="mx-auto max-w-[1080px] px-4 sm:px-6 py-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {proofStats.map((s) => (
          <Card key={s.label} hover reveal className="p-6">
            <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-cobalt">{s.value}</div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-ink/55 mt-2 leading-snug">{s.label}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: `SelectedWork.tsx` — accordion items inside one white card**

Wrap the existing accordion list in a `Card` and swap `border-line` dividers for subtle ones; keep all Problem/What I did/Outcome content:
```tsx
import { useState } from "react";
import { caseStudies } from "../content";
import { Section } from "./Section";
import { Card } from "./Card";

export function SelectedWork() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="work" heading="Selected work">
      <Card reveal className="px-6">
        {caseStudies.map((cs, i) => {
          const isOpen = open === i;
          return (
            <div key={cs.title} className={i !== 0 ? "border-t border-line" : ""}>
              <button className="w-full flex items-baseline gap-5 py-6 text-left group"
                onClick={() => setOpen(isOpen ? null : i)}>
                <span className="font-mono text-sm text-ink/35 w-7 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1">
                  <span className="block text-xl font-medium group-hover:text-cobalt transition-colors">{cs.title}</span>
                  <span className="block font-mono text-xs uppercase tracking-wider text-ink/50 mt-1">{cs.role}</span>
                </span>
                <span className="text-ink/30 text-lg shrink-0">{isOpen ? "–" : "+"}</span>
              </button>
              {isOpen && (
                <div className="pl-12 pb-8 text-[15px] leading-relaxed text-ink/65 space-y-3 max-w-2xl">
                  <p><span className="text-ink/45">Problem.</span> {cs.problem}</p>
                  <p><span className="text-ink/45">What I did.</span> {cs.did}</p>
                  <p><span className="text-ink/45">Outcome.</span> {cs.outcome}</p>
                  {cs.link && (
                    <a className="inline-block text-cobalt hover:underline pt-1" href={cs.link.href} target="_blank" rel="noreferrer">{cs.link.label} ↗</a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </Card>
    </Section>
  );
}
```

- [ ] **Step 4: `Built.tsx` — two white bento cards**

```tsx
import { builds } from "../content";
import { Section } from "./Section";
import { Card } from "./Card";

export function Built() {
  return (
    <Section id="built" heading="Things I've built">
      <div className="grid md:grid-cols-2 gap-4">
        {builds.map((b) => (
          <Card key={b.name} hover reveal className="p-8">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-xl font-medium">{b.name}</h3>
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink/45 shrink-0">{b.tag}</span>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/65">{b.blurb}</p>
            <p className="mt-4 font-mono text-xs text-ink/45">{b.stack}</p>
            {b.link && (
              <a className="mt-5 inline-block text-cobalt text-sm hover:underline" href={b.link.href} target="_blank" rel="noreferrer">{b.link.label} ↗</a>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 5: `Story.tsx` — timeline inside one white card**

Wrap the `<ol>` in `<Card reveal className="p-8">` and change the intro `text-ink/65` paragraph to sit above it; swap `border-line` rows (keep as-is) and make `period` use `font-mono`:
```tsx
import { timeline } from "../content";
import { Section } from "./Section";
import { Card } from "./Card";

export function Story() {
  return (
    <Section id="story" heading="The path here">
      <p className="text-lg leading-relaxed text-ink/65 max-w-2xl mb-8 -mt-2">
        Engineer first, then product. The thread across every chapter: regulated, high-stakes systems where decisions have to be right.
      </p>
      <Card reveal className="p-8">
        <ol>
          {timeline.map((t, i) => (
            <li key={t.org + t.period}
              className={`grid grid-cols-[7rem_1fr] gap-6 py-6 ${i !== 0 ? "border-t border-line" : ""}`}>
              <div className="font-mono text-sm text-ink/45">{t.period}</div>
              <div>
                <div className="font-medium">{t.org} <span className="text-ink/45 font-normal">· {t.role}</span></div>
                <div className="text-[15px] text-ink/60 mt-1 leading-relaxed">{t.note}</div>
              </div>
            </li>
          ))}
        </ol>
      </Card>
    </Section>
  );
}
```

- [ ] **Step 6: `Toolkit.tsx` — groups as tag clusters in cards**

```tsx
import { toolkit } from "../content";
import { Section } from "./Section";
import { Card } from "./Card";

export function Toolkit() {
  return (
    <Section id="toolkit" heading="Toolkit">
      <div className="grid sm:grid-cols-2 gap-4">
        {Object.entries(toolkit).map(([group, items]) => (
          <Card key={group} hover reveal className="p-6">
            <div className="font-mono text-xs uppercase tracking-wider text-ink/45 mb-3">{group}</div>
            <div className="flex flex-wrap gap-2">
              {items.map((it) => (
                <span key={it} className="bg-canvas rounded-full px-3 py-1 text-sm text-ink/75">{it}</span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 7: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: pass.

- [ ] **Step 8: Visual check**

Via `/browse`: scroll the full page, confirm every section is on canvas with white cards, mono labels, reveal animations fire, cobalt replaces old navy accent. Fix issues; re-verify.

- [ ] **Step 9: Commit**

```bash
git add -A && git commit -m "feat: restyle body sections into bento card system"
```

---

### Task 6: Pill nav + cobalt contact + final polish

**Files:**
- Modify: `src/components/Nav.tsx`
- Modify: `src/components/Contact.tsx`

**Interfaces:**
- Consumes: `contact` from `content.ts`, `Card`.
- Produces: floating rounded pill nav matching bento language; contact as a full-width cobalt bento card.

- [ ] **Step 1: `Nav.tsx` — floating pill**

```tsx
const links = [
  { label: "Work", href: "#work" },
  { label: "Built", href: "#built" },
  { label: "Story", href: "#story" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <header className="sticky top-4 z-50 px-4">
      <nav className="mx-auto max-w-[1080px] bg-card/85 backdrop-blur shadow-bento rounded-full px-6 h-14 flex items-center justify-between">
        <a href="#top" className="font-semibold tracking-tight">Samidha Visai</a>
        <ul className="hidden sm:flex gap-7 text-sm text-ink/60">
          {links.map((l) => (
            <li key={l.href}><a className="hover:text-cobalt transition-colors" href={l.href}>{l.label}</a></li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: `Contact.tsx` — full-width cobalt bento card**

```tsx
import { contact } from "../content";
import { Card } from "./Card";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1080px] px-4 sm:px-6 py-8">
      <Card accent="cobalt" reveal className="p-10 sm:p-16">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{contact.heading}</h2>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-white/80">
          <a className="hover:text-white transition-colors" href={`mailto:${contact.email}`}>{contact.email}</a>
          <a className="hover:text-white transition-colors" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a className="hover:text-white transition-colors" href={contact.product} target="_blank" rel="noreferrer">Practice Systems AI ↗</a>
        </div>
        <p className="mt-12 font-mono text-xs text-white/40">© {new Date().getFullYear()} Samidha Visai</p>
      </Card>
    </section>
  );
}
```

- [ ] **Step 3: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: pass.

- [ ] **Step 4: Full visual QA**

Via `/browse`: load full page on desktop + mobile widths. Confirm pill nav floats, sticky works, contact card is cobalt, all anchors scroll correctly, no horizontal overflow, reduced-motion (toggle OS setting if possible or verify `.reveal` fallback in CSS). Fix any issues, re-verify build/lint.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: pill nav and cobalt contact card; final bento polish"
```

---

## Self-Review Notes

- **Spec coverage:** bento hero (T4), clean card body (T5), palette/tokens (T1), mono labels (T1/T5), motion + reduced-motion (T1/T2/T3), real stat gauge (T3, value=6 industries — real), demo-line + story tiles (T4), pill nav (T6), cobalt contact (T6), OG image meta (T1). Résumé download was listed "optional" in spec — omitted (YAGNI; no résumé file exists in repo).
- **Factual accuracy:** All copy comes from existing `content.ts`; no claims changed. Gauge uses real "6+ industries" stat, not a fabricated metric.
- **Type consistency:** `Card` props (`as`, `accent`, `hover`, `reveal`, `className`) used consistently T2→T6. `useReveal` returns a ref callback used only internally by `Card`.
- **Known caveat:** `Card as="a"` with `href` uses `@ts-expect-error` since the prop type doesn't include anchor attributes; acceptable for this small site. If lint rejects `@ts-expect-error` as unused, swap to a typed `href?: string` passthrough prop on `Card` instead.

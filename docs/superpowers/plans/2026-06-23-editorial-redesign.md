# Editorial Studio Redesign (Version B) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Rebuild samidhavisai.com's presentation layer in a refined editorial design-studio aesthetic (serif display, warm paper, centered) as Version B, in parallel with the bento Version A.

**Architecture:** Single-page React + Vite + Tailwind v4. Content stays in `src/content.ts` (already accurate). Presentation rewrite: warm editorial tokens, serif display font, mono eyebrows, a `useReveal` hook, a composed `Showcase` mockup from real stats, editorial case-study cards.

**Tech Stack:** React 19, Vite 8, Tailwind v4 (`@theme` in `index.css`), TypeScript. Fonts: Instrument Serif (display) + Inter (body) + IBM Plex Mono (eyebrows) via Google Fonts. Verification: `npm run build` + `npm run lint` + visual `/browse`.

## Global Constraints

- **Build on branch `redesign-editorial`** off current main (do NOT mix with Version A).
- **Factual accuracy (verbatim):** Practice Systems AI = OpenAI + Retell + Node.js, paying customers LA, built with Claude Code. AI Builders Camp = sold-out cohort, Replit + OpenAI + GitHub. NEVER claim Anthropic-customer-in-production. No Dental OS. All numbers real — no fabricated metrics or fake external screenshots.
- **Hero one-liner (verbatim):** "Building AI products and the stories behind them, for high-stakes domains."
- **Hero eyebrow (verbatim):** "AVAILABLE FOR NEW ROLES"
- **Palette:** paper `#F7F5F1`, ink `#1A1A1A`, accent blue `#2F4FE0`, muted warm gray `#8A857C`, hairline `#E3DFD7`.
- **Accessibility:** motion gated behind `prefers-reduced-motion`; alt text on images; AA contrast.
- **Each task ends green:** `npm run build` + `npm run lint` pass before commit.

---

### Task 0: Branch setup

- [ ] **Step 1: Create and switch to the editorial branch**

```bash
git checkout -b redesign-editorial
git log --oneline -1   # should be the plan/spec commit on main base
```

- [ ] **Step 2: Confirm clean tree**

Run: `git status` → expected: "nothing to commit, working tree clean".

---

### Task 1: Editorial tokens + fonts

**Files:**
- Modify: `src/index.css`
- Modify: `index.html`
- Delete: `src/App.css` (unused Vite template)

**Interfaces:**
- Produces: classes `bg-paper`, `text-ink`, `text-accent`/`bg-accent`, `text-muted`, `border-hair`, `font-serif`, `font-mono`; `.reveal`/`.reveal-visible` utilities.

- [ ] **Step 1: Replace `src/index.css`**

```css
@import "tailwindcss";

@theme {
  --color-paper: #F7F5F1;
  --color-ink: #1A1A1A;
  --color-accent: #2F4FE0;
  --color-muted: #8A857C;
  --color-hair: #E3DFD7;
  --font-sans: "Inter", system-ui, sans-serif;
  --font-serif: "Instrument Serif", Georgia, serif;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;
}

html { scroll-behavior: smooth; }
body {
  background-color: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  margin: 0;
}

.reveal { opacity: 0; transform: translateY(14px); transition: opacity .7s ease, transform .7s ease; }
.reveal-visible { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 2: Update fonts + OG image in `index.html`**

Change the Google Fonts `<link href=...>` to:
`https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&display=swap`

Add after `og:url` meta:
```html
    <meta property="og:image" content="https://samidhavisai.com/headshot.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
```

- [ ] **Step 3: Delete template CSS**

```bash
rm src/App.css
```
Confirm: `grep -rn "App.css" src` returns nothing (main.tsx imports only index.css).

- [ ] **Step 4: Verify + commit**

```bash
npm run build && npm run lint
git add -A && git commit -m "feat(editorial): warm tokens, serif+mono fonts, OG image"
```

---

### Task 2: `useReveal` hook + `Eyebrow` component

**Files:**
- Create: `src/hooks/useReveal.ts`
- Create: `src/components/Eyebrow.tsx`

**Interfaces:**
- Produces: `useReveal()` → ref callback adding `.reveal` then `.reveal-visible` on intersect.
- Produces: `Eyebrow` — props `{ children, className? }`; renders mono uppercase letter-spaced muted label.

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

- [ ] **Step 2: Write `src/components/Eyebrow.tsx`**

```tsx
import type { ReactNode } from "react";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-[11px] uppercase tracking-[0.22em] text-muted ${className}`}>
      {children}
    </p>
  );
}
```

- [ ] **Step 3: Verify + commit**

```bash
npm run build && npm run lint
git add -A && git commit -m "feat(editorial): useReveal hook and Eyebrow"
```

---

### Task 3: Editorial `Nav`

**Files:**
- Modify: `src/components/Nav.tsx` (full rewrite)

**Interfaces:**
- Consumes: nothing new. Produces: centered editorial top bar with "Let's talk" pill.

- [ ] **Step 1: Rewrite `src/components/Nav.tsx`**

```tsx
const links = [
  { label: "Work", href: "#work" },
  { label: "Story", href: "#story" },
  { label: "Toolkit", href: "#toolkit" },
  { label: "About", href: "#story" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-paper/85 backdrop-blur">
      <nav className="mx-auto max-w-[1100px] px-6 h-16 grid grid-cols-[1fr_auto_1fr] items-center">
        <a href="#top" className="flex items-center gap-2 font-medium tracking-tight">
          <span className="inline-block w-4 h-4 rounded-full bg-accent" />
          samidha visai
        </a>
        <ul className="hidden sm:flex gap-8 text-sm text-ink/70 justify-center">
          {links.map((l) => (
            <li key={l.label}><a className="hover:text-accent transition-colors" href={l.href}>{l.label}</a></li>
          ))}
        </ul>
        <div className="justify-self-end">
          <a href="#contact" className="bg-ink text-paper text-sm rounded-full px-4 py-2 hover:opacity-90 transition-opacity">Let's talk</a>
        </div>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Verify + commit**

```bash
npm run build && npm run lint
git add -A && git commit -m "feat(editorial): centered nav with Let's talk pill"
```

---

### Task 4: Editorial `Hero`

**Files:**
- Modify: `src/components/Hero.tsx` (full rewrite)

**Interfaces:**
- Consumes: `hero`, `contact` from `content.ts`; `Eyebrow`.
- Produces: centered serif hero with avatar woven in + two pill CTAs.

- [ ] **Step 1: Rewrite `src/components/Hero.tsx`**

```tsx
import { hero, contact } from "../content";
import { Eyebrow } from "./Eyebrow";

export function Hero() {
  return (
    <section className="mx-auto max-w-[760px] px-6 pt-16 pb-10 text-center">
      <Eyebrow className="mb-6">Available for new roles</Eyebrow>
      <h1 className="font-serif text-5xl sm:text-6xl leading-[1.08] font-normal">
        Building AI products
        <span className="inline-flex items-center gap-3 mx-3 align-middle">
          <img src={hero.headshot} alt="Samidha Visai"
            className="w-12 h-12 rounded-full object-cover object-top scale-[1.4] origin-top inline-block" />
        </span>
        and the stories behind them, <span className="italic">for high-stakes domains.</span>
      </h1>
      <div className="mt-9 flex flex-wrap gap-3 justify-center">
        <a href="#work" className="bg-accent text-paper text-sm rounded-full px-5 py-2.5 hover:opacity-90 transition-opacity">View work</a>
        <a href={contact.product} target="_blank" rel="noreferrer"
          className="border border-accent text-accent text-sm rounded-full px-5 py-2.5 hover:bg-accent hover:text-paper transition-colors">Call the demo line ↗</a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify + visual check + commit**

```bash
npm run build && npm run lint
```
Via `/browse` on `npm run dev`: confirm centered serif hero, avatar inline, italic accent, pills. Then:
```bash
git add -A && git commit -m "feat(editorial): centered serif hero"
```

---

### Task 5: `Showcase` composed mockup

**Files:**
- Create: `src/components/Showcase.tsx`
- Modify: `src/App.tsx` (insert `<Showcase />` after `<Hero />`)

**Interfaces:**
- Consumes: real stats/quote strings (inline, drawn from content). Produces: a framed showcase card with floating real-stat UI snippets — NO fake external screenshot, NO fabricated metrics.

- [ ] **Step 1: Write `src/components/Showcase.tsx`**

```tsx
import { useReveal } from "../hooks/useReveal";

export function Showcase() {
  const reveal = useReveal();
  return (
    <section className="mx-auto max-w-[760px] px-6 pb-20">
      <div ref={reveal} className="relative rounded-2xl border border-hair bg-white/60 p-6 sm:p-10 overflow-hidden">
        {/* roadmap-style panel */}
        <div className="ml-auto max-w-[280px] rounded-xl border border-hair bg-white p-4 shadow-sm">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted">Active products</div>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between"><span>Practice Systems AI</span><span className="text-accent font-mono text-xs">LIVE</span></div>
            <div className="flex justify-between"><span>AI Builders Camp</span><span className="text-accent font-mono text-xs">SOLD OUT</span></div>
          </div>
        </div>
        {/* quote chip */}
        <div className="mt-6 max-w-[300px] rounded-xl border border-hair bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted">
            <span className="w-5 h-5 rounded-full bg-accent inline-block" /> The problem
          </div>
          <p className="mt-2 text-sm leading-snug">"Approve people with no credit history — without taking on more risk."</p>
        </div>
        {/* stat chip */}
        <div className="mt-6 inline-block rounded-xl border border-hair bg-white px-5 py-3 shadow-sm">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted">GMV unlocked in fintech</div>
          <div className="text-2xl font-semibold text-accent">$1B+ <span className="text-base align-middle">▲</span></div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Insert into `src/App.tsx`**

Add `import { Showcase } from "./components/Showcase";` and render `<Showcase />` directly after `<Hero />`. (Also remove the old `<ProofBar />` import/usage if present — proof stats now live in Showcase + case studies; OR keep ProofBar restyled in Task 7. Decision: remove ProofBar in editorial version for cleaner rhythm.)

- [ ] **Step 3: Verify + visual + commit**

```bash
npm run build && npm run lint
```
Via `/browse`: confirm showcase card renders with real stat chips, reveals on scroll. Then:
```bash
git add -A && git commit -m "feat(editorial): composed Showcase from real stats"
```

---

### Task 6: Editorial case-study + builds cards

**Files:**
- Modify: `src/components/Section.tsx`
- Modify: `src/components/SelectedWork.tsx` (full rewrite)
- Modify: `src/components/Built.tsx` (full rewrite)

**Interfaces:**
- Consumes: `caseStudies`, `builds` from `content.ts`; `Eyebrow`, `useReveal`.
- Produces: centered section headers (serif) + 2-col editorial cards (mono label, serif title, body, tag pills, dashed icon box w/ arrow link).

- [ ] **Step 1: Update `src/components/Section.tsx` for centered editorial headers**

```tsx
import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

export function Section({ id, eyebrow, title, children }: { id: string; eyebrow?: string; title?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-[1000px] px-6 py-16">
      {(eyebrow || title) && (
        <div className="text-center mb-12">
          {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
          {title && <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-snug">{title}</h2>}
        </div>
      )}
      {children}
    </section>
  );
}
```
NOTE: this changes Section's props (`heading` → `eyebrow`/`title`). Story.tsx and Toolkit.tsx (Task 7) must use the new props.

- [ ] **Step 2: Rewrite `src/components/SelectedWork.tsx`**

```tsx
import { caseStudies } from "../content";
import { Section } from "./Section";
import { useReveal } from "../hooks/useReveal";

const tagsFor = (role: string) => role.split(/[·•]/).map((s) => s.trim()).filter(Boolean);

export function SelectedWork() {
  return (
    <Section id="work" eyebrow="Selected ventures" title="Rigorous execution for high-stakes products.">
      <div className="grid md:grid-cols-2 gap-5">
        {caseStudies.map((cs, i) => <WorkCard key={cs.title} cs={cs} i={i} />)}
      </div>
    </Section>
  );
}

function WorkCard({ cs, i }: { cs: typeof caseStudies[number]; i: number }) {
  const reveal = useReveal();
  return (
    <div ref={reveal} className="rounded-2xl border border-hair bg-white p-7 flex flex-col">
      <div className="font-mono text-[11px] uppercase tracking-wider text-muted">Case study {String(i + 1).padStart(2, "0")}</div>
      <h3 className="font-serif text-2xl mt-3 leading-tight">{cs.title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-ink/70">{cs.outcome}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {tagsFor(cs.role).map((t) => (
          <span key={t} className="border border-hair rounded-full px-3 py-1 text-xs text-ink/60">{t}</span>
        ))}
      </div>
      {cs.link && (
        <a href={cs.link.href} target="_blank" rel="noreferrer"
          className="mt-6 self-start flex items-center gap-2 rounded-xl border border-dashed border-accent/40 px-4 py-3 text-accent text-sm hover:bg-accent/5 transition-colors">
          {cs.link.label} ↗
        </a>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Rewrite `src/components/Built.tsx`**

```tsx
import { builds } from "../content";
import { Section } from "./Section";
import { useReveal } from "../hooks/useReveal";

export function Built() {
  return (
    <Section id="built" eyebrow="What I build" title="Products I've shipped solo.">
      <div className="grid md:grid-cols-2 gap-5">
        {builds.map((b) => <BuildCard key={b.name} b={b} />)}
      </div>
    </Section>
  );
}

function BuildCard({ b }: { b: typeof builds[number] }) {
  const reveal = useReveal();
  return (
    <div ref={reveal} className="rounded-2xl border border-hair bg-white p-7">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-serif text-2xl leading-tight">{b.name}</h3>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted shrink-0">{b.tag}</span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink/70">{b.blurb}</p>
      <p className="mt-3 font-mono text-xs text-muted">{b.stack}</p>
      {b.link && (
        <a href={b.link.href} target="_blank" rel="noreferrer"
          className="mt-5 inline-block text-accent text-sm hover:underline">{b.link.label} ↗</a>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Verify + visual + commit**

```bash
npm run build && npm run lint
```
Via `/browse`: confirm editorial cards, serif titles, tag pills, dashed link box. Then:
```bash
git add -A && git commit -m "feat(editorial): case-study and build cards"
```

---

### Task 7: Story, Toolkit, Footer + cleanup

**Files:**
- Modify: `src/components/Story.tsx`
- Modify: `src/components/Toolkit.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/App.tsx` (use Footer instead of Contact; final section order)
- Delete: `src/components/Contact.tsx`, `src/components/ProofBar.tsx` (replaced)

**Interfaces:**
- Consumes: `timeline`, `toolkit`, `contact`; `Section`, `Eyebrow`, `useReveal`.

- [ ] **Step 1: Rewrite `src/components/Story.tsx`**

```tsx
import { timeline } from "../content";
import { Section } from "./Section";

export function Story() {
  return (
    <Section id="story" eyebrow="The path here" title="Engineer first, then product.">
      <p className="text-center text-base leading-relaxed text-ink/65 max-w-xl mx-auto mb-12">
        The thread across every chapter: regulated, high-stakes systems where decisions have to be right.
      </p>
      <ol className="max-w-2xl mx-auto">
        {timeline.map((t, i) => (
          <li key={t.org + t.period}
            className={`grid grid-cols-[7rem_1fr] gap-6 py-5 ${i !== 0 ? "border-t border-hair" : ""}`}>
            <div className="font-mono text-xs text-muted pt-1">{t.period}</div>
            <div>
              <div className="font-serif text-lg">{t.org} <span className="text-ink/45 text-base">· {t.role}</span></div>
              <div className="text-sm text-ink/60 mt-1 leading-relaxed">{t.note}</div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
```

- [ ] **Step 2: Rewrite `src/components/Toolkit.tsx`**

```tsx
import { toolkit } from "../content";
import { Section } from "./Section";

export function Toolkit() {
  return (
    <Section id="toolkit" eyebrow="Toolkit" title="How I work.">
      <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 max-w-3xl mx-auto">
        {Object.entries(toolkit).map(([group, items]) => (
          <div key={group}>
            <div className="font-mono text-[11px] uppercase tracking-wider text-muted mb-3">{group}</div>
            <div className="flex flex-wrap gap-2">
              {items.map((it) => (
                <span key={it} className="border border-hair rounded-full px-3 py-1 text-sm text-ink/70">{it}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Create `src/components/Footer.tsx`**

```tsx
import { contact } from "../content";
import { Eyebrow } from "./Eyebrow";

export function Footer() {
  return (
    <footer id="contact" className="mx-auto max-w-[760px] px-6 py-24 text-center border-t border-hair">
      <h2 className="font-serif text-4xl sm:text-5xl font-normal">Let's build the next world.</h2>
      <p className="mt-5 text-sm text-ink/60">Based in Los Angeles. Open to new roles.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-wider">
        <a className="text-ink/70 hover:text-accent transition-colors" href={`mailto:${contact.email}`}>Email</a>
        <a className="text-ink/70 hover:text-accent transition-colors" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a className="text-ink/70 hover:text-accent transition-colors" href={contact.product} target="_blank" rel="noreferrer">Practice Systems AI</a>
      </div>
      <Eyebrow className="mt-12">© {new Date().getFullYear()} Samidha Visai — built with Claude Code</Eyebrow>
    </footer>
  );
}
```

- [ ] **Step 4: Update `src/App.tsx`**

```tsx
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Showcase } from "./components/Showcase";
import { SelectedWork } from "./components/SelectedWork";
import { Built } from "./components/Built";
import { Story } from "./components/Story";
import { Toolkit } from "./components/Toolkit";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div id="top">
      <Nav />
      <Hero />
      <Showcase />
      <SelectedWork />
      <Built />
      <Story />
      <Toolkit />
      <Footer />
    </div>
  );
}
```

- [ ] **Step 5: Delete replaced components**

```bash
rm src/components/Contact.tsx src/components/ProofBar.tsx
```
Confirm: `grep -rn "Contact\|ProofBar" src` returns nothing.

- [ ] **Step 6: Verify + full visual QA**

```bash
npm run build && npm run lint
```
Via `/browse`: full page desktop + mobile. Confirm serif rhythm, centered sections, footer, no overflow, anchors scroll, reduced-motion fallback present. Fix + re-verify.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat(editorial): story, toolkit, footer; remove Contact/ProofBar"
```

---

## Self-Review Notes

- **Spec coverage:** tokens/serif (T1), eyebrow (T2), centered nav (T3), serif hero w/ avatar (T4), composed real-stat showcase (T5), editorial case-study + build cards (T6), story/toolkit/footer (T7), OG image (T1). Avatar "cluster" simplified to single real headshot (only one real person — honest).
- **Factual accuracy:** all copy from `content.ts`; Showcase uses real stats ($1B+ GMV, Live, Sold out) and a real case-study quote — no fabricated screenshot/metric.
- **Type consistency:** `Section` props changed to `eyebrow`/`title` in T6 and consumed that way in T6/T7. `useReveal` ref callback used in T5/T6/T7. `Eyebrow` props `{children, className?}` consistent. Removed `ProofBar` in T5 decision and deleted file in T7 (App.tsx in T7 has no ProofBar import — consistent).
- **Branch:** all work on `redesign-editorial` (Task 0).
```

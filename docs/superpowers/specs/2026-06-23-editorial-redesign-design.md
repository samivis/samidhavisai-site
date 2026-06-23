# samidhavisai.com — Editorial Studio Redesign (Version B)

**Date:** 2026-06-23
**Owner:** Samidha Visai
**Goal:** An alternate redesign in a refined editorial / design-studio aesthetic (serif display, centered, warm paper) — built in parallel with the bento version (Version A) so Samidha can compare two complete directions.

## Why this direction

- Signals **taste, judgment, and narrative** rather than raw "I ship dashboards." Reads like a senior operator / founder with a point of view.
- Plays to the "Builder PM + storyteller" angle and the brand handoff's content seeds (case studies, retrospectives).
- Premium, calm, confident — strong for SWING-track / strong-brand roles where polish and positioning matter.

## Reference (vance.studio style)

- Centered, single-column, generous vertical rhythm on warm off-white paper.
- **Serif display headline** with mixed weight/italic, inline avatar cluster woven into the line.
- **Monospace small-caps eyebrows** (e.g. "AVAILABLE FOR Q3 PROJECTS", "SELECTED VENTURES").
- Pill buttons (one filled blue, one outlined).
- A **hero product mockup** card (browser/dashboard screenshot vibe with floating UI snippets).
- **Case-study cards**: mono label ("CASE STUDY 01"), serif title, short body, tag pills, a dashed-border illustration box with an icon + arrow.
- Minimal mono footer: "Let's build the next world.", location line, link row, copyright credit line.

## Direction (decided)

- **Palette (warm editorial):**
  - Paper: warm off-white `#F7F5F1`
  - Ink: near-black `#1A1A1A`
  - Accent: refined blue `#2F4FE0` (pills, links, icons) — credible, not playful
  - Muted: warm gray `#8A857C` for eyebrows/meta
  - Hairlines: `#E3DFD7`
- **Type:**
  - Display serif for headlines — **Instrument Serif** or **Newsreader** (Google Fonts), with italic mixing.
  - Body: Inter (already loaded).
  - Eyebrows/meta/footer: monospace small caps (IBM Plex Mono), letter-spaced.
- **Hero one-liner:** keep Samidha's positioning but in editorial voice:
  *"Building AI products and the stories behind them, for high-stakes domains."*
  (Serif display, 2–3 lines, with a small avatar cluster — here just her single headshot styled as a round avatar — woven in.)
- **Eyebrow:** "AVAILABLE FOR NEW ROLES" (honest, job-search aligned) instead of "available for Q3 projects".
- **Motion:** subtle — fade/rise on scroll, gentle. No dashboard gauges. Respect `prefers-reduced-motion`.

## Guardrails (same as Version A)

- Every number real; all content factually accurate per the job-search-os brand handoff (Practice Systems = OpenAI+Retell+Node, paying customers LA; AI Builders Camp = sold-out, Replit+OpenAI+GitHub; never Anthropic-customer-in-prod; no Dental OS).
- Reuse `src/content.ts` as source of truth — presentation rewrite only.
- Recruiters must still be able to read full case-study substance.

## Page structure

1. **Top bar** — left wordmark "samidha visai" with a small check/dot mark; centered nav (Work, Story, Toolkit, About); right "Let's talk" filled pill. Thin, calm.
2. **Hero** — mono eyebrow → big centered serif headline (with round headshot avatar woven into the middle line) → two pill CTAs ("View work" filled blue, "Call the demo line" outlined).
3. **Hero showcase card** — a framed showcase block. Since there's no marketing screenshot, build a tasteful **composed mockup** from real proof: a card containing floating UI snippets made of her real stats — e.g. a "Q-roadmap"-style mini panel ("Practice Systems AI — Live", "AI Builders Camp — Sold out"), a "RETENTION +$1B GMV" stat chip, a quote chip ("Approve people with no credit history — without taking on more risk."). Composed, not a fake external screenshot.
4. **Selected ventures** — mono eyebrow → centered serif section title ("Rigorous execution for high-stakes products.") → 2-column case-study cards (the Affirm work + builds), each: mono "CASE STUDY 0N", serif title, short body, tag pills, dashed-border icon box with arrow linking to the press/source.
5. **Story** — short editorial paragraph + restyled timeline (calmer, serif accents).
6. **Toolkit** — quiet tag clusters under a mono eyebrow.
7. **Footer** — centered serif "Let's build the next world." → location/availability line ("Based in Los Angeles. Open to new roles.") → mono link row (Email, LinkedIn, Practice Systems AI) → mono credit line.

## Component plan

Reuses `content.ts`. Presentation-layer rewrite, distinct from Version A's components.

- `index.css` — warm editorial tokens + serif font, mono eyebrow utility, reveal utility (reduced-motion aware).
- `index.html` — add display serif (Instrument Serif/Newsreader) + IBM Plex Mono to the Google Fonts link.
- Components:
  - `Eyebrow.tsx` — mono small-caps letter-spaced label.
  - `Nav.tsx` — centered editorial top bar with "Let's talk" pill.
  - `Hero.tsx` — eyebrow + serif headline w/ avatar + pill CTAs.
  - `Showcase.tsx` — composed mockup card from real stats/quotes.
  - `SelectedWork.tsx` — editorial case-study cards (mono label, serif title, tags, dashed icon box).
  - `Built.tsx` — builds as editorial cards (can share card style with SelectedWork).
  - `Story.tsx`, `Toolkit.tsx` — restyled editorial.
  - `Footer.tsx` (replaces Contact) — centered serif CTA + mono footer.
  - `useReveal` hook — shared pattern (gentle fade/rise).
- Dashed-border illustration boxes: simple inline SVG line icons (star, arc — abstract, no meaning claims) + corner arrow.

## Out of scope

- CMS/backend, routing, blog. Single page, content in `content.ts`.

## Success criteria

- Distinctly editorial: serif display, warm paper, centered rhythm — clearly a different direction from Version A.
- Hero is short and elegant (no text wall); positioning in one serif line.
- Real composed showcase (no fabricated external screenshot, no fake metrics).
- Case-study substance still readable.
- Responsive, accessible (contrast, reduced-motion, alt text), clean build.

## Parallel-build note

Built on git branch `redesign-editorial` off the pre-redesign main; Version A (bento) builds on `redesign-bento`. Samidha compares both before choosing one to merge.

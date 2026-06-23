# samidhavisai.com — Bento Dashboard Redesign

**Date:** 2026-06-23
**Owner:** Samidha Visai
**Goal:** Replace the current "tasteful résumé" design with a bento-box product-dashboard aesthetic so the site *itself* signals "I build and ship AI products" — the strongest screener signal for the fintech × AI roles she's targeting.

## Why

- Current site is content-accurate but visually plain: one accent color, no motion, generic editorial layout. Reads like a résumé, not like an operator who ships interfaces.
- The hero is a wall of text (a 5-sentence subhead). Needs to become scannable.
- Target audience = fintech/AI screeners who screen for public builders. A site that looks like a shipped product converts that bias into an advantage.

## Direction (decided)

- **Layout:** Bento-grid hero (bold, attention-grabbing) → calmer card-based body sections for case-study depth. Bold + readable, not gimmick.
- **Palette (match reference):**
  - Canvas: soft gray `#E8EAED`-ish (cards float on it)
  - Cards: white `#FFFFFF`, large radius (~24px), soft shadow
  - Accent 1: lime-yellow `#D4F500`-ish (hero/profile card, highlights)
  - Accent 2: cobalt blue `#3D5AFE`-ish (data viz, one feature tile)
  - Ink: near-black `#14181F` text; monospace for metadata labels (e.g. "SaaS · 2024 · 12k Users" style)
- **Type:** Inter for headings/body; a monospace (e.g. JetBrains Mono / IBM Plex Mono) for small metadata captions and status pills.
- **Hero one-liner:** **"I build and ship AI products for high-stakes, regulated domains."**
- **Motion:** cards fade/slide in on load + on scroll; stat gauge animates (counts/sweeps up); hover lift on cards; demo-line card has a subtle pulse. Respect `prefers-reduced-motion`.

## Constraints / guardrails

- **Every number is real.** No fake "Creativity Level 60%" gimmicks. The gauge/data-viz visualizes a *real* proof stat (e.g. industries count, years, GMV). All content stays factually accurate per the job-search-os brand handoff (Practice Systems = OpenAI+Retell+Node, paying customers LA; AI Builders Camp = sold-out, Replit+OpenAI+GitHub; never claim Anthropic-customer-in-prod).
- Keep one calm, readable section for full case-study substance — recruiters must be able to read depth.
- Reuse existing content in `src/content.ts` (it's accurate). This is primarily a presentation-layer rewrite.

## Page structure

### 1. Bento hero grid (above the fold)
A responsive grid of cards (collapses to single column on mobile):

- **Profile card (lime)** — headshot + "Samidha Visai" + eyebrow (CS Michigan · Senior PM · LA) + the one-line positioning. Small, punchy. Replaces the text-wall header.
- **Stat / gauge card (white, cobalt viz)** — hero data-viz moment built from a real proof stat. Animated.
- **Active builds list card (white)** — Practice Systems AI + AI Builders Camp as rows with status pills ("Live · paying customers", "Sold-out cohort") and monospace meta. Click → respective section/link.
- **Two accent tiles** — (a) cobalt "Call the live demo line ↗" → practicesystems.ai; (b) white "Read the story ↓" → Story section.
- **Proof-stats strip** — the 4 stats ($1B+, 9 yrs, 0→1, 6+ industries) as compact cards or a row.
- **CTA pill** — "See my work" / contact, wide rounded pill (like reference "Explore All").

### 2. Selected work (clean body)
Affirm case studies as cards (keep current accordion content, restyle into the card system). Each: title, role pills, Problem / What I did / Outcome, press link. This is the "readable depth" zone.

### 3. Built (AI projects)
Practice Systems AI + AI Builders Camp expanded cards with stack + links.

### 4. Story / timeline
The career timeline, restyled as a clean vertical card list.

### 5. Toolkit
Skill groups as tag clusters inside cards.

### 6. Contact
"Let's build something." — email, LinkedIn, product, (optional résumé download). Wide CTA card.

### Nav
Sticky, minimal. Possibly a floating rounded pill nav to match the bento language.

## Component plan

Rework presentation only; keep `content.ts` as source of truth.

- `theme` tokens in `index.css` — add canvas/card/lime/cobalt colors, radius, shadow, mono font.
- New/updated components:
  - `Card.tsx` — base bento card (radius, shadow, padding, hover-lift, reveal-on-scroll).
  - `Hero.tsx` — rewritten as the bento grid (composes Card variants).
  - `StatGauge.tsx` — animated data-viz for one real stat.
  - `ProofBar.tsx` — restyled stat cards.
  - `Built.tsx`, `SelectedWork.tsx`, `Story.tsx`, `Toolkit.tsx`, `Contact.tsx` — restyled into card system.
  - `Nav.tsx` — pill nav.
  - `useReveal` hook — IntersectionObserver-based reveal, reduced-motion aware.
- Add Google Fonts (Inter + a mono) or self-host.
- Add SEO/OG meta tags to `index.html` (title, description, OG image, favicon) — currently missing; cheap win.

## Out of scope (for now)

- CMS / backend. Content stays in `content.ts`.
- Multi-page routing. Single page.
- Blog/content section (handoff lists content seeds — separate effort).

## Success criteria

- Hero communicates positioning in one line + is visually a "product."
- No wall of text above the fold.
- Feels dynamic (motion on load + scroll) without being gimmicky.
- All content factually accurate.
- Responsive (mobile single-column), accessible (contrast, reduced-motion, alt text), fast (build clean, no layout shift).

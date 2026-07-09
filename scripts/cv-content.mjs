// SOURCE OF TRUTH for the /cv (Product) résumé content.
//
// This file is NEVER imported by the site bundle. It is read only by
// scripts/encrypt-cv.mjs at build time, which encrypts it into
// src/cv-encrypted.json. Only the ciphertext ships to the browser.
//
// To edit the résumé: change this file, then run `npm run encrypt-cv`
// (see scripts/encrypt-cv.mjs) and rebuild.

export const cvContent = {
  hero: {
    eyebrow: "Résumé · Product",
    name: "Samidha Visai",
    role: "AI Product Manager · Engineer by training",
    blurbStrong: "Builder PM for AI in high-stakes domains.",
    blurbRest:
      " Engineer since 2017 (Michigan CS, Lyft, Microsoft). Four years at Affirm leading fintech decisioning at multi-billion-dollar merchant scale, plus a parallel track of production AI products shipped solo. I build real products, not just specs, where AI meets real-world stakes.",
  },
  contact: {
    location: "Los Angeles, CA",
    phone: "734-674-4780",
    email: "samidhamv@gmail.com",
    blurb:
      "Fintech, lending, and decisioning — plus AI products live in production. Engineer by training, product-minded in practice.",
  },
  contactLinks: [
    { label: "Site", href: "https://samidhavisai.com" },
    { label: "LinkedIn", href: "https://linkedin.com/in/samidhavisai" },
    { label: "Practice Systems", href: "https://practicesystems.ai" },
    { label: "AI Builders Camp", href: "https://aibuilderscamp.com" },
  ],
  experience: [
    {
      title: "Affirm — Senior Product Manager · Product Manager",
      time: "2022–2026",
      sub: "Senior Product Manager (2024–2026) · Product Manager (2022–2024) · San Francisco / Remote. Led decisioning programs across a multi-billion-dollar merchant portfolio, cross-functional with engineering, ML, identity, credit, legal, and compliance.",
      bullets: [
        "Led Affirm's company-wide Cashflow Underwriting program ($400M+ GMV) — a multi-initiative decisioning platform integrating credit, identity, ML, and open banking.",
        "Co-led the 0→1 launch of cashflow underwriting at point of sale — a Plaid CRA integration covering four customer segments with segmented decline-reason logic; the first time Affirm could underwrite No-File installment loans.",
        "Spearheaded the end-to-end buildout of a net-new B2B lending platform (identity verification, checkout UX, underwriting workflows) and launched with Amazon as anchor partner, unlocking a $1B+ GMV opportunity (CNBC).",
        "Built an internal Disclosures self-service portal prototype directly in Claude Code against Affirm's codebase after quantifying ~25% of compliance/legal time spent on disclosure management; won product leadership buy-in.",
        "Authored Prescreen, a credit-bureau-powered new-to-Affirm acquisition product (Experian / TransUnion), running user research independently and building the merchant pitch and prototype in Claude + Figma to close the first pilot.",
        "Led the cross-functional rollout of financing into Walmart's in-store self-checkout — live in 1,000+ kiosks nationwide, $100M+ GMV impact (Reuters).",
      ],
    },
    {
      title: "Practice Systems AI — Founder & Solo Builder",
      time: "2025–present",
      sub: "Independent AI product, shipped end-to-end.",
      bullets: [
        "Designed, built, and shipped a production AI voice product for dental practices end-to-end, solo — OpenAI for conversation and triage, Retell for voice telephony, Node.js backend, engineered via Claude Code. Live with paying customers in LA, 24/7, sub-second response latency.",
        "Productized AI in a regulated workflow: bilingual EN/ES prompts, urgent-vs-routine triage with rule-based escalation, structured patient intake, and post-call transcripts via email and SMS.",
      ],
    },
    {
      title: "AI Builders Camp — Founder & Lead Instructor",
      time: "2026–present",
      sub: "Live online AI building program for teens (grades 7–10).",
      bullets: [
        "Designed and taught a two-week build-along curriculum (Replit, OpenAI, GitHub, JavaScript fundamentals) taking beginners to a real shipped product. First cohort sold out; ran a second cohort the following month.",
      ],
    },
    {
      title: "Secureframe — Product Manager, first product hire",
      time: "2021–2022",
      sub: "San Francisco. Built the product function from zero at a compliance-automation B2B SaaS company (SOC 2, ISO 27001, HIPAA, PCI DSS).",
      bullets: [
        "Owned end-to-end vision and strategy for the Platform and Automations product lines.",
        "Drove $2M+ net-new revenue via partner integrations (Kandji, Checkr, Gusto), with shared OKRs across sales, partnerships, and marketing.",
        "Launched Secureframe Agent, a read-only device security agent that opened the long-tail SMB segment without cannibalizing the core; cut customer churn 15% with a Version Control product built on GitHub APIs.",
      ],
    },
    {
      title: "Clever — Product Manager",
      time: "2020–2021",
      sub: "San Francisco.",
      bullets: [
        "Led product strategy for 20+ top edtech apps integrating with Clever's APIs across US school districts, enabling access for 1.2M+ students.",
        "Identified a product gap from a new industry compliance protocol, evangelized the solution to executives, and prevented ~1M users from leaving the platform.",
      ],
    },
    {
      title: "Lyft — Partner Engineer",
      time: "2017–2019",
      sub: "San Francisco.",
      bullets: [
        "Managed a multi-million-dollar portfolio of API integrations across healthcare, hospitality, and transportation; led end-to-end delivery with partners including Allscripts and Marriott.",
        "Launched healthcare API integrations generating millions in annual revenue and providing transportation access for 3M+ patients per year.",
      ],
    },
    {
      title: "Earlier",
      time: "2015–2016",
      sub: "Software Engineering Intern, Microsoft (2016, received return offer, declined for Lyft) · Software Engineering Intern, First Opinion (2015) · Fellow, True Ventures — True Entrepreneur Corps (2015, 1 of 14 worldwide).",
      bullets: [],
    },
  ],
  toolkit: [
    {
      group: "AI / ML",
      items:
        "OpenAI API · Claude Code · Retell (voice infra) · LLMs · prompt engineering · LLM-in-production · voice AI · agentic systems · eval design · AI-native product development",
    },
    {
      group: "Product",
      items:
        "Product strategy · roadmapping · A/B testing & experimentation · PRDs · pricing & packaging · GTM · customer discovery · decisioning products · platform / API products · cross-functional leadership",
    },
    {
      group: "Technical",
      items:
        "Python · JavaScript / Node.js · SQL · C++ · REST APIs · Plaid integration · Figma Make · Cursor · GitHub · Vercel",
    },
    {
      group: "Domains",
      items:
        "Fintech (BNPL, B2B lending, credit underwriting) · decisioning systems · voice AI · vertical agent platforms · compliance / regulated environments · developer platforms",
    },
  ],
  education: {
    degree: "B.S.E. Computer Science — University of Michigan",
    dates: "2013–2017",
    detail:
      "College of Engineering. Leinweber Software Scholar (1 of 7 CS Engineering students selected). Declined senior-year SWE offers from Microsoft and Bridgewater for Lyft Partner Engineering. AI for Product Certification, Product School (2024).",
  },
};

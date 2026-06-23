export const hero = {
  name: "Samidha Visai",
  headline: "Engineer-turned-PM. I build AI for high-stakes domains.",
  subhead:
    "Most PMs hand off specs. I ship. CS degree, ex-SWE (Microsoft, Lyft), then product at Secureframe, Affirm (credit & disclosures, billions in scale), and a live AI product I built and run myself. I make non-deterministic AI reliable where mistakes carry real legal, financial, and health consequences.",
  chips: [
    "Builder PM", "Ex-engineer", "Ships AI products",
    "Regulated & high-stakes", "LLM reliability", "Vibe-codes",
  ],
  ctas: [
    { label: "See my work", href: "#work", kind: "primary" as const },
    { label: "Try the live demo", href: "https://practicesystems.ai", kind: "secondary" as const },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/samidhavisai", kind: "ghost" as const },
  ],
  headshot: "/headshot.jpg",
};

export const proofStats = [
  { value: "4 yrs", label: "Senior PM at Affirm" },
  { value: "$1B+", label: "GMV unlocked — Amazon B2B lending" },
  { value: "1,000+", label: "Walmart kiosks shipped to" },
  { value: "3", label: "regulated domains: fintech · healthcare · compliance" },
  { value: "Live", label: "AI product with paying customers" },
];

export type CaseStudy = {
  title: string; role: string; problem: string; did: string;
  outcome: string; link?: { label: string; href: string };
};

export const caseStudies: CaseStudy[] = [
  {
    title: "Cashflow Underwriting platform",
    role: "Owned · launched · managed",
    problem: "Extend credit to thin- and no-file users without raising risk.",
    did: "Built a net-new cashflow underwriting system with ML and data teams, integrating Plaid across four customer segments with segmented decline logic and AAN compliance sign-off.",
    outcome: "Extended access to users with limited credit history while preserving risk integrity; program scaled across Affirm's underwriting layer.",
    link: { label: "Affirm underwriting (Yahoo Finance)", href: "https://finance.yahoo.com/news/affirm-updates-underwriting-enhanced-signals-120000252.html" },
  },
  {
    title: "Walmart in-store BNPL",
    role: "Led · owned · launched",
    problem: "Bring Affirm financing into a net-new physical channel — Walmart self-checkout.",
    did: "Led the cross-functional rollout of a financing interface into Walmart's in-store checkout.",
    outcome: "Launched in 1,000+ self-checkout kiosks nationwide, ~$100M+ GMV impact.",
    link: { label: "Axios", href: "https://www.axios.com/pro/fintech-deals/2023/12/19/affirm-in-store-bnpl-walmart" },
  },
  {
    title: "Global credit-platform expansion",
    role: "Owned launch (EU / Australia / UK)",
    problem: "Take Affirm's credit platform international with Shopify Shop Pay.",
    did: "Owned launching Affirm's credit platform across EU, Australia, and the UK as part of the Shop Pay global expansion.",
    outcome: "Affirm credit live in new international markets via Shop Pay.",
    link: { label: "Affirm investor release", href: "https://investors.affirm.com/news-releases/news-release-details/affirm-and-shopify-accelerate-global-expansion-shop-pay" },
  },
  {
    title: "B2B Payments / Amazon B2B lending",
    role: "Owned · launched (0→1)",
    problem: "Affirm had no B2B lending product; Amazon was the anchor partner.",
    did: "Spearheaded the end-to-end buildout — identity, checkout UX, and underwriting workflows from zero — and launched with Amazon as first partner.",
    outcome: "Unlocked a $1B+ GMV opportunity; covered by CNBC.",
    link: { label: "Affirm B2B Payments", href: "https://www.affirm.com/business/solutions/b2b-payments" },
  },
  {
    title: "Disclosures self-service portal",
    role: "Initiated · prototyped · drove to roadmap",
    problem: "Compliance and legal spent ~25% of their time managing regulatory disclosures. No one owned it on the product side.",
    did: "Quantified the burden, then built a working prototype myself with Claude Code against Affirm's internal codebase (plus Figma Make) to make the future state concrete and win prioritization.",
    outcome: "Moved from invisible problem to prioritized, largely-built roadmap item — the regulated-domain + builder-PM story in one.",
  },
];

export type Build = {
  name: string; tag: string; blurb: string; stack: string;
  link?: { label: string; href: string };
};

export const builds: Build[] = [
  {
    name: "Practice Systems AI",
    tag: "Live · paying customers (LA)",
    blurb:
      "An AI receptionist purpose-built for dental practices — answers every call 24/7 with natural conversation, captures new-patient intake, handles urgent triage, escalates per the practice's rules. Engineered solo. There's a live demo line you can actually call.",
    stack: "OpenAI + Retell + Node.js · built with Claude Code · EN/ES · sub-second latency",
    link: { label: "practicesystems.ai (call the demo line)", href: "https://practicesystems.ai" },
  },
  {
    name: "AI Builders Camp",
    tag: "Sold-out first cohort",
    blurb:
      "A live online AI building program for teens (grades 7–10): two weeks, eight sessions, one real shipped product per student. Sole instructor and founder. Thesis: the gap that matters is between kids who use AI as a toy and kids who use it as a tool.",
    stack: "Teaches Replit + OpenAI + GitHub + JS fundamentals",
    link: { label: "aibuilderscamp.com", href: "https://aibuilderscamp.com" },
  },
];

export type TimelineItem = { period: string; org: string; role: string; note: string };

export const timeline: TimelineItem[] = [
  { period: "2013–2017", org: "University of Michigan", role: "B.S.E. Computer Science", note: "Leinweber Software Scholar (1 of 7 CSE)." },
  { period: "2017–2019", org: "Lyft", role: "Partner Engineer", note: "Shipped healthcare/hospitality API integrations (Allscripts, Marriott)." },
  { period: "2020–2021", org: "Clever", role: "Product Manager", note: "Developer platform + API products reaching 1.2M students." },
  { period: "2021–2022", org: "Secureframe", role: "PM — first product hire", note: "Built the product function from scratch; compliance & security automation." },
  { period: "2022–2026", org: "Affirm", role: "PM → Senior PM", note: "Enterprise → credit decisioning → disclosures. Billions in scale, deeply regulated." },
  { period: "2025–present", org: "Building", role: "Founder", note: "Practice Systems AI (live) + AI Builders Camp (sold out)." },
];

export const toolkit = {
  "PM craft": ["0→1 product", "Experimentation", "Customer research", "Specs eng enjoy reading", "Cross-functional leadership"],
  "AI / LLM": ["Prompting", "Evals", "Tool use / structured output", "LLM-in-production", "Latency & reliability"],
  "Code": ["Python", "JavaScript/TypeScript", "C++", "REST APIs", "Claude Code", "Cursor"],
  "Domains": ["Fintech / lending", "Healthcare ops", "Compliance / security", "Identity & risk"],
};

export const contact = {
  heading: "Let's build something.",
  email: "samidhamv@gmail.com",
  linkedin: "https://www.linkedin.com/in/samidhavisai",
  product: "https://practicesystems.ai",
};

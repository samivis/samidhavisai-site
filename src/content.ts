export const hero = {
  name: "Samidha Visai",
  eyebrow: "Computer Science, University of Michigan · Senior PM · Los Angeles",
  headline: "Builder PM. I ship AI products for high-stakes domains.",
  subhead:
    "Engineer turned product manager working at the intersection of AI and regulated, high-stakes domains. I build AI products myself and take them live with real customers — from the paying-customer AI product I run today, back to shipping Affirm's financing inside Amazon and Walmart checkout and partner-engineering integrations at Lyft. Equal parts builder and the technical partner who gets AI integrated, trusted, and adopted inside complex businesses — where mistakes carry real legal, financial, and health consequences.",
  chips: [],
  ctas: [
    { label: "See my work", href: "#work", kind: "primary" as const },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/samidhavisai", kind: "secondary" as const },
  ],
  headshot: "/headshot.jpg",
};

export const proofStats = [
  { value: "9 yrs", label: "Shipping products in regulated, high-stakes tech" },
  { value: "$1B+", label: "GMV unlocked in fintech" },
  { value: "0→1", label: "Products launched from scratch" },
  { value: "6+", label: "Industries: fintech, healthcare, security, edtech, mobility, AI" },
];

export type CaseStudy = {
  title: string; role: string; problem: string; did: string;
  outcome: string; link?: { label: string; href: string };
};

export const caseStudies: CaseStudy[] = [
  {
    title: "Cashflow underwriting platform",
    role: "Owned · launched · managed",
    problem: "Approve people with little or no credit history without taking on more risk.",
    did: "Built a new underwriting system with our ML and data teams that reads bank-transaction data (via Plaid) across four customer segments, each with its own approval logic and legal sign-off on the required customer disclosures.",
    outcome: "Opened up credit to people with limited credit history while holding the risk line; the system scaled across Affirm's underwriting.",
    link: { label: "Affirm underwriting (Yahoo Finance)", href: "https://finance.yahoo.com/news/affirm-updates-underwriting-enhanced-signals-120000252.html" },
  },
  {
    title: "Walmart in-store financing",
    role: "Led · owned · launched",
    problem: "Bring Affirm financing into a new physical channel — Walmart self-checkout.",
    did: "Led the cross-functional rollout of a financing experience into Walmart's in-store checkout.",
    outcome: "Launched in 1,000+ self-checkout kiosks nationwide, driving $100M+ in financed sales.",
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
    outcome: "Unlocked a $1B+ sales opportunity; covered by CNBC.",
    link: { label: "Affirm B2B Payments", href: "https://www.affirm.com/business/solutions/b2b-payments" },
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
    stack: "OpenAI + Retell + Node.js · built with Claude Code · English & Spanish · sub-second response",
    link: { label: "practicesystems.ai (call the demo line)", href: "https://practicesystems.ai" },
  },
  {
    name: "AI Builders Camp",
    tag: "Sold-out first cohort",
    blurb:
      "A live online AI building program for teens (grades 7–10): two weeks, eight sessions, one real shipped product per student. Sole instructor and founder. Thesis: the gap that matters is between kids who use AI as a toy and kids who use it as a tool.",
    stack: "Teaches Replit + OpenAI + GitHub + JavaScript fundamentals",
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
  "Working with customers": ["Enterprise integration", "Technical pre-sales", "Partner engineering", "Implementation & adoption"],
  "Code": ["Python", "JavaScript/TypeScript", "C++", "REST APIs", "Claude Code", "Cursor"],
  "Domains": ["Fintech / lending", "Healthcare ops", "Compliance / security", "Identity & risk"],
};

export const contact = {
  heading: "Let's build something.",
  email: "samidhamv@gmail.com",
  linkedin: "https://www.linkedin.com/in/samidhavisai",
  product: "https://practicesystems.ai",
};

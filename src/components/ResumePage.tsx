import { Section } from "./Section";

const contactLinks = [
  { label: "Site", href: "https://samidhavisai.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/samidhavisai" },
  { label: "Practice Systems", href: "https://practicesystems.ai" },
  { label: "AI Builders Camp", href: "https://aibuilderscamp.com" },
];

export function ResumePage() {
  return (
    <div id="top" className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-50 bg-paper/85 backdrop-blur border-b border-line">
        <nav className="mx-auto max-w-[1080px] px-6 h-16 flex items-center justify-between gap-6">
          <a href="https://samidhavisai.com" className="font-semibold tracking-tight">
            Samidha Visai
          </a>
          <div className="flex items-center gap-4 sm:gap-6 text-sm text-ink/60">
            <a className="hover:text-accent transition-colors" href="https://samidhavisai.com">
              Home
            </a>
            <a className="hover:text-accent transition-colors" href="#experience">
              Experience
            </a>
            <a className="hover:text-accent transition-colors" href="#tools">
              Toolkit
            </a>
            <a
              className="hover:text-accent transition-colors"
              href="#"
              onClick={(event) => {
                event.preventDefault();
                window.print();
              }}
            >
              Download
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="mx-auto max-w-[1080px] px-6 pt-20 pb-14 grid lg:grid-cols-[1.4fr_0.9fr] gap-10 items-start">
          <div className="hero-rise">
            <p className="text-xs uppercase tracking-[0.18em] text-ink/45">Résumé</p>
            <h1 className="mt-6 text-4xl sm:text-[3.25rem] leading-[1.05] font-semibold max-w-[10ch]">
              Samidha Visai
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-ink/65 max-w-2xl border-l-2 border-accent pl-5">
              <strong className="text-ink font-semibold">AI instructor and hands-on builder.</strong>{" "}
              I teach non-technical beginners to build with Claude and other AI tools and
              vibe-code real, working software. I also ship production AI products myself, so I
              teach the full path from idea to live URL. Warm, plain-English, build-alongside.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="mailto:samidhamv@gmail.com"
                className="px-5 py-2.5 rounded-md bg-accent text-paper text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Email me
              </a>
              <a
                href="https://linkedin.com/in/samidhavisai"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-ink/60 hover:text-accent transition-colors"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://samidhavisai.com"
                className="text-sm text-ink/60 hover:text-accent transition-colors"
              >
                Back to site
              </a>
            </div>
          </div>

          <aside className="hero-reveal w-full rounded-lg border border-line bg-white/55 shadow-[0_12px_30px_rgba(20,24,31,0.06)] p-6">
            <div className="text-xs uppercase tracking-[0.16em] text-accent font-semibold">
              Contact
            </div>
            <div className="mt-4 space-y-1 text-[15px] text-ink/70">
              <p>Los Angeles, CA</p>
              <p>734-674-4780</p>
              <p>samidhamv@gmail.com</p>
            </div>
            <div className="mt-6 grid gap-2 text-sm">
              {contactLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit text-accent hover:underline"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
            <div className="mt-7 rounded-md border border-line bg-paper/80 p-4 text-sm leading-relaxed text-ink/65">
              Engineer by training. Product-minded. Built and taught across regulated systems,
              AI products, and live demos.
            </div>
          </aside>
        </section>

        <Section id="teaching" heading="Teaching & Building with AI">
          <div className="border-t border-line">
            <div className="border-b border-line py-8 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-x-10 gap-y-3">
              <div>
                <h3 className="text-xl font-medium">Founder &amp; Lead Instructor — AI Builders Camp</h3>
                <div className="mt-2 text-xs uppercase tracking-wider text-ink/45">2026–present</div>
              </div>
              <div className="max-w-2xl">
                <p className="text-[15px] leading-relaxed text-ink/65">
                  Designed and teach a full build-along AI curriculum that takes complete beginners
                  to a real AI app deployed to a live URL. Sole curriculum designer and instructor.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/65">
                  Run live, hands-on sessions on the exact rhythm this role needs: demo, teach one
                  idea, build together in parallel, make it yours, share.
                </p>
                <a className="mt-4 inline-block text-accent text-sm hover:underline" href="https://aibuilderscamp.com" target="_blank" rel="noreferrer">
                  aibuilderscamp.com ↗
                </a>
              </div>
            </div>

            <div className="py-8 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-x-10 gap-y-3">
              <div>
                <h3 className="text-xl font-medium">Founder &amp; Solo Builder — Practice Systems AI</h3>
                <div className="mt-2 text-xs uppercase tracking-wider text-ink/45">2025–present</div>
              </div>
              <div className="max-w-2xl">
                <p className="text-[15px] leading-relaxed text-ink/65">
                  Designed, built, and shipped a live AI voice product end-to-end, solo. Live 24/7
                  with paying customers; bilingual English/Spanish.
                </p>
                <a className="mt-4 inline-block text-accent text-sm hover:underline" href="https://practicesystems.ai" target="_blank" rel="noreferrer">
                  practicesystems.ai ↗
                </a>
              </div>
            </div>
          </div>
        </Section>

        <Section id="experience" heading="Experience">
          <div className="border-t border-line">
            {[
              {
                title: "Affirm — Senior Product Manager · Product Manager",
                time: "2022–2026",
                sub: "Senior Product Manager (2024–2026) · Product Manager (2022–2024) · San Francisco / Remote",
                bullets: [
                  "Prototyped internal tools by hand with Claude Code against Affirm's real codebase to win leadership buy-in.",
                  "Led cross-functional programs across engineering, ML, legal, and compliance in a highly regulated environment.",
                ],
              },
              {
                title: "Secureframe — Product Manager, first product hire",
                time: "2021–2022",
                sub: "San Francisco",
                bullets: [
                  "Built the product function from scratch at a Series A B2B SaaS company; owned Platform and Automations products end-to-end.",
                ],
              },
              {
                title: "Clever — Product Manager",
                time: "2020–2021",
                sub: "San Francisco",
                bullets: [
                  "Led product strategy for 20+ education apps integrating with Clever's APIs, standardizing data access for 1.2M+ students.",
                ],
              },
              {
                title: "Dresspass — Co-founder",
                time: "2019–2020",
                sub: "New York",
                bullets: [
                  "Launched a peer-to-peer clothing rental marketplace; led product, growth, and user research, onboarding thousands of users and raising angel investment.",
                ],
              },
              {
                title: "Lyft — Partner Engineer",
                time: "2017–2019",
                sub: "San Francisco",
                bullets: [
                  "Shipped healthcare and hospitality API integrations, owning technical delivery across engineering, sales, and support.",
                ],
              },
              {
                title: "Microsoft — Software Engineering Intern",
                time: "2016",
                sub: "Bellevue, WA — received full-time return offer.",
                bullets: [],
              },
            ].map((entry) => (
              <div key={entry.title} className="border-b border-line py-8 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-x-10 gap-y-3">
                <div>
                  <h3 className="text-xl font-medium">{entry.title}</h3>
                  <div className="mt-2 text-xs uppercase tracking-wider text-ink/45">{entry.time}</div>
                </div>
                <div className="max-w-2xl">
                  <p className="text-[15px] leading-relaxed text-ink/60">{entry.sub}</p>
                  {entry.bullets.length > 0 && (
                    <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-ink/65 list-disc pl-5">
                      {entry.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="education" heading="Education">
          <div className="border-t border-line">
            <div className="py-8 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-x-10 gap-y-3">
              <div>
                <h3 className="text-xl font-medium">B.S.E. Computer Science — University of Michigan</h3>
                <div className="mt-2 text-xs uppercase tracking-wider text-ink/45">2017</div>
              </div>
              <div className="max-w-2xl text-[15px] leading-relaxed text-ink/65">
                Leinweber Software Scholar · True Entrepreneur Corps, True Ventures · AI for Product
                Certification, Product School (2024).
              </div>
            </div>
          </div>
        </Section>

        <Section id="tools" heading="Toolkit">
          <div className="rounded-lg border border-line bg-white/60 p-6 shadow-[0_12px_30px_rgba(20,24,31,0.06)]">
            <h2 className="text-xs uppercase tracking-[0.18em] text-accent mb-4">Tools I Use & Teach</h2>
            <p className="text-[15px] leading-8 text-ink/70">
              Claude &amp; Claude Code · vibe-coding / AI-agent building · voice AI agents ·
              automations &amp; scheduled jobs · Cursor · Codex · ChatGPT / OpenAI API · Replit · v0 ·
              Figma Make · Granola · GitHub · MCP · prompt engineering · LLM-in-production · Python ·
              JavaScript / Node.js
            </p>
          </div>
        </Section>

        <footer className="mx-auto max-w-[1080px] px-6 pb-16 pt-8 text-center text-xs text-ink/45">
          <a className="hover:text-accent transition-colors" href="https://samidhavisai.com">
            samidhavisai.com
          </a>
        </footer>
      </main>
    </div>
  );
}

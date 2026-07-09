import { useEffect, useState } from "react";
import { Section } from "./Section";
import encrypted from "../cv-encrypted.json";
import { decryptCv, type CvContent } from "../lib/decryptCv";

const SESSION_KEY = "cv-unlocked-pw";

// ---------------------------------------------------------------------------
// Gate: shows a password prompt. The résumé content ships only as ciphertext
// (../cv-encrypted.json) and is decrypted client-side after the correct
// password. Nothing sensitive is in the DOM or JS bundle before unlock.
// ---------------------------------------------------------------------------
export function CvPage() {
  const [content, setContent] = useState<CvContent | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // Auto-unlock for the session if the password was already entered.
  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (!saved) return;
    decryptCv(encrypted, saved)
      .then(setContent)
      .catch(() => sessionStorage.removeItem(SESSION_KEY));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const data = await decryptCv(encrypted, password);
      sessionStorage.setItem(SESSION_KEY, password);
      setContent(data);
    } catch {
      setError("Incorrect password.");
      setPassword("");
    } finally {
      setBusy(false);
    }
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-paper text-ink flex items-center justify-center px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm rounded-lg border border-line bg-white/60 shadow-[0_12px_30px_rgba(20,24,31,0.06)] p-8"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">
            Résumé · Product
          </p>
          <h1 className="mt-4 text-2xl font-semibold">Samidha Visai</h1>
          <p className="mt-2 text-[15px] leading-relaxed text-ink/60">
            This résumé is password-protected. Enter the password to view it.
          </p>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            aria-label="Password"
            className="mt-6 w-full rounded-md border border-line bg-paper px-4 py-2.5 text-[15px] outline-none focus:border-accent transition-colors"
          />
          {error && (
            <p className="mt-3 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy || !password}
            className="mt-5 w-full px-5 py-2.5 rounded-md bg-accent text-paper text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {busy ? "Unlocking…" : "Unlock résumé"}
          </button>
          <a
            href="https://samidhavisai.com"
            className="mt-5 block text-center text-sm text-ink/50 hover:text-accent transition-colors"
          >
            ← Back to samidhavisai.com
          </a>
        </form>
      </div>
    );
  }

  return <Resume content={content} />;
}

// ---------------------------------------------------------------------------
// The full résumé — rendered only from decrypted content.
// ---------------------------------------------------------------------------
function Resume({ content }: { content: CvContent }) {
  const { hero, contact, contactLinks, experience, toolkit, education } =
    content;

  return (
    <div id="top" className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-50 bg-paper/85 backdrop-blur border-b border-line print:hidden">
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
            <button
              type="button"
              onClick={() => window.print()}
              className="hover:text-accent transition-colors cursor-pointer"
            >
              Download PDF
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section className="mx-auto max-w-[1080px] px-6 pt-20 pb-14 grid lg:grid-cols-[1.4fr_0.9fr] gap-10 items-start">
          <div className="hero-rise">
            <p className="text-xs uppercase tracking-[0.18em] text-ink/45">{hero.eyebrow}</p>
            <h1 className="mt-6 text-4xl sm:text-[3.25rem] leading-[1.05] font-semibold">
              {hero.name}
            </h1>
            <p className="mt-4 text-lg font-medium text-ink/80">{hero.role}</p>
            <p className="mt-6 text-lg leading-relaxed text-ink/65 max-w-2xl border-l-2 border-accent pl-5">
              <strong className="text-ink font-semibold">{hero.blurbStrong}</strong>
              {hero.blurbRest}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4 print:hidden">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-md bg-accent text-paper text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
              >
                Download résumé (PDF)
              </button>
              <a
                href={`mailto:${contact.email}`}
                className="text-sm text-ink/60 hover:text-accent transition-colors"
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
            </div>
          </div>

          <aside className="hero-reveal w-full rounded-lg border border-line bg-white/55 shadow-[0_12px_30px_rgba(20,24,31,0.06)] p-6">
            <div className="text-xs uppercase tracking-[0.16em] text-accent font-semibold">
              Contact
            </div>
            <div className="mt-4 space-y-1 text-[15px] text-ink/70">
              <p>{contact.location}</p>
              <p>{contact.phone}</p>
              <p>{contact.email}</p>
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
              {contact.blurb}
            </div>
          </aside>
        </section>

        <Section id="experience" heading="Experience">
          <div className="border-t border-line">
            {experience.map((entry) => (
              <div
                key={entry.title}
                className="border-b border-line py-8 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-x-10 gap-y-3"
              >
                <div>
                  <h3 className="text-xl font-medium">{entry.title}</h3>
                  <div className="mt-2 text-xs uppercase tracking-wider text-ink/45">
                    {entry.time}
                  </div>
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

        <Section id="tools" heading="Toolkit">
          <div className="rounded-lg border border-line bg-white/60 p-6 shadow-[0_12px_30px_rgba(20,24,31,0.06)]">
            <div className="grid gap-6 sm:grid-cols-2">
              {toolkit.map((t) => (
                <div key={t.group}>
                  <h3 className="text-xs uppercase tracking-[0.16em] text-accent font-semibold mb-2">
                    {t.group}
                  </h3>
                  <p className="text-[15px] leading-7 text-ink/70">{t.items}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="education" heading="Education">
          <div className="border-t border-line">
            <div className="py-8 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-x-10 gap-y-3">
              <div>
                <h3 className="text-xl font-medium">{education.degree}</h3>
                <div className="mt-2 text-xs uppercase tracking-wider text-ink/45">
                  {education.dates}
                </div>
              </div>
              <div className="max-w-2xl text-[15px] leading-relaxed text-ink/65">
                {education.detail}
              </div>
            </div>
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

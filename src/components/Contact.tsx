import { contact } from "../content";
import { EmailLink } from "./EmailLink";
import { LinkedInIcon, GitHubIcon } from "./SocialIcons";

export function Contact() {
  return (
    <section id="contact" className="bg-accent text-paper mt-12">
      <div className="mx-auto max-w-[1080px] px-6 py-24">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{contact.heading}</h2>
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-paper/80">
          <EmailLink className="hover:text-paper transition-colors" />
          <a className="inline-flex items-center gap-2 hover:text-paper transition-colors" href={contact.linkedin} target="_blank" rel="noreferrer">
            <LinkedInIcon /> LinkedIn
          </a>
          <a className="inline-flex items-center gap-2 hover:text-paper transition-colors" href={contact.github} target="_blank" rel="noreferrer">
            <GitHubIcon /> GitHub
          </a>
          <a className="hover:text-paper transition-colors" href={contact.product} target="_blank" rel="noreferrer">Practice Systems AI ↗</a>
        </div>
        <p className="mt-16 text-xs text-paper/40">© {new Date().getFullYear()} Samidha Visai</p>
      </div>
    </section>
  );
}

import { contact } from "../content";

export function Contact() {
  return (
    <section id="contact" className="bg-brand-dark text-white mt-16">
      <div className="mx-auto max-w-[1040px] px-6 py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold">{contact.heading}</h2>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <a className="px-5 py-2.5 rounded-lg bg-white text-brand-dark font-medium" href={`mailto:${contact.email}`}>Email me</a>
          <a className="px-5 py-2.5 rounded-lg border border-white/30 font-medium" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="px-5 py-2.5 rounded-lg border border-white/30 font-medium" href={contact.product} target="_blank" rel="noreferrer">Practice Systems AI</a>
        </div>
        <p className="mt-10 text-xs text-gray-400">© {new Date().getFullYear()} Samidha Visai</p>
      </div>
    </section>
  );
}

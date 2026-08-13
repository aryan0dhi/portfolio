import { profile } from "@/lib/data";
import Reveal from "./Reveal";
import CopyButton from "./CopyButton";
import SectionField from "./backgrounds/SectionField";

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 scroll-mt-28 bg-paper">
      <span
        id="sig-output"
        aria-hidden="true"
        className="pointer-events-none absolute left-[59%] top-28 h-px w-px"
      />
      <SectionField glow="left-[60%] top-[-10%]" />
      <div className="relative z-10 mx-auto max-w-content px-6 py-12 md:px-10 md:py-14">
        <Reveal>
          <p className="eyebrow mb-3 text-signal">Contact</p>
          <h2 className="section-heading max-w-2xl">
            Let&apos;s build something that moves.
          </h2>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="site-button bg-ink px-5 py-3 text-sm text-paper transition hover:-translate-y-0.5 hover:bg-signal"
            >
              {profile.email} <span className="arrow-glyph" aria-hidden="true">→</span>
            </a>
            <CopyButton
              value={profile.email}
              label="Copy email"
              copiedLabel="Email copied"
              className="rounded-md border border-ink/20 px-4 py-3 text-sm text-inksoft transition-colors hover:border-signal hover:text-signal"
            />
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-ink/30 pb-0.5 text-sm text-inksoft transition-colors hover:border-signal hover:text-signal"
            >
              View resume
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-muted">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="border-b border-ink/20 pb-0.5 hover:text-signal">
              github.com/{profile.githubHandle}
            </a>
            <span className="text-ink/25">·</span>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="border-b border-ink/20 pb-0.5 hover:text-signal">
              LinkedIn
            </a>
            <span className="text-ink/25">·</span>
            <span>{profile.phone}</span>
          </div>
        </Reveal>
      </div>

      <footer className="border-t site-divider">
        <div className="mx-auto flex max-w-content flex-col gap-2 px-6 py-6 text-[12px] text-muted md:flex-row md:items-center md:justify-between md:px-10">
          <span>© {new Date().getFullYear()} Aryan Dhillon</span>
          <span>Built with Next.js, React, Motion, and Tailwind.</span>
          <a href="#top" className="hover:text-signal">
            Back to top ↑
          </a>
        </div>
      </footer>
    </section>
  );
}

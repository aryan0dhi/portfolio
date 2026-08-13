import { profile, resume } from "@/lib/data";
import Reveal from "./Reveal";

export default function ResumePreview() {
  return (
    <section id="resume" className="relative z-10 scroll-mt-28 bg-paper">
      <div className="mx-auto grid max-w-content items-center gap-10 px-6 py-14 md:grid-cols-[minmax(0,1fr)_minmax(320px,440px)] md:px-10 md:py-16">
        <Reveal>
          <p className="eyebrow mb-3 text-signal">Resume</p>
          <h2 className="section-heading">
            Keep the PDF on-site.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-inksoft">
            First page preview, sized for quick scanning, with the full PDF still one click away.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
            Updated {resume.updated}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="site-button bg-ink px-5 py-3 text-sm text-paper transition hover:-translate-y-0.5 hover:bg-signal"
            >
              Open full resume <span className="arrow-glyph" aria-hidden="true">↗</span>
            </a>
            <a
              href={profile.resume}
              download
              className="border-b border-ink/30 pb-0.5 text-sm text-inksoft transition-colors hover:border-signal hover:text-signal"
            >
              Download PDF
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="site-card mx-auto w-full max-w-[430px] overflow-hidden bg-paperdeep p-2 shadow-[0_12px_32px_rgba(0,0,0,0.06)]">
            <object
              data={`${profile.resume}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
              type="application/pdf"
              className="h-[500px] w-full rounded-md bg-paper md:h-[560px]"
              aria-label="First page resume preview"
            >
              <div className="p-6 text-[14px] text-inksoft">
                PDF preview unavailable. Use the full resume link.
              </div>
            </object>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

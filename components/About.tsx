import { education, profile } from "@/lib/data";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="relative z-10 scroll-mt-28 bg-paper">
      <div className="relative mx-auto max-w-content px-6 py-12 md:px-10 md:py-14">
        <Reveal>
          <p className="eyebrow mb-3 text-signal">About</p>
          <h2 className="section-heading mb-6">
            Systems thinking, from silicon to product.
          </h2>
          <p className="max-w-2xl text-[15px] leading-relaxed text-inksoft">
            I&apos;m a Computer Engineering student at Purdue working across the
            stack — embedded C in safety-critical avionics, AI/ML forecasting,
            and full-stack products with real infrastructure behind them. The
            common thread: moving information cleanly through complex systems.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <Reveal delay={0.08}>
            <div className="site-card relative bg-paperdeep/70 p-6">
              <p className="eyebrow mb-3 text-signal">Education</p>
              <p className="font-serif text-xl text-ink">{education.school}</p>
              <p className="mt-1 text-sm text-inksoft">{education.degree}</p>
              <p className="mt-1 text-[13px] text-muted">
                {education.graduation} · {education.location}
              </p>
              <div className="mt-4 border-t site-divider pt-4 text-[13px] text-muted">
                <p>
                  <span className="text-inksoft">Concentrations:</span>{" "}
                  {education.concentrations}
                </p>
                <p className="mt-2">
                  <span className="text-inksoft">Coursework:</span>{" "}
                  {education.coursework}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4">
              <div className="site-card bg-paperdeep/70 p-4">
                <p className="eyebrow mb-2 text-signal text-xs">Resume</p>
                <p className="text-[13px] leading-relaxed text-inksoft mb-3">
                  First page preview — full PDF is one click away.
                </p>
                <div className="bg-paperdeep rounded p-1.5 h-48 overflow-hidden">
                  <object
                    data={`${profile.resume}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                    type="application/pdf"
                    className="h-full w-full rounded bg-paper"
                    aria-label="First page resume preview"
                  >
                    <div className="p-3 text-xs text-inksoft">
                      PDF preview unavailable.
                    </div>
                  </object>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-button bg-ink px-4 py-2 text-sm text-paper transition hover:-translate-y-0.5 hover:bg-signal"
                >
                  Open <span className="arrow-glyph" aria-hidden="true">↗</span>
                </a>
                <a
                  href={profile.resume}
                  download
                  className="border-b border-ink/30 pb-0.5 text-sm text-inksoft transition-colors hover:border-signal hover:text-signal"
                >
                  Download
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

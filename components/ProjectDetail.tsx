"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { Project } from "@/lib/data";
import { themes } from "@/lib/themes";
import GarminVisual from "./visuals/GarminVisual";
import VailaVisual from "./visuals/VailaVisual";
import DataMineVisual from "./visuals/DataMineVisual";
import InvestVisual from "./visuals/InvestVisual";
import BeamRailVisual from "./visuals/BeamRailVisual";
import CopyButton from "./CopyButton";
import ProjectKeyboardNav from "./ProjectKeyboardNav";

const visuals: Record<Project["theme"], () => React.ReactElement> = {
  garmin: GarminVisual,
  vaila: VailaVisual,
  datamine: DataMineVisual,
  invest: InvestVisual,
  beamrail: BeamRailVisual,
};

export default function ProjectDetail({
  project,
  previous,
  next,
}: {
  project: Project;
  previous?: { id: string; name: string };
  next?: { id: string; name: string };
}) {
  const t = themes[project.theme];
  const Visual = visuals[project.theme];

  return (
    <main className={`min-h-screen ${t.page}`}>
      {previous && next && <ProjectKeyboardNav previousId={previous.id} nextId={next.id} />}
      <div className="mx-auto max-w-content px-6 py-10 md:px-10 md:py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/#work"
            className={`inline-flex items-center gap-2 text-sm ${t.accent}`}
          >
            <span aria-hidden="true">←</span> Back to the signal
          </Link>
          <CopyButton
            value={`https://aryandhillon.dev/work/${project.id}`}
            label="Copy project link"
            copiedLabel="Copied"
            className={`rounded-md px-3 py-2 text-[12px] ${t.ghostBtn}`}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <p className={`eyebrow mb-4 ${t.eyebrow}`}>
            {project.index} — {project.proves}
          </p>
          <h1 className={`font-serif text-5xl tracking-tight md:text-7xl ${t.name}`}>
            {project.name}
          </h1>
          <p className={`mt-3 text-sm ${t.meta}`}>
            {project.subtitle} · {project.dates}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className={`rounded-md px-3.5 py-1.5 text-[12px] ${t.chip}`}>
              {project.status}
            </span>
            {project.filters.map((filter) => (
              <span key={filter} className={`rounded-md px-3.5 py-1.5 text-[12px] ${t.chip}`}>
                {filter}
              </span>
            ))}
          </div>

          {project.tagline ? (
            <p className={`mt-8 max-w-2xl font-serif text-2xl leading-snug md:text-3xl ${t.name}`}>
              {project.tagline.includes("fit the plan") ? (
                <>
                  Times that <em className={`italic ${t.accent}`}>fit the plan</em>, not just your calendar.
                </>
              ) : (
                project.tagline
              )}
            </p>
          ) : (
            <p className={`mt-8 max-w-2xl text-lg leading-relaxed ${t.body}`}>
              {project.summary}
            </p>
          )}
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-10 grid gap-px overflow-hidden rounded-lg border ${t.divider} md:grid-cols-4`}
        >
          {[
            ["Role", project.role],
            ["Timeline", project.dates],
            ["Impact", project.impact],
            ["Status", project.status],
          ].map(([label, value]) => (
            <div key={label} className={`${t.panel} p-4`}>
              <dt className={`font-mono text-[10px] uppercase tracking-[0.12em] ${t.meta}`}>
                {label}
              </dt>
              <dd className={`mt-2 text-sm ${t.body}`}>{value}</dd>
            </div>
          ))}
        </motion.dl>

        {/* Signature visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 overflow-hidden rounded-2xl"
        >
          <Visual />
        </motion.div>

        <div className="mt-14 grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className={`eyebrow mb-5 ${t.accent}`}>What I built</p>
            <ul className="space-y-4">
              {project.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={`flex gap-3 text-[15px] leading-relaxed ${t.body}`}
                >
                  <span className={`mt-2 h-1.5 w-1.5 flex-none rounded-full ${t.dot}`} />
                  {h}
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <p className={`eyebrow mb-5 ${t.accent}`}>Stack</p>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s} className={`rounded-md px-3.5 py-1.5 text-[13px] ${t.chip}`}>
                  {s}
                </li>
              ))}
            </ul>

            {project.link && (
              <div className="mt-8">
                <a
                  href={project.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`site-button px-5 py-3 text-sm transition-transform ${t.primaryBtn}`}
                >
                  {project.link.label} <span className="arrow-glyph" aria-hidden="true">↗</span>
                </a>
                {project.linkNote && (
                  <p className={`mt-3 max-w-xs text-[12px] leading-relaxed ${t.meta}`}>
                    {project.linkNote}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={`mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-6 ${t.divider}`}>
          <Link href="/#work" className={`text-sm ${t.meta}`}>
            ← All work
          </Link>
          {previous && (
            <Link href={`/work/${previous.id}`} className={`text-sm ${t.meta}`}>
              ← Previous: {previous.name}
            </Link>
          )}
          {next && (
            <Link href={`/work/${next.id}`} className={`text-sm ${t.accent}`}>
              Next: {next.name} → <span className={t.meta}>(Arrow keys)</span>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}

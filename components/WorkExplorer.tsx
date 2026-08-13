"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { projects } from "@/lib/data";
import SectionField from "./backgrounds/SectionField";

const filters = ["Embedded", "Full-Stack", "AI/ML", "Backend"];

export default function WorkExplorer() {
  const [active, setActive] = useState<string[]>([]);
  const shown = useMemo(
    () =>
      active.length === 0
        ? projects
        : projects.filter((project) =>
            active.every((filter) => project.filters.includes(filter)),
          ),
    [active],
  );

  const toggle = (filter: string) => {
    setActive((items) =>
      items.includes(filter)
        ? items.filter((item) => item !== filter)
        : [...items, filter],
    );
  };

  return (
    <section id="all-work" className="relative z-10 scroll-mt-28 bg-paper">
      <SectionField glow="left-[68%] top-[-16%]" />
      <div className="relative z-10 mx-auto max-w-content px-6 py-12 md:px-10 md:py-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3 text-signal">All projects</p>
            <h2 className="section-heading max-w-xl">
              Recruiter shortcut layer.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActive([])}
              className={`rounded-md border px-3.5 py-2 text-[13px] transition-colors ${
                active.length === 0
                  ? "border-signal bg-signal text-paper"
                  : "border-ink/15 bg-paperdeep/40 text-inksoft hover:border-signal hover:text-signal"
              }`}
            >
              All
            </button>
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => toggle(filter)}
                className={`rounded-md border px-3.5 py-2 text-[13px] transition-colors ${
                  active.includes(filter)
                    ? "border-signal bg-signal text-paper"
                    : "border-ink/15 bg-paperdeep/40 text-inksoft hover:border-signal hover:text-signal"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-4 text-[13px] text-muted">
          {shown.length} match{shown.length === 1 ? "" : "es"}
          {active.length > 0 ? ` for ${active.join(" + ")}` : " across all tracks"}.
        </p>

        <div className="mt-9 grid gap-3 md:grid-cols-2">
          {shown.length === 0 && (
            <div className="site-card p-5 text-[14px] text-muted md:col-span-2">
              No exact match. Clear one filter to broaden the signal.
            </div>
          )}
          {shown.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.id}`}
              className="site-card group p-4 transition-colors hover:border-signal/45 hover:bg-paperdeep/75"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-serif text-2xl text-ink">{project.name}</p>
                    <span className="site-pill px-2 py-1 text-[10px] uppercase tracking-[0.08em] text-muted">
                      {project.status}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] text-muted">{project.proves}</p>
                </div>
                <span className="font-mono text-[11px] text-signal">{project.index}</span>
              </div>
              <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-inksoft">
                {project.blurb}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.filters.map((tag) => (
                  <span
                    key={tag}
                    className="site-pill text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

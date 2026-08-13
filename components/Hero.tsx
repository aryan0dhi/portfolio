"use client";

import { motion } from "motion/react";
import { profile } from "@/lib/data";
import AvailabilityPopover from "./AvailabilityPopover";
import CircuitField from "./backgrounds/CircuitField";

const socialMeta = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "Purdue" },
  { label: "Computer Engineering" },
  { label: "'27" },
];

export default function Hero({
  onFollowSignal,
}: {
  onFollowSignal?: () => void;
}) {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[92vh] max-w-content flex-col justify-center overflow-hidden px-6 pb-12 pt-24 md:px-10"
    >
      <CircuitField />
      <div className="relative flex items-center gap-12 lg:gap-16">
        <div className="relative ml-10 max-w-[calc(100%-2.5rem)] flex-1 md:ml-0 md:max-w-2xl">
        <motion.div
          className="mb-5 flex items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md border border-trace/45 bg-paperdeep/80 shadow-[inset_0_0_18px_rgba(96,165,250,0.08)] sm:h-16 sm:w-16">
            <img
              src="/aryan-avatar.png"
              alt="Aryan Dhillon headshot"
              className="h-full w-full object-cover object-center"
            />
          </div>
          {profile.available && <AvailabilityPopover />}
        </motion.div>

        <motion.p
          className="eyebrow mb-4 text-signal"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          {profile.role}
        </motion.p>

        <motion.h1
          className="font-serif text-[16vw] leading-[0.82] tracking-tight text-ink sm:text-7xl md:text-[6.4rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Aryan
          <br />
          Dhillon
        </motion.h1>

        <motion.p
          className="mt-6 max-w-[18.5rem] font-serif text-[1.45rem] font-medium leading-snug text-ink sm:max-w-xl md:text-[1.85rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="site-button bg-ink px-5 py-3 text-sm text-paper transition hover:-translate-y-0.5 hover:bg-signal"
          >
            View resume <span className="arrow-glyph" aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            onClick={onFollowSignal}
            className="border-b border-ink/35 pb-0.5 text-sm text-inksoft transition-colors hover:border-signal hover:text-signal"
          >
            Follow the signal <span className="arrow-glyph" aria-hidden="true">→</span>
          </button>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap items-center gap-y-2 text-[13px] text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          {socialMeta.map((item, i) => (
            <span key={item.label} className="inline-flex items-center">
              {item.href ? (
                <a href={item.href} target={item.href.startsWith("mailto:") ? undefined : "_blank"} rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"} className="border-b border-ink/20 pb-0.5 hover:text-signal">
                  {item.label}
                </a>
              ) : (
                <span>{item.label}</span>
              )}
              {i < socialMeta.length - 1 && <span className="mx-3 text-ink/25">·</span>}
            </span>
          ))}
        </motion.div>
        </div>

      </div>

      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <span className="eyebrow text-signal">Work ↓</span>
      </div>
    </section>
  );
}

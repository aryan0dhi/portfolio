"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { profile } from "@/lib/data";

export default function AvailabilityPopover() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => window.setTimeout(() => setOpen(false), 160)}
        className="inline-flex items-center gap-2 rounded-full border border-emerald-300/70 bg-emerald-400/15 py-1 pl-2.5 pr-3.5 text-[12px] text-ink transition-colors hover:border-emerald-200 hover:bg-emerald-400/20"
        aria-expanded={open}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-200 opacity-80" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-200" />
        </span>
        {profile.availableText}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.14 }}
            className="absolute left-0 top-9 z-30 w-64 rounded-lg border border-trace/30 bg-paper p-3 text-[12px] leading-relaxed text-inksoft shadow-xl"
          >
            SWE internships · Summer 2026 · Embedded / Backend / AI infra / Full-stack product.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

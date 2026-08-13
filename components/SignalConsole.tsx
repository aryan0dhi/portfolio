"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const logs = [
  "probe: portfolio bus",
  "clk: stable",
  "mcu: computer engineering core detected",
  "routes: work -> skills -> about -> output",
  "status: open to work",
];

export default function SignalConsole() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-signal-console", onOpen);
    return () => window.removeEventListener("open-signal-console", onOpen);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed bottom-5 right-5 z-[110] w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-lg border border-signal/30 bg-ink text-paper shadow-2xl"
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.18 }}
          role="status"
        >
          <div className="flex items-center justify-between border-b border-paper/10 px-4 py-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal">
              Signal diagnostic
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="font-mono text-[12px] text-paper/60 transition-colors hover:text-paper"
              aria-label="Close signal diagnostic"
            >
              esc
            </button>
          </div>
          <div className="space-y-2 px-4 py-3 font-mono text-[11px] leading-relaxed text-paper/75">
            {logs.map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <span className="text-signal">[{String(i + 1).padStart(2, "0")}]</span> {line}
              </motion.p>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

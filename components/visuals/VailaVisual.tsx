"use client";

import { motion } from "motion/react";

const suggestions = [
  { say: "“coffee this week”", time: "Tue 9:30 AM", note: "mornings, obviously" },
  { say: "“dinner with maya”", time: "Fri 7:00 PM", note: "evenings — never 3 PM" },
  { say: "“study for finals”", time: "Sun 2:00 PM", note: "a real block, not a gap" },
];

export default function VailaVisual() {
  return (
    <div className="w-full rounded-xl border border-[#e0d7c8] bg-[#f7f3ec] p-6 md:p-8">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8">
        <div className="space-y-3">
          <p className="eyebrow text-[#a89e8f]">You say</p>
          {suggestions.map((s, i) => (
            <motion.div
              key={s.say}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="rounded-lg rounded-bl-none bg-white/70 px-4 py-3 font-serif text-[15px] text-vailachar shadow-sm"
            >
              {s.say}
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <svg viewBox="0 0 60 200" className="h-40 w-10" aria-hidden="true">
            <motion.path
              d="M4 20 C 40 40, 20 100, 56 120 C 30 140, 44 170, 30 190"
              fill="none"
              stroke="#a8663f"
              strokeWidth="1.6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
            <circle cx="4" cy="20" r="3" fill="#a8663f" />
            <circle cx="30" cy="190" r="3" fill="#a8663f" />
          </svg>
        </div>

        <div className="space-y-3">
          <p className="eyebrow text-[#a89e8f]">Vaila suggests</p>
          {suggestions.map((s, i) => (
            <motion.div
              key={s.time}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
              className="rounded-lg border border-[#e0d7c8] bg-white px-4 py-2.5"
            >
              <p className="text-[15px] font-medium text-vailachar">{s.time}</p>
              <p className="text-[12px] text-[#8a8072]">{s.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

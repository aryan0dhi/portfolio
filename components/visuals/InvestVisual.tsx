"use client";

import { motion } from "motion/react";

export default function InvestVisual() {
  return (
    <svg viewBox="0 0 680 340" className="h-auto w-full" role="img" aria-label="Strategy equity curve outperforming a buy-and-hold benchmark">
      <rect width="680" height="340" fill="#101418" />
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={i} x1="20" y1={40 + i * 45} x2="660" y2={40 + i * 45} stroke="#1a2028" strokeWidth="0.5" />
      ))}

      {/* benchmark */}
      <motion.path
        d="M20 250 C 120 240, 200 250, 300 220 C 400 190, 480 230, 560 200 C 610 182, 640 190, 660 178"
        fill="none"
        stroke="#5f6875"
        strokeWidth="1.6"
        strokeDasharray="5 5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />

      {/* strategy equity curve */}
      <motion.path
        d="M20 250 C 120 235, 190 215, 280 190 C 340 173, 380 205, 440 175 C 500 146, 540 120, 600 92 C 630 78, 648 70, 660 60"
        fill="none"
        stroke="#4ac0a0"
        strokeWidth="2.2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1.6, ease: "easeInOut" }}
      />

      <motion.circle cx="660" cy="60" r="4" fill="#4ac0a0" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 2 }} />

      <text x="24" y="86" fill="#4ac0a0" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="1">STRATEGY</text>
      <text x="24" y="270" fill="#5f6875" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="1">BUY &amp; HOLD</text>
      <line x1="20" y1="300" x2="660" y2="300" stroke="#262e38" strokeWidth="1" />
      <text x="20" y="320" fill="#5f6875" fontSize="10" fontFamily="var(--font-mono)">5 YEARS OHLCV · YAHOO FINANCE</text>
    </svg>
  );
}

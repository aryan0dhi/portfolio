"use client";

import { motion } from "motion/react";

export default function DataMineVisual() {
  return (
    <svg viewBox="0 0 680 340" className="h-auto w-full" role="img" aria-label="Historical demand with LSTM forecast mean and 90 percent prediction interval">
      <rect width="680" height="340" fill="#f4f6ee" />

      {/* forecast split marker */}
      <line x1="360" y1="30" x2="360" y2="300" stroke="#b8c4a3" strokeWidth="0.75" strokeDasharray="4 5" />
      <text x="360" y="22" fill="#6f7a60" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="1" textAnchor="middle">FORECAST</text>

      {/* prediction interval band */}
      <motion.path
        d="M360 170 C 430 150, 470 120, 540 110 C 590 104, 630 96, 660 92 L 660 210 C 630 214, 590 220, 540 224 C 470 230, 430 214, 360 190 Z"
        fill="#3B6D11"
        fillOpacity="0.12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.8 }}
      />

      {/* historical line */}
      <motion.path
        d="M20 250 C 60 210, 80 260, 110 220 C 140 185, 160 235, 190 200 C 220 170, 245 215, 275 180 C 305 150, 335 195, 360 180"
        fill="none"
        stroke="#2f3a25"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* forecast mean */}
      <motion.path
        d="M360 180 C 430 165, 470 140, 540 132 C 590 126, 630 120, 660 116"
        fill="none"
        stroke="#3B6D11"
        strokeWidth="2"
        strokeDasharray="1 0"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.4, duration: 1.2, ease: "easeInOut" }}
      />

      <circle cx="360" cy="180" r="4" fill="#3B6D11" />

      {/* axis */}
      <line x1="20" y1="300" x2="660" y2="300" stroke="#c6d1b3" strokeWidth="1" />
      <text x="20" y="320" fill="#8a9578" fontSize="10" fontFamily="var(--font-mono)">12-MO HISTORY</text>
      <text x="660" y="320" fill="#8a9578" fontSize="10" fontFamily="var(--font-mono)" textAnchor="end">12-MO FORECAST</text>
    </svg>
  );
}

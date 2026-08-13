"use client";

import { motion } from "motion/react";

const STEEL = "#93a6c4";
const INK = "#f2f4f7";

const steps = [
  { n: "01", title: "Start", body: "A library of proven warrant types — never a blank page." },
  { n: "02", title: "Draft", body: "Enter the case once; the facts carry through the document." },
  { n: "03", title: "Review", body: "Catch missing elements and gaps before a judge does." },
];

export default function BeamRailVisual() {
  const xs = [130, 340, 550];
  const y = 150;

  return (
    <svg viewBox="0 0 680 300" className="h-auto w-full" role="img" aria-label="BEAMRaiL warrant drafting flow: start from a template, draft once, review for gaps">
      <rect width="680" height="300" fill="#0c1016" />
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={i} x1="0" y1={i * 50} x2="680" y2={i * 50} stroke="#161b23" strokeWidth="0.5" />
      ))}

      {/* connective rail */}
      <motion.line
        x1={xs[0]}
        y1={y}
        x2={xs[2]}
        y2={y}
        stroke="#2a323d"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {steps.map((s, i) => (
        <motion.g
          key={s.n}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
        >
          <circle cx={xs[i]} cy={y} r="7" fill="#0c1016" stroke={STEEL} strokeWidth="1.6" />
          {i === 2 ? (
            <path d={`M${xs[i] - 3.5} ${y} l2.6 2.6 l4.6 -5`} fill="none" stroke={STEEL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <circle cx={xs[i]} cy={y} r="2" fill={STEEL} />
          )}

          <text x={xs[i]} y={y - 34} fill="#5c6675" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="1.5" textAnchor="middle">
            {s.n}
          </text>
          <text x={xs[i]} y={y - 18} fill={INK} fontSize="15" fontFamily="var(--font-serif)" textAnchor="middle">
            {s.title}
          </text>

          <text x={xs[i]} y={y + 34} fill="#8892a0" fontSize="11" fontFamily="var(--font-sans)" textAnchor="middle">
            <tspan x={xs[i]} dy="0">
              {s.body.split(";")[0].split("—")[0].trim()}
            </tspan>
          </text>
        </motion.g>
      ))}

      {/* travelling pulse */}
      <motion.circle
        r="3.5"
        fill={STEEL}
        cy={y}
        initial={{ cx: xs[0] }}
        animate={{ cx: [xs[0], xs[2]] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
      />

      <text x="130" y="250" fill="#5c6675" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1.5">
        BUILT FOR CJIS · WON&apos;T WRITE YOUR PROBABLE CAUSE
      </text>
    </svg>
  );
}

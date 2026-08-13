"use client";

import { motion } from "motion/react";

function Aircraft({
  x,
  y,
  rotate = 0,
}: {
  x: number;
  y: number;
  rotate?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`} aria-hidden="true">
      <path
        d="M30 0 0 10 5 0 0 -10Z"
        fill="#e6edf4"
        stroke="#6f7f8f"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path d="M2 0h18" stroke="#111820" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
    </g>
  );
}

export default function GarminVisual() {
  const pathDraw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (delay: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.2, delay, ease: "easeInOut" as const },
        opacity: { duration: 0.2, delay },
      },
    }),
  };

  return (
    <svg
      viewBox="0 0 680 360"
      className="h-auto w-full"
      role="img"
      aria-label="TCAS diagram showing two aircraft receiving coordinated climb and descend advisories"
    >
      <rect width="680" height="360" fill="#0b0e12" />

      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={60 + i * 80}
          y1="32"
          x2={60 + i * 80}
          y2="300"
          stroke="#1a2028"
          strokeWidth="0.6"
        />
      ))}
      {Array.from({ length: 4 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1="42"
          y1={64 + i * 68}
          x2="638"
          y2={64 + i * 68}
          stroke="#1a2028"
          strokeWidth="0.6"
        />
      ))}

      <text x="52" y="46" fill="#728091" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1.4">
        TCAS CONFLICT RESOLUTION
      </text>
      <text x="628" y="46" fill="#4a9fe0" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1.4" textAnchor="end">
        RA PAIR
      </text>

      <motion.path
        variants={pathDraw}
        custom={0}
        initial="hidden"
        animate="show"
        d="M96 136 C 206 136, 282 158, 332 178"
        fill="none"
        stroke="#7c8794"
        strokeWidth="1.1"
        strokeDasharray="5 6"
      />
      <motion.path
        variants={pathDraw}
        custom={0.08}
        initial="hidden"
        animate="show"
        d="M584 216 C 474 216, 398 196, 348 182"
        fill="none"
        stroke="#7c8794"
        strokeWidth="1.1"
        strokeDasharray="5 6"
      />

      <Aircraft x={118} y={136} rotate={4} />
      <Aircraft x={562} y={216} rotate={184} />

      <text x="96" y="116" fill="#8b95a3" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1.5">
        ACFT 01
      </text>
      <text x="584" y="238" fill="#8b95a3" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1.5" textAnchor="end">
        ACFT 02
      </text>

      <g opacity="0.9" aria-hidden="true">
        <path d="M304 154 C 326 162, 326 198, 304 206" fill="none" stroke="#e6edf4" strokeWidth="2" opacity="0.85" />
        <path d="M286 140 C 326 154, 326 206, 286 220" fill="none" stroke="#e6edf4" strokeWidth="2" opacity="0.65" />
        <path d="M376 154 C 354 162, 354 198, 376 206" fill="none" stroke="#e6edf4" strokeWidth="2" opacity="0.85" />
        <path d="M394 140 C 354 154, 354 206, 394 220" fill="none" stroke="#e6edf4" strokeWidth="2" opacity="0.65" />
      </g>

      <circle cx="340" cy="180" r="28" fill="#0f151c" stroke="#314355" strokeWidth="1" />
      <text
        x="340"
        y="177"
        fill="#e6edf4"
        fontSize="10"
        fontFamily="var(--font-mono)"
        letterSpacing="1.2"
        textAnchor="middle"
      >
        TCAS
      </text>
      <text x="340" y="193" fill="#7d8794" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">
        ADVISORY
      </text>

      <motion.path
        variants={pathDraw}
        custom={0.35}
        initial="hidden"
        animate="show"
        d="M216 132 C 246 96, 282 84, 326 82"
        fill="none"
        stroke="#dc3f3f"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M330 82 314 73 317 91Z" fill="#dc3f3f" />
      <motion.path
        variants={pathDraw}
        custom={0.45}
        initial="hidden"
        animate="show"
        d="M464 220 C 432 260, 394 272, 350 274"
        fill="none"
        stroke="#4a9fe0"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M346 274 362 265 359 283Z" fill="#4a9fe0" />

      <rect x="216" y="54" width="100" height="34" rx="7" fill="#dc3f3f" />
      <text x="266" y="76" fill="#fff7f7" fontSize="16" fontFamily="Inter, sans-serif" textAnchor="middle">
        CLIMB
      </text>
      <rect x="366" y="272" width="112" height="34" rx="7" fill="#3269b7" />
      <text x="422" y="294" fill="#f4f8ff" fontSize="16" fontFamily="Inter, sans-serif" textAnchor="middle">
        DESCEND
      </text>

      <line x1="340" y1="218" x2="340" y2="252" stroke="#293441" strokeWidth="0.8" strokeDasharray="4 5" />
      <text x="340" y="324" fill="#8b95a3" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="1.5" textAnchor="middle">
        COORDINATED VERTICAL ADVISORIES
      </text>
    </svg>
  );
}

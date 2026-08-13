"use client";

import { motion } from "motion/react";

export default function VailaProductFallback() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-paperdeep via-paper to-paperdeep p-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Circuit trace decoration */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5 pointer-events-none"
        viewBox="0 0 400 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--hero-signal)" />
            <stop offset="100%" stopColor="var(--hero-trace)" />
          </linearGradient>
        </defs>

        {/* Vertical spine */}
        <line x1="200" y1="0" x2="200" y2="600" stroke="url(#traceGrad)" strokeWidth="1" />

        {/* Node connection left */}
        <circle cx="100" cy="80" r="4" fill="var(--hero-signal)" opacity="0.6" />
        <path d="M 100 80 Q 150 90 200 100" stroke="url(#traceGrad)" strokeWidth="1" fill="none" />

        {/* Node connection right */}
        <circle cx="300" cy="200" r="4" fill="var(--hero-signal)" opacity="0.6" />
        <path d="M 300 200 Q 250 210 200 220" stroke="url(#traceGrad)" strokeWidth="1" fill="none" />

        {/* Center nodes */}
        <circle cx="200" cy="150" r="5" fill="var(--hero-signal)" opacity="0.4" />
        <circle cx="200" cy="300" r="5" fill="var(--hero-signal)" opacity="0.4" />
        <circle cx="200" cy="450" r="5" fill="var(--hero-signal)" opacity="0.4" />
      </svg>

      {/* Main content container */}
      <div className="relative z-10 text-center max-w-sm">
        {/* iPhone mockup placeholder */}
        <motion.div
          className="mb-8 mx-auto w-32 h-64 bg-gradient-to-b from-ink to-ink/80 rounded-2xl border-8 border-paperdeep shadow-lg relative flex items-center justify-center"
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-6 bg-ink rounded-b-2xl" />

          {/* Screen content placeholder */}
          <div className="w-full h-full rounded-xl bg-gradient-to-br from-paper/10 to-signal/5 flex flex-col items-center justify-center gap-2 p-3">
            <div className="w-3 h-3 rounded-full bg-signal/40" />
            <div className="w-20 h-1 bg-signal/30 rounded" />
            <div className="w-18 h-0.5 bg-signal/20 rounded mt-1" />
          </div>
        </motion.div>

        {/* Web dashboard placeholder */}
        <motion.div
          className="mx-auto w-40 h-24 bg-gradient-to-b from-paper/50 to-paper/30 border border-signal/30 rounded-lg shadow-md mb-6"
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <div className="p-3 space-y-1.5">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-signal/40" />
              <div className="w-20 h-1 bg-signal/30 rounded" />
            </div>
            <div className="w-full h-0.5 bg-trace/20 rounded" />
            <div className="grid grid-cols-3 gap-1">
              <div className="h-1.5 bg-signal/20 rounded" />
              <div className="h-1.5 bg-signal/15 rounded" />
              <div className="h-1.5 bg-signal/25 rounded" />
            </div>
          </div>
        </motion.div>

        {/* Text overlay */}
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-widest text-signal font-medium">Vaila System</p>
          <p className="text-sm text-ink/60">iOS · Web · Backend · AI</p>
        </div>
      </div>

      {/* Pulse indicator at bottom */}
      <motion.div
        className="absolute bottom-6 w-1.5 h-1.5 rounded-full bg-signal"
        animate={{
          opacity: [0.2, 1, 0.2],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

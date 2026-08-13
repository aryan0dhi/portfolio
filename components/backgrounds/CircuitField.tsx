"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect } from "react";

// A few hand-routed PCB traces (right-angle bends, like real board routing).
const TRACES = [
  "M40 120 H180 Q190 120 190 130 V210 Q190 220 200 220 H360",
  "M40 250 H120 Q130 250 130 260 V330 Q130 340 140 340 H300",
  "M40 380 H240 Q250 380 250 370 V300 Q250 290 260 290 H420",
  "M980 90 H840 Q830 90 830 100 V180 Q830 190 820 190 H700",
  "M980 230 H900 Q890 230 890 240 V320 Q890 330 880 330 H760",
  "M980 360 H820 Q810 360 810 350 V280 Q810 270 800 270 H660",
  "M500 40 V120 Q500 130 510 130 H600 Q610 130 610 140 V240",
];

// Traces that carry a visible "current" pulse.
const LIVE = [
  "M40 120 H180 Q190 120 190 130 V210 Q190 220 200 220 H520",
  "M980 230 H900 Q890 230 890 240 V320 Q890 330 880 330 H560",
  "M500 40 V120 Q500 130 510 130 H600 Q610 130 610 140 V300 Q610 310 620 310 H760",
];

const PADS = [
  [200, 220],
  [360, 220],
  [140, 340],
  [260, 290],
  [820, 190],
  [700, 190],
  [880, 330],
  [610, 240],
  [510, 130],
];

export default function CircuitField() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18 });
  const sy = useSpring(my, { stiffness: 50, damping: 18 });

  const glowX = useTransform(sx, (v) => v * 26);
  const glowY = useTransform(sy, (v) => v * 26);
  const traceX = useTransform(sx, (v) => v * -14);
  const traceY = useTransform(sy, (v) => v * -14);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, mx, my]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* drifting signal glow */}
      <motion.div className="absolute inset-0" style={{ x: glowX, y: glowY }}>
        <div
          className="absolute left-[58%] top-[8%] h-[46rem] w-[46rem] rounded-full opacity-[0.22] blur-[90px] dark:opacity-[0.16]"
          style={{
            background:
              "radial-gradient(circle, var(--color-signal) 0%, transparent 62%)",
            animation: reduce ? undefined : "circuit-drift-a 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute left-[30%] top-[42%] h-[34rem] w-[34rem] rounded-full opacity-[0.14] blur-[90px] dark:opacity-[0.12]"
          style={{
            background:
              "radial-gradient(circle, var(--color-copper) 0%, transparent 60%)",
            animation: reduce ? undefined : "circuit-drift-b 22s ease-in-out infinite",
          }}
        />
      </motion.div>

      {/* PCB traces */}
      <motion.svg
        viewBox="0 0 1020 440"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        style={{ x: traceX, y: traceY }}
      >
        <defs>
          <pattern id="cf-grid" width="34" height="34" patternUnits="userSpaceOnUse">
            <path d="M34 0H0V34" fill="none" stroke="var(--color-trace)" strokeWidth="0.5" strokeOpacity="0.14" />
          </pattern>
        </defs>
        <rect width="1020" height="440" fill="url(#cf-grid)" opacity="0.6" />

        {TRACES.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="var(--color-trace)"
            strokeWidth="1.2"
            strokeOpacity="0.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {PADS.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill="none" stroke="var(--color-trace)" strokeWidth="1.2" strokeOpacity="0.4" />
            <circle cx={x} cy={y} r="1.6" fill="var(--color-trace)" fillOpacity="0.55" />
          </g>
        ))}

        {!reduce &&
          LIVE.map((d, i) => (
            <path
              key={`live-${i}`}
              d={d}
              fill="none"
              stroke="var(--color-signal)"
              strokeWidth="1.8"
              strokeLinecap="round"
              className="circuit-current"
              style={{ animationDelay: `${i * 1.6}s`, filter: "drop-shadow(0 0 4px var(--color-signal))" }}
            />
          ))}
      </motion.svg>
    </div>
  );
}

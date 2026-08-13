"use client";

import { motion } from "motion/react";

interface HaikeiWaveDividerProps {
  className?: string;
  flipVertical?: boolean;
}

export default function HaikeiWaveDivider({ className = "", flipVertical = false }: HaikeiWaveDividerProps) {
  return (
    <svg
      viewBox="0 0 1440 120"
      className={`w-full ${flipVertical ? "scale-y-[-1]" : ""} ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-signal)" stopOpacity="0.15" />
          <stop offset="50%" stopColor="var(--color-copper)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--color-signal)" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      <motion.path
        d="M0,40 Q360,20 720,40 T1440,40 L1440,120 L0,120 Z"
        fill="url(#waveGradient)"
        animate={{
          d: [
            "M0,40 Q360,20 720,40 T1440,40 L1440,120 L0,120 Z",
            "M0,50 Q360,30 720,50 T1440,50 L1440,120 L0,120 Z",
            "M0,40 Q360,20 720,40 T1440,40 L1440,120 L0,120 Z",
          ],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.path
        d="M0,60 Q360,40 720,60 T1440,60 L1440,120 L0,120 Z"
        fill="url(#waveGradient)"
        opacity="0.5"
        animate={{
          d: [
            "M0,60 Q360,40 720,60 T1440,60 L1440,120 L0,120 Z",
            "M0,70 Q360,50 720,70 T1440,70 L1440,120 L0,120 Z",
            "M0,60 Q360,40 720,60 T1440,60 L1440,120 L0,120 Z",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
    </svg>
  );
}

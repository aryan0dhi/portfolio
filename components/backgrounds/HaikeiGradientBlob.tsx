"use client";

import { motion } from "motion/react";

interface HaikeiGradientBlobProps {
  className?: string;
  delay?: number;
  color1?: string;
  color2?: string;
}

export default function HaikeiGradientBlob({
  className = "",
  delay = 0,
  color1 = "var(--color-signal)",
  color2 = "var(--color-copper)",
}: HaikeiGradientBlobProps) {
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      viewBox="0 0 200 200"
      className={`absolute h-96 w-96 opacity-15 blur-2xl dark:opacity-5 ${className}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={gradientId}>
          <stop offset="0%" stopColor={color1} stopOpacity="1" />
          <stop offset="100%" stopColor={color2} stopOpacity="0.3" />
        </radialGradient>
      </defs>

      <motion.path
        d="M100,20 Q150,40 160,100 Q150,160 100,180 Q50,160 40,100 Q50,40 100,20"
        fill={`url(#${gradientId})`}
        animate={{
          d: [
            "M100,20 Q150,40 160,100 Q150,160 100,180 Q50,160 40,100 Q50,40 100,20",
            "M100,10 Q160,30 170,110 Q160,170 100,190 Q40,170 30,110 Q40,30 100,10",
            "M100,20 Q150,40 160,100 Q150,160 100,180 Q50,160 40,100 Q50,40 100,20",
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
      />
    </svg>
  );
}

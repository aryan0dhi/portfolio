"use client";

import { motion } from "motion/react";

export default function HaikeiHeroBlob() {
  return (
    <svg
      viewBox="0 0 1000 1000"
      className="absolute -right-40 top-20 h-[800px] w-[800px] opacity-20 blur-3xl dark:opacity-10"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-signal)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--color-copper)" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      
      <motion.g
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.path
          d="M500,300 Q700,200 800,400 Q850,600 700,800 Q500,900 300,800 Q150,600 200,400 Q300,200 500,300"
          fill="url(#heroGradient)"
          animate={{
            d: [
              "M500,300 Q700,200 800,400 Q850,600 700,800 Q500,900 300,800 Q150,600 200,400 Q300,200 500,300",
              "M500,280 Q720,180 820,380 Q870,620 680,820 Q480,920 280,820 Q130,580 220,380 Q320,180 500,280",
              "M500,300 Q700,200 800,400 Q850,600 700,800 Q500,900 300,800 Q150,600 200,400 Q300,200 500,300",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.g>
    </svg>
  );
}

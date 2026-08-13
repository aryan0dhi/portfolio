type SectionFieldProps = {
  glow?: string;
  accent?: string;
  className?: string;
};

// A quiet, theme-aware circuit backdrop for content sections: a faint PCB grid,
// a couple of routed traces, and one soft drifting glow. Server-compatible
// (no hooks) so it can drop into server components. CSS handles the motion.
export default function SectionField({
  glow = "left-[72%] top-[-12%]",
  accent = "var(--color-signal)",
  className = "",
}: SectionFieldProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className={`absolute ${glow} h-[34rem] w-[34rem] rounded-full opacity-[0.10] blur-[100px] dark:opacity-[0.14]`}
        style={{
          background: `radial-gradient(circle, ${accent} 0%, transparent 62%)`,
          animation: "circuit-drift-a 22s ease-in-out infinite",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-trace) 0.5px, transparent 0.5px), linear-gradient(90deg, var(--color-trace) 0.5px, transparent 0.5px)",
          backgroundSize: "38px 38px",
        }}
      />

      <svg
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-40"
      >
        <g
          fill="none"
          stroke="var(--color-trace)"
          strokeWidth="1"
          strokeOpacity="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M-20 90 H180 Q196 90 196 106 V210 Q196 226 212 226 H360" />
          <path d="M1220 150 H1020 Q1004 150 1004 166 V300 Q1004 316 988 316 H860" />
          <path d="M-20 470 H120 Q136 470 136 454 V360 Q136 344 152 344 H320" />
        </g>
        <g fill="var(--color-trace)" fillOpacity="0.45">
          <circle cx="212" cy="226" r="2" />
          <circle cx="988" cy="316" r="2" />
          <circle cx="152" cy="344" r="2" />
        </g>
      </svg>
    </div>
  );
}

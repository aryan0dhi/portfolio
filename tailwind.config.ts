import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Global brand
        paper: "var(--color-paper)",
        paperdeep: "var(--color-paperdeep)",
        ink: "var(--color-ink)",
        inksoft: "var(--color-inksoft)",
        muted: "var(--color-muted)",
        signal: "var(--color-signal)",
        trace: "var(--color-trace)",
        schematic: "var(--color-schematic)",
        copper: "var(--color-copper)",
        // Garmin — cockpit dark
        cockpit: "#0b0e12",
        cockpitpanel: "#12171d",
        avionics: "#4a9fe0",
        // Vaila — warm editorial
        vailacream: "#F1ECE3",
        vailaterra: "#a8663f",
        vailachar: "#37342f",
        // Data Mine — sage
        sage: "#EDF0E7",
        sagedeep: "#3B6D11",
        sageink: "#2f3a25",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;

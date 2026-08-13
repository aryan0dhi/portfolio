import type { Project } from "./data";

export type ThemeTokens = {
  section: string;
  page: string;
  eyebrow: string;
  name: string;
  meta: string;
  body: string;
  chip: string;
  accent: string;
  dot: string;
  divider: string;
  primaryBtn: string;
  ghostBtn: string;
  panel: string;
};

export const themes: Record<Project["theme"], ThemeTokens> = {
  garmin: {
    section: "bg-cockpit text-[#c3ccd6]",
    page: "bg-cockpit",
    eyebrow: "text-[#5a6672]",
    name: "text-[#f2ede3]",
    meta: "text-[#9aa4b0]",
    body: "text-[#b6bfc9]",
    chip: "bg-[#12171d] text-[#9aa4b0] border border-[#232a31]",
    accent: "text-avionics",
    dot: "bg-avionics",
    divider: "border-[#232a31]",
    primaryBtn: "bg-avionics text-cockpit hover:-translate-y-0.5",
    ghostBtn: "border border-[#2a3138] text-avionics hover:bg-[#12171d]",
    panel: "bg-[#12171d] border border-[#232a31]",
  },
  vaila: {
    section: "bg-vailacream text-[#6b6357]",
    page: "bg-vailacream",
    eyebrow: "text-[#a89e8f]",
    name: "text-vailachar",
    meta: "text-[#8a8072]",
    body: "text-[#6b6357]",
    chip: "bg-[#e5ddce] text-[#5f5748]",
    accent: "text-vailaterra",
    dot: "bg-vailaterra",
    divider: "border-[#e0d7c8]",
    primaryBtn: "bg-vailachar text-vailacream hover:-translate-y-0.5",
    ghostBtn: "border border-[#d8c9b8] text-vailaterra hover:bg-[#f7f3ec]",
    panel: "bg-[#f7f3ec] border border-[#e0d7c8]",
  },
  datamine: {
    section: "bg-sage text-[#4a5340]",
    page: "bg-sage",
    eyebrow: "text-[#8a9578]",
    name: "text-sageink",
    meta: "text-[#6f7a60]",
    body: "text-[#4a5340]",
    chip: "bg-[#dfe6d2] text-[#3d4a2c]",
    accent: "text-sagedeep",
    dot: "bg-sagedeep",
    divider: "border-[#d2dbc2]",
    primaryBtn: "bg-sagedeep text-white hover:-translate-y-0.5",
    ghostBtn: "border border-[#c6d1b3] text-sagedeep hover:bg-[#f4f6ee]",
    panel: "bg-[#f4f6ee] border border-[#d7dfc7]",
  },
  invest: {
    section: "bg-[#101418] text-[#aeb6c0]",
    page: "bg-[#101418]",
    eyebrow: "text-[#5f6875]",
    name: "text-[#eef1f5]",
    meta: "text-[#8b95a1]",
    body: "text-[#aeb6c0]",
    chip: "bg-[#1a2028] text-[#9aa4b0] border border-[#262e38]",
    accent: "text-[#4ac0a0]",
    dot: "bg-[#4ac0a0]",
    divider: "border-[#262e38]",
    primaryBtn: "bg-[#4ac0a0] text-[#101418] hover:-translate-y-0.5",
    ghostBtn: "border border-[#2a333d] text-[#4ac0a0] hover:bg-[#161c23]",
    panel: "bg-[#161c23] border border-[#262e38]",
  },
  beamrail: {
    section: "bg-[#0c1016] text-[#aab1bd]",
    page: "bg-[#0c1016]",
    eyebrow: "text-[#5c6675]",
    name: "text-[#f2f4f7]",
    meta: "text-[#8892a0]",
    body: "text-[#aab1bd]",
    chip: "bg-[#161b23] text-[#9aa4b2] border border-[#232a35]",
    accent: "text-[#93a6c4]",
    dot: "bg-[#93a6c4]",
    divider: "border-[#232a35]",
    primaryBtn: "bg-[#f2f4f7] text-[#0c1016] hover:-translate-y-0.5",
    ghostBtn: "border border-[#2a323d] text-[#f2f4f7] hover:bg-[#161b23]",
    panel: "bg-[#12171f] border border-[#232a35]",
  },
};

import type { ComponentType, CSSProperties } from "react";
import {
  Bug,
  Boxes,
  Database,
  GitBranch,
  LockKeyhole,
  Network,
  Route,
  ServerCog,
  ShieldCheck,
} from "lucide-react";
import {
  SiC,
  SiCplusplus,
  SiFastapi,
  SiGit,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiScikitlearn,
  SiSwift,
  SiTensorflow,
} from "react-icons/si";
import Reveal from "./Reveal";
import SectionField from "./backgrounds/SectionField";
import { Badge } from "./ui/Badge";

type SkillIcon = ComponentType<{ className?: string; style?: CSSProperties }>;

type SkillItem = {
  name: string;
  subtitle?: string;
  icon: SkillIcon;
  color: string;
  brand?: boolean;
};

type SkillGroup = {
  title: string;
  eyebrow: string;
  summary: string;
  items: SkillItem[];
};

const skillGroups: SkillGroup[] = [
  {
    title: "EMBEDDED / SYSTEMS",
    eyebrow: "Low-level signal path",
    summary: "Safety-minded C/C++ work, verification habits, and test discipline for real systems.",
    items: [
      { name: "C", subtitle: "systems", icon: SiC, color: "#A8B9CC", brand: true },
      { name: "C++", subtitle: "systems", icon: SiCplusplus, color: "#5B8CCB", brand: true },
      { name: "Debugging", subtitle: "trace faults", icon: Bug, color: "#7f9cff" },
      { name: "Verification", subtitle: "prove behavior", icon: ShieldCheck, color: "#84cc9f" },
      { name: "Module testing", subtitle: "unit scope", icon: Boxes, color: "#aab4c0" },
      { name: "System testing", subtitle: "integration", icon: Network, color: "#d08a5d" },
    ],
  },
  {
    title: "FULL-STACK",
    eyebrow: "Product interfaces",
    summary: "React, mobile UI, APIs, auth, and backend data paths that turn ideas into usable tools.",
    items: [
      { name: "React", subtitle: "ui", icon: SiReact, color: "#61DAFB", brand: true },
      { name: "SwiftUI", subtitle: "mobile", icon: SiSwift, color: "#F05138", brand: true },
      { name: "FastAPI", subtitle: "backend", icon: SiFastapi, color: "#009688", brand: true },
      { name: "PostgreSQL", subtitle: "relational", icon: SiPostgresql, color: "#6FA8DC", brand: true },
      { name: "Redis", subtitle: "cache", icon: SiRedis, color: "#DC382D", brand: true },
      { name: "OAuth", subtitle: "auth", icon: LockKeyhole, color: "#b7a4ff" },
      { name: "REST APIs", subtitle: "interfaces", icon: GitBranch, color: "#b7c56b" },
    ],
  },
  {
    title: "DATA / ML",
    eyebrow: "Modeling layer",
    summary: "Analysis and forecasting workflows from arrays and dataframes to evaluated ML models.",
    items: [
      { name: "Python", subtitle: "automation", icon: SiPython, color: "#3776AB", brand: true },
      { name: "Pandas", subtitle: "analysis", icon: SiPandas, color: "#9aa0ff", brand: true },
      { name: "NumPy", subtitle: "arrays", icon: SiNumpy, color: "#4DABCF", brand: true },
      { name: "scikit-learn", subtitle: "models", icon: SiScikitlearn, color: "#F7931E", brand: true },
      { name: "TensorFlow / Keras", subtitle: "deep learning", icon: SiTensorflow, color: "#FF6F00", brand: true },
    ],
  },
  {
    title: "TOOLS / INFRA",
    eyebrow: "Build discipline",
    summary: "Version control, data modeling, API boundaries, and backend architecture for maintainable systems.",
    items: [
      { name: "Git", subtitle: "versioning", icon: SiGit, color: "#F05032", brand: true },
      { name: "SQL", subtitle: "queries", icon: Database, color: "#9fb0c1" },
      { name: "API design", subtitle: "contracts", icon: Route, color: "#7ed7bb" },
      { name: "Backend architecture", subtitle: "systems", icon: ServerCog, color: "#c9b7ff" },
    ],
  },
];

function ToolItem({ item }: { item: SkillItem }) {
  const Icon = item.icon;

  return (
    <li className="group flex min-w-0 items-center gap-3 text-inksoft transition duration-200 hover:-translate-y-0.5 hover:text-ink">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center">
        <Icon
          className={`${item.brand ? "h-7 w-7" : "h-6 w-6"} transition-transform duration-200 group-hover:scale-105`}
          style={{ color: item.color }}
        />
      </span>
      <span className="min-w-0">
        <span className="block text-[15px] font-medium leading-snug text-ink md:text-base">
          {item.name}
        </span>
        {item.subtitle && (
          <Badge variant="subtle" className="mt-0.5 text-[9px]">
            {item.subtitle}
          </Badge>
        )}
      </span>
    </li>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 scroll-mt-28 bg-paperdeep">
      <span
        id="sig-bus"
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-12 h-px w-px -translate-x-1/2"
      />
      <SectionField glow="left-[8%] top-[-14%]" />
      <div className="relative z-10 mx-auto max-w-content px-6 py-12 md:px-10 md:py-14">
        <Reveal>
          <p className="eyebrow mb-3 text-signal">Skills</p>
          <h2 className="section-heading max-w-2xl">
            The toolkit behind the signal
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-inksoft">
            A curated wall of real tools I use across embedded systems, full-stack products, data, and infrastructure.
          </p>
        </Reveal>

        <div className="mt-12 space-y-12 md:space-y-14">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.06}>
              <section className="relative grid gap-6 border-t site-divider pt-6 lg:grid-cols-[minmax(200px,0.32fr)_1fr] lg:gap-10">
                <span
                  id={`sig-tap-${i}`}
                  className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full border border-signal bg-paperdeep"
                />

                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal">
                    {group.eyebrow}
                  </p>
                  <h3 className="mt-3 font-mono text-2xl font-bold uppercase leading-tight tracking-[0.01em] text-ink/80 md:text-3xl lg:text-[1.75rem]">
                    {group.title}
                  </h3>
                  <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted">
                    {group.summary}
                  </p>
                </div>

                <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item) => (
                    <ToolItem key={item.name} item={item} />
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

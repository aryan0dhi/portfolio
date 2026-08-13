"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Hero from "./Hero";
import Reveal from "./Reveal";
import { projects, type Project } from "@/lib/data";

// Featured projects shown in the timeline
// Skip Vaila (index 1) since it has its own dedicated section
const featuredProjects = [projects[0], projects[2], projects[3]]; // Garmin, Data Mine, Invest

const accentHex: Record<Project["theme"], string> = {
  garmin: "#4a9fe0",
  vaila: "#a8663f",
  datamine: "#3B6D11",
  invest: "#4ac0a0",
  beamrail: "#5b76a3",
};

const SIGNAL = "var(--hero-signal)";
const TRACE = "var(--hero-trace)";
const LABEL = "var(--hero-label)";
const CHIP_LABEL = "var(--hero-chip-label)";
const PAPER = "var(--color-paper)";
const PAPERDEEP = "var(--color-paperdeep)";
const COPPER = "var(--color-copper)";
const CORRIDOR = 128;
const ACTIVE_STROKE = 2.12;

type NodePt = { x: number; y: number; side: "left" | "right"; color: string };

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

export default function SignalJourney({ children }: { children?: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const nodeRefs = useRef<(HTMLLIElement | null)[]>([]);
  const trackRef = useRef<SVGPathElement>(null);
  const pulseFrame = useRef<number | null>(null);
  const introStarted = useRef(false);

  const [dims, setDims] = useState({ w: 0, h: 0, heroH: 0 });
  const [pathD, setPathD] = useState("");
  const [heroExit, setHeroExit] = useState({ x: 0, y: 0 });
  const [nodes, setNodes] = useState<NodePt[]>([]);
  const [nodeProgresses, setNodeProgresses] = useState<number[]>([]);
  const [samples, setSamples] = useState<{ y: number; frac: number }[]>([]);
  const [band, setBand] = useState<{ y: number; h: number } | null>(null);
  const [busPt, setBusPt] = useState<{ x: number; y: number } | null>(null);
  const [taps, setTaps] = useState<{ x: number; y: number }[]>([]);
  const [busProgress, setBusProgress] = useState(1);
  const [outPt, setOutPt] = useState<{ x: number; y: number } | null>(null);
  const [scrollValue, setScrollValue] = useState(0);
  const [spotlightIndex, setSpotlightIndex] = useState<number | null>(null);
  const [introComplete, setIntroComplete] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  // Progress of the user's scroll through the whole journey (0 → 1).
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // Map scroll → the path point that currently sits ~62% down the viewport,
  // and return that point's arc-length fraction. This makes the signal front
  // track the viewport 1:1 rather than by the path's uneven arc length.
  const fillTarget = useTransform(scrollYProgress, (v) => {
    if (samples.length === 0) return 0;
    const vh = typeof window === "undefined" ? 800 : window.innerHeight;
    const targetY = v * Math.max(1, dims.h - vh) + vh * 0.62;
    if (targetY <= samples[0].y) return 0;
    if (targetY >= samples[samples.length - 1].y) return 1;
    for (let i = 1; i < samples.length; i += 1) {
      if (samples[i].y >= targetY) {
        const a = samples[i - 1];
        const b = samples[i];
        return a.frac + (b.frac - a.frac) * ((targetY - a.y) / (b.y - a.y || 1));
      }
    }
    return 1;
  });

  // Smooth the front. Because fillFrac starts at 0 and springs to the entry
  // point on load, the signal draws itself in cleanly instead of snapping.
  const fillFrac = useSpring(fillTarget, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.0004,
  });

  // The bus taps fill only once the scrolling signal front reaches the bus,
  // so the fan-out reads as one clean continuation of the same signal.
  const branchFill = useTransform(
    fillFrac,
    [Math.max(0, busProgress - 0.004), Math.min(1, busProgress + 0.05)],
    [0, 1],
    { clamp: true },
  );

  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const actionCx = useMotionValue(0);
  const actionCy = useMotionValue(0);
  const actionOpacity = useMotionValue(0);
  const introProgress = useMotionValue(0);
  const activeFill = useTransform([fillFrac, introProgress], ([fill, intro]) => {
    return Number(fill) * Number(intro);
  });

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const compute = () => {
      const wrect = wrap.getBoundingClientRect();
      const W = wrap.clientWidth;
      const H = wrap.clientHeight;
      const heroH = heroRef.current?.offsetHeight ?? H * 0.4;
      const isMobile = W < 1024;
      const timelineStart = heroH * (isMobile ? 0.88 : 0.9);
      const corridorCenter = isMobile ? 34 : W * 0.5;
      const corridorHalf = isMobile ? 0 : Math.min(CORRIDOR / 2, W * 0.055);

      const xForSide = (side: "left" | "right") => {
        if (isMobile) return 34;
        return corridorCenter + (side === "left" ? -corridorHalf : corridorHalf);
      };

      const startX = isMobile ? 34 : W * 0.39;
      const startY = isMobile ? heroH * 0.38 : heroH * 0.48;
      const mcuX = isMobile ? 34 : W * 0.68;
      const mcuY = isMobile ? heroH * 0.58 : heroH * 0.4;
      const exitX = isMobile ? 34 : corridorCenter;
      const exitY = timelineStart;

      const pts: NodePt[] = nodeRefs.current
        .map((el, i) => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          const y = r.top - wrect.top + (isMobile ? 88 : 72);
          const side = isMobile ? "right" : i % 2 === 0 ? "left" : "right";
          return {
            x: xForSide(side),
            y,
            side,
            color: accentHex[featuredProjects[i].theme],
          };
        })
        .filter(Boolean) as NodePt[];

      const fmt = (n: number) => n.toFixed(1);
      let d = isMobile
        ? `M ${fmt(startX)} ${fmt(startY)} C ${fmt(startX)} ${fmt(startY + 96)}, ${fmt(exitX)} ${fmt(exitY - 92)}, ${fmt(exitX)} ${fmt(exitY)}`
        : [
            `M ${fmt(startX)} ${fmt(startY)}`,
            `C ${fmt(W * 0.45)} ${fmt(startY - 24)}, ${fmt(W * 0.49)} ${fmt(startY + 24)}, ${fmt(W * 0.54)} ${fmt(startY)}`,
            `C ${fmt(W * 0.57)} ${fmt(startY - 54)}, ${fmt(W * 0.6)} ${fmt(startY + 56)}, ${fmt(W * 0.63)} ${fmt(startY - 4)}`,
            `C ${fmt(mcuX - 132)} ${fmt(mcuY - 10)}, ${fmt(mcuX - 104)} ${fmt(mcuY - 12)}, ${fmt(mcuX - 84)} ${fmt(mcuY - 12)}`,
            `H ${fmt(mcuX - 76)} V ${fmt(mcuY - 8)} H ${fmt(mcuX - 68)} V ${fmt(mcuY - 4)} H ${fmt(mcuX - 60)} V ${fmt(mcuY)} H ${fmt(mcuX - 50)}`,
            `H ${fmt(mcuX + 56)}`,
            `H ${fmt(mcuX + 82)} V ${fmt(heroH * 0.5)} H ${fmt(W * 0.64)}`,
            `C ${fmt(W * 0.61)} ${fmt(heroH * 0.61)}, ${fmt(W * 0.54)} ${fmt(heroH * 0.74)}, ${fmt(exitX)} ${fmt(exitY)}`,
          ].join(" ");

      if (pts.length > 0) {
        const first = pts[0];
        d += ` C ${fmt(first.x)} ${fmt(exitY + 110)}, ${fmt(first.x)} ${fmt(first.y - 140)}, ${fmt(first.x)} ${fmt(first.y)}`;
        for (let i = 1; i < pts.length; i += 1) {
          const prev = pts[i - 1];
          const next = pts[i];
          const dy = Math.max(100, (next.y - prev.y) * 0.46);
          d += ` C ${fmt(prev.x)} ${fmt(prev.y + dy)}, ${fmt(next.x)} ${fmt(next.y - dy)}, ${fmt(next.x)} ${fmt(next.y)}`;
        }
        // Continue the one signal down to the BUS (skills) and OUTPUT (contact)
        const yOf = (el: Element | null) => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return r.top - wrect.top + r.height / 2;
        };
        const busEl = document.getElementById("sig-bus");
        const outEl = document.getElementById("sig-output");
        const last = pts[pts.length - 1];

        if (isMobile) {
          const outY = yOf(outEl) ?? H - 120;
          d += ` C ${fmt(last.x)} ${fmt(last.y + 120)}, ${fmt(34)} ${fmt(outY - 150)}, ${fmt(34)} ${fmt(outY)}`;
          setBusPt(null);
          setOutPt({ x: 34, y: outY });
        } else {
          const busX = corridorCenter;
          const busY = yOf(busEl) ?? last.y + 260;
          const rightLane = W * 0.61;
          const outX = W * 0.58;
          const outY = yOf(outEl) ?? H - 160;
          const midY = (busY + outY) / 2;
          d += ` C ${fmt(last.x)} ${fmt(last.y + 120)}, ${fmt(busX)} ${fmt(busY - 150)}, ${fmt(busX)} ${fmt(busY)}`;
          d += ` C ${fmt(busX)} ${fmt(busY + 150)}, ${fmt(rightLane)} ${fmt(midY - 150)}, ${fmt(rightLane)} ${fmt(midY)}`;
          d += ` C ${fmt(rightLane)} ${fmt(midY + 150)}, ${fmt(outX)} ${fmt(outY - 160)}, ${fmt(outX)} ${fmt(outY)}`;
          setBusPt({ x: busX, y: busY });
          setOutPt({ x: outX, y: outY });
        }
      }

      const skillsEl = document.getElementById("skills");
      if (skillsEl) {
        const r = skillsEl.getBoundingClientRect();
        setBand({ y: r.top - wrect.top, h: r.height });
      } else {
        setBand(null);
      }

      const tapPts = [0, 1, 2, 3]
        .map((i) => {
          const el = document.getElementById(`sig-tap-${i}`);
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return {
            x: r.left - wrect.left + r.width / 2,
            y: r.top - wrect.top + r.height / 2,
          };
        })
        .filter(Boolean) as { x: number; y: number }[];
      setTaps(isMobile ? [] : tapPts);

      setDims({ w: W, h: H, heroH });
      setHeroExit({ x: mcuX, y: mcuY });
      setPathD(d);
      setNodes(pts);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(wrap);
    window.addEventListener("resize", compute);
    const fonts = (document as unknown as { fonts?: { ready: Promise<unknown> } }).fonts;
    fonts?.ready.then(compute);
    const t = setTimeout(compute, 400);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
      clearTimeout(t);
    };
  }, []);

  // Move the pulse + node-reached state to follow the smoothed fill fraction.
  useEffect(() => {
    const path = trackRef.current;
    if (!path || !pathD) return;
    const L = path.getTotalLength();
    const update = (v: number) => {
      const p = path.getPointAtLength(clamp(v, 0, 1) * L);
      cx.set(p.x);
      cy.set(p.y);
      setScrollValue(v);
    };
    update(fillFrac.get());
    const unsub = fillFrac.on("change", update);
    return () => unsub();
  }, [fillFrac, pathD, cx, cy]);

  // Sample the path: a Y → arc-length-fraction lookup, plus node/bus fractions.
  useEffect(() => {
    const path = trackRef.current;
    if (!path || !pathD) return;
    const L = path.getTotalLength();

    const built: { y: number; frac: number }[] = [];
    for (let l = 0; l <= L; l += 12) {
      const p = path.getPointAtLength(l);
      built.push({ y: p.y, frac: l / L });
    }
    setSamples(built);

    const progressOf = (pt: { x: number; y: number }) => {
      let bestLength = 0;
      let bestDistance = Number.POSITIVE_INFINITY;
      for (let l = 0; l <= L; l += 10) {
        const p = path.getPointAtLength(l);
        const distance = Math.hypot(p.x - pt.x, p.y - pt.y);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestLength = l;
        }
      }
      return bestLength / L;
    };
    if (nodes.length > 0) setNodeProgresses(nodes.map(progressOf));
    if (busPt) setBusProgress(progressOf(busPt));
  }, [pathD, nodes, busPt, dims]);

  const handleFollowSignal = useCallback(() => {
    const firstNode = nodeRefs.current[0];
    const path = trackRef.current;

    if (shouldReduceMotion || !path || !nodeProgresses[0]) {
      firstNode?.scrollIntoView({ block: "center" });
      setSpotlightIndex(0);
      window.setTimeout(() => setSpotlightIndex(null), 900);
      return;
    }

    if (pulseFrame.current) cancelAnimationFrame(pulseFrame.current);
    const L = path.getTotalLength();
    const end = nodeProgresses[0] * L;
    const duration = 720;
    const start = performance.now();
    actionOpacity.set(1);

    const tick = (now: number) => {
      const t = clamp((now - start) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const p = path.getPointAtLength(eased * end);
      actionCx.set(p.x);
      actionCy.set(p.y);
      if (t < 1) {
        pulseFrame.current = requestAnimationFrame(tick);
      } else {
        actionOpacity.set(0);
        setSpotlightIndex(0);
        window.setTimeout(() => setSpotlightIndex(null), 900);
      }
    };

    pulseFrame.current = requestAnimationFrame(tick);
    window.setTimeout(() => {
      firstNode?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
  }, [actionCx, actionCy, actionOpacity, nodeProgresses, shouldReduceMotion]);

  useEffect(() => {
    return () => {
      if (pulseFrame.current) cancelAnimationFrame(pulseFrame.current);
    };
  }, []);

  useEffect(() => {
    if (!pathD) return;
    if (shouldReduceMotion) {
      introProgress.set(1);
      setIntroComplete(true);
      return;
    }
    if (introStarted.current) return;
    introStarted.current = true;
    setIntroComplete(false);
    introProgress.set(0);
    const controls = animate(introProgress, 1, {
      duration: 0.95,
      ease: [0.22, 1, 0.36, 1],
    });
    const t = window.setTimeout(() => setIntroComplete(true), 980);
    return () => {
      controls.stop();
      window.clearTimeout(t);
    };
  }, [introProgress, pathD, shouldReduceMotion]);

  return (
    <div ref={wrapRef} className="relative">
      {dims.w > 0 && (
        <svg
          className="pointer-events-none absolute inset-0 z-0"
          width={dims.w}
          height={dims.h}
          viewBox={`0 0 ${dims.w} ${dims.h}`}
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <filter id="signal-soft-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="0 0 0 0 0.16 0 0 0 0 0.31 0 0 0 0 0.88 0 0 0 0.22 0"
              />
              <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {band && (
            <rect x="0" y={band.y} width={dims.w} height={band.h} fill={PAPERDEEP} />
          )}

          <HeroScaffold
            w={dims.w}
            heroH={dims.heroH}
            mcu={heroExit}
            signalProgress={scrollValue}
            reduceMotion={shouldReduceMotion}
          />

          <path
            ref={trackRef}
            d={pathD}
            stroke={TRACE}
            strokeOpacity="0.54"
            strokeWidth="2.05"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            d={pathD}
            stroke={SIGNAL}
            strokeOpacity="0.9"
            strokeWidth={ACTIVE_STROKE}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#signal-soft-glow)"
            style={{ pathLength: shouldReduceMotion ? 1 : introComplete ? fillFrac : activeFill }}
          />

          {nodes.map((n, i) => {
            const nodeProgress = nodeProgresses[i] ?? 1;
            const reached = scrollValue >= nodeProgress - 0.025 || spotlightIndex === i;
            const completed = scrollValue > nodeProgress + 0.08;
            const tx = n.side === "left" ? n.x - 48 : n.x + 48;
            const labelX = n.side === "left" ? n.x + 16 : n.x - 56;
            const labelY = n.y - 18;
            return (
              <g key={i}>
                <line
                  x1={n.x}
                  y1={n.y}
                  x2={tx}
                  y2={n.y}
                  stroke={n.color}
                  strokeOpacity={reached ? 0.46 : 0.24}
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
                <ProjectNode
                  node={n}
                  reached={reached}
                  completed={completed}
                  reduceMotion={shouldReduceMotion}
                />
                {dims.w >= 1024 && (
                  <text
                    x={labelX}
                    y={labelY}
                    fill={reached ? SIGNAL : LABEL}
                    fontFamily="var(--font-mono)"
                    fontSize="10"
                    letterSpacing="0.8"
                  >
                    TP{i + 1}
                  </text>
                )}
              </g>
            );
          })}

          {busPt &&
            taps.length >= 3 &&
            (() => {
              const barY = Math.min(...taps.map((t) => t.y)) - 24;
              const xs = taps.map((t) => t.x);
              const segs = [
                `M${busPt.x} ${busPt.y} V ${barY}`,
                `M${Math.min(...xs)} ${barY} H ${Math.max(...xs)}`,
                ...taps.map((t) => `M${t.x} ${barY} V ${t.y}`),
              ];
              return (
                <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                  {/* passive wiring, always visible ahead of the signal */}
                  {segs.map((d, i) => (
                    <path
                      key={`track-${i}`}
                      d={d}
                      stroke={TRACE}
                      strokeOpacity="0.5"
                      strokeWidth="1.4"
                    />
                  ))}
                  {/* energized fill — advances only as the scrolling signal reaches the bus */}
                  {segs.map((d, i) => (
                    <motion.path
                      key={`live-${i}`}
                      d={d}
                      stroke={SIGNAL}
                      strokeOpacity="0.9"
                      strokeWidth="1.8"
                      style={{ pathLength: shouldReduceMotion ? 1 : branchFill }}
                    />
                  ))}
                </g>
              );
            })()}

          {busPt && (
            <g>
              <circle cx={busPt.x} cy={busPt.y} r="9" fill={SIGNAL} fillOpacity="0.12" />
              <circle cx={busPt.x} cy={busPt.y} r="6" fill={PAPERDEEP} stroke={SIGNAL} strokeWidth="1.8" />
              <circle cx={busPt.x} cy={busPt.y} r="2.2" fill={SIGNAL} />
              <text
                x={busPt.x + 14}
                y={busPt.y + 4}
                fill={LABEL}
                fontFamily="var(--font-mono)"
                fontSize="10"
                letterSpacing="0.8"
              >
                BUS
              </text>
            </g>
          )}

          {outPt && (
            <g>
              <circle cx={outPt.x} cy={outPt.y} r="12" fill={SIGNAL} fillOpacity="0.14" />
              <circle cx={outPt.x} cy={outPt.y} r="8" fill={PAPER} stroke={SIGNAL} strokeWidth="2" />
              <circle cx={outPt.x} cy={outPt.y} r="3" fill={SIGNAL} />
              <text
                x={outPt.x + 16}
                y={outPt.y + 4}
                fill={SIGNAL}
                fontFamily="var(--font-mono)"
                fontSize="10"
                letterSpacing="0.8"
              >
                OUTPUT
              </text>
            </g>
          )}

          {!shouldReduceMotion && (
            <>
              <motion.circle cx={cx} cy={cy} r="9" fill={SIGNAL} fillOpacity="0.12" />
              <motion.circle cx={cx} cy={cy} r="4" fill={SIGNAL} fillOpacity="0.92" />
              <motion.circle cx={actionCx} cy={actionCy} r="15" fill={SIGNAL} fillOpacity="0.13" style={{ opacity: actionOpacity }} />
              <motion.circle cx={actionCx} cy={actionCy} r="5" fill={SIGNAL} style={{ opacity: actionOpacity }} />
            </>
          )}
        </svg>
      )}

      <div ref={heroRef} className="relative z-10">
        <Hero onFollowSignal={handleFollowSignal} />
      </div>

      <section ref={workRef} id="work" className="relative z-10 scroll-mt-20">
        <div className="mx-auto max-w-content px-6 md:px-10">
          <Reveal>
            <p className="eyebrow mb-3 text-signal">∿ Selected engineering work</p>
            <h2 className="section-heading max-w-md">
              The signal continues.
            </h2>
          </Reveal>

          <ol className="mt-4">
            {featuredProjects.map((p, i) => {
              const side = i % 2 === 0 ? "left" : "right";
              const nodeProgress = nodeProgresses[i] ?? 1;
              const active = scrollValue >= nodeProgress - 0.025 || spotlightIndex === i;
              return (
                <li
                  key={p.id}
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  className="grid min-h-[240px] grid-cols-[56px_minmax(0,1fr)] items-start py-8 lg:min-h-[260px] lg:grid-cols-[minmax(0,1fr)_128px_minmax(0,1fr)]"
                >
                  <div
                    className={
                      side === "left"
                        ? "col-start-2 lg:col-start-1 lg:pr-10 lg:text-right"
                        : "col-start-2 lg:col-start-3 lg:pl-10 lg:text-left"
                    }
                  >
                    <TimelineCard project={p} align={side} active={active} />
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-8 flex justify-center">
            <Link
              href="#all-work"
              className="text-sm text-signal hover:text-ink transition-colors border-b border-signal/50 hover:border-ink pb-0.5"
            >
              View all projects <span className="arrow-glyph" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

function HeroScaffold({
  w,
  heroH,
  mcu,
  signalProgress,
  reduceMotion,
}: {
  w: number;
  heroH: number;
  mcu: { x: number; y: number };
  signalProgress: number;
  reduceMotion: boolean | null;
}) {
  if (w < 1024) {
    return (
      <g>
        <g stroke={TRACE} strokeOpacity="0.18" strokeWidth="1">
          <path d={`M34 ${heroH * 0.24}v${heroH * 0.42}`} />
          <path d={`M34 ${heroH * 0.48}h-14v26`} />
        </g>
        <circle cx="34" cy={heroH * 0.38} r="4" fill={PAPER} stroke={COPPER} />
        <rect x="9" y={heroH * 0.48 + 22} width="26" height="20" rx="3" fill="none" stroke={TRACE} strokeOpacity="0.22" />
      </g>
    );
  }

  const chip = { x: mcu.x - 50, y: mcu.y - 50, s: 100 };
  const grid = {
    x: w * 0.52,
    y: heroH * 0.13,
    width: Math.min(400, w * 0.29),
    height: heroH * 0.56,
  };
  const readout = {
    x: Math.min(w - 360, chip.x + chip.s + 44),
    y: chip.y + chip.s + 6,
  };
  const adcPin = { x: chip.x, y: mcu.y };
  const entering = signalProgress > 0.015;
  const exiting = signalProgress > 0.04;
  const glowOpacity = reduceMotion ? 0.32 : entering ? 0.56 : 0.24;

  return (
    <g opacity="0.58">
      <defs>
        <pattern id="hero-grid-minor" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" stroke={TRACE} strokeOpacity="0.045" strokeWidth="0.8" />
        </pattern>
        <pattern id="hero-grid-major" width="96" height="96" patternUnits="userSpaceOnUse">
          <rect width="96" height="96" fill="url(#hero-grid-minor)" />
          <path d="M96 0H0V96" stroke={TRACE} strokeOpacity="0.09" strokeWidth="1" />
        </pattern>
        <radialGradient id="hero-grid-fade" cx="58%" cy="47%" r="62%">
          <stop offset="0" stopColor="white" stopOpacity="0.72" />
          <stop offset="0.56" stopColor="white" stopOpacity="0.32" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hero-output-fade" x1={chip.x + chip.s} x2={w * 0.64} y1={mcu.y} y2={heroH * 0.5} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={SIGNAL} stopOpacity="0.56" />
          <stop offset="0.34" stopColor={SIGNAL} stopOpacity="0.44" />
          <stop offset="1" stopColor={TRACE} stopOpacity="0.34" />
        </linearGradient>
        <linearGradient id="adc-step-fade" x1={mcu.x - 92} x2={chip.x} y1={mcu.y - 12} y2={mcu.y} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={TRACE} stopOpacity="0.46" />
          <stop offset="1" stopColor={SIGNAL} stopOpacity="0.52" />
        </linearGradient>
        <mask id="hero-grid-mask">
          <rect x={grid.x} y={grid.y} width={grid.width} height={grid.height} fill="url(#hero-grid-fade)" />
        </mask>
      </defs>

      <rect
        x={grid.x}
        y={grid.y}
        width={grid.width}
        height={grid.height}
        fill="url(#hero-grid-major)"
        mask="url(#hero-grid-mask)"
        opacity="0.42"
      />

      <g stroke={TRACE} strokeOpacity="0.18" strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round">
        <path d={`M${chip.x + chip.s * 0.5} ${chip.y - 18}v-34h${w * 0.1}v-28`} />
        <path d={`M${chip.x + chip.s + 12} ${chip.y + 28}h48v34h36`} />
        <path d={`M${chip.x + chip.s + 12} ${chip.y + 62}h30v-26h56`} />
        <path d={`M${chip.x - 44} ${mcu.y - 12}h26v12`} />
      </g>

      <path
        d={`M${chip.x + chip.s + 18} ${chip.y + chip.s * 0.68}h20v${readout.y - (chip.y + chip.s * 0.68) + 38}h${readout.x - (chip.x + chip.s + 38)}`}
        stroke={TRACE}
        strokeOpacity="0.22"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g stroke={TRACE} strokeOpacity="0.32" strokeWidth="1.1" fill="none">
        {[
          [chip.x + chip.s * 0.5, chip.y - 52, COPPER],
          [chip.x + chip.s + 76, chip.y + 28, COPPER],
          [chip.x + chip.s + 68, chip.y + 70, TRACE],
        ].map(([x, y], i) => (
          <circle key={`via-${i}`} cx={x as number} cy={y as number} r={i === 2 ? 2.6 : 3} stroke={i < 2 ? COPPER : TRACE} />
        ))}
      </g>

      <g stroke={TRACE} strokeOpacity="0.34" strokeWidth="0.9">
        <path d={`M${w * 0.435} ${startYFor(heroH)}h30`} />
        <path d={`M${w * 0.47} ${startYFor(heroH)}h96`} />
        {Array.from({ length: 7 }).map((_, i) => {
          const x = w * 0.47 + i * 16;
          return <path key={`tick-${i}`} d={`M${x} ${startYFor(heroH) - 4}v8`} />;
        })}
        <path d={`M${w * 0.468} ${startYFor(heroH) - 32}v64`} />
      </g>

      <circle cx={w * 0.452} cy={startYFor(heroH)} r="3" fill="none" stroke={COPPER} strokeOpacity="0.58" strokeWidth="1.1" />
      <circle cx={w * 0.452} cy={startYFor(heroH)} r="1.4" fill={COPPER} fillOpacity="0.62" />

      <g fill={TRACE} fillOpacity="0.52">
        {Array.from({ length: 5 }).map((_, i) => (
          <circle
            key={`sample-${i}`}
            cx={w * 0.55 + i * 16}
            cy={startYFor(heroH) + (i % 2 === 0 ? -4 : 4)}
            r="1.8"
          />
        ))}
      </g>

      <path
        d={`M${mcu.x - 84} ${mcu.y - 12}h8v4h8v4h8v4h10`}
        stroke="url(#adc-step-fade)"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g stroke={TRACE} strokeWidth="1.25" strokeLinecap="round">
        {Array.from({ length: 9 }).map((_, i) => (
          <path key={`l-${i}`} d={`M${chip.x - 15} ${chip.y + 11 + i * 9.7}h15`} strokeOpacity={i === 4 ? glowOpacity : 0.42} stroke={i === 4 ? SIGNAL : TRACE} />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <path key={`r-${i}`} d={`M${chip.x + chip.s} ${chip.y + 11 + i * 9.7}h15`} strokeOpacity={i === 4 ? (exiting ? 0.58 : 0.32) : 0.36} stroke={i === 4 ? SIGNAL : TRACE} />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <path key={`t-${i}`} d={`M${chip.x + 17 + i * 11} ${chip.y - 15}v15`} strokeOpacity={0.38} />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <path key={`b-${i}`} d={`M${chip.x + 17 + i * 11} ${chip.y + chip.s}v15`} strokeOpacity={0.38} />
        ))}
      </g>

      <g>
        <rect x={chip.x} y={chip.y} width={chip.s} height={chip.s} rx="5" fill={PAPER} fillOpacity="0.12" stroke={TRACE} strokeOpacity="0.52" strokeWidth="1.65" />
        <rect x={chip.x + 16} y={chip.y + 16} width={chip.s - 32} height={chip.s - 32} rx="3" fill="none" stroke={TRACE} strokeOpacity="0.32" />
        <rect x={chip.x + 22} y={chip.y + 24} width="26" height="20" rx="2" fill="none" stroke={SIGNAL} strokeOpacity="0.4" />
        <rect x={chip.x + 55} y={chip.y + 24} width="24" height="20" rx="2" fill="none" stroke={TRACE} strokeOpacity="0.37" />
        <rect x={chip.x + 22} y={chip.y + 55} width="25" height="20" rx="2" fill="none" stroke={TRACE} strokeOpacity="0.37" />
        <rect x={chip.x + 55} y={chip.y + 55} width="24" height="20" rx="2" fill="none" stroke={TRACE} strokeOpacity="0.37" />
        <path d={`M${chip.x + 48} ${chip.y + 34}h7M${chip.x + 48} ${chip.y + 65}h7M${chip.x + 67} ${chip.y + 44}v11M${chip.x + 34} ${chip.y + 44}v11M${adcPin.x} ${adcPin.y}h22v${chip.y + 34 - adcPin.y}`} stroke={TRACE} strokeOpacity="0.32" strokeWidth="0.9" />
      </g>

      <g stroke={SIGNAL} strokeOpacity="0.56" strokeWidth="1.8" strokeLinecap="round">
        <path d={`M${chip.x - 16} ${mcu.y}h16`} opacity={glowOpacity} />
        <path d={`M${chip.x + chip.s} ${mcu.y}h14`} opacity={exiting ? 0.82 : 0.4} />
      </g>
      <circle cx={adcPin.x} cy={adcPin.y} r="4.2" fill={SIGNAL} fillOpacity="0.14" />
      <circle cx={adcPin.x} cy={adcPin.y} r="2.2" fill={SIGNAL} fillOpacity="0.68" />
      <path
        d={`M${chip.x + chip.s} ${mcu.y}h32v${heroH * 0.5 - mcu.y}h${w * 0.64 - (chip.x + chip.s + 32)}`}
        stroke="url(#hero-output-fade)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />

      <g fill={COPPER}>
        <circle cx={w * 0.452} cy={startYFor(heroH)} r="1.4" opacity="0.76" />
        <circle cx={chip.x + chip.s * 0.5} cy={chip.y - 52} r="2.6" />
        <circle cx={chip.x + chip.s + 88} cy={chip.y + 28} r="2.8" />
      </g>

      <g fill={LABEL} fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="0.75" opacity="0.72">
        <text x={w * 0.425} y={heroH * 0.445}>TP0 · ADC_IN</text>
        <text x={chip.x + chip.s * 0.5 + 10} y={chip.y - 42}>SYS_CLK · 48 MHz</text>
        <text x={chip.x + chip.s + 104} y={chip.y + 32}>DATA_BUS</text>
        <text x={w * 0.598} y={heroH * 0.625}>SYS_OUT</text>
        <text x={w * 0.47} y={startYFor(heroH) + 23}>1 V/div</text>
        <text x={w * 0.566} y={startYFor(heroH) - 26}>2.4 kHz</text>
      </g>

      <g fill={CHIP_LABEL} fontFamily="var(--font-mono)" fontSize="7.2" letterSpacing="0.4" opacity="0.74">
        <text x={chip.x + 29} y={chip.y + 37}>ADC</text>
        <text x={chip.x + 60} y={chip.y + 37}>CORE</text>
        <text x={chip.x + 29} y={chip.y + 68}>MEM</text>
        <text x={chip.x + 63} y={chip.y + 68}>I/O</text>
        <text x={chip.x + chip.s + 23} y={chip.y + 53}>TX</text>
        <text x={chip.x + chip.s + 23} y={chip.y + 34}>RX</text>
        <text x={chip.x + 23} y={chip.y - 8}>VCC</text>
        <text x={chip.x + 52} y={chip.y + chip.s + 24}>GND</text>
        <text x={chip.x + 28} y={chip.y + chip.s + 32}>MCU</text>
      </g>

      <g stroke={COPPER} strokeOpacity="0.5" strokeWidth="1">
        <path d={`M${w * 0.695} ${heroH * 0.205}h22v22`} />
        <path d={`M${w * 0.695} ${heroH * 0.205}h-22`} />
      </g>
      <text x={w * 0.685} y={heroH * 0.19} fill={COPPER} fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="0.6">
        TRIG
      </text>

      <g transform={`translate(${readout.x} ${readout.y})`} fontFamily="var(--font-mono)">
        <path d="M0 0h164v90" stroke={TRACE} strokeOpacity="0.22" strokeWidth="1" fill="none" />
        <text x="0" y="14" fill={CHIP_LABEL} fontSize="9" letterSpacing="1.2">SYSTEM</text>
        {[
          ["CLK", "48 MHz"],
          ["BUS", exiting ? "ACTIVE" : "SYNC"],
          ["SIGNAL", entering ? "LOCKED" : "SEARCH"],
          ["STATE", "READY"],
        ].map(([label, value], i) => (
          <g key={label} transform={`translate(0 ${32 + i * 14})`}>
            <text x="0" y="0" fill={LABEL} fontSize="8.6" letterSpacing="0.8">{label}</text>
            <text x="84" y="0" fill={value === "ACTIVE" || value === "LOCKED" ? SIGNAL : LABEL} fontSize="8.6" letterSpacing="0.8">{value}</text>
          </g>
        ))}
        <circle cx="152" cy="11" r="3" fill="#22c55e" fillOpacity={entering ? 0.55 : 0.22} />
      </g>
    </g>
  );
}

function startYFor(heroH: number) {
  return heroH * 0.48;
}

function ProjectNode({
  node,
  reached,
  completed,
  reduceMotion,
}: {
  node: NodePt;
  reached: boolean;
  completed: boolean;
  reduceMotion: boolean | null;
}) {
  return (
    <g>
      <circle
        cx={node.x}
        cy={node.y}
        r={reached ? 12 : 10}
        fill={reached ? SIGNAL : node.color}
        fillOpacity={reached ? 0.16 : 0.09}
      />
      <circle
        cx={node.x}
        cy={node.y}
        r="7"
        fill={PAPER}
        stroke={node.color}
        strokeOpacity={completed ? 0.72 : 1}
        strokeWidth="2"
      />
      {reached && (
        <>
          <circle
            cx={node.x}
            cy={node.y}
            r="7"
            fill="none"
            stroke={SIGNAL}
            strokeOpacity="0.9"
            strokeWidth="1.8"
          />
          {!completed && !reduceMotion && (
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="10"
              fill="none"
              stroke={SIGNAL}
              strokeWidth="1.4"
              initial={{ opacity: 0.34, scale: 1 }}
              animate={{ opacity: 0, scale: 1.55 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          )}
        </>
      )}
      <circle cx={node.x} cy={node.y} r="2.4" fill={reached ? SIGNAL : node.color} />
    </g>
  );
}

function TimelineCard({
  project: p,
  align,
  active,
}: {
  project: Project;
  align: "left" | "right";
  active: boolean;
}) {
  const justify = align === "left" ? "lg:justify-end" : "lg:justify-start";
  const bodyAlign = align === "left" ? "lg:ml-auto" : "";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={active ? { scale: 1.01 } : { scale: 1 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <span
        className={`mb-4 block h-px w-16 transition-colors duration-300 ${
          active ? "bg-signal/50" : "bg-trace/45"
        } ${align === "left" ? "lg:ml-auto" : ""}`}
      />
      <div className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 ${justify}`}>
        <span className="eyebrow text-signal">{p.dates}</span>
        <span className="text-ink/25">·</span>
        <span className="eyebrow text-muted">{p.proves}</span>
      </div>
      <h3 className="mt-3 font-serif text-3xl tracking-tight text-ink md:text-4xl">
        {p.name}
      </h3>
      <p className={`mt-2 max-w-md text-[15px] leading-relaxed text-inksoft lg:max-w-md ${bodyAlign}`}>
        {p.blurb}
      </p>
      <ul className={`mt-4 flex flex-wrap gap-2 ${justify}`}>
        {p.stack.slice(0, 5).map((s) => (
          <li
            key={s}
            className="site-pill bg-paper/70 text-inksoft"
          >
            {s}
          </li>
        ))}
      </ul>
      <div className={`mt-5 flex flex-wrap items-center gap-5 ${justify}`}>
        <Link
          href={`/work/${p.id}`}
          className="site-button bg-ink px-4 py-2.5 text-sm text-paper transition hover:-translate-y-0.5 hover:bg-signal"
        >
          Learn more <span className="arrow-glyph" aria-hidden="true">→</span>
        </Link>
        {p.link && (
          <a
            href={p.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-ink/30 pb-0.5 text-sm text-inksoft transition-colors hover:border-signal hover:text-signal"
          >
            {p.link.label} <span className="arrow-glyph" aria-hidden="true">↗</span>
          </a>
        )}
        {p.linkNote && (
          <span className="max-w-xs text-[12px] leading-relaxed text-muted">
            {p.linkNote}
          </span>
        )}
      </div>
    </motion.div>
  );
}

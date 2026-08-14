# Aryan Dhillon — Portfolio · Working Notes

Handoff doc for picking this up in another Claude Code chat. Last updated 2026-08-13.

## What this is
Personal SWE portfolio for Aryan Dhillon (Purdue Computer Engineering, '27).
Single-page site. Current design direction: **"Monograph"** — a designed technical
journal. Warm-neutral document paper, near-black ink, one **blueprint-blue** accent
(deliberately NOT cream/terracotta). Fraunces (serif display) sets the voice; Work Sans
reads the body; JetBrains Mono carries data, folios, and labels.

Impact comes from editorial typography (recruiter scan speed) plus **one live "instrument"
per project** (the B+A hybrid direction the user chose from a 4-concept exploration).

## Stack & how to run
- **React 19 + TypeScript + Vite** (no UI/animation libraries; hand-rolled CSS + hooks).
- Fonts via `@fontsource-variable`: **Fraunces** (standard = wght + opsz), Work Sans, JetBrains Mono.

```bash
cd ~/website
npm run dev        # → http://localhost:5173  (Vite; autoPort in .claude/launch.json)
npm run typecheck  # tsc --noEmit
npm run lint       # eslint . --max-warnings 0
npm run build      # tsc --noEmit && vite build
```
All three gates pass. Last build: ~73 kB gzip JS, ~9.5 kB gzip CSS.

## Project layout
```
~/website/src/
├── main.tsx                 entry (font imports here)
├── App.tsx                  section order
├── content/resume.ts        ← single source of truth for all copy/data
├── hooks/
│   ├── useActiveSection.ts  nav active-state on scroll
│   ├── useReveal.ts         scroll-reveal ([data-reveal] → .is-visible)
│   ├── useTheme.ts          dark/light theme (stamps data-theme)
│   └── useCanvasScene.ts    shared canvas plumbing for every instrument
├── styles/global.css        design tokens + "case" scaffold primitives
└── components/
    ├── Nav/ Hero/ Vaila/ Garmin/ KvStore/ Forecasting/ Supporting/ Capabilities/ Contact/
```

Section order (`src/App.tsx`): **Nav → main[ Hero → Vaila → Garmin → KvStore →
Forecasting → Supporting → Capabilities ] → Contact** (Contact is the closing `<footer>`,
outside `<main>`).

## Design system (`src/styles/global.css`)
- **Palette:** `--paper` / `--ink` neutrals + one `--accent` (blueprint blue, per-theme:
  #1c3f6e light / #8db0e4 dark). Dark instruments use a `--plate-*` set (near-black grounds,
  `--plate-signal` teal phosphor, `--plate-amber`). Contrast ratios noted inline.
- **Type:** modular scale (`--t-11 … --t-64`) + fluid display (`--t-hero`, `--t-section`,
  `--t-case`, `--t-figure`). `--t-hero` is capped at 5rem so the title spread fits one viewport.
- **`.case` scaffold** (global primitives): `.case-folio`, `.case-head` (reading column +
  `.case-rail` meta), `.band` / `.band--plate` (the instrument band). Every project reuses this
  frame; only the instrument inside differs.
- **`--elev-*`** is used **only in Vaila** (the layered cross-section).
- Dark/light via `useTheme`; both themes designed (not inverted).

## The five distinct treatments (no card reused)
- **Hero** — title spread: Fraunces thesis, disciplines lede, numbered **Contents** index
  (doubles as recruiter nav), faint drafting grid + crop marks.
- **Vaila** (Case 01) — layered product cross-section (Engine/Integrations/Infrastructure)
  with real depth; the only place `--elev` appears.
- **Garmin** (Case 02) — four-stage verification progression + a live **TCAS traffic scope**
  (`GarminScope.tsx`, canvas): range rings, sweep, traffic diamonds w/ altitude tags. `8` figure.
- **KvStore** (Case 03) — dark monitoring plate: live **throughput trace** (`KvThroughput.tsx`),
  p50/p99 latencies, and the site's one **measurements table**. `1.9M` WAL figure.
- **Forecasting** (Case 04) — probabilistic **fan chart** (`ForecastFan.tsx`, canvas, theme-aware
  via CSS vars): observed history → median + widening 90% PI. Deliberately **no numbers**
  (résumé reports none); caption marks it illustrative.
- **Supporting / Capabilities / Contact** — the lighter appendix / colophon layer.

## Instruments — shared plumbing
`useCanvasScene(draw, opts)` handles DPR scaling, a ResizeObserver refit, **pauses the rAF
loop when the canvas is off-screen**, and honors `prefers-reduced-motion` (single static frame).
Each instrument only writes its `draw(ctx, w, h, t, elapsed, reduced)` callback.

## Content = `src/content/resume.ts`
Edit copy/data there, not in components. Canonical résumé facts live in Claude memory
(`resume-facts.md`) — **v7** (2026-08-13). Nothing embellished: Garmin DO-178B / GTS 8x0 v5.03,
8 change requests; Vaila = Founder & CEO, prepared-for-launch (not launched); KV store 65K
ops/sec / p50 119µs / p99 238µs / 1.9M WAL rec/sec; John Deere reports no numbers.
`profile.status` and `profile.thesis` and `worksIndex` were added for the hero.

## Verification done (2026-08-13)
typecheck / lint / build all pass. Rendered in-browser: hero (both themes), all four
instruments paint (canvas pixel-sampled), no console errors, no horizontal overflow at
mobile (372) and desktop (1440 geometry: shell 1312 centered, two columns). NOTE: the in-app
Browser pane runs a **372px CSS viewport at 2× DPR** and pins screenshots at scroll offsets —
use hash-nav + `element.scrollIntoView` + force `.is-visible` on `[data-reveal]`, and trust
`getBoundingClientRect` over thumbnails.

## Open items / blockers
- **Not deployed. Commits are LOCAL only.** The Monograph rebuild is uncommitted working-tree
  changes on top of the earlier commits.
- **Push was blocked** previously: the Claude GitHub App lacked access to `aryan0dhi/portfolio`.
  Grant at https://github.com/settings/installations, then push → deploy (Vercel/Netlify).
- Desktop (>900px) verified by geometry only — do a real wide-viewport visual pass when possible.
- Not built: testimonial quotes, a "Now" entry, a blog.

## History
Next.js signal/circuit version → Vite "Monument" (black + vermillion, typographic) →
this **"Monograph"** rebuild (blueprint-blue technical journal + per-project live instruments).
If you see `ParticleField`, `formations.ts`, `SectionHead`, or `ProductComposition`, those were
removed in the Monograph rebuild.

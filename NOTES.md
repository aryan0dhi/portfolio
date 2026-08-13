# Aryan Dhillon — Portfolio · Working Notes

Handoff doc for picking this up in another Claude Code chat. Last updated 2026-08-13.

## What this is
Personal SWE portfolio for Aryan Dhillon (Purdue Computer Engineering, '27).
Single-page site, current design direction: **"Monument"** — restrained, typographic,
warm-stone + single brass accent. Impact comes from type scale and one moment of real
depth (Vaila), not from lots of effects.

## Stack & how to run
- **React 19 + TypeScript + Vite** (migrated from an earlier Next.js version — see History).
- Fonts via `@fontsource-variable`: Outfit (display), Work Sans (body), JetBrains Mono (mono).
- No UI/animation libraries; hand-rolled CSS + a few hooks.

```bash
cd ~/website
npm run dev        # → http://localhost:5173  (Vite; port pinned in .claude/launch.json)
npm run typecheck  # tsc --noEmit
npm run lint       # eslint . --max-warnings 0
npm run build      # tsc --noEmit && vite build
```
All three gates (typecheck / lint / build) pass. Last build: ~69 kB gzip JS, ~8.7 kB CSS,
Latin-only font subsets fetched at runtime.

## Project layout
```
~/website
├── index.html
├── src/
│   ├── main.tsx                 entry
│   ├── App.tsx                  section order (see below)
│   ├── content/resume.ts        ← single source of truth for all copy/data
│   ├── hooks/
│   │   ├── useActiveSection.ts  nav active-state on scroll
│   │   ├── useReveal.ts         scroll-reveal
│   │   └── useTheme.ts          dark/light theme
│   ├── styles/global.css        design tokens + base (Monument palette, type scale)
│   └── components/
│       ├── Nav/  Hero/  Vaila/  Garmin/  KvStore/
│       ├── Forecasting/  Supporting/  Capabilities/  Contact/
│       └── SectionHead/         shared section header
├── public/Aryan-Dhillon-Resume.pdf   (+ avatar)
└── vite.config.ts, tsconfig.json, eslint.config.js, package.json
```

Section order (`src/App.tsx`): **Nav → Hero → Vaila → Garmin → KvStore → Forecasting → Supporting → Capabilities → Contact.**

## Design system (`src/styles/global.css`)
- **Palette:** warm stone neutrals (`--stone-*`, `--ink`) + one accent (`--brass` / `--brass-lt`). No second hue.
- **Contrast is tracked in comments with measured ratios.** Key one: `--on-accent` (text on the brass pill)
  flips with theme — 8.65:1 dark / 4.84:1 light — because near-white on light brass collapsed to 1.99:1.
- **Type:** strict modular scale (`--t-11 … --t-172`) + fluid display sizes (`--t-hero`, `--t-section`, `--t-figure`). Nothing in between.
- **Elevation** (`--elev-1..4`) is used **only in Vaila** — the one place dimensional depth appears.
- Dark/light theme via `useTheme` (semantic tokens re-bind per theme).

## The four distinct section treatments (no card reused)
- **Garmin** — four-stage verification band (requirements → embedded C → test → independent review); `8` at display scale (8 formal change requests, DO-178B / GTS 8x0 v5.03).
- **Vaila** — the only dimensional layering on the site: three overlapping elevation planes built from markup.
- **KvStore** (Distributed KV Store, Java) — the site's only table, on an inverted dark plate; `1.9M` WAL records/sec called out.
- **Forecasting** (The Data Mine / John Deere) — five-step method progression, deliberately **no numbers** (résumé reports none).
- **Supporting** / **Capabilities** — the lighter roles/skills layer.

## Content = `src/content/resume.ts`
Edit copy/data there, not in components. Canonical résumé facts live in Claude memory
(`resume-facts.md`) — current is **v7** (2026-08-13). Highlights: Garmin DO-178B GTS 8x0 v5.03,
8 change requests; **Vaila = Founder & CEO** (Work Experience, not Projects), not yet App-Store-launched;
Distributed KV store 65K ops/sec across 32 clients; Investment Analytics = Sept 2025.
(Handshake AI was dropped in v6 — keep only if a compressed line is needed.)

## Recent QA / defects fixed
1. Contrast: brass pill text was 1.99:1 in dark → new theme-flipping `--on-accent` (8.65 dark / 4.84 light).
2. Dark-theme text: `stone-500` muted (3.96) + `brass` accent (3.85) failed → moved to `stone-400` (7.52) / `brass-lt` (9.39).
3. Occlusion: Vaila availability rows ran under the device panel → text now clears while the surface still overlaps for depth.
4. Mobile CTA: "Download résumé" not full-width — `width:100%` was on the `<a>` instead of its `<li>`.
5. Hero pulled 1006px → 790px so the résumé CTA + email + GitHub sit above the fold at 1440×900.
Every section was checked at 1440 / 1280 / 768 / 390 in both themes (workaround pass — verify visually yourself).

## Open items / blockers
- **Not deployed. Commits are LOCAL only** (2 commits: baseline + Monument rebuild). Nothing pushed.
- **Push is blocked:** the Claude GitHub App lacks access to `aryan0dhi/portfolio`.
  Grant it at https://github.com/settings/installations, then push → deploy (Vercel/Netlify) for a shareable URL.
- Not built yet (from the earlier roadmap): real **testimonial quotes**, a **"Now"** entry, a **blog**.
- A `/schedule` routine was requested but never created (same GitHub-access blocker).

## History (why it looks different from earlier chats)
Originally scaffolded as a Next.js App Router site (signal/circuit identity: animated circuit hero,
glass cards, a scroll-driven "signal" timeline). It was then **rebuilt from scratch as this Vite +
"Monument" version** (commit `bfe964c`). If you see references to `app/`, a `SignalJourney`, `CircuitField`,
or a Cmd+K palette, that was the old Next.js version — **not** in the current `src/` tree.

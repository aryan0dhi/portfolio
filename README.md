# Aryan Dhillon — Portfolio

A personal software-engineering portfolio, designed and built from scratch as an
editorial "technical journal": premium typography, one live interactive instrument
per project, light and dark themes, and a strong focus on accessibility and
performance.

**Live:** https://aryandhillon.vercel.app

---

## About

Computer Engineering student at Purdue University (BS, expected May 2027), building
software across embedded systems, distributed systems, machine learning, and
full-stack development.

## Selected work (each with its own visual treatment)

- **Vaila** — an AI scheduling platform for iOS, founded and built independently.
  Presented as a layered product cross-section (SwiftUI · React · FastAPI ·
  PostgreSQL · Redis).
- **Garmin** — embedded software under DO-178B certification, shown through the
  actual surveillance picture it served: a live TCAS traffic scope rendered on
  canvas.
- **Distributed Key-Value Store (Java)** — an interactive request data path
  (Client → Java NIO server → RESP parser → open-addressing hash table →
  write-ahead log) beside a real 32-client benchmark (65K ops/sec, p50 480µs).
- **Demand Forecasting (The Data Mine · John Deere)** — LSTM multivariate
  forecasting, shown as a probabilistic fan chart (median + 90% prediction
  interval).

## Built with

React 19 · TypeScript · Vite · hand-rolled CSS (no UI or animation libraries) ·
Fraunces / Work Sans / JetBrains Mono. Interactive visuals are drawn on canvas
through a shared hook that handles device-pixel scaling, pauses off-screen, and
respects `prefers-reduced-motion`. Deployed on Vercel.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

## Structure

- `src/content/resume.ts` — single source of truth for all copy and data.
- `src/components/` — one folder per section, each with its own treatment.
- `src/hooks/useCanvasScene.ts` — shared canvas plumbing for the instruments.
- `src/styles/global.css` — design tokens and shared layout primitives.

---

Contact: adaryan55@gmail.com · [github.com/aryan0dhi](https://github.com/aryan0dhi) ·
[LinkedIn](https://www.linkedin.com/in/aryan-dhillon)

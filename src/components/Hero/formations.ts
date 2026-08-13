/**
 * Particle target formations.
 *
 * Each formation is a real structure drawn from one of the four
 * disciplines, not abstract noise — the field morphing between them is
 * the range argument the hero is making. Points are returned in a
 * normalised -1..1 space and mapped to the canvas by the renderer.
 */

export type FormationId = 'scatter' | 'lattice' | 'ring' | 'cloud' | 'grid';

export interface Point {
  x: number;
  y: number;
}

/** Deterministic PRNG so the field looks identical on every load. */
function makeRandom(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Untargeted drift — the resting state before anything is selected. */
function scatter(n: number): Point[] {
  const rnd = makeRandom(7);
  const pts: Point[] = [];
  for (let i = 0; i < n; i++) {
    const a = rnd() * Math.PI * 2;
    const r = Math.sqrt(rnd()) * 0.98;
    pts.push({ x: Math.cos(a) * r * 1.35, y: Math.sin(a) * r });
  }
  return pts;
}

/** Embedded & systems — a sampled lattice carrying a square wave. */
function lattice(n: number): Point[] {
  const pts: Point[] = [];
  const cols = 48;
  const rows = Math.max(1, Math.ceil(n / cols));
  for (let i = 0; i < n; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    const x = (c / (cols - 1)) * 2.4 - 1.2;
    let y = (r / Math.max(1, rows - 1)) * 1.5 - 0.75;
    // Every fourth row steps like a clocked signal rather than lying flat.
    if (r % 4 === 0) {
      const period = 8;
      y += (Math.floor(c / period) % 2 === 0 ? 1 : -1) * 0.055;
    }
    pts.push({ x, y });
  }
  return pts;
}

/** Distributed systems — a hash ring with vnode ticks around it. */
function ring(n: number): Point[] {
  const pts: Point[] = [];
  const rnd = makeRandom(19);
  const ticks = 160; // matches the store's vnodes-per-node
  for (let i = 0; i < n; i++) {
    const onTick = i % 5 === 0;
    if (onTick) {
      const t = Math.floor(rnd() * ticks) / ticks;
      const a = t * Math.PI * 2;
      const r = 0.62 + rnd() * 0.13;
      pts.push({ x: Math.cos(a) * r * 1.1, y: Math.sin(a) * r });
    } else {
      const a = rnd() * Math.PI * 2;
      const jitter = (rnd() - 0.5) * 0.045;
      const r = 0.6 + jitter;
      pts.push({ x: Math.cos(a) * r * 1.1, y: Math.sin(a) * r });
    }
  }
  return pts;
}

/** Applied ML — clusters with a converging gradient trail. */
function cloud(n: number): Point[] {
  const pts: Point[] = [];
  const rnd = makeRandom(43);
  const centers = [
    { x: -0.72, y: -0.24 },
    { x: -0.1, y: 0.3 },
    { x: 0.55, y: -0.32 },
    { x: 0.95, y: 0.18 },
  ];
  for (let i = 0; i < n; i++) {
    const c = centers[i % centers.length];
    // Box-Muller for a believable gaussian rather than uniform blobs.
    const u = Math.max(1e-6, rnd());
    const v = rnd();
    const mag = Math.sqrt(-2 * Math.log(u)) * 0.14;
    pts.push({
      x: c.x + mag * Math.cos(2 * Math.PI * v),
      y: c.y + mag * Math.sin(2 * Math.PI * v),
    });
  }
  return pts;
}

/** Product & interface — nested layout rectangles. */
function grid(n: number): Point[] {
  const pts: Point[] = [];
  const rects = [
    { x: -1.15, y: -0.7, w: 2.3, h: 1.4 },
    { x: -0.95, y: -0.52, w: 1.05, h: 0.5 },
    { x: 0.16, y: -0.52, w: 0.78, h: 1.06 },
    { x: -0.95, y: 0.06, w: 1.05, h: 0.48 },
  ];
  const perim = rects.map((r) => 2 * (r.w + r.h));
  const total = perim.reduce((a, b) => a + b, 0);
  for (let i = 0; i < n; i++) {
    let t = (i / n) * total;
    let ri = 0;
    while (ri < rects.length - 1 && t > perim[ri]) {
      t -= perim[ri];
      ri++;
    }
    const r = rects[ri];
    let d = t;
    if (d < r.w) pts.push({ x: r.x + d, y: r.y });
    else if ((d -= r.w) < r.h) pts.push({ x: r.x + r.w, y: r.y + d });
    else if ((d -= r.h) < r.w) pts.push({ x: r.x + r.w - d, y: r.y + r.h });
    else {
      d -= r.w;
      pts.push({ x: r.x, y: r.y + Math.max(0, r.h - d) });
    }
  }
  return pts;
}

const builders: Record<FormationId, (n: number) => Point[]> = {
  scatter,
  lattice,
  ring,
  cloud,
  grid,
};

export function buildFormation(id: FormationId, n: number): Point[] {
  return builders[id](n);
}

/** Disciplines, in the order the hero lists them. */
export const disciplines: { id: FormationId; label: string; note: string }[] = [
  { id: 'lattice', label: 'Embedded firmware', note: 'C under certification' },
  { id: 'ring', label: 'Distributed systems', note: 'Consistent-hash sharding' },
  { id: 'cloud', label: 'Applied ML', note: 'Probabilistic forecasting' },
  { id: 'grid', label: 'Full-stack product', note: 'Shipped, end to end' },
];

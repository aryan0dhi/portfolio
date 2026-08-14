import { useCanvasScene } from '../../hooks/useCanvasScene';
import styles from './Forecasting.module.css';

function cssVar(name: string, fallback: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

// Deterministic pseudo-history so the figure is stable, not random noise.
function history(i: number): number {
  return (
    0.5 +
    Math.sin(i * 0.55) * 0.14 +
    Math.sin(i * 0.21 + 1.3) * 0.1 +
    Math.sin(i * 1.1) * 0.05
  );
}

/**
 * A probabilistic forecast figure: observed history, then a median
 * projection inside a widening 90% prediction interval. Intentionally
 * unlabelled on the value axis — the résumé reports the evaluation
 * methods, not numbers, and this figure honours that by showing the
 * shape of uncertainty rather than inventing quantities.
 */
export function ForecastFan() {
  const ref = useCanvasScene(({ ctx, w, h, elapsed, reduced }) => {
    const accent = cssVar('--accent', '#1c3f6e');
    const ink = cssVar('--ink', '#17161b');
    const muted = cssVar('--ink-muted', '#6a6871');
    const line = cssVar('--hairline', '#d3cfc4');

    const padL = 14;
    const padR = 14;
    const padT = 18;
    const padB = 22;
    const x0 = padL;
    const x1 = w - padR;
    const chartW = x1 - x0;
    const nowX = x0 + chartW * 0.58;
    const yOf = (v: number) => padT + (1 - v) * (h - padT - padB);

    ctx.clearRect(0, 0, w, h);

    // Faint horizontal grid
    ctx.strokeStyle = line;
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 1;
    for (let g = 0; g <= 4; g++) {
      const gy = padT + (g / 4) * (h - padT - padB);
      ctx.beginPath();
      ctx.moveTo(x0, gy);
      ctx.lineTo(x1, gy);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Reveal progress: draws in once, then settles.
    const p = reduced ? 1 : Math.min(1, elapsed / 1500);
    const revealX = x0 + (x1 - x0) * p;

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, revealX, h);
    ctx.clip();

    // Build history samples
    const K = 26;
    const hist: [number, number][] = [];
    for (let i = 0; i <= K; i++) {
      const x = x0 + (i / K) * (nowX - x0);
      hist.push([x, yOf(history(i))]);
    }
    const lastV = history(K);
    const slope = (history(K) - history(K - 3)) / 3;

    // Forecast band (90% interval), widening with horizon
    const steps = 40;
    const upper: [number, number][] = [];
    const lower: [number, number][] = [];
    for (let j = 0; j <= steps; j++) {
      const frac = j / steps;
      const x = nowX + frac * (x1 - nowX);
      const med = lastV + slope * (frac * 8) * 0.6 + Math.sin(frac * 3) * 0.015;
      const spread = 0.06 + Math.sqrt(frac) * 0.2;
      upper.push([x, yOf(Math.min(0.98, med + spread))]);
      lower.push([x, yOf(Math.max(0.02, med - spread))]);
    }

    // Band fill
    ctx.beginPath();
    upper.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    for (let i = lower.length - 1; i >= 0; i--) ctx.lineTo(lower[i][0], lower[i][1]);
    ctx.closePath();
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.14;
    ctx.fill();
    ctx.globalAlpha = 1;

    // Band edges (dashed)
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = 1;
    [upper, lower].forEach((edge) => {
      ctx.beginPath();
      edge.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.stroke();
    });
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;

    // Median forecast line
    ctx.beginPath();
    for (let j = 0; j <= steps; j++) {
      const frac = j / steps;
      const x = nowX + frac * (x1 - nowX);
      const med = lastV + slope * (frac * 8) * 0.6 + Math.sin(frac * 3) * 0.015;
      const y = yOf(med);
      if (j) ctx.lineTo(x, y);
      else ctx.moveTo(x, y);
    }
    ctx.strokeStyle = accent;
    ctx.lineWidth = 1.8;
    ctx.stroke();

    // History line
    ctx.beginPath();
    hist.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.strokeStyle = ink;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();

    // "Now" divider + labels (drawn unclipped)
    ctx.strokeStyle = muted;
    ctx.globalAlpha = 0.5;
    ctx.setLineDash([2, 4]);
    ctx.beginPath();
    ctx.moveTo(nowX, padT);
    ctx.lineTo(nowX, h - padB);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;

    ctx.fillStyle = muted;
    ctx.font = '600 10px "JetBrains Mono Variable", monospace';
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
    ctx.fillText('OBSERVED', x0 + 2, h - 7);
    ctx.textAlign = 'right';
    ctx.fillText('FORECAST · 90% PI', x1 - 2, h - 7);
    ctx.textAlign = 'left';
  });

  return (
    <canvas
      ref={ref}
      className={styles.fan}
      role="img"
      aria-label="Forecast figure: observed demand history, then a median projection inside a widening 90% prediction interval."
    />
  );
}

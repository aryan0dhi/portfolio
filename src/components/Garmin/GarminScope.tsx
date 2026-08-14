import { useCanvasScene } from '../../hooks/useCanvasScene';
import styles from './Garmin.module.css';

interface Target {
  r: number; // 0..1 of range ring radius
  b: number; // bearing, degrees (0 = own heading, up)
  vb: number; // angular drift, deg/frame
  alt: string; // relative altitude label (hundreds of ft)
  trend: -1 | 0 | 1; // vertical trend arrow
  kind: 'other' | 'proximate' | 'ta';
}

// A deliberately-composed traffic picture: other traffic, one proximate,
// one traffic advisory (amber). Drifts slowly so the scope feels live.
const TARGETS: Target[] = [
  { r: 0.56, b: 22, vb: 0.05, alt: '+04', trend: 1, kind: 'other' },
  { r: 0.74, b: 134, vb: -0.03, alt: '−02', trend: -1, kind: 'proximate' },
  { r: 0.4, b: 252, vb: 0.04, alt: '00', trend: 0, kind: 'ta' },
  { r: 0.64, b: 312, vb: -0.045, alt: '−06', trend: -1, kind: 'other' },
];

/**
 * A TCAS / ADS-B In traffic display — the surveillance picture Aryan's
 * change requests touched. Range rings, own-ship, a rotating sweep, and
 * traffic symbols with relative-altitude tags and vertical trend arrows.
 */
export function GarminScope() {
  const ref = useCanvasScene(({ ctx, w, h, elapsed, reduced }) => {
    const cx = w / 2;
    const cy = h * 0.52;
    const R = Math.min(w, h * 1.15) * 0.42;

    ctx.clearRect(0, 0, w, h);

    // Range rings
    ctx.strokeStyle = 'rgba(110, 168, 255, 0.22)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath();
      ctx.arc(cx, cy, (R * i) / 3, 0, Math.PI * 2);
      ctx.stroke();
    }
    // Cross hairs
    ctx.strokeStyle = 'rgba(110, 168, 255, 0.14)';
    ctx.beginPath();
    ctx.moveTo(cx - R, cy);
    ctx.lineTo(cx + R, cy);
    ctx.moveTo(cx, cy - R);
    ctx.lineTo(cx, cy + R);
    ctx.stroke();

    // Sweep (skipped when reduced-motion)
    if (!reduced) {
      const a = (elapsed / 1000) * 1.1;
      const trail = 0.7;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(a);
      const grad = ctx.createConicGradient?.(0, 0, 0);
      if (grad) {
        grad.addColorStop(0, 'rgba(53, 224, 192, 0.28)');
        grad.addColorStop(trail / (Math.PI * 2), 'rgba(53, 224, 192, 0)');
        grad.addColorStop(1, 'rgba(53, 224, 192, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, R, -trail, 0);
        ctx.closePath();
        ctx.fill();
      }
      ctx.strokeStyle = 'rgba(53, 224, 192, 0.85)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(R, 0);
      ctx.stroke();
      ctx.restore();
    }

    // Own ship — chevron at centre
    ctx.fillStyle = '#eef4ff';
    ctx.beginPath();
    ctx.moveTo(cx, cy - 9);
    ctx.lineTo(cx - 6, cy + 6);
    ctx.lineTo(cx, cy + 2);
    ctx.lineTo(cx + 6, cy + 6);
    ctx.closePath();
    ctx.fill();

    // Traffic
    for (const t of TARGETS) {
      const bearing = reduced ? t.b : t.b + (elapsed / 16.7) * t.vb;
      const rad = (bearing * Math.PI) / 180;
      const x = cx + Math.sin(rad) * R * t.r;
      const y = cy - Math.cos(rad) * R * t.r;

      const color =
        t.kind === 'ta' ? '#ffb020' : t.kind === 'proximate' ? '#eef4ff' : '#6ea8ff';

      if (t.kind === 'ta') {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // TCAS diamond
        ctx.beginPath();
        ctx.moveTo(x, y - 5.5);
        ctx.lineTo(x + 5.5, y);
        ctx.lineTo(x, y + 5.5);
        ctx.lineTo(x - 5.5, y);
        ctx.closePath();
        if (t.kind === 'proximate') {
          ctx.fillStyle = color;
          ctx.fill();
        } else {
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      // Relative-altitude tag, with a climb/descend arrow to its right
      // (TCAS convention: trend arrow follows the data tag).
      ctx.fillStyle = color;
      ctx.font = '600 10px "JetBrains Mono Variable", monospace';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';
      ctx.fillText(t.alt, x + 10, y - 1);
      if (t.trend !== 0) {
        const ax = x + 12 + ctx.measureText(t.alt).width;
        const dir = t.trend < 0 ? 1 : -1; // screen y grows downward
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(ax, y - 5 * dir);
        ctx.lineTo(ax, y + 5 * dir);
        ctx.moveTo(ax, y + 5 * dir);
        ctx.lineTo(ax - 2.5, y + 5 * dir - 3 * dir);
        ctx.moveTo(ax, y + 5 * dir);
        ctx.lineTo(ax + 2.5, y + 5 * dir - 3 * dir);
        ctx.stroke();
      }
    }
  });

  return (
    <div className={styles.scopeWrap}>
      <canvas ref={ref} className={styles.scope} role="img" aria-label="TCAS traffic display: own ship at centre with surrounding traffic targets, relative altitudes and vertical trend arrows." />
      <span className={styles.scopeCorner}>TFC</span>
      <span className={styles.scopeScale}>± 6 NM</span>
    </div>
  );
}

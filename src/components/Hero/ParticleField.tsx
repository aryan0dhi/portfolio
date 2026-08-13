import { useEffect, useRef } from 'react';
import { buildFormation, type FormationId, type Point } from './formations';
import styles from './ParticleField.module.css';

interface Props {
  formation: FormationId;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  size: number;
  hot: boolean;
}

const REST_EPSILON = 0.0016; // below this the field is considered settled

/**
 * A single particle system that reconfigures into a different real
 * structure per discipline. Canvas 2D rather than WebGL — it holds 60fps
 * at this particle count with no dependency, and degrades far better.
 *
 * The loop stops once the field settles, so this is not a perpetual
 * decorative animation; it wakes on interaction and goes quiet again.
 */
export function ParticleField({ formation }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const formationRef = useRef<FormationId>(formation);

  useEffect(() => {
    formationRef.current = formation;
  }, [formation]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let count = 0;
    let particles: Particle[] = [];
    let targets: Point[] = [];
    let raf = 0;
    let running = false;
    let settledFrames = 0;
    let hasAssembled = false;

    const pointer = { x: -9999, y: -9999, active: false };

    const readAccent = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#ff3d00';
    const readDim = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--field-dim').trim() || '#3a3a3a';

    let accent = readAccent();
    let dim = readDim();

    function particleCount() {
      const area = width * height;
      if (coarse || width < 640) return Math.min(900, Math.round(area / 1400));
      return Math.min(2600, Math.round(area / 620));
    }

    function mapTargets() {
      // Offset right of centre so the field sits beside the text column
      // rather than through it.
      const scale = Math.min(width, height * 1.35) * 0.38;
      const cx = width * (width < 760 ? 0.5 : 0.63);
      const cy = height * 0.47;
      const pts = buildFormation(formationRef.current, count);
      targets = pts.map((p) => ({ x: cx + p.x * scale, y: cy + p.y * scale }));
      for (let i = 0; i < particles.length; i++) {
        particles[i].tx = targets[i].x;
        particles[i].ty = targets[i].y;
      }
    }

    /**
     * Particles are seeded AT their formation targets, so the very first
     * painted frame is already the correct structure. The assembly is then
     * produced by throwing them outward and letting them spring back —
     * which means a throttled rAF or reduced-motion simply yields the
     * settled formation rather than permanent noise.
     */
    function seed() {
      count = particleCount();
      // Offset right of centre so the field sits beside the text column
      // rather than through it.
      const scale = Math.min(width, height * 1.35) * 0.38;
      const cx = width * (width < 760 ? 0.5 : 0.63);
      const cy = height * 0.47;
      const pts = buildFormation(formationRef.current, count);
      particles = pts.map((p, i) => {
        const tx = cx + p.x * scale;
        const ty = cy + p.y * scale;
        return {
          x: tx,
          y: ty,
          vx: 0,
          vy: 0,
          tx,
          ty,
          size: i % 9 === 0 ? 2 : 1,
          hot: i % 9 === 0,
        };
      });
      targets = particles.map((p) => ({ x: p.tx, y: p.ty }));
    }

    /** Throw the field outward so it visibly gathers back into shape. */
    function burst(strength: number) {
      const cx = width / 2;
      const cy = height / 2;
      for (const p of particles) {
        const dx = p.x - cx;
        const dy = p.y - cy;
        const d = Math.hypot(dx, dy) || 1;
        p.x = cx + (dx / d) * (d * strength) + (Math.random() - 0.5) * 40;
        p.y = cy + (dy / d) * (d * strength) + (Math.random() - 0.5) * 40;
        p.vx = 0;
        p.vy = 0;
      }
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (!reduced && !hasAssembled) {
        hasAssembled = true;
        burst(1.85);
      }
      draw();
      if (!reduced) start();
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx!.fillStyle = p.hot ? accent : dim;
        ctx!.fillRect(p.x, p.y, p.size, p.size);
      }
    }

    function step() {
      let motion = 0;
      const repelR = 110;
      const repelR2 = repelR * repelR;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Spring toward the formation target.
        p.vx += (p.tx - p.x) * 0.014;
        p.vy += (p.ty - p.y) * 0.014;

        // Magnetic cursor: push away, falling off with distance.
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < repelR2 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const force = (1 - d / repelR) * 2.6;
            p.vx += (dx / d) * force;
            p.vy += (dy / d) * force;
          }
        }

        p.vx *= 0.88;
        p.vy *= 0.88;
        p.x += p.vx;
        p.y += p.vy;

        motion += Math.abs(p.vx) + Math.abs(p.vy);
      }

      draw();

      // Stop the loop once nothing is meaningfully moving.
      if (motion / Math.max(1, particles.length) < REST_EPSILON && !pointer.active) {
        settledFrames++;
        if (settledFrames > 20) {
          running = false;
          return;
        }
      } else {
        settledFrames = 0;
      }
      raf = requestAnimationFrame(step);
    }

    function start() {
      if (running || reduced) return;
      running = true;
      settledFrames = 0;
      raf = requestAnimationFrame(step);
    }

    function onPointerMove(e: PointerEvent) {
      if (reduced || coarse) return;
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
      start();
    }

    function onPointerLeave() {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
      start();
    }

    // Only run while the hero is actually on screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );

    const ro = new ResizeObserver(() => resize());

    resize();
    io.observe(canvas);
    ro.observe(canvas);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });

    const themeObserver = new MutationObserver(() => {
      accent = readAccent();
      dim = readDim();
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // Re-target whenever the selected discipline changes. With reduced
    // motion there is no loop to move anything, so snap straight to the
    // new structure — otherwise the control would look inert.
    const retarget = () => {
      mapTargets();
      if (reduced) {
        for (const p of particles) {
          p.x = p.tx;
          p.y = p.ty;
          p.vx = 0;
          p.vy = 0;
        }
        draw();
        return;
      }
      start();
    };
    canvas.addEventListener('formationchange', retarget);

    return () => {
      cancelAnimationFrame(raf);
      running = false;
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('formationchange', retarget);
    };
  }, []);

  // Notify the running loop that the formation changed.
  useEffect(() => {
    canvasRef.current?.dispatchEvent(new Event('formationchange'));
  }, [formation]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}

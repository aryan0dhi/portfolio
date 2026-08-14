import { useEffect, useRef } from 'react';

export interface SceneCtx {
  ctx: CanvasRenderingContext2D;
  /** CSS pixels (already DPR-corrected via setTransform). */
  w: number;
  h: number;
  /** Frame counter (advances only while animating). */
  t: number;
  /** Elapsed ms since the scene started animating. */
  elapsed: number;
  reduced: boolean;
}

interface Options {
  /** Pause the rAF loop when the canvas scrolls out of view. Default true. */
  pauseOffscreen?: boolean;
}

/**
 * Canvas plumbing shared by every instrument:
 *  - device-pixel-ratio scaling with a ResizeObserver refit,
 *  - a single rAF loop that pauses when the canvas leaves the viewport,
 *  - reduced-motion: one static frame, no loop.
 *
 * The `draw` callback receives CSS-pixel dimensions and a frame/elapsed
 * clock, and is responsible only for painting one frame.
 */
export function useCanvasScene(
  draw: (s: SceneCtx) => void,
  options: Options = {},
): React.RefObject<HTMLCanvasElement | null> {
  const { pauseOffscreen = true } = options;
  const ref = useRef<HTMLCanvasElement | null>(null);
  const drawRef = useRef(draw);
  drawRef.current = draw;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;

    const fit = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();

    const ro = new ResizeObserver(() => {
      fit();
      // Repaint immediately so a resize while paused still looks right.
      drawRef.current({ ctx, w, h, t: frame, elapsed: performance.now() - start, reduced });
    });
    ro.observe(canvas);

    let frame = 0;
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const tick = () => {
      drawRef.current({ ctx, w, h, t: frame, elapsed: performance.now() - start, reduced });
      frame += 1;
      if (!reduced && visible) raf = requestAnimationFrame(tick);
    };

    let io: IntersectionObserver | null = null;
    if (pauseOffscreen && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          const wasVisible = visible;
          visible = entries[0]?.isIntersecting ?? true;
          if (visible && !wasVisible && !reduced) {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(tick);
          }
        },
        { threshold: 0.01 },
      );
      io.observe(canvas);
    }

    if (reduced) {
      // Single static frame — a legible, non-animated composition.
      tick();
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io?.disconnect();
    };
  }, [pauseOffscreen]);

  return ref;
}

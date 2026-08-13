import { useEffect } from 'react';

/**
 * Reveals [data-reveal] elements once as they enter the viewport.
 *
 * Deliberately minimal, per the ui-ux-pro-max Subtle scroll-reveal tier:
 * fade + a small translate, fired once and then unobserved so nothing
 * re-animates on scroll-up.
 *
 * The `data-motion="on"` flag is set here rather than in CSS so that the
 * hidden-by-default state only ever applies when JS is running — without
 * it, a failed script leaves the page blank.
 */
export function useReveal(): void {
  useEffect(() => {
    const root = document.documentElement;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || !('IntersectionObserver' in window)) {
      root.setAttribute('data-motion', 'off');
      return;
    }

    root.setAttribute('data-motion', 'on');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );

    const targets = document.querySelectorAll('[data-reveal]');
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

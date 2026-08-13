"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import Reveal from "./Reveal";
import ContourFieldBackground from "./ContourFieldBackground";
import SplineScene from "./SplineScene";
import VailaProductFallback from "./VailaProductFallback";

export default function FeaturedVaila() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track when section enters viewport for lazy-loading Spline
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "start 20%"],
  });

  const scaleSpline = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacitySpline = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <section
      ref={sectionRef}
      id="featured-vaila"
      className="relative z-10 scroll-mt-28 py-16 md:py-20 bg-paper overflow-hidden"
    >
      {/* Subtle contour background */}
      <ContourFieldBackground opacity={0.03} />

      <div className="mx-auto max-w-content px-6 md:px-10">
        {/* Label and Heading */}
        <Reveal>
          <p className="eyebrow mb-3 text-signal">02 / FEATURED PRODUCT</p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="section-heading max-w-xl mb-4">
            Vaila
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="text-lg text-ink/80 max-w-2xl mb-2">
            Find the time that works without the back-and-forth.
          </p>
          <p className="text-sm text-trace mb-8">
            Vaila privately compares calendars, finds mutual times, and gives groups one place to coordinate and lock in the plan. Now shipping on{" "}
            <span className="inline-flex items-center gap-1">
              iOS and web
              <span className="text-signal">•</span>
            </span>
          </p>
        </Reveal>

        {/* Main Product Area */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-12 items-start mb-12">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <Reveal delay={0.16}>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-trace">Problem</p>
                <p className="text-base text-ink leading-relaxed">
                  Scheduling group events requires endless calendar switching, email chains, and manual coordination. There is no tool that privately respects everyone's calendars while actually solving the problem.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.20}>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-trace">Solution</p>
                <p className="text-base text-ink leading-relaxed">
                  Describe what you're planning in plain language. Vaila syncs with your calendars (Google, Outlook, Apple), privately identifies mutual availability, and ranks suggestions using AI. One link, one decision.
                </p>
              </div>
            </Reveal>

            {/* CTA Buttons */}
            <Reveal delay={0.24}>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <a
                  href="https://vaila.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-button bg-ink px-6 py-3 text-sm text-paper transition hover:-translate-y-0.5 hover:bg-signal text-center"
                >
                  Visit Vaila <span aria-hidden="true">↗</span>
                </a>
                <Link
                  href="/work/vaila"
                  className="site-button bg-transparent border border-signal px-6 py-3 text-sm text-signal transition hover:bg-signal/10 text-center"
                >
                  Explore the engineering <span aria-hidden="true">→</span>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right: Product Visual (Spline + Fallback) */}
          <motion.div
            className="relative aspect-square lg:aspect-auto lg:h-[520px] rounded-lg overflow-hidden border border-trace/20 bg-paperdeep"
            style={shouldReduceMotion ? {} : { scale: scaleSpline, opacity: opacitySpline }}
          >
            {/* Spline Scene with lazy loading and fallback */}
            <SplineScene fallback={<VailaProductFallback />} />
          </motion.div>
        </div>

        {/* Engineering Stack */}
        <Reveal delay={0.28}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 border-t border-trace/15 pt-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-trace mb-2">iOS</p>
              <p className="text-sm text-ink">SwiftUI</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-trace mb-2">Web</p>
              <p className="text-sm text-ink">React</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-trace mb-2">Backend</p>
              <p className="text-sm text-ink">FastAPI · PostgreSQL · Redis</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-trace mb-2">Platform</p>
              <p className="text-sm text-ink">OAuth · Calendar Sync · AI Scheduling</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

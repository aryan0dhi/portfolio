"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface SplineSceneProps {
  fallback: React.ReactNode;
  splineUrl?: string;
}

export default function SplineScene({ fallback, splineUrl }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadSpline, setLoadSpline] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineFailed, setSplineFailed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Lazy load Spline when section is near viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadSpline) {
          setLoadSpline(true);
        }
      },
      { rootMargin: "200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [loadSpline]);

  // Load Spline embed script and iframe
  useEffect(() => {
    if (!loadSpline || splineFailed || shouldReduceMotion) return;

    // If reduced motion is enabled, skip Spline and show fallback
    if (shouldReduceMotion) {
      setSplineFailed(true);
      return;
    }

    // Load Spline script if not already loaded
    if (!window.spline) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@splinetool/viewer@1.9.64/build/spline-viewer.js";
      script.async = true;
      script.onload = () => {
        setSplineLoaded(true);
      };
      script.onerror = () => {
        console.warn("Spline failed to load, showing fallback");
        setSplineFailed(true);
      };
      document.head.appendChild(script);
    } else {
      setSplineLoaded(true);
    }

    return () => {
      // Don't remove script to avoid reloading
    };
  }, [loadSpline, shouldReduceMotion, splineFailed]);

  // Render Spline viewer if URL is available and loaded
  useEffect(() => {
    if (!splineLoaded || !containerRef.current || splineFailed) return;

    // Configuration for Spline scene
    // NOTE: Replace this URL with your actual Spline scene export URL
    // You can get this from Spline.design after creating/exporting your scene
    const splineSceneUrl =
      splineUrl ||
      process.env.NEXT_PUBLIC_SPLINE_VAILA_URL ||
      ""; // Empty string triggers fallback

    if (!splineSceneUrl) {
      setSplineFailed(true);
      return;
    }

    // Create Spline viewer element
    if (containerRef.current && window.spline) {
      const canvas = document.createElement("canvas");
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(canvas);

      try {
        // @ts-ignore - Spline viewer global
        new window.spline.Application(canvas, splineSceneUrl);
      } catch (error) {
        console.warn("Spline initialization failed:", error);
        setSplineFailed(true);
      }
    }
  }, [splineLoaded, splineFailed]);

  // If Spline failed or reduced motion, show fallback
  if (splineFailed || shouldReduceMotion || !loadSpline) {
    return <>{fallback}</>;
  }

  return <div ref={containerRef} className="w-full h-full" />;
}

declare global {
  interface Window {
    spline?: {
      Application: any;
    };
  }
}

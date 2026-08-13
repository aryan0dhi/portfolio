"use client";

import { useEffect, useRef } from "react";

interface ContourFieldBackgroundProps {
  opacity?: number;
  color?: string;
}

export default function ContourFieldBackground({
  opacity = 0.03,
  color = "var(--hero-signal)",
}: ContourFieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Generate contour field using layered sine waves
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    // Get color values from CSS variable (default to blue signal)
    const styleColor = getComputedStyle(document.documentElement).getPropertyValue(color).trim();
    const [r, g, b] = styleColor.startsWith("#")
      ? hexToRgb(styleColor)
      : [127, 156, 255]; // fallback to signal blue

    const scale = 0.01;
    const layers = 3;
    const amplitude = 60;

    for (let i = 0; i < data.length; i += 4) {
      const pixelIndex = i / 4;
      const x = pixelIndex % canvas.width;
      const y = Math.floor(pixelIndex / canvas.width);

      // Normalized coordinates
      const nx = (x / canvas.width) * 2 - 1;
      const ny = (y / canvas.height) * 2 - 1;

      // Multiple sine layers create contour effect
      let contourValue = 0;
      for (let layer = 0; layer < layers; layer++) {
        const freq = 1 + layer * 0.7;
        const angle = Math.atan2(ny, nx);
        const rad = Math.sqrt(nx * nx + ny * ny);

        contourValue += Math.sin(rad * freq * 8 + angle * 2) * Math.cos(x * scale * (1 + layer * 0.3)) * 0.7;
        contourValue += Math.sin(y * scale * (1 + layer * 0.3)) * 0.5;
      }

      // Normalize to 0-255
      const brightness = Math.floor(((contourValue + 1.5) / 3) * amplitude);

      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
      data[i + 3] = Math.min(255, Math.max(0, brightness)) * (opacity ?? 0.03);
    }

    ctx.putImageData(imageData, 0, 0);
  }, [opacity, color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        opacity: opacity,
      }}
    />
  );
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [127, 156, 255];
}

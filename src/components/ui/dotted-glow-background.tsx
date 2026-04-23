"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/src/lib/utils";

interface Dot {
  x: number;
  y: number;
  opacity: number;
  target: number;
  speed: number;
}

interface DottedGlowBackgroundProps {
  className?: string;
  opacity?: number;
  gap?: number;
  radius?: number;
  colorVar?: string;
  glowColorVar?: string;
  speedMin?: number;
  speedMax?: number;
  speedScale?: number;
}

export function DottedGlowBackground({
  className,
  opacity = 0.5,
  gap = 16,
  radius = 1.5,
  colorVar = "--color-mahogany-soft",
  glowColorVar = "--color-gold-leaf",
  speedMin = 0.2,
  speedMax = 1.4,
  speedScale = 1,
}: DottedGlowBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let dots: Dot[] = [];

    const getColor = (varName: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || "#4a2e20";

    const buildDots = (w: number, h: number) => {
      dots = [];
      for (let x = 0; x <= w; x += gap) {
        for (let y = 0; y <= h; y += gap) {
          const speed =
            (speedMin + Math.random() * (speedMax - speedMin)) * speedScale * 0.008;
          dots.push({ x, y, opacity: Math.random(), target: Math.random(), speed });
        }
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      buildDots(w, h);
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const dotColor = getColor(colorVar);
      const glowColor = getColor(glowColorVar);

      for (const dot of dots) {
        if (Math.abs(dot.opacity - dot.target) < dot.speed) {
          dot.target = Math.random();
        } else {
          dot.opacity += dot.opacity < dot.target ? dot.speed : -dot.speed;
        }

        const glowing = dot.opacity > 0.72;
        ctx.globalAlpha = dot.opacity * opacity;
        ctx.shadowBlur = glowing ? 10 : 0;
        ctx.shadowColor = glowing ? glowColor : "transparent";
        ctx.fillStyle = glowing ? glowColor : dotColor;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [opacity, gap, radius, colorVar, glowColorVar, speedMin, speedMax, speedScale]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 size-full", className)}
    />
  );
}

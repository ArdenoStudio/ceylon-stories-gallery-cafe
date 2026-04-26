'use client';

import { useEffect, useRef } from 'react';

type Props = {
  color?: string;
  count?: number;
  className?: string;
};

export function FallingLines({ color = '#c9a25a', count = 18, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let w = 0;
    let h = 0;

    type Line = { x: number; y: number; len: number; speed: number; opacity: number };
    let lines: Line[] = [];

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
      lines = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h * 2 - h,
        len: 40 + Math.random() * 80,
        speed: 0.4 + Math.random() * 0.8,
        opacity: 0.08 + Math.random() * 0.18,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const l of lines) {
        const grad = ctx.createLinearGradient(l.x, l.y, l.x, l.y + l.len);
        grad.addColorStop(0, `${color}00`);
        grad.addColorStop(0.5, `${color}${Math.round(l.opacity * 255).toString(16).padStart(2, '0')}`);
        grad.addColorStop(1, `${color}00`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(l.x, l.y + l.len);
        ctx.stroke();
        l.y += l.speed;
        if (l.y > h + l.len) l.y = -l.len * 2;
      }
      raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [color, count]);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}

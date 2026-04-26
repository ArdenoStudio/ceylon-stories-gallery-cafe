'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

function parseColorToRGB(cssColor: string): string {
  if (typeof window === 'undefined') return 'rgb(42, 24, 16)';
  try {
    const el = document.createElement('div');
    el.style.color = cssColor;
    el.style.display = 'none';
    document.body.appendChild(el);
    const computed = window.getComputedStyle(el).color;
    document.body.removeChild(el);
    return computed || 'rgb(42, 24, 16)';
  } catch {
    return 'rgb(42, 24, 16)';
  }
}

function withOpacity(rgb: string, opacity: number): string {
  const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return rgb;
  return `rgba(${m[1]},${m[2]},${m[3]},${opacity})`;
}

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  maxOpacity?: number;
  text?: string;
  fontSize?: number;
  fontWeight?: number | string;
  fontFamily?: string;
}

export function FlickeringGrid({
  squareSize = 3,
  gridGap = 3,
  flickerChance = 0.2,
  color = '#2a1810',
  width,
  height,
  className,
  maxOpacity = 0.15,
  text = '',
  fontSize = 120,
  fontWeight = 400,
  fontFamily = '"Fraunces Variable", Georgia, serif',
  ...props
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const parsedColor = useMemo(() => parseColorToRGB(color), [color]);

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      textMask: Uint8Array,
    ) => {
      ctx.clearRect(0, 0, w, h);
      const dpr = window.devicePixelRatio || 1;
      const sw = squareSize * dpr;
      const sh = squareSize * dpr;
      const step = (squareSize + gridGap) * dpr;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const idx = i * rows + j;
          const opacity = squares[idx];
          const finalOpacity = textMask[idx]
            ? Math.min(1, opacity * 3 + 0.4)
            : opacity;
          ctx.fillStyle = withOpacity(parsedColor, finalOpacity);
          ctx.fillRect(i * step, j * step, sw, sh);
        }
      }
    },
    [parsedColor, squareSize, gridGap],
  );

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, w: number, h: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const cols = Math.ceil(w / (squareSize + gridGap));
      const rows = Math.ceil(h / (squareSize + gridGap));
      const total = cols * rows;

      const squares = new Float32Array(total);
      for (let i = 0; i < total; i++) squares[i] = Math.random() * maxOpacity;

      // Build text mask once — one getImageData call total
      const textMask = new Uint8Array(total);
      if (text) {
        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = canvas.width;
        maskCanvas.height = canvas.height;
        const maskCtx = maskCanvas.getContext('2d', { willReadFrequently: true });
        if (maskCtx) {
          maskCtx.save();
          maskCtx.scale(dpr, dpr);
          maskCtx.fillStyle = 'white';
          maskCtx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
          maskCtx.textAlign = 'center';
          maskCtx.textBaseline = 'middle';
          maskCtx.fillText(text, w / 2, h / 2);
          maskCtx.restore();

          // Read entire mask in one call
          const allPixels = maskCtx.getImageData(0, 0, canvas.width, canvas.height).data;
          const sw = Math.max(1, Math.round(squareSize * dpr));
          const sh = Math.max(1, Math.round(squareSize * dpr));
          const step = Math.round((squareSize + gridGap) * dpr);

          for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
              const px = i * step;
              const py = j * step;
              let hasText = false;
              outer: for (let dy = 0; dy < sh; dy++) {
                for (let dx = 0; dx < sw; dx++) {
                  const pixelIdx = ((py + dy) * canvas.width + (px + dx)) * 4;
                  if (allPixels[pixelIdx] > 0) { hasText = true; break outer; }
                }
              }
              textMask[i * rows + j] = hasText ? 1 : 0;
            }
          }
        }
      }

      return { cols, rows, squares, textMask, dpr };
    },
    [squareSize, gridGap, maxOpacity, text, fontSize, fontWeight, fontFamily],
  );

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) squares[i] = Math.random() * maxOpacity;
      }
    },
    [flickerChance, maxOpacity],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let gridParams: ReturnType<typeof setupCanvas>;

    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth;
      const newHeight = height || container.clientHeight;
      setCanvasSize({ width: newWidth, height: newHeight });
      gridParams = setupCanvas(canvas, newWidth, newHeight);
    };

    updateCanvasSize();

    let lastTime = 0;
    const animate = (time: number) => {
      if (!isInView) return;
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;
      updateSquares(gridParams.squares, deltaTime);
      drawGrid(
        ctx,
        canvas.width,
        canvas.height,
        gridParams.cols,
        gridParams.rows,
        gridParams.squares,
        gridParams.textMask,
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    if (isInView) animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView]);

  return (
    <div ref={containerRef} className={`h-full w-full ${className ?? ''}`} {...props}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{ width: canvasSize.width, height: canvasSize.height }}
      />
    </div>
  );
}

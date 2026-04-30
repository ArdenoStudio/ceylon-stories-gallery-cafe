'use client';

import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let raf: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.14);
      ringY = lerp(ringY, mouseY, 0.14);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }

      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const node = target.closest('a, button, [data-cursor-text], img');
      if (node) {
        setIsHovering(true);
        if (node.hasAttribute('data-cursor-text')) {
          setHoverText(node.getAttribute('data-cursor-text') || '');
        } else if (node.tagName === 'IMG') {
          setHoverText('VIEW');
        } else if (node.closest('a') && node.closest('.blog-card')) {
          setHoverText('READ');
        } else {
          setHoverText('');
        }
      } else {
        setIsHovering(false);
        setHoverText('');
      }
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  if (isTouch) return null;

  const ringSize = isHovering ? 48 : 28;
  const dotSize = isHovering ? 6 : 5;

  return (
    <>
      <style>{`* { cursor: none !important; } *:focus-visible { outline: 2px solid #6B2D1F !important; outline-offset: 3px !important; }`}</style>

      {/* Ring — lerp-tracked, size via CSS transition */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border border-mahogany/40 pointer-events-none z-[200]"
        style={{
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          borderColor: isHovering ? 'rgba(107,45,31,0.7)' : 'rgba(107,45,31,0.4)',
          transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), margin 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.35s',
        }}
      />

      {/* Dot — instant follow */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[200] flex items-center"
        style={{ marginLeft: -dotSize / 2, marginTop: -dotSize / 2 }}
      >
        <div
          className="bg-mahogany rounded-full"
          style={{
            width: dotSize,
            height: dotSize,
            opacity: isHovering ? 0.5 : 1,
            transition: 'width 0.35s, height 0.35s, opacity 0.35s',
          }}
        />
        {hoverText && (
          <span
            className="absolute left-full whitespace-nowrap text-editorial text-[9px] tracking-widest uppercase text-mahogany bg-cream-page/80 px-2 py-0.5"
            style={{ marginLeft: 14 }}
          >
            {hoverText}
          </span>
        )}
      </div>
    </>
  );
}

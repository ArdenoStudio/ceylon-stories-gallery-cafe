import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  
  // Use refs for values that change constantly to avoid re-renders
  const mousePos = useRef({ x: -100, y: -100 }); // Initialize off-screen
  const ringPos = useRef({ x: -100, y: -100 });
  
  useEffect(() => {
    // Only enable on fine pointer devices (desktop)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;
    
    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) setHasMoved(true);
      
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Update dot immediately for responsiveness
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseDown = () => {
      if (ringRef.current) ringRef.current.classList.add('scale-75');
    };
    
    const onMouseUp = () => {
      if (ringRef.current) ringRef.current.classList.remove('scale-75');
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check for clickable elements or carousel drag areas
      if (target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.closest('a') || 
          target.closest('button') ||
          target.closest('.cursor-hover')) {
        ringRef.current?.classList.add('cursor-hover-active');
      }
      
      if (target.closest('.cursor-drag')) {
        ringRef.current?.classList.add('cursor-drag-active');
        ringRef.current?.classList.remove('cursor-hover-active'); // Drag takes precedence
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.closest('a') || 
          target.closest('button') ||
          target.closest('.cursor-hover')) {
        ringRef.current?.classList.remove('cursor-hover-active');
      }
      
      if (target.closest('.cursor-drag')) {
        ringRef.current?.classList.remove('cursor-drag-active');
      }
    };

    const animateRing = () => {
      // Linear interpolation (LERP) for smooth trailing
      const ease = 0.15;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      
      requestRef.current = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    
    requestRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [hasMoved]);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        body, a, button, input, textarea, select {
          cursor: none !important;
        }
      `}</style>
      
      {/* Small Gold Dot - follows cursor exactly */}
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-brand-gold rounded-full pointer-events-none z-[10000] -ml-1 -mt-1 shadow-[0_0_10px_rgba(212,175,55,0.8)]"
        style={{ opacity: hasMoved ? 1 : 0 }}
      />
      
      {/* Trailing Ring - follows with delay */}
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-brand-gold/50 rounded-full pointer-events-none z-[9999] -ml-4 -mt-4 transition-all duration-300 ease-out flex items-center justify-center"
        style={{ opacity: hasMoved ? 1 : 0 }}
      >
        {/* Drag Hint (hidden by default) */}
        <div className="opacity-0 transition-opacity duration-300 text-[8px] font-bold uppercase tracking-widest text-brand-gold drag-text">
          Drag
        </div>
      </div>
      
      <style>{`
        .cursor-hover-active {
          width: 48px;
          height: 48px;
          margin-left: -24px;
          margin-top: -24px;
          background-color: rgba(212, 175, 55, 0.1);
          border-color: rgba(212, 175, 55, 0.8);
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
        }
        
        .cursor-drag-active {
          width: 64px;
          height: 64px;
          margin-left: -32px;
          margin-top: -32px;
          background-color: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.8);
          transform: scale(1.1);
        }
        
        .cursor-drag-active .drag-text {
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, animate } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const items = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1576092762791-dd9e2220afa1?q=80&w=2670&auto=format&fit=crop',
    title: 'The Artisanal Pour',
    subtitle: 'Signature Dilmah Reserve'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?q=80&w=2670&auto=format&fit=crop',
    title: 'Curated Patisserie',
    subtitle: 'Freshly Baked Daily'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1606168094336-48f07be730bd?q=80&w=2670&auto=format&fit=crop',
    title: 'Cinnamon & Spice',
    subtitle: 'Heritage Brews'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2672&auto=format&fit=crop',
    title: 'Precision Espresso',
    subtitle: 'Single Origin Beans'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2670&auto=format&fit=crop',
    title: 'Evening Shisha',
    subtitle: 'The Lounge Experience'
  }
];

export function FramerCarousel() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      const targetX = -index * containerWidth;

      animate(x, targetX, {
        type: 'spring',
        stiffness: 250,
        damping: 35,
        mass: 1.2
      });
    }
  }, [index, x]);

  return (
    <div className='w-full mx-auto relative group'>
      <div className='flex flex-col gap-6 md:gap-8'>
        
        {/* Gallery Stage */}
        <div className='relative overflow-hidden' ref={containerRef}>
          <motion.div className='flex' style={{ x }}>
            {items.map((item) => (
              <div key={item.id} className='shrink-0 w-full h-[50dvh] md:h-[75dvh] lg:h-[800px] relative px-1'>
                <div className="w-full h-full relative overflow-hidden bg-cream-paper">
                  <img
                    src={item.url}
                    alt={item.title}
                    className='w-full h-full object-cover select-none pointer-events-none grayscale-[0.2] contrast-[1.1] opacity-90'
                    draggable={false}
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle vignette overlay */}
                  <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(42,24,16,0.3)] pointer-events-none mix-blend-multiply" />
                  
                  {/* Title block overlay */}
                  <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex flex-col gap-2 z-20">
                     <span className="font-editorial text-[10px] tracking-[0.25em] uppercase text-cream-page/80">
                        {item.subtitle}
                     </span>
                     <span className="font-display text-3xl md:text-5xl text-cream-page tracking-tight max-w-md">
                        {item.title}
                     </span>
                  </div>
                  {/* Dark gradient behind text for legibility */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-mahogany/80 to-transparent pointer-events-none" />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Navigation Buttons */}
          <motion.button
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            className={`absolute left-6 md:left-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10 backdrop-blur-md border 
              ${
                index === 0
                  ? 'opacity-0 cursor-not-allowed border-transparent text-transparent pointer-events-none'
                  : 'bg-cream-page/10 border-cream-page/30 text-cream-page hover:bg-cream-page hover:text-mahogany opacity-0 group-hover:opacity-100'
              }`}
          >
            <ChevronLeft strokeWidth={1} className='w-5 h-5' />
          </motion.button>

          <motion.button
            disabled={index === items.length - 1}
            onClick={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
            className={`absolute right-6 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10 backdrop-blur-md border
              ${
                index === items.length - 1
                  ? 'opacity-0 cursor-not-allowed border-transparent text-transparent pointer-events-none'
                  : 'bg-cream-page/10 border-cream-page/30 text-cream-page hover:bg-cream-page hover:text-mahogany opacity-0 group-hover:opacity-100'
              }`}
          >
            <ChevronRight strokeWidth={1} className='w-5 h-5' />
          </motion.button>
        </div>
        
        {/* Awwwards specific details line: Fractional Progress & Title */}
        <div className="flex justify-between items-center px-2 md:px-0 opacity-80 mix-blend-color-burn">
          <div className="font-editorial text-[10px] md:text-[11px] tracking-[0.2em] font-medium uppercase text-mahogany">
            {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </div>
          
          {/* Replaced generic dots with a refined progression system */}
          <div className='flex gap-2 items-center'>
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  i === index ? 'w-10 h-[2px] bg-clay-warm' : 'w-2 h-[1px] bg-mahogany/30 hover:bg-mahogany/60 hover:w-4'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { Motif } from './heritage/Motif';

export default function Story() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={sectionRef} id="story" className="relative w-full bg-mahogany text-cream-page py-[clamp(120px,20vh,300px)] px-6 overflow-hidden">
      <div className="absolute inset-0 bg-mahogany mix-blend-multiply opacity-50 z-0" />
      <div className="batik-line absolute top-0 left-0 bg-white/20 z-0" />
      
      {/* Oversized Background Text - Brutalist touch with slow drift */}
      <div className="absolute top-10 left-[-5%] font-display italic text-[30vw] text-clay-rust/20 pointer-events-none select-none z-0 drift-slow">
        1925
      </div>

      {/* Botanical accents */}
      <Motif
        name="fern-frond"
        className="pointer-events-none absolute top-12 right-8 h-32 w-32 md:h-48 md:w-48 text-gold-leaf/25 z-0 scale-x-[-1]"
      />
      <Motif
        name="tea-leaf"
        className="pointer-events-none absolute bottom-16 left-10 h-28 w-28 text-clay-warm/30 z-0 hidden md:block"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6 items-center">
        
        {/* Left Content / Typography */}
        <div className="md:col-span-5 md:col-start-2 flex flex-col justify-center items-start pt-10 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-editorial text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-gold-leaf mb-12 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-gold-leaf/50" /> 02 — THE FOUNDATION
            </p>
            <h2 className="font-display font-light text-cream-page text-[clamp(44px,6vw,80px)] leading-[0.9] tracking-[-0.02em] mb-10">
              A room where <br/> <i className="text-clay-warm pr-2">slowness</i> <br/> is the point.
            </h2>
            <div className="pl-6 border-l border-gold-leaf/30 space-y-6 max-w-[40ch]">
              <p className="font-body text-cream-paper/80 text-sm leading-[1.8]">
                Ceylon Stories is a gallery, a tea house, and a quiet rebellion against the speed of the city. Founded in 2025 by Shazi Salim and Rumaiz Ramzy, we are a love letter to the island.
              </p>
              <p className="font-body text-cream-paper/80 text-sm leading-[1.8]">
                Every month a new artist takes our walls. Every cup of Dilmah is poured deliberately, served at the pace it deserves.
              </p>
            </div>
            
            <div className="mt-16">
              <Link href="/our-story" className="text-link-arrow text-cream-page group flex items-center gap-2">
                <span className="w-10 h-10 rounded-full border border-gold-leaf/30 flex items-center justify-center group-hover:bg-gold-leaf/10 transition-colors">
                  <span className="arrow text-gold-leaf text-lg">→</span>
                </span>
                <span className="font-editorial uppercase text-[10px] tracking-[0.2em] relative ml-2 hover-underline-gold">
                  READ THE FULL STORY
                </span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Image Container overlapping */}
        <div className="md:col-span-5 relative mt-12 md:mt-0 lg:-ml-6">
          <motion.div
            className="w-full aspect-[3/4] md:aspect-[4/5] relative overflow-hidden"
            initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
            whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=1000&auto=format&fit=crop"
              alt="Colonial verandah space with terracotta floor tiles"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover photo-heritage-deep"
              style={{ y: yImage, scale: 1.1 }}
            />
          </motion.div>
          {/* Vertical Text Element */}
          <div className="absolute top-10 -right-6 md:-right-12 hidden md:block">
            <p className="font-editorial text-[9px] tracking-[0.3em] uppercase text-gold-leaf/80 mix-blend-screen" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              EST. 2025 — COLOMBO, SL
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

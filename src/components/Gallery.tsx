'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';
import { FramerCarousel } from './ui/framer-carousel';

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <section className="relative w-full bg-mahogany text-cream-page overflow-hidden">
      <div className="batik-line absolute top-0 left-0 bg-white/20" />
      <div className="flex flex-col lg:flex-row min-h-[100vh]">
        
        {/* Left - Artwork */}
        <div className="w-full lg:w-[60%] flex items-center justify-center p-8 lg:p-16 relative">
          <div className="absolute inset-0 bg-cream-paper paper-texture opacity-5 pointer-events-none" />
          <motion.div
            className="w-full relative max-w-4xl shadow-ink"
            initial={{ clipPath: "inset(8% 8% 8% 8%)", scale: 1.08 }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1544865582-73a76efc255d?q=80&w=1200&auto=format&fit=crop"
              alt="Contemporary Sri Lankan abstract painting"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>

        {/* Right - Details */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center px-8 py-16 lg:px-16 relative">
          <motion.div
            ref={containerRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            {/* Label */}
            <motion.p variants={itemVariants} className="font-editorial text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-gold-leaf mb-6">
              THE GALLERY — APRIL 2026
            </motion.p>
            
            {/* Artist Name */}
            <motion.h2 variants={itemVariants} className="font-display font-light text-[clamp(48px,6vw,96px)] leading-[0.95] tracking-[-0.02em] mb-4 text-cream-page">
              Anoli <br /> Perera
            </motion.h2>
            
            {/* Artwork Details */}
            <motion.p variants={itemVariants} className="font-editorial text-xs tracking-wider uppercase text-cream-paper/70 mb-8 mt-4">
              Oil on Canvas / 120 × 180 cm / 2026
            </motion.p>
            
            {/* Statement */}
            <motion.p variants={itemVariants} className="font-body text-base leading-[1.7] max-w-[400px] text-cream-paper/90 mb-12">
              Perera's new collection explores the silent histories held within colonial masonry. Using layered pigment and deliberate abrasion, she removes the boundary between the island's botanical life and its built environment.
            </motion.p>
            
            {/* Links */}
            <motion.div variants={itemVariants} className="flex flex-col gap-6 items-start">
              <a href="#collection" className="text-link-arrow text-cream-page">
                <span className="font-editorial uppercase text-[11px] tracking-[0.18em] hover-underline-gold relative">
                  VIEW THE COLLECTION
                </span>
                <span className="arrow text-gold-leaf">→</span>
              </a>
              <a href="#inquiries" className="text-link-arrow text-cream-page">
                <span className="font-editorial uppercase text-[11px] tracking-[0.18em] hover-underline-gold relative">
                  PURCHASE INQUIRIES
                </span>
                <span className="arrow text-gold-leaf">→</span>
              </a>
            </motion.div>

          </motion.div>
        </div>
      </div>

    {/* MENU SHOWCASE - Framer Carousel Integration */}
      <div className="w-full bg-cream-page py-24 md:py-32 px-6 md:px-[6%] lg:px-12 relative border-t border-mahogany/10">
        <div className="absolute inset-0 pointer-events-none paper-texture opacity-30 mix-blend-color-burn" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 relative z-10 w-full max-w-7xl mx-auto">
          <h2 className="font-display font-light text-4xl md:text-6xl lg:text-[80px] text-mahogany tracking-tight leading-[0.9]">
            The <br/>
            <span className="italic pl-0 md:pl-8">Menu</span>
          </h2>
          <div className="mt-8 md:mt-0 flex flex-col items-start md:items-end gap-3 sm:gap-4 max-w-sm text-left md:text-right">
            <span className="font-editorial text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-clay-deep border-b border-clay-deep/30 pb-2">
              Culinary Signatures
            </span>
            <p className="font-body text-sm text-mahogany-soft/80 leading-relaxed">
              Experience our curated selection of Dilmah reserve teas, artisanal pastries, and late-night shisha pairings crafted for the Kolpetty coast.
            </p>
          </div>
        </div>

        {/* The Carousel */}
        <div className="max-w-7xl mx-auto">
          <FramerCarousel />
        </div>
      </div>

      <style>{`
        .hover-underline-gold::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 1px;
          bottom: -2px;
          left: 0;
          background-color: var(--color-gold-leaf);
          transform-origin: bottom right;
          transition: transform 0.4s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .hover-underline-gold:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
      `}</style>
    </section>
  );
}

'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative w-full h-[100dvh] overflow-hidden">

      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=2000&auto=format&fit=crop"
          alt="Ceylon Stories Gallery Café interior"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        {/* Layered overlays for mood */}
        <div className="absolute inset-0 bg-mahogany/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-mahogany/30 via-transparent to-mahogany/70" />
        <div className="absolute inset-0 paper-texture opacity-[0.06] pointer-events-none" />
      </motion.div>

      {/* Top eyebrow */}
      <motion.div
        className="absolute top-[clamp(120px,14vh,160px)] left-0 right-0 flex justify-center z-10"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-editorial text-[10px] tracking-[0.3em] uppercase text-gold-leaf/80 flex items-center gap-4">
          <span className="w-6 h-[1px] bg-gold-leaf/50" />
          Colombo, Sri Lanka &nbsp;·&nbsp; Gallery Café
          <span className="w-6 h-[1px] bg-gold-leaf/50" />
        </p>
      </motion.div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">

        {/* Headline */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            className="font-display font-light text-cream-page text-[clamp(52px,9vw,130px)] leading-[0.9] tracking-[-0.02em]"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Tea. Art.
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h1
            className="font-display font-light italic text-clay-warm text-[clamp(52px,9vw,130px)] leading-[0.9] tracking-[-0.02em]"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Slow down.
          </motion.h1>
        </div>

        {/* Rule + Subtitle */}
        <motion.div
          className="flex items-center gap-5 mb-10"
          initial={{ opacity: 0, scaleX: 0.6 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="w-12 h-[1px] bg-cream-page/30" />
          <p className="font-editorial text-[10px] tracking-[0.25em] uppercase text-cream-page/60">
            Marine Drive &nbsp;·&nbsp; Colombo 03
          </p>
          <span className="w-12 h-[1px] bg-cream-page/30" />
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="https://wa.me/94770000000?text=Hi%20Ceylon%20Stories%2C%20I%27d%20like%20to%20make%20a%20reservation."
            target="_blank"
            rel="noreferrer"
            className="font-editorial text-[10px] tracking-[0.22em] uppercase bg-cream-page text-mahogany px-8 py-4 hover:bg-gold-leaf transition-colors duration-300 min-w-[180px] text-center"
          >
            Reserve a Table
          </a>
          <Link
            href="/menu"
            className="font-editorial text-[10px] tracking-[0.22em] uppercase border border-cream-page/40 text-cream-page px-8 py-4 hover:bg-cream-page/10 hover:border-cream-page/70 transition-colors duration-300 min-w-[180px] text-center"
          >
            Explore the Menu
          </Link>
        </motion.div>
      </div>

      {/* Bottom status bar */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 flex justify-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <div className="flex items-center gap-4 font-editorial text-[9px] tracking-[0.22em] uppercase text-cream-page/40">
          <span>Colombo · 28°C</span>
          <span>·</span>
          <span>Steeping Now: Silver Tips</span>
          <span className="hidden md:inline">·</span>
          <span className="hidden md:inline">Open Daily · 8 AM – Late</span>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <span className="font-editorial text-[8px] tracking-[0.2em] uppercase text-cream-page/30 [writing-mode:vertical-lr]">
          Scroll
        </span>
        <motion.div
          className="w-[1px] h-10 bg-cream-page/20 origin-top"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

    </section>
  );
}

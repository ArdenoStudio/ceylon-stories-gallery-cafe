'use client';

import type { Metadata } from 'next';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function OurStoryPage() {

  return (
    <>
      {/* Hero */}
      <section className="relative w-full min-h-[70svh] bg-mahogany text-cream-page flex items-end px-6 pb-20 pt-40 overflow-hidden">
        <div className="batik-line absolute top-0 left-0 bg-white/20" />
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <span className="absolute top-10 left-[-5%] font-display italic text-[28vw] text-mahogany-soft/15 leading-none">
            02
          </span>
        </div>
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-editorial text-[10px] tracking-[0.25em] uppercase text-gold-leaf mb-6 flex items-center gap-4"
          >
            <span className="w-8 h-[1px] bg-gold-leaf/50" /> 02 — OUR STORY
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light text-cream-page text-[clamp(52px,8vw,110px)] leading-[0.9] tracking-[-0.02em] max-w-3xl"
          >
            A love letter <br />
            <i className="text-clay-warm">to the island.</i>
          </motion.h1>
        </div>
      </section>

      {/* Founders */}
      <section className="relative w-full bg-cream-page py-[clamp(80px,12vh,160px)] px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-5 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-editorial text-[10px] tracking-[0.25em] uppercase text-clay-warm mb-8">
                The Founders
              </p>
              <h2 className="font-display font-light text-mahogany text-[clamp(36px,4.5vw,64px)] leading-[1] tracking-[-0.02em] mb-10">
                Shazi Salim <br />& Rumaiz Ramzy
              </h2>
              <div className="pl-6 border-l border-mahogany/20 space-y-6">
                <p className="font-body text-mahogany/70 text-sm leading-[1.8]">
                  Ceylon Stories was born from a shared conviction — that Colombo deserved a space where art, culture, and the ritual of a good cup of tea could coexist without noise. Shazi and Rumaiz opened the doors on Marine Drive in January 2025.
                </p>
                <p className="font-body text-mahogany/70 text-sm leading-[1.8]">
                  Shazi brings a background in Sri Lankan textile heritage and contemporary art curation. Rumaiz, a former chef with a decade in hospitality, leads the food and beverage programme — including the Dilmah tea experience that anchors the brand.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-6 md:col-start-7 relative">
            <motion.div
              className="w-full aspect-[4/5] overflow-hidden"
              initial={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}
              whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop"
                alt="Ceylon Stories founders in the gallery space"
                loading="lazy"
                className="w-full h-full object-cover photo-heritage"
                style={{ scale: 1.05 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Space */}
      <section className="relative w-full bg-mahogany text-cream-page py-[clamp(80px,12vh,160px)] px-6 overflow-hidden">
        <div className="batik-line absolute top-0 left-0 bg-white/20" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            className="w-full aspect-[3/4] overflow-hidden"
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop"
              alt="Interior of Ceylon Stories gallery cafe on Marine Drive"
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover photo-heritage-deep"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <p className="font-editorial text-[10px] tracking-[0.25em] uppercase text-gold-leaf mb-8">
              The Space
            </p>
            <h2 className="font-display font-light text-cream-page text-[clamp(36px,4vw,60px)] leading-[1] tracking-tight mb-10">
              9/6A, Marine Drive, <br /> Kolpetty.
            </h2>
            <div className="space-y-5 max-w-[38ch]">
              <p className="font-body text-cream-paper/75 text-sm leading-[1.8]">
                The building is colonial-era — thick walls, high ceilings, and floors that carry the memory of decades. We restored it without erasing it. The original terrazzo remains; the art hangs directly on the lime-plastered walls.
              </p>
              <p className="font-body text-cream-paper/75 text-sm leading-[1.8]">
                By day it is a gallery café. By evening, the lounge opens — shisha, dim light, and music at a volume that allows conversation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative w-full bg-cream-page py-[clamp(100px,14vh,180px)] px-6 overflow-hidden">
        {/* Subtle paper texture background */}
        <div className="paper-texture" />
        
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-editorial text-[10px] tracking-[0.25em] uppercase text-clay-warm mb-10">
              The Philosophy
            </p>
            <blockquote className="font-display font-light italic text-mahogany text-[clamp(32px,5vw,72px)] leading-[1.1] tracking-[-0.02em] max-w-4xl mx-auto">
              &ldquo;Slowness is not a deficiency. It is the entire point.&rdquo;
            </blockquote>
            <p className="font-body text-mahogany/55 text-sm leading-[1.9] max-w-[50ch] mx-auto mt-10">
              Every decision at Ceylon Stories — the menu, the artists we feature, the way the space is lit — is made to resist the instinct to rush. We are a deliberately unhurried place in a city that rarely stops.
            </p>
          </motion.div>

          {/* Architectural Detail Callouts */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ delay: 0.3, duration: 1 }}
            className="flex flex-wrap justify-center gap-10 md:gap-16 mt-6 mb-4"
          >
            {[
              { label: 'Original Terrazzo', detail: 'Floors from the 1940s, preserved.' },
              { label: 'Lime-Plastered Walls', detail: 'Art hangs directly on history.' },
              { label: 'Colonial Arches', detail: 'Restored, never replaced.' },
            ].map((item) => (
              <div key={item.label} className="text-center max-w-[16ch]">
                <p className="font-editorial text-[8px] tracking-[0.22em] uppercase text-clay-warm mb-1">{item.label}</p>
                <p className="font-body text-xs text-mahogany/40 leading-[1.6]">{item.detail}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Link
              href="/experience"
              className="font-editorial text-[10px] tracking-[0.2em] uppercase text-clay-deep inline-flex items-center gap-3 border border-mahogany/20 px-6 py-3 hover:bg-mahogany hover:text-cream-page transition-colors duration-500"
            >
              DISCOVER THE EXPERIENCE <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

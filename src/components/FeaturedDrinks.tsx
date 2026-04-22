'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import AnimatedDrinkStack from './ui/animate-card-animation';
import { BotanicalDivider } from './heritage/BotanicalDivider';
import { MotifCorner } from './heritage/MotifCorner';

export default function FeaturedDrinks() {
  return (
    <section className="relative w-full bg-mahogany py-[clamp(80px,12vh,160px)] px-6 overflow-hidden">
      <div className="batik-line absolute top-0 left-0 bg-white/20" />

      <MotifCorner motif="tea-leaf" position="tr" size={140} className="text-cream-page/10" />
      <MotifCorner motif="fern-frond" position="bl" size={110} className="text-cream-page/10 hidden md:block" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-editorial text-[10px] tracking-[0.25em] uppercase text-gold-leaf mb-4">
              Curated Sips
            </p>
            <h2 className="font-display font-light text-cream-page text-[clamp(40px,5.5vw,80px)] leading-[0.9] tracking-[-0.02em]">
              Featured <br className="hidden md:block" />
              <i className="text-clay-warm">Drinks</i>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="flex flex-col items-start md:items-end gap-3"
          >
            <p className="font-body text-sm text-cream-page/60 leading-relaxed max-w-[260px] md:text-right">
              From cold brews steeped overnight to teas harvested at dawn — our drinks are as considered as our food.
            </p>
            <Link
              href="/menu"
              className="font-editorial text-[10px] tracking-[0.2em] uppercase text-gold-leaf inline-flex items-center gap-2 hover:gap-3 transition-all duration-300"
            >
              VIEW FULL MENU <span>→</span>
            </Link>
          </motion.div>
        </div>

        <BotanicalDivider motif="tea-leaf" tone="warm" className="mb-12 md:mb-16" />

        {/* Animated Card Stack */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatedDrinkStack />
        </motion.div>
      </div>
    </section>
  );
}

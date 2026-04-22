'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

const items = [
  {
    tag: 'NEW',
    name: 'Cardamom Cold Brew',
    description: 'Single-origin Ceylon black steeped cold for 18 hours, finished with hand-crushed cardamom and a sliver of coconut cream.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&auto=format&fit=crop',
    category: 'Beverages',
  },
  {
    tag: 'SEASONAL',
    name: 'Mango & Chilli Granita',
    description: "Alphonso mango purée set with a whisper of bird's eye chilli. Served in a chilled terracotta cup. Only while mango season lasts.",
    image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?q=80&w=600&auto=format&fit=crop',
    category: 'Desserts',
  },
  {
    tag: 'FEATURED',
    name: 'Dilmah Silver Tips Reserve',
    description: 'The rarest leaves from Nuwara Eliya — harvested once a year at dawn. Steeped in water at exactly 75°C. No additions.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop',
    category: 'Tea',
  },
  {
    tag: 'NEW',
    name: 'Terracotta Shakshuka',
    description: 'Two eggs poached in a smoky tomato and roasted red pepper sauce, served in a handmade clay pot with sourdough from our morning batch.',
    image: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?q=80&w=600&auto=format&fit=crop',
    category: 'Food',
  },
];

export default function WhatIsNew() {
  return (
    <section className="relative w-full bg-cream-page py-[clamp(80px,12vh,160px)] px-6">
      <div className="batik-line absolute top-0 left-0" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-editorial text-[10px] tracking-[0.25em] uppercase text-clay-warm mb-4">
              On The Menu Now
            </p>
            <h2 className="font-display font-light text-mahogany text-[clamp(40px,5.5vw,80px)] leading-[0.9] tracking-[-0.02em]">
              What&apos;s <br className="hidden md:block" />
              <i>New</i>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="flex flex-col items-start md:items-end gap-3"
          >
            <p className="font-body text-sm text-mahogany/60 leading-relaxed max-w-[260px] md:text-right">
              New additions, seasonal specials, and featured items — updated as the kitchen evolves.
            </p>
            <Link
              href="/menu"
              className="font-editorial text-[10px] tracking-[0.2em] uppercase text-clay-deep inline-flex items-center gap-2 hover:gap-3 transition-all duration-300"
            >
              VIEW FULL MENU <span>→</span>
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              className="group flex flex-col"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.9, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Image */}
              <div className="w-full aspect-[4/5] overflow-hidden relative mb-5">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-[0.15] sepia-[0.1] transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute top-3 left-3 font-editorial text-[9px] tracking-[0.2em] uppercase bg-cream-page text-mahogany px-2 py-1">
                  {item.tag}
                </span>
              </div>

              {/* Text */}
              <p className="font-editorial text-[9px] tracking-[0.2em] uppercase text-clay-warm mb-2">
                {item.category}
              </p>
              <h3 className="font-display text-[22px] text-mahogany leading-[1.1] mb-3 transition-all duration-500 group-hover:italic">
                {item.name}
              </h3>
              <p className="font-body text-[13px] text-mahogany/60 leading-[1.7]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

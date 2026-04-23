'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { MenuItemCard } from './ui/menu-item-card';
import { BotanicalDivider } from './heritage/BotanicalDivider';
import { MotifCorner } from './heritage/MotifCorner';

const items = [
  {
    tag: 'NEW',
    name: 'Cardamom Cold Brew',
    description: 'Ceylon black steeped cold for 18 hours, finished with hand-crushed cardamom and coconut cream.',
    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&auto=format&fit=crop',
    isVegetarian: true,
    price: 850,
    originalPrice: 850,
    quantity: 'Serves 1',
    prepTimeInMinutes: 5,
  },
  {
    tag: 'SEASONAL',
    name: 'Mango & Chilli Granita',
    description: "Alphonso mango purée set with a whisper of bird's eye chilli. Served in a chilled terracotta cup.",
    imageUrl: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?q=80&w=600&auto=format&fit=crop',
    isVegetarian: true,
    price: 950,
    originalPrice: 1100,
    quantity: 'Serves 1',
    prepTimeInMinutes: 8,
  },
  {
    tag: 'FEATURED',
    name: 'Dilmah Silver Tips Reserve',
    description: "Nuwara Eliya's rarest leaves harvested once a year at dawn. Steeped at exactly 75°C.",
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop',
    isVegetarian: true,
    price: 1450,
    originalPrice: 1450,
    quantity: 'Pot for 1',
    prepTimeInMinutes: 6,
  },
  {
    tag: 'NEW',
    name: 'Terracotta Shakshuka',
    description: 'Two eggs poached in smoky tomato and roasted red pepper, served in a handmade clay pot with sourdough.',
    imageUrl: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?q=80&w=600&auto=format&fit=crop',
    isVegetarian: true,
    price: 1650,
    originalPrice: 1650,
    quantity: 'Serves 1',
    prepTimeInMinutes: 18,
  },
];

export default function WhatIsNew() {
  return (
    <section className="relative w-full bg-cream-page py-[clamp(80px,12vh,160px)] px-6 overflow-hidden">
      <div className="batik-line absolute top-0 left-0" />

      <MotifCorner motif="fern-frond" position="tr" size={140} className="text-clay-warm/25" />
      <MotifCorner motif="tea-leaf" position="bl" size={110} className="text-clay-warm/25 hidden md:block" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
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
            viewport={{ once: true, margin: '-10%' }}
            transition={{ delay: 0.3, duration: 1 }}
            className="flex flex-col items-start md:items-end gap-3"
          >
            <p className="font-body text-sm text-mahogany/60 leading-relaxed max-w-[260px] md:text-right">
              New additions, seasonal specials, and featured items — updated as the kitchen evolves.
            </p>
            <Link
              href="/menu"
              className="font-editorial text-[10px] tracking-[0.2em] uppercase text-clay-deep inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 hover-underline-gold"
            >
              VIEW FULL MENU <span>→</span>
            </Link>
          </motion.div>
        </div>

        <BotanicalDivider motif="tea-leaf" tone="warm" className="mb-12 md:mb-16" />

        {/* Asymmetrical Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Hero Card — Full-Width Feature */}
          <motion.div
            className="lg:col-span-7 relative overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden">
              <img
                src={items[0].imageUrl}
                alt={items[0].name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover photo-heritage transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mahogany/70 via-mahogany/20 to-transparent" />

              {/* Tag */}
              <div className="absolute top-5 left-5">
                <span className="font-editorial text-[8px] tracking-[0.2em] uppercase text-cream-page border border-cream-page/40 px-2 py-0.5 bg-mahogany/60 backdrop-blur-sm">
                  {items[0].tag}
                </span>
              </div>

              {/* Overlaid Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <p className="font-editorial text-[9px] tracking-[0.18em] uppercase text-cream-page/60 mb-2">
                  {items[0].quantity} · {items[0].prepTimeInMinutes} mins
                </p>
                <h3 className="font-display text-cream-page text-[clamp(28px,3.5vw,44px)] leading-[1.05] tracking-tight mb-3">
                  {items[0].name}
                </h3>
                <p className="font-body text-sm text-cream-page/70 leading-[1.7] max-w-md mb-4">
                  {items[0].description}
                </p>
                <p className="font-display text-cream-page text-xl">
                  LKR {items[0].price.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Remaining items — 5-column stacked */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 md:gap-8">
            {items.slice(1).map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.9, delay: (idx + 1) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <MenuItemCard
                  imageUrl={item.imageUrl}
                  isVegetarian={item.isVegetarian}
                  name={item.name}
                  price={item.price}
                  originalPrice={item.originalPrice}
                  quantity={item.quantity}
                  prepTimeInMinutes={item.prepTimeInMinutes}
                  tag={item.tag}
                  onAdd={() => {}}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

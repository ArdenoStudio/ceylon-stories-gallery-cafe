'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { MenuItemCard } from './ui/menu-item-card';
import { BotanicalDivider } from './heritage/BotanicalDivider';
import { MotifCorner } from './heritage/MotifCorner';
import { useCart } from './CartContext';
import { useCartUI } from './CartUI';

const items = [
  {
    tag: 'NEW',
    name: 'Cardamom Cold Brew',
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
    imageUrl: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?q=80&w=600&auto=format&fit=crop',
    isVegetarian: true,
    price: 1650,
    originalPrice: 1650,
    quantity: 'Serves 1',
    prepTimeInMinutes: 18,
  },
];

export default function WhatIsNew() {
  const { addItem } = useCart();
  const { triggerFly } = useCartUI();

  const handleAdd = (item: typeof items[0], rect: DOMRect) => {
    addItem({
      id: `featured-${item.name}`,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      category: 'Featured',
    });
    triggerFly(rect, item.imageUrl);
  };

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

        <BotanicalDivider motif="tea-leaf" tone="warm" className="mb-12 md:mb-16" />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.9, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
                onAdd={(rect) => handleAdd(item, rect)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

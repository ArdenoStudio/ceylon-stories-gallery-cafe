'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MenuItemCard } from './ui/menu-item-card';
import { MenuItemModal, type MenuItemDetail } from './ui/menu-item-modal';
import { BotanicalDivider } from './heritage/BotanicalDivider';
import { MotifCorner } from './heritage/MotifCorner';
import { useCart } from './CartContext';
import { useCartUI } from './CartUI';
import { useReveal } from '@/src/hooks/useReveal';

const items: MenuItemDetail[] = [
  {
    tag: 'NEW',
    category: 'Beverages',
    name: 'Cardamom Cold Brew',
    description: 'Single-origin cold brew steeped for 18 hours, finished with hand-crushed green cardamom and a touch of palm sugar. Served over hand-chipped ice.',
    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&auto=format&fit=crop',
    isVegetarian: true,
    price: 850,
    originalPrice: 850,
    quantity: 'Serves 1',
    prepTimeInMinutes: 5,
  },
  {
    tag: 'SEASONAL',
    category: 'Desserts',
    name: 'Mango & Chilli Granita',
    description: 'Alphonso mango granita layered with a slow-heat bird\'s eye chilli syrup and a pinch of Himalayan salt. A fleeting summer special, made fresh each morning.',
    imageUrl: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?q=80&w=600&auto=format&fit=crop',
    isVegetarian: true,
    price: 950,
    originalPrice: 1100,
    quantity: 'Serves 1',
    prepTimeInMinutes: 8,
  },
  {
    tag: 'FEATURED',
    category: 'Tea',
    name: 'Dilmah Silver Tips Reserve',
    description: 'Rare white tea handpicked at dawn from the high-altitude gardens of Nuwara Eliya. Brewed at 75°C to preserve its delicate honeyed florals and a long, clean finish.',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop',
    isVegetarian: true,
    price: 1450,
    originalPrice: 1450,
    quantity: 'Pot for 1',
    prepTimeInMinutes: 6,
  },
  {
    tag: 'NEW',
    category: 'Mains',
    name: 'Terracotta Shakshuka',
    description: 'Farm eggs poached in a slow-simmered tomato and roasted pepper sauce, spiced with cumin and smoked paprika, served in a clay pot with toasted sourdough.',
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
  const [selectedItem, setSelectedItem] = useState<MenuItemDetail | null>(null);

  const headingRef = useReveal();
  const descRef = useReveal();
  const gridRef = useReveal('-8%');

  const handleAdd = (item: MenuItemDetail, qty: number, rect: DOMRect) => {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: `featured-${item.name}`,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        category: item.category,
      });
    }
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
          <div ref={headingRef} className="reveal-up">
            <p className="font-editorial text-[10px] tracking-[0.25em] uppercase text-clay-warm mb-4">
              On The Menu Now
            </p>
            <h2 className="font-display font-light text-mahogany text-[clamp(40px,5.5vw,80px)] leading-[0.9] tracking-[-0.02em]">
              What&apos;s <br className="hidden md:block" />
              <i>New</i>
            </h2>
          </div>

          <div ref={descRef} className="reveal-fade flex flex-col items-start md:items-end gap-3">
            <p className="font-body text-sm text-mahogany/60 leading-relaxed max-w-[260px] md:text-right">
              New additions, seasonal specials, and featured items — updated as the kitchen evolves.
            </p>
            <Link
              href="/menu"
              className="font-editorial text-[10px] tracking-[0.2em] uppercase text-clay-deep inline-flex items-center gap-2 hover:gap-3 transition-all duration-300"
            >
              VIEW FULL MENU <span>→</span>
            </Link>
          </div>
        </div>

        <BotanicalDivider motif="tea-leaf" tone="warm" className="mb-12 md:mb-16" />

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 reveal-stagger"
        >
          {items.map((item, idx) => (
            <div key={idx}>
              <MenuItemCard
                imageUrl={item.imageUrl}
                isVegetarian={item.isVegetarian}
                name={item.name}
                price={item.price}
                originalPrice={item.originalPrice}
                quantity={item.quantity}
                prepTimeInMinutes={item.prepTimeInMinutes}
                tag={item.tag}
                onCardClick={() => setSelectedItem(item)}
                onAdd={(rect) => handleAdd(item, 1, rect)}
              />
            </div>
          ))}
        </div>
      </div>

      <MenuItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={(qty, rect) => selectedItem && handleAdd(selectedItem, qty, rect)}
      />
    </section>
  );
}

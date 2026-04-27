'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { MenuItemCard } from './ui/menu-item-card';
import { MenuItemModal } from './ui/menu-item-modal';
import { MotifCorner } from './heritage/MotifCorner';
import { useCart } from './CartContext';
import { useCartUI } from './CartUI';
import { useReveal } from '@/src/hooks/useReveal';
import type { MenuItem } from '@/src/types/menu';

const PAGE_SIZE = 4;

interface WhatIsNewProps {
  items: MenuItem[];
}

export default function WhatIsNew({ items }: WhatIsNewProps) {
  const { addItem } = useCart();
  const { triggerFly } = useCartUI();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [page, setPage] = useState(0);

  const headingRef = useReveal();
  const descRef = useReveal();
  const gridRef = useReveal('-8%');

  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const visibleItems = items.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const goTo = (next: number) => setPage(next);

  const handleAdd = (item: MenuItem, qty: number, rect: DOMRect) => {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: item.id,
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
        <div className="mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
            {/* Left: eyebrow + heading */}
            <div ref={headingRef} className="reveal-up flex-shrink-0">
              <p className="font-editorial text-[10px] tracking-[0.25em] uppercase text-clay-warm mb-3">
                On The Menu Now
              </p>
              <h2 className="font-display font-light text-mahogany text-[clamp(36px,5vw,72px)] leading-[0.9] tracking-[-0.02em]">
                What&apos;s <span className="font-display italic font-light">New</span>
              </h2>
            </div>

            <div className="hidden md:block flex-1" />

            {/* Right: description + count + link */}
            <div ref={descRef} className="reveal-fade flex-shrink-0 flex flex-col gap-3 md:items-end md:text-right">
              <p className="font-body text-sm text-mahogany/55 leading-relaxed max-w-[260px]">
                New additions, seasonal specials &amp; featured items — updated as the kitchen evolves.
              </p>
              <div className="flex items-center gap-3 md:justify-end">
                <span className="font-editorial text-[9px] tracking-[0.2em] uppercase text-mahogany/30">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
                <span className="w-px h-3 bg-mahogany/15" />
                <Link
                  href="/menu"
                  className="font-editorial text-[10px] tracking-[0.2em] uppercase text-clay-deep inline-flex items-center gap-2 hover:gap-3 transition-all duration-300"
                >
                  VIEW FULL MENU <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom rule */}
          <div className="mt-8 md:mt-10 border-t border-mahogany/8" />
        </div>

        {/* Carousel */}
        <div ref={gridRef} className="reveal-stagger">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {visibleItems.map((item, idx) => (
              <motion.div
                key={`${page}-${item.id ?? idx}`}
                className="h-full"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <MenuItemCard
                  className="h-full"
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
              </motion.div>
            ))}
          </div>

          {/* Navigation — only shown when more than one page */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-10 md:mt-12">
              {/* Dot indicators */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to page ${i + 1}`}
                    className={`transition-all duration-300 rounded-full ${
                      i === page
                        ? 'w-6 h-1.5 bg-clay-warm'
                        : 'w-1.5 h-1.5 bg-mahogany/20 hover:bg-mahogany/40'
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => goTo(page - 1)}
                  disabled={page === 0}
                  aria-label="Previous"
                  className="w-10 h-10 flex items-center justify-center border border-mahogany/15 text-mahogany/50 hover:border-mahogany/40 hover:text-mahogany disabled:opacity-25 transition-all duration-200 rounded-sm"
                >
                  <span className="font-editorial text-sm">←</span>
                </button>
                <button
                  onClick={() => goTo(page + 1)}
                  disabled={page === totalPages - 1}
                  aria-label="Next"
                  className="w-10 h-10 flex items-center justify-center border border-mahogany/15 text-mahogany/50 hover:border-mahogany/40 hover:text-mahogany disabled:opacity-25 transition-all duration-200 rounded-sm"
                >
                  <span className="font-editorial text-sm">→</span>
                </button>
              </div>
            </div>
          )}
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

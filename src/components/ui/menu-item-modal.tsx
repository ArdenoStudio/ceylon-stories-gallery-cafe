'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Leaf, Minus, Plus, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export interface MenuItemDetail {
  imageUrl: string;
  isVegetarian: boolean;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  quantity: string;
  prepTimeInMinutes: number;
  tag?: string;
  category: string;
}

interface MenuItemModalProps {
  item: MenuItemDetail | null;
  onClose: () => void;
  onAddToCart?: (qty: number) => void;
}

export function MenuItemModal({ item, onClose, onAddToCart }: MenuItemModalProps) {
  const savings = item ? item.originalPrice - item.price : 0;
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setQty(1);
  }, [item?.name]);

  useEffect(() => {
    if (!item) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-mahogany/75 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Panel — mobile: bottom sheet, desktop: side-by-side */}
          <motion.div
            className="relative z-10 w-full sm:max-w-2xl bg-cream-page rounded-t-3xl sm:rounded-2xl overflow-hidden flex flex-col sm:flex-row"
            style={{ boxShadow: '0 32px 80px rgba(42, 24, 16, 0.35)' }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            {/* Mobile drag handle */}
            <div className="sm:hidden absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-mahogany/20 z-20" />

            {/* ── IMAGE PANEL ────────────────────────────── */}
            <div className="relative h-60 sm:h-auto sm:w-[42%] flex-shrink-0 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />

              {/* Gradient: strong on mobile (bottom title overlay), subtle on desktop */}
              <div className="absolute inset-0 bg-gradient-to-t from-mahogany/85 via-mahogany/25 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-mahogany/30" />

              {/* Tag */}
              {item.tag && (
                <div className="absolute top-5 left-4 sm:top-4">
                  <span className="font-editorial text-[7.5px] tracking-[0.25em] uppercase text-cream-page border border-cream-page/35 px-2.5 py-1 bg-mahogany/55 backdrop-blur-sm">
                    {item.tag}
                  </span>
                </div>
              )}

              {/* Veg indicator */}
              <div
                className="absolute top-5 right-12 sm:top-4 sm:right-4"
                aria-label={item.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
              >
                <div className={cn(
                  'w-5 h-5 border flex items-center justify-center rounded-sm bg-cream-page/95',
                  item.isVegetarian ? 'border-green-600' : 'border-red-600'
                )}>
                  <div className={cn(
                    'w-2.5 h-2.5 rounded-full',
                    item.isVegetarian ? 'bg-green-600' : 'bg-red-600'
                  )} />
                </div>
              </div>

              {/* Title overlay — visible on mobile only */}
              <div className="sm:hidden absolute bottom-5 left-5 right-5">
                <p className="font-editorial text-[8px] tracking-[0.28em] uppercase text-gold-leaf mb-1.5 flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-gold-leaf/60" />
                  {item.category}
                </p>
                <h2 className="font-display font-light text-cream-page text-[28px] leading-[1.0] tracking-[-0.01em]">
                  {item.name}
                </h2>
              </div>
            </div>

            {/* ── CONTENT PANEL ──────────────────────────── */}
            <div className="flex flex-col flex-1 overflow-y-auto max-h-[60vh] sm:max-h-[580px]">

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 flex items-center justify-center rounded-full bg-mahogany/8 hover:bg-mahogany/12 text-mahogany/50 hover:text-mahogany transition-all z-20"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="p-6 sm:p-8 flex flex-col gap-5 flex-1">

                {/* Title — visible on desktop only */}
                <div className="hidden sm:block">
                  <p className="font-editorial text-[8px] tracking-[0.28em] uppercase text-gold-leaf mb-2.5 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-gold-leaf/60" />
                    {item.category}
                  </p>
                  <h2 className="font-display font-light text-mahogany text-[clamp(28px,3.5vw,38px)] leading-[1.0] tracking-[-0.02em]">
                    {item.name}
                  </h2>
                </div>

                {/* Price block */}
                <div>
                  <div className="flex items-baseline gap-2.5 flex-wrap">
                    <span className="font-display font-light text-mahogany text-[32px] sm:text-[36px] leading-none tracking-[-0.02em]">
                      Rs.&nbsp;{item.price.toLocaleString()}
                    </span>
                    {savings > 0 && (
                      <span className="font-body text-sm line-through text-mahogany/35">
                        Rs.&nbsp;{item.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {savings > 0 && (
                    <p className="font-editorial text-[9px] tracking-[0.18em] uppercase text-green-700 mt-1">
                      You save Rs.&nbsp;{savings.toLocaleString()}
                    </p>
                  )}
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-gradient-to-r from-gold-leaf/30 via-mahogany/10 to-transparent" />

                {/* Description */}
                <p className="font-body text-[13.5px] text-mahogany/65 leading-[1.85]">
                  {item.description}
                </p>

                {/* Meta pills */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-mahogany/5 border border-mahogany/8">
                    <Leaf className="w-3 h-3 text-mahogany/40" />
                    <div>
                      <p className="font-editorial text-[7.5px] tracking-[0.2em] uppercase text-mahogany/40 leading-none mb-0.5">Quantity</p>
                      <p className="font-editorial text-[9.5px] tracking-[0.12em] uppercase text-mahogany leading-none">{item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-mahogany/5 border border-mahogany/8">
                    <Clock className="w-3 h-3 text-mahogany/40" />
                    <div>
                      <p className="font-editorial text-[7.5px] tracking-[0.2em] uppercase text-mahogany/40 leading-none mb-0.5">Prep Time</p>
                      <p className="font-editorial text-[9.5px] tracking-[0.12em] uppercase text-mahogany leading-none">{item.prepTimeInMinutes} mins</p>
                    </div>
                  </div>
                </div>

                {/* Add to order */}
                {onAddToCart && (
                  <div className="mt-auto pt-4 border-t border-mahogany/10">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-mahogany/15">
                        <button
                          onClick={() => setQty(q => Math.max(1, q - 1))}
                          disabled={qty <= 1}
                          className="w-9 h-9 flex items-center justify-center text-mahogany/50 hover:text-mahogany transition-colors disabled:opacity-30"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-editorial text-[12px] tracking-[0.1em] text-mahogany w-8 text-center select-none">{qty}</span>
                        <button
                          onClick={() => setQty(q => Math.min(10, q + 1))}
                          disabled={qty >= 10}
                          className="w-9 h-9 flex items-center justify-center text-mahogany/50 hover:text-mahogany transition-colors disabled:opacity-30"
                          aria-label="Increase"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => { onAddToCart(qty); setQty(1); }}
                        className="flex-1 bg-mahogany text-cream-page font-editorial text-[10px] tracking-[0.25em] uppercase py-3 hover:bg-mahogany-soft transition-colors"
                      >
                        Add{qty > 1 ? ` ${qty} ×` : ''} to Order
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, X } from 'lucide-react';
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
}

export function MenuItemModal({ item, onClose }: MenuItemModalProps) {
  const savings = item ? item.originalPrice - item.price : 0;

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
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-mahogany/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="relative z-10 w-full sm:max-w-lg bg-cream-page rounded-t-2xl sm:rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            {/* Image */}
            <div className="relative h-64 sm:h-72 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mahogany/80 via-mahogany/20 to-transparent" />

              {/* Tag */}
              {item.tag && (
                <div className="absolute top-4 left-4">
                  <span className="font-editorial text-[8px] tracking-[0.25em] uppercase text-cream-page border border-cream-page/40 px-2 py-0.5 bg-mahogany/60 backdrop-blur-sm">
                    {item.tag}
                  </span>
                </div>
              )}

              {/* Veg indicator */}
              <div
                className="absolute top-4 right-14"
                aria-label={item.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
              >
                <div className={cn(
                  'w-5 h-5 border flex items-center justify-center rounded-sm bg-cream-page',
                  item.isVegetarian ? 'border-green-600' : 'border-red-600'
                )}>
                  <div className={cn(
                    'w-2.5 h-2.5 rounded-full',
                    item.isVegetarian ? 'bg-green-600' : 'bg-red-600'
                  )} />
                </div>
              </div>

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-mahogany/60 backdrop-blur-sm text-cream-page hover:bg-mahogany transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Category + name overlaid on image */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-editorial text-[9px] tracking-[0.25em] uppercase text-gold-leaf mb-1">
                  {item.category}
                </p>
                <h2 className="font-display font-light text-cream-page text-[clamp(26px,5vw,36px)] leading-[1.0]">
                  {item.name}
                </h2>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* Pricing */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-display text-2xl font-light text-mahogany">Rs. {item.price}</span>
                {savings > 0 && (
                  <>
                    <span className="font-body text-sm line-through text-mahogany/40">Rs. {item.originalPrice}</span>
                    <span className="font-editorial text-[9px] tracking-[0.1em] uppercase text-green-600">
                      Save Rs. {savings}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="font-body text-sm text-mahogany/70 leading-[1.8] mb-5">
                {item.description}
              </p>

              {/* Meta row */}
              <div className="flex items-center gap-6 pt-4 border-t border-mahogany/10">
                <div>
                  <p className="font-editorial text-[8px] tracking-[0.2em] uppercase text-mahogany/40 mb-0.5">Quantity</p>
                  <p className="font-editorial text-[10px] tracking-[0.15em] uppercase text-mahogany">{item.quantity}</p>
                </div>
                <div className="w-px h-8 bg-mahogany/10" />
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-mahogany/40" />
                  <div>
                    <p className="font-editorial text-[8px] tracking-[0.2em] uppercase text-mahogany/40 mb-0.5">Prep time</p>
                    <p className="font-editorial text-[10px] tracking-[0.15em] uppercase text-mahogany">{item.prepTimeInMinutes} mins</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

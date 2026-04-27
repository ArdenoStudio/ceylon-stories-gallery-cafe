'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import { Clock, Minus, Plus, UtensilsCrossed, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export interface MenuItemDetail {
  imageUrl: string;
  isVegetarian: boolean;
  name: string;
  description: string;
  price: number;
  originalPrice: number | null;
  quantity: string;
  prepTimeInMinutes: number;
  tag?: string;
  category: string;
}

interface MenuItemModalProps {
  item: MenuItemDetail | null;
  onClose: () => void;
  onAddToCart?: (qty: number, rect: DOMRect) => void;
}

export function MenuItemModal({ item, onClose, onAddToCart }: MenuItemModalProps) {
  const savings = item?.originalPrice != null ? item.originalPrice - item.price : 0;
  const [qty, setQty] = useState(1);
  const [imgLoaded, setImgLoaded] = useState(false);
  const dragControls = useDragControls();

  useEffect(() => {
    setQty(1);
    setImgLoaded(false);
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

          {/* ── MOBILE: draggable bottom sheet ─────────────────── */}
          <motion.div
            className="mobile-sheet sm:hidden relative z-10 w-full bg-cream-page rounded-t-[24px] flex flex-col"
            style={{ boxShadow: '0 -12px 48px rgba(42,24,16,0.22)' }}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.35 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 80 || info.velocity.y > 400) onClose();
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Drag handle / notch */}
            <div
              className="flex justify-center pt-3.5 pb-2 flex-shrink-0 cursor-grab active:cursor-grabbing touch-none select-none"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="w-10 h-[5px] rounded-full bg-mahogany/15" />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-mahogany/8 hover:bg-mahogany/14 text-mahogany/45 hover:text-mahogany transition-all z-20"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Scrollable body — padded so content clears the absolute CTA */}
            <div className={cn('overflow-y-auto flex-1 min-h-0', onAddToCart ? 'pb-24' : 'pb-4')}>
              {/* Image */}
              <div className="relative mx-4 mt-1 mb-5 h-44 rounded-xl overflow-hidden bg-mahogany/10">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  onLoad={() => setImgLoaded(true)}
                  className={cn(
                    'w-full h-full object-cover transition-opacity duration-500',
                    imgLoaded ? 'opacity-100' : 'opacity-0'
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mahogany/55 to-transparent" />
                {item.tag && (
                  <div className="absolute top-3 left-3">
                    <span className="font-editorial text-[7.5px] tracking-[0.25em] uppercase text-cream-page border border-cream-page/35 px-2.5 py-1 bg-mahogany/55 backdrop-blur-sm">
                      {item.tag}
                    </span>
                  </div>
                )}
                <div
                  className="absolute top-3 right-3"
                  aria-label={item.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
                >
                  <div className={cn(
                    'w-5 h-5 border flex items-center justify-center rounded-sm bg-cream-page/95',
                    item.isVegetarian ? 'border-sage-deep' : 'border-clay-deep'
                  )}>
                    <div className={cn('w-2.5 h-2.5 rounded-full', item.isVegetarian ? 'bg-sage-deep' : 'bg-clay-deep')} />
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="px-5 pb-4 flex flex-col gap-4">
                <div>
                  <p className="font-editorial text-[8px] tracking-[0.28em] uppercase text-gold-leaf mb-1.5 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-gold-leaf/60" />{item.category}
                  </p>
                  <h2 className="font-display font-light text-mahogany text-[26px] leading-[1.05] tracking-[-0.01em]">
                    {item.name}
                  </h2>
                </div>

                <div>
                  <div className="flex items-baseline gap-2.5 flex-wrap">
                    <span className="font-display font-light text-mahogany text-[30px] leading-none tracking-[-0.02em]">
                      Rs.&nbsp;{item.price.toLocaleString()}
                    </span>
                    {savings > 0 && (
                      <span className="font-body text-sm line-through text-mahogany/35">
                        Rs.&nbsp;{item.originalPrice?.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {savings > 0 && (
                    <p className="font-editorial text-[9px] tracking-[0.18em] uppercase text-sage-deep mt-1">
                      You save Rs.&nbsp;{savings.toLocaleString()}
                    </p>
                  )}
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-gold-leaf/30 via-mahogany/10 to-transparent" />

                <p className="font-body text-[14px] text-mahogany/75 leading-[1.85]">
                  {item.description}
                </p>

                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-mahogany/5 border border-mahogany/8">
                    <UtensilsCrossed className="w-3 h-3 text-mahogany/40" />
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
              </div>
            </div>

            {/* CTA — absolutely pinned to bottom, always visible */}
            {onAddToCart && (
              <div
                className="absolute bottom-0 left-0 right-0 px-4 pt-4 border-t border-mahogany/10 bg-cream-page"
                style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))' }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-md bg-mahogany/5 border border-mahogany/8 px-1 py-2 gap-1">
                    <button
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      disabled={qty <= 1}
                      className="w-7 h-7 flex items-center justify-center rounded-sm text-mahogany/45 hover:bg-mahogany/8 hover:text-mahogany transition-colors disabled:opacity-25"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-editorial text-[11px] tracking-[0.15em] text-mahogany w-7 text-center select-none" aria-live="polite">{qty}</span>
                    <button
                      onClick={() => setQty(q => Math.min(10, q + 1))}
                      disabled={qty >= 10}
                      className="w-7 h-7 flex items-center justify-center rounded-sm text-mahogany/45 hover:bg-mahogany/8 hover:text-mahogany transition-colors disabled:opacity-25"
                      aria-label={qty >= 10 ? 'Maximum quantity reached' : 'Increase quantity'}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={(e) => { onAddToCart(qty, e.currentTarget.getBoundingClientRect()); setQty(1); onClose(); }}
                    className="flex-1 rounded-md bg-mahogany text-cream-page font-editorial text-[10px] tracking-[0.25em] uppercase py-[13px] hover:bg-mahogany-soft active:scale-[0.98] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mahogany"
                  >
                    Add{qty > 1 ? ` ${qty} ×` : ''} to Order
                    <span className="ml-2 opacity-60">·</span>
                    <span className="ml-2">Rs.&nbsp;{(item.price * qty).toLocaleString()}</span>
                  </button>
                </div>
                {qty >= 10 && (
                  <p className="font-editorial text-[8px] tracking-[0.15em] uppercase text-mahogany/40 mt-2 text-right">
                    Max 10 per order
                  </p>
                )}
              </div>
            )}
          </motion.div>

          {/* ── DESKTOP: side-by-side panel (unchanged) ────────── */}
          <motion.div
            className="hidden sm:flex relative z-10 w-full sm:max-w-2xl bg-cream-page rounded-2xl overflow-hidden flex-row"
            style={{ boxShadow: '0 32px 80px rgba(42, 24, 16, 0.35)' }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            {/* Image panel */}
            <div className="relative h-auto w-[42%] flex-shrink-0 overflow-hidden bg-mahogany/10">
              <img
                src={item.imageUrl}
                alt={item.name}
                onLoad={() => setImgLoaded(true)}
                className={cn(
                  'w-full h-full object-cover transition-opacity duration-500',
                  imgLoaded ? 'opacity-100' : 'opacity-0'
                )}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-mahogany/30" />
              {item.tag && (
                <div className="absolute top-4 left-4">
                  <span className="font-editorial text-[7.5px] tracking-[0.25em] uppercase text-cream-page border border-cream-page/35 px-2.5 py-1 bg-mahogany/55 backdrop-blur-sm">
                    {item.tag}
                  </span>
                </div>
              )}
              <div className="absolute top-4 right-4" aria-label={item.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}>
                <div className={cn(
                  'w-5 h-5 border flex items-center justify-center rounded-sm bg-cream-page/95',
                  item.isVegetarian ? 'border-sage-deep' : 'border-clay-deep'
                )}>
                  <div className={cn('w-2.5 h-2.5 rounded-full', item.isVegetarian ? 'bg-sage-deep' : 'bg-clay-deep')} />
                </div>
              </div>
            </div>

            {/* Content panel */}
            <div className="flex flex-col flex-1 overflow-y-auto max-h-[580px]">
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-mahogany/8 hover:bg-mahogany/12 text-mahogany/50 hover:text-mahogany transition-all z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mahogany/40"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="p-8 flex flex-col gap-5 flex-1">
                <div>
                  <p className="font-editorial text-[8px] tracking-[0.28em] uppercase text-gold-leaf mb-2.5 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-gold-leaf/60" />{item.category}
                  </p>
                  <h2 className="font-display font-light text-mahogany text-[clamp(28px,3.5vw,38px)] leading-[1.0] tracking-[-0.02em]">
                    {item.name}
                  </h2>
                </div>

                <div>
                  <div className="flex items-baseline gap-2.5 flex-wrap">
                    <span className="font-display font-light text-mahogany text-[36px] leading-none tracking-[-0.02em]">
                      Rs.&nbsp;{item.price.toLocaleString()}
                    </span>
                    {savings > 0 && (
                      <span className="font-body text-sm line-through text-mahogany/35">
                        Rs.&nbsp;{item.originalPrice?.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {savings > 0 && (
                    <p className="font-editorial text-[9px] tracking-[0.18em] uppercase text-sage-deep mt-1">
                      You save Rs.&nbsp;{savings.toLocaleString()}
                    </p>
                  )}
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-gold-leaf/30 via-mahogany/10 to-transparent" />

                <p className="font-body text-[14px] text-mahogany/75 leading-[1.85]">{item.description}</p>

                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-mahogany/5 border border-mahogany/8">
                    <UtensilsCrossed className="w-3 h-3 text-mahogany/40" />
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

                {onAddToCart && (
                  <div className="mt-auto pt-4 border-t border-mahogany/10">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-md bg-mahogany/5 border border-mahogany/8 px-1 py-2 gap-1">
                        <button
                          onClick={() => setQty(q => Math.max(1, q - 1))}
                          disabled={qty <= 1}
                          className="w-7 h-7 flex items-center justify-center rounded-sm text-mahogany/45 hover:bg-mahogany/8 hover:text-mahogany transition-colors disabled:opacity-25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-mahogany/40"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-editorial text-[11px] tracking-[0.15em] text-mahogany w-7 text-center select-none" aria-live="polite" aria-label={`Quantity: ${qty}`}>{qty}</span>
                        <button
                          onClick={() => setQty(q => Math.min(10, q + 1))}
                          disabled={qty >= 10}
                          className="w-7 h-7 flex items-center justify-center rounded-sm text-mahogany/45 hover:bg-mahogany/8 hover:text-mahogany transition-colors disabled:opacity-25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-mahogany/40"
                          aria-label={qty >= 10 ? 'Maximum quantity reached' : 'Increase quantity'}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={(e) => { onAddToCart(qty, e.currentTarget.getBoundingClientRect()); setQty(1); }}
                        className="flex-1 rounded-md bg-mahogany text-cream-page font-editorial text-[10px] tracking-[0.25em] uppercase py-[11px] hover:bg-mahogany-soft active:scale-[0.98] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mahogany"
                      >
                        Add{qty > 1 ? ` ${qty} ×` : ''} to Order
                        <span className="ml-2 opacity-60">·</span>
                        <span className="ml-2">Rs.&nbsp;{(item.price * qty).toLocaleString()}</span>
                      </button>
                    </div>
                    {qty >= 10 && (
                      <p className="font-editorial text-[8px] tracking-[0.15em] uppercase text-mahogany/40 mt-2 text-right">
                        Max 10 per order
                      </p>
                    )}
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

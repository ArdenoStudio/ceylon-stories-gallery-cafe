'use client';

import React, { createContext, useContext, useRef, useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from './CartContext';
import { CartDrawer } from './CartDrawer';

// ─── Flying item animation ────────────────────────────────────────────────────

interface FlyItemData {
  id: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  imageUrl: string;
}

function FlyingItem({ data, onDone }: { data: FlyItemData; onDone: () => void }) {
  const size = 40;
  const x0 = data.fromX - size / 2;
  const y0 = data.fromY - size / 2;
  const x1 = data.toX - size / 2;
  const y1 = data.toY - size / 2;

  const cx = (x0 + x1) / 2;
  const cy = Math.min(y0, y1) - 160;

  const N = 24;
  const ts = Array.from({ length: N + 1 }, (_, i) => i / N);
  const bx = ts.map(t => (1 - t) ** 2 * x0 + 2 * t * (1 - t) * cx + t ** 2 * x1);
  const by = ts.map(t => (1 - t) ** 2 * y0 + 2 * t * (1 - t) * cy + t ** 2 * y1);
  const scales = ts.map(t => 1 - t * 0.65);
  const opacities = ts.map(t => (t < 0.8 ? 1 : 1 - (t - 0.8) / 0.2));

  return (
    <motion.div
      className="fixed z-[200] rounded-full overflow-hidden border-2 border-cream-page shadow-ink pointer-events-none"
      style={{ left: 0, top: 0, width: size, height: size }}
      initial={{ x: x0, y: y0, scale: 1, opacity: 1 }}
      animate={{ x: bx, y: by, scale: scales, opacity: opacities }}
      transition={{ duration: 0.62, ease: 'easeIn', times: ts }}
      onAnimationComplete={onDone}
    >
      <img src={data.imageUrl} alt="" className="w-full h-full object-cover" />
    </motion.div>
  );
}

// ─── CartUI context ───────────────────────────────────────────────────────────

interface CartUIContextValue {
  triggerFly: (rect: DOMRect, imageUrl: string) => void;
}

const CartUIContext = createContext<CartUIContextValue | null>(null);

export function useCartUI() {
  const ctx = useContext(CartUIContext);
  if (!ctx) throw new Error('useCartUI must be used within CartUI');
  return ctx;
}

// ─── CartUI provider ──────────────────────────────────────────────────────────

export function CartUI({ children }: { children: React.ReactNode }) {
  const { totalItems, openCart } = useCart();
  const [flyItems, setFlyItems] = useState<FlyItemData[]>([]);
  const flyCounter = useRef(0);
  const cartButtonRef = useRef<HTMLButtonElement | null>(null);
  const bagControls = useAnimation();

  const triggerFly = (sourceRect: DOMRect, imageUrl: string) => {
    const cartEl = cartButtonRef.current;
    const toX = cartEl
      ? cartEl.getBoundingClientRect().left + cartEl.getBoundingClientRect().width / 2
      : 56;
    const toY = cartEl
      ? cartEl.getBoundingClientRect().top + cartEl.getBoundingClientRect().height / 2
      : window.innerHeight - 40;
    setFlyItems(prev => [...prev, {
      id: ++flyCounter.current,
      fromX: sourceRect.left + sourceRect.width / 2,
      fromY: sourceRect.top + sourceRect.height / 2,
      toX,
      toY,
      imageUrl,
    }]);
  };

  const handleFlyDone = (id: number) => {
    setFlyItems(prev => prev.filter(i => i.id !== id));
    bagControls.start({
      scale: [1, 1.5, 0.9, 1.15, 1],
      rotate: [-6, 6, -3, 0],
      transition: { duration: 0.4, ease: 'easeOut' },
    });
  };

  return (
    <CartUIContext.Provider value={{ triggerFly }}>
      <CartDrawer />

      {flyItems.map(data => (
        <FlyingItem key={data.id} data={data} onDone={() => handleFlyDone(data.id)} />
      ))}

      {/* Global floating cart button */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.button
            ref={cartButtonRef}
            type="button"
            onClick={openCart}
            className="group fixed bottom-5 left-5 md:bottom-7 md:left-7 z-[90] inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#c89b67]/60 bg-[linear-gradient(180deg,#fbedd2_0%,#f2d7ae_50%,#e7bc87_100%)] px-4 py-3 text-[#6a4934] [transform:perspective(500px)_rotateX(5deg)] [transform-style:preserve-3d] transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] shadow-[inset_0_6px_12px_rgba(255,255,255,0.62),inset_0_-4px_10px_rgba(106,73,52,0.10),0_10px_24px_rgba(42,24,16,0.18)] hover:[transform:perspective(500px)_translateY(-3px)] hover:bg-[linear-gradient(180deg,#fcf2dd_0%,#f5dfbb_50%,#eccb9d_100%)] hover:shadow-[inset_0_6px_12px_rgba(255,255,255,0.68),inset_0_-5px_10px_rgba(106,73,52,0.12),0_14px_28px_rgba(42,24,16,0.22)] active:[transform:perspective(500px)_rotateX(2deg)_translateY(2px)] active:bg-[linear-gradient(180deg,#f2ddb9_0%,#e8c995_55%,#dbb17b_100%)] active:shadow-[inset_0_3px_6px_rgba(255,255,255,0.34),inset_0_-3px_6px_rgba(106,73,52,0.12),0_5px_10px_rgba(42,24,16,0.16)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            aria-label={`Open order — ${totalItems} item${totalItems === 1 ? '' : 's'}`}
          >
            <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,rgba(173,126,77,0.10)_25%,transparent_25%,transparent_75%,rgba(173,126,77,0.10)_75%)] bg-[length:12px_12px] opacity-30 mix-blend-multiply" />
            <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.44),transparent_58%)]" />
            <span aria-hidden="true" className="absolute inset-x-5 top-[5px] h-px bg-white/65" />

            <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#bf9464]/25 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.58),transparent_55%),linear-gradient(180deg,rgba(251,236,209,0.98),rgba(226,191,141,0.74))] shadow-[inset_0_2px_4px_rgba(255,255,255,0.52),inset_0_-2px_4px_rgba(106,73,52,0.10)] transition-transform duration-300 group-hover:scale-[1.04] group-hover:-rotate-3 group-active:translate-y-px group-active:scale-95">
              <motion.span animate={bagControls} className="relative flex items-center justify-center">
                <ShoppingBag className="h-[18px] w-[18px] shrink-0 text-[#6a4934]" />
              </motion.span>
            </span>

            <span className="relative z-10 pr-1 font-body text-sm font-bold uppercase tracking-[0.18em] text-[#6a4934] transition-all duration-300 group-hover:translate-x-0.5 group-hover:drop-shadow-[0_2px_4px_rgba(0,0,0,0.14)] group-active:translate-y-px">
              Order
            </span>

            <motion.span
              key={totalItems}
              initial={{ scale: 0.86, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex h-9 min-w-9 items-center justify-center rounded-full border border-[#bf9464]/28 bg-[linear-gradient(180deg,rgba(255,255,255,0.42),rgba(226,191,141,0.22))] px-2.5 font-body text-sm font-bold text-[#6a4934] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(106,73,52,0.06)]"
            >
              {totalItems}
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      {children}
    </CartUIContext.Provider>
  );
}

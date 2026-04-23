'use client';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useCart } from '@/src/components/CartContext';
import { ShoppingCart } from '@/src/components/ui/shopping-cart';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-mahogany/60 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            className="relative z-10 w-full max-w-lg bg-cream-page flex flex-col h-full overflow-y-auto"
            style={{ boxShadow: '-20px 0 60px rgba(42, 24, 16, 0.25)' }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <button
              onClick={closeCart}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-mahogany/40 hover:text-mahogany transition-colors z-10"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 pt-12">
              <ShoppingCart
                items={items}
                onQuantityChange={updateQuantity}
                onRemoveItem={removeItem}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

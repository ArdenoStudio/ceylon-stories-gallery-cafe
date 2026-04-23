'use client';
import * as React from 'react';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import type { CartItem } from '@/src/components/CartContext';

interface ShoppingCartProps {
  items: CartItem[];
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({ items, onQuantityChange, onRemoveItem }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const fmt = (n: number) => `Rs. ${n.toLocaleString('en-LK')}`;

  const handleOrder = () => {
    const lines = items.map(i => `• ${i.name} ×${i.quantity} — ${fmt(i.price * i.quantity)}`);
    const msg = `Hello Ceylon Stories! I'd like to place an order:\n\n${lines.join('\n')}\n\n*Total: ${fmt(subtotal)}*`;
    window.open(`https://wa.me/94770000000?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 pt-6 pb-5 border-b border-mahogany/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <ShoppingBag className="w-4 h-4 text-clay-warm" />
          <h2 className="font-display font-light text-mahogany text-xl tracking-[-0.01em]">Your Order</h2>
        </div>
        <span className="font-editorial text-[9px] tracking-[0.2em] uppercase text-mahogany/40">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-52 text-center">
            <ShoppingBag className="w-10 h-10 text-mahogany/12 mb-4" />
            <p className="font-body text-sm text-mahogany/40">Your order is empty.</p>
            <p className="font-body text-xs text-mahogany/25 mt-1">Browse the menu to add items.</p>
          </div>
        ) : (
          items.map(item => (
            <div key={item.id} className="flex items-start gap-3 pb-5 border-b border-mahogany/8 last:border-0 last:pb-0">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-sm shrink-0 photo-heritage"
              />
              <div className="flex-1 min-w-0">
                <p className="font-editorial text-[8px] tracking-[0.2em] uppercase text-gold-leaf mb-0.5">{item.category}</p>
                <h3 className="font-display font-light text-mahogany text-[14px] leading-tight mb-2.5">{item.name}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="w-6 h-6 flex items-center justify-center border border-mahogany/20 text-mahogany/50 hover:border-mahogany/50 hover:text-mahogany transition-colors disabled:opacity-30"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-editorial text-[11px] tracking-[0.1em] text-mahogany w-5 text-center select-none">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center border border-mahogany/20 text-mahogany/50 hover:border-mahogany/50 hover:text-mahogany transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <p className="font-display font-light text-mahogany text-[13px] leading-none">{fmt(item.price * item.quantity)}</p>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-mahogany/25 hover:text-red-600 transition-colors"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="px-6 py-5 border-t border-mahogany/10 space-y-4 shrink-0 bg-cream-paper/50">
          <div className="w-full h-[1px] bg-gradient-to-r from-gold-leaf/30 via-mahogany/10 to-transparent" />
          <div className="flex justify-between items-baseline">
            <span className="font-editorial text-[9px] tracking-[0.25em] uppercase text-mahogany/50">Total</span>
            <span className="font-display font-light text-mahogany text-2xl">{fmt(subtotal)}</span>
          </div>
          <button
            onClick={handleOrder}
            className="w-full bg-mahogany text-cream-page font-editorial text-[10px] tracking-[0.25em] uppercase py-3.5 hover:bg-mahogany-soft transition-colors"
          >
            Place Order via WhatsApp
          </button>
          <p className="text-center font-body text-[10px] text-mahogany/30">
            Prices in LKR · Service charge may apply
          </p>
        </div>
      )}
    </div>
  );
};

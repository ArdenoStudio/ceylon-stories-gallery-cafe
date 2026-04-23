'use client';
import * as React from 'react';
import { Button } from '@/src/components/ui/button';
import { Separator } from '@/src/components/ui/separator';
import { ScrollArea } from '@/src/components/ui/scroll-area';
import { Input } from '@/src/components/ui/input';
import { Plus, Minus, Trash2, Info } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category?: string;
}

interface ShoppingCartProps {
  items: CartItem[];
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClose?: () => void;
}

function WoodenCartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0 0 21.42 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({ items, onQuantityChange, onRemoveItem, onClose }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 500 : 0;
  const taxRate = 0.1;
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;
  const itemLabel = `${items.length} item${items.length === 1 ? '' : 's'}`;

  const formatCurrency = (amount: number) => {
    return `Rs. ${Math.round(amount).toLocaleString()}`;
  };

  return (
    <div className="flex h-full w-full flex-col text-mahogany">
      <div className="flex items-end justify-between gap-4 border-b border-mahogany/10 pb-5">
        <div className="flex items-center gap-3">
          <WoodenCartIcon className="h-6 w-6 shrink-0 text-mahogany" />
          <h2 className="text-[clamp(2rem,2.6vw,2.4rem)] font-semibold leading-none tracking-tight">
            Your Shopping Cart
          </h2>
        </div>
        <span className="shrink-0 text-sm text-mahogany/55">{itemLabel}</span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        {items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center border-b border-mahogany/10 py-12 text-center text-mahogany/55">
            Your cart is empty. Start shopping!
          </div>
        ) : (
          <ScrollArea className="min-h-0 flex-1 py-2 pr-2 sm:pr-4">
            <div className="divide-y divide-mahogany/10">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-5">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover sm:h-24 sm:w-24"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="line-clamp-2 text-xl font-medium">{item.name}</h3>
                        <p className="mt-1 text-sm text-mahogany/60">{formatCurrency(item.price)} per item</p>
                      </div>
                      <p className="shrink-0 text-2xl font-semibold tracking-tight">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 border-mahogany/15 bg-transparent"
                          onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const newQty = parseInt(e.target.value);
                            if (!isNaN(newQty) && newQty >= 1 && newQty <= 99) {
                              onQuantityChange(item.id, newQty);
                            }
                          }}
                          className="h-10 w-24 border-mahogany/15 bg-cream-page/70 text-center text-base"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 border-mahogany/15 bg-transparent"
                          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                          disabled={item.quantity >= 99}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 text-red-500 hover:bg-red-500/10 hover:text-red-600"
                        onClick={() => {
                          if (window.confirm(`Remove "${item.name}" from your cart?`)) {
                            onRemoveItem(item.id);
                          }
                        }}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {items.length > 0 && onClose && (
          <div className="py-3 text-center">
            <button
              onClick={onClose}
              className="text-sm text-mahogany/50 underline-offset-2 hover:text-mahogany hover:underline transition-colors"
            >
              ← Continue shopping
            </button>
          </div>
        )}

        <div className="mt-auto border-t border-mahogany/10 pt-6">
          <div className="grid gap-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center gap-1">
                Service Charge
                <span title="A fixed service fee applied to all orders" className="cursor-help">
                  <Info className="h-3.5 w-3.5 text-mahogany/40" />
                </span>
              </span>
              <span className="font-medium">{formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax ({taxRate * 100}%)</span>
              <span className="font-medium">{formatCurrency(tax)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <Button className="mt-8 h-12 w-full text-base" disabled={items.length === 0}>
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Utensils, UtensilsCrossed, Leaf, Wheat, Sandwich, ChefHat, Cookie, Coffee, Wine, GlassWater, Droplets, Zap, type LucideIcon } from 'lucide-react';
import { MenuItemCard } from '@/src/components/ui/menu-item-card';
import { MenuItemModal, type MenuItemDetail } from '@/src/components/ui/menu-item-modal';
import { useCart } from '@/src/components/CartContext';
import { useCartUI } from '@/src/components/CartUI';
import type { MenuItem, MenuCategory } from '@/src/types/menu';

export default function MenuPage() {
  const FOOD_CATS: MenuCategory[] = ['Soup','Salad','Starters','Rice','Kothu','Chun Paan','Toasty Panini','Western','Desserts'];
  const DRINK_CATS: MenuCategory[] = ['Kopi Base','Mocktails','Milkshakes','Fresh Juice','Energy Drinks','Water','Dilmah Hot Teas','Dilmah Iced Teas','Dilmah Smoothies'];
  const CATEGORY_ICONS: Record<string, LucideIcon> = {
    'All': LayoutGrid, 'Soup': UtensilsCrossed, 'Salad': Leaf, 'Starters': UtensilsCrossed,
    'Rice': Wheat, 'Kothu': Utensils, 'Chun Paan': Sandwich, 'Toasty Panini': Sandwich,
    'Western': ChefHat, 'Desserts': Cookie, 'Kopi Base': Coffee, 'Mocktails': Wine,
    'Milkshakes': GlassWater, 'Fresh Juice': Droplets, 'Energy Drinks': Zap,
    'Water': Droplets, 'Dilmah Hot Teas': Coffee, 'Dilmah Iced Teas': GlassWater, 'Dilmah Smoothies': GlassWater,
  };
  const TIERS = [
    { label: 'All' as const, Icon: LayoutGrid },
    { label: 'Food' as const, Icon: Utensils },
    { label: 'Drinks' as const, Icon: Coffee },
  ];

  const { addItem } = useCart();
  const { triggerFly } = useCartUI();
  const [active, setActive] = useState('All');
  const [activeTier, setActiveTier] = useState<'All' | 'Food' | 'Drinks'>('All');
  const [selectedItem, setSelectedItem] = useState<MenuItemDetail | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const pillRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    fetch('/api/menu')
      .then(r => r.json())
      .then((data: MenuItem[]) => { setMenuItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    pillRefs.current.get(active)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [active]);

  const categories = Array.from(new Set(menuItems.map(i => i.category)));
  const filtered = (() => {
    if (activeTier === 'All') return menuItems;
    const group = menuItems.filter(i =>
      activeTier === 'Food' ? FOOD_CATS.includes(i.category) : DRINK_CATS.includes(i.category)
    );
    return active === 'All' ? group : group.filter(i => i.category === active);
  })();

  const handleAddToCart = (item: MenuItem, qty: number, sourceRect?: DOMRect) => {
    addItem({
      id: `${item.category}-${item.name}`,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      category: item.category,
    }, qty);
    setSelectedItem(null);
    if (sourceRect) triggerFly(sourceRect, item.imageUrl);
  };

  return (
    <>
      <MenuItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={(qty, rect) => selectedItem && handleAddToCart(selectedItem as MenuItem, qty, rect)}
      />

      {/* Hero */}
      <section className="relative w-full bg-mahogany text-cream-page overflow-hidden" style={{ minHeight: '60vh' }}>
        {/* Vertical copper accent bar */}
        <span aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-[3px] bg-clay-warm opacity-70" />

        <div
          className="flex flex-col justify-center"
          style={{ minHeight: '60vh', padding: 'clamp(56px, 9vw, 112px) clamp(40px, 8vw, 120px)' }}
        >
          {/* Overline */}
          <div className="flex items-baseline gap-6 mb-10">
            <span className="font-editorial text-[10px] tracking-[0.22em] uppercase text-clay-warm/60">03</span>
            <span className="block w-12 h-px bg-clay-warm/30 self-center" />
            <span className="font-editorial text-[10px] tracking-[0.18em] uppercase text-cream-page/30">The Menu</span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-light leading-[0.92] tracking-[-0.025em]" style={{ fontSize: 'clamp(54px, 8.5vw, 124px)' }}>
            <span className="block text-cream-page">Food, Tea</span>
            <i className="block text-clay-warm" style={{ marginTop: 8 }}>& the Lounge.</i>
          </h1>

          {/* Descriptor */}
          <p className="font-body text-cream-page/30 leading-relaxed mt-12" style={{ fontSize: 13, maxWidth: '36ch', letterSpacing: '0.01em' }}>
            An exploration of Sri Lankan cuisine, tea, and the art of gathering.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="relative w-full bg-cream-page py-10 sm:py-[clamp(60px,8vh,120px)] px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">

          {/* Filter Tabs */}
          <div className="mb-10 sm:mb-16">
            {/* On mobile: stacked rows. On desktop: single inline row. */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-1">
              {/* Tier 1 */}
              <motion.div layout="position" transition={{ duration: 0.3, ease: 'easeInOut' }} className="flex gap-1.5 flex-shrink-0">
                {TIERS.map(({ label, Icon }) => (
                  <button
                    key={label}
                    onClick={() => { setActiveTier(label); setActive('All'); }}
                    className={`relative font-editorial text-[10px] tracking-[0.2em] uppercase whitespace-nowrap px-4 py-2 rounded-full flex-shrink-0 cursor-pointer glass-pill ${
                      activeTier === label ? 'text-cream-page' : 'text-mahogany/65 hover:text-mahogany'
                    }`}
                  >
                    {activeTier === label && (
                      <motion.span
                        layoutId="tier-pill"
                        className="absolute inset-0 rounded-full glass-pill-active"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
                      />
                    )}
                    <span className="relative z-10 inline-flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5" />
                      {label}
                    </span>
                  </button>
                ))}
              </motion.div>

              {/* Tier 2 — own scrollable row on mobile, inline on desktop */}
              <AnimatePresence>
                {activeTier !== 'All' && (
                  <motion.div
                    key="tier2"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="flex items-center gap-1 min-w-0 sm:flex-1"
                  >
                    <div className="hidden sm:block w-px h-4 bg-mahogany/15 mx-1.5 flex-shrink-0" />
                    <div className="relative flex-1 min-w-0">
                      <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-cream-page to-transparent z-10" />
                      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
                        {(['All', ...(activeTier === 'Food' ? FOOD_CATS : DRINK_CATS).filter(c => categories.includes(c))] as string[]).map((cat) => {
                          const Icon = CATEGORY_ICONS[cat] ?? Utensils;
                          return (
                            <button
                              key={cat}
                              ref={(el) => { if (el) pillRefs.current.set(cat, el); else pillRefs.current.delete(cat); }}
                              onClick={() => setActive(cat)}
                              className={`relative font-editorial text-[10px] tracking-[0.2em] uppercase whitespace-nowrap px-4 py-2 rounded-full flex-shrink-0 cursor-pointer glass-pill ${
                                active === cat ? 'text-cream-page' : 'text-mahogany/65 hover:text-mahogany'
                              }`}
                            >
                              {active === cat && (
                                <motion.span
                                  layoutId="cat-pill"
                                  className="absolute inset-0 rounded-full glass-pill-active"
                                  transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
                                />
                              )}
                              <span className="relative z-10 inline-flex items-center gap-2">
                                <Icon className="w-3.5 h-3.5" />
                                {cat}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="mt-4 border-b border-mahogany/10" />
          </div>

          {/* Items */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-72 bg-mahogany/5 animate-pulse rounded" />
              ))}
            </div>
          ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filtered.map((item) => (
                <MenuItemCard
                  key={`${item.category}-${item.name}`}
                  imageUrl={item.imageUrl}
                  isVegetarian={item.isVegetarian}
                  name={item.name}
                  price={item.price}
                  originalPrice={item.originalPrice}
                  quantity={item.quantity}
                  prepTimeInMinutes={item.prepTimeInMinutes}
                  tag={item.tag}
                  onAdd={(rect) => handleAddToCart(item, 1, rect)}
                  onCardClick={() => setSelectedItem(item)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
          )}
        </div>
      </section>

      {/* Dilmah Partnership Note */}
      <section className="w-full bg-mahogany/5 border-t border-mahogany/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-16">
          <p className="font-editorial text-[9px] tracking-[0.25em] uppercase text-clay-warm shrink-0">
            Authorised Dilmah Partner
          </p>
          <p className="font-body text-sm text-mahogany/60 leading-relaxed">
            All Dilmah teas served at Ceylon Stories are sourced directly through our authorised partnership. Each reserve tea is prepared to Dilmah&apos;s strict steeping guidelines — temperature, timing, and vessel included.
          </p>
        </div>
      </section>
    </>
  );
}

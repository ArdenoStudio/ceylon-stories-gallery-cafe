'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'motion/react';
import { ShoppingBag, LayoutGrid, Utensils, UtensilsCrossed, Leaf, Wheat, Sandwich, ChefHat, Cookie, Coffee, Wine, GlassWater, Droplets, Zap, type LucideIcon } from 'lucide-react';
import { MenuItemCard } from '@/src/components/ui/menu-item-card';
import { MenuItemModal, type MenuItemDetail } from '@/src/components/ui/menu-item-modal';
import { CartProvider, useCart } from '@/src/components/CartContext';
import { CartDrawer } from '@/src/components/CartDrawer';
import type { MenuItem, MenuCategory } from '@/src/types/menu';

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

  // Quadratic bezier control point — above both endpoints
  const cx = (x0 + x1) / 2;
  const cy = Math.min(y0, y1) - 160;

  // Sample N+1 points along the bezier curve for smooth arc keyframes
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

export default function MenuPage() {
  return (
    <CartProvider>
      <MenuPageContent />
    </CartProvider>
  );
}

function MenuPageContent() {
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

  const { addItem, totalItems, openCart } = useCart();
  const [active, setActive] = useState('All');
  const [activeTier, setActiveTier] = useState<'All' | 'Food' | 'Drinks'>('All');
  const [selectedItem, setSelectedItem] = useState<MenuItemDetail | null>(null);
  const [flyItems, setFlyItems] = useState<FlyItemData[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const flyCounter = useRef(0);
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const bagControls = useAnimation();
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

  const triggerFly = (sourceRect: DOMRect, imageUrl: string) => {
    setTimeout(() => {
      const cartEl = cartButtonRef.current;
      const toX = cartEl ? cartEl.getBoundingClientRect().left + cartEl.getBoundingClientRect().width / 2 : 56;
      const toY = cartEl ? cartEl.getBoundingClientRect().top + cartEl.getBoundingClientRect().height / 2 : window.innerHeight - 40;
      setFlyItems(prev => [...prev, {
        id: ++flyCounter.current,
        fromX: sourceRect.left + sourceRect.width / 2,
        fromY: sourceRect.top + sourceRect.height / 2,
        toX,
        toY,
        imageUrl,
      }]);
    }, 0);
  };

  const handleFlyDone = (id: number) => {
    setFlyItems(prev => prev.filter(i => i.id !== id));
    bagControls.start({ scale: [1, 1.5, 0.9, 1.15, 1], rotate: [-6, 6, -3, 0], transition: { duration: 0.4, ease: 'easeOut' } });
  };

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
      <CartDrawer />

      {flyItems.map(data => (
        <FlyingItem key={data.id} data={data} onDone={() => handleFlyDone(data.id)} />
      ))}

      <MenuItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={(qty, rect) => selectedItem && handleAddToCart(selectedItem as MenuItem, qty, rect)}
      />

      {/* Floating cart button */}
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
            aria-label={`Open order with ${totalItems} item${totalItems === 1 ? '' : 's'}`}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,rgba(173,126,77,0.10)_25%,transparent_25%,transparent_75%,rgba(173,126,77,0.10)_75%)] bg-[length:12px_12px] opacity-30 mix-blend-multiply"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.44),transparent_58%)]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-5 top-[5px] h-px bg-white/65"
            />

            <span
              className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#bf9464]/25 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.58),transparent_55%),linear-gradient(180deg,rgba(251,236,209,0.98),rgba(226,191,141,0.74))] shadow-[inset_0_2px_4px_rgba(255,255,255,0.52),inset_0_-2px_4px_rgba(106,73,52,0.10)] transition-transform duration-300 group-hover:scale-[1.04] group-hover:-rotate-3 group-active:translate-y-px group-active:scale-95"
            >
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

      {/* Hero */}
      <section className="relative w-full bg-mahogany text-cream-page pt-40 pb-20 px-6 overflow-hidden">
        <div className="batik-line absolute top-0 left-0 bg-white/20" />
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <span className="absolute top-10 left-[-5%] font-display italic text-[28vw] text-mahogany-soft/15 leading-none">03</span>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="font-editorial text-[10px] tracking-[0.25em] uppercase text-gold-leaf mb-6 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-gold-leaf/50" /> 03 — THE MENU
          </p>
          <h1 className="font-display font-light text-cream-page text-[clamp(52px,8vw,110px)] leading-[0.9] tracking-[-0.02em]">
            Food, Tea <br />
            <i className="text-clay-warm">& the Lounge.</i>
          </h1>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="relative w-full bg-cream-page py-[clamp(60px,8vh,120px)] px-6">
        <div className="max-w-7xl mx-auto">

          {/* Filter Tabs */}
          <div className="mb-16">
            <motion.div layout className={`glass-filter-bar rounded-2xl px-3 py-3 flex items-center gap-1 ${activeTier === 'All' ? 'justify-center' : ''}`}>
              {/* Tier 1 */}
              <motion.div layout="position" className="flex gap-1.5 flex-shrink-0">
                {TIERS.map(({ label, Icon }) => (
                  <button
                    key={label}
                    onClick={() => { setActiveTier(label); setActive('All'); }}
                    className={`font-editorial text-[10px] tracking-[0.2em] uppercase whitespace-nowrap px-4 py-2 rounded-full flex-shrink-0 cursor-pointer inline-flex items-center gap-1.5 ${
                      activeTier === label
                        ? 'glass-pill-active text-cream-page'
                        : 'glass-pill text-mahogany/65 hover:text-mahogany'
                    }`}
                  >
                    <Icon className="w-2.5 h-2.5" />
                    {label}
                  </button>
                ))}
              </motion.div>

              {/* Divider + Tier 2 */}
              <AnimatePresence>
                {activeTier !== 'All' && (
                  <motion.div
                    key="tier2"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="flex items-center gap-1 flex-1 min-w-0 overflow-hidden"
                  >
                    <div className="w-px h-4 bg-mahogany/15 mx-1.5 flex-shrink-0" />
                    <div className="relative flex-1 min-w-0">
                      <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white/10 to-transparent z-10" />
                      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
                        {(['All', ...(activeTier === 'Food' ? FOOD_CATS : DRINK_CATS).filter(c => categories.includes(c))] as string[]).map((cat) => {
                          const Icon = CATEGORY_ICONS[cat] ?? Utensils;
                          return (
                            <button
                              key={cat}
                              ref={(el) => { if (el) pillRefs.current.set(cat, el); else pillRefs.current.delete(cat); }}
                              onClick={() => setActive(cat)}
                              className={`font-editorial text-[10px] tracking-[0.2em] uppercase whitespace-nowrap px-4 py-2 rounded-full flex-shrink-0 cursor-pointer inline-flex items-center gap-1.5 ${
                                active === cat
                                  ? 'glass-pill-active text-cream-page'
                                  : 'glass-pill text-mahogany/65 hover:text-mahogany'
                              }`}
                            >
                              <Icon className="w-2.5 h-2.5" />
                              {cat}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
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

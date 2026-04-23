'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import { MenuItemCard } from '@/src/components/ui/menu-item-card';
import { MenuItemModal, type MenuItemDetail } from '@/src/components/ui/menu-item-modal';
import { CartProvider, useCart } from '@/src/components/CartContext';
import { CartDrawer } from '@/src/components/CartDrawer';

const categories = ['All', 'Food', 'Beverages', 'Dilmah Tea', 'Shisha'];

const menuItems = [
  // Food
  {
    category: 'Food',
    name: 'Terracotta Shakshuka',
    description: 'Two eggs poached in smoky tomato and roasted red pepper sauce, served in a handmade clay pot with sourdough.',
    tag: 'New',
    imageUrl: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=600&h=400&fit=crop&q=80',
    isVegetarian: true,
    price: 1450,
    originalPrice: 1800,
    quantity: 'Serves 1',
    prepTimeInMinutes: 15,
  },
  {
    category: 'Food',
    name: 'Coconut Roti Stack',
    description: 'Layered coconut pol roti with house-made seeni sambol, buffalo curd, and a slow-cooked lunu miris.',
    tag: '',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop&q=80',
    isVegetarian: true,
    price: 1200,
    originalPrice: 1500,
    quantity: 'Serves 1–2',
    prepTimeInMinutes: 12,
  },
  {
    category: 'Food',
    name: 'Gallery Toast',
    description: 'Thick-cut sourdough, cultured butter, heirloom tomato, and a six-minute egg. Simple, deliberate.',
    tag: '',
    imageUrl: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&h=400&fit=crop&q=80',
    isVegetarian: true,
    price: 980,
    originalPrice: 1200,
    quantity: 'Serves 1',
    prepTimeInMinutes: 10,
  },
  {
    category: 'Food',
    name: 'Ceylon Waffle',
    description: 'Kithul treacle and coconut milk waffle with buffalo curd cream and a sprinkle of crushed cadju.',
    tag: 'Seasonal',
    imageUrl: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&h=400&fit=crop&q=80',
    isVegetarian: true,
    price: 1350,
    originalPrice: 1600,
    quantity: 'Serves 1',
    prepTimeInMinutes: 12,
  },
  {
    category: 'Food',
    name: 'Artisan Cheese Board',
    description: 'A curated selection of local and imported cheeses, house chutney, seed crackers, and dried fruit.',
    tag: '',
    imageUrl: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=600&h=400&fit=crop&q=80',
    isVegetarian: true,
    price: 2200,
    originalPrice: 2800,
    quantity: 'Serves 2',
    prepTimeInMinutes: 10,
  },
  // Beverages
  {
    category: 'Beverages',
    name: 'Cardamom Cold Brew',
    description: 'Ceylon black steeped cold for 18 hours, finished with hand-crushed cardamom and coconut cream.',
    tag: 'New',
    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=400&fit=crop&q=80',
    isVegetarian: true,
    price: 750,
    originalPrice: 950,
    quantity: '350 ml',
    prepTimeInMinutes: 5,
  },
  {
    category: 'Beverages',
    name: 'Heritage Lemonade',
    description: 'Fresh lime, ginger syrup, and a pinch of sea salt — served long over hand-cut ice.',
    tag: '',
    imageUrl: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=600&h=400&fit=crop&q=80',
    isVegetarian: true,
    price: 650,
    originalPrice: 800,
    quantity: '400 ml',
    prepTimeInMinutes: 5,
  },
  {
    category: 'Beverages',
    name: 'Mango & Chilli Granita',
    description: "Alphonso mango purée set with a whisper of bird's eye chilli. Served in a chilled terracotta cup.",
    tag: 'Seasonal',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=400&fit=crop&q=80',
    isVegetarian: true,
    price: 700,
    originalPrice: 900,
    quantity: '250 ml',
    prepTimeInMinutes: 8,
  },
  {
    category: 'Beverages',
    name: 'Specialty Flat White',
    description: 'Single-origin Ceylon robusta, 18g basket, served at 65°C. Milk from a farm just outside Nuwara Eliya.',
    tag: '',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop&q=80',
    isVegetarian: true,
    price: 680,
    originalPrice: 850,
    quantity: '180 ml',
    prepTimeInMinutes: 5,
  },
  {
    category: 'Beverages',
    name: 'Spiced Coconut Latte',
    description: 'Housemade coconut milk, cinnamon, clove, and a double shot of Ceylon espresso.',
    tag: '',
    imageUrl: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&h=400&fit=crop&q=80',
    isVegetarian: true,
    price: 720,
    originalPrice: 900,
    quantity: '280 ml',
    prepTimeInMinutes: 5,
  },
  // Dilmah Tea
  {
    category: 'Dilmah Tea',
    name: 'Silver Tips Reserve',
    description: "Nuwara Eliya's rarest leaves harvested once a year at dawn. Steeped at exactly 75°C. No additions.",
    tag: 'Featured',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=400&fit=crop&q=80',
    isVegetarian: true,
    price: 1800,
    originalPrice: 2200,
    quantity: 'Per Pot',
    prepTimeInMinutes: 8,
  },
  {
    category: 'Dilmah Tea',
    name: 'Ceylon Single Estate',
    description: 'A full-bodied Dimbula black — clean tannins, golden liquor. Served with pure kithul jaggery.',
    tag: '',
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=400&fit=crop&q=80',
    isVegetarian: true,
    price: 1200,
    originalPrice: 1500,
    quantity: 'Per Pot',
    prepTimeInMinutes: 8,
  },
  {
    category: 'Dilmah Tea',
    name: 'High Grown Green',
    description: 'Delicate Uda Pussellawa green, light-steamed, served in a Japanese-style ceramic cup at 70°C.',
    tag: '',
    imageUrl: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&h=400&fit=crop&q=80',
    isVegetarian: true,
    price: 1100,
    originalPrice: 1400,
    quantity: 'Per Pot',
    prepTimeInMinutes: 7,
  },
  {
    category: 'Dilmah Tea',
    name: 'Gallery Chai',
    description: 'Our signature blend — black Ceylon, cardamom, cinnamon, and clove — served in hand-thrown terracotta cups.',
    tag: 'House Blend',
    imageUrl: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&h=400&fit=crop&q=80',
    isVegetarian: true,
    price: 950,
    originalPrice: 1200,
    quantity: 'Per Pot',
    prepTimeInMinutes: 8,
  },
  {
    category: 'Dilmah Tea',
    name: 'Silver Needles White',
    description: 'Rare white tea from the hill country — unopened buds only. Whisper-light and naturally sweet.',
    tag: '',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=80',
    isVegetarian: true,
    price: 1600,
    originalPrice: 2000,
    quantity: 'Per Pot',
    prepTimeInMinutes: 8,
  },
  // Shisha
  {
    category: 'Shisha',
    name: 'Rose & Mint',
    description: 'A classic pairing — Bulgarian rose water tobacco with fresh spearmint and a cooling exhale. Evenings only.',
    tag: '',
    imageUrl: 'https://images.unsplash.com/photo-1544961371-516024d38bbc?w=600&h=400&fit=crop&q=80',
    isVegetarian: false,
    price: 2800,
    originalPrice: 3500,
    quantity: '60 min session',
    prepTimeInMinutes: 10,
  },
  {
    category: 'Shisha',
    name: 'Ceylon Spice',
    description: 'A proprietary blend of cinnamon, clove, and black tea tobacco. The house signature.',
    tag: 'House Blend',
    imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=400&fit=crop&q=80',
    isVegetarian: false,
    price: 2800,
    originalPrice: 3500,
    quantity: '60 min session',
    prepTimeInMinutes: 10,
  },
  {
    category: 'Shisha',
    name: 'Double Apple',
    description: 'The perennial — red and green apple tobacco, lightly sweetened, clean and smooth.',
    tag: '',
    imageUrl: 'https://images.unsplash.com/photo-1526143228535-1a75e1c33e6e?w=600&h=400&fit=crop&q=80',
    isVegetarian: false,
    price: 2500,
    originalPrice: 3200,
    quantity: '60 min session',
    prepTimeInMinutes: 10,
  },
  {
    category: 'Shisha',
    name: 'Grape & Gum Mastic',
    description: 'Dark grape molasses with a whisper of Greek mastic resin — unexpectedly aromatic.',
    tag: '',
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop&q=80',
    isVegetarian: false,
    price: 3000,
    originalPrice: 3800,
    quantity: '60 min session',
    prepTimeInMinutes: 10,
  },
];

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
  const { addItem, totalItems, openCart } = useCart();
  const [active, setActive] = useState('All');
  const [selectedItem, setSelectedItem] = useState<MenuItemDetail | null>(null);
  const [flyItems, setFlyItems] = useState<FlyItemData[]>([]);
  const flyCounter = useRef(0);
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const bagControls = useAnimation();

  const filtered = active === 'All' ? menuItems : menuItems.filter((i) => i.category === active);

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

  const handleAddToCart = (item: typeof menuItems[0], qty: number, sourceRect?: DOMRect) => {
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
        onAddToCart={(qty, rect) => selectedItem && handleAddToCart(selectedItem as typeof menuItems[0], qty, rect)}
      />

      {/* Floating cart button */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.button
            ref={cartButtonRef}
            type="button"
            onClick={openCart}
            className="group fixed bottom-5 left-5 md:bottom-7 md:left-7 z-[90] isolate flex items-center gap-3 overflow-hidden rounded-[18px] border border-mahogany/15 bg-cream-paper/90 px-3 py-3 text-mahogany shadow-[0_18px_44px_rgba(42,24,16,0.18)] backdrop-blur-md transition-[border-color,background-color,box-shadow,transform] duration-500 hover:border-gold-leaf/45 hover:bg-cream-page/95 hover:shadow-[0_22px_54px_rgba(42,24,16,0.22)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`Open order with ${totalItems} item${totalItems === 1 ? '' : 's'}`}
          >
            <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(184,146,74,0.12),transparent_45%,rgba(181,85,46,0.10))] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="absolute inset-[5px] rounded-[13px] border border-white/35 opacity-60" />

            <motion.span
              animate={bagControls}
              className="relative flex h-11 w-11 items-center justify-center rounded-[12px] border border-clay-warm/15 bg-[linear-gradient(145deg,rgba(244,236,220,0.98),rgba(235,224,202,0.92))] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_18px_rgba(42,24,16,0.08)]"
            >
              <ShoppingBag className="h-4 w-4 shrink-0 text-clay-warm" />
            </motion.span>

            <span className="relative flex min-w-[5rem] flex-col items-start justify-center leading-none">
              <span className="font-body text-[8px] font-medium uppercase tracking-[0.32em] text-mahogany/42">
                Your cart
              </span>
              <span className="mt-1.5 font-editorial text-[11px] uppercase tracking-[0.24em] text-mahogany">
                Order
              </span>
            </span>

            <motion.span
              key={totalItems}
              initial={{ scale: 0.86, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-10 min-w-10 items-center justify-center rounded-full border border-mahogany/10 bg-mahogany px-3 font-body text-sm font-semibold text-cream-page shadow-[0_10px_22px_rgba(42,24,16,0.22)]"
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
          <div className="flex flex-wrap gap-3 mb-16 border-b border-mahogany/10 pb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`font-editorial text-[10px] tracking-[0.2em] uppercase px-4 py-2 border transition-colors duration-300 ${
                  active === cat
                    ? 'bg-mahogany text-cream-page border-mahogany'
                    : 'text-mahogany/60 border-mahogany/20 hover:border-mahogany/60 hover:text-mahogany'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Items */}
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

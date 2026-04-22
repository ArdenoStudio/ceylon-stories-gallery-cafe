'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const categories = ['All', 'Food', 'Beverages', 'Dilmah Tea', 'Shisha'];

const menuItems = [
  // Food
  { category: 'Food', name: 'Terracotta Shakshuka', description: 'Two eggs poached in smoky tomato and roasted red pepper sauce, served in a handmade clay pot with sourdough.', tag: 'New' },
  { category: 'Food', name: 'Coconut Roti Stack', description: 'Layered coconut pol roti with house-made seeni sambol, buffalo curd, and a slow-cooked lunu miris.', tag: '' },
  { category: 'Food', name: 'Gallery Toast', description: 'Thick-cut sourdough, cultured butter, heirloom tomato, and a six-minute egg. Simple, deliberate.', tag: '' },
  { category: 'Food', name: 'Ceylon Waffle', description: 'Kithul treacle and coconut milk waffle with buffalo curd cream and a sprinkle of crushed cadju.', tag: 'Seasonal' },
  { category: 'Food', name: 'Artisan Cheese Board', description: 'A curated selection of local and imported cheeses, house chutney, seed crackers, and dried fruit.', tag: '' },
  // Beverages
  { category: 'Beverages', name: 'Cardamom Cold Brew', description: 'Ceylon black steeped cold for 18 hours, finished with hand-crushed cardamom and coconut cream.', tag: 'New' },
  { category: 'Beverages', name: 'Heritage Lemonade', description: 'Fresh lime, ginger syrup, and a pinch of sea salt — served long over hand-cut ice.', tag: '' },
  { category: 'Beverages', name: 'Mango & Chilli Granita', description: 'Alphonso mango purée set with a whisper of bird's eye chilli. Served in a chilled terracotta cup.', tag: 'Seasonal' },
  { category: 'Beverages', name: 'Specialty Flat White', description: 'Single-origin Ceylon robusta, 18g basket, served at 65°C. Milk from a farm just outside Nuwara Eliya.', tag: '' },
  { category: 'Beverages', name: 'Spiced Coconut Latte', description: 'Housemade coconut milk, cinnamon, clove, and a double shot of Ceylon espresso.', tag: '' },
  // Dilmah Tea
  { category: 'Dilmah Tea', name: 'Silver Tips Reserve', description: 'Nuwara Eliya's rarest leaves harvested once a year at dawn. Steeped at exactly 75°C. No additions.', tag: 'Featured' },
  { category: 'Dilmah Tea', name: 'Ceylon Single Estate', description: 'A full-bodied Dimbula black — clean tannins, golden liquor. Served with pure kithul jaggery.', tag: '' },
  { category: 'Dilmah Tea', name: 'High Grown Green', description: 'Delicate Uda Pussellawa green, light-steamed, served in a Japanese-style ceramic cup at 70°C.', tag: '' },
  { category: 'Dilmah Tea', name: 'Gallery Chai', description: 'Our signature blend — black Ceylon, cardamom, cinnamon, and clove — served in hand-thrown terracotta cups.', tag: 'House Blend' },
  { category: 'Dilmah Tea', name: 'Silver Needles White', description: 'Rare white tea from the hill country — unopened buds only. Whisper-light and naturally sweet.', tag: '' },
  // Shisha
  { category: 'Shisha', name: 'Rose & Mint', description: 'A classic pairing — Bulgarian rose water tobacco with fresh spearmint and a cooling exhale. Evenings only.', tag: '' },
  { category: 'Shisha', name: 'Ceylon Spice', description: 'A proprietary blend of cinnamon, clove, and black tea tobacco. The house signature.', tag: 'House Blend' },
  { category: 'Shisha', name: 'Double Apple', description: 'The perennial — red and green apple tobacco, lightly sweetened, clean and smooth.', tag: '' },
  { category: 'Shisha', name: 'Grape & Gum Mastic', description: 'Dark grape molasses with a whisper of Greek mastic resin — unexpectedly aromatic.', tag: '' },
];

export default function MenuPage() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? menuItems : menuItems.filter((i) => i.category === active);

  return (
    <>
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0"
            >
              {filtered.map((item, idx) => (
                <motion.div
                  key={`${item.category}-${item.name}`}
                  className="flex flex-col py-8 border-b border-mahogany/10 group"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <h3 className="font-display text-[22px] text-mahogany leading-[1.1] group-hover:italic transition-all duration-300">
                      {item.name}
                    </h3>
                    {item.tag && (
                      <span className="font-editorial text-[9px] tracking-[0.2em] uppercase text-clay-warm border border-clay-warm/40 px-2 py-0.5 shrink-0 mt-1">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="font-editorial text-[9px] tracking-[0.18em] uppercase text-mahogany/40 mb-3">
                    {item.category}
                  </p>
                  <p className="font-body text-[13px] text-mahogany/60 leading-[1.7]">
                    {item.description}
                  </p>
                </motion.div>
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
            All Dilmah teas served at Ceylon Stories are sourced directly through our authorised partnership. Each reserve tea is prepared to Dilmah's strict steeping guidelines — temperature, timing, and vessel included.
          </p>
        </div>
      </section>
    </>
  );
}

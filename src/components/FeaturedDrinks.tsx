'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import AnimatedDrinkStack, { drinkData, TOTAL_DRINKS, type DrinkCard } from './ui/animate-card-animation';
import { MotifCorner } from './heritage/MotifCorner';

const initialCards: DrinkCard[] = [
  { id: 1, contentType: 1 },
  { id: 2, contentType: 2 },
  { id: 3, contentType: 3 },
];

export default function FeaturedDrinks() {
  const [cards, setCards] = useState(initialCards);
  const [nextId, setNextId] = useState(4);

  const handleNext = () => {
    const nextContentType = (cards[2].contentType % TOTAL_DRINKS) + 1;
    setCards([...cards.slice(1), { id: nextId, contentType: nextContentType }]);
    setNextId((prev) => prev + 1);
  };

  const currentItem = drinkData[cards[0].contentType];
  const currentIndex = cards[0].contentType;

  return (
    <section className="relative w-full bg-mahogany py-[clamp(80px,12vh,160px)] px-6 overflow-hidden">
      <div className="batik-line absolute top-0 left-0 bg-white/20" />

      <MotifCorner motif="tea-leaf" position="tr" size={140} className="text-cream-page/10" />
      <MotifCorner motif="fern-frond" position="bl" size={110} className="text-cream-page/10 hidden md:block" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-end gap-16 lg:gap-20 xl:gap-28">

          {/* Left — Interactive Card Stack + Button */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-auto flex-shrink-0 flex flex-col items-center gap-0"
          >
            <AnimatedDrinkStack cards={cards} />
            <div className="relative z-10 flex w-full items-center justify-center border-t border-cream-page/10 py-5">
              <button
                onClick={handleNext}
                className="flex h-10 cursor-pointer select-none items-center justify-center gap-2 rounded-full border border-cream-page/20 bg-cream-page/10 px-6 font-editorial text-[10px] tracking-[0.2em] uppercase text-cream-page/70 transition-all hover:bg-cream-page/18 hover:text-cream-page active:scale-[0.98]"
              >
                Next Item
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Vertical rule — desktop only */}
          <div className="hidden lg:block w-px self-stretch bg-gradient-to-b from-transparent via-gold-leaf/25 to-transparent flex-shrink-0" />

          {/* Right — Text Panel */}
          <div className="flex-1 flex flex-col min-w-0 pb-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-editorial text-[10px] tracking-[0.3em] uppercase text-gold-leaf mb-7"
            >
              Curated Selection
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-light text-cream-page text-[clamp(44px,5.5vw,82px)] leading-[0.88] tracking-[-0.02em] mb-10"
            >
              Special <br /><i className="text-clay-warm">Items</i>
            </motion.h2>

            {/* Gold rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-14 h-px bg-gold-leaf/50 mb-10 origin-left"
            />

            {/* Reactive current item details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-4 mb-12"
              >
                {currentItem.tag && (
                  <span className="font-editorial text-[9px] tracking-[0.3em] uppercase text-clay-warm">
                    — {currentItem.tag}
                  </span>
                )}
                <h3 className="font-display font-light text-cream-page text-[clamp(24px,2.8vw,38px)] leading-[1.05]">
                  {currentItem.name}
                </h3>
                <p className="font-body text-sm text-cream-page/55 leading-relaxed max-w-[340px]">
                  {currentItem.description}
                </p>
                <p className="font-editorial text-[11px] tracking-[0.18em] text-gold-leaf">
                  LKR {currentItem.price.toLocaleString()}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Item counter */}
            <span className="font-editorial text-[10px] tracking-[0.2em] text-cream-page/35 tabular-nums mb-10">
              {String(currentIndex).padStart(2, '0')} / {String(TOTAL_DRINKS).padStart(2, '0')}
            </span>

            <Link
              href="/menu"
              className="font-editorial text-[10px] tracking-[0.22em] uppercase text-gold-leaf inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 w-fit"
            >
              Explore Full Menu <span>→</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

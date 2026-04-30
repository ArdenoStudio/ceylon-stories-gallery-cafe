'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { drinkData } from '@/src/components/ui/animate-card-animation';

type GalleryCategory = 'All' | 'Cafe' | 'Food' | 'Tea' | 'People' | 'Lounge';

type GalleryItem = {
  title: string;
  category: Exclude<GalleryCategory, 'All'>;
  image: string;
  span?: string;
};

const categories: GalleryCategory[] = ['All', 'Cafe', 'Food', 'Tea', 'People', 'Lounge'];

const galleryItems: GalleryItem[] = [
  {
    title: 'Founders at Ceylon Stories',
    category: 'People',
    image: '/images/story/founders.jpg',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    title: 'Tea tasting table',
    category: 'Tea',
    image: '/images/story/tea-tasting.jpg',
  },
  {
    title: 'Cafe team',
    category: 'People',
    image: '/images/story/team.jpg',
  },
  {
    title: 'Family table',
    category: 'Cafe',
    image: '/images/story/founders-family.jpg',
    span: 'md:col-span-2',
  },
  {
    title: 'Cardamom Cold Brew',
    category: 'Food',
    image: drinkData[1].image,
  },
  {
    title: 'Gallery Chai',
    category: 'Tea',
    image: drinkData[3].image,
  },
  {
    title: 'Heritage Lemonade',
    category: 'Food',
    image: drinkData[4].image,
  },
  {
    title: 'Evening lounge mood',
    category: 'Lounge',
    image: '/images/story/parents.jpg',
    span: 'md:col-span-2',
  },
  {
    title: 'Silver Tips Reserve',
    category: 'Tea',
    image: drinkData[5].image,
  },
  {
    title: 'Spiced Coconut Latte',
    category: 'Food',
    image: drinkData[2].image,
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const items = useMemo(
    () =>
      activeCategory === 'All'
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  return (
    <>
      <section className="relative overflow-hidden bg-mahogany px-6 pb-16 pt-36 text-cream-page md:px-10 md:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(184,146,74,0.18),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(181,85,46,0.18),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-6 flex items-center gap-3 font-editorial text-[10px] uppercase tracking-[0.32em] text-gold-leaf">
            <span className="h-px w-8 bg-gold-leaf/50" />
            The Gallery
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_0.72fr] md:items-end">
            <h1 className="font-display text-[clamp(58px,9vw,128px)] font-light leading-[0.86] tracking-[-0.025em]">
              Scenes from
              <br />
              <i className="text-clay-warm">the cafe.</i>
            </h1>
            <p className="max-w-md font-body text-[15px] leading-[1.85] text-cream-page/62 md:justify-self-end">
              A living gallery for the rooms, dishes, tea rituals, and people that make Ceylon Stories
              feel like more than a menu.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream-page px-5 py-[clamp(52px,8vh,96px)] text-mahogany md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="sticky top-24 z-20 mb-8 flex gap-2 overflow-x-auto border border-mahogany/12 bg-cream-page/88 p-2 backdrop-blur-md [scrollbar-width:none] md:top-28 md:w-fit [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => {
              const active = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-full px-4 py-2 font-editorial text-[10px] uppercase tracking-[0.2em] transition-colors ${
                    active
                      ? 'bg-mahogany text-cream-page'
                      : 'text-mahogany/62 hover:bg-cream-paper hover:text-mahogany'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <motion.div layout className="grid auto-rows-[230px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.button
                  layout
                  key={`${item.category}-${item.title}`}
                  type="button"
                  onClick={() => setSelected(item)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 18 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative overflow-hidden border border-mahogany/12 bg-cream-paper text-left shadow-ink ${item.span ?? ''}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover photo-heritage transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(42,24,16,0.72),transparent_58%)] opacity-80 transition-opacity group-hover:opacity-95" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="font-editorial text-[9px] uppercase tracking-[0.24em] text-gold-leaf">
                      {item.category}
                    </p>
                    <h2 className="mt-2 font-display text-2xl leading-none text-cream-page">{item.title}</h2>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-ink-deep/82 px-5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close gallery image"
              className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream-page text-mahogany transition-colors hover:bg-gold-leaf"
            >
              <X className="h-5 w-5" strokeWidth={1.8} />
            </button>
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-5xl"
            >
              <div className="max-h-[78vh] overflow-hidden border border-cream-page/20 bg-mahogany">
                <img
                  src={selected.image}
                  alt={selected.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[78vh] w-full object-contain"
                />
              </div>
              <div className="mt-4 flex items-center justify-between gap-4 text-cream-page">
                <p className="font-display text-3xl leading-none">{selected.title}</p>
                <p className="font-editorial text-[10px] uppercase tracking-[0.24em] text-gold-leaf">
                  {selected.category}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

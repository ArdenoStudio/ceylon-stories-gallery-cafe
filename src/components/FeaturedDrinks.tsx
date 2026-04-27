'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Clock, ArrowLeft, ArrowRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { drinkData, TOTAL_DRINKS } from './ui/animate-card-animation';
import { MotifCorner } from './heritage/MotifCorner';
import { useCart } from './CartContext';
import { useCartUI } from './CartUI';
import { useReveal } from '@/src/hooks/useReveal';

const meta: Record<number, { tag: string; quantity: string; mins: number; isVegetarian: boolean }> = {
  1: { tag: 'New', quantity: 'Serves 1', mins: 5, isVegetarian: true },
  2: { tag: '', quantity: 'Serves 1', mins: 4, isVegetarian: true },
  3: { tag: 'House Blend', quantity: 'Pot for 1', mins: 6, isVegetarian: true },
  4: { tag: '', quantity: 'Serves 1', mins: 3, isVegetarian: true },
  5: { tag: 'Featured', quantity: 'Pot for 1', mins: 6, isVegetarian: true },
};

type Item = {
  id: number;
  n: string;
  name: string;
  description: string;
  price: number;
  tag: string;
  quantity: string;
  mins: number;
  isVegetarian: boolean;
  image: string;
};

export default function FeaturedDrinks() {
  const items: Item[] = Array.from({ length: TOTAL_DRINKS }, (_, i) => {
    const id = i + 1;
    const d = drinkData[id];
    const m = meta[id] ?? { tag: d.tag || '', quantity: 'Serves 1', mins: 5, isVegetarian: true };
    return {
      id,
      n: String(id).padStart(2, '0'),
      name: d.name,
      description: d.description,
      price: d.price,
      tag: m.tag,
      quantity: m.quantity,
      mins: m.mins,
      isVegetarian: m.isVegetarian,
      image: d.image,
    };
  });

  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { addItem } = useCart();
  const { triggerFly } = useCartUI();

  const headerRef = useReveal();
  const trackWrapRef = useReveal('-8%');

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const update = () => {
      const trackRect = track.getBoundingClientRect();
      const center = trackRect.left + trackRect.width / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const slideCenter = r.left + r.width / 2;
        const dist = Math.abs(slideCenter - center);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });
      setActive(bestIdx);
      const { scrollLeft, scrollWidth, clientWidth } = track;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const goTo = (i: number) => {
    const track = trackRef.current;
    const el = slideRefs.current[i];
    if (!track || !el) return;
    const trackRect = track.getBoundingClientRect();
    const slideRect = el.getBoundingClientRect();
    const target = track.scrollLeft + (slideRect.left - trackRect.left) - 24;
    track.scrollTo({ left: target, behavior: 'smooth' });
    setActive(i);
  };

  const prev = () => goTo(Math.max(0, active - 1));
  const next = () => goTo(Math.min(items.length - 1, active + 1));

  const handleAdd = (item: Item, rect: DOMRect) => {
    addItem({
      id: `special-${item.name}`,
      name: item.name,
      price: item.price,
      imageUrl: item.image,
      category: 'Special Items',
    });
    triggerFly(rect, item.image);
  };

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [openIndex]);

  const openItem = openIndex !== null ? items[openIndex] : null;

  return (
    <section className="relative w-full bg-mahogany-soft overflow-hidden py-[clamp(80px,12vh,160px)]">
      <div className="batik-line absolute top-0 left-0 bg-white/20" />

      <MotifCorner motif="tea-leaf" position="tr" size={140} className="text-cream-page/10" />
      <MotifCorner motif="fern-frond" position="bl" size={110} className="text-cream-page/10 hidden md:block" />

      {/* Header */}
      <div ref={headerRef} className="reveal-up relative max-w-[1380px] mx-auto px-6 md:px-10 mb-12 md:mb-16">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="flex flex-col gap-5 max-w-xl">
            <p className="font-editorial text-[10px] tracking-[0.3em] uppercase text-gold-leaf flex items-center gap-3">
              <span className="w-8 h-px bg-gold-leaf/40" />
              <span>Curated Selection</span>
            </p>
            <h2 className="font-display font-light text-cream-page text-[clamp(44px,5.5vw,82px)] leading-[0.9] tracking-[-0.02em] text-balance">
              Special <i className="text-clay-warm">Items</i>
            </h2>
          </div>
          <p className="font-body text-[14px] text-cream-page/55 leading-[1.75] text-pretty max-w-sm md:text-right">
            What the kitchen and bar are most proud of right now &mdash; rotated as the season turns.
          </p>
        </div>
      </div>

      {/* Track */}
      <div ref={trackWrapRef} className="reveal-up relative">
        {/* Right edge fade */}
        <div
          aria-hidden
          className={`pointer-events-none absolute right-0 top-0 z-10 h-full w-[6%] bg-gradient-to-l from-mahogany-soft to-transparent transition-opacity duration-300 ${
            canScrollRight ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          aria-hidden
          className={`pointer-events-none absolute left-0 top-0 z-10 h-full w-[3%] bg-gradient-to-r from-mahogany-soft to-transparent transition-opacity duration-300 ${
            canScrollLeft ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div
          ref={trackRef}
          className="flex gap-4 md:gap-6 overflow-x-auto overscroll-x-contain scroll-smooth touch-pan-y px-6 md:px-10 py-4 -my-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((it, i) => (
            <motion.div
              key={it.id}
              data-idx={i}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              layoutId={`card-${it.id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setOpenIndex(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setOpenIndex(i);
                }
              }}
              className="group cursor-pointer shrink-0 basis-[82%] sm:basis-[58%] md:basis-[40%] lg:basis-[30%] xl:basis-[26%] flex flex-col rounded-2xl overflow-hidden border border-mahogany/10 bg-cream-paper text-mahogany shadow-ink transition-transform duration-500 ease-out hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-leaf focus-visible:ring-offset-4 focus-visible:ring-offset-mahogany"
            >
              <motion.div
                layoutId={`card-image-${it.id}`}
                className="relative aspect-[4/5] w-full overflow-hidden"
              >
                <img
                  src={it.image}
                  alt={it.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover photo-heritage transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mahogany/55 via-transparent to-mahogany/15" />

                {it.tag && (
                  <div className="absolute top-4 left-4">
                    <span className="font-editorial text-[10px] tracking-[0.22em] uppercase text-cream-page border border-cream-page/40 px-2.5 py-1 bg-mahogany/60 backdrop-blur-sm">
                      {it.tag}
                    </span>
                  </div>
                )}

                <div
                  className="absolute top-4 right-4"
                  aria-label={it.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
                >
                  <div
                    className={`w-6 h-6 border flex items-center justify-center rounded-sm bg-cream-page ${
                      it.isVegetarian ? 'border-sage-deep' : 'border-clay-deep'
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${
                        it.isVegetarian ? 'bg-sage-deep' : 'bg-clay-deep'
                      }`}
                    />
                  </div>
                </div>

                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-full flex justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAdd(it, e.currentTarget.getBoundingClientRect());
                    }}
                    aria-label={`Add ${it.name} to order`}
                    className="px-10 py-2.5 font-editorial text-[10px] tracking-[0.28em] uppercase transition-all duration-300 transform translate-y-4 border rounded opacity-0 bg-cream-page/90 text-mahogany backdrop-blur-sm border-mahogany/20 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-mahogany hover:text-cream-page"
                  >
                    Add
                  </button>
                </div>
              </motion.div>

              <div className="flex flex-col flex-1 p-6 md:p-7 text-left">
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-light text-mahogany text-[26px] md:text-[28px] leading-none tabular-nums">
                    Rs. {it.price.toLocaleString()}
                  </span>
                </div>

                <p className="mt-2 font-editorial text-[10px] tracking-[0.22em] uppercase text-mahogany/50">
                  {it.quantity}
                </p>

                <motion.h3
                  layoutId={`card-title-${it.id}`}
                  className="mt-3 font-display text-mahogany text-[24px] md:text-[26px] leading-[1.1] text-balance"
                >
                  {it.name}
                </motion.h3>

                <p className="mt-3 font-body text-[13px] text-mahogany/60 leading-[1.7] text-pretty flex-1">
                  {it.description}
                </p>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-mahogany/10">
                  <div className="flex items-center gap-1.5 font-editorial text-[10px] tracking-[0.18em] uppercase text-mahogany/55">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{it.mins} mins</span>
                  </div>
                  <span className="font-editorial text-[10px] tracking-[0.22em] uppercase text-mahogany/45 group-hover:text-clay-warm transition-colors duration-300">
                    Details &rarr;
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          <div aria-hidden className="shrink-0 basis-[10vw]" />
        </div>
      </div>

      {/* Controls */}
      <div className="relative max-w-[1380px] mx-auto px-6 md:px-10 mt-10 md:mt-12 flex items-center justify-between gap-6 flex-wrap">
        <span className="font-editorial text-[10px] tracking-[0.3em] uppercase text-cream-page/40 tabular-nums">
          {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>

        <Link
          href="/menu"
          className="font-editorial text-[10px] tracking-[0.22em] uppercase text-gold-leaf inline-flex items-center gap-2 hover:gap-3 transition-all duration-300"
        >
          Explore Full Menu <span aria-hidden>&rarr;</span>
        </Link>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={prev}
            disabled={!canScrollLeft}
            aria-label="Previous item"
            className="h-11 w-11 rounded-full bg-cream-page/10 hover:bg-cream-page/20 text-cream-page disabled:opacity-30 disabled:hover:bg-cream-page/10 transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            disabled={!canScrollRight}
            aria-label="Next item"
            className="h-11 w-11 rounded-full bg-cream-page/10 hover:bg-cream-page/20 text-cream-page disabled:opacity-30 disabled:hover:bg-cream-page/10 transition-colors flex items-center justify-center"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openItem && (
          <div className="fixed inset-0 z-[100] flex items-start md:items-center justify-center overflow-y-auto p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpenIndex(null)}
              className="fixed inset-0 bg-ink-night/85 backdrop-blur-md"
            />
            <motion.div
              layoutId={`card-${openItem.id}`}
              className="relative z-[110] w-full max-w-3xl my-8 rounded-2xl overflow-hidden bg-cream-paper text-mahogany shadow-ink"
            >
              <button
                onClick={() => setOpenIndex(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-20 h-9 w-9 rounded-full bg-mahogany text-cream-page hover:bg-mahogany-soft transition-colors flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>

              <motion.div
                layoutId={`card-image-${openItem.id}`}
                className="relative aspect-[16/9] md:aspect-[2/1] w-full overflow-hidden"
              >
                <img
                  src={openItem.image}
                  alt={openItem.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover photo-heritage"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mahogany/45 to-transparent" />
                {openItem.tag && (
                  <div className="absolute top-5 left-5">
                    <span className="font-editorial text-[10px] tracking-[0.22em] uppercase text-cream-page border border-cream-page/40 px-2.5 py-1 bg-mahogany/60 backdrop-blur-sm">
                      {openItem.tag}
                    </span>
                  </div>
                )}
              </motion.div>

              <div className="p-7 md:p-10 flex flex-col gap-6">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <p className="font-editorial text-[10px] tracking-[0.32em] uppercase text-mahogany/55">
                    Curated Selection &mdash; {openItem.n}
                  </p>
                  <span className="font-display font-light text-mahogany text-[34px] md:text-[42px] leading-none tabular-nums">
                    Rs. {openItem.price.toLocaleString()}
                  </span>
                </div>

                <motion.h3
                  layoutId={`card-title-${openItem.id}`}
                  className="font-display text-mahogany text-[40px] md:text-[64px] leading-[0.95] tracking-[-0.02em] text-balance"
                >
                  {openItem.name}
                </motion.h3>

                <p className="font-body text-[15px] md:text-[16px] text-mahogany/70 leading-[1.8] text-pretty max-w-2xl">
                  {openItem.description}
                </p>

                <div className="flex items-center gap-6 flex-wrap border-t border-mahogany/10 mt-2 pt-6">
                  <div className="flex items-center gap-2 font-editorial text-[11px] tracking-[0.22em] uppercase text-mahogany/55">
                    <Clock className="h-4 w-4" />
                    <span>{openItem.mins} mins prep</span>
                  </div>
                  <span className="font-editorial text-[11px] tracking-[0.22em] uppercase text-mahogany/55">
                    {openItem.quantity}
                  </span>
                  <div className="flex items-center gap-2 font-editorial text-[11px] tracking-[0.22em] uppercase text-mahogany/55">
                    <span
                      className={`inline-block w-3.5 h-3.5 rounded-sm border bg-cream-page flex items-center justify-center ${
                        openItem.isVegetarian ? 'border-sage-deep' : 'border-clay-deep'
                      }`}
                    >
                      <span
                        className={`block w-1.5 h-1.5 rounded-full ${
                          openItem.isVegetarian ? 'bg-sage-deep' : 'bg-clay-deep'
                        }`}
                      />
                    </span>
                    <span>{openItem.isVegetarian ? 'Vegetarian' : 'Non-Veg'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-wrap mt-2">
                  <button
                    onClick={(e) => {
                      handleAdd(openItem, e.currentTarget.getBoundingClientRect());
                      setOpenIndex(null);
                    }}
                    className="px-7 py-3.5 font-editorial text-[11px] tracking-[0.28em] uppercase bg-mahogany text-cream-page hover:bg-mahogany-soft transition-colors rounded"
                  >
                    Add to Order &mdash; Rs. {openItem.price.toLocaleString()}
                  </button>
                  <Link
                    href="/menu"
                    className="font-editorial text-[10px] tracking-[0.28em] uppercase text-mahogany/55 hover:text-clay-warm transition-colors inline-flex items-center gap-2"
                  >
                    View Full Menu <span aria-hidden>&rarr;</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

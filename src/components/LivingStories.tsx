import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LivingStories() {
  const [hoveredStory, setHoveredStory] = useState<number | null>(null);

  const stories = [
    {
      date: '12 APRIL 2026',
      title: 'The Hand Behind the Clay',
      excerpt: 'A conversation with master potter Nimal on sourcing the perfect terracotta for our tea service.',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop',
      category: 'Artisans'
    },
    {
      date: '04 APRIL 2026',
      title: 'Silver Tips & Solitude',
      excerpt: 'Understanding the rigorous harvesting process of Dilmah\u2019s most delicate leaf.',
      image: 'https://images.unsplash.com/photo-1594489428504-5c0c480bb148?q=80&w=800&auto=format&fit=crop',
      category: 'Tea Origins'
    },
    {
      date: '28 MARCH 2026',
      title: 'April\u2019s Canvas',
      excerpt: 'Preparing the gallery walls for Anoli Perera\u2019s immersive installation.',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop',
      category: 'Exhibitions'
    }
  ];

  const igImages = [
    'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1627885409600-b611ddf417f7?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515002246390-7bf7e8fc4711?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=400&auto=format&fit=crop'
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.classList.add('active');
      dragStartX.current = e.pageX - scrollContainerRef.current.offsetLeft;
      dragScrollLeft.current = scrollContainerRef.current.scrollLeft;
    }
  };
  const handleMouseLeave = () => {
    isDragging.current = false;
    scrollContainerRef.current?.classList.remove('active');
  };
  const handleMouseUp = () => {
    isDragging.current = false;
    scrollContainerRef.current?.classList.remove('active');
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    if (scrollContainerRef.current) {
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - dragStartX.current) * 2;
      scrollContainerRef.current.scrollLeft = dragScrollLeft.current - walk;
    }
  };

  return (
    <section id="stories" className="relative w-full bg-cream-page pt-[clamp(80px,10vh,150px)] pb-[clamp(100px,12vh,180px)]">
      <div className="batik-line absolute top-0 left-0" />

      {/* Blog Section - Editorial List Pattern */}
      <div className="max-w-7xl mx-auto px-6 mb-32 md:mb-48 relative z-10">
        <div className="flex justify-between items-end mb-16 border-b-2 border-mahogany pb-8">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light text-mahogany text-[clamp(48px,6vw,88px)] leading-[0.9] m-0"
          >
            Living <br className="hidden md:block" />Stories
          </motion.h2>
          <div className="hidden md:flex flex-col text-right">
            <span className="font-editorial text-[10px] tracking-[0.2em] uppercase text-clay-warm mb-3">
              Journal & Dispatches
            </span>
            <p className="font-body text-xs text-mahogany/70 max-w-[200px] uppercase tracking-wider">
              Notes on artisans, tea origins, and the Kolpetty coast.
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          {stories.map((story, idx) => (
            <motion.a
              key={idx}
              href={`#story-${idx}`}
              className="group relative flex flex-col md:flex-row justify-between items-start md:items-center py-8 md:py-12 border-b border-mahogany/20 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredStory(idx)}
              onMouseLeave={() => setHoveredStory(null)}
            >
              {/* Left Data */}
              <div className="flex flex-col md:w-[30%] mb-4 md:mb-0">
                <span className="font-editorial text-[10px] tracking-[0.25em] uppercase text-mahogany mb-2">
                  {story.date}
                </span>
                <span className="font-editorial text-[9px] tracking-[0.2em] uppercase text-clay-warm/80">
                  {story.category}
                </span>
              </div>

              {/* Center Title */}
              <div className="md:w-[45%] mb-4 md:mb-0 pr-4">
                <h3 className="font-display text-[28px] md:text-[40px] text-mahogany leading-[1.1] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4">
                  {story.title}
                </h3>
              </div>

              {/* Right Excerpt */}
              <div className="md:w-[25%] flex items-center justify-between md:justify-end gap-6 text-right">
                <p className="hidden md:block font-body text-sm text-mahogany/60 leading-[1.6] line-clamp-2 max-w-[200px]">
                  {story.excerpt}
                </p>
                <div className="w-10 h-10 rounded-full border border-mahogany/20 flex items-center justify-center shrink-0 transition-colors duration-500 group-hover:bg-mahogany group-hover:text-cream-page">
                  <span className="arrow text-lg">&rarr;</span>
                </div>
              </div>

              {/* Hover Image Reveal (Desktop Only) */}
              <AnimatePresence>
                {hoveredStory === idx && (
                  <motion.div
                    className="hidden md:block absolute top-1/2 left-[45%] -translate-y-1/2 -translate-x-1/2 w-[320px] aspect-[4/3] pointer-events-none z-20 overflow-hidden shadow-2xl"
                    initial={{ opacity: 0, scale: 0.95, y: '-40%' }}
                    animate={{ opacity: 1, scale: 1, y: '-50%' }}
                    exit={{ opacity: 0, scale: 0.95, y: '-60%' }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover grayscale-[0.2]"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.a>
          ))}
        </div>
      </div>

      {/* IG Strip */}
      <div className="w-full overflow-hidden flex flex-col">
        <div className="max-w-7xl mx-auto w-full px-6 mb-8">
          <p className="font-editorial text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-mahogany inline-flex gap-4 items-center">
            <span className="w-8 h-[1px] bg-mahogany/40 block" />FOLLOW THE EVERYDAY \u2014 @CEYLONSTORIES.GALLERYCAFE
          </p>
        </div>

        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto flex gap-4 md:gap-6 px-6 pb-8 snap-x md:snap-none scrollbar-hide cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ scrollBehavior: isDown ? 'auto' : 'smooth' }}
        >
          {igImages.map((src, idx) => (
            <motion.div
              key={idx}
              className="w-[280px] h-[280px] shrink-0 snap-center relative overflow-hidden group"
              initial={{ opacity: 0, clipPath: "inset(8% 8% 8% 8%)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.65, 0, 0.35, 1] }}
            >
              <img
                src={src}
                alt="Instagram post"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none pointer-events-none grayscale-[0.2] sepia-[0.1]"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

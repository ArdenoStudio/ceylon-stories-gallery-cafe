'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const artworks = [
  {
    num: '01',
    artist: 'Anoma Wijewardene',
    title: 'Slow Weather of Memory',
    medium: 'Oil on Canvas',
    dimensions: '120 × 180 cm',
    year: '2026',
    description: 'Wijewardene paints the interior atmospheres of colonial space — walls that absorb light differently at noon than at dusk. This series of forty-two works occupies the full gallery through April. Each canvas is a room you can almost enter.',
    image: 'https://images.unsplash.com/photo-1544865582-73a76efc255d?q=80&w=1200&auto=format&fit=crop',
    available: true,
  },
  {
    num: '02',
    artist: 'Nimal Jayasinghe',
    title: 'Clay Cosmologies I–III',
    medium: 'Terracotta & mixed media',
    dimensions: 'Variable — approx. 60 × 40 cm each',
    year: '2025',
    description: 'Three sculptural forms cast in locally sourced red clay, fired in an anagama kiln in Matale. Jayasinghe's work interrogates the domestic object — how we assign value to the vessel that holds our daily rituals.',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1200&auto=format&fit=crop',
    available: true,
  },
  {
    num: '03',
    artist: 'Priya Rodrigo',
    title: 'Monsoon Cartography',
    medium: 'Watercolour on handmade paper',
    dimensions: '80 × 100 cm',
    year: '2026',
    description: 'Rodrigo maps the monsoon not as weather but as memory — the routes water takes through a city, the marks it leaves behind. The paper itself is made from jute sourced in the Eastern Province.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop',
    available: false,
  },
];

export default function GalleryPage() {
  const [inquiryArtwork, setInquiryArtwork] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setInquiryArtwork(null);
    }, 3000);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative w-full bg-mahogany text-cream-page pt-40 pb-20 px-6 overflow-hidden">
        <div className="batik-line absolute top-0 left-0 bg-white/20" />
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <span className="absolute top-10 left-[-5%] font-display italic text-[28vw] text-mahogany-soft/15 leading-none">04</span>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="font-editorial text-[10px] tracking-[0.25em] uppercase text-gold-leaf mb-6 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-gold-leaf/50" /> 04 — THE GALLERY
          </p>
          <h1 className="font-display font-light text-cream-page text-[clamp(52px,8vw,110px)] leading-[0.9] tracking-[-0.02em]">
            Works on <br />
            <i className="text-clay-warm">the wall.</i>
          </h1>
        </div>
      </section>

      {/* Artworks */}
      <section className="relative w-full bg-cream-page py-[clamp(60px,8vh,120px)] px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-32 md:gap-48">
          {artworks.map((work, idx) => (
            <motion.div
              key={idx}
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start gap-12 md:gap-20`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Image */}
              <div className="w-full md:w-[55%] relative overflow-hidden group">
                <div className="absolute -top-10 font-display italic text-[140px] leading-none text-mahogany/5 select-none pointer-events-none z-0">
                  {work.num}
                </div>
                <div className="w-full aspect-[4/5] overflow-hidden relative z-10">
                  <img
                    src={work.image}
                    alt={`${work.title} by ${work.artist}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale-[0.2] sepia-[0.15] transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  {!work.available && (
                    <div className="absolute top-4 left-4 font-editorial text-[9px] tracking-[0.2em] uppercase bg-mahogany text-cream-page px-3 py-1">
                      Sold
                    </div>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="w-full md:w-[45%] flex flex-col pt-4 md:pt-12">
                <p className="font-editorial text-[9px] tracking-[0.25em] uppercase text-clay-warm mb-6">
                  {work.medium} · {work.year}
                </p>
                <h2 className="font-display font-light text-mahogany text-[clamp(32px,4vw,56px)] leading-[1] tracking-tight mb-3">
                  {work.title}
                </h2>
                <p className="font-editorial text-[10px] tracking-[0.15em] text-mahogany/50 mb-8">
                  {work.artist} — {work.dimensions}
                </p>
                <p className="font-body text-sm text-mahogany/65 leading-[1.8] mb-10 max-w-[40ch]">
                  {work.description}
                </p>

                {work.available && (
                  <button
                    onClick={() => setInquiryArtwork(work.title)}
                    className="font-editorial text-[10px] tracking-[0.2em] uppercase text-clay-deep inline-flex items-center gap-3 border border-mahogany/20 px-6 py-3 hover:bg-mahogany hover:text-cream-page transition-colors duration-500 w-fit"
                  >
                    PURCHASE INQUIRY <span>→</span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {inquiryArtwork && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-mahogany/50 backdrop-blur-sm"
              onClick={() => setInquiryArtwork(null)}
            />
            <motion.div
              className="relative bg-cream-page w-full max-w-lg p-10 z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            >
              <button
                onClick={() => setInquiryArtwork(null)}
                className="absolute top-4 right-4 font-editorial text-[10px] tracking-widest uppercase text-mahogany/40 hover:text-mahogany"
              >
                Close
              </button>

              {submitted ? (
                <div className="text-center py-8">
                  <p className="font-display text-3xl text-mahogany mb-3">Thank you.</p>
                  <p className="font-body text-sm text-mahogany/60">We will be in touch shortly.</p>
                </div>
              ) : (
                <>
                  <p className="font-editorial text-[9px] tracking-[0.2em] uppercase text-clay-warm mb-4">Purchase Inquiry</p>
                  <h3 className="font-display text-2xl text-mahogany mb-8">{inquiryArtwork}</h3>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input
                      type="text"
                      placeholder="Your name"
                      required
                      className="w-full border-b border-mahogany/20 bg-transparent py-3 font-body text-sm text-mahogany placeholder:text-mahogany/30 focus:outline-none focus:border-mahogany"
                    />
                    <input
                      type="email"
                      placeholder="Your email"
                      required
                      className="w-full border-b border-mahogany/20 bg-transparent py-3 font-body text-sm text-mahogany placeholder:text-mahogany/30 focus:outline-none focus:border-mahogany"
                    />
                    <textarea
                      placeholder="Any questions or notes (optional)"
                      rows={3}
                      className="w-full border-b border-mahogany/20 bg-transparent py-3 font-body text-sm text-mahogany placeholder:text-mahogany/30 focus:outline-none focus:border-mahogany resize-none"
                    />
                    <button
                      type="submit"
                      className="font-editorial text-[10px] tracking-[0.2em] uppercase bg-mahogany text-cream-page px-6 py-3 hover:bg-clay-deep transition-colors duration-300 mt-2"
                    >
                      SEND INQUIRY
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MotifCorner } from '@/src/components/heritage/MotifCorner';
import { BotanicalDivider } from '@/src/components/heritage/BotanicalDivider';

const artworks = [
  {
    num: '01',
    artist: 'Anoma Wijewardene',
    title: 'Slow Weather of Memory',
    medium: 'Oil on Canvas',
    dimensions: '120 × 180 cm',
    year: '2025',
    description: 'Wijewardene paints the interior atmospheres of colonial space — walls that absorb light differently at noon than at dusk. This series of forty-two works occupies the full gallery through April. Each canvas is a room you can almost enter.',
    image: 'https://images.unsplash.com/photo-1544865582-73a76efc255d?q=80&w=1200&auto=format&fit=crop',
    available: true,
    aspect: 'aspect-[3/4]',
  },
  {
    num: '02',
    artist: 'Nimal Jayasinghe',
    title: 'Clay Cosmologies I–III',
    medium: 'Terracotta & mixed media',
    dimensions: 'Variable — approx. 60 × 40 cm each',
    year: '2025',
    description: "Three sculptural forms cast in locally sourced red clay, fired in an anagama kiln in Matale. Jayasinghe's work interrogates the domestic object — how we assign value to the vessel that holds our daily rituals.",
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1200&auto=format&fit=crop',
    available: true,
    aspect: 'aspect-[4/5]',
  },
  {
    num: '03',
    artist: 'Priya Rodrigo',
    title: 'Monsoon Cartography',
    medium: 'Watercolour on handmade paper',
    dimensions: '80 × 100 cm',
    year: '2025',
    description: 'Rodrigo maps the monsoon not as weather but as memory — the routes water takes through a city, the marks it leaves behind. The paper itself is made from jute sourced in the Eastern Province.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop',
    available: false,
    aspect: 'aspect-[1/1]',
  },
];

/* Artist of the Month feature data */
const featuredArtist = {
  name: 'Anoma Wijewardene',
  portrait: 'https://images.unsplash.com/photo-1594489428504-5c0c480bb148?q=80&w=800&auto=format&fit=crop',
  bio: 'Anoma Wijewardene is one of Sri Lanka\'s most celebrated contemporary artists, known for her large-scale paintings that explore climate, identity, and the fragile boundaries between the natural and built environment. Born in Colombo, she studied at the Royal College of Art in London before returning to the island in 2004.',
  statement: '"I paint what the walls remember. Every colonial building in this city holds a different light — and that light changes with the hour, the season, the viewer. My work is an attempt to slow that light down, to hold it still long enough to be felt."',
  exhibition: 'Slow Weather of Memory',
  exhibitionDates: 'January — April 2025',
  worksCount: 42,
};

export default function GalleryPage() {
  const [inquiryArtwork, setInquiryArtwork] = useState<typeof artworks[0] | null>(null);
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
          <motion.span
            className="absolute top-10 left-[-5%] font-display italic text-[28vw] text-mahogany-soft/15 leading-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          >
            04
          </motion.span>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-editorial text-[10px] tracking-[0.25em] uppercase text-gold-leaf mb-6 flex items-center gap-4"
          >
            <span className="w-8 h-[1px] bg-gold-leaf/50" /> 04 — THE GALLERY
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light text-cream-page text-[clamp(52px,8vw,110px)] leading-[0.9] tracking-[-0.02em]"
          >
            Works on <br />
            <i className="text-clay-warm">the wall.</i>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="font-body text-sm text-cream-page/50 leading-relaxed mt-8 max-w-md"
          >
            Each month, a new artist occupies our walls. We exhibit, we host, we sell — quietly, and with intention.
          </motion.p>
        </div>
      </section>

      {/* Artist of the Month — Editorial Feature */}
      <section className="relative w-full bg-cream-page py-[clamp(80px,12vh,160px)] px-6 overflow-hidden">
        <MotifCorner motif="palm-arch" position="tl" size={220} className="text-clay-warm/15 hidden md:block" />
        <div className="max-w-7xl mx-auto">
          <BotanicalDivider motif="frangipani" tone="warm" className="mb-16 md:mb-20" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Artist Portrait */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, clipPath: "inset(8% 8% 8% 8%)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
            >
              <div className="w-full aspect-[3/4] overflow-hidden relative">
                <img
                  src={featuredArtist.portrait}
                  alt={`${featuredArtist.name} in her studio`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover photo-heritage"
                />
                <div className="absolute inset-0 border border-mahogany/10 pointer-events-none" />
              </div>
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-cream-page px-5 py-3 border border-mahogany/15">
                <p className="font-editorial text-[9px] tracking-[0.25em] uppercase text-clay-warm">Artist of the Month</p>
                <p className="font-display text-xl text-mahogany mt-1">{featuredArtist.exhibitionDates}</p>
              </div>
            </motion.div>

            {/* Artist Info */}
            <motion.div
              className="flex flex-col pt-4 lg:pt-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-editorial text-[10px] tracking-[0.25em] uppercase text-clay-warm mb-6">
                Featured Artist — {featuredArtist.exhibitionDates}
              </p>
              <h2 className="font-display font-light text-mahogany text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-[-0.02em] mb-4">
                {featuredArtist.name}
              </h2>
              <p className="font-editorial text-[10px] tracking-[0.15em] text-mahogany/45 mb-8">
                {featuredArtist.exhibition} — {featuredArtist.worksCount} works
              </p>

              <div className="pl-6 border-l border-mahogany/15 space-y-5 mb-10">
                <p className="font-body text-sm text-mahogany/65 leading-[1.8]">
                  {featuredArtist.bio}
                </p>
              </div>

              <blockquote className="relative pl-6 border-l-2 border-gold-leaf/40 mb-10">
                <p className="font-display italic text-mahogany/80 text-lg md:text-xl leading-[1.5]">
                  {featuredArtist.statement}
                </p>
              </blockquote>

              <a
                href="#collection"
                className="font-editorial text-[10px] tracking-[0.2em] uppercase text-clay-deep inline-flex items-center gap-3 border border-mahogany/20 px-6 py-3 hover:bg-mahogany hover:text-cream-page transition-colors duration-500 w-fit"
              >
                VIEW THE COLLECTION <span>→</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Artworks — Staggered Masonry */}
      <section id="collection" className="relative w-full bg-cream-page py-[clamp(60px,8vh,120px)] px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 md:mb-24"
          >
            <p className="font-editorial text-[10px] tracking-[0.25em] uppercase text-clay-warm mb-4">
              The Collection
            </p>
            <h2 className="font-display font-light text-mahogany text-[clamp(36px,4.5vw,64px)] leading-[0.95] tracking-[-0.02em]">
              On Display <i className="text-clay-warm">Now</i>
            </h2>
          </motion.div>

          {/* Masonry-style staggered grid */}
          <div className="columns-1 md:columns-2 gap-12 md:gap-16 space-y-12 md:space-y-16">
            {artworks.map((work, idx) => (
              <motion.div
                key={idx}
                className="break-inside-avoid"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 1.2, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Artwork Image */}
                <div className="relative overflow-hidden group mb-6">
                  <div className={`absolute -top-8 font-display italic text-[120px] leading-none text-mahogany/5 select-none pointer-events-none z-0`}>
                    {work.num}
                  </div>
                  <motion.div
                    className={`w-full ${work.aspect} overflow-hidden relative z-10`}
                    initial={{ clipPath: "inset(6% 6% 6% 6%)" }}
                    whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                    viewport={{ once: true, margin: '-8%' }}
                    transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
                  >
                    <img
                      src={work.image}
                      alt={`${work.title} by ${work.artist}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover photo-heritage transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    {!work.available && (
                      <div className="absolute top-4 left-4 font-editorial text-[9px] tracking-[0.2em] uppercase bg-mahogany text-cream-page px-3 py-1">
                        Sold
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Artwork Details */}
                <div className="flex flex-col">
                  <p className="font-editorial text-[9px] tracking-[0.25em] uppercase text-clay-warm mb-3">
                    {work.medium} · {work.year}
                  </p>
                  <h3 className="font-display font-light text-mahogany text-[clamp(28px,3.5vw,44px)] leading-[1.05] tracking-tight mb-2">
                    {work.title}
                  </h3>
                  <p className="font-editorial text-[10px] tracking-[0.15em] text-mahogany/45 mb-5">
                    {work.artist} — {work.dimensions}
                  </p>
                  <p className="font-body text-sm text-mahogany/60 leading-[1.8] mb-6 max-w-[42ch]">
                    {work.description}
                  </p>

                  {work.available && (
                    <button
                      onClick={() => setInquiryArtwork(work)}
                      className="font-editorial text-[10px] tracking-[0.2em] uppercase text-clay-deep inline-flex items-center gap-3 border border-mahogany/20 px-6 py-3 hover:bg-mahogany hover:text-cream-page transition-colors duration-500 w-fit"
                    >
                      PURCHASE INQUIRY <span>→</span>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-Screen Inquiry Modal */}
      <AnimatePresence>
        {inquiryArtwork && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-mahogany/60 backdrop-blur-md"
              onClick={() => setInquiryArtwork(null)}
            />
            <motion.div
              className="relative bg-cream-page w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 mx-4"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            >
              <button
                onClick={() => setInquiryArtwork(null)}
                className="absolute top-6 right-6 z-20 font-editorial text-[10px] tracking-widest uppercase text-mahogany/40 hover:text-mahogany transition-colors"
              >
                Close ✕
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Artwork Image */}
                <div className="relative aspect-[3/4] md:aspect-auto overflow-hidden">
                  <img
                    src={inquiryArtwork.image}
                    alt={inquiryArtwork.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover photo-heritage"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mahogany/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-editorial text-[9px] tracking-[0.2em] uppercase text-cream-page/70 mb-2">
                      {inquiryArtwork.medium} · {inquiryArtwork.year}
                    </p>
                    <p className="font-display text-cream-page text-2xl">{inquiryArtwork.title}</p>
                    <p className="font-editorial text-[10px] tracking-[0.15em] text-cream-page/60 mt-1">
                      {inquiryArtwork.artist} — {inquiryArtwork.dimensions}
                    </p>
                  </div>
                </div>

                {/* Form */}
                <div className="p-8 md:p-10">
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                      <p className="font-display text-3xl text-mahogany mb-3">Thank you.</p>
                      <p className="font-body text-sm text-mahogany/60">We will be in touch within 48 hours.</p>
                    </div>
                  ) : (
                    <>
                      <p className="font-editorial text-[9px] tracking-[0.2em] uppercase text-clay-warm mb-3">Purchase Inquiry</p>
                      <h3 className="font-display text-2xl text-mahogany mb-2">{inquiryArtwork.title}</h3>
                      <p className="font-body text-sm text-mahogany/50 mb-8">{inquiryArtwork.description}</p>

                      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <input
                          type="text"
                          placeholder="Your name"
                          required
                          className="w-full border-b border-mahogany/20 bg-transparent py-3 font-body text-sm text-mahogany placeholder:text-mahogany/30 focus:outline-none focus:border-mahogany transition-colors"
                        />
                        <input
                          type="email"
                          placeholder="Your email"
                          required
                          className="w-full border-b border-mahogany/20 bg-transparent py-3 font-body text-sm text-mahogany placeholder:text-mahogany/30 focus:outline-none focus:border-mahogany transition-colors"
                        />
                        <input
                          type="tel"
                          placeholder="Phone (optional)"
                          className="w-full border-b border-mahogany/20 bg-transparent py-3 font-body text-sm text-mahogany placeholder:text-mahogany/30 focus:outline-none focus:border-mahogany transition-colors"
                        />
                        <textarea
                          placeholder="Any questions or notes"
                          rows={3}
                          className="w-full border-b border-mahogany/20 bg-transparent py-3 font-body text-sm text-mahogany placeholder:text-mahogany/30 focus:outline-none focus:border-mahogany resize-none transition-colors"
                        />
                        <div className="flex flex-col sm:flex-row gap-3 mt-2">
                          <button
                            type="submit"
                            className="font-editorial text-[10px] tracking-[0.2em] uppercase bg-mahogany text-cream-page px-6 py-3 hover:bg-clay-deep transition-colors duration-300"
                          >
                            SEND INQUIRY
                          </button>
                          <a
                            href={`https://wa.me/94770000000?text=Hi%2C%20I'm%20interested%20in%20purchasing%20"${encodeURIComponent(inquiryArtwork.title)}"%20by%20${encodeURIComponent(inquiryArtwork.artist)}.`}
                            target="_blank"
                            rel="noreferrer"
                            className="font-editorial text-[10px] tracking-[0.2em] uppercase text-mahogany border border-mahogany/20 px-6 py-3 hover:bg-mahogany/5 transition-colors duration-300 text-center inline-flex items-center justify-center gap-2"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-forest">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            WHATSAPP
                          </a>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

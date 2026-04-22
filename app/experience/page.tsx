'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

const experiences = [
  {
    num: '01',
    title: 'The Tea Tasting',
    subtitle: 'Dilmah Reserve Experience',
    description: 'A guided progression through four Dilmah reserve teas — Silver Tips, Single Estate Black, High Grown Green, and the house Gallery Chai blend. Each is prepared to the exact temperature and steep time the leaf demands. No milk. No sugar. Just the tea.',
    detail: 'Available daily · 10:00 AM — 5:00 PM · Reservation recommended',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1000&auto=format&fit=crop',
    cta: 'Reserve via WhatsApp',
    ctaHref: 'https://wa.me/94770000000?text=I%20would%20like%20to%20book%20a%20Tea%20Tasting%20experience.',
  },
  {
    num: '02',
    title: 'The Gallery Walk',
    subtitle: 'Guided Exhibition Visit',
    description: 'A thirty-minute guided walk through the current exhibition with one of our resident curators. Works are presented in the order they were intended to be read — left to right, floor to ceiling, light permitting.',
    detail: 'Saturdays & Sundays · 11:00 AM & 3:00 PM · Walk-in or reserved',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop',
    cta: 'See the Gallery',
    ctaHref: '/gallery',
  },
  {
    num: '03',
    title: 'The Evening Lounge',
    subtitle: 'Shisha & Slow Ambiance',
    description: 'After six, the café becomes something else. The lights drop, the music settles to a low register, and the shisha lounge opens. Imported tobacco blends, our signature Ceylon Spice, and a drinks list built for lingering.',
    detail: 'Monday – Sunday · Opens at 6:00 PM · Last order 12:00 AM (weekdays) / 1:00 AM (weekends)',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop',
    cta: 'Reserve a Table',
    ctaHref: 'https://wa.me/94770000000?text=I%20would%20like%20to%20reserve%20a%20table%20for%20the%20evening%20lounge.',
  },
];

export default function ExperiencePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative w-full bg-mahogany text-cream-page pt-40 pb-20 px-6 overflow-hidden">
        <div className="batik-line absolute top-0 left-0 bg-white/20" />
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <span className="absolute top-10 left-[-5%] font-display italic text-[28vw] text-mahogany-soft/15 leading-none">05</span>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="font-editorial text-[10px] tracking-[0.25em] uppercase text-gold-leaf mb-6 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-gold-leaf/50" /> 05 — EXPERIENCE
          </p>
          <h1 className="font-display font-light text-cream-page text-[clamp(52px,8vw,110px)] leading-[0.9] tracking-[-0.02em]">
            Come for <br />
            <i className="text-clay-warm">an afternoon.</i>
            <br /> Stay for the evening.
          </h1>
        </div>
      </section>

      {/* Experiences */}
      <section className="relative w-full bg-cream-page py-[clamp(60px,8vh,120px)] px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-32 md:gap-48">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Image */}
              <div className="w-full md:w-[50%] aspect-[4/5] overflow-hidden group relative">
                <div className="absolute -top-8 font-display italic text-[120px] leading-none text-mahogany/5 select-none z-0">
                  {exp.num}
                </div>
                <img
                  src={exp.image}
                  alt={exp.title}
                  referrerPolicy="no-referrer"
                  className="relative z-10 w-full h-full object-cover grayscale-[0.2] sepia-[0.2] transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>

              {/* Text */}
              <div className="w-full md:w-[50%] flex flex-col">
                <p className="font-editorial text-[9px] tracking-[0.25em] uppercase text-clay-warm mb-6">
                  {exp.subtitle}
                </p>
                <h2 className="font-display font-light text-mahogany text-[clamp(32px,4vw,60px)] leading-[1] tracking-tight mb-8">
                  {exp.title}
                </h2>
                <p className="font-body text-sm text-mahogany/65 leading-[1.8] mb-6 max-w-[42ch]">
                  {exp.description}
                </p>
                <p className="font-editorial text-[9px] tracking-[0.18em] uppercase text-mahogany/40 mb-10 border-l border-mahogany/20 pl-4">
                  {exp.detail}
                </p>
                <a
                  href={exp.ctaHref}
                  target={exp.ctaHref.startsWith('http') ? '_blank' : undefined}
                  rel={exp.ctaHref.startsWith('http') ? 'noreferrer' : undefined}
                  className="font-editorial text-[10px] tracking-[0.2em] uppercase text-clay-deep inline-flex items-center gap-3 border border-mahogany/20 px-6 py-3 hover:bg-mahogany hover:text-cream-page transition-colors duration-500 w-fit"
                >
                  {exp.cta} <span>→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <section className="w-full bg-mahogany py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-editorial text-[9px] tracking-[0.25em] uppercase text-gold-leaf mb-3">Plan Your Visit</p>
            <h2 className="font-display font-light text-cream-page text-3xl md:text-5xl">
              9/6A, Marine Drive, Colombo 03.
            </h2>
          </div>
          <Link
            href="/visit"
            className="font-editorial text-[10px] tracking-[0.2em] uppercase text-mahogany bg-cream-page px-8 py-4 hover:bg-gold-leaf transition-colors duration-300 shrink-0"
          >
            GET DIRECTIONS →
          </Link>
        </div>
      </section>
    </>
  );
}

'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import Link from 'next/link';
import { useReveal } from '@/src/hooks/useReveal';

/**
 * Our Story — Editorial Magazine Spread (Inside Pages)
 * Continues from the homepage Story section ("Page 02 — The Foundation").
 * Real photos from /public/images/story/, factual copy only,
 * alternating cream/mahogany rhythm, all imagery rounded-2xl.
 */
export default function OurStoryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  const introRef = useReveal('-10%');
  const foundersRef = useReveal('-10%');
  const teaRef = useReveal('-10%');
  const galleryRef = useReveal('-10%');
  const closingRef = useReveal('-10%');

  return (
    <>
      {/* SECTION 1 — Masthead Hero */}
      <section
        ref={heroRef}
        className="relative w-full bg-cream-page text-mahogany overflow-hidden"
      >
        <div className="paper-texture" />

        <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 pt-[clamp(120px,18vh,200px)] pb-[clamp(48px,8vh,96px)]">
          {/* Masthead */}
          <div className="flex items-baseline justify-between gap-6 pb-6 border-b border-mahogany/25">
            <div className="flex items-baseline gap-4">
              <span className="font-display italic text-clay-warm text-3xl leading-none">
                02
              </span>
              <p className="font-editorial text-[10px] tracking-[0.32em] uppercase text-mahogany/55">
                The Foundation &mdash; Continued
              </p>
            </div>
            <p className="font-editorial text-[9px] tracking-[0.32em] uppercase text-mahogany/40 hidden md:block tabular-nums">
              Vol. 1 &middot; No. 1 &middot; Inside
            </p>
          </div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 font-display font-light text-mahogany text-[clamp(56px,9vw,140px)] leading-[0.92] tracking-[-0.02em] max-w-[14ch] text-balance"
          >
            A love letter <i className="text-clay-warm">to the island.</i>
          </motion.h1>

          {/* Hero photo with parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mt-12 relative aspect-[16/9] overflow-hidden rounded-2xl"
          >
            <motion.img
              src="/images/story/founders-family.jpg"
              alt="The Ceylon Stories family at the Marine Drive opening"
              className="w-full h-full object-cover photo-heritage"
              style={{ y: yImg, scale: 1.12 }}
            />
          </motion.div>

          <p className="mt-5 font-editorial text-[10px] tracking-[0.22em] uppercase text-mahogany/55 max-w-2xl">
            <span className="text-clay-warm">&mdash;</span> The Ceylon Stories family at the Marine Drive opening, January 2026.
          </p>
        </div>
      </section>

      {/* SECTION 2 — Intro */}
      <section className="relative w-full bg-cream-page text-mahogany overflow-hidden pb-[clamp(80px,12vh,160px)]">
        <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
          <div
            ref={introRef}
            className="reveal-up grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12"
          >
            <div className="md:col-start-2 md:col-span-7">
              <p className="font-body text-[16px] text-mahogany/80 leading-[1.85] first-letter:font-display first-letter:text-[80px] first-letter:leading-[0.85] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-clay-warm">
                Ceylon Stories opened its doors on the 9<sup>th</sup> of January, 2026. Founded by Shazi Salim and Rumaiz Ramzy, the gallery café on Marine Drive is a love letter to the island &mdash; a small, deliberate room that holds Sri Lankan craft, premium Ceylon tea, and rotating local art.
              </p>
              <p className="mt-6 font-body text-[16px] text-mahogany/80 leading-[1.85]">
                What follows is a closer look at the room, the tea, and the artists who pass through it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — The Founders */}
      <section className="relative w-full bg-cream-page text-mahogany overflow-hidden py-[clamp(80px,12vh,160px)]">
        <div className="paper-texture" />

        <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
          <div
            ref={foundersRef}
            className="reveal-up grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start"
          >
            {/* Left — portrait */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <p className="font-editorial text-[10px] tracking-[0.32em] uppercase text-clay-warm">
                The Founders
              </p>
              <figure className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <img
                  src="/images/story/founders.jpg"
                  alt="Founders Shazi Salim and Rumaiz Ramzy at Ceylon Stories"
                  className="w-full h-full object-cover photo-heritage"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-mahogany/85 to-transparent">
                  <p className="font-editorial text-[9px] tracking-[0.3em] uppercase text-cream-page">
                    Shazi Salim &amp; Rumaiz Ramzy
                  </p>
                </figcaption>
              </figure>
            </div>

            {/* Right — body */}
            <div className="md:col-span-7 md:pt-12 flex flex-col gap-7">
              <h2 className="font-display font-light text-mahogany text-[clamp(40px,5.5vw,72px)] leading-[0.95] tracking-[-0.02em] max-w-[12ch]">
                Shazi <span className="font-display italic text-clay-warm">&amp;</span> Rumaiz.
              </h2>

              <p className="font-body text-[15px] text-mahogany/80 leading-[1.85] max-w-[52ch]">
                The two founders opened Ceylon Stories on the 9<sup>th</sup> of January, 2026 &mdash; a quiet beginning, by design. The space they took on had previously been The Central Perk, a familiar room on Marine Drive that they slowly, deliberately, made their own.
              </p>

              <p className="font-body text-[15px] text-mahogany/80 leading-[1.85] max-w-[52ch]">
                The renovation was patient. Every chair, every shelf, every cup chosen with intention. What emerged is small and slow, by design &mdash; a room that resists the city&rsquo;s instinct to rush.
              </p>

              <blockquote className="mt-2 pl-6 border-l-2 border-clay-warm/55 max-w-[44ch]">
                <p className="font-display italic text-mahogany text-[clamp(20px,2.4vw,28px)] leading-[1.3]">
                  A room where <span className="text-clay-warm">slowness</span> is the point.
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — The Tea */}
      <section className="relative w-full bg-mahogany text-cream-page overflow-hidden py-[clamp(80px,14vh,180px)]">
        <div className="batik-line absolute top-0 left-0 bg-cream-page/20" />

        <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
          <div ref={teaRef} className="reveal-up flex flex-col gap-14">
            {/* Eyebrow header */}
            <div className="flex items-baseline justify-between gap-6 pb-6 border-b border-cream-page/15">
              <div className="flex items-baseline gap-4">
                <span className="font-display italic text-gold-leaf text-3xl leading-none">
                  03
                </span>
                <p className="font-editorial text-[10px] tracking-[0.32em] uppercase text-cream-page/55">
                  The Tea Programme
                </p>
              </div>
              <p className="font-editorial text-[9px] tracking-[0.32em] uppercase text-cream-page/35 hidden md:block">
                Authorised Dilmah Dealer
              </p>
            </div>

            {/* Photo + body */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
              <div className="md:col-span-7">
                <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <img
                    src="/images/story/tea-tasting.jpg"
                    alt="A Dilmah tea tasting at Ceylon Stories"
                    className="w-full h-full object-cover photo-heritage-deep"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-mahogany/90 to-transparent">
                    <p className="font-editorial text-[9px] tracking-[0.3em] uppercase text-cream-page">
                      A guided Dilmah tasting at Ceylon Stories
                    </p>
                  </figcaption>
                </figure>
              </div>

              <div className="md:col-span-5 flex flex-col gap-6">
                <h3 className="font-display font-light text-cream-page text-[clamp(32px,4vw,52px)] leading-[1] tracking-[-0.01em] max-w-[14ch]">
                  Sri Lanka&rsquo;s most <i className="text-gold-leaf">respected</i> blend.
                </h3>

                <p className="font-body text-[14px] text-cream-page/75 leading-[1.85] max-w-[44ch]">
                  Ceylon Stories is an authorised Dilmah dealer, offering guided tea tastings and a refined educational tea experience that places Ceylon&rsquo;s most respected blend at the centre of the room.
                </p>

                <p className="font-body text-[14px] text-cream-page/75 leading-[1.85] max-w-[44ch]">
                  The programme runs alongside the kitchen and bar &mdash; food, brews, and slow hours that ask you to stay a little longer.
                </p>

                <Link
                  href="/dilmah"
                  className="mt-2 group inline-flex items-center gap-3 font-editorial text-[10px] tracking-[0.28em] uppercase text-cream-page hover:text-gold-leaf transition-colors w-max"
                >
                  <span className="w-10 h-10 rounded-full border border-gold-leaf/40 flex items-center justify-center group-hover:bg-gold-leaf/10 transition-colors">
                    <span className="text-gold-leaf">&rarr;</span>
                  </span>
                  Inside the Dilmah Room
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Now Showing */}
      <section className="relative w-full bg-cream-page text-mahogany overflow-hidden py-[clamp(100px,16vh,200px)]">
        <div className="paper-texture" />

        <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
          <div
            ref={galleryRef}
            className="reveal-up flex flex-col items-center text-center gap-8"
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-px bg-clay-warm/55" />
              <p className="font-editorial text-[10px] tracking-[0.4em] uppercase text-clay-warm">
                Now Showing
              </p>
              <span className="w-10 h-px bg-clay-warm/55" />
            </div>

            <h2 className="font-display italic font-light text-mahogany text-[clamp(48px,7.5vw,104px)] leading-[0.95] tracking-[-0.02em] text-balance max-w-[16ch]">
              Adithi Dinethya Fernando
            </h2>

            <p className="font-editorial text-[11px] tracking-[0.32em] uppercase text-mahogany/55">
              Until 28 February &middot; The First Feature
            </p>

            <div className="mt-6 max-w-2xl flex flex-col gap-5">
              <p className="font-body text-[15px] text-mahogany/75 leading-[1.85]">
                Every month, a new artist takes the walls. Select paintings are available for purchase, allowing patrons to support Sri Lankan creatives directly.
              </p>
              <p className="font-body text-[15px] text-mahogany/75 leading-[1.85]">
                Adithi Dinethya Fernando is the inaugural feature &mdash; on view through the end of February, 2026.
              </p>
            </div>

            <Link
              href="/gallery"
              className="mt-4 group inline-flex items-center gap-3 font-editorial text-[10px] tracking-[0.28em] uppercase text-mahogany hover:text-clay-warm transition-colors"
            >
              <span className="w-10 h-10 rounded-full border border-clay-warm/40 flex items-center justify-center group-hover:bg-clay-warm/10 transition-colors">
                <span className="text-clay-warm">&rarr;</span>
              </span>
              Visit the Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6 — Closing & Visit */}
      <section className="relative w-full bg-mahogany text-cream-page overflow-hidden py-[clamp(100px,14vh,180px)]">
        <div className="batik-line absolute top-0 left-0 bg-cream-page/20" />

        <div className="relative max-w-[1080px] mx-auto px-6 md:px-10">
          <div
            ref={closingRef}
            className="reveal-up flex flex-col items-center text-center gap-14"
          >
            {/* Pull quote */}
            <blockquote className="max-w-3xl">
              <p className="font-display italic font-light text-cream-page text-[clamp(32px,4.5vw,60px)] leading-[1.15] tracking-[-0.01em] text-balance">
                &ldquo;Slowness is not a deficiency. It is the{' '}
                <span className="text-gold-leaf">entire point</span>.&rdquo;
              </p>
            </blockquote>

            {/* Visit card */}
            <div className="w-full max-w-3xl border-y border-cream-page/15 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
              <div>
                <p className="font-editorial text-[9px] tracking-[0.3em] uppercase text-gold-leaf/80 mb-3">
                  Address
                </p>
                <p className="font-body text-[13px] text-cream-page/85 leading-[1.75]">
                  9/6A, 16<sup>th</sup> Lane
                  <br />
                  Marine Drive, Kolpetty
                  <br />
                  Colombo 03, LK
                </p>
              </div>
              <div>
                <p className="font-editorial text-[9px] tracking-[0.3em] uppercase text-gold-leaf/80 mb-3">
                  Hours
                </p>
                <p className="font-body text-[13px] text-cream-page/85 leading-[1.75]">
                  Daily &mdash; 09:00 till late.
                  <br />
                  Reservations encouraged.
                </p>
              </div>
              <div>
                <p className="font-editorial text-[9px] tracking-[0.3em] uppercase text-gold-leaf/80 mb-3">
                  Contact
                </p>
                <p className="font-body text-[13px] text-cream-page/85 leading-[1.75]">
                  +94 (77) 000 0000
                  <br />
                  <a
                    href="mailto:hello@ceylonstories.lk"
                    className="hover:text-gold-leaf transition-colors"
                  >
                    hello@ceylonstories.lk
                  </a>
                </p>
              </div>
            </div>

            {/* Bridges */}
            <div className="flex items-center gap-8 flex-wrap justify-center">
              <Link
                href="/menu"
                className="group inline-flex items-center gap-3 font-editorial text-[10px] tracking-[0.28em] uppercase text-cream-page hover:text-gold-leaf transition-colors"
              >
                <span className="w-10 h-10 rounded-full border border-gold-leaf/40 flex items-center justify-center group-hover:bg-gold-leaf/10 transition-colors">
                  <span className="text-gold-leaf">&rarr;</span>
                </span>
                Explore the Menu
              </Link>
              <Link
                href="/visit"
                className="group inline-flex items-center gap-3 font-editorial text-[10px] tracking-[0.28em] uppercase text-cream-page hover:text-gold-leaf transition-colors"
              >
                <span className="w-10 h-10 rounded-full border border-gold-leaf/40 flex items-center justify-center group-hover:bg-gold-leaf/10 transition-colors">
                  <span className="text-gold-leaf">&rarr;</span>
                </span>
                Visit Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

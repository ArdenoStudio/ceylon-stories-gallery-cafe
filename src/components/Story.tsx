'use client';

import Link from 'next/link';
import { useReveal } from '@/src/hooks/useReveal';

/**
 * Story — Editorial Magazine Spread
 * Sunday-feature layout on cream paper. Masthead, hero photo with caption,
 * headline + drop-cap intro beside the founders portrait, "Now Showing"
 * exhibition card, and a footer CTA bridging to the full /our-story page.
 */
export default function Story() {
  const headerRef = useReveal('-10%');
  const bodyRef = useReveal('-10%');
  const heroRef = useReveal('-15%');

  return (
    <section id="story" className="relative w-full bg-cream-page text-mahogany overflow-hidden">
      <div className="paper-texture" />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 py-[clamp(80px,14vh,200px)]">

        {/* Masthead */}
        <div ref={headerRef} className="reveal-up flex items-baseline justify-between gap-6 pb-6 border-b border-mahogany/25">
          <div className="flex items-baseline gap-4">
            <span className="font-display italic text-clay-warm text-3xl leading-none">02</span>
            <p className="font-editorial text-[10px] tracking-[0.32em] uppercase text-mahogany/55">
              The Foundation &mdash; A Sunday Feature
            </p>
          </div>
          <p className="font-editorial text-[9px] tracking-[0.32em] uppercase text-mahogany/40 hidden md:block tabular-nums">
            Vol. 1 &middot; No. 1 &middot; Colombo
          </p>
        </div>

        {/* Hero photo + caption */}
        <div ref={heroRef} className="reveal-clip relative mt-10 mb-12 aspect-[16/8] overflow-hidden rounded-2xl">
          <img
            src="/images/story/tea-tasting.jpg"
            alt="A Dilmah tea tasting at Ceylon Stories — Marine Drive, Colombo"
            className="w-full h-full object-cover photo-heritage"
          />
        </div>
        <p className="font-editorial text-[10px] tracking-[0.22em] uppercase text-mahogany/55 -mt-8 mb-12 max-w-2xl">
          <span className="text-clay-warm">&mdash;</span> A Dilmah tea tasting at the Marine Drive space, where Sri Lankan craft, slow tea, and visual storytelling share one room.
        </p>

        {/* Headline + intro paragraph beside the founders portrait */}
        <div ref={bodyRef} className="reveal-up grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">

          {/* Left column — headline + drop-cap intro + body */}
          <div className="md:col-span-7 flex flex-col gap-8">
            <h2 className="font-display font-light text-mahogany text-[clamp(48px,7vw,96px)] leading-[0.92] tracking-[-0.02em] max-w-[14ch] text-balance">
              A room where <i className="text-clay-warm">slowness</i> is the point.
            </h2>

            <p className="font-body text-[15px] text-mahogany/80 leading-[1.75] max-w-[46ch] first-letter:font-display first-letter:text-[68px] first-letter:leading-[0.85] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-clay-warm">
              Ceylon Stories opened its doors on the 9<sup>th</sup> of January, 2026. Founded by Shazi Salim and Rumaiz Ramzy, the gallery café on Marine Drive is a love letter to the island &mdash; a small, deliberate room that holds Sri Lankan craft, premium Ceylon tea, and rotating local art.
            </p>

            <p className="font-body text-[15px] text-mahogany/80 leading-[1.75] max-w-[46ch]">
              The space &mdash; previously The Central Perk &mdash; has been thoughtfully reimagined. An authorised Dilmah dealer, the café offers guided tea tastings and a refined educational tea experience that places Sri Lanka&rsquo;s most respected blend at the centre of the room.
            </p>
          </div>

          {/* Right column — founders portrait */}
          <aside className="md:col-span-5 flex flex-col">
            <span aria-hidden className="block w-full h-px bg-mahogany/25" />
            <figure className="relative aspect-[4/5] overflow-hidden rounded-2xl mt-6">
              <img
                src="/images/story/founders.jpg"
                alt="Founders Shazi Salim and Rumaiz Ramzy at Ceylon Stories"
                className="w-full h-full object-cover photo-heritage"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-mahogany/85 to-transparent">
                <p className="font-editorial text-[9px] tracking-[0.3em] uppercase text-cream-page">
                  Shazi Salim &amp; Rumaiz Ramzy &mdash; the founders
                </p>
              </figcaption>
            </figure>
          </aside>
        </div>

        {/* Now Showing — editorial exhibition card */}
        <div className="mt-16 text-center flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <span className="w-10 h-px bg-clay-warm/55" />
            <span className="font-editorial text-[10px] tracking-[0.4em] uppercase text-clay-warm">
              Now Showing
            </span>
            <span className="w-10 h-px bg-clay-warm/55" />
          </div>

          <p className="font-display italic text-mahogany text-[clamp(28px,3.4vw,40px)] leading-[1.05] tracking-[-0.01em] text-balance max-w-xl">
            Adithi Dinethya Fernando
          </p>

          <p className="font-editorial text-[10px] tracking-[0.32em] uppercase text-mahogany/55">
            Until 28 February &middot; First in our rotating gallery
          </p>
        </div>

        {/* Footer line */}
        <div className="mt-14 pt-6 border-t border-mahogany/25 flex items-center justify-between gap-6 flex-wrap">
          <p className="font-editorial text-[9px] tracking-[0.3em] uppercase text-mahogany/45">
            Continued on the inside &mdash; Page 02
          </p>
          <Link href="/our-story" className="group inline-flex items-center gap-3 font-editorial text-[10px] tracking-[0.28em] uppercase text-mahogany hover:text-clay-warm transition-colors">
            <span className="w-10 h-10 rounded-full border border-clay-warm/40 flex items-center justify-center group-hover:bg-clay-warm/10 transition-colors">
              <span className="text-clay-warm">&rarr;</span>
            </span>
            Read the Full Story
          </Link>
        </div>
      </div>
    </section>
  );
}

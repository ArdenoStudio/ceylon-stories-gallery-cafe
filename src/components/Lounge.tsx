'use client';

import Link from 'next/link';
import { useReveal } from '@/src/hooks/useReveal';

export default function Lounge() {
  const headlineRef = useReveal('-10%');
  const imgRef = useReveal('-15%');
  const tailRef = useReveal('-15%');

  return (
    <section
      id="experience"
      className="relative w-full bg-ink-night overflow-hidden py-32 md:py-40"
    >
      {/* Top hairline */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gold-leaf/15" />

      <div className="relative max-w-[920px] mx-auto px-6 flex flex-col items-center text-center gap-14">

        {/* Eyebrow */}
        <p className="font-editorial text-[10px] tracking-[0.4em] uppercase text-clay-warm/80 flex items-center gap-3">
          <span className="w-8 h-px bg-clay-warm/60" />
          <span className="tabular-nums">04</span>
          <span className="text-cream-page/40">·</span>
          <span className="text-cream-page/60">The Lounge</span>
          <span className="w-8 h-px bg-clay-warm/60" />
        </p>

        {/* Headline */}
        <div ref={headlineRef} className="reveal-up">
          <h2 className="font-display font-light text-cream-page/95 text-[clamp(56px,8vw,128px)] leading-[0.92] tracking-[-0.025em] text-balance">
            <span className="italic">An </span>
            <span className="italic text-gold-leaf">amber-lit</span>
            <br />
            <span className="italic">kind of room.</span>
          </h2>
        </div>

        {/* Body */}
        <p className="font-body text-[15px] text-cream-page/70 leading-[1.8] text-pretty max-w-md">
          Imported shisha, soft brass, low conversation. The lounge runs on its own time — pull a chair, stay for the second bowl.
        </p>

        {/* Image */}
        <div
          ref={imgRef}
          className="reveal-inset relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-gold-leaf/15"
        >
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop"
            alt="Amber-lit lounge interior at Ceylon Stories"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover photo-heritage-deep"
          />
        </div>

        {/* Tail: features + CTA */}
        <div ref={tailRef} className="reveal-up flex flex-col items-center gap-12">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 font-editorial text-[10px] tracking-[0.3em] uppercase text-cream-page/50">
            {[
              { n: '01', label: 'Imported Blends' },
              { n: '02', label: 'Brass & Smoke' },
              { n: '03', label: 'Slow Hours' },
            ].map((it, i) => (
              <span key={it.n} className="flex items-center gap-3">
                {i > 0 && <span className="w-px h-3 bg-gold-leaf/30 hidden sm:inline-block" />}
                <span className="text-gold-leaf/70 tabular-nums">{it.n}</span>
                <span>{it.label}</span>
              </span>
            ))}
          </div>

          <Link
            href="/shisha"
            className="group inline-flex items-center gap-4 border-b border-gold-leaf/40 pb-2 hover:border-gold-leaf transition-colors"
          >
            <span className="font-editorial text-[10px] tracking-[0.4em] uppercase text-cream-page/90">
              Visit the Lounge
            </span>
            <span
              aria-hidden="true"
              className="font-display italic text-gold-leaf transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

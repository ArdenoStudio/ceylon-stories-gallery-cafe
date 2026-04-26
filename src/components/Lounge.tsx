'use client';

import { Motif } from './heritage/Motif';
import { useReveal } from '@/src/hooks/useReveal';

export default function Lounge() {
  const textRef = useReveal('-10%');
  const imgRef = useReveal('-10%');

  return (
    <section id="experience" className="relative w-full min-h-[90svh] bg-ink-night overflow-hidden flex items-center justify-center py-32 px-6">

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-ink-deep mix-blend-multiply pointer-events-none z-10" />
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.8)] z-20 pointer-events-none" />

      {/* Botanical drift */}
      <Motif
        name="frangipani"
        className="pointer-events-none absolute -bottom-10 -right-10 h-[360px] w-[360px] text-clay-warm/20 z-10"
      />
      <Motif
        name="fern-frond"
        className="pointer-events-none absolute top-16 left-8 h-40 w-40 text-gold-leaf/15 z-10 hidden md:block"
      />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-30">

        {/* Left Side Typography */}
        <div className="md:col-span-7 flex flex-col items-start relative z-20 md:-mr-20 lg:-mr-32 mt-12 md:mt-0 order-2 md:order-1">
          <div ref={textRef} className="reveal-left">
            <p className="font-editorial text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-clay-warm mb-8 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-clay-warm" /> 04 — THE LOUNGE
            </p>
            <h2 className="font-display italic font-light text-cream-page/90 text-[clamp(56px,8vw,120px)] leading-[0.85] tracking-[-0.02em] mix-blend-screen drop-shadow-2xl">
              After six, <br />
              <span className="text-gold-leaf not-italic font-normal">the room</span> <br />
              turns amber.
            </h2>
            <div className="mt-12 flex items-center gap-8 border-l border-gold-leaf/20 pl-6 max-w-md">
              <p className="font-body text-sm text-cream-page/60 leading-[1.8] uppercase tracking-wider">
                Our evening lounge pairs imported shisha blends with an understated, slow ambiance. Strictly reserved for evenings.
              </p>
            </div>
          </div>
        </div>

        {/* Right Image Block */}
        <div className="md:col-span-5 relative z-10 order-1 md:order-2 h-[50vh] md:h-[80vh] w-full">
          <div
            ref={imgRef}
            className="reveal-inset w-full h-full absolute inset-0 overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"
              alt="Shisha lounge at night glowing in amber light"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover photo-heritage-deep scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-ink-night mix-blend-multiply opacity-50" />
          </div>
        </div>

      </div>

      {/* Atmospheric Text */}
      <div className="absolute bottom-10 right-10 whitespace-nowrap opacity-10 pointer-events-none">
        <span className="font-display italic text-[160px] text-clay-warm select-none">
          Kolpetty Nights
        </span>
      </div>

    </section>
  );
}

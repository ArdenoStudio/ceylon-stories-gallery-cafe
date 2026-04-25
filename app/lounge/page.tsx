'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Motif } from '@/src/components/heritage/Motif';

type Blend = {
  id: number;
  name: string;
  tag: string | null;
  origin: string;
  notes: string[];
  intensity: number;
  intensityLabel: string;
  description: string;
  pairsWith: string;
  session: string;
};

const blends: Blend[] = [
  {
    id: 1,
    name: 'Ceylon Spice',
    tag: 'Signature',
    origin: 'House Blend',
    notes: ['Black tea tobacco', 'Cardamom', 'Star anise', 'Cinnamon'],
    intensity: 3,
    intensityLabel: 'Full',
    description: 'Our house blend. Warm and layered — built around a Ceylon black tea-infused tobacco base with hand-ground spices. The blend that defines the lounge.',
    pairsWith: 'Dilmah Single Estate Black · Arak & soda',
    session: 'Best for slow evenings, pairs well with conversation',
  },
  {
    id: 2,
    name: 'Double Apple',
    tag: null,
    origin: 'Imported',
    notes: ['Red apple', 'Green apple', 'Anise'],
    intensity: 2,
    intensityLabel: 'Medium',
    description: 'The classic, done right. Two apple profiles balanced against a clean anise finish. Familiar and reliable for any evening.',
    pairsWith: 'Mint lemonade · Chilled still water',
    session: 'Good entry point, works at any pace',
  },
  {
    id: 3,
    name: 'Mint Lemon',
    tag: null,
    origin: 'Imported',
    notes: ['Spearmint', 'Citrus', 'Ice'],
    intensity: 1,
    intensityLabel: 'Light',
    description: 'Bright and cooling. A natural spearmint cut with cold citrus — the cleanest smoke on the menu. Best for long sessions.',
    pairsWith: 'Iced Ceylon green tea · Sparkling water',
    session: 'Ideal for extended evenings, very low fatigue',
  },
  {
    id: 4,
    name: 'Blueberry Ice',
    tag: null,
    origin: 'Imported',
    notes: ['Wild blueberry', 'Menthol', 'Vanilla'],
    intensity: 1,
    intensityLabel: 'Light',
    description: 'Sweet berry with a slow menthol finish. Best paired with the house iced tea or a cold brew.',
    pairsWith: 'House iced tea · Cold brew coffee',
    session: 'Smooth and easy — great for first-timers',
  },
  {
    id: 5,
    name: 'Grape Mint',
    tag: null,
    origin: 'Imported',
    notes: ['Concord grape', 'Fresh mint'],
    intensity: 2,
    intensityLabel: 'Medium',
    description: 'A perennial favourite. Dark grape and bright mint — simple, reliable, always good.',
    pairsWith: 'Any still water · Light cocktails',
    session: 'Versatile — works for any group or occasion',
  },
  {
    id: 6,
    name: 'Watermelon Breeze',
    tag: null,
    origin: 'Imported',
    notes: ['Watermelon', 'Ice', 'Light mint'],
    intensity: 1,
    intensityLabel: 'Light',
    description: 'Clean watermelon with barely-there mint. Light enough to smoke all evening without fatigue.',
    pairsWith: 'Fresh fruit juice · Coconut water',
    session: 'Best in warm weather, very refreshing',
  },
  {
    id: 7,
    name: 'Peach Rings',
    tag: null,
    origin: 'Imported',
    notes: ['White peach', 'Honeydew', 'Vanilla'],
    intensity: 1,
    intensityLabel: 'Light',
    description: 'Soft and sweet. A peachy smoke with a quiet vanilla tail — ideal for newcomers to the lounge.',
    pairsWith: 'Dilmah Chamomile · Peach iced tea',
    session: 'Recommended for first-time lounge visitors',
  },
  {
    id: 8,
    name: 'Rose & Oud',
    tag: 'Reserve',
    origin: 'Special',
    notes: ['Damask rose', 'Oud wood', 'Amber'],
    intensity: 3,
    intensityLabel: 'Full',
    description: 'Our most complex blend. Floral and resinous — a slow burn for the patient smoker. Ask your server for nightly availability.',
    pairsWith: 'Dilmah Silver Tips White Tea · Neat whisky',
    session: 'Reserved for unhurried evenings, limited nightly',
  },
];

const IntensityDots = ({ level }: { level: number }) => (
  <div className="flex items-center gap-1.5">
    {[1, 2, 3].map(i => (
      <span
        key={i}
        className="w-2 h-2 rounded-full"
        style={{ background: i <= level ? '#00FF88' : 'rgba(235,224,202,0.1)' }}
      />
    ))}
  </div>
);

const ExpandIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);

export default function LoungePage() {
  const [selected, setSelected] = useState<Blend | null>(null);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[100svh] bg-ink-deep text-cream-page flex flex-col justify-end pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover photo-heritage-deep opacity-35"
          />
        </div>
        <div className="absolute inset-0 shadow-[inset_0_0_300px_rgba(0,0,0,0.85)] pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-ink-deep via-ink-deep/70 to-transparent z-10 pointer-events-none" />

        <Motif name="frangipani" className="pointer-events-none absolute -top-6 -right-6 h-80 w-80 text-clay-warm/10 z-10 hidden md:block" />
        <Motif name="fern-frond" className="pointer-events-none absolute top-20 left-10 h-44 w-44 text-gold-leaf/8 z-10 hidden md:block" />

        <motion.div
          className="absolute top-40 right-6 md:right-14 z-20 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
        >
          <p className="font-editorial text-[8px] tracking-[0.28em] uppercase text-cream-page/25 mb-1">Opens at</p>
          <p className="font-display text-[80px] leading-none text-cream-page/10 tracking-tight select-none">6PM</p>
        </motion.div>

        <div className="absolute bottom-8 right-0 whitespace-nowrap opacity-[0.04] pointer-events-none overflow-hidden z-10 select-none">
          <span className="font-display italic text-[140px] text-clay-warm">Kolpetty Nights</span>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-editorial text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-gold-leaf mb-8 flex items-center gap-4">
              <span className="w-10 h-[1px] bg-gold-leaf/50" /> 04 — THE LOUNGE
            </p>
            <h1 className="font-display italic font-light text-cream-page text-[clamp(54px,9vw,128px)] leading-[0.85] tracking-[-0.02em] mb-10">
              After six,<br />
              <span className="text-gold-leaf not-italic font-normal">the room</span><br />
              turns amber.
            </h1>
            <p className="font-body text-sm text-cream-page/50 leading-[1.95] max-w-[44ch] border-l border-gold-leaf/20 pl-6">
              Our evening lounge pairs imported shisha blends with an understated, slow ambiance. The lights drop at six. The music settles to a low register. The rest is up to you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── The Blends ────────────────────────────────────────────────────── */}
      <section className="relative w-full bg-ink-night py-[clamp(80px,10vh,140px)] px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-deep/50 to-transparent pointer-events-none z-0" />
        <Motif name="laurel-half" className="absolute top-0 left-0 h-72 w-36 text-clay-warm/6 pointer-events-none z-0" />
        <Motif name="fern-frond" className="absolute bottom-12 right-4 h-56 w-56 text-gold-leaf/5 pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <p className="font-editorial text-[9px] tracking-[0.3em] uppercase text-clay-warm mb-4 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-clay-warm/60" /> The Blends
            </p>
            <h2 className="font-display font-light text-cream-page text-[clamp(32px,4.5vw,64px)] leading-[0.95] tracking-tight">
              Eight blends.<br />
              <i className="text-gold-leaf">One pipe at a time.</i>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {blends.map((blend, i) => (
              <motion.div
                key={blend.id}
                className="group relative flex flex-col border border-cream-page/8 bg-ink-deep/50 p-6 hover:border-cream-page/16 transition-colors duration-500"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.55, delay: i * 0.055, ease: [0.16, 1, 0.3, 1] }}
              >
                {blend.tag && (
                  <span
                    className="font-editorial text-[7px] tracking-[0.28em] uppercase border px-2 py-0.5 mb-4 inline-block w-fit"
                    style={{ color: 'rgba(0,255,136,0.65)', borderColor: 'rgba(0,255,136,0.18)' }}
                  >
                    {blend.tag}
                  </span>
                )}
                {!blend.tag && <div className="mb-4 h-[18px]" />}

                <h3 className="font-display font-light text-cream-page text-xl leading-tight mb-1">{blend.name}</h3>
                <p className="font-editorial text-[8px] tracking-[0.18em] uppercase text-cream-page/25 mb-5">{blend.origin}</p>
                <p className="font-body text-xs text-cream-page/38 leading-[1.75] mb-6 flex-1">
                  {blend.notes.join(' · ')}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IntensityDots level={blend.intensity} />
                    <span className="font-editorial text-[7px] tracking-[0.18em] uppercase text-cream-page/22">{blend.intensityLabel}</span>
                  </div>

                  {/* Skeuomorphic detail button */}
                  <button
                    onClick={() => setSelected(blend)}
                    className="lnt-button !w-8 !h-8 !rounded-[8px] shrink-0"
                    aria-label={`Details for ${blend.name}`}
                  >
                    <div className="lnt-frame">
                      <ExpandIcon />
                    </div>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="font-editorial text-[8px] tracking-[0.2em] uppercase text-cream-page/18 mt-10 text-right">
            All blends served with natural coconut charcoal · Custom mixes available on request
          </p>
        </div>
      </section>

      {/* ── Blend Detail Modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-ink-deep/80 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelected(null)}
            />

            {/* Panel */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 md:inset-y-0 md:left-auto md:right-0 md:w-[480px] bg-ink-deep border-t md:border-t-0 md:border-l border-cream-page/10 z-50 flex flex-col overflow-y-auto modal-scroll"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ maxHeight: '90svh' }}
            >
              {/* Panel header */}
              <div className="flex items-start justify-between p-8 pb-6 border-b border-cream-page/8 sticky top-0 bg-ink-deep z-10">
                <div>
                  {selected.tag && (
                    <span
                      className="font-editorial text-[7px] tracking-[0.28em] uppercase border px-2 py-0.5 mb-3 inline-block"
                      style={{ color: 'rgba(0,255,136,0.65)', borderColor: 'rgba(0,255,136,0.18)' }}
                    >
                      {selected.tag}
                    </span>
                  )}
                  <h3 className="font-display font-light text-cream-page text-3xl leading-tight">{selected.name}</h3>
                  <p className="font-editorial text-[8px] tracking-[0.2em] uppercase text-cream-page/30 mt-1">{selected.origin}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="lnt-button !w-9 !h-9 !rounded-[10px] shrink-0 mt-1"
                  aria-label="Close"
                >
                  <div className="lnt-frame">
                    <X size={14} strokeWidth={1.5} />
                  </div>
                </button>
              </div>

              {/* Panel body */}
              <div className="p-8 flex flex-col gap-8">
                {/* Description */}
                <p className="font-body text-sm text-cream-page/55 leading-[1.9]">{selected.description}</p>

                {/* Notes */}
                <div>
                  <p className="font-editorial text-[8px] tracking-[0.28em] uppercase text-gold-leaf/60 mb-4">Flavour Notes</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.notes.map(note => (
                      <span
                        key={note}
                        className="font-editorial text-[8px] tracking-[0.16em] uppercase text-cream-page/50 border border-cream-page/10 px-3 py-1.5"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Intensity */}
                <div>
                  <p className="font-editorial text-[8px] tracking-[0.28em] uppercase text-gold-leaf/60 mb-4">Intensity</p>
                  <div className="flex items-center gap-4">
                    <IntensityDots level={selected.intensity} />
                    <span className="font-body text-sm text-cream-page/45">{selected.intensityLabel}</span>
                  </div>
                </div>

                {/* Pairs with */}
                <div>
                  <p className="font-editorial text-[8px] tracking-[0.28em] uppercase text-gold-leaf/60 mb-3">Pairs With</p>
                  <p className="font-body text-sm text-cream-page/50 leading-[1.8] border-l border-gold-leaf/15 pl-4">{selected.pairsWith}</p>
                </div>

                {/* Session note */}
                <div className="bg-cream-page/4 border border-cream-page/8 px-5 py-4">
                  <p className="font-editorial text-[8px] tracking-[0.22em] uppercase text-cream-page/30 mb-1">Server's Note</p>
                  <p className="font-body text-xs text-cream-page/45 leading-[1.8]">{selected.session}</p>
                </div>

                {/* CTA */}
                <a
                  href="https://wa.me/94770000000?text=I%20would%20like%20to%20order%20the%20shisha%20blend%20at%20the%20evening%20lounge."
                  target="_blank"
                  rel="noreferrer"
                  className="font-editorial text-[10px] tracking-[0.22em] uppercase text-mahogany bg-cream-page px-6 py-4 hover:bg-gold-leaf transition-colors duration-300 text-center"
                >
                  Reserve a Table →
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── The Atmosphere ────────────────────────────────────────────────── */}
      <section className="relative w-full bg-ink-deep overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-[clamp(80px,10vh,140px)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-center">
            <motion.div
              className="md:col-span-5 overflow-hidden"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop"
                  alt="The evening lounge at Ceylon Stories"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover photo-heritage-deep transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-7 md:pl-16"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <p className="font-editorial text-[9px] tracking-[0.3em] uppercase text-clay-warm mb-8">The Evening</p>
              <blockquote className="font-display italic font-light text-cream-page/75 text-[clamp(26px,3.2vw,50px)] leading-[1.1] tracking-tight mb-10">
                "The lights drop, the music settles to a low register, and the shisha lounge opens."
              </blockquote>
              <p className="font-body text-sm text-cream-page/40 leading-[1.95] max-w-[44ch] border-l border-gold-leaf/15 pl-5 mb-10">
                Kolpetty nights are slower than the rest of Colombo. Imported tobacco blends, our signature Ceylon Spice, and a drinks list built for lingering. No rush. No last-call announcement. Just the amber light and the smoke.
              </p>
              <a
                href="https://wa.me/94770000000?text=I%20would%20like%20to%20reserve%20a%20table%20for%20the%20evening%20lounge."
                target="_blank"
                rel="noreferrer"
                className="font-editorial text-[10px] tracking-[0.22em] uppercase text-cream-page/60 inline-flex items-center gap-3 border border-cream-page/15 px-6 py-3 hover:bg-cream-page/5 hover:border-cream-page/30 transition-colors duration-300 w-fit"
              >
                Reserve a Table <span>→</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Hours & Info ──────────────────────────────────────────────────── */}
      <section className="relative w-full bg-ink-night py-[clamp(60px,8vh,120px)] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                label: 'Opening Hours',
                lines: ['Monday – Friday', '6:00 PM — 12:00 AM', '', 'Saturday – Sunday', '6:00 PM — 1:00 AM'],
              },
              {
                label: 'Location',
                lines: ['9/6A, Marine Drive', 'Kolpetty, Colombo 03', 'Sri Lanka'],
              },
              {
                label: 'Good to Know',
                lines: ['Evening only — strictly after 6 PM.', 'Reservations recommended', 'on Fridays & weekends.', 'WhatsApp for bookings.'],
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="border-t border-cream-page/10 pt-8"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-editorial text-[8px] tracking-[0.28em] uppercase text-gold-leaf/65 mb-5">{item.label}</p>
                {item.lines.map((line, j) =>
                  line === '' ? (
                    <div key={j} className="h-3" />
                  ) : (
                    <p key={j} className="font-body text-sm text-cream-page/45 leading-[1.9]">{line}</p>
                  )
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reserve CTA ───────────────────────────────────────────────────── */}
      <section className="w-full bg-mahogany py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-editorial text-[9px] tracking-[0.25em] uppercase text-gold-leaf mb-3">Reserve Your Evening</p>
            <h2 className="font-display font-light text-cream-page text-3xl md:text-5xl leading-[1.1]">
              The smoke starts at six.
            </h2>
          </div>
          <a
            href="https://wa.me/94770000000?text=I%20would%20like%20to%20reserve%20a%20table%20for%20the%20evening%20lounge."
            target="_blank"
            rel="noreferrer"
            className="font-editorial text-[10px] tracking-[0.2em] uppercase text-mahogany bg-cream-page px-10 py-5 hover:bg-gold-leaf transition-colors duration-300 shrink-0 whitespace-nowrap"
          >
            Reserve via WhatsApp →
          </a>
        </div>
      </section>
    </>
  );
}

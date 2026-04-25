'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Motif } from '@/src/components/heritage/Motif';
import { FallingPattern } from '@/src/components/ui/falling-pattern';
import { Button06 } from '@/src/components/ui/button06';

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

const IntensityRule = ({ level }: { level: number }) => (
  <div className="flex items-center gap-1.5">
    {[1, 2, 3].map(i => (
      <span
        key={i}
        className="block h-px w-5 md:w-6 transition-colors"
        style={{ background: i <= level ? 'var(--color-gold-leaf)' : 'rgba(235,224,202,0.14)' }}
      />
    ))}
  </div>
);

const HOURS = ['05', '06', '07', '08', '09', '10', '11', '12'];

export default function LoungePage() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[100svh] bg-ink-deep text-cream-page overflow-hidden flex items-end">
        {/* Background photo with slow zoom */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 18, ease: 'easeOut' }}
        >
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2400&auto=format&fit=crop"
            alt=""
            aria-hidden
            className="w-full h-full object-cover photo-heritage-deep opacity-30"
          />
        </motion.div>

        {/* Falling embers */}
        <div className="absolute inset-0 opacity-[0.22] mix-blend-screen pointer-events-none z-[1]">
          <FallingPattern color="#c9a25a" backgroundColor="transparent" duration={260} blurIntensity="0px" density={1} />
        </div>

        {/* Vignettes & grain */}
        <div className="absolute inset-0 shadow-[inset_0_0_400px_rgba(0,0,0,0.92)] pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-[72%] bg-gradient-to-t from-ink-deep via-ink-deep/75 to-transparent z-10 pointer-events-none" />
        <div className="paper-texture z-10" />

        {/* Heritage motifs */}
        <Motif name="frangipani" className="pointer-events-none absolute -top-8 -right-8 h-80 w-80 text-clay-warm/[0.07] z-10 hidden md:block" />
        <Motif name="fern-frond" className="pointer-events-none absolute top-24 left-12 h-48 w-48 text-gold-leaf/[0.06] z-10 hidden md:block" />

        {/* Vertical chapter rail (left edge) */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-6">
          <span
            className="font-editorial text-[8px] tracking-[0.42em] uppercase text-cream-page/30"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Ceylon Stories — Vol. IV
          </span>
          <span className="block w-px h-24 bg-gold-leaf/35" />
          <span
            className="font-editorial text-[8px] tracking-[0.42em] uppercase text-gold-leaf/65"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            The Lounge — Kolpetty
          </span>
        </div>

        {/* Hour-tick rail (right edge) */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-end gap-4">
          <p className="font-editorial text-[7px] tracking-[0.32em] uppercase text-cream-page/25 mb-1">— Hours of Service</p>
          {HOURS.map(h => {
            const active = h === '06';
            return (
              <div key={h} className="flex items-center gap-3">
                {active && (
                  <span className="font-editorial text-[8px] tracking-[0.28em] uppercase text-gold-leaf">
                    Lights drop
                  </span>
                )}
                <span className={`font-display ${active ? 'text-gold-leaf text-base' : 'text-cream-page/22 text-xs'}`}>
                  {h}
                </span>
                <span
                  className="block h-px"
                  style={{
                    width: active ? 32 : 14,
                    background: active ? 'var(--color-gold-leaf)' : 'rgba(235,224,202,0.18)',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Tonight plaque (top right) */}
        <motion.aside
          className="absolute top-28 right-32 z-20 hidden xl:block max-w-[260px] border-l border-gold-leaf/35 pl-5"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, delay: 1.1 }}
        >
          <p className="font-editorial text-[8px] tracking-[0.32em] uppercase text-cream-page/30 mb-3">Tonight at the Lounge</p>
          <p className="font-editorial text-[8px] tracking-[0.24em] uppercase text-gold-leaf/75 mb-1">Nº 01 — Signature</p>
          <p className="font-display italic font-light text-cream-page text-2xl leading-tight mb-3">Ceylon Spice</p>
          <p className="font-body text-[11px] text-cream-page/45 leading-[1.75]">
            Black tea tobacco · cardamom · star anise · cinnamon.
          </p>
        </motion.aside>

        {/* Headline cluster (bottom-left) */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 pb-24 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[60ch]"
          >
            <p className="font-editorial text-[9px] md:text-[10px] tracking-[0.36em] uppercase text-gold-leaf mb-8 flex items-center gap-4">
              <span className="w-12 h-px bg-gold-leaf/55" /> Chapter IV — The Lounge
            </p>
            <h1 className="font-display italic font-light text-cream-page text-[clamp(54px,9.5vw,140px)] leading-[0.85] tracking-[-0.025em] mb-10">
              After six,<br />
              <span className="text-gold-leaf not-italic font-normal">the room</span><br />
              turns amber.
            </h1>
            <p className="font-body text-sm md:text-[15px] text-cream-page/55 leading-[1.95] max-w-[44ch]">
              An evening lounge for slow hours. Imported shisha blends, our signature Ceylon Spice, and a drinks list built for lingering.
            </p>
          </motion.div>
        </div>

        {/* Bottom hairline + editorial caption */}
        <div className="absolute bottom-6 left-0 right-0 z-20 px-6 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between border-t border-cream-page/8 pt-4">
            <span className="font-editorial text-[8px] tracking-[0.32em] uppercase text-cream-page/22">
              Photographed in the Lounge · Friday, 11:42 PM
            </span>
            <span className="font-editorial text-[8px] tracking-[0.32em] uppercase text-cream-page/22">
              Kolpetty · Colombo 03
            </span>
          </div>
        </div>
      </section>

      {/* ── The Tasting Card ─────────────────────────────────────────────── */}
      <section className="relative w-full bg-ink-night overflow-hidden">
        <Motif name="laurel-half" className="absolute top-12 left-0 h-72 w-36 text-clay-warm/[0.05] pointer-events-none" />
        <Motif name="fern-frond" className="absolute bottom-32 right-0 h-72 w-72 text-gold-leaf/[0.04] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-[clamp(80px,10vh,140px)] relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16 md:mb-20"
          >
            <div className="md:col-span-7">
              <p className="font-editorial text-[9px] tracking-[0.36em] uppercase text-clay-warm/85 mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-clay-warm/55" /> The Tasting Card
              </p>
              <h2 className="font-display font-light text-cream-page text-[clamp(34px,5vw,72px)] leading-[0.95] tracking-[-0.02em]">
                Eight blends.<br />
                <i className="text-gold-leaf">One pipe at a time.</i>
              </h2>
            </div>
            <div className="md:col-span-5 md:pl-8">
              <p className="font-body text-sm text-cream-page/45 leading-[1.95] max-w-[40ch] border-l border-gold-leaf/20 pl-5">
                Two profiles built in-house, six imported. All served with natural coconut charcoal. Custom mixes at the host's discretion.
              </p>
            </div>
          </motion.div>

          <ul className="border-t border-cream-page/12">
            {blends.map((b, i) => {
              const isOpen = openId === b.id;
              const num = String(i + 1).padStart(2, '0');
              return (
                <li key={b.id} className="border-b border-cream-page/12">
                  <button
                    onClick={() => setOpenId(isOpen ? null : b.id)}
                    aria-expanded={isOpen}
                    className="w-full grid grid-cols-12 gap-4 md:gap-6 items-baseline py-7 md:py-9 text-left group hover:bg-cream-page/[0.025] transition-colors duration-300 px-2 md:px-3"
                  >
                    <span className="col-span-2 md:col-span-1 font-display italic font-light text-gold-leaf/60 text-2xl md:text-3xl leading-none">
                      Nº {num}
                    </span>
                    <div className="col-span-10 md:col-span-4">
                      <h3 className="font-display font-light text-cream-page text-2xl md:text-[34px] leading-[1] tracking-[-0.015em]">
                        {b.name}
                      </h3>
                      {b.tag && (
                        <span className="font-editorial text-[8px] tracking-[0.28em] uppercase text-gold-leaf/75 mt-2 inline-block">
                          — {b.tag}
                        </span>
                      )}
                    </div>
                    <p className="col-span-12 md:col-span-4 font-editorial text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-cream-page/45 leading-[1.95]">
                      {b.notes.join(' · ')}
                    </p>
                    <div className="col-span-8 md:col-span-2 flex items-center gap-2 md:justify-end">
                      <IntensityRule level={b.intensity} />
                      <span className="font-editorial text-[8px] tracking-[0.22em] uppercase text-cream-page/35 ml-1">
                        {b.intensityLabel}
                      </span>
                    </div>
                    <span className="col-span-4 md:col-span-1 md:text-right font-editorial text-[10px] tracking-[0.28em] uppercase text-cream-page/35 group-hover:text-gold-leaf transition-colors">
                      {isOpen ? '— Close' : '+ Read'}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-12 gap-6 md:gap-8 px-2 md:px-3 pb-12 pt-2">
                          <div className="hidden md:block md:col-span-1" />
                          <div className="col-span-12 md:col-span-7">
                            <p className="font-body text-[15px] text-cream-page/65 leading-[1.95] mb-7 max-w-[58ch]">
                              {b.description}
                            </p>
                            <p className="font-editorial text-[8px] tracking-[0.32em] uppercase text-gold-leaf/65 mb-2">Pairs With</p>
                            <p className="font-body text-sm text-cream-page/50 leading-[1.85] border-l border-gold-leaf/20 pl-4 max-w-[44ch]">
                              {b.pairsWith}
                            </p>
                          </div>
                          <div className="col-span-12 md:col-span-4 md:border-l border-cream-page/10 md:pl-8">
                            <p className="font-editorial text-[8px] tracking-[0.32em] uppercase text-cream-page/35 mb-2">Server's Note</p>
                            <p className="font-body text-[13px] text-cream-page/55 leading-[1.85] mb-7">{b.session}</p>
                            <p className="font-editorial text-[8px] tracking-[0.32em] uppercase text-cream-page/35 mb-2">Origin</p>
                            <p className="font-body text-[13px] text-cream-page/55">{b.origin}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <p className="font-editorial text-[8px] tracking-[0.28em] uppercase text-cream-page/25 mt-10 text-right">
            Custom mixes available · Ask the host
          </p>
        </div>
      </section>

      {/* ── Atmosphere — full bleed ──────────────────────────────────────── */}
      <section className="relative w-full bg-ink-deep overflow-hidden">
        <div className="relative h-[88vh] min-h-[620px] w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2400&auto=format&fit=crop"
            alt="Kolpetty nights at Ceylon Stories"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover photo-heritage-deep"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-deep/95 via-ink-deep/55 to-ink-deep/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/40 to-transparent" />

          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-6 pb-20 md:pb-28 w-full">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl"
              >
                <p className="font-editorial text-[9px] tracking-[0.36em] uppercase text-clay-warm mb-8 flex items-center gap-3">
                  <span className="w-8 h-px bg-clay-warm/55" /> II — Kolpetty Nights
                </p>
                <blockquote className="font-display italic font-light text-cream-page text-[clamp(28px,4vw,58px)] leading-[1.05] tracking-[-0.015em] mb-10">
                  "The lights drop at six. The music settles to a low register. The rest is up to you."
                </blockquote>
                <p className="font-body text-sm text-cream-page/60 leading-[1.95] max-w-[48ch] border-l border-gold-leaf/25 pl-5">
                  Kolpetty nights are slower than the rest of Colombo. No rush. No last-call. Just the amber light and the smoke.
                </p>
              </motion.div>
            </div>
          </div>

          <span className="absolute top-8 right-8 font-editorial text-[8px] tracking-[0.32em] uppercase text-cream-page/30 hidden md:block">
            Photo · The House
          </span>
        </div>
      </section>

      {/* ── Visiting — colophon ──────────────────────────────────────────── */}
      <section className="relative w-full bg-ink-night py-[clamp(70px,9vh,130px)] px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-editorial text-[9px] tracking-[0.36em] uppercase text-gold-leaf/70 mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-gold-leaf/45" /> Visiting
            </p>
            <h3 className="font-display font-light text-cream-page text-3xl md:text-5xl tracking-[-0.015em] leading-[1.05] mb-16 md:mb-20">
              <i>Practical notes</i> for the evening.
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 border-t border-gold-leaf/20 pt-12">
            {[
              { label: 'Opening Hours', lines: ['Monday — Friday', '6:00 PM — 12:00 AM', '', 'Saturday — Sunday', '6:00 PM — 1:00 AM'] },
              { label: 'Location', lines: ['9/6A, Marine Drive', 'Kolpetty, Colombo 03', 'Sri Lanka'] },
              { label: 'Good to Know', lines: ['Strictly after 6 PM.', 'Reservations recommended on Fridays & weekends.', 'WhatsApp for bookings.'] },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-editorial text-[8px] tracking-[0.32em] uppercase text-gold-leaf/70 mb-6">{item.label}</p>
                {item.lines.map((line, j) =>
                  line === '' ? (
                    <div key={j} className="h-3" />
                  ) : (
                    <p key={j} className="font-body text-sm text-cream-page/55 leading-[1.95]">{line}</p>
                  )
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reserve CTA — quiet & confident ──────────────────────────────── */}
      <section className="relative w-full bg-ink-deep py-[clamp(90px,12vh,160px)] px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.14] mix-blend-screen pointer-events-none">
          <FallingPattern color="#c9a25a" backgroundColor="transparent" duration={320} blurIntensity="0px" density={1} />
        </div>
        <div className="absolute inset-0 shadow-[inset_0_0_240px_rgba(0,0,0,0.7)] pointer-events-none" />
        <Motif name="frangipani" className="absolute -top-12 -right-12 h-72 w-72 text-clay-warm/[0.06] pointer-events-none" />
        <Motif name="fern-frond" className="absolute -bottom-16 -left-12 h-64 w-64 text-gold-leaf/[0.05] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <p className="font-editorial text-[9px] tracking-[0.36em] uppercase text-gold-leaf/75 mb-8 inline-flex items-center gap-3">
            <span className="w-8 h-px bg-gold-leaf/45" /> Reserve Your Evening <span className="w-8 h-px bg-gold-leaf/45" />
          </p>
          <h2 className="font-display italic font-light text-cream-page text-[clamp(34px,5.5vw,82px)] leading-[1.05] tracking-[-0.02em] mb-12">
            The smoke starts at six.
          </h2>
          <p className="font-body text-sm text-cream-page/50 leading-[1.95] max-w-[44ch] mx-auto mb-12">
            Tables fill quickly on Fridays and weekends. A short message on WhatsApp is the fastest way to hold one.
          </p>
          <div className="flex justify-center">
            <Button06
              text="Reserve via WhatsApp"
              href="https://wa.me/94770000000?text=I%20would%20like%20to%20reserve%20a%20table%20for%20the%20evening%20lounge."
            />
          </div>
        </div>
      </section>
    </>
  );
}

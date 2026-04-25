'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InteractiveNav } from '@/src/components/ui/interactive-nav';
import { Motif } from '@/src/components/heritage/Motif';

const blends = [
  {
    id: 1,
    name: 'Ceylon Spice',
    tag: 'Signature',
    origin: 'House Blend',
    notes: 'Black tea tobacco · Cardamom · Star anise · Cinnamon',
    intensity: 3,
    intensityLabel: 'Full',
    description: 'Our house blend. Warm and layered — built around a Ceylon black tea-infused tobacco base with hand-ground spices. The blend that defines the lounge.',
  },
  {
    id: 2,
    name: 'Double Apple',
    tag: null,
    origin: 'Imported',
    notes: 'Red apple · Green apple · Anise',
    intensity: 2,
    intensityLabel: 'Medium',
    description: 'The classic, done right. Two apple profiles balanced against a clean anise finish. Familiar and reliable for any evening.',
  },
  {
    id: 3,
    name: 'Mint Lemon',
    tag: null,
    origin: 'Imported',
    notes: 'Spearmint · Citrus · Ice',
    intensity: 1,
    intensityLabel: 'Light',
    description: 'Bright and cooling. A natural spearmint cut with cold citrus — the cleanest smoke on the menu. Best for long sessions.',
  },
  {
    id: 4,
    name: 'Blueberry Ice',
    tag: null,
    origin: 'Imported',
    notes: 'Wild blueberry · Menthol · Vanilla',
    intensity: 1,
    intensityLabel: 'Light',
    description: 'Sweet berry with a slow menthol finish. Best paired with the house iced tea or a cold brew.',
  },
  {
    id: 5,
    name: 'Grape Mint',
    tag: null,
    origin: 'Imported',
    notes: 'Concord grape · Fresh mint',
    intensity: 2,
    intensityLabel: 'Medium',
    description: 'A perennial favourite. Dark grape and bright mint — simple, reliable, always good.',
  },
  {
    id: 6,
    name: 'Watermelon Breeze',
    tag: null,
    origin: 'Imported',
    notes: 'Watermelon · Ice · Light mint',
    intensity: 1,
    intensityLabel: 'Light',
    description: 'Clean watermelon with barely-there mint. Light enough to smoke all evening without fatigue.',
  },
  {
    id: 7,
    name: 'Peach Rings',
    tag: null,
    origin: 'Imported',
    notes: 'White peach · Honeydew · Vanilla',
    intensity: 1,
    intensityLabel: 'Light',
    description: 'Soft and sweet. A peachy smoke with a quiet vanilla tail — ideal for newcomers to the lounge.',
  },
  {
    id: 8,
    name: 'Rose & Oud',
    tag: 'Reserve',
    origin: 'Special',
    notes: 'Damask rose · Oud wood · Amber',
    intensity: 3,
    intensityLabel: 'Full',
    description: 'Our most complex blend. Floral and resinous — a slow burn for the patient smoker. Ask your server for nightly availability.',
  },
];

const IntensityDots = ({ level }: { level: number }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3].map(i => (
      <span
        key={i}
        className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
        style={{ background: i <= level ? '#00FF88' : 'rgba(235,224,202,0.12)' }}
      />
    ))}
  </div>
);

export default function LoungePage() {
  const [view, setView] = useState<'list' | 'grid'>('grid');

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[100svh] bg-ink-deep text-cream-page flex flex-col justify-end pb-24 px-6 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover photo-heritage-deep opacity-35"
          />
        </div>

        {/* Gradient vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_300px_rgba(0,0,0,0.85)] pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-ink-deep via-ink-deep/70 to-transparent z-10 pointer-events-none" />

        {/* Motifs */}
        <Motif
          name="frangipani"
          className="pointer-events-none absolute -top-6 -right-6 h-80 w-80 text-clay-warm/10 z-10 hidden md:block"
        />
        <Motif
          name="fern-frond"
          className="pointer-events-none absolute top-20 left-10 h-44 w-44 text-gold-leaf/8 z-10 hidden md:block"
        />

        {/* Hours badge */}
        <motion.div
          className="absolute top-40 right-6 md:right-14 z-20 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
        >
          <p className="font-editorial text-[8px] tracking-[0.28em] uppercase text-cream-page/25 mb-1">Opens at</p>
          <p className="font-display text-[80px] leading-none text-cream-page/10 tracking-tight select-none">6PM</p>
        </motion.div>

        {/* Atmospheric watermark */}
        <div className="absolute bottom-8 right-0 whitespace-nowrap opacity-[0.04] pointer-events-none overflow-hidden z-10 select-none">
          <span className="font-display italic text-[140px] text-clay-warm">Kolpetty Nights</span>
        </div>

        {/* Copy */}
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
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-editorial text-[9px] tracking-[0.3em] uppercase text-clay-warm mb-4 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-clay-warm/60" /> The Blends
              </p>
              <h2 className="font-display font-light text-cream-page text-[clamp(32px,4.5vw,64px)] leading-[0.95] tracking-tight">
                Eight blends.<br />
                <i className="text-gold-leaf">One pipe at a time.</i>
              </h2>
            </motion.div>

            {/* View toggle */}
            <motion.div
              className="flex flex-col items-start md:items-end gap-2 shrink-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="font-editorial text-[8px] tracking-[0.25em] uppercase text-cream-page/25">Browse as</p>
              <InteractiveNav view={view} onViewChange={setView} />
            </motion.div>
          </div>

          {/* Blend views */}
          <AnimatePresence mode="wait">
            {view === 'grid' ? (
              <motion.div
                key="grid"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {blends.map((blend, i) => (
                  <motion.div
                    key={blend.id}
                    className="relative border border-cream-page/8 bg-ink-deep/50 p-6 hover:border-gold-leaf/20 transition-colors duration-500"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: i * 0.055, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {blend.tag && (
                      <span className="font-editorial text-[7px] tracking-[0.28em] uppercase border px-2 py-0.5 mb-4 inline-block"
                        style={{ color: 'rgba(0,255,136,0.65)', borderColor: 'rgba(0,255,136,0.18)' }}>
                        {blend.tag}
                      </span>
                    )}
                    <h3 className="font-display font-light text-cream-page text-xl leading-tight mb-1">{blend.name}</h3>
                    <p className="font-editorial text-[8px] tracking-[0.18em] uppercase text-cream-page/25 mb-4">{blend.origin}</p>
                    <p className="font-body text-xs text-cream-page/40 leading-[1.75] mb-6">{blend.notes}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <IntensityDots level={blend.intensity} />
                      <span className="font-editorial text-[7px] tracking-[0.18em] uppercase text-cream-page/22">{blend.intensityLabel}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                className="flex flex-col divide-y divide-cream-page/8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {blends.map((blend, i) => (
                  <motion.div
                    key={blend.id}
                    className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 py-7 hover:bg-ink-deep/30 -mx-4 px-4 transition-colors duration-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.045, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="md:w-52 shrink-0">
                      <div className="flex items-center gap-3 mb-0.5">
                        <h3 className="font-display font-light text-cream-page text-lg">{blend.name}</h3>
                        {blend.tag && (
                          <span className="font-editorial text-[7px] tracking-[0.22em] uppercase px-1.5 py-0.5 border"
                            style={{ color: 'rgba(0,255,136,0.65)', borderColor: 'rgba(0,255,136,0.18)' }}>
                            {blend.tag}
                          </span>
                        )}
                      </div>
                      <p className="font-editorial text-[8px] tracking-[0.18em] uppercase text-cream-page/25">{blend.origin}</p>
                    </div>
                    <p className="font-body text-xs text-cream-page/40 leading-[1.8] flex-1 max-w-[52ch]">{blend.description}</p>
                    <div className="md:w-28 shrink-0 flex md:flex-col items-center md:items-end gap-3 md:gap-1.5">
                      <IntensityDots level={blend.intensity} />
                      <span className="font-editorial text-[7px] tracking-[0.18em] uppercase text-cream-page/25">{blend.intensityLabel}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <p className="font-editorial text-[8px] tracking-[0.2em] uppercase text-cream-page/18 mt-10 text-right">
            All blends served with natural coconut charcoal · Custom mixes available on request
          </p>
        </div>
      </section>

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
                className="font-editorial text-[10px] tracking-[0.22em] uppercase text-cream-page/60 inline-flex items-center gap-3 border border-cream-page/15 px-6 py-3 hover:bg-cream-page/5 hover:border-cream-page/30 transition-colors duration-400 w-fit"
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

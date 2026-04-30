'use client';

import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CalendarDays, Clock3, Users, ChevronLeft, ChevronRight, Mail, Phone, Check, Utensils, Wind } from 'lucide-react';
import { Calendar } from '@/src/components/ui/calendar';
import { Input } from '@/src/components/ui/input';
import { cn } from '@/src/lib/utils';

// Variant E: Dark Luxury — ink-night + gold.
// Single-column modal with a compact horizontal summary pill row at top.
// Step 0: calendar LEFT + time slots RIGHT — no vertical stack.
// Step 1: venue selector (Restaurant 10 / Shisha Lounge 20) + dynamic guest grid.
// Step 2: contact form.

const timeSlots = ['08:30 AM', '10:00 AM', '12:30 PM', '03:00 PM', '06:30 PM', '08:30 PM'];

const venues = [
  { id: 'restaurant' as const, label: 'Restaurant',    Icon: Utensils, capacity: 10, note: 'Up to 10 guests' },
  { id: 'shisha'     as const, label: 'Shisha Lounge', Icon: Wind,     capacity: 20, note: 'Up to 20 guests' },
];

const steps = [
  { num: '01', label: 'Date & Time' },
  { num: '02', label: 'Venue & Party' },
  { num: '03', label: 'Contact' },
];

export default function VariantE() {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('06:30 PM');
  const [venue, setVenue] = useState<'restaurant' | 'shisha' | null>(null);
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const activeVenue = venues.find(v => v.id === venue);
  const capacity = activeVenue?.capacity ?? 10;

  const shortDate = useMemo(() =>
    date?.toLocaleDateString('en-LK', { weekday: 'short', month: 'short', day: 'numeric' }) ?? '\u2014',
    [date]
  );

  return (
    <div className="flex items-center justify-center p-8 bg-ink-deep min-h-[680px]">
      <div className="w-full max-w-2xl rounded-[32px] bg-ink-night border border-gold-leaf/12 overflow-hidden shadow-[0_32px_120px_rgba(10,5,3,0.8)] relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,146,74,0.07),transparent_50%)] pointer-events-none" />

        {/* ── Top: header ── */}
        <div className="relative px-8 pt-7 pb-5 border-b border-gold-leaf/10">

          {/* Row 1: eyebrow left, step counter right */}
          <div className="flex items-center justify-between mb-5">
            <p className="font-editorial text-[9px] uppercase tracking-[0.36em] text-gold-leaf/80">Reserve A Table</p>
            <p className="font-editorial text-[9px] uppercase tracking-[0.28em] text-cream-page/25">
              Step <span className="text-gold-leaf">{step + 1}</span> of 3
            </p>
          </div>

          {/* Row 2: step rail — full width */}
          <div className="flex items-center mb-5">
            {steps.map((s, i) => (
              <div key={i} className={cn('flex items-center', i < steps.length - 1 ? 'flex-1' : '')}>
                <button
                  onClick={() => i < step && setStep(i)}
                  className={cn('flex items-center gap-2.5 shrink-0', i < step ? 'cursor-pointer' : 'cursor-default pointer-events-none')}
                >
                  <span className={cn(
                    'flex size-6 items-center justify-center rounded-full border transition-all duration-300 font-editorial text-[8px] tracking-wider shrink-0',
                    i < step  ? 'bg-gold-leaf border-transparent text-ink-night' :
                    i === step ? 'border-gold-leaf/80 text-gold-leaf shadow-[0_0_10px_rgba(184,146,74,0.25)]' :
                                 'border-gold-leaf/12 text-cream-page/18'
                  )}>
                    {i < step ? <Check className="size-3" strokeWidth={2.5} /> : s.num}
                  </span>
                  <span className={cn(
                    'font-editorial text-[9px] uppercase tracking-[0.24em] transition-colors duration-300',
                    i === step ? 'text-cream-page/75' : i < step ? 'text-cream-page/30' : 'text-cream-page/15'
                  )}>
                    {s.label}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div className="flex-1 mx-3 h-px relative overflow-hidden bg-gold-leaf/10">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gold-leaf/35"
                      animate={{ width: i < step ? '100%' : '0%' }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Row 3: live summary tokens */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { icon: CalendarDays, key: shortDate,              value: shortDate },
              { icon: Clock3,       key: time,                   value: time },
              { icon: Users,        key: `${venue}-${guests}`,   value: venue ? `${activeVenue?.label} · ${guests} ${guests === 1 ? 'guest' : 'guests'}` : 'Venue & guests' },
            ].map(({ icon: Icon, key, value }) => (
              <span key={key} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gold-leaf/12 bg-gold-leaf/5 font-body text-[11px] text-cream-page/50">
                <Icon className="size-3 text-gold-leaf/70 shrink-0" strokeWidth={1.7} />
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                    {value}
                  </motion.span>
                </AnimatePresence>
              </span>
            ))}
          </div>

        </div>

        {/* ── Step content ── */}
        <div className="relative px-8 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Step 0: calendar + time side by side */}
              {step === 0 && (
                <div className="grid grid-cols-[1fr_160px] gap-5 items-start">
                  {/* Calendar — dark palette via CSS var override */}
                  <div style={{
                    '--color-mahogany': '#ebe0ca',
                    '--color-cream-page': '#16100d',
                    '--color-clay-warm': '#b8924a',
                    '--color-border': 'rgba(184,146,74,0.15)',
                  } as React.CSSProperties}>
                    <Calendar mode="single" defaultMonth={date} selected={date} onSelect={setDate} fromDate={new Date()} />
                  </div>

                  {/* Time slots — vertical list */}
                  <div>
                    <p className="mb-3 font-editorial text-[9px] uppercase tracking-[0.28em] text-cream-page/30">Time</p>
                    <div className="flex flex-col gap-1.5">
                      {timeSlots.map((t) => (
                        <button
                          key={t}
                          onClick={() => setTime(t)}
                          className={cn(
                            'w-full py-2.5 rounded-xl font-body text-[12px] transition-all duration-200 border text-center',
                            t === time
                              ? 'bg-gold-leaf text-ink-night border-transparent shadow-[0_4px_12px_rgba(184,146,74,0.35)]'
                              : 'border-gold-leaf/12 text-cream-page/45 hover:border-gold-leaf/28 hover:text-cream-page/75'
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: venue + dynamic guest grid */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-[26px] leading-tight text-cream-page">Venue & party</h3>
                    <p className="mt-1 font-body text-sm text-cream-page/40">Where would you like to sit?</p>
                  </div>

                  {/* Venue selector */}
                  <div className="grid grid-cols-2 gap-3">
                    {venues.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => {
                          setVenue(v.id);
                          if (guests > v.capacity) setGuests(v.capacity);
                        }}
                        className={cn(
                          'flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-all duration-200',
                          venue === v.id
                            ? 'border-gold-leaf bg-gold-leaf/10 shadow-[0_0_0_1px_rgba(184,146,74,0.4)]'
                            : 'border-gold-leaf/15 hover:border-gold-leaf/30'
                        )}
                      >
                        <v.Icon className={cn('size-5', venue === v.id ? 'text-gold-leaf' : 'text-cream-page/40')} strokeWidth={1.5} />
                        <div>
                          <p className={cn('font-editorial text-[10px] uppercase tracking-[0.26em]', venue === v.id ? 'text-gold-leaf' : 'text-cream-page/70')}>
                            {v.label}
                          </p>
                          <p className="mt-0.5 font-body text-[11px] text-cream-page/35">{v.note}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Guest grid — only shown once venue is picked */}
                  <AnimatePresence>
                    {venue && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="space-y-4"
                      >
                        <p className="font-editorial text-[9px] uppercase tracking-[0.3em] text-cream-page/30">
                          Number of guests <span className="text-gold-leaf/60">(max {capacity})</span>
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {Array.from({ length: capacity }, (_, i) => i + 1).map((n) => (
                            <button
                              key={n}
                              onClick={() => setGuests(n)}
                              className={cn(
                                'size-10 rounded-xl font-display text-base transition-all duration-200 border',
                                n === guests
                                  ? 'bg-gold-leaf text-ink-night border-transparent shadow-[0_6px_18px_rgba(184,146,74,0.3)]'
                                  : 'border-gold-leaf/15 text-cream-page/50 hover:border-gold-leaf/30 hover:text-cream-page/80'
                              )}
                            >
                              {n}
                            </button>
                          ))}
                        </div>
                        <label className="block">
                          <span className="mb-2 block font-editorial text-[9px] uppercase tracking-[0.28em] text-cream-page/30">Special Occasion (optional)</span>
                          <Input value={occasion} onChange={(e) => setOccasion(e.target.value)} className="h-11 rounded-[16px] border-gold-leaf/15 bg-white/5 text-cream-page placeholder:text-cream-page/25" placeholder="Birthday, tea tasting, anniversary..." />
                        </label>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Step 2: contact */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-display text-[26px] leading-tight text-cream-page">Your details</h3>
                    <p className="mt-1 font-body text-sm text-cream-page/40">So we can confirm your reservation.</p>
                  </div>
                  <div className="space-y-3">
                    <label className="block">
                      <span className="mb-2 block font-editorial text-[9px] uppercase tracking-[0.28em] text-cream-page/30">Full Name</span>
                      <Input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} className="h-11 rounded-[16px] border-gold-leaf/15 bg-white/5 text-cream-page placeholder:text-cream-page/25" placeholder="Your name" />
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="block">
                        <span className="mb-2 block font-editorial text-[9px] uppercase tracking-[0.28em] text-cream-page/30">Email</span>
                        <Input type="email" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} className="h-11 rounded-[16px] border-gold-leaf/15 bg-white/5 text-cream-page placeholder:text-cream-page/25" placeholder="you@example.com" />
                      </label>
                      <label className="block">
                        <span className="mb-2 block font-editorial text-[9px] uppercase tracking-[0.28em] text-cream-page/30">Phone</span>
                        <Input type="tel" value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} className="h-11 rounded-[16px] border-gold-leaf/15 bg-white/5 text-cream-page placeholder:text-cream-page/25" placeholder="+94 77 000 0000" />
                      </label>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-gold-leaf/12 bg-white/4 overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-gold-leaf/8">
                      <p className="font-editorial text-[8px] uppercase tracking-[0.32em] text-gold-leaf/60">Submission route</p>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-gold-leaf/8">
                      <a href="mailto:hello@ceylonstories.lk" className="flex items-center gap-2.5 px-4 py-3 group hover:bg-gold-leaf/5 transition-colors">
                        <span className="flex size-7 items-center justify-center rounded-lg border border-gold-leaf/15 bg-gold-leaf/8 shrink-0 group-hover:border-gold-leaf/30 transition-colors">
                          <Mail className="size-3.5 text-gold-leaf" strokeWidth={1.6} />
                        </span>
                        <div className="min-w-0">
                          <p className="font-editorial text-[8px] uppercase tracking-[0.24em] text-cream-page/30">Email</p>
                          <p className="font-body text-[11px] text-cream-page/60 truncate group-hover:text-cream-page/80 transition-colors">hello@ceylonstories.lk</p>
                        </div>
                      </a>
                      <a href="tel:+94770000000" className="flex items-center gap-2.5 px-4 py-3 group hover:bg-gold-leaf/5 transition-colors">
                        <span className="flex size-7 items-center justify-center rounded-lg border border-gold-leaf/15 bg-gold-leaf/8 shrink-0 group-hover:border-gold-leaf/30 transition-colors">
                          <Phone className="size-3.5 text-gold-leaf" strokeWidth={1.6} />
                        </span>
                        <div>
                          <p className="font-editorial text-[8px] uppercase tracking-[0.24em] text-cream-page/30">Phone</p>
                          <p className="font-body text-[11px] text-cream-page/60 group-hover:text-cream-page/80 transition-colors">+94 (77) 000 0000</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Footer nav ── */}
        <div className="relative px-8 pb-8 flex items-center justify-between">
          {step > 0 ? (
            <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-1.5 font-editorial text-[9px] uppercase tracking-[0.26em] text-cream-page/30 hover:text-cream-page/60 transition-colors">
              <ChevronLeft className="size-3.5" strokeWidth={2} /> Back
            </button>
          ) : <div />}
          <div className="flex items-center gap-3">
            <p className="font-body text-xs text-cream-page/22 hidden sm:block">Confirmed within 15 mins.</p>
            {step < 2 ? (
              <button onClick={() => setStep(s => s + 1)} className="rounded-full bg-gold-leaf px-6 py-2.5 font-editorial text-[9px] uppercase tracking-[0.28em] text-ink-night shadow-[0_8px_24px_rgba(184,146,74,0.3)] hover:-translate-y-0.5 transition-transform">
                Continue <ChevronRight className="size-3 ml-0.5 inline" strokeWidth={2} />
              </button>
            ) : (
              <button className="rounded-full bg-gold-leaf px-6 py-2.5 font-editorial text-[9px] uppercase tracking-[0.3em] text-ink-night shadow-[0_14px_36px_rgba(184,146,74,0.4)] hover:-translate-y-0.5 transition-transform">
                Send Request
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

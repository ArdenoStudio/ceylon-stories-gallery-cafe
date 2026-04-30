'use client';

import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CalendarDays, Clock3, Users, Mail, Phone, Minus, Plus, ChevronDown } from 'lucide-react';
import { Calendar } from '@/src/components/ui/calendar';
import { Input } from '@/src/components/ui/input';
import { cn } from '@/src/lib/utils';

// Variant F: C × D synthesis
// Structure from C: left live-summary panel, all sections always present, free navigation.
// Voice from D: each section opens with a large conversational question heading.
// Guest count: ± stepper from C. Time: pill chips. No linear lock.

const timeSlots = ['08:30 AM', '10:00 AM', '12:30 PM', '03:00 PM', '06:30 PM', '08:30 PM'];

const sections = [
  { idx: 0 as const, question: 'When would you\nlike to visit?',    label: '01 — Date & Time' },
  { idx: 1 as const, question: "How many guests\nare joining you?", label: '02 — Party Size'  },
  { idx: 2 as const, question: 'How do we\nreach you?',             label: '03 — Your Details' },
];

export default function VariantF() {
  const [open, setOpen] = useState<0 | 1 | 2>(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('06:30 PM');
  const [guests, setGuests] = useState(2);
  const [form, setForm] = useState({ name: '', email: '', phone: '', occasion: '' });

  const shortDate = useMemo(() =>
    date?.toLocaleDateString('en-LK', { month: 'short', day: 'numeric' }) ?? '\u2014',
    [date]
  );
  const longDate = useMemo(() =>
    date?.toLocaleDateString('en-LK', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) ?? 'No date selected',
    [date]
  );

  const summaries = [
    `${shortDate} · ${time}`,
    `${guests === 8 ? '8+' : guests} ${guests === 1 ? 'guest' : 'guests'}${form.occasion ? ' · ' + form.occasion : ''}`,
    form.name || 'Name, email, phone',
  ];

  return (
    <div className="flex items-center justify-center p-8 bg-mahogany/50 min-h-[680px]">
      <div className="w-full max-w-5xl rounded-[32px] bg-cream-page overflow-hidden shadow-[0_32px_120px_rgba(42,24,16,0.36)] grid lg:grid-cols-[320px_1fr] relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,146,74,0.12),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(139,58,31,0.07),transparent_38%)] pointer-events-none" />

        {/* ── Left: persistent live summary ── */}
        <div className="relative px-8 py-10 border-b border-mahogany/10 lg:border-b-0 lg:border-r flex flex-col justify-between">
          <div>
            <p className="font-editorial text-[9px] uppercase tracking-[0.34em] text-clay-warm">Reserve A Table</p>
            <h2 className="mt-4 font-display text-[42px] leading-[0.9] tracking-[-0.03em] text-mahogany">
              Secure your seat.
            </h2>
            <p className="mt-5 font-body text-sm leading-[1.85] text-mahogany/55">
              Open any section at any time. Submit when you&apos;re ready.
            </p>
          </div>

          <div className="mt-10 space-y-2.5">
            {/* Date + time card */}
            <div className="rounded-2xl border border-mahogany/10 bg-white/50 px-4 py-4">
              <div className="flex gap-3 items-start">
                <CalendarDays className="size-4 mt-0.5 text-clay-warm shrink-0" strokeWidth={1.7} />
                <div className="min-w-0">
                  <p className="font-editorial text-[9px] uppercase tracking-[0.26em] text-mahogany/40">Date & Time</p>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={`${shortDate}-${time}`} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }} transition={{ duration: 0.16 }}>
                      <p className="mt-1.5 font-display text-xl leading-none text-mahogany">{shortDate}</p>
                      <p className="mt-1 font-body text-xs text-mahogany/50 truncate">{longDate}</p>
                      <p className="mt-0.5 font-body text-xs text-mahogany/60 flex items-center gap-1.5">
                        <Clock3 className="size-3 text-clay-warm" strokeWidth={1.7} /> {time}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Guests card */}
            <div className="rounded-2xl border border-mahogany/10 bg-white/50 px-4 py-4">
              <div className="flex gap-3 items-center">
                <Users className="size-4 text-clay-warm shrink-0" strokeWidth={1.7} />
                <div>
                  <p className="font-editorial text-[9px] uppercase tracking-[0.26em] text-mahogany/40">Party Size</p>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p key={guests} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }} transition={{ duration: 0.15 }} className="mt-1.5 font-body text-sm text-mahogany">
                      {guests === 8 ? '8+' : guests} {guests === 1 ? 'person' : 'people'}
                      {form.occasion ? <span className="text-mahogany/50"> · {form.occasion}</span> : null}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Submit footer */}
            <div className="rounded-2xl border border-mahogany/8 bg-white/40 p-4 space-y-3 mt-1">
              <div className="space-y-1.5 text-[12px] text-mahogany/50">
                <p className="flex items-center gap-2"><Mail className="size-3.5 text-clay-warm" strokeWidth={1.7} /> hello@ceylonstories.lk</p>
                <p className="flex items-center gap-2"><Phone className="size-3.5 text-clay-warm" strokeWidth={1.7} /> +94 (77) 000 0000</p>
              </div>
              <div className="flex items-center justify-between gap-3 pt-1">
                <p className="font-body text-[11px] text-mahogany/35">Confirmed within 24 hrs.</p>
                <button className="rounded-full bg-mahogany px-5 py-2.5 font-editorial text-[9px] uppercase tracking-[0.3em] text-cream-page shadow-[0_10px_28px_rgba(42,24,16,0.22)] hover:-translate-y-0.5 transition-transform">
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: conversational accordion ── */}
        <div className="flex flex-col divide-y divide-mahogany/8">
          {sections.map((section) => {
            const isOpen = open === section.idx;

            return (
              <div key={section.idx} className={cn('transition-colors duration-300', isOpen ? 'bg-white/15' : 'hover:bg-white/8')}>

                {/* Section tab */}
                <button
                  onClick={() => setOpen(section.idx)}
                  className="w-full flex items-center justify-between px-8 py-5 text-left"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="font-editorial text-[9px] uppercase tracking-[0.3em] text-clay-warm shrink-0">
                      {section.label}
                    </span>
                    {!isOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="font-body text-sm text-mahogany/50 italic truncate"
                      >
                        {summaries[section.idx]}
                      </motion.span>
                    )}
                  </div>
                  <ChevronDown
                    className={cn('size-4 text-mahogany/25 transition-transform duration-300 shrink-0 ml-4', isOpen ? 'rotate-180' : '')}
                    strokeWidth={1.6}
                  />
                </button>

                {/* Section body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8">
                        {/* Large conversational question heading (from D) */}
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.28, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                          className="font-display text-[32px] leading-[1.0] tracking-[-0.025em] text-mahogany mb-6 whitespace-pre-line"
                        >
                          {section.question}
                        </motion.h3>

                        {/* Section content */}
                        {section.idx === 0 && (
                          <div className="space-y-5">
                            <Calendar mode="single" defaultMonth={date} selected={date} onSelect={setDate} fromDate={new Date()} />
                            <div>
                              <p className="mb-3 font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/40">Arrival time</p>
                              <div className="flex flex-wrap gap-2">
                                {timeSlots.map((t) => (
                                  <button
                                    key={t}
                                    onClick={() => setTime(t)}
                                    className={cn(
                                      'px-4 py-2 rounded-full font-body text-[13px] transition-all duration-200 border',
                                      t === time
                                        ? 'bg-mahogany text-cream-page border-transparent shadow-[0_6px_16px_rgba(42,24,16,0.2)]'
                                        : 'bg-white/70 border-mahogany/12 text-mahogany/65 hover:border-mahogany/25 hover:text-mahogany'
                                    )}
                                  >
                                    {t}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <button onClick={() => setOpen(1)} className="text-[9px] font-editorial uppercase tracking-[0.3em] text-clay-warm hover:text-mahogany transition-colors flex items-center gap-1.5">
                              Next: party size <ChevronDown className="size-3 -rotate-90" strokeWidth={2} />
                            </button>
                          </div>
                        )}

                        {section.idx === 1 && (
                          <div className="space-y-6">
                            <div>
                              <p className="mb-4 font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/40">Number of guests</p>
                              <div className="flex items-center gap-5">
                                <button
                                  onClick={() => setGuests(g => Math.max(1, g - 1))}
                                  className="flex size-12 items-center justify-center rounded-xl border border-mahogany/15 bg-white/70 text-mahogany hover:border-mahogany/30 transition-colors"
                                >
                                  <Minus className="size-4" strokeWidth={2} />
                                </button>
                                <AnimatePresence mode="wait" initial={false}>
                                  <motion.span
                                    key={guests}
                                    initial={{ opacity: 0, scale: 0.75 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.75 }}
                                    transition={{ duration: 0.14 }}
                                    className="font-display text-[56px] leading-none text-mahogany w-20 text-center tabular-nums"
                                  >
                                    {guests === 8 ? '8+' : guests}
                                  </motion.span>
                                </AnimatePresence>
                                <button
                                  onClick={() => setGuests(g => Math.min(8, g + 1))}
                                  className="flex size-12 items-center justify-center rounded-xl border border-mahogany/15 bg-white/70 text-mahogany hover:border-mahogany/30 transition-colors"
                                >
                                  <Plus className="size-4" strokeWidth={2} />
                                </button>
                                <span className="font-body text-sm text-mahogany/45">{guests === 1 ? 'person' : 'people'}</span>
                              </div>
                            </div>
                            <label className="block">
                              <span className="mb-2 block font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/40">Special occasion (optional)</span>
                              <Input
                                value={form.occasion}
                                onChange={(e) => setForm(f => ({ ...f, occasion: e.target.value }))}
                                className="h-12 rounded-[18px] border-mahogany/12 bg-white/70"
                                placeholder="Birthday, anniversary, tea tasting..."
                              />
                            </label>
                            <button onClick={() => setOpen(2)} className="text-[9px] font-editorial uppercase tracking-[0.3em] text-clay-warm hover:text-mahogany transition-colors flex items-center gap-1.5">
                              Next: your details <ChevronDown className="size-3 -rotate-90" strokeWidth={2} />
                            </button>
                          </div>
                        )}

                        {section.idx === 2 && (
                          <div className="space-y-4">
                            <label className="block">
                              <span className="mb-2 block font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/40">Full Name</span>
                              <Input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} className="h-12 rounded-[18px] border-mahogany/12 bg-white/70" placeholder="Your name" />
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                              <label className="block">
                                <span className="mb-2 block font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/40">Email</span>
                                <Input type="email" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} className="h-12 rounded-[18px] border-mahogany/12 bg-white/70" placeholder="you@example.com" />
                              </label>
                              <label className="block">
                                <span className="mb-2 block font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/40">Phone</span>
                                <Input type="tel" value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} className="h-12 rounded-[18px] border-mahogany/12 bg-white/70" placeholder="+94 77 000 0000" />
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

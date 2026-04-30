'use client';

import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CalendarDays, Clock3, Users, ChevronRight, Mail, Phone, Minus, Plus } from 'lucide-react';
import { Calendar } from '@/src/components/ui/calendar';
import { Input } from '@/src/components/ui/input';
import { cn } from '@/src/lib/utils';

// Variant C: Tab-Accordion Compact — all three steps visible as collapsible sections.
// Users can see the full flow at once and jump to any section.
// Great mobile UX: no lateral scrolling, just vertical accordion.

const timeSlots = ['08:30 AM', '10:00 AM', '12:30 PM', '03:00 PM', '06:30 PM', '08:30 PM'];

export default function VariantC() {
  const [openStep, setOpenStep] = useState<0 | 1 | 2>(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('06:30 PM');
  const [guests, setGuests] = useState(2);
  const [form, setForm] = useState({ name: '', email: '', phone: '', occasion: '' });

  const shortDate = useMemo(() =>
    date?.toLocaleDateString('en-LK', { month: 'short', day: 'numeric' }) ?? '\u2014',
    [date]
  );

  const sections = [
    {
      idx: 0 as const,
      label: '01 \u2014 Date & Time',
      summary: `${shortDate} \u00b7 ${time}`,
    },
    {
      idx: 1 as const,
      label: '02 \u2014 Party Size',
      summary: `${guests === 8 ? '8+' : guests} ${guests === 1 ? 'guest' : 'guests'}`,
    },
    {
      idx: 2 as const,
      label: '03 \u2014 Your Details',
      summary: form.name || 'Name, email, phone',
    },
  ];

  return (
    <div className="flex items-center justify-center p-8 bg-mahogany/50 min-h-[680px]">
      <div className="w-full max-w-4xl rounded-[32px] bg-cream-page overflow-hidden shadow-[0_32px_120px_rgba(42,24,16,0.36)] grid lg:grid-cols-[340px_1fr]">

        {/* Left: summary + brand */}
        <div className="relative px-8 py-10 border-b border-mahogany/10 lg:border-b-0 lg:border-r bg-[radial-gradient(circle_at_bottom_right,rgba(139,58,31,0.09),transparent_50%)]">
          <p className="font-editorial text-[9px] uppercase tracking-[0.34em] text-clay-warm">Reserve A Table</p>
          <h2 className="mt-4 font-display text-[44px] leading-[0.88] tracking-[-0.03em] text-mahogany">
            Secure your seat.
          </h2>
          <p className="mt-5 font-body text-sm leading-[1.85] text-mahogany/55">
            Fill in the three sections at your own pace. Submit when ready.
          </p>

          {/* Live summary cards */}
          <div className="mt-10 space-y-2.5">
            <div className="rounded-2xl border border-mahogany/10 bg-white/50 p-4">
              <div className="flex items-center gap-3">
                <CalendarDays className="size-4 text-clay-warm shrink-0" strokeWidth={1.7} />
                <div>
                  <p className="font-editorial text-[9px] uppercase tracking-[0.26em] text-mahogany/40">Date & Time</p>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p key={`${shortDate}-${time}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="mt-1 font-body text-sm text-mahogany">
                      {shortDate} &middot; {time}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              <div className="rounded-2xl border border-mahogany/10 bg-white/50 p-4">
                <div className="flex items-center gap-3">
                  <Users className="size-4 text-clay-warm shrink-0" strokeWidth={1.7} />
                  <div>
                    <p className="font-editorial text-[9px] uppercase tracking-[0.26em] text-mahogany/40">Guests</p>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.p key={guests} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="mt-1 font-body text-sm text-mahogany">
                        {guests === 8 ? '8+' : guests} {guests === 1 ? 'person' : 'people'}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: accordion steps */}
        <div className="flex flex-col">
          {sections.map((section) => (
            <div key={section.idx} className={cn('border-b border-mahogany/8 last:border-b-0', openStep === section.idx ? 'bg-white/20' : '')}>
              {/* Section header / tab */}
              <button
                onClick={() => setOpenStep(section.idx)}
                className="w-full flex items-center justify-between px-8 py-5 text-left hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="font-editorial text-[9px] uppercase tracking-[0.3em] text-mahogany/40">{section.label}</span>
                  {openStep !== section.idx && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-body text-sm text-mahogany/60 italic"
                    >
                      {section.summary}
                    </motion.span>
                  )}
                </div>
                <ChevronRight className={cn('size-4 text-mahogany/30 transition-transform duration-300', openStep === section.idx ? 'rotate-90' : '')} strokeWidth={1.6} />
              </button>

              {/* Section content */}
              <AnimatePresence initial={false}>
                {openStep === section.idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-7 space-y-5">
                      {section.idx === 0 && (
                        <>
                          <Calendar mode="single" defaultMonth={date} selected={date} onSelect={setDate} fromDate={new Date()} />
                          <div>
                            <p className="mb-3 font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/40">Arrival time</p>
                            <div className="flex flex-wrap gap-2">
                              {timeSlots.map((t) => (
                                <button key={t} onClick={() => setTime(t)} className={cn('px-4 py-2 rounded-full font-body text-[13px] transition-all', t === time ? 'bg-mahogany text-cream-page' : 'bg-white/70 border border-mahogany/12 text-mahogany/65 hover:border-mahogany/25')}>
                                  {t}
                                </button>
                              ))}
                            </div>
                          </div>
                          <button onClick={() => setOpenStep(1)} className="text-[9px] font-editorial uppercase tracking-[0.3em] text-clay-warm hover:text-mahogany transition-colors flex items-center gap-1.5">
                            Next: party size <ChevronRight className="size-3" strokeWidth={2} />
                          </button>
                        </>
                      )}
                      {section.idx === 1 && (
                        <>
                          <div>
                            <p className="mb-4 font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/40">Number of guests</p>
                            <div className="flex items-center gap-5">
                              <button
                                onClick={() => setGuests(g => Math.max(1, g - 1))}
                                className="flex size-11 items-center justify-center rounded-xl border border-mahogany/15 bg-white/70 text-mahogany hover:border-mahogany/30 transition-colors"
                              >
                                <Minus className="size-4" strokeWidth={2} />
                              </button>
                              <AnimatePresence mode="wait" initial={false}>
                                <motion.span key={guests} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.15 }} className="font-display text-5xl text-mahogany w-16 text-center">
                                  {guests === 8 ? '8+' : guests}
                                </motion.span>
                              </AnimatePresence>
                              <button
                                onClick={() => setGuests(g => Math.min(8, g + 1))}
                                className="flex size-11 items-center justify-center rounded-xl border border-mahogany/15 bg-white/70 text-mahogany hover:border-mahogany/30 transition-colors"
                              >
                                <Plus className="size-4" strokeWidth={2} />
                              </button>
                              <span className="font-body text-sm text-mahogany/50">{guests === 1 ? 'person' : 'people'}</span>
                            </div>
                          </div>
                          <label className="block">
                            <span className="mb-2 block font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/40">Special occasion (optional)</span>
                            <Input value={form.occasion} onChange={(e) => setForm(f => ({ ...f, occasion: e.target.value }))} className="h-12 rounded-[18px] border-mahogany/12 bg-white/70" placeholder="Birthday, anniversary, tea tasting..." />
                          </label>
                          <button onClick={() => setOpenStep(2)} className="text-[9px] font-editorial uppercase tracking-[0.3em] text-clay-warm hover:text-mahogany transition-colors flex items-center gap-1.5">
                            Next: your details <ChevronRight className="size-3" strokeWidth={2} />
                          </button>
                        </>
                      )}
                      {section.idx === 2 && (
                        <>
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
                          <div className="rounded-2xl border border-mahogany/8 bg-white/40 p-4 space-y-1.5 text-[12px] text-mahogany/50">
                            <p className="flex items-center gap-2"><Mail className="size-3.5 text-clay-warm" strokeWidth={1.7} /> Sends to hello@ceylonstories.lk</p>
                            <p className="flex items-center gap-2"><Phone className="size-3.5 text-clay-warm" strokeWidth={1.7} /> +94 (77) 000 0000</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="font-body text-xs text-mahogany/35">Confirmed within 24 hours.</p>
                            <button className="h-auto rounded-full bg-mahogany px-7 py-3 font-editorial text-[9px] uppercase tracking-[0.3em] text-cream-page shadow-[0_14px_36px_rgba(42,24,16,0.22)] hover:-translate-y-0.5 transition-transform">
                              Send Request
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

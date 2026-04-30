'use client';

import type { FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Mail,
  Phone,
  Users,
  Utensils,
  Wind,
  X,
} from 'lucide-react';

import { Calendar } from '@/src/components/ui/calendar';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { cn } from '@/src/lib/utils';

interface ReservationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const timeSlots = ['08:30 AM', '10:00 AM', '12:30 PM', '03:00 PM', '06:30 PM', '08:30 PM'];

const venues = [
  { id: 'restaurant' as const, label: 'Restaurant',   Icon: Utensils, capacity: 10, note: 'Up to 10 guests' },
  { id: 'shisha'     as const, label: 'Shisha Lounge', Icon: Wind,     capacity: 20, note: 'Up to 20 guests' },
];

const steps = [
  { num: '01', label: 'Date & Time' },
  { num: '02', label: 'Venue & Party' },
  { num: '03', label: 'Contact' },
];

export default function ReservationModal({ open, onOpenChange }: ReservationModalProps) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('06:30 PM');
  const [venue, setVenue] = useState<'restaurant' | 'shisha' | null>(null);
  const [guests, setGuests] = useState(2);
  const [form, setForm] = useState({ name: '', email: '', phone: '', occasion: '' });

  const activeVenue = venues.find(v => v.id === venue);
  const capacity = activeVenue?.capacity ?? 10;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') onOpenChange(false); };
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    lenis?.stop();

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflowY = 'scroll';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      window.scrollTo(0, scrollY);
      lenis?.start();
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) {
      setStep(0);
      setVenue(null);
      setGuests(2);
      setForm({ name: '', email: '', phone: '', occasion: '' });
    }
  }, [open]);

  const shortDate = useMemo(() =>
    date?.toLocaleDateString('en-LK', { weekday: 'short', month: 'short', day: 'numeric' }) ?? '\u2014',
    [date]
  );
  const longDate = useMemo(() =>
    date?.toLocaleDateString('en-LK', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) ?? '',
    [date]
  );

  const reservationSummary = useMemo(() => [
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Email: ${form.email}`,
    `Date: ${longDate}`,
    `Time: ${timeSlots.find(t => t === time) ?? time}`,
    `Venue: ${activeVenue?.label ?? 'Not specified'}`,
    `Party size: ${guests}`,
    `Occasion: ${form.occasion || 'None specified'}`,
  ].join('\n'), [form, longDate, time, activeVenue, guests]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('Reservation request — Ceylon Stories');
    const body = encodeURIComponent(`Hello Ceylon Stories,\n\nI'd like to request a reservation.\n\n${reservationSummary}\n\nThank you.`);
    window.location.href = `mailto:hello@ceylonstories.lk?subject=${subject}&body=${body}`;
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-end justify-center bg-mahogany/55 p-3 backdrop-blur-[6px] overscroll-none sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            className="relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-mahogany/10 bg-cream-page text-mahogany shadow-[0_32px_120px_rgba(42,24,16,0.32)]"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,146,74,0.1),transparent_50%)] pointer-events-none" />

            {/* Close */}
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 z-20 inline-flex size-9 items-center justify-center rounded-full border border-mahogany/10 bg-white/70 text-mahogany transition-colors hover:bg-white sm:right-5 sm:top-5"
              aria-label="Close"
            >
              <X className="size-4" strokeWidth={1.8} />
            </button>

            <div data-lenis-prevent className="modal-scroll relative max-h-[92vh] overflow-y-auto overscroll-contain">

              {/* ── Header ── */}
              <div className="px-7 pt-7 pb-5 border-b border-mahogany/8">

                {/* Row 1: eyebrow + step counter */}
                <div className="flex items-center justify-between mb-4">
                  <p className="font-editorial text-[9px] uppercase tracking-[0.36em] text-clay-warm">Reserve A Table</p>
                  <p className="font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/35">
                    Step <span className="text-clay-warm">{step + 1}</span> of 3
                  </p>
                </div>

                {/* Row 2: step rail */}
                <div className="flex items-center mb-4">
                  {steps.map((s, i) => (
                    <div key={i} className={cn('flex items-center', i < steps.length - 1 ? 'flex-1' : '')}>
                      <button
                        type="button"
                        onClick={() => i < step && setStep(i)}
                        className={cn('flex items-center gap-2 shrink-0', i < step ? 'cursor-pointer' : 'cursor-default pointer-events-none')}
                      >
                        <span className={cn(
                          'flex size-6 items-center justify-center rounded-full border transition-all duration-300 font-editorial text-[8px] tracking-wider shrink-0',
                          i < step  ? 'bg-mahogany border-transparent text-cream-page' :
                          i === step ? 'border-clay-warm text-clay-warm shadow-[0_0_8px_rgba(181,85,46,0.2)]' :
                                       'border-mahogany/15 text-mahogany/25'
                        )}>
                          {i < step ? <Check className="size-3" strokeWidth={2.5} /> : s.num}
                        </span>
                        <span className={cn(
                          'font-editorial text-[9px] uppercase tracking-[0.24em] transition-colors duration-300 hidden sm:block',
                          i === step ? 'text-mahogany/80' : i < step ? 'text-mahogany/35' : 'text-mahogany/18'
                        )}>
                          {s.label}
                        </span>
                      </button>
                      {i < steps.length - 1 && (
                        <div className="flex-1 mx-3 h-px relative overflow-hidden bg-mahogany/10">
                          <motion.div
                            className="absolute inset-y-0 left-0 bg-mahogany/30"
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
                    { Icon: CalendarDays, key: shortDate,            value: shortDate },
                    { Icon: Clock3,       key: time,                  value: time },
                    { Icon: Users,        key: `${venue}-${guests}`,  value: venue ? `${activeVenue?.label} · ${guests} ${guests === 1 ? 'guest' : 'guests'}` : 'Venue & guests' },
                  ].map(({ Icon, key, value }) => (
                    <span key={key} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-mahogany/10 bg-white/50 font-body text-[11px] text-mahogany/55">
                      <Icon className="size-3 text-clay-warm/80 shrink-0" strokeWidth={1.7} />
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
              <form onSubmit={handleSubmit}>
                <div className="px-7 py-6">
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
                        <div className="grid grid-cols-[1fr_152px] gap-5 items-start">
                          <Calendar
                            mode="single"
                            defaultMonth={date}
                            selected={date}
                            onSelect={setDate}
                            fromDate={new Date()}
                          />
                          <div>
                            <p className="mb-3 font-editorial text-[9px] uppercase tracking-[0.3em] text-mahogany/40">Time</p>
                            <div className="flex flex-col gap-1.5">
                              {timeSlots.map((t) => (
                                <button
                                  key={t}
                                  type="button"
                                  onClick={() => setTime(t)}
                                  className={cn(
                                    'w-full py-2.5 rounded-xl font-body text-[12px] transition-all duration-200 border text-center',
                                    t === time
                                      ? 'bg-mahogany text-cream-page border-transparent shadow-[0_4px_14px_rgba(42,24,16,0.18)]'
                                      : 'bg-white/70 border-mahogany/12 text-mahogany/60 hover:border-mahogany/25 hover:text-mahogany'
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
                            <h3 className="font-display text-[26px] leading-tight text-mahogany">Venue & party</h3>
                            <p className="mt-1 font-body text-sm text-mahogany/50">Where would you like to sit?</p>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            {venues.map((v) => (
                              <button
                                key={v.id}
                                type="button"
                                onClick={() => {
                                  setVenue(v.id);
                                  if (guests > v.capacity) setGuests(v.capacity);
                                }}
                                className={cn(
                                  'flex flex-col items-start gap-2.5 rounded-2xl border p-4 text-left transition-all duration-200',
                                  venue === v.id
                                    ? 'border-mahogany bg-mahogany/5 shadow-[0_0_0_1px_rgba(42,24,16,0.12)]'
                                    : 'border-mahogany/12 bg-white/50 hover:border-mahogany/25'
                                )}
                              >
                                <v.Icon className={cn('size-5', venue === v.id ? 'text-clay-warm' : 'text-mahogany/35')} strokeWidth={1.5} />
                                <div>
                                  <p className={cn('font-editorial text-[10px] uppercase tracking-[0.26em]', venue === v.id ? 'text-mahogany' : 'text-mahogany/60')}>
                                    {v.label}
                                  </p>
                                  <p className="mt-0.5 font-body text-[11px] text-mahogany/35">{v.note}</p>
                                </div>
                              </button>
                            ))}
                          </div>

                          <AnimatePresence>
                            {venue && (
                              <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                transition={{ duration: 0.22, ease: 'easeOut' }}
                                className="space-y-4"
                              >
                                <p className="font-editorial text-[9px] uppercase tracking-[0.3em] text-mahogany/40">
                                  Guests <span className="text-clay-warm/60">(max {capacity})</span>
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {Array.from({ length: capacity }, (_, i) => i + 1).map((n) => (
                                    <button
                                      key={n}
                                      type="button"
                                      onClick={() => setGuests(n)}
                                      className={cn(
                                        'size-10 rounded-xl font-display text-base transition-all duration-200 border',
                                        n === guests
                                          ? 'bg-mahogany text-cream-page border-transparent shadow-[0_6px_18px_rgba(42,24,16,0.2)]'
                                          : 'bg-white/70 border-mahogany/12 text-mahogany/55 hover:border-mahogany/25 hover:text-mahogany'
                                      )}
                                    >
                                      {n}
                                    </button>
                                  ))}
                                </div>
                                <label className="block">
                                  <span className="mb-2 block font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/40">Special Occasion (optional)</span>
                                  <Input
                                    value={form.occasion}
                                    onChange={e => setForm(f => ({ ...f, occasion: e.target.value }))}
                                    className="h-11 rounded-[16px] border-mahogany/12 bg-white/70"
                                    placeholder="Birthday, tea tasting, anniversary..."
                                  />
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
                            <h3 className="font-display text-[26px] leading-tight text-mahogany">Your details</h3>
                            <p className="mt-1 font-body text-sm text-mahogany/50">So we can confirm your reservation.</p>
                          </div>
                          <div className="space-y-3">
                            <label className="block">
                              <span className="mb-2 block font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/40">Full Name</span>
                              <Input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="h-11 rounded-[16px] border-mahogany/12 bg-white/70" placeholder="Your name" />
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                              <label className="block">
                                <span className="mb-2 block font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/40">Email</span>
                                <Input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="h-11 rounded-[16px] border-mahogany/12 bg-white/70" placeholder="you@example.com" />
                              </label>
                              <label className="block">
                                <span className="mb-2 block font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/40">Phone</span>
                                <Input required type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="h-11 rounded-[16px] border-mahogany/12 bg-white/70" placeholder="+94 77 000 0000" />
                              </label>
                            </div>
                          </div>

                          {/* Submission route card */}
                          <div className="rounded-2xl border border-mahogany/10 bg-white/40 overflow-hidden">
                            <div className="px-4 py-2.5 border-b border-mahogany/8">
                              <p className="font-editorial text-[8px] uppercase tracking-[0.32em] text-clay-warm/80">Submission route</p>
                            </div>
                            <div className="grid grid-cols-2 divide-x divide-mahogany/8">
                              <a href="mailto:hello@ceylonstories.lk" className="flex items-center gap-2.5 px-4 py-3 group hover:bg-mahogany/3 transition-colors">
                                <span className="flex size-7 items-center justify-center rounded-lg border border-mahogany/10 bg-mahogany/5 shrink-0 group-hover:border-mahogany/20 transition-colors">
                                  <Mail className="size-3.5 text-clay-warm" strokeWidth={1.6} />
                                </span>
                                <div className="min-w-0">
                                  <p className="font-editorial text-[8px] uppercase tracking-[0.24em] text-mahogany/30">Email</p>
                                  <p className="font-body text-[11px] text-mahogany/55 truncate group-hover:text-mahogany/80 transition-colors">hello@ceylonstories.lk</p>
                                </div>
                              </a>
                              <a href="tel:+94770000000" className="flex items-center gap-2.5 px-4 py-3 group hover:bg-mahogany/3 transition-colors">
                                <span className="flex size-7 items-center justify-center rounded-lg border border-mahogany/10 bg-mahogany/5 shrink-0 group-hover:border-mahogany/20 transition-colors">
                                  <Phone className="size-3.5 text-clay-warm" strokeWidth={1.6} />
                                </span>
                                <div>
                                  <p className="font-editorial text-[8px] uppercase tracking-[0.24em] text-mahogany/30">Phone</p>
                                  <p className="font-body text-[11px] text-mahogany/55 group-hover:text-mahogany/80 transition-colors">+94 (77) 000 0000</p>
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
                <div className="sticky bottom-0 px-7 pb-7 pt-4 bg-cream-page border-t border-mahogany/8 flex items-center justify-between">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep(s => s - 1)}
                      className="flex items-center gap-1.5 font-editorial text-[9px] uppercase tracking-[0.26em] text-mahogany/40 hover:text-mahogany transition-colors"
                    >
                      <ChevronLeft className="size-3.5" strokeWidth={2} /> Back
                    </button>
                  ) : (
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="h-auto rounded-full border-mahogany/12 px-5 py-2.5 font-editorial text-[9px] uppercase tracking-[0.26em]">
                      Cancel
                    </Button>
                  )}
                  <div className="flex items-center gap-3">
                    <p className="font-body text-xs text-mahogany/30 hidden sm:block">Confirmed within 15 mins.</p>
                    {step < 2 ? (
                      <Button
                        type="button"
                        onClick={() => setStep(s => s + 1)}
                        disabled={step === 1 && !venue}
                        className="h-auto rounded-full bg-mahogany px-6 py-2.5 font-editorial text-[9px] uppercase tracking-[0.28em] text-cream-page disabled:opacity-40"
                      >
                        Continue <ChevronRight className="size-3.5 ml-1" strokeWidth={2} />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="h-auto rounded-full bg-mahogany px-6 py-2.5 font-editorial text-[9px] uppercase tracking-[0.3em] text-cream-page shadow-[0_12px_32px_rgba(42,24,16,0.22)] hover:-translate-y-0.5 transition-transform"
                      >
                        Send Request
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

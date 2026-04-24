'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  CalendarDays,
  ChevronDown,
  Clock3,
  Mail,
  Phone,
  Sparkles,
  Users,
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

const partySizes = [
  '1 person',
  '2 people',
  '3 people',
  '4 people',
  '5 people',
  '6 people',
  '7 people',
  '8+ people',
];
const timeSlots = ['08:30 AM', '10:00 AM', '12:30 PM', '03:00 PM', '06:30 PM', '08:30 PM'];

const fieldClassName =
  'w-full rounded-[18px] border border-mahogany/10 bg-white/70 px-4 py-3 font-body text-sm text-mahogany outline-none transition-colors placeholder:text-mahogany/35 focus:border-mahogany/25 focus:bg-white focus-visible:ring-1 focus-visible:ring-gold-leaf/50';

const selectClassName = cn(fieldClassName, 'appearance-none cursor-pointer pr-10');

function AnimatedValue({ value, className }: { value: string; className?: string }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className={cn('block', className)}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

export default function ReservationModal({
  open,
  onOpenChange,
}: ReservationModalProps) {
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [partySize, setPartySize] = useState('2 people');
  const [timeSlot, setTimeSlot] = useState('06:30 PM');
  const [dateError, setDateError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    occasion: '',
    notes: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    };

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
      setSubmitted(false);
      setDateError(false);
    }
  }, [open]);

  const selectedDateLabel = useMemo(() => {
    if (!date) return 'Choose your preferred date';
    return date.toLocaleDateString('en-LK', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, [date]);

  const shortDateLabel = useMemo(() => {
    if (!date) return 'Pending';
    return date.toLocaleDateString('en-LK', { month: 'short', day: 'numeric' });
  }, [date]);

  const phoneForSummary = form.phone.startsWith('+') ? form.phone : form.phone ? `+94 ${form.phone}` : '';

  const reservationSummary = useMemo(
    () =>
      [
        `Name: ${form.name}`,
        `Phone: ${phoneForSummary}`,
        `Email: ${form.email}`,
        `Date: ${selectedDateLabel}`,
        `Time: ${timeSlot}`,
        `Party size: ${partySize}`,
        `Occasion: ${form.occasion || 'None specified'}`,
        `Notes: ${form.notes || 'None'}`,
      ].join('\n'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form, partySize, selectedDateLabel, timeSlot]
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!date) {
      setDateError(true);
      return;
    }

    setDateError(false);
    setSubmitted(true);

    const subject = encodeURIComponent('Reservation request - Ceylon Stories');
    const body = encodeURIComponent(
      `Hello Ceylon Stories,\n\nI'd like to request a reservation.\n\n${reservationSummary}\n\nThank you.`
    );

    window.location.href = `mailto:hello@ceylonstories.lk?subject=${subject}&body=${body}`;
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[110] flex items-end justify-center bg-mahogany/55 p-3 backdrop-blur-[6px] overscroll-none sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            className="relative w-full max-w-6xl overflow-hidden rounded-[30px] border border-mahogany/10 bg-cream-page text-mahogany shadow-[0_24px_100px_rgba(42,24,16,0.28)]"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,146,74,0.16),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(139,58,31,0.1),transparent_34%)]" />
            <div className="absolute inset-0 paper-texture opacity-40" />

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 z-20 inline-flex size-10 items-center justify-center rounded-full border border-mahogany/10 bg-white/70 text-mahogany transition-colors hover:border-mahogany/20 hover:bg-white sm:right-5 sm:top-5"
              aria-label="Close reservation popup"
            >
              <X className="size-4" strokeWidth={1.8} />
            </button>

            <div
              data-lenis-prevent
              className="relative grid max-h-[92vh] overflow-y-auto overscroll-contain lg:grid-cols-[1fr_1.2fr]"
            >
              {/* ── Left: live summary panel ── */}
              <div className="relative overflow-hidden border-b border-mahogany/10 px-6 pb-8 pt-16 sm:px-8 sm:pb-10 sm:pt-20 lg:border-b-0 lg:border-r lg:px-10 lg:pb-12 lg:pt-16">
                <div className="absolute -right-16 bottom-0 select-none text-[140px] leading-none text-mahogany/5">
                  RSVP
                </div>

                <p className="font-editorial text-[10px] uppercase tracking-[0.3em] text-clay-warm">
                  Reserve A Table
                </p>
                <h2 className="mt-4 max-w-[10ch] font-display text-[46px] leading-[0.9] tracking-[-0.03em] text-mahogany sm:text-[60px]">
                  Tell us when you&apos;d like to arrive.
                </h2>
                <p className="mt-6 max-w-md font-body text-sm leading-[1.8] text-mahogany/70">
                  Pick your date, party size, and a few contact details. When you
                  send the form, your email app opens with the reservation request
                  already filled in.
                </p>

                <div className="mt-10 space-y-4">
                  <div className="rounded-[22px] border border-mahogany/10 bg-white/55 p-4">
                    <div className="flex items-start gap-3">
                      <CalendarDays className="mt-0.5 size-4 shrink-0 text-clay-warm" strokeWidth={1.7} />
                      <div className="min-w-0 flex-1">
                        <p className="font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/45">
                          Selected Date
                        </p>
                        <p className="mt-2 font-display text-2xl leading-tight text-mahogany">
                          <AnimatedValue value={shortDateLabel} />
                        </p>
                        <p className="mt-1 font-body text-sm text-mahogany/60">
                          <AnimatedValue value={selectedDateLabel} />
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[22px] border border-mahogany/10 bg-white/55 p-4">
                      <div className="flex items-center gap-3">
                        <Users className="size-4 shrink-0 text-clay-warm" strokeWidth={1.7} />
                        <div className="min-w-0 flex-1">
                          <p className="font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/45">
                            Party Size
                          </p>
                          <p className="mt-2 font-body text-sm uppercase tracking-[0.18em] text-mahogany">
                            <AnimatedValue value={partySize} />
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[22px] border border-mahogany/10 bg-white/55 p-4">
                      <div className="flex items-center gap-3">
                        <Clock3 className="size-4 shrink-0 text-clay-warm" strokeWidth={1.7} />
                        <div className="min-w-0 flex-1">
                          <p className="font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/45">
                            Preferred Time
                          </p>
                          <p className="mt-2 font-body text-sm uppercase tracking-[0.18em] text-mahogany">
                            <AnimatedValue value={timeSlot} />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {submitted ? (
                    <div className="rounded-[22px] border border-gold-leaf/35 bg-gold-leaf/10 p-4">
                      <div className="flex items-start gap-3">
                        <Sparkles className="mt-0.5 size-4 text-clay-warm" strokeWidth={1.8} />
                        <div>
                          <p className="font-editorial text-[9px] uppercase tracking-[0.28em] text-clay-warm">
                            Reservation Draft Ready
                          </p>
                          <p className="mt-2 font-body text-sm leading-[1.7] text-mahogany/70">
                            Your email app should open with everything pre-filled.
                            If it does not, the details are still visible on this form.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* ── Right: form panel ── */}
              <div className="relative flex flex-col px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                <form className="flex flex-1 flex-col gap-6" onSubmit={handleSubmit}>

                  {/* Step 1 — date */}
                  <div>
                    <p className="mb-4 font-editorial text-[9px] uppercase tracking-[0.3em] text-mahogany/35">
                      <span className="text-clay-warm">01</span>&thinsp;—&thinsp;Pick A Date
                    </p>
                    <Calendar
                      mode="single"
                      defaultMonth={date}
                      selected={date}
                      onSelect={(nextDate) => {
                        setDate(nextDate);
                        setDateError(false);
                      }}
                      fromDate={new Date()}
                      className={cn(dateError && 'border-clay-warm/45')}
                    />
                    <p
                      className={cn(
                        'mt-3 text-center font-editorial text-[10px] uppercase tracking-[0.24em] text-mahogany/45',
                        dateError && 'text-clay-warm'
                      )}
                      role="region"
                    >
                      {dateError ? 'Please choose a reservation date' : 'Reservation Details'}
                    </p>
                  </div>

                  {/* Step 2 — party & time */}
                  <div className="space-y-4">
                    <p className="font-editorial text-[9px] uppercase tracking-[0.3em] text-mahogany/35">
                      <span className="text-clay-warm">02</span>&thinsp;—&thinsp;Party &amp; Time
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block font-editorial text-[10px] uppercase tracking-[0.24em] text-mahogany/55">
                          How Many People?
                        </span>
                        <div className="relative">
                          <select
                            value={partySize}
                            onChange={(event) => setPartySize(event.target.value)}
                            className={selectClassName}
                          >
                            {partySizes.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-mahogany/35"
                            strokeWidth={1.6}
                          />
                        </div>
                      </label>

                      <label className="block">
                        <span className="mb-2 block font-editorial text-[10px] uppercase tracking-[0.24em] text-mahogany/55">
                          Preferred Time
                        </span>
                        <div className="relative">
                          <select
                            value={timeSlot}
                            onChange={(event) => setTimeSlot(event.target.value)}
                            className={selectClassName}
                          >
                            {timeSlots.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-mahogany/35"
                            strokeWidth={1.6}
                          />
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Step 3 — contact details */}
                  <div className="space-y-4">
                    <p className="font-editorial text-[9px] uppercase tracking-[0.3em] text-mahogany/35">
                      <span className="text-clay-warm">03</span>&thinsp;—&thinsp;Your Details
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block font-editorial text-[10px] uppercase tracking-[0.24em] text-mahogany/55">
                          Full Name
                        </span>
                        <Input
                          required
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className="h-12 rounded-[18px] border-mahogany/10 bg-white/70 px-4"
                          placeholder="Your name"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 block font-editorial text-[10px] uppercase tracking-[0.24em] text-mahogany/55">
                          Mobile Number
                        </span>
                        <div className="flex h-12 overflow-hidden rounded-[18px] border border-mahogany/10 bg-white/70 transition-colors focus-within:border-mahogany/25 focus-within:bg-white">
                          <span className="flex shrink-0 select-none items-center border-r border-mahogany/10 bg-mahogany/5 px-3 font-body text-sm text-mahogany/50">
                            🇱🇰&nbsp;+94
                          </span>
                          <input
                            required
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="min-w-0 flex-1 bg-transparent px-3 font-body text-sm text-mahogany outline-none placeholder:text-mahogany/35"
                            placeholder="77 000 0000"
                          />
                        </div>
                      </label>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block font-editorial text-[10px] uppercase tracking-[0.24em] text-mahogany/55">
                          Email
                        </span>
                        <Input
                          required
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className="h-12 rounded-[18px] border-mahogany/10 bg-white/70 px-4"
                          placeholder="you@example.com"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 block font-editorial text-[10px] uppercase tracking-[0.24em] text-mahogany/55">
                          Occasion
                        </span>
                        <Input
                          name="occasion"
                          value={form.occasion}
                          onChange={handleChange}
                          className="h-12 rounded-[18px] border-mahogany/10 bg-white/70 px-4"
                          placeholder="Birthday, tea tasting, lounge..."
                        />
                      </label>
                    </div>

                    <label className="block">
                      <span className="mb-2 block font-editorial text-[10px] uppercase tracking-[0.24em] text-mahogany/55">
                        Notes Or Special Requests
                      </span>
                      <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        className={fieldClassName}
                        rows={3}
                        placeholder="Seating preference, accessibility needs, or anything else we should know."
                      />
                    </label>
                  </div>

                  {/* Sticky submit footer */}
                  <div className="sticky bottom-0 -mx-6 border-t border-mahogany/10 bg-cream-page px-6 pb-8 pt-4 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
                    <div className="rounded-[22px] border border-mahogany/10 bg-white/55 p-4">
                      <div className="flex flex-col gap-4">
                        <div className="space-y-1.5">
                          <p className="font-editorial text-[9px] uppercase tracking-[0.28em] text-clay-warm">
                            Submission Route
                          </p>
                          <div className="space-y-1 text-sm text-mahogany/70">
                            <p className="flex items-center gap-2">
                              <Mail className="size-4 shrink-0 text-clay-warm" strokeWidth={1.7} />
                              Sends the request to hello@ceylonstories.lk
                            </p>
                            <p className="flex items-center gap-2">
                              <Phone className="size-4 shrink-0 text-clay-warm" strokeWidth={1.7} />
                              Contact phone: +94 (77) 000 0000
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <p className="font-body text-xs text-mahogany/40">
                            We typically confirm within 24 hours.
                          </p>
                          <div className="flex shrink-0 gap-3">
                            <Button
                              type="button"
                              variant="outline"
                              className="h-auto rounded-full border-mahogany/10 px-5 py-3 font-editorial text-[10px] uppercase tracking-[0.26em]"
                              onClick={() => onOpenChange(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              className="h-auto rounded-full bg-mahogany px-6 py-3 font-editorial text-[10px] uppercase tracking-[0.28em] text-cream-page shadow-[0_14px_36px_rgba(42,24,16,0.22)] transition-transform duration-300 hover:-translate-y-0.5"
                            >
                              Send Request
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}

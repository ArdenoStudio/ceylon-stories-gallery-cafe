'use client';

import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CalendarDays, Clock3, Users, ChevronLeft, ChevronRight, Mail, Phone, Check } from 'lucide-react';
import { Calendar } from '@/src/components/ui/calendar';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { cn } from '@/src/lib/utils';

const timeSlots = ['08:30 AM', '10:00 AM', '12:30 PM', '03:00 PM', '06:30 PM', '08:30 PM'];
const partySizes = [1, 2, 3, 4, 5, 6, 7, 8];
const steps = [
  { num: '01', label: 'Date & Time' },
  { num: '02', label: 'Your Party' },
  { num: '03', label: 'Contact' },
];

export default function VariantA() {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('06:30 PM');
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const shortDate = useMemo(() =>
    date?.toLocaleDateString('en-LK', { weekday: 'short', month: 'short', day: 'numeric' }) ?? '\u2014',
    [date]
  );
  const longDate = useMemo(() =>
    date?.toLocaleDateString('en-LK', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) ?? 'No date selected',
    [date]
  );

  return (
    <div className="flex items-center justify-center p-8 bg-mahogany/50 min-h-[680px]">
      <div className="w-full max-w-5xl rounded-[32px] bg-cream-page overflow-hidden shadow-[0_32px_120px_rgba(42,24,16,0.36)] grid lg:grid-cols-[1fr_1.35fr] relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,146,74,0.14),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(139,58,31,0.08),transparent_36%)] pointer-events-none" />

        {/* Left: live summary */}
        <div className="relative px-8 py-10 border-b border-mahogany/10 lg:border-b-0 lg:border-r flex flex-col justify-between">
          <div>
            <p className="font-editorial text-[9px] uppercase tracking-[0.34em] text-clay-warm">Reserve A Table</p>
            <h2 className="mt-4 font-display text-[48px] leading-[0.88] tracking-[-0.03em] text-mahogany max-w-[10ch]">
              Tell us when you&apos;d like to arrive.
            </h2>
            <p className="mt-5 font-body text-sm leading-[1.85] text-mahogany/60 max-w-[28ch]">
              Three quick steps. Your email opens with everything pre-filled.
            </p>
          </div>
          <div className="mt-10 space-y-3">
            <div className="rounded-2xl border border-mahogany/10 bg-white/55 px-5 py-4">
              <div className="flex gap-3.5 items-start">
                <CalendarDays className="size-4 mt-0.5 text-clay-warm shrink-0" strokeWidth={1.7} />
                <div className="min-w-0">
                  <p className="font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/40">Selected Date</p>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p key={shortDate} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.18 }} className="mt-2 font-display text-2xl leading-none text-mahogany">
                      {shortDate}
                    </motion.p>
                  </AnimatePresence>
                  <p className="mt-1 font-body text-xs text-mahogany/50 truncate">{longDate}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-mahogany/10 bg-white/55 px-4 py-4">
                <div className="flex gap-2.5 items-center">
                  <Users className="size-4 text-clay-warm shrink-0" strokeWidth={1.7} />
                  <div>
                    <p className="font-editorial text-[9px] uppercase tracking-[0.26em] text-mahogany/40">Guests</p>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.p key={guests} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }} transition={{ duration: 0.15 }} className="mt-1.5 font-body text-sm font-medium text-mahogany">
                        {guests === 8 ? '8+' : guests} {guests === 1 ? 'person' : 'people'}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-mahogany/10 bg-white/55 px-4 py-4">
                <div className="flex gap-2.5 items-center">
                  <Clock3 className="size-4 text-clay-warm shrink-0" strokeWidth={1.7} />
                  <div>
                    <p className="font-editorial text-[9px] uppercase tracking-[0.26em] text-mahogany/40">Time</p>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.p key={time} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }} transition={{ duration: 0.15 }} className="mt-1.5 font-body text-sm font-medium text-mahogany">
                        {time}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: stepped form */}
        <div className="relative flex flex-col px-8 py-10">
          {/* Progress rail */}
          <div className="flex items-center mb-8">
            {steps.map((s, i) => (
              <div key={i} className={cn('flex items-center', i < steps.length - 1 ? 'flex-1' : '')}>
                <button
                  onClick={() => i < step && setStep(i)}
                  className={cn('flex items-center gap-2.5 shrink-0 transition-colors', i < step ? 'cursor-pointer' : 'cursor-default pointer-events-none')}
                >
                  <span className={cn(
                    'flex size-7 items-center justify-center rounded-full transition-all duration-300',
                    i < step ? 'bg-mahogany text-cream-page' :
                    i === step ? 'bg-clay-warm text-cream-page shadow-[0_4px_12px_rgba(181,85,46,0.4)]' :
                    'border border-mahogany/15 text-mahogany/35'
                  )}>
                    {i < step ? <Check className="size-3.5" strokeWidth={2.5} /> : <span className="font-editorial text-[8px] tracking-wider">{s.num}</span>}
                  </span>
                  <span className={cn('font-editorial text-[9px] uppercase tracking-[0.24em] hidden sm:block transition-colors', i === step ? 'text-mahogany' : i < step ? 'text-mahogany/50' : 'text-mahogany/25')}>
                    {s.label}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div className="flex-1 mx-3 h-px relative overflow-hidden bg-mahogany/10">
                    <motion.div className="absolute inset-y-0 left-0 bg-mahogany/30" animate={{ width: i < step ? '100%' : '0%' }} transition={{ duration: 0.4, ease: 'easeInOut' }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}>
                {step === 0 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-[26px] leading-tight text-mahogany">Pick your date</h3>
                      <p className="mt-1 font-body text-sm text-mahogany/50">When would you like to visit?</p>
                    </div>
                    <Calendar mode="single" defaultMonth={date} selected={date} onSelect={setDate} fromDate={new Date()} />
                    <div>
                      <p className="mb-3 font-editorial text-[9px] uppercase tracking-[0.3em] text-mahogany/40">Preferred Time</p>
                      <div className="flex flex-wrap gap-2">
                        {timeSlots.map((t) => (
                          <button key={t} onClick={() => setTime(t)} className={cn('px-4 py-2 rounded-full font-body text-[13px] transition-all duration-200', t === time ? 'bg-mahogany text-cream-page shadow-[0_6px_16px_rgba(42,24,16,0.2)]' : 'bg-white/70 border border-mahogany/12 text-mahogany/70 hover:border-mahogany/25 hover:text-mahogany')}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {step === 1 && (
                  <div className="space-y-7">
                    <div>
                      <h3 className="font-display text-[26px] leading-tight text-mahogany">Your party</h3>
                      <p className="mt-1 font-body text-sm text-mahogany/50">How many guests are joining you?</p>
                    </div>
                    <div>
                      <p className="mb-3 font-editorial text-[9px] uppercase tracking-[0.3em] text-mahogany/40">Number of Guests</p>
                      <div className="flex flex-wrap gap-2">
                        {partySizes.map((n) => (
                          <button key={n} onClick={() => setGuests(n)} className={cn('size-12 rounded-xl font-display text-lg transition-all duration-200', n === guests ? 'bg-mahogany text-cream-page shadow-[0_8px_24px_rgba(42,24,16,0.22)]' : 'bg-white/70 border border-mahogany/12 text-mahogany/60 hover:border-mahogany/25 hover:text-mahogany')}>
                            {n === 8 ? '8+' : n}
                          </button>
                        ))}
                      </div>
                    </div>
                    <label className="block">
                      <span className="mb-2 block font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/40">Special Occasion (optional)</span>
                      <Input value={occasion} onChange={(e) => setOccasion(e.target.value)} className="h-12 rounded-[18px] border-mahogany/12 bg-white/70" placeholder="Birthday, tea tasting, anniversary..." />
                    </label>
                  </div>
                )}
                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-display text-[26px] leading-tight text-mahogany">Your details</h3>
                      <p className="mt-1 font-body text-sm text-mahogany/50">So we can confirm your reservation.</p>
                    </div>
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
                    <div className="rounded-2xl border border-mahogany/10 bg-white/50 p-4 space-y-1.5 text-[13px] text-mahogany/55">
                      <p className="flex items-center gap-2.5"><Mail className="size-3.5 text-clay-warm shrink-0" strokeWidth={1.7} /> Sends to hello@ceylonstories.lk</p>
                      <p className="flex items-center gap-2.5"><Phone className="size-3.5 text-clay-warm shrink-0" strokeWidth={1.7} /> +94 (77) 000 0000</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-mahogany/8">
            {step > 0 ? (
              <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-1.5 font-editorial text-[9px] uppercase tracking-[0.26em] text-mahogany/45 hover:text-mahogany transition-colors">
                <ChevronLeft className="size-3.5" strokeWidth={2} /> Back
              </button>
            ) : <div />}
            <div className="flex items-center gap-3">
              <p className="font-body text-xs text-mahogany/35 hidden sm:block">We confirm within 24 hours.</p>
              {step < 2 ? (
                <Button onClick={() => setStep(s => s + 1)} className="h-auto rounded-full bg-mahogany px-7 py-3 font-editorial text-[9px] uppercase tracking-[0.28em] text-cream-page">
                  Continue <ChevronRight className="size-3.5 ml-1" strokeWidth={2} />
                </Button>
              ) : (
                <Button className="h-auto rounded-full bg-mahogany px-7 py-3 font-editorial text-[9px] uppercase tracking-[0.3em] text-cream-page shadow-[0_14px_36px_rgba(42,24,16,0.24)] hover:-translate-y-0.5 transition-transform">
                  Send Request
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

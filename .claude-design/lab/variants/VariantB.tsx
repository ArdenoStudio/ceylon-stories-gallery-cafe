'use client';

import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ArrowLeft, Mail, Phone } from 'lucide-react';
import { Calendar } from '@/src/components/ui/calendar';
import { Input } from '@/src/components/ui/input';
import { cn } from '@/src/lib/utils';

// Variant B: Full-Screen Immersive — one step fills the entire modal
// Large editorial typography, near-zero chrome, maximum focus per step.

const timeSlots = ['08:30 AM', '10:00 AM', '12:30 PM', '03:00 PM', '06:30 PM', '08:30 PM'];
const partySizes = [1, 2, 3, 4, 5, 6, 7, 8];

export default function VariantB() {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('06:30 PM');
  const [guests, setGuests] = useState(2);
  const [form, setForm] = useState({ name: '', email: '', phone: '', occasion: '' });

  const shortDate = useMemo(() =>
    date?.toLocaleDateString('en-LK', { weekday: 'long', month: 'long', day: 'numeric' }) ?? 'No date',
    [date]
  );

  const stepTitles = ['When?', 'Who?', 'You.'];
  const stepSubtitles = ['Pick a date and arrival time.', 'How many guests are joining?', 'How do we reach you?'];

  return (
    <div className="flex items-center justify-center p-8 bg-mahogany/50 min-h-[680px]">
      <div className="w-full max-w-3xl rounded-[32px] bg-cream-page overflow-hidden shadow-[0_32px_120px_rgba(42,24,16,0.4)] relative">

        {/* Step dots */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {[0, 1, 2].map((i) => (
            <div key={i} className={cn('rounded-full transition-all duration-400', i === step ? 'w-6 h-1.5 bg-clay-warm' : i < step ? 'w-1.5 h-1.5 bg-mahogany/40' : 'w-1.5 h-1.5 bg-mahogany/15')} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="px-10 pt-16 pb-10 min-h-[560px] flex flex-col"
          >
            {/* Step header */}
            <div className="mb-8">
              <p className="font-editorial text-[9px] uppercase tracking-[0.32em] text-clay-warm mb-2">
                Step {String(step + 1).padStart(2, '0')} of 03
              </p>
              <h2 className="font-display text-[72px] leading-[0.85] tracking-[-0.04em] text-mahogany">
                {stepTitles[step]}
              </h2>
              <p className="mt-4 font-body text-base text-mahogany/55 leading-relaxed">
                {stepSubtitles[step]}
              </p>
            </div>

            {/* Step content */}
            <div className="flex-1">
              {step === 0 && (
                <div className="space-y-6">
                  <Calendar mode="single" defaultMonth={date} selected={date} onSelect={setDate} fromDate={new Date()} />
                  <div>
                    <p className="mb-3 font-editorial text-[9px] uppercase tracking-[0.3em] text-mahogany/40">What time suits you?</p>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((t) => (
                        <button
                          key={t}
                          onClick={() => setTime(t)}
                          className={cn(
                            'py-3 rounded-2xl font-body text-sm transition-all duration-200 border',
                            t === time
                              ? 'bg-mahogany text-cream-page border-transparent shadow-[0_8px_24px_rgba(42,24,16,0.22)]'
                              : 'bg-white/60 border-mahogany/12 text-mahogany/70 hover:border-mahogany/25 hover:bg-white/90'
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  {date && (
                    <div className="rounded-2xl bg-cream-paper/60 px-5 py-3 border border-mahogany/8">
                      <p className="font-body text-sm text-mahogany/60">
                        <span className="text-mahogany font-medium">{shortDate}</span> at <span className="text-mahogany font-medium">{time}</span>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-8">
                  <div>
                    <p className="mb-4 font-editorial text-[9px] uppercase tracking-[0.3em] text-mahogany/40">Party size</p>
                    <div className="grid grid-cols-4 gap-3">
                      {partySizes.map((n) => (
                        <button
                          key={n}
                          onClick={() => setGuests(n)}
                          className={cn(
                            'aspect-square rounded-2xl transition-all duration-200 flex flex-col items-center justify-center gap-1',
                            n === guests
                              ? 'bg-mahogany text-cream-page shadow-[0_12px_32px_rgba(42,24,16,0.3)]'
                              : 'bg-white/60 border border-mahogany/12 text-mahogany/60 hover:border-mahogany/25 hover:bg-white/90'
                          )}
                        >
                          <span className="font-display text-2xl leading-none">{n === 8 ? '8+' : n}</span>
                          <span className="font-editorial text-[8px] uppercase tracking-[0.2em] opacity-60">{n === 1 ? 'guest' : 'guests'}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block">
                      <span className="mb-2 block font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/40">Any special occasion?</span>
                      <Input
                        value={form.occasion}
                        onChange={(e) => setForm(f => ({ ...f, occasion: e.target.value }))}
                        className="h-12 rounded-[18px] border-mahogany/12 bg-white/70"
                        placeholder="Birthday, tea tasting, anniversary..."
                      />
                    </label>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block sm:col-span-2">
                      <span className="mb-2 block font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/40">Full Name</span>
                      <Input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} className="h-14 rounded-[18px] border-mahogany/12 bg-white/70 text-base" placeholder="Your full name" />
                    </label>
                    <label className="block">
                      <span className="mb-2 block font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/40">Email Address</span>
                      <Input type="email" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} className="h-12 rounded-[18px] border-mahogany/12 bg-white/70" placeholder="you@example.com" />
                    </label>
                    <label className="block">
                      <span className="mb-2 block font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/40">Phone Number</span>
                      <Input type="tel" value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} className="h-12 rounded-[18px] border-mahogany/12 bg-white/70" placeholder="+94 77 000 0000" />
                    </label>
                  </div>
                  <div className="rounded-2xl border border-mahogany/8 bg-cream-paper/50 p-4 text-[13px] text-mahogany/50 space-y-1.5">
                    <p className="flex items-center gap-2"><Mail className="size-3.5 text-clay-warm" strokeWidth={1.7} /> hello@ceylonstories.lk</p>
                    <p className="flex items-center gap-2"><Phone className="size-3.5 text-clay-warm" strokeWidth={1.7} /> +94 (77) 000 0000</p>
                  </div>
                </div>
              )}
            </div>

            {/* Nav */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-mahogany/8">
              {step > 0 ? (
                <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/40 hover:text-mahogany transition-colors">
                  <ArrowLeft className="size-4" strokeWidth={1.8} /> Back
                </button>
              ) : <div />}
              {step < 2 ? (
                <button
                  onClick={() => setStep(s => s + 1)}
                  className="group flex items-center gap-3 font-editorial text-[11px] uppercase tracking-[0.3em] text-mahogany hover:text-clay-warm transition-colors"
                >
                  Continue
                  <span className="flex size-10 items-center justify-center rounded-full bg-mahogany text-cream-page group-hover:bg-clay-warm transition-colors">
                    <ArrowRight className="size-4" strokeWidth={2} />
                  </span>
                </button>
              ) : (
                <button className="group flex items-center gap-3 font-editorial text-[11px] uppercase tracking-[0.3em] text-mahogany">
                  Send Request
                  <span className="flex size-10 items-center justify-center rounded-full bg-clay-warm text-cream-page shadow-[0_8px_24px_rgba(181,85,46,0.4)]">
                    <ArrowRight className="size-4" strokeWidth={2} />
                  </span>
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

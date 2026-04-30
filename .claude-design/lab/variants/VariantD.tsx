'use client';

import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Mail, Phone } from 'lucide-react';
import { Calendar } from '@/src/components/ui/calendar';
import { Input } from '@/src/components/ui/input';
import { cn } from '@/src/lib/utils';

// Variant D: Conversational / Chat-style — each question appears one at a time
// in a dialogue format. The interface feels personal and guides the user
// with large, confident typography on a warm cream canvas.

const timeSlots = ['08:30 AM', '10:00 AM', '12:30 PM', '03:00 PM', '06:30 PM', '08:30 PM'];
const partySizes = [1, 2, 3, 4, 5, 6, 7, 8];

export default function VariantD() {
  const [phase, setPhase] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const shortDate = useMemo(() =>
    date?.toLocaleDateString('en-LK', { weekday: 'long', month: 'long', day: 'numeric' }) ?? '\u2014',
    [date]
  );

  const canAdvance = [
    !!date,
    !!time,
    guests !== null,
    true,
  ][phase];

  const questions = [
    'When would you like to visit?',
    'What time works for you?',
    "How many guests are joining you?",
    'And finally, how do we reach you?',
  ];

  const handleDateSelect = (d: Date | undefined) => {
    setDate(d);
  };

  return (
    <div className="flex items-center justify-center p-8 bg-mahogany/50 min-h-[680px]">
      <div className="w-full max-w-2xl rounded-[32px] bg-cream-page overflow-hidden shadow-[0_32px_120px_rgba(42,24,16,0.4)] relative">

        {/* Subtle top gradient */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[rgba(184,146,74,0.08)] to-transparent pointer-events-none" />

        <div className="relative px-10 py-12">
          {/* Eyebrow */}
          <div className="flex items-center justify-between mb-10">
            <p className="font-editorial text-[9px] uppercase tracking-[0.34em] text-clay-warm">Reserve A Table</p>
            <div className="flex gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={cn('h-1 rounded-full transition-all duration-500', i === phase ? 'w-8 bg-clay-warm' : i < phase ? 'w-4 bg-mahogany/30' : 'w-4 bg-mahogany/12')} />
              ))}
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`q-${phase}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-display text-[38px] leading-[1.05] tracking-[-0.025em] text-mahogany mb-8">
                {questions[phase]}
              </h2>
            </motion.div>
          </AnimatePresence>

          {/* Answer area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`a-${phase}`}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="min-h-[280px]"
            >
              {phase === 0 && (
                <Calendar mode="single" defaultMonth={date} selected={date} onSelect={handleDateSelect} fromDate={new Date()} />
              )}

              {phase === 1 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      onClick={() => { setTime(t); }}
                      className={cn(
                        'py-5 rounded-2xl font-body text-sm transition-all duration-200 border text-center',
                        t === time
                          ? 'bg-mahogany text-cream-page border-transparent shadow-[0_12px_32px_rgba(42,24,16,0.28)]'
                          : 'bg-white/60 border-mahogany/12 text-mahogany/65 hover:border-mahogany/25 hover:bg-white/90'
                      )}
                    >
                      <span className="block font-display text-xl leading-none">{t.replace(' AM', '').replace(' PM', '')}</span>
                      <span className="block font-editorial text-[9px] uppercase tracking-[0.2em] mt-1.5 opacity-60">{t.includes('AM') ? 'morning' : 'afternoon'}</span>
                    </button>
                  ))}
                </div>
              )}

              {phase === 2 && (
                <div className="grid grid-cols-4 gap-3">
                  {partySizes.map((n) => (
                    <button
                      key={n}
                      onClick={() => setGuests(n)}
                      className={cn(
                        'aspect-square rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-200 border',
                        n === guests
                          ? 'bg-mahogany text-cream-page border-transparent shadow-[0_12px_32px_rgba(42,24,16,0.28)]'
                          : 'bg-white/60 border-mahogany/12 text-mahogany/60 hover:border-mahogany/25 hover:bg-white/90'
                      )}
                    >
                      <span className="font-display text-2xl leading-none">{n === 8 ? '8+' : n}</span>
                      <span className="font-editorial text-[8px] uppercase tracking-[0.15em] opacity-60">
                        {n === 1 ? 'guest' : 'guests'}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {phase === 3 && (
                <div className="space-y-4">
                  {/* Quick recap */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {[shortDate, time, `${guests === 8 ? '8+' : guests} guests`].filter(Boolean).map((tag, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-full bg-white/70 border border-mahogany/10 font-body text-xs text-mahogany/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <label className="block">
                    <span className="mb-2 block font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/40">Full Name</span>
                    <Input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} className="h-13 rounded-[18px] border-mahogany/12 bg-white/70" placeholder="Your name" />
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
                  <div className="rounded-2xl border border-mahogany/8 bg-white/40 p-3.5 flex gap-4 text-[12px] text-mahogany/50">
                    <p className="flex items-center gap-1.5"><Mail className="size-3.5 text-clay-warm" strokeWidth={1.7} /> hello@ceylonstories.lk</p>
                    <p className="flex items-center gap-1.5"><Phone className="size-3.5 text-clay-warm" strokeWidth={1.7} /> +94 (77) 000 0000</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Footer action */}
          <div className="mt-8 flex items-center justify-between pt-6 border-t border-mahogany/8">
            {phase > 0 ? (
              <button onClick={() => setPhase(p => p - 1)} className="font-editorial text-[9px] uppercase tracking-[0.28em] text-mahogany/40 hover:text-mahogany transition-colors">
                Back
              </button>
            ) : <div />}
            {phase < 3 ? (
              <button
                onClick={() => canAdvance && setPhase(p => p + 1)}
                disabled={!canAdvance}
                className={cn(
                  'px-8 py-3 rounded-full font-editorial text-[9px] uppercase tracking-[0.3em] transition-all duration-300',
                  canAdvance
                    ? 'bg-mahogany text-cream-page shadow-[0_12px_32px_rgba(42,24,16,0.22)] hover:-translate-y-0.5'
                    : 'bg-mahogany/15 text-mahogany/30 cursor-not-allowed'
                )}
              >
                Continue
              </button>
            ) : (
              <button className="px-8 py-3 rounded-full font-editorial text-[9px] uppercase tracking-[0.3em] bg-clay-warm text-cream-page shadow-[0_14px_36px_rgba(181,85,46,0.35)] hover:-translate-y-0.5 transition-transform">
                Send Request
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

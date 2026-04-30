'use client';

import Link from 'next/link';
import { Clock, Flame, GlassWater, Moon } from 'lucide-react';
import { useReveal } from '@/src/hooks/useReveal';

const notes = [
  { icon: Moon, label: 'Low Light', body: 'A slower room for the second half of the evening.' },
  { icon: Flame, label: 'Shisha Ritual', body: 'Imported blends prepared with brass, charcoal, and patience.' },
  { icon: GlassWater, label: 'Tea & Cold Drinks', body: 'Pair the lounge with chai, iced coffee, or a long lemonade.' },
];

export default function Lounge() {
  const copyRef = useReveal('-10%');
  const imageRef = useReveal('-12%');
  const notesRef = useReveal('-12%');

  return (
    <section
      id="experience"
      className="relative w-full overflow-hidden bg-ink-night py-[clamp(76px,11vh,136px)] text-cream-page"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gold-leaf/20" />
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-clay-warm/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 bg-[radial-gradient(circle_at_center,rgba(184,146,74,0.16),transparent_62%)]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div ref={copyRef} className="reveal-up">
          <p className="mb-5 flex items-center gap-3 font-editorial text-[10px] uppercase tracking-[0.34em] text-gold-leaf">
            <span className="h-px w-8 bg-gold-leaf/45" />
            04 · The Lounge
          </p>
          <h2 className="font-display text-[clamp(48px,7vw,104px)] font-light leading-[0.9] tracking-[-0.02em]">
            After dusk,
            <br />
            <i className="text-clay-warm">stay awhile.</i>
          </h2>
          <p className="mt-7 max-w-md font-body text-[15px] leading-[1.85] text-cream-page/68">
            A quieter corner of Ceylon Stories for shisha, soft conversation, and unhurried cups.
            Dark timber, tea smoke, brass details, and a pace that belongs to the evening.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/shisha"
              className="inline-flex min-h-12 items-center rounded-full bg-cream-page px-6 font-editorial text-[10px] uppercase tracking-[0.24em] text-mahogany transition-colors hover:bg-gold-leaf"
            >
              Shisha Menu
            </Link>
            <Link
              href="/visit"
              className="inline-flex min-h-12 items-center rounded-full border border-cream-page/25 px-6 font-editorial text-[10px] uppercase tracking-[0.24em] text-cream-page transition-colors hover:border-gold-leaf hover:text-gold-leaf"
            >
              Visit the Lounge
            </Link>
          </div>
        </div>

        <div ref={imageRef} className="reveal-inset relative">
          <div className="grid grid-cols-[0.72fr_1fr] gap-4 sm:gap-5">
            <div className="mt-16 flex flex-col gap-4 sm:gap-5">
              <div className="border border-gold-leaf/20 bg-mahogany/50 p-4">
                <Clock className="mb-6 h-5 w-5 text-gold-leaf" strokeWidth={1.5} />
                <p className="font-editorial text-[9px] uppercase tracking-[0.26em] text-cream-page/48">
                  Best After
                </p>
                <p className="mt-2 font-display text-3xl text-cream-page">7 PM</p>
              </div>
              <div className="aspect-[4/5] overflow-hidden border border-gold-leaf/20">
                <img
                  src="/images/story/tea-tasting.jpg"
                  alt="Tea service at Ceylon Stories"
                  className="h-full w-full object-cover photo-heritage-deep"
                />
              </div>
            </div>
            <div className="space-y-4 sm:space-y-5">
              <div className="aspect-[4/5] overflow-hidden border border-gold-leaf/20">
                <img
                  src="/images/story/team.jpg"
                  alt="Ceylon Stories cafe team"
                  className="h-full w-full object-cover photo-heritage-deep"
                />
              </div>
              <div className="border border-gold-leaf/20 bg-cream-page p-5 text-mahogany">
                <p className="font-display text-3xl leading-none">Brass, smoke, tea.</p>
                <p className="mt-3 font-body text-xs leading-relaxed text-mahogany/62">
                  A lounge treatment that feels connected to the gallery cafe, not a generic hotel bar.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div ref={notesRef} className="reveal-up lg:col-span-2">
          <div className="grid grid-cols-1 border border-gold-leaf/16 md:grid-cols-3">
            {notes.map((note) => (
              <div key={note.label} className="border-b border-gold-leaf/16 p-6 md:border-b-0 md:border-r last:border-0">
                <note.icon className="mb-5 h-5 w-5 text-gold-leaf" strokeWidth={1.5} />
                <p className="font-editorial text-[10px] uppercase tracking-[0.26em] text-cream-page/70">
                  {note.label}
                </p>
                <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-cream-page/55">
                  {note.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

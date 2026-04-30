'use client';

import VariantA from '../../.claude-design/lab/variants/VariantA';
import VariantB from '../../.claude-design/lab/variants/VariantB';
import VariantC from '../../.claude-design/lab/variants/VariantC';
import VariantD from '../../.claude-design/lab/variants/VariantD';
import VariantE from '../../.claude-design/lab/variants/VariantE';
import VariantF from '../../.claude-design/lab/variants/VariantF';

const variants = [
  {
    id: 'F',
    tag: '★ SYNTHESIS',
    title: 'C × D — Conversational Accordion',
    rationale: 'Left panel stays fixed with live summary and submit button. Three always-visible accordion sections, each opening with a large Fraunces question heading. ± stepper for guests. Free navigation — open any section at any time.',
    Cmp: VariantF,
  },
  {
    id: 'A',
    tag: '',
    title: 'Progress Rail Wizard',
    rationale: 'Two-column layout with animated step rail, pill time chips, number grid for guests. Left panel updates live.',
    Cmp: VariantA,
  },
  {
    id: 'B',
    tag: '',
    title: 'Full-Screen Immersive',
    rationale: 'Single-column, no chrome. Giant step titles ("When?", "Who?", "You."). Each step fills the whole modal.',
    Cmp: VariantB,
  },
  {
    id: 'C',
    tag: '',
    title: 'Tab-Accordion Stack',
    rationale: 'All three sections visible as collapsible accordions. Left summary panel fixed. ± stepper for guests. Free navigation.',
    Cmp: VariantC,
  },
  {
    id: 'D',
    tag: '',
    title: 'Conversational Wizard',
    rationale: 'One question at a time. Large question headings, dialogue tone. Continue only activates after each answer.',
    Cmp: VariantD,
  },
  {
    id: 'E',
    tag: '',
    title: 'Dark Luxury (Ink & Gold)',
    rationale: 'Same stepped structure as A on an ink-night canvas with gold-leaf accents. Premium after-dark register.',
    Cmp: VariantE,
  },
];

export default function DesignLabPage() {
  return (
    <div className="min-h-dvh bg-ink-night text-cream-page">
      <header className="sticky top-0 z-50 bg-ink-night/95 backdrop-blur border-b border-gold-leaf/20 px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="font-editorial text-[10px] tracking-[0.3em] uppercase text-gold-leaf">Design Lab</span>
          <span className="text-cream-page/30">·</span>
          <span className="font-body text-sm text-cream-page/70">Reservation Modal — all variants</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-editorial tracking-[0.3em] uppercase text-cream-page/50">
          {variants.map((v) => (
            <a key={v.id} href={`#variant-${v.id}`} className={`px-3 py-1 border transition-colors ${v.id === 'F' ? 'border-gold-leaf/60 text-gold-leaf' : 'border-gold-leaf/20 hover:border-gold-leaf/40'}`}>
              {v.id}
            </a>
          ))}
        </div>
      </header>

      <main className="flex flex-col">
        {variants.map((v) => (
          <section key={v.id} id={`variant-${v.id}`} data-variant={v.id} className="border-b border-gold-leaf/10">
            <div className={`px-6 py-6 border-b border-gold-leaf/10 flex items-baseline gap-4 flex-wrap ${v.id === 'F' ? 'bg-gold-leaf/8' : 'bg-ink-night/80'}`}>
              <span className="font-display italic text-gold-leaf text-3xl leading-none">{v.id}</span>
              {v.tag && (
                <span className="font-editorial text-[8px] tracking-[0.3em] uppercase text-gold-leaf border border-gold-leaf/40 px-2 py-0.5 rounded-full">
                  {v.tag}
                </span>
              )}
              <div className="flex flex-col gap-1">
                <h2 className="font-editorial text-[11px] tracking-[0.3em] uppercase text-cream-page">{v.title}</h2>
                <p className="font-body text-[13px] text-cream-page/55 italic max-w-2xl text-pretty">{v.rationale}</p>
              </div>
            </div>
            <v.Cmp />
          </section>
        ))}
      </main>

      <footer className="px-6 py-10 text-center font-editorial text-[10px] tracking-[0.3em] uppercase text-cream-page/40">
        Pick one (or mix) — tell Claude which wins
      </footer>
    </div>
  );
}

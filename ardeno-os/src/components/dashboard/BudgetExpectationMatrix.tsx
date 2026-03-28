import React from "react";
import featureTiers from "@/config/feature-tiers.json";

/**
 * Priority 9: Requirements & Budget Intelligence Layer (§31)
 * §31 Budget Expectation Matrix: Tier comparison grid — "What You Get" per budget level.
 * RSC — reads from feature-tiers.json at build time / request time.
 * Used in /portal/[id]/interview and proposal flow.
 */

const TIER_COLORS: Record<string, { accent: string; badge: string; border: string }> = {
  basic:      { accent: 'text-white/60',   badge: 'bg-white/5 text-white/50',           border: 'border-white/10' },
  growth:     { accent: 'text-blue-400',   badge: 'bg-blue-500/10 text-blue-400',        border: 'border-blue-500/20' },
  premium:    { accent: 'text-primary',    badge: 'bg-primary/10 text-primary',          border: 'border-primary/30' },
  enterprise: { accent: 'text-yellow-400', badge: 'bg-yellow-500/10 text-yellow-400',    border: 'border-yellow-500/30' },
};

const TIER_ICONS: Record<string, string> = {
  basic: '⚡',
  growth: '🚀',
  premium: '💎',
  enterprise: '🏆',
};

export default function BudgetExpectationMatrix({ highlightTier }: { highlightTier?: string }) {
  const tiers = Object.entries(featureTiers.tiers) as [string, any][];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {tiers.map(([key, tier]) => {
          const style = TIER_COLORS[key] ?? TIER_COLORS.basic;
          const isHighlighted = highlightTier === key;

          return (
            <div
              key={key}
              className={`glass-panel p-5 bg-[#0a0a0a]/60 border ${style.border} ${
                isHighlighted ? 'ring-1 ring-primary/50 shadow-lg shadow-primary/5' : ''
              } flex flex-col`}
            >
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{TIER_ICONS[key]}</span>
                  <h4 className={`font-bold text-sm ${style.accent}`}>{tier.name}</h4>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest ${style.badge}`}>
                  {tier.budgetRange}
                </span>
                <p className="text-[9px] text-white/30 mt-2 font-mono">{tier.timeline}</p>
              </div>

              {/* Includes */}
              <div className="flex-1">
                <p className="text-[9px] text-green-400 uppercase font-black tracking-widest mb-2">Included</p>
                <ul className="space-y-1.5">
                  {tier.includes.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-green-500 text-[9px] mt-0.5 shrink-0">✓</span>
                      <span className="text-[10px] text-white/60 leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excludes */}
              {tier.excludes.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-[9px] text-red-400/60 uppercase font-black tracking-widest mb-2">Not Included</p>
                  <ul className="space-y-1">
                    {tier.excludes.slice(0, 3).map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-red-500/50 text-[9px] mt-0.5 shrink-0">✗</span>
                        <span className="text-[9px] text-white/25 leading-tight">{item}</span>
                      </li>
                    ))}
                    {tier.excludes.length > 3 && (
                      <li className="text-[9px] text-white/20 italic pl-3">+{tier.excludes.length - 3} more</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Scope creep legend */}
      <div className="glass-panel p-4 bg-[#0a0a0a]/40 border border-white/5">
        <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2 font-bold">Scope Classification</p>
        <div className="flex gap-6 text-[10px] text-white/40">
          <span><span className="text-green-400 font-bold">In Scope</span> — {featureTiers.scopeCreepClassification.in_scope}</span>
          <span><span className="text-yellow-400 font-bold">Minor Addition</span> — {featureTiers.scopeCreepClassification.minor_addition}</span>
          <span><span className="text-red-400 font-bold">Out of Scope</span> — {featureTiers.scopeCreepClassification.out_of_scope}</span>
        </div>
      </div>
    </div>
  );
}

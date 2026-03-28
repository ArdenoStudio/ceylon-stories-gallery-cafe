import React from "react";
import { supabaseAdmin } from "@/lib/supabase/client";

/**
 * Priority 9: Requirements & Budget Intelligence Layer (§31)
 * §31 Requirements Checklist: Structured must-haves vs nice-to-haves with confidence scoring.
 * RSC — fetches from `requirements` table. Used in /portal/[id]/interview and /dashboard.
 */

interface RequirementItem {
  id: string;
  label: string;
  type: 'must_have' | 'nice_to_have';
  confirmed: boolean;
  source?: string;
}

interface RequirementsChecklistProps {
  requirementId?: string;
  compact?: boolean;
}

export default async function RequirementsChecklist({ requirementId, compact = false }: RequirementsChecklistProps) {
  let requirement: any = null;
  let mustHaves: RequirementItem[] = [];
  let niceToHaves: RequirementItem[] = [];
  let confidenceScore = 0;
  let totalItems = 0;
  let confirmedItems = 0;

  if (requirementId) {
    const { data } = await supabaseAdmin
      .from('requirements')
      .select('*')
      .eq('id', requirementId)
      .single();
    requirement = data;
  }

  if (requirement?.structured_requirements) {
    const reqs = requirement.structured_requirements as RequirementItem[];
    mustHaves = reqs.filter(r => r.type === 'must_have');
    niceToHaves = reqs.filter(r => r.type === 'nice_to_have');
    totalItems = reqs.length;
    confirmedItems = reqs.filter(r => r.confirmed).length;
    confidenceScore = requirement.confidence_score ?? (totalItems > 0 ? Math.round((confirmedItems / totalItems) * 100) : 0);
  } else {
    // Fallback demo data for empty/dev state
    mustHaves = FALLBACK_MUST_HAVES;
    niceToHaves = FALLBACK_NICE_TO_HAVES;
    totalItems = mustHaves.length + niceToHaves.length;
    confirmedItems = [...mustHaves, ...niceToHaves].filter(r => r.confirmed).length;
    confidenceScore = Math.round((confirmedItems / totalItems) * 100);
  }

  const completionPct = totalItems > 0 ? Math.round((confirmedItems / totalItems) * 100) : 0;
  const confidenceLevel = confidenceScore >= 95 ? 'High' : confidenceScore >= 70 ? 'Medium' : 'Low';
  const confidenceColor = confidenceScore >= 95 ? 'text-green-400' : confidenceScore >= 70 ? 'text-yellow-400' : 'text-red-400';

  if (compact) {
    return (
      <div className="glass-panel p-4 bg-[#0a0a0a]/60">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Requirements</p>
          <ConfidenceBadge score={confidenceScore} level={confidenceLevel} color={confidenceColor} />
        </div>
        <CompletionRing pct={completionPct} confirmed={confirmedItems} total={totalItems} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-panel p-4 bg-[#0a0a0a]/60">
          <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Confidence Score</p>
          <p className={`text-2xl font-black ${confidenceColor}`}>{confidenceScore}%</p>
          <p className={`text-[9px] font-bold uppercase tracking-widest mt-0.5 ${confidenceColor}`}>{confidenceLevel} confidence</p>
        </div>
        <div className="glass-panel p-4 bg-[#0a0a0a]/60">
          <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Completion</p>
          <p className="text-2xl font-black text-white">{completionPct}%</p>
          <p className="text-[9px] text-white/30 mt-0.5 font-mono">{confirmedItems}/{totalItems} items</p>
        </div>
        <div className="glass-panel p-4 bg-[#0a0a0a]/60">
          <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Must-Haves</p>
          <p className="text-2xl font-black text-white">{mustHaves.filter(r => r.confirmed).length}/{mustHaves.length}</p>
          <p className="text-[9px] text-white/30 mt-0.5">
            {mustHaves.every(r => r.confirmed) ? (
              <span className="text-green-400 font-bold">All confirmed ✓</span>
            ) : (
              <span className="text-yellow-400">{mustHaves.filter(r => !r.confirmed).length} pending</span>
            )}
          </p>
        </div>
      </div>

      {/* Completion progress bar */}
      <div>
        <div className="flex justify-between text-[10px] text-white/30 mb-1.5">
          <span>Overall requirement completion</span>
          <span className="font-mono">{completionPct}%</span>
        </div>
        <div className="performance-meter">
          <div
            className={`performance-fill ${completionPct >= 95 ? 'bg-green-500' : completionPct >= 70 ? '' : 'bg-yellow-500'}`}
            style={{ width: `${completionPct}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Must-Haves */}
        <div>
          <p className="text-[10px] text-red-400 uppercase font-black tracking-widest mb-3 flex items-center gap-1.5">
            <span>●</span> Must-Haves ({mustHaves.filter(r => r.confirmed).length}/{mustHaves.length})
          </p>
          <div className="space-y-2">
            {mustHaves.map(item => (
              <ChecklistItem key={item.id} item={item} isMustHave />
            ))}
          </div>
        </div>

        {/* Nice-to-Haves */}
        <div>
          <p className="text-[10px] text-blue-400 uppercase font-black tracking-widest mb-3 flex items-center gap-1.5">
            <span>○</span> Nice-to-Haves ({niceToHaves.filter(r => r.confirmed).length}/{niceToHaves.length})
          </p>
          <div className="space-y-2">
            {niceToHaves.map(item => (
              <ChecklistItem key={item.id} item={item} isMustHave={false} />
            ))}
          </div>
        </div>
      </div>

      {confidenceScore < 95 && (
        <div className="glass-panel p-4 border border-yellow-500/20 bg-yellow-500/5">
          <p className="text-[10px] text-yellow-400 font-bold">
            ⚠️ Confidence below 95% threshold. MultiTurnClientInterviewer will request additional clarification before proceeding.
          </p>
        </div>
      )}
    </div>
  );
}

function ChecklistItem({ item, isMustHave }: { item: RequirementItem; isMustHave: boolean }) {
  return (
    <div className={`flex items-start gap-2 p-2.5 rounded-lg border transition-colors ${
      item.confirmed
        ? 'bg-green-500/5 border-green-500/15'
        : isMustHave
          ? 'bg-red-500/5 border-red-500/10'
          : 'bg-white/2 border-white/5'
    }`}>
      <span className={`text-sm shrink-0 mt-0.5 ${item.confirmed ? 'text-green-400' : 'text-white/20'}`}>
        {item.confirmed ? '✓' : '○'}
      </span>
      <div>
        <p className={`text-[11px] leading-tight ${item.confirmed ? 'text-white/70' : 'text-white/40'}`}>
          {item.label}
        </p>
        {item.source && (
          <p className="text-[9px] text-white/20 font-mono mt-0.5">via {item.source}</p>
        )}
      </div>
    </div>
  );
}

function ConfidenceBadge({ score, level, color }: { score: number; level: string; color: string }) {
  return (
    <div className={`text-right`}>
      <p className={`text-lg font-black ${color}`}>{score}%</p>
      <p className={`text-[9px] uppercase font-bold tracking-widest ${color}`}>{level}</p>
    </div>
  );
}

function CompletionRing({ pct, confirmed, total }: { pct: number; confirmed: number; total: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="performance-meter flex-1">
        <div className="performance-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[10px] font-mono text-white/30 shrink-0">{confirmed}/{total}</span>
    </div>
  );
}

const FALLBACK_MUST_HAVES: RequirementItem[] = [
  { id: '1', label: 'Responsive homepage with hero section', type: 'must_have', confirmed: true, source: 'interview' },
  { id: '2', label: 'Services / menu page with pricing', type: 'must_have', confirmed: true, source: 'interview' },
  { id: '3', label: 'Contact form with email notification', type: 'must_have', confirmed: true, source: 'interview' },
  { id: '4', label: 'Mobile-first responsive design', type: 'must_have', confirmed: true, source: 'inferred' },
  { id: '5', label: 'On-page SEO (meta tags, headings)', type: 'must_have', confirmed: false, source: 'pending' },
];

const FALLBACK_NICE_TO_HAVES: RequirementItem[] = [
  { id: '6', label: 'Online booking / reservation system', type: 'nice_to_have', confirmed: true, source: 'interview' },
  { id: '7', label: 'Instagram feed integration', type: 'nice_to_have', confirmed: false, source: 'pending' },
  { id: '8', label: 'Google Maps embed', type: 'nice_to_have', confirmed: true, source: 'interview' },
  { id: '9', label: 'Customer testimonials carousel', type: 'nice_to_have', confirmed: false, source: 'pending' },
];

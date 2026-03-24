"use client";

import React from "react";

/**
 * Priority 16+: Analytics & Reporting Engine (§19)
 * §19 Agency Health Dashboard: Utilization rates, sentiment tracking,
 * conversion attribution, and internal load balancing metrics.
 */
export default function AnalyticsPage() {
  return (
    <div className="space-y-10">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Agency Analytics §19</h2>
        <p className="text-white/40 mt-1">Revenue Intelligence · Conversion Attribution · Sentiment</p>
      </header>

      {/* Revenue KPIs */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { label: 'Monthly Revenue', value: '$12,400', trend: '+18%', color: 'text-green-400' },
          { label: 'Active Projects', value: '7', trend: '+2', color: 'text-primary' },
          { label: 'Pipeline Value', value: '$34,200', trend: '+$8.4k', color: 'text-green-400' },
          { label: 'Client Sentiment', value: '94%', trend: 'Positive', color: 'text-secondary' },
        ].map((kpi, i) => (
          <div key={i} className="glass-panel p-6 bg-white/[0.02]">
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{kpi.label}</p>
            <p className="text-2xl font-black mt-2">{kpi.value}</p>
            <p className={`text-[11px] font-bold mt-1 ${kpi.color}`}>{kpi.trend}</p>
          </div>
        ))}
      </div>

      {/* Conversion Funnel */}
      <section className="glass-panel p-8 bg-black/30">
        <h3 className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-6">Conversion Funnel §19</h3>
        <div className="space-y-4">
          {[
            { stage: 'Leads Captured', count: 42, pct: 100 },
            { stage: 'Requirements Extracted (§31)', count: 28, pct: 67 },
            { stage: 'Demos Generated (§10)', count: 18, pct: 43 },
            { stage: 'Proposals Sent (§11)', count: 12, pct: 29 },
            { stage: 'Contracts Signed', count: 7, pct: 17 },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-48 text-sm text-white/60">{step.stage}</div>
              <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary/60 to-primary/20 rounded-full transition-all duration-1000" style={{ width: `${step.pct}%` }}></div>
              </div>
              <div className="w-16 text-right text-sm font-bold font-mono">{step.count}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Department Load */}
      <section className="glass-panel p-8 bg-black/30">
        <h3 className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-6">Department Utilization §19</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { dept: 'Commercial', load: 78, tasks: 34 },
            { dept: 'Design', load: 92, tasks: 21 },
            { dept: 'Development', load: 85, tasks: 47 },
            { dept: 'Marketing', load: 45, tasks: 12 },
            { dept: 'QA', load: 62, tasks: 19 },
            { dept: 'Strategy', load: 38, tasks: 8 },
          ].map((d, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex justify-between items-center">
                <p className="text-sm font-bold">{d.dept}</p>
                <p className={`text-[10px] font-black ${d.load > 80 ? 'text-red-400' : d.load > 60 ? 'text-yellow-400' : 'text-green-400'}`}>{d.load}%</p>
              </div>
              <div className="mt-2 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${d.load > 80 ? 'bg-red-500/60' : d.load > 60 ? 'bg-yellow-500/60' : 'bg-green-500/60'}`} style={{ width: `${d.load}%` }}></div>
              </div>
              <p className="text-[10px] text-white/20 mt-1 font-mono">{d.tasks} tasks this week</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

"use client";

import React from "react";

/**
 * Priority 10: Smart Market-Aware UI Component Intelligence (§32)
 * §32 Component Market Index Browser: Live explorer for all discovered
 * UI components with trend scores, source attribution, and usage stats.
 */
export default function ComponentsPage() {
  const mockComponents = [
    { name: 'Apple Cards Carousel', source: '21st.dev', score: 91, category: 'Hero', license: 'MIT', size: '8.2KB', status: 'adopt' },
    { name: 'Glassmorphism Pricing Table', source: 'HyperUI', score: 87, category: 'Pricing', license: 'MIT', size: '4.1KB', status: 'adopt' },
    { name: 'Animated Beam', source: 'React Bits', score: 84, category: 'Decoration', license: 'MIT', size: '2.3KB', status: 'adopt' },
    { name: 'Data Chart Grid', source: 'Tremor', score: 79, category: 'Dashboard', license: 'Apache-2.0', size: '12.4KB', status: 'trial' },
    { name: 'Minimal FAQ Accordion', source: 'shadcn/ui', score: 76, category: 'FAQ', license: 'MIT', size: '3.1KB', status: 'trial' },
    { name: 'Bootstrap Card Grid', source: 'Bootstrap', score: 38, category: 'Grid', license: 'MIT', size: '18.7KB', status: 'archived' },
  ];

  return (
    <div className="space-y-10">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Component Market Index §32</h2>
          <p className="text-white/40 mt-1">Live UI Component Intelligence · Trend Scoring · Smart Selection</p>
        </div>
        <button className="bg-primary px-6 py-2.5 text-sm font-bold rounded-xl shadow-lg shadow-primary/20">Trigger Scan</button>
      </header>

      {/* Score Legend */}
      <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest">
        <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400"></span> Adopt (80+)</span>
        <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-400"></span> Trial (50-79)</span>
        <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-400"></span> Archived (&lt;40)</span>
      </div>

      {/* Component Grid */}
      <div className="grid grid-cols-3 gap-5">
        {mockComponents.map((comp, i) => (
          <div key={i} className={`glass-panel p-6 bg-white/[0.02] border ${comp.status === 'adopt' ? 'border-green-500/10' : comp.status === 'archived' ? 'border-red-500/10 opacity-50' : 'border-white/5'} hover:border-primary/20 transition-all group`}>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-sm">{comp.name}</h4>
                <p className="text-[10px] text-white/30 mt-0.5">{comp.source} · {comp.category}</p>
              </div>
              <div className={`text-lg font-black ${comp.score >= 80 ? 'text-green-400' : comp.score >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                {comp.score}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[10px] text-white/20 font-mono">
              <span>{comp.license}</span>
              <span>{comp.size}</span>
              <span className={`uppercase font-black tracking-widest ${comp.status === 'adopt' ? 'text-green-500' : comp.status === 'archived' ? 'text-red-500' : 'text-yellow-500'}`}>{comp.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Scoring Dimensions */}
      <section className="glass-panel p-8 bg-black/30">
        <h3 className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-6">8-Dimension Scoring Engine §32</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { dim: 'Modernity', weight: '15%' },
            { dim: 'Popularity', weight: '15%' },
            { dim: 'Accessibility', weight: '15%' },
            { dim: 'Performance', weight: '15%' },
            { dim: 'Design Quality', weight: '15%' },
            { dim: 'Compatibility', weight: '10%' },
            { dim: 'Licensing', weight: '10%' },
            { dim: 'Community Health', weight: '5%' },
          ].map((d, i) => (
            <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-center">
              <p className="text-xs font-bold">{d.dim}</p>
              <p className="text-[10px] text-primary font-mono mt-1">{d.weight}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

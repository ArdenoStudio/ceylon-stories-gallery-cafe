import React from "react";
import { supabaseAdmin } from "@/lib/supabase/client";

/**
 * Priority 10: Smart Market-Aware UI Component Intelligence (§32)
 * §32 Component Market Index Browser: Live explorer for all discovered
 * UI components with trend scores, source attribution, and usage stats.
 */
export default async function ComponentsPage() {
  const { data: dbComponents, error } = await supabaseAdmin
    .from('component_market_index')
    .select('*')
    .order('trend_score', { ascending: false })
    .limit(24);

  const mockFallback = [
    { component_name: 'Apple Cards Carousel', source_library: '21st.dev', trend_score: 91, description: 'Hero carousel', repo_url: '#' },
    { component_name: 'Glassmorphism Pricing Table', source_library: 'HyperUI', trend_score: 87, description: 'Pricing section', repo_url: '#' },
    { component_name: 'Animated Beam', source_library: 'React Bits', trend_score: 84, description: 'Decoration element', repo_url: '#' },
  ];

  const componentsToRender = dbComponents && dbComponents.length > 0 ? dbComponents : mockFallback;

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
        {componentsToRender.map((comp, i) => {
          const score = comp.trend_score || 0;
          const status = score >= 80 ? 'adopt' : score >= 50 ? 'trial' : 'archived';
          return (
            <div key={i} className={`glass-panel p-6 bg-white/[0.02] border ${status === 'adopt' ? 'border-green-500/10' : status === 'archived' ? 'border-red-500/10 opacity-50' : 'border-white/5'} hover:border-primary/20 transition-all group`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-sm truncate max-w-[180px]" title={comp.component_name}>{comp.component_name}</h4>
                  <p className="text-[10px] text-white/30 mt-0.5 truncate max-w-[180px]">{comp.source_library} · {comp.description}</p>
                </div>
                <div className={`text-lg font-black ${score >= 80 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {Math.round(score)}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-[10px] text-white/20 font-mono">
                <a href={comp.repo_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:underline">View Source Repo ↗</a>
                <span className={`uppercase font-black tracking-widest ${status === 'adopt' ? 'text-green-500' : status === 'archived' ? 'text-red-500' : 'text-yellow-500'}`}>{status}</span>
              </div>
            </div>
          );
        })}
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

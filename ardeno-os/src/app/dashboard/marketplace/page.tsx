import React from "react";
import { supabaseAdmin } from "@/lib/supabase/client";

/**
 * Priority 21+: Strategic UI Layer (§1)
 * §41 Agent & Skill Marketplace UI: B2B Skill Publishing and Procurement.
 * Displays available Section 41 listings for one-click installation into the OS.
 */
export default async function MarketplaceDashboard() {
  const { data: dbListings } = await supabaseAdmin
    .from('marketplace_listings')
    .select(`
      id,
      price_cent,
      is_verified,
      skills_registry (
        skill_name,
        department,
        description
      )
    `)
    .limit(20);

  const fallbackListings = [
    { title: 'Real Estate Sales Pro', type: 'Graph', provider: 'Ardeno Core', price: '$499', rating: 4.9, tags: ['CRM', 'Sales', 'Real Estate'] },
    { title: 'Sentiment Audit Bot', type: 'Skill', provider: 'MiroFish Labs', price: 'Free', rating: 4.7, tags: ['NLP', 'Compliant', 'Brand'] },
    { title: 'Vercel Deployment Shield', type: 'Resilience', provider: 'Ardeno Core', price: '$1,200', rating: 5.0, tags: ['DevOps', 'Hardening'] },
    { title: 'Lead Scraper Pro', type: 'Browser', provider: 'Sentient Swarm', price: '$150/mo', rating: 4.8, tags: ['Automation', 'Leads'] },
  ];

  const listings = dbListings && dbListings.length > 0 
    ? dbListings.map(l => ({
        id: l.id,
        title: (l.skills_registry as any)?.skill_name || 'Unknown Skill',
        type: (l.skills_registry as any)?.department || 'Skill',
        provider: 'Community Tenant',
        price: l.price_cent === 0 ? 'Free' : `$${(l.price_cent / 100).toFixed(2)}`,
        rating: 5.0,
        tags: [l.is_verified ? 'Verified' : 'Community', 'Installable']
      }))
    : fallbackListings;

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Agent & Skill Marketplace §41</h2>
          <p className="text-white/40 mt-1">B2B Discovery, Procurement, and Skill Installation.</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-white/10 glass-panel px-6 py-2.5 text-sm font-bold rounded-xl hover:bg-white/20 transition-all">My Published Skills</button>
           <button className="bg-primary px-6 py-2.5 text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">Publish New Skill</button>
        </div>
      </header>

      {/* List Search §41 */}
      <div className="flex gap-4 p-2 bg-white/5 border border-white/5 rounded-2xl">
         <div className="flex-1 px-4 py-2 flex items-center gap-4">
            <span className="text-white/40 text-xl">🔍</span>
            <input type="text" placeholder="Search for specialized agent graphs or critic rubrics..." className="bg-transparent border-none focus:outline-none text-sm w-full" />
         </div>
      </div>

      {/* Marketplace Grid §41 */}
      <div className="grid grid-cols-2 gap-8">
         {listings.map((l: any, i) => (
           <div key={l.id || i} className="glass-panel p-10 bg-[#0a0a0a]/60 hover:bg-[#111] transition-all group flex flex-col justify-between">
              <div>
                 <div className="flex justify-between items-start mb-6">
                    <div>
                       <h4 className="font-bold text-xl mb-1 group-hover:text-primary transition-colors">{l.title}</h4>
                       <p className="text-[10px] text-white/30 uppercase tracking-widest">{l.type} • {l.provider}</p>
                    </div>
                    <span className="text-sm font-black text-primary">{l.price}</span>
                 </div>

                 <div className="flex gap-2 mb-6">
                    {l.tags.map((t: string) => (
                       <span key={t} className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-tighter ${t === 'Verified' ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/40'}`}>{t}</span>
                    ))}
                 </div>
              </div>

              <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/5">
                 <div className="flex items-center gap-2">
                    <span className="text-primary">★</span>
                    <span className="text-[11px] font-bold text-white/80">{l.rating}</span>
                 </div>
                 <button className="bg-white/5 px-4 py-2 rounded-lg text-[10px] uppercase font-bold tracking-widest hover:bg-primary hover:text-white transition-all">Install Now</button>
              </div>
           </div>
        ))}
      </div>
    </div>
  );
}

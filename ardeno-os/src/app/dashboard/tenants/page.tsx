import React from "react";

/**
 * Priority 21+: Strategic UI Layer (§1)
 * §37 Agency Tenants View: White-label SaaS & Multi-Tenant Management.
 * Manages Section 37 isolation and Section 11 client lifecycle.
 */
export default function TenantsDashboard() {
  const tenants = [
    { id: '1', name: 'Elite Real Estate Ltd.', slug: 'elite-re', plan: 'Enterprise', quota: '4.5M/10M', status: 'Active' },
    { id: '2', name: 'Urban Kitchen Group', slug: 'urban-k', plan: 'Pro', quota: '890K/1M', status: 'Active' },
    { id: '3', name: 'Lanka Motion Expos', slug: 'motion', plan: 'Free', quota: '12K/100K', status: 'Pending' },
  ];

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Agency Tenants §37</h2>
          <p className="text-white/40 mt-1">Multi-Tenant Isolation & Section 11 Onboarding.</p>
        </div>
        <button className="bg-white/10 glass-panel px-6 py-2.5 text-sm font-bold rounded-xl hover:bg-white/20 transition-all">+ Add New Tenant</button>
      </header>

      {/* Tenant Grid §37 */}
      <div className="grid grid-cols-1 gap-6">
        {tenants.map(t => (
           <div key={t.id} className="glass-panel p-8 bg-[#0a0a0a]/60 hover:bg-[#111] transition-colors group">
              <div className="flex justify-between items-center">
                 <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center font-bold text-xl group-hover:bg-primary/20 transition-colors">
                       {t.name[0]}
                    </div>
                    <div>
                       <h4 className="font-bold text-xl">{t.name}</h4>
                       <p className="text-[11px] text-white/30 uppercase tracking-widest">{t.slug}.ardeno.os</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-12 text-right">
                    <div>
                       <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-1">Plan Tier</p>
                       <span className={`text-sm font-black ${t.plan === 'Enterprise' ? 'text-primary' : t.plan === 'Pro' ? 'text-secondary' : 'text-white'}`}>{t.plan}</span>
                    </div>
                    <div>
                       <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-1">Quota Usage</p>
                       <span className="text-sm font-mono text-white/80">{t.quota}</span>
                    </div>
                    <div className="flex flex-col items-end">
                       <span className={`px-3 py-1 text-[10px] rounded-full uppercase font-black ${t.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary animate-pulse'}`}>
                          {t.status}
                       </span>
                    </div>
                 </div>
              </div>

              {/* White-Label Settings §37 */}
              <div className="mt-8 pt-8 border-t border-white/5 flex gap-8">
                 <button className="text-[10px] uppercase font-bold tracking-widest text-white/30 hover:text-white">Branding Settings</button>
                 <button className="text-[10px] uppercase font-bold tracking-widest text-white/30 hover:text-white">API Keys</button>
                 <button className="text-[10px] uppercase font-bold tracking-widest text-white/30 hover:text-white">Manage Billing</button>
                 <button className="text-[10px] uppercase font-bold tracking-widest text-white/30 hover:text-white text-red-500/50 hover:text-red-500">Deactivate</button>
              </div>
           </div>
        ))}
      </div>
    </div>
  );
}

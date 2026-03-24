import React from "react";
import Link from "next/link";

/**
 * Priority 21+: Strategic UI Layer (§1)
 * §1 Agency Dashboard Layout: Sentient Sidebar with premium glassmorphism.
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#050505] text-white">
      {/* Sentient Sidebar §3 */}
      <aside className="w-72 h-full flex flex-col border-r border-white/5 bg-glass backdrop-blur-3xl">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gradient">Ardeno OS</h1>
          <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">MiroFish x Sentient Agency v4.4</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <SidebarItem href="/dashboard" label="Sentient Stream" icon="🌊" />
          <SidebarItem href="/dashboard/tenants" label="Agency Tenants" icon="🏗️" />
          <SidebarItem href="/dashboard/health" label="LLM Health" icon="🧠" />
          <SidebarItem href="/dashboard/marketplace" label="Skill Market" icon="🛒" />
          <SidebarItem href="/dashboard/analytics" label="Live ROI" icon="📈" />
        </nav>

        <div className="p-8 space-y-4">
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-[10px] text-primary uppercase font-bold tracking-tighter">System Pulse</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-primary sentient-node"></div>
              <span className="text-sm font-medium">99.4% Efficiency</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Command Center §3 */}
      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#050505] to-[#0a0a0a] p-10">
        {children}
      </main>
    </div>
  );
}

function SidebarItem({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-sm font-medium text-white/60 hover:text-white group"
    >
      <span className="text-lg opacity-70 group-hover:scale-110 transition-transform">{icon}</span>
      {label}
    </Link>
  );
}

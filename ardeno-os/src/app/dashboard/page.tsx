import React from "react";
import SentientStream from "@/components/dashboard/SentientStream";

/**
 * Priority 21+: Strategic UI Layer (§1)
 * §3 Sentient Agency Dashboard: Live Command & Control.
 * Visualizes Section 39 Complexity and Section 30 Provider Health in real-time.
 */
export default function DashboardPage() {
  return (
    <div className="space-y-12">
      {/* OS Header §1 */}
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sentient Command Center</h2>
          <p className="text-white/40 mt-1">Live Agency Orchestration & Agent Swarms</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="glass-panel px-6 py-2.5 text-sm font-semibold hover:bg-white/10">Spawn Sub-Agent</button>
          <button className="bg-primary px-6 py-2.5 text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">Deploy New Demo</button>
        </div>
      </header>

      {/* Real-Time Agency Stats §19 */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard title="Active Traces" value="124" trend="+12" unit="Graphs" />
        <StatCard title="Global ROI" value="99.4" trend="+0.4%" unit="Margin" />
        <StatCard title="Complexity Coeff" value="0.65" trend="Stable" unit="Score" />
        <StatCard title="Key Health" value="48/50" trend="Check" unit="Active" color="primary" />
      </div>

      {/* Main Orchestration View §3 */}
      <div className="grid grid-cols-3 gap-8 h-[600px]">
        {/* Sentient Stream §3 */}
        <section className="col-span-2 glass-panel p-8 flex flex-col h-full bg-[#0a0a0a]/50 border-white/5 shadow-2xl relative">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold tracking-tight text-white/50 uppercase text-[10px]">Real-Time Agent Swarm §3</h3>
             <div className="flex gap-1">
                <div className="w-1 h-3 bg-primary animate-pulse"></div>
                <div className="w-1 h-3 bg-secondary animate-pulse delay-75"></div>
                <div className="w-1 h-3 bg-white animate-pulse delay-150"></div>
             </div>
          </div>

          {/* This is the SentientStream.tsx entry point (§3 MiroFish Port) */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
             <SentientStream />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none rounded-2xl pointer-events-none"></div>
        </section>

        {/* System Logs §39 */}
        <section className="glass-panel p-8 bg-black/40 border-primary/10 overflow-hidden flex flex-col">
           <h3 className="font-bold tracking-tight text-primary uppercase text-[10px] mb-6">Security & Resilience Feed §45</h3>
           <div className="flex-1 font-mono text-[11px] text-white/40 space-y-3 overflow-y-auto">
              <p className="text-primary/70">[10:34:01] CRON: Predictive Quota Scan Complete.</p>
              <p>[10:33:45] SYSTEM: RLS Leak Detection - CLEAN (§20)</p>
              <p className="text-secondary/60">[10:33:12] DISPATCH: QStash session checkpointed (0.3s latency)</p>
              <p>[10:32:55] AUDIT: SkillEvolutionEngine auto-tuned prompt v1.2</p>
              <p className="text-red-500/80">[10:32:44] WARN: DeepSeek rate limit 429 - Rotating Pool (§30)</p>
              <p>[10:32:10] SECURITY: Red-Team attack blocked by ContextInjection (§45)</p>
           </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, unit, color = "white" }: { title: string; value: string; trend: string; unit: string; color?: string }) {
  return (
    <div className="glass-panel p-6 bg-[#0a0a0a]">
      <p className="text-[10px] uppercase font-bold tracking-widest text-white/30">{title}</p>
      <div className="flex items-baseline gap-2 mt-2">
        <h4 className={`text-3xl font-bold ${color === 'primary' ? 'text-primary' : 'text-white'}`}>{value}</h4>
        <span className="text-[10px] text-white/20 uppercase font-medium">{unit}</span>
      </div>
      <p className="text-[10px] text-primary mt-2 font-bold tracking-tighter">{trend}</p>
    </div>
  );
}

function AgentActivityItem({ agent, task, time, status }: { agent: string; task: string; time: string; status: 'success' | 'running' }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 border border-white/0 hover:border-white/5 transition-all group">
       <div className="flex items-center gap-4">
          <div className={`w-8 h-8 rounded-lg ${status === 'running' ? 'bg-primary/20 animate-pulse' : 'bg-white/5 group-hover:bg-primary/20'} flex items-center justify-center transition-colors`}>
             <span className="text-xs">{agent[0]}</span>
          </div>
          <div>
             <h5 className="font-bold text-sm">{agent} Agent</h5>
             <p className="text-[11px] text-white/40">{task}</p>
          </div>
       </div>
       <span className="text-[10px] text-white/20 font-mono italic">{time}</span>
    </div>
  );
}

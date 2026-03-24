"use client";

import React from "react";

/**
 * Priority 5: Full Observability & Self-Healing (§39)
 * §39 Trace Debugger: Full reasoning chain visualization.
 * Shows the exact prompts sent, memories recalled, Critic scores,
 * and graph state transitions for any trace_id.
 */
export default function TraceDetailPage({ params }: { params: { id: string } }) {
  // In production, this would fetch from supabase: traces, agent_checkpoints, trace_evaluations
  const mockTrace = {
    id: params.id,
    status: 'completed',
    agent: 'DemoPipeline',
    started: '22:41:03',
    duration: '4.2s',
    nodes: [
      { name: 'RequirementExtractor', status: 'completed', latency: '1.2s', criticScore: 94, model: 'gemini-2.5-pro', tokensUsed: 1847 },
      { name: 'DesignArchitect', status: 'completed', latency: '1.8s', criticScore: 91, model: 'gemini-2.5-flash', tokensUsed: 2103 },
      { name: 'ComponentSelector', status: 'completed', latency: '0.4s', criticScore: 97, model: 'groq-llama-3', tokensUsed: 512 },
      { name: 'CriticAgent', status: 'completed', latency: '0.8s', criticScore: 96, model: 'gemini-2.5-pro', tokensUsed: 890 },
    ],
    memories: ['Urban Kitchen brand extraction pattern', 'GJC aviation dark-mode preference'],
  };

  return (
    <div className="space-y-10">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase font-bold text-primary tracking-widest">Trace Inspector §39</p>
          <h2 className="text-3xl font-bold tracking-tight mt-1">Trace: {params.id.slice(0, 12)}...</h2>
        </div>
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${mockTrace.status === 'completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
          {mockTrace.status}
        </span>
      </header>

      {/* Trace Metadata */}
      <div className="grid grid-cols-4 gap-4">
        <div className="glass-panel p-5 bg-white/[0.02]">
          <p className="text-[10px] text-white/30 font-bold uppercase">Agent</p>
          <p className="text-lg font-bold mt-1">{mockTrace.agent}</p>
        </div>
        <div className="glass-panel p-5 bg-white/[0.02]">
          <p className="text-[10px] text-white/30 font-bold uppercase">Started</p>
          <p className="text-lg font-bold mt-1 font-mono">{mockTrace.started}</p>
        </div>
        <div className="glass-panel p-5 bg-white/[0.02]">
          <p className="text-[10px] text-white/30 font-bold uppercase">Duration</p>
          <p className="text-lg font-bold mt-1 font-mono">{mockTrace.duration}</p>
        </div>
        <div className="glass-panel p-5 bg-white/[0.02]">
          <p className="text-[10px] text-white/30 font-bold uppercase">Total Tokens</p>
          <p className="text-lg font-bold mt-1 font-mono">{mockTrace.nodes.reduce((s, n) => s + n.tokensUsed, 0).toLocaleString()}</p>
        </div>
      </div>

      {/* Graph Node Chain */}
      <section className="glass-panel p-8 bg-black/30">
        <h3 className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-6">Orchestration Graph §35</h3>
        <div className="space-y-4">
          {mockTrace.nodes.map((node, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all group">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary">{i + 1}</div>
              <div className="flex-1">
                <p className="font-bold text-sm">{node.name}</p>
                <p className="text-[10px] text-white/30 font-mono">{node.model} · {node.tokensUsed} tokens · {node.latency}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-black ${node.criticScore >= 90 ? 'text-green-400' : node.criticScore >= 80 ? 'text-yellow-400' : 'text-red-400'}`}>{node.criticScore}/100</p>
                <p className="text-[8px] text-white/20 uppercase tracking-widest">Critic §36</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recalled Memories */}
      <section className="glass-panel p-8 bg-black/30">
        <h3 className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-6">Recalled Memories §34</h3>
        <div className="space-y-3">
          {mockTrace.memories.map((mem, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <p className="text-sm text-white/50 italic">{mem}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

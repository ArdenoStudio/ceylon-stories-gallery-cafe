import React from 'react';
import { supabaseAdmin } from '@/lib/supabase/client';
import { notFound } from 'next/navigation';

export default async function TraceDebuggerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: traceId } = await params;

  // Fetch the trace data
  const { data: trace, error } = await supabaseAdmin
    .from('agent_traces')
    .select('id, task_type, status, metadata, created_at')
    .eq('id', traceId)
    .single();

  if (error || !trace) return notFound();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center border-b border-white/10 pb-6">
        <div>
           <div className="flex items-center gap-3 mb-2">
             <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-primary/20">
               {trace.task_type}
             </div>
             <p className="text-white/40 font-mono text-sm">ID: {trace.id}</p>
           </div>
           <h1 className="text-3xl font-bold tracking-tight">Trace Inspection: {trace.status}</h1>
        </div>
        
        {/* God Mode §39 */}
        <div className="flex items-center gap-4 bg-red-950/20 border border-red-500/20 p-4 rounded-xl">
           <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
           <p className="text-sm font-bold text-red-500/80 mr-4">System God Mode Active</p>
           <button className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg text-sm border border-white/10 transition-colors">Terminate Execution</button>
           <button className="bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 px-4 py-2 rounded-lg text-sm border border-indigo-500/20 transition-colors">Force Re-Roll</button>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8">
         <main className="col-span-2 space-y-6">
            <section className="glass-panel p-6 bg-black/40 border border-white/5">
                <h3 className="font-bold uppercase tracking-widest text-[11px] text-white/50 mb-4">Live System Prompt Engine (§13)</h3>
                <div className="bg-[#050510] border border-white/5 p-4 rounded-xl font-mono text-xs text-secondary/80 whitespace-pre-wrap overflow-auto max-h-[400px]">
                   {trace.metadata?.system_prompt || 'No system prompt recorded.'}
                </div>
            </section>
            
            <section className="glass-panel p-6 border-primary/10 bg-primary/5">
                <h3 className="font-bold uppercase tracking-widest text-[11px] text-primary/80 mb-4">LLM Output Pipeline</h3>
                <div className="bg-black/50 p-4 rounded-xl border border-primary/20 font-mono text-sm text-white/80 whitespace-pre-wrap">
                   {trace.metadata?.llm_response || trace.metadata?.output || 'Execution pending or streamed out via SentientStream...'}
                </div>
            </section>
         </main>
         
         <aside className="space-y-6">
             <div className="glass-panel p-6 bg-amber-500/5 border-amber-500/10">
                 <h3 className="font-bold uppercase tracking-widest text-[11px] text-amber-500/80 mb-2">Resource Cost (§38)</h3>
                 <div className="flex justify-between items-baseline mb-1">
                    <p className="text-sm text-white/60">Input Tokens</p>
                    <p className="font-mono text-sm">{trace.metadata?.tokens_input || 0}</p>
                 </div>
                 <div className="flex justify-between items-baseline mb-4">
                    <p className="text-sm text-white/60">Output Tokens</p>
                    <p className="font-mono text-sm text-secondary/80">{trace.metadata?.tokens_output || 0}</p>
                 </div>
                 <div className="pt-4 border-t border-amber-500/10 flex justify-between items-center">
                    <p className="text-xs font-bold text-amber-500">EST COST</p>
                    <p className="font-mono text-lg font-bold">${((trace.metadata?.tokens_input || 0) * 0.00015 + (trace.metadata?.tokens_output || 0) * 0.0006).toFixed(4)}</p>
                 </div>
             </div>
         </aside>
      </div>
    </div>
  );
}

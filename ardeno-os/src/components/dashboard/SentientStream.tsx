"use client";

import React, { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase/client";

/**
 * Priority 11: Strategic UI Layer (§1)
 * §3 Sentient Stream UI: Subscribes to Supabase Real-Time for live agency activity.
 * Visualizes the 512 agents working in a continuous glassmorphic stream.
 */
export default function SentientStream() {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    // 1. Initial Fetch §3
    const fetchActivities = async () => {
      const { data } = await supabaseClient
        .from("agent_activities")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);
      if (data) setActivities(data);
    };

    fetchActivities();

    // 2. Real-Time Subscription §3
    const channel = supabaseClient
      .channel("sentient_stream")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "agent_activities" },
        (payload: any) => {
          setActivities((prev) => [payload.new, ...prev].slice(0, 20));
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, []);

  return (
    <div className="space-y-6 flex-1 overflow-hidden relative">
      {activities.length === 0 && (
        <div className="text-white/20 italic text-xs p-4 border border-white/5 rounded-xl">
           Waiting for Sentient Pulse... (§3)
        </div>
      )}
      
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {activities.map((act) => (
          <AgentActivityItem 
            key={act.id} 
            agent={act.agent_type} 
            task={act.message} 
            time={new Date(act.created_at).toLocaleTimeString()} 
            status={act.status} 
          />
        ))}
      </div>
    </div>
  );
}

function AgentActivityItem({ agent, task, time, status }: { agent: string; task: string; time: string; status: 'success' | 'running' | 'completed' | 'failed' }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 border border-white/0 hover:border-white/5 transition-all group mb-4">
       <div className="flex items-center gap-4">
          <div className={`w-8 h-8 rounded-lg ${status === 'running' ? 'bg-primary/20 animate-pulse border border-primary/20' : status === 'failed' ? 'bg-red-500/20 border border-red-500/20' : 'bg-white/5 group-hover:bg-primary/20'} flex items-center justify-center transition-colors shadow-inner`}>
             <span className="text-[10px] font-black uppercase text-white/50">{agent[0]}</span>
          </div>
          <div className="max-w-[300px]">
             <h5 className="font-bold text-sm tracking-tight capitalize">{agent} Agent</h5>
             <p className="text-[11px] text-white/40 truncate">{task}</p>
          </div>
       </div>
       <div className="text-right">
          <p className="text-[10px] text-white/20 font-mono italic">{time}</p>
          <span className={`text-[8px] font-black uppercase tracking-widest ${status === 'completed' ? 'text-green-500' : status === 'failed' ? 'text-red-500 font-bold' : 'text-primary'}`}>{status}</span>
       </div>
    </div>
  );
}

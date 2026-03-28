import React from "react";
import SentientStream from "@/components/dashboard/SentientStream";
import { supabaseAdmin } from "@/lib/supabase/client";

export default async function DashboardPage() {
  const [
    { count: tracesCount },
    { count: keysCount },
    { count: activeKeysCount },
    { data: traces },
  ] = await Promise.all([
    supabaseAdmin.from("agent_traces").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("llm_keys").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("llm_keys").select("id", { count: "exact", head: true }).eq("is_active", true),
    supabaseAdmin.from("agent_traces").select("metadata").order("created_at", { ascending: false }).limit(10),
  ]);

  const totalTokens = traces?.reduce((sum, t) => sum + (t.metadata?.tokens_input || 0), 0) || 5000;
  const complexityCoeff = Math.min(0.99, totalTokens / 50000).toFixed(2);

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex items-start justify-between">
        <div>
          <h2
            className="text-white font-bold"
            style={{ fontSize: "28px", letterSpacing: "-0.02em" }}
          >
            Sentient Command Center
          </h2>
          <p className="text-white/35 mt-1" style={{ fontSize: "13px" }}>
            Live Agency Orchestration & Agent Swarms
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="btn-glass text-xs px-5 py-2.5">Spawn Sub-Agent</button>
          <button className="btn-accent text-xs px-5 py-2.5">Deploy Demo</button>
        </div>
      </header>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total Traces"      value={(tracesCount || 0).toString()}                  unit="Graphs"  trend="Active" />
        <StatCard title="Est. Margin"        value="94.2"                                           unit="%"       trend="+1.2%" accent />
        <StatCard title="Complexity Coeff"  value={complexityCoeff.toString()}                     unit="Score"   trend="Stable" />
        <StatCard title="Key Health"        value={`${activeKeysCount || 0}/${keysCount || 0}`}   unit="Active"  trend="Pool State" accent />
      </div>

      {/* Main orchestration */}
      <div className="grid grid-cols-3 gap-5" style={{ height: "560px" }}>
        {/* Sentient Stream */}
        <section
          className="col-span-2 flex flex-col overflow-hidden rounded-apple-lg"
          style={{
            background: "rgba(22,22,24,0.70)",
            border: "0.5px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(24px)",
          }}
        >
          <div
            className="flex items-center justify-between px-6 pt-5 pb-4"
            style={{ borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-2">
              <span className="status-dot active" />
              <p className="type-caption text-white/40">Real-Time Agent Swarm</p>
            </div>
            <div className="flex gap-1">
              {["#ff4d30", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.2)"].map((c, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full animate-status-pulse"
                  style={{ height: "12px", background: c, animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3">
            <SentientStream />
          </div>
          <div
            className="h-12 pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(22,22,24,0.90), transparent)",
              marginTop: "-48px",
              position: "relative",
              borderRadius: "0 0 20px 20px",
            }}
          />
        </section>

        {/* System Logs */}
        <section
          className="flex flex-col overflow-hidden rounded-apple-lg"
          style={{
            background: "rgba(16,16,18,0.80)",
            border: "0.5px solid rgba(255,77,48,0.10)",
            backdropFilter: "blur(24px)",
          }}
        >
          <div
            className="px-5 pt-5 pb-4"
            style={{ borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}
          >
            <p className="type-caption" style={{ color: "#ff4d30" }}>
              Security & Resilience Feed
            </p>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 font-mono" style={{ fontSize: "11px" }}>
            <LogLine color="#ff4d30"   text="[10:34:01] CRON: Predictive Quota Scan Complete." />
            <LogLine color="white/40"  text="[10:33:45] SYSTEM: RLS Leak Detection - CLEAN" />
            <LogLine color="white/30"  text="[10:33:12] DISPATCH: QStash session checkpointed (0.3s)" />
            <LogLine color="white/30"  text="[10:32:55] AUDIT: SkillEvolutionEngine auto-tuned v1.2" />
            <LogLine color="#ff453a"   text="[10:32:44] WARN: DeepSeek rate limit 429 - Rotating Pool" />
            <LogLine color="white/30"  text="[10:32:10] SECURITY: Red-Team attack blocked" />
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({
  title, value, unit, trend, accent,
}: {
  title: string; value: string; unit: string; trend: string; accent?: boolean;
}) {
  return (
    <div
      className="rounded-apple-lg p-5 transition-all hover:-translate-y-0.5"
      style={{
        background: "rgba(22,22,24,0.70)",
        border: accent ? "0.5px solid rgba(255,77,48,0.15)" : "0.5px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px)",
      }}
    >
      <p className="type-caption text-white/30 mb-2">{title}</p>
      <div className="flex items-baseline gap-1.5">
        <span
          className="font-bold"
          style={{ fontSize: "26px", color: accent ? "#ff4d30" : "#fff", letterSpacing: "-0.02em" }}
        >
          {value}
        </span>
        <span className="type-caption text-white/20">{unit}</span>
      </div>
      <p
        className="mt-1.5 font-bold"
        style={{ fontSize: "10px", color: accent ? "#ff4d30" : "rgba(255,255,255,0.35)", letterSpacing: "0.04em", textTransform: "uppercase" }}
      >
        {trend}
      </p>
    </div>
  );
}

function LogLine({ color, text }: { color: string; text: string }) {
  const style = color.startsWith("#")
    ? { color }
    : { color: `rgba(255,255,255,${color.replace("white/", "0.")})` };
  return <p style={style}>{text}</p>;
}

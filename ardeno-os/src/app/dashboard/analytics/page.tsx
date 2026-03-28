import React from "react";
import { supabaseAdmin } from "@/lib/supabase/client";

export default async function AnalyticsPage() {
  const { data: predictions } = await supabaseAdmin
    .from("predictions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  const { count: activeProjects } = await supabaseAdmin
    .from("agent_traces")
    .select("id", { count: "exact", head: true })
    .eq("task_type", "Ardeno Studio Client Demo");

  const { count: totalTraces } = await supabaseAdmin
    .from("agent_traces")
    .select("id", { count: "exact", head: true });

  const avgROI =
    predictions && predictions.length > 0
      ? (predictions.reduce((acc, p) => acc + (p.confidence_score || 0), 0) / predictions.length * 100).toFixed(1)
      : "94.0";

  const kpis = [
    { label: "Forecasted ROI",    value: `${avgROI}%`,                        trend: "Active",  color: "#30d158" },
    { label: "Deployed Demos",    value: (activeProjects || 0).toString(),    trend: "Live",    color: "#ff4d30" },
    { label: "Pipeline Activity", value: (totalTraces || 0).toString(),       trend: "Traces",  color: "#30d158" },
    { label: "Client Sentiment",  value: "Positive",                          trend: "Verified", color: "rgba(255,255,255,0.60)" },
  ];

  const funnelSteps = [
    { stage: "Leads Captured",           count: 42, pct: 100 },
    { stage: "Requirements Extracted",   count: 28, pct: 67 },
    { stage: "Demos Generated",          count: 18, pct: 43 },
    { stage: "Proposals Sent",           count: 12, pct: 29 },
    { stage: "Contracts Signed",         count: 7,  pct: 17 },
  ];

  const departments = [
    { dept: "Commercial",   load: 78 },
    { dept: "Design",       load: 92 },
    { dept: "Development",  load: 85 },
    { dept: "Marketing",    load: 45 },
    { dept: "QA",           load: 62 },
    { dept: "Strategy",     load: 38 },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h2 className="font-bold text-white" style={{ fontSize: "28px", letterSpacing: "-0.02em" }}>
          Agency Analytics
        </h2>
        <p className="text-white/35 mt-1" style={{ fontSize: "13px" }}>
          Revenue Intelligence · Conversion Attribution · Sentiment
        </p>
      </header>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <div
            key={i}
            className="rounded-apple-lg p-5 transition-all hover:-translate-y-0.5"
            style={{
              background: "rgba(22,22,24,0.70)",
              border: "0.5px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(20px)",
            }}
          >
            <p className="type-caption text-white/25 mb-2">{k.label}</p>
            <p className="font-bold text-white" style={{ fontSize: "24px", letterSpacing: "-0.02em" }}>
              {k.value}
            </p>
            <p className="type-caption mt-1.5 font-bold" style={{ color: k.color }}>
              {k.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Conversion Funnel */}
      <section
        className="rounded-apple-lg p-6"
        style={{
          background: "rgba(22,22,24,0.65)",
          border: "0.5px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(20px)",
        }}
      >
        <p className="type-caption text-white/30 mb-5">Conversion Funnel</p>
        <div className="space-y-3.5">
          {funnelSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="text-white/50" style={{ fontSize: "12px", width: "180px", flexShrink: 0 }}>
                {step.stage}
              </div>
              <div
                className="flex-1 overflow-hidden rounded-full"
                style={{ height: "4px", background: "rgba(255,255,255,0.05)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${step.pct}%`, background: "linear-gradient(90deg, #ff4d30 0%, rgba(255,77,48,0.30) 100%)" }}
                />
              </div>
              <span className="font-mono font-bold text-white/60" style={{ fontSize: "12px", width: "28px", textAlign: "right" }}>
                {step.count}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Department Utilization */}
      <section
        className="rounded-apple-lg p-6"
        style={{
          background: "rgba(22,22,24,0.65)",
          border: "0.5px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(20px)",
        }}
      >
        <p className="type-caption text-white/30 mb-5">Department Utilization</p>
        <div className="grid grid-cols-3 gap-3">
          {departments.map((d, i) => {
            const color = d.load > 80 ? "#ff453a" : d.load > 60 ? "#ffd60a" : "#30d158";
            return (
              <div
                key={i}
                className="rounded-apple p-3.5"
                style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/70" style={{ fontSize: "12px", fontWeight: 600 }}>
                    {d.dept}
                  </span>
                  <span className="font-black" style={{ fontSize: "11px", color }}>{d.load}%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${d.load}%`, background: color }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

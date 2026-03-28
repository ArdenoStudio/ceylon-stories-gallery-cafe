import React from "react";
import { supabaseAdmin } from "@/lib/supabase/client";

export default async function LLMQuotaDashboard() {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString();

  const { data: recentTraces } = await supabaseAdmin
    .from("traces")
    .select("agent_id, input_tokens, output_tokens, created_at")
    .gt("created_at", oneDayAgo);

  const traces = recentTraces ?? [];

  const providerStats: Record<string, { tokens12h: number; tokens24h: number }> = {};
  for (const t of traces) {
    const provider = (t.agent_id ?? "unknown").split("-")[0];
    if (!providerStats[provider]) providerStats[provider] = { tokens12h: 0, tokens24h: 0 };
    const total = (t.input_tokens ?? 0) + (t.output_tokens ?? 0);
    providerStats[provider].tokens24h += total;
    if (t.created_at >= twelveHoursAgo) providerStats[provider].tokens12h += total;
  }

  const totalTokens24h = traces.reduce((s, t) => s + (t.input_tokens ?? 0) + (t.output_tokens ?? 0), 0);
  const burnRatePerHour = Math.round(totalTokens24h / 24);

  const FREE_TIER_LIMITS: Record<string, number> = {
    gemini: 1_000_000, groq: 500_000, deepseek: 400_000, mistral: 200_000, cerebras: 300_000,
  };

  let providers = Object.entries(providerStats).map(([name, stats]) => {
    const limit = FREE_TIER_LIMITS[name.toLowerCase()] ?? 250_000;
    const usedPct = Math.min(100, Math.round((stats.tokens24h / limit) * 100));
    const runwayHours = burnRatePerHour > 0 ? Math.round((limit - stats.tokens24h) / (burnRatePerHour / 6)) : 999;
    return { name, ...stats, limit, usedPct, runwayHours };
  });

  if (providers.length === 0) {
    ["Gemini", "Groq", "DeepSeek", "Mistral"].forEach((name) => {
      providers.push({ name, tokens12h: 0, tokens24h: 0, limit: FREE_TIER_LIMITS[name.toLowerCase()] ?? 250_000, usedPct: 0, runwayHours: 999 });
    });
  }

  const criticalProviders = providers.filter((p) => p.usedPct >= 80);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Burn Rate / Hour",   value: `${burnRatePerHour.toLocaleString()} tokens`, warn: burnRatePerHour > 50000 },
          { label: "Total (24h)",        value: `${(totalTokens24h / 1000).toFixed(1)}K tokens`, warn: false },
          { label: "Critical Providers", value: `${criticalProviders.length} / ${providers.length}`, warn: criticalProviders.length > 0 },
        ].map((s, i) => (
          <div
            key={i}
            className="rounded-apple p-4"
            style={{ background: "rgba(22,22,24,0.70)", border: "0.5px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)" }}
          >
            <p className="type-caption text-white/25 mb-1">{s.label}</p>
            <p
              className="font-bold"
              style={{ fontSize: "15px", color: s.warn ? "#ffd60a" : "#30d158" }}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Provider Bars */}
      <div className="grid grid-cols-2 gap-3">
        {providers.map((p) => {
          const barColor = p.usedPct >= 80 ? "#ff453a" : p.usedPct >= 50 ? "#ffd60a" : "#ff4d30";
          const badgeColor = p.usedPct >= 80 ? "#ff453a" : p.usedPct >= 50 ? "#ffd60a" : "#30d158";
          return (
            <div
              key={p.name}
              className="rounded-apple-lg p-4"
              style={{ background: "rgba(22,22,24,0.70)", border: "0.5px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold capitalize text-white" style={{ fontSize: "13px" }}>{p.name}</h4>
                  <p className="type-caption text-white/25 mt-0.5">
                    {(p.tokens24h / 1000).toFixed(1)}K / {(p.limit / 1000).toFixed(0)}K tokens
                  </p>
                </div>
                <span
                  className="text-[9px] px-2 py-0.5 rounded-full font-black uppercase"
                  style={{ background: `${badgeColor}15`, color: badgeColor }}
                >
                  {p.usedPct}% used
                </span>
              </div>

              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${p.usedPct}%`, background: barColor }} />
              </div>

              <div className="flex justify-between mt-2 font-mono text-white/25" style={{ fontSize: "10px" }}>
                <span>12h: {(p.tokens12h / 1000).toFixed(1)}K</span>
                <span>Runway: {p.runwayHours >= 999 ? "∞" : `~${p.runwayHours}h`}</span>
              </div>
            </div>
          );
        })}
      </div>

      {criticalProviders.length > 0 && (
        <div
          className="rounded-apple p-3.5"
          style={{ background: "rgba(255,69,58,0.06)", border: "0.5px solid rgba(255,69,58,0.20)" }}
        >
          <p style={{ fontSize: "11px", color: "#ff453a", fontWeight: 600 }}>
            ⚠ {criticalProviders.map((p) => p.name).join(", ")} approaching quota limit — KeyRotator will auto-failover.
          </p>
        </div>
      )}
    </div>
  );
}

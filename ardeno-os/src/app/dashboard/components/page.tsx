import React from "react";
import { supabaseAdmin } from "@/lib/supabase/client";

export default async function ComponentsPage() {
  const { data: dbComponents } = await supabaseAdmin
    .from("component_market_index")
    .select("*")
    .order("trend_score", { ascending: false })
    .limit(24);

  const fallback = [
    { component_name: "Apple Cards Carousel",       source_library: "21st.dev",   trend_score: 91, description: "Hero carousel" },
    { component_name: "Glassmorphism Pricing Table", source_library: "HyperUI",    trend_score: 87, description: "Pricing section" },
    { component_name: "Animated Beam",              source_library: "React Bits",  trend_score: 84, description: "Decoration element" },
    { component_name: "Spotlight Card",             source_library: "Aceternity",  trend_score: 80, description: "Interactive card" },
    { component_name: "Dock Navigation",            source_library: "21st.dev",   trend_score: 76, description: "macOS dock clone" },
    { component_name: "Liquid Gradient",            source_library: "GSAP",        trend_score: 55, description: "Animated bg" },
  ];

  const components = dbComponents && dbComponents.length > 0 ? dbComponents : fallback;

  const dimensions = [
    { dim: "Modernity",        weight: "15%" },
    { dim: "Popularity",       weight: "15%" },
    { dim: "Accessibility",    weight: "15%" },
    { dim: "Performance",      weight: "15%" },
    { dim: "Design Quality",   weight: "15%" },
    { dim: "Compatibility",    weight: "10%" },
    { dim: "Licensing",        weight: "10%" },
    { dim: "Community Health", weight: "5%" },
  ];

  return (
    <div className="space-y-8">
      <header className="flex items-start justify-between">
        <div>
          <h2 className="font-bold text-white" style={{ fontSize: "28px", letterSpacing: "-0.02em" }}>
            Component Market Index
          </h2>
          <p className="text-white/35 mt-1" style={{ fontSize: "13px" }}>
            Live UI Component Intelligence · Trend Scoring · Smart Selection
          </p>
        </div>
        <button className="btn-accent text-xs px-5 py-2.5">Trigger Scan</button>
      </header>

      {/* Legend */}
      <div className="flex gap-5 text-[10px] font-bold uppercase tracking-widest">
        {[
          { label: "Adopt (80+)", color: "#30d158" },
          { label: "Trial (50-79)", color: "#ffd60a" },
          { label: "Archived (<40)", color: "#ff453a" },
        ].map((l) => (
          <span key={l.label} className="flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.40)" }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: l.color }} />
            {l.label}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-3">
        {components.map((comp, i) => {
          const score = comp.trend_score || 0;
          const status = score >= 80 ? "adopt" : score >= 50 ? "trial" : "archived";
          const scoreColor = score >= 80 ? "#30d158" : score >= 50 ? "#ffd60a" : "#ff453a";
          const borderColor =
            score >= 80 ? "rgba(48,209,88,0.12)" :
            score < 40  ? "rgba(255,69,58,0.10)" :
            "rgba(255,255,255,0.07)";

          return (
            <div
              key={i}
              className="rounded-apple-lg p-4 transition-all hover:-translate-y-0.5 group"
              style={{
                background: "rgba(22,22,24,0.70)",
                border: `0.5px solid ${borderColor}`,
                backdropFilter: "blur(20px)",
                opacity: status === "archived" ? 0.55 : 1,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0 pr-3">
                  <h4
                    className="font-bold text-white truncate group-hover:text-[#ff4d30] transition-colors"
                    style={{ fontSize: "13px", letterSpacing: "-0.01em" }}
                    title={comp.component_name}
                  >
                    {comp.component_name}
                  </h4>
                  <p className="type-caption text-white/25 mt-0.5 truncate">
                    {comp.source_library} · {comp.description}
                  </p>
                </div>
                <span className="font-black shrink-0" style={{ fontSize: "16px", color: scoreColor }}>
                  {Math.round(score)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span
                  className="type-caption font-black"
                  style={{ color: scoreColor }}
                >
                  {status.toUpperCase()}
                </span>
                {(comp as any).repo_url && (comp as any).repo_url !== "#" && (
                  <a
                    href={(comp as any).repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="type-caption text-white/20 hover:text-[#ff4d30] transition-colors"
                  >
                    View ↗
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 8-Dimension Engine */}
      <section
        className="rounded-apple-lg p-6"
        style={{
          background: "rgba(22,22,24,0.65)",
          border: "0.5px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(20px)",
        }}
      >
        <p className="type-caption text-white/30 mb-4">8-Dimension Scoring Engine</p>
        <div className="grid grid-cols-4 gap-2.5">
          {dimensions.map((d, i) => (
            <div
              key={i}
              className="rounded-apple p-3 text-center"
              style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.05)" }}
            >
              <p className="text-white/60 font-semibold" style={{ fontSize: "11px" }}>{d.dim}</p>
              <p className="font-mono font-bold mt-1" style={{ fontSize: "10px", color: "#ff4d30" }}>{d.weight}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

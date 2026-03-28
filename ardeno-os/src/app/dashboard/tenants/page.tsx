import React from "react";
import { supabaseAdmin } from "@/lib/supabase/client";

export default async function TenantsDashboard() {
  const { data: dbTenants } = await supabaseAdmin
    .from("tenants")
    .select("*")
    .order("created_at", { ascending: false });

  const fallbackTenants = [
    { id: "1", name: "Elite Real Estate Ltd.", slug: "elite-re",  plan: "Enterprise", quota: "4.5M / 10M",  status: "Active" },
    { id: "2", name: "Urban Kitchen Group",    slug: "urban-k",   plan: "Pro",         quota: "890K / 1M",   status: "Active" },
    { id: "3", name: "Lanka Motion Expos",     slug: "motion",    plan: "Free",        quota: "12K / 100K",  status: "Pending" },
  ];

  const tenants =
    dbTenants && dbTenants.length > 0
      ? dbTenants.map((t: any) => ({
          id: t.id,
          name: t.name,
          slug: t.slug,
          plan: t.subscription_tier || "Free",
          quota: `${t.usage_tokens || 0} / ${t.quota_limit || "1M"}`,
          status: t.is_active ? "Active" : "Archived",
        }))
      : fallbackTenants;

  const planColors: Record<string, string> = {
    Enterprise: "#ff4d30",
    Pro:        "#30d158",
    Free:       "rgba(255,255,255,0.40)",
    Archived:   "rgba(255,255,255,0.20)",
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <header className="flex items-start justify-between">
        <div>
          <h2 className="font-bold text-white" style={{ fontSize: "28px", letterSpacing: "-0.02em" }}>
            Agency Tenants
          </h2>
          <p className="text-white/35 mt-1" style={{ fontSize: "13px" }}>
            Multi-Tenant Isolation & Onboarding
          </p>
        </div>
        <button className="btn-glass text-xs px-5 py-2.5">+ Add Tenant</button>
      </header>

      <div className="space-y-3">
        {tenants.map((t) => (
          <div
            key={t.id}
            className="rounded-apple-lg transition-all hover:-translate-y-0.5 group"
            style={{
              background: "rgba(22,22,24,0.70)",
              border: "0.5px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex items-center justify-between p-5">
              {/* Left: avatar + name */}
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center justify-center rounded-apple font-bold text-base shrink-0"
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "rgba(255,77,48,0.10)",
                    border: "0.5px solid rgba(255,77,48,0.15)",
                    color: "#ff4d30",
                  }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-white" style={{ fontSize: "15px", letterSpacing: "-0.01em" }}>
                    {t.name}
                  </h4>
                  <p className="type-caption text-white/25 mt-0.5">{t.slug}.ardeno.os</p>
                </div>
              </div>

              {/* Right: stats */}
              <div className="flex items-center gap-10 text-right">
                <div>
                  <p className="type-caption text-white/25 mb-0.5">Plan</p>
                  <span
                    className="text-xs font-black uppercase tracking-wider"
                    style={{ color: planColors[t.plan] || "rgba(255,255,255,0.40)" }}
                  >
                    {t.plan}
                  </span>
                </div>
                <div>
                  <p className="type-caption text-white/25 mb-0.5">Quota</p>
                  <span className="font-mono text-xs text-white/70">{t.quota}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`status-dot ${t.status === "Active" ? "active" : "warning"}`} />
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: t.status === "Active" ? "#30d158" : "#ffd60a" }}
                  >
                    {t.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Action bar */}
            <div
              className="flex gap-6 px-5 py-3"
              style={{ borderTop: "0.5px solid rgba(255,255,255,0.05)" }}
            >
              {["Branding Settings", "API Keys", "Manage Billing"].map((action) => (
                <button
                  key={action}
                  className="type-caption text-white/25 hover:text-white/70 transition-colors"
                >
                  {action}
                </button>
              ))}
              <button className="type-caption text-white/20 hover:text-[#ff453a] transition-colors ml-auto">
                Deactivate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

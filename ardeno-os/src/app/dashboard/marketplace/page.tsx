import React from "react";
import { supabaseAdmin } from "@/lib/supabase/client";
import { Search } from "lucide-react";

export default async function MarketplaceDashboard() {
  const { data: dbListings } = await supabaseAdmin
    .from("marketplace_listings")
    .select(`id, price_cent, is_verified, skills_registry ( skill_name, department, description )`)
    .limit(20);

  const fallback = [
    { id: "1", title: "Real Estate Sales Pro",      type: "Graph",      provider: "Ardeno Core",    price: "$499",    rating: 4.9, verified: true,  tags: ["CRM", "Sales"] },
    { id: "2", title: "Sentiment Audit Bot",        type: "Skill",      provider: "MiroFish Labs",  price: "Free",    rating: 4.7, verified: true,  tags: ["NLP", "Brand"] },
    { id: "3", title: "Vercel Deployment Shield",   type: "Resilience", provider: "Ardeno Core",    price: "$1,200",  rating: 5.0, verified: true,  tags: ["DevOps"] },
    { id: "4", title: "Lead Scraper Pro",           type: "Browser",    provider: "Sentient Swarm", price: "$150/mo", rating: 4.8, verified: false, tags: ["Automation"] },
  ];

  const listings =
    dbListings && dbListings.length > 0
      ? dbListings.map((l) => ({
          id: l.id,
          title:    (l.skills_registry as any)?.skill_name || "Unknown Skill",
          type:     (l.skills_registry as any)?.department || "Skill",
          provider: "Community Tenant",
          price:    l.price_cent === 0 ? "Free" : `$${(l.price_cent / 100).toFixed(2)}`,
          rating:   5.0,
          verified: l.is_verified,
          tags:     [l.is_verified ? "Verified" : "Community"],
        }))
      : fallback;

  return (
    <div className="space-y-8 max-w-5xl">
      <header className="flex items-start justify-between">
        <div>
          <h2 className="font-bold text-white" style={{ fontSize: "28px", letterSpacing: "-0.02em" }}>
            Skill Marketplace
          </h2>
          <p className="text-white/35 mt-1" style={{ fontSize: "13px" }}>
            B2B Discovery, Procurement & One-Click Installation
          </p>
        </div>
        <div className="flex gap-2.5">
          <button className="btn-glass text-xs px-5 py-2.5">My Skills</button>
          <button className="btn-accent text-xs px-5 py-2.5">Publish Skill</button>
        </div>
      </header>

      {/* Search */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-apple-xl"
        style={{
          background: "rgba(22,22,24,0.70)",
          border: "0.5px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Search size={14} color="rgba(255,255,255,0.30)" strokeWidth={2} />
        <input
          type="text"
          placeholder="Search agent graphs, critic rubrics, automation skills..."
          className="flex-1 bg-transparent border-none outline-none text-white/80 placeholder:text-white/25"
          style={{ fontSize: "13px" }}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {listings.map((l: any) => (
          <SkillCard key={l.id} listing={l} />
        ))}
      </div>
    </div>
  );
}

function SkillCard({ listing: l }: { listing: any }) {
  return (
    <div
      className="rounded-apple-lg p-5 flex flex-col gap-4 transition-all hover:-translate-y-0.5 group"
      style={{
        background: "rgba(22,22,24,0.70)",
        border: "0.5px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0 pr-4">
          <h4
            className="font-bold text-white truncate group-hover:text-[#ff4d30] transition-colors"
            style={{ fontSize: "14px", letterSpacing: "-0.01em" }}
          >
            {l.title}
          </h4>
          <p className="type-caption text-white/25 mt-0.5">
            {l.type} · {l.provider}
          </p>
        </div>
        <span className="font-black text-[#ff4d30] shrink-0" style={{ fontSize: "13px" }}>
          {l.price}
        </span>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {l.verified && (
          <span
            className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider"
            style={{ background: "rgba(255,77,48,0.12)", color: "#ff4d30" }}
          >
            Verified
          </span>
        )}
        {l.tags.filter((t: string) => t !== "Verified").map((tag: string) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
            style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.40)" }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        className="flex items-center justify-between pt-3"
        style={{ borderTop: "0.5px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-1">
          <span style={{ color: "#ff4d30", fontSize: "11px" }}>★</span>
          <span className="font-bold text-white/70" style={{ fontSize: "11px" }}>{l.rating}</span>
        </div>
        <button
          className="px-4 py-1.5 rounded-apple text-[10px] font-bold uppercase tracking-wider transition-all hover:bg-[#ff4d30] hover:text-white"
          style={{
            background: "rgba(255,255,255,0.05)",
            color: "rgba(255,255,255,0.50)",
            border: "0.5px solid rgba(255,255,255,0.08)",
          }}
        >
          Install
        </button>
      </div>
    </div>
  );
}

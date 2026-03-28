"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabaseClient } from "@/lib/supabase/client";

const gentleSpring = { type: "spring", stiffness: 300, damping: 30 } as const;

const STATUS_COLORS: Record<string, string> = {
  running:   "#ff4d30",
  success:   "#30d158",
  completed: "#30d158",
  failed:    "#ff453a",
};

const AGENT_COLORS: Record<string, string> = {
  c: "#ff4d30",
  d: "#30d158",
  s: "#ffd60a",
  m: "rgba(255,255,255,0.40)",
  a: "#ff7050",
};

export default function SentientStream() {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabaseClient
        .from("agent_activities")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);
      if (data) setActivities(data);
    };
    fetch();

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

    return () => { supabaseClient.removeChannel(channel); };
  }, []);

  if (activities.length === 0) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-apple" style={{ background: "rgba(255,255,255,0.03)" }}>
        <span className="status-dot inactive" />
        <p className="text-white/20 italic" style={{ fontSize: "11px" }}>
          Waiting for Sentient Pulse...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <AnimatePresence initial={false}>
        {activities.map((act) => (
          <ActivityItem key={act.id} activity={act} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ActivityItem({ activity: act }: { activity: any }) {
  const statusColor = STATUS_COLORS[act.status] || "rgba(255,255,255,0.30)";
  const agentKey = (act.agent_type || "a")[0].toLowerCase();
  const avatarColor = AGENT_COLORS[agentKey] || AGENT_COLORS.a;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 8 }}
      transition={gentleSpring}
      className="flex items-center justify-between px-3 py-2.5 rounded-apple group transition-all"
      style={{ border: "0.5px solid transparent" }}
      whileHover={{
        background: "rgba(255,255,255,0.03)",
        borderColor: "rgba(255,255,255,0.05)",
        transition: gentleSpring,
      }}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="flex items-center justify-center rounded-apple shrink-0"
          style={{
            width: "30px",
            height: "30px",
            background: `${avatarColor}18`,
            border: `0.5px solid ${avatarColor}30`,
          }}
        >
          <span style={{ fontSize: "9px", fontWeight: 900, color: avatarColor, textTransform: "uppercase" }}>
            {(act.agent_type || "A")[0]}
          </span>
        </div>

        {/* Info */}
        <div style={{ maxWidth: "280px" }}>
          <p className="font-semibold text-white/80 capitalize" style={{ fontSize: "12px", letterSpacing: "-0.01em" }}>
            {act.agent_type} Agent
          </p>
          <p className="text-white/30 truncate" style={{ fontSize: "11px" }}>
            {act.message}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="text-right shrink-0 pl-2">
        <p className="font-mono text-white/20" style={{ fontSize: "10px" }}>
          {new Date(act.created_at).toLocaleTimeString()}
        </p>
        <p className="font-black uppercase" style={{ fontSize: "8px", letterSpacing: "0.05em", color: statusColor }}>
          {act.status}
        </p>
      </div>
    </motion.div>
  );
}

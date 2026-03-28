"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const gentleSpring = { type: "spring", stiffness: 300, damping: 30 } as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: gentleSpring },
};

const stats = [
  { label: "Agency Status",    value: "ACTIVE",   color: "text-[#30d158]" },
  { label: "Neural Pool",      value: "150 Keys", color: "text-white" },
  { label: "Real-time Stream", value: "LIVE",     color: "text-[#ff4d30]" },
  { label: "Memory Bank",      value: "Synced",   color: "text-white/70" },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background nebula */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,77,48,0.09) 0%, transparent 60%), " +
              "radial-gradient(ellipse 60% 40% at 80% 80%, rgba(255,100,50,0.05) 0%, transparent 50%), " +
              "radial-gradient(ellipse 50% 60% at 10% 90%, rgba(255,60,30,0.04) 0%, transparent 50%), " +
              "#000000",
          }}
        />
        {/* Hairline bottom separator */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </div>

      <motion.main
        className="relative z-10 flex flex-col items-center max-w-3xl w-full text-center px-6 gap-14"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase"
            style={{
              background: "rgba(255,77,48,0.10)",
              border: "0.5px solid rgba(255,77,48,0.25)",
              color: "#ff4d30",
            }}
          >
            <span className="status-dot active" />
            Ardeno OS — v4.4
          </span>
        </motion.div>

        {/* Hero */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h1
            className="type-display text-white"
            style={{ fontSize: "clamp(44px, 8vw, 72px)" }}
          >
            ARDENO{" "}
            <span className="text-accent-gradient">OS</span>
          </h1>
          <p
            className="text-white/40 font-medium"
            style={{ fontSize: "17px", letterSpacing: "-0.01em" }}
          >
            Sentient Agency Operating System — Zero-cost AI infrastructure for modern agencies
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="glass-thin rounded-apple-lg p-4 text-left"
              whileHover={{ y: -2, transition: gentleSpring }}
            >
              <p className="type-caption text-white/30 mb-1.5">{s.label}</p>
              <p className={`text-sm font-bold tracking-tight ${s.color}`}>{s.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 items-center"
        >
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} transition={gentleSpring}>
            <Link href="/dashboard" className="btn-accent inline-block px-8 py-3.5 text-sm">
              Launch Dashboard
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} transition={gentleSpring}>
            <Link href="/portal/onboarding" className="btn-glass inline-block px-8 py-3.5 text-sm">
              Start Onboarding
            </Link>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.p
          variants={itemVariants}
          className="type-caption text-white/18"
        >
          MiroFish x Sentient Agency — Node 22 Edge Runtime — Built for Ardeno Studio © 2026
        </motion.p>
      </motion.main>
    </div>
  );
}

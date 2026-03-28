"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const gentleSpring = { type: "spring", stiffness: 300, damping: 30 } as const;

const PLANS = [
  {
    name: "Starter",
    price: "$49/mo",
    features: ["3 Agents", "1K Tasks/mo", "Basic Dashboard"],
    accent: false,
  },
  {
    name: "Pro",
    price: "$149/mo",
    features: ["Unlimited Agents", "50K Tasks/mo", "Full Dashboard", "Marketplace Access"],
    accent: true,
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", domain: "", primaryColor: "#ff4d30", logo: "" });

  const handleProvision = () => setStep(3);

  if (step === 3) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ background: "#000" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={gentleSpring}
          className="max-w-md w-full text-center space-y-7"
        >
          <div
            className="w-16 h-16 mx-auto rounded-apple-lg flex items-center justify-center"
            style={{ background: "rgba(48,209,88,0.12)", border: "0.5px solid rgba(48,209,88,0.20)" }}
          >
            <span style={{ fontSize: "26px", color: "#30d158" }}>✓</span>
          </div>
          <div>
            <h2 className="font-bold text-white" style={{ fontSize: "24px", letterSpacing: "-0.02em" }}>
              Agency Provisioned
            </h2>
            <p className="text-white/40 mt-2.5 leading-relaxed" style={{ fontSize: "13px" }}>
              Your tenant has been created with RLS isolation, custom branding tokens, and a dedicated Supabase schema.
            </p>
          </div>
          <button className="btn-accent px-8 py-3 w-full">Enter Dashboard</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        background:
          "radial-gradient(ellipse 70% 40% at 50% -5%, rgba(255,77,48,0.06) 0%, transparent 55%), #000",
      }}
    >
      <div className="w-full max-w-xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span
            className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
            style={{ background: "rgba(255,77,48,0.10)", color: "#ff4d30", border: "0.5px solid rgba(255,77,48,0.20)" }}
          >
            White-Label Onboarding
          </span>
          <h1 className="font-bold text-white" style={{ fontSize: "28px", letterSpacing: "-0.02em" }}>
            Launch Your Sentient Agency
          </h1>
          <p className="text-white/35" style={{ fontSize: "13px" }}>
            Configure your brand, connect billing, and go live in 60 seconds.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3">
          {["Agency Details", "Billing"].map((label, i) => {
            const active = step === i + 1;
            const done = step > i + 1;
            return (
              <React.Fragment key={i}>
                <div className="flex items-center gap-2">
                  <div
                    className="flex items-center justify-center rounded-full text-xs font-bold"
                    style={{
                      width: "28px",
                      height: "28px",
                      background: done ? "rgba(48,209,88,0.15)" : active ? "#ff4d30" : "rgba(255,255,255,0.07)",
                      color: done ? "#30d158" : active ? "#fff" : "rgba(255,255,255,0.30)",
                      border: done ? "0.5px solid rgba(48,209,88,0.25)" : "none",
                    }}
                  >
                    {done ? "✓" : i + 1}
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: active ? 600 : 400,
                      color: active ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.30)",
                    }}
                  >
                    {label}
                  </span>
                </div>
                {i < 1 && <div style={{ width: "32px", height: "0.5px", background: "rgba(255,255,255,0.10)" }} />}
              </React.Fragment>
            );
          })}
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={gentleSpring}
              className="rounded-apple-xl p-7 space-y-5"
              style={{
                background: "rgba(22,22,24,0.80)",
                border: "0.5px solid rgba(255,255,255,0.09)",
                backdropFilter: "blur(30px)",
              }}
            >
              {[
                { label: "Agency Name",    key: "name",   placeholder: "Your Agency Name",           type: "text" },
                { label: "Custom Domain",  key: "domain", placeholder: "agency.yourdomain.com",       type: "text" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="type-caption text-white/30 block mb-1.5">{field.label}</label>
                  <input
                    type={field.type}
                    value={(form as any)[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full rounded-apple-lg p-3.5 text-white/80 placeholder:text-white/20 outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "0.5px solid rgba(255,255,255,0.08)",
                      fontSize: "13px",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(255,77,48,0.40)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                  />
                </div>
              ))}
              <div>
                <label className="type-caption text-white/30 block mb-1.5">Primary Brand Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={form.primaryColor}
                    onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                    className="rounded-apple cursor-pointer border-0"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <span className="font-mono text-white/40" style={{ fontSize: "12px" }}>{form.primaryColor}</span>
                </div>
              </div>
              <button onClick={() => setStep(2)} className="btn-accent w-full py-3">
                Continue to Billing
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={gentleSpring}
              className="rounded-apple-xl p-7 space-y-5"
              style={{
                background: "rgba(22,22,24,0.80)",
                border: "0.5px solid rgba(255,255,255,0.09)",
                backdropFilter: "blur(30px)",
              }}
            >
              <div className="grid grid-cols-2 gap-3">
                {PLANS.map((plan, i) => (
                  <div
                    key={i}
                    className="rounded-apple-lg p-5 space-y-3"
                    style={{
                      background: plan.accent ? "rgba(255,77,48,0.06)" : "rgba(255,255,255,0.03)",
                      border: plan.accent ? "0.5px solid rgba(255,77,48,0.20)" : "0.5px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div>
                      <h4 className="font-bold text-white" style={{ fontSize: "14px" }}>{plan.name}</h4>
                      <p className="font-black text-white" style={{ fontSize: "22px", letterSpacing: "-0.02em", marginTop: "4px" }}>
                        {plan.price}
                      </p>
                    </div>
                    <ul className="space-y-1.5">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <span style={{ color: "#30d158", fontSize: "11px" }}>✓</span>
                          <span className="text-white/50" style={{ fontSize: "12px" }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <button onClick={handleProvision} className="btn-accent w-full py-3">
                Complete Setup & Pay
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

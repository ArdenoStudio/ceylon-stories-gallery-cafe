"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const gentleSpring = { type: "spring", stiffness: 300, damping: 30 } as const;

const QUESTIONS = [
  { key: "industry",  q: "What industry does your business operate in?",             placeholder: "e.g., Hospitality, Real Estate, Medical..." },
  { key: "goals",     q: "What are the primary goals for this project?",              placeholder: "e.g., Lead generation, Brand awareness, Sales..." },
  { key: "visuals",   q: "Do you have visual preferences or reference sites?",        placeholder: "e.g., Minimal, Dark mode, Clean, Lush..." },
  { key: "budget",    q: "What is your estimated budget range?",                      placeholder: "e.g., $1,000 – $5,000" },
];

export default function InterviewerPage({ params }: { params: { id: string } }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<any>(null);

  const current = QUESTIONS[step - 1];
  const progressPct = (step / QUESTIONS.length) * 100;

  const handleNext = async () => {
    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setLoading(true);
      const res = await fetch(`/api/requirements/${params.id}/analyze`, {
        method: "POST",
        body: JSON.stringify(answers),
      });
      const data = await res.json();
      setResults(data);
      setLoading(false);
    }
  };

  if (results) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#000" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={gentleSpring}
          className="max-w-lg w-full rounded-apple-xl p-8 text-center space-y-6"
          style={{
            background: "rgba(22,22,24,0.85)",
            border: "0.5px solid rgba(255,255,255,0.10)",
            backdropFilter: "blur(40px)",
          }}
        >
          <div
            className="w-14 h-14 mx-auto rounded-apple-lg flex items-center justify-center"
            style={{ background: "rgba(48,209,88,0.12)", border: "0.5px solid rgba(48,209,88,0.20)" }}
          >
            <span style={{ fontSize: "22px", color: "#30d158" }}>✓</span>
          </div>
          <div>
            <h2 className="font-bold text-white" style={{ fontSize: "22px", letterSpacing: "-0.02em" }}>
              Requirement Profile Complete
            </h2>
            <p className="text-white/40 mt-2" style={{ fontSize: "13px" }}>
              Strategy Agents have mapped your requirements to the Growth Tier. Generating your custom matrix now.
            </p>
          </div>
          <div
            className="rounded-apple p-4 text-left"
            style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)" }}
          >
            <p className="type-caption text-white/30 mb-1">Confidence Score</p>
            <p className="font-black" style={{ fontSize: "28px", color: "#ff4d30", letterSpacing: "-0.02em" }}>96.4%</p>
          </div>
          <button className="btn-accent px-8 py-3 w-full">Proceed to Dashboard</button>
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
      {/* Progress bar — full width top */}
      <div className="fixed top-0 inset-x-0 z-50" style={{ height: "2px", background: "rgba(255,255,255,0.05)" }}>
        <motion.div
          className="h-full"
          style={{ background: "#ff4d30" }}
          animate={{ width: `${progressPct}%` }}
          transition={gentleSpring}
        />
      </div>

      <div className="w-full max-w-xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span
            className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
            style={{ background: "rgba(255,77,48,0.10)", color: "#ff4d30", border: "0.5px solid rgba(255,77,48,0.20)" }}
          >
            Project Discovery
          </span>
          <h1 className="font-bold text-white" style={{ fontSize: "28px", letterSpacing: "-0.02em" }}>
            Multi-Turn Requirement Extraction
          </h1>
        </div>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={gentleSpring}
            className="rounded-apple-xl p-7 space-y-6"
            style={{
              background: "rgba(22,22,24,0.80)",
              border: "0.5px solid rgba(255,255,255,0.09)",
              backdropFilter: "blur(30px)",
            }}
          >
            <div>
              <p className="type-caption mb-2" style={{ color: "#ff4d30" }}>
                Question {step} of {QUESTIONS.length}
              </p>
              <h3 className="font-bold text-white" style={{ fontSize: "20px", letterSpacing: "-0.01em" }}>
                {current.q}
              </h3>
            </div>

            <textarea
              value={answers[current.key] || ""}
              onChange={(e) => setAnswers({ ...answers, [current.key]: e.target.value })}
              placeholder={current.placeholder}
              rows={4}
              className="w-full rounded-apple-lg p-4 text-white/80 placeholder:text-white/20 resize-none outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "0.5px solid rgba(255,255,255,0.08)",
                fontSize: "14px",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(255,77,48,0.40)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
            />

            <div className="flex items-center justify-between">
              {/* Step dots */}
              <div className="flex gap-1.5">
                {QUESTIONS.map((_, i) => (
                  <span
                    key={i}
                    className="rounded-full transition-all"
                    style={{
                      width: i + 1 === step ? "16px" : "6px",
                      height: "6px",
                      background: i + 1 <= step ? "#ff4d30" : "rgba(255,255,255,0.15)",
                    }}
                  />
                ))}
              </div>

              <motion.button
                onClick={handleNext}
                disabled={loading}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={gentleSpring}
                className="btn-accent px-7 py-3 disabled:opacity-50"
              >
                {loading ? "Analyzing..." : step === QUESTIONS.length ? "Generate Matrix" : "Next"}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

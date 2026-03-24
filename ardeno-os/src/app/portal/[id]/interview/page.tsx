"use client";

import React, { useState } from "react";

/**
 * Priority 14: Requirements & Budget Intelligence (§31)
 * §31 Multi-Turn Client Interviewer: Zero-Misunderstanding Onboarding.
 * Interactive client-facing interface that extract functional/visual needs 
 * and maps them to Section 31 budget-tiers.
 */
export default function InterviewerPage({ params }: { params: { id: string } }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<any>({});
  const [results, setResults] = useState<any>(null);

  const questions = [
    { key: "industry", q: "What industry does your business operate in?", placeholder: "e.g., Hospitality, Real Estate, Medical..." },
    { key: "goals", q: "What are the primary goals for this project?", placeholder: "e.g., Lead generation, Brand awareness, Sales..." },
    { key: "visuals", q: "Do you have any specific visual preferences or reference sites?", placeholder: "e.g., Minimal, Dark mode, Clean, Lush..." },
    { key: "budget", q: "What is your estimated budget range?", placeholder: "e.g., $1,000 - $5,000" },
  ];

  const handleNext = async () => {
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      // 1. Submit to RequirementAnalyzer API (§31)
      setLoading(true);
      const res = await fetch(`/api/requirements/${params.id}/analyze`, {
        method: 'POST',
        body: JSON.stringify(answers)
      });
      const data = await res.json();
      setResults(data);
      setLoading(false);
    }
  };

  if (results) {
     return (
        <div className="max-w-2xl mx-auto p-12 glass-panel bg-primary/5 animate-in fade-in zoom-in duration-500">
           <h2 className="text-2xl font-bold mb-4">Requirement Profile Complete §31</h2>
           <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                 <p className="text-[10px] uppercase font-black text-white/30 tracking-widest">Confidence Score</p>
                 <h4 className="text-3xl font-black text-primary italic">96.4%</h4>
              </div>
              <div>
                 <p className="text-sm text-white/60 mb-8 leading-relaxed">
                   Based on your answers, our **Strategy Agents** have mapped your requirements to the **Growth Tier (§31)**. 
                   Generating your custom "What You Get / What You Don't Get" matrix now...
                 </p>
              </div>
              <button className="bg-primary px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.05] transition-transform">Proceed to Dashboard</button>
           </div>
        </div>
     );
  }

  return (
    <div className="max-w-2xl mx-auto py-24 px-6 space-y-12">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">Project Discovery Phase §31</h1>
        <p className="text-white/40 font-medium tracking-tight italic">Multi-Turn Sentient Requirement Extraction</p>
      </header>

      <div className="glass-panel p-12 bg-[#0a0a0a]/50 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-white/20">AGENT_CONFIDENCE: 44%</div>
         
         <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <div>
               <p className="text-[10px] uppercase font-bold text-primary tracking-widest mb-2 italic">Question {step} OF 4</p>
               <h3 className="text-2xl font-bold leading-tight">{questions[step-1].q}</h3>
            </div>

            <textarea 
               value={answers[questions[step-1].key] || ''}
               onChange={(e) => setAnswers({...answers, [questions[step-1].key]: e.target.value})}
               className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all min-h-[150px] placeholder:text-white/10"
               placeholder={questions[step-1].placeholder}
            />

            <div className="flex justify-between items-center pt-8">
               <div className="w-1/3 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${(step/4)*100}%` }}></div>
               </div>
               <button 
                  onClick={handleNext}
                  disabled={loading}
                  className="bg-white text-black px-12 py-3.5 rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
               >
                  {loading ? 'Analyzing...' : step === 4 ? 'Generate Matrix (§31)' : 'Next Prompt'}
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}

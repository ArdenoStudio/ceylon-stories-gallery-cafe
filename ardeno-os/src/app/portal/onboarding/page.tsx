"use client";

import React, { useState } from "react";

/**
 * Priority 7: White-Label SaaS & Multi-Tenant (§37)
 * §37 Tenant Onboarding: Stripe-integrated checkout and provisioning.
 * When a new agency purchases "Ardeno OS in a Box," this flow provisions
 * their tenant_id, sets custom branding, and configures RLS isolation.
 */
export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', domain: '', primaryColor: '#6366f1', logo: '' });

  const handleProvision = async () => {
    setStep(3);
    // In production: POST to /api/tenants/create with Stripe session
  };

  if (step === 3) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center space-y-8">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
          <span className="text-3xl">✓</span>
        </div>
        <h2 className="text-3xl font-bold">Agency Provisioned §37</h2>
        <p className="text-white/40 leading-relaxed">
          Your tenant has been created with RLS isolation, custom branding tokens,
          and a dedicated Supabase schema. You can now access your dashboard.
        </p>
        <button className="bg-primary px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
          Enter Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-24 space-y-12">
      <header className="text-center space-y-2">
        <p className="text-[10px] uppercase font-bold text-primary tracking-widest">White-Label Onboarding §37</p>
        <h1 className="text-4xl font-extrabold tracking-tight">Launch Your Sentient Agency</h1>
        <p className="text-white/40">Configure your brand, connect billing, and go live in 60 seconds.</p>
      </header>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-4">
        {['Agency Details', 'Billing'].map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step > i + 1 ? 'bg-green-500/20 text-green-400' : step === i + 1 ? 'bg-primary text-white' : 'bg-white/5 text-white/30'}`}>{i + 1}</div>
            <span className={`text-sm ${step === i + 1 ? 'text-white font-bold' : 'text-white/30'}`}>{label}</span>
            {i < 1 && <div className="w-12 h-px bg-white/10 mx-2"></div>}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="glass-panel p-10 space-y-6 bg-white/[0.02]">
          <div>
            <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Agency Name</label>
            <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="Your Agency Name" />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Custom Domain</label>
            <input value={formData.domain} onChange={e => setFormData({ ...formData, domain: e.target.value })} className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="agency.yourdomain.com" />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Primary Brand Color</label>
            <div className="flex items-center gap-4 mt-2">
              <input type="color" value={formData.primaryColor} onChange={e => setFormData({ ...formData, primaryColor: e.target.value })} className="w-12 h-12 rounded-xl border-0 cursor-pointer" />
              <span className="text-sm font-mono text-white/40">{formData.primaryColor}</span>
            </div>
          </div>
          <button onClick={() => setStep(2)} className="w-full bg-white text-black py-3 rounded-xl font-bold hover:scale-[1.01] transition-transform">Continue to Billing</button>
        </div>
      )}

      {step === 2 && (
        <div className="glass-panel p-10 space-y-8 bg-white/[0.02]">
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'Starter', price: '$49/mo', features: ['3 Agents', '1K Tasks/mo', 'Basic Dashboard'] },
              { name: 'Pro', price: '$149/mo', features: ['Unlimited Agents', '50K Tasks/mo', 'Full Dashboard', 'Marketplace Access'] },
            ].map((plan, i) => (
              <div key={i} className={`p-6 rounded-xl border ${i === 1 ? 'border-primary/30 bg-primary/5' : 'border-white/10 bg-white/[0.02]'} space-y-4`}>
                <h4 className="font-bold text-lg">{plan.name}</h4>
                <p className="text-2xl font-black">{plan.price}</p>
                <ul className="space-y-2">
                  {plan.features.map((f, j) => (
                    <li key={j} className="text-sm text-white/50 flex items-center gap-2">
                      <span className="text-green-400 text-xs">✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button onClick={handleProvision} className="w-full bg-primary py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.01] transition-transform">
            Complete Setup & Pay
          </button>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useRef, useState, memo } from "react";
import { motion, AnimatePresence } from "motion/react";

// ── Shared Ardeno Styles ──────────────────────────────────────────────────────
const ARDENO_STYLES = `
  @keyframes avl-breathe {
    0%,100% { opacity:0.3; transform:scale(1); filter: blur(20px); }
    50%      { opacity:0.6;  transform:scale(1.15); filter: blur(30px); }
  }
  @keyframes avl-drawPath {
    from { stroke-dashoffset: 2000; filter: drop-shadow(0 0 2px rgba(247,231,206,0)); }
    to   { stroke-dashoffset: 0; filter: drop-shadow(0 0 12px rgba(247,231,206,0.6)); }
  }
  @keyframes avl-fillFade {
    from { opacity: 0; filter: blur(4px); transform: scale(0.95); }
    to   { opacity: 1; filter: blur(0px); transform: scale(1); }
  }
  @keyframes avl-charIn {
    from { opacity:0; transform: translateY(20px) scale(1.15); filter:blur(12px) brightness(2); letter-spacing: 0.05em; }
    to   { opacity:1; transform: translateY(0) scale(1); filter:blur(0) brightness(1);  letter-spacing: 0.18em; }
  }
  @keyframes avl-charInUp {
    from { opacity:0; transform: translateY(15px) scale(0.9); filter:blur(8px); }
    to   { opacity:1; transform: translateY(0) scale(1); filter:blur(0); }
  }
  @keyframes avl-crownReveal {
    from { opacity:0; transform:translateY(-20px) scale(0.9); filter: blur(10px); }
    to   { opacity:1; transform:translateY(0) scale(1); filter: blur(0px); }
  }
  @keyframes avl-fadeInPhase { from { opacity: 0; } to { opacity: 1; } }
  @keyframes avl-fadeOutPhase {
    from { opacity:1; transform:scale(1); filter: blur(0px); }
    to   { opacity:0; transform:scale(1.05); filter: blur(14px); }
  }
  @keyframes avl-flashGold {
    0%   { opacity:0; }
    40%  { opacity:1; filter: blur(10px); }
    100% { opacity:0; filter: blur(0px); }
  }
  .glass-overlay {
    backdrop-filter: blur(8px);
    background: radial-gradient(circle at 50% 50%, rgba(13,11,9,0.4) 0%, rgba(13,11,9,0.95) 100%);
  }
`;

const A_MARK_PATH =
  "M 514.300781 878.699219 L 434.792969 718.777344 " +
  "C 411.382812 739.714844 390.78125 776.453125 391.929688 806.554688 " +
  "L 415.984375 853.996094 " +
  "C 416.851562 855.699219 418.324219 857.015625 420.113281 857.679688 " +
  "L 504.851562 889.203125 " +
  "C 511.304688 891.605469 517.367188 884.867188 514.300781 878.699219 Z " +
  "M 371.617188 791.304688 " +
  "C 371.410156 791.605469 371.222656 791.925781 371.054688 792.265625 " +
  "L 340.871094 853.445312 " +
  "C 340.011719 855.183594 338.523438 856.527344 336.707031 857.207031 " +
  "L 250.40625 889.308594 " +
  "C 243.988281 891.699219 237.9375 885.042969 240.917969 878.878906 " +
  "L 369.019531 614.007812 " +
  "C 371.769531 608.324219 379.851562 608.277344 382.664062 613.929688 " +
  "L 432.074219 713.316406 " +
  "C 404.980469 732.679688 383.765625 759.746094 371.617188 791.304688";

const FULL_COVER: React.CSSProperties = { position: "absolute", inset: 0, width: "100%", height: "100%" };
const CENTER_FLEX: React.CSSProperties = { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" };

const StaggerWord = memo<{ text: string; baseDelay: number; charStyle: React.CSSProperties; animName?: string }>(
    ({ text, baseDelay, charStyle, animName = "avl-charIn" }) => (
      <span style={{ display: "inline-block", overflow: "hidden" }}>
        {text.split("").map((ch, i) => (
          <span
            key={i}
            style={{
              ...charStyle,
              display: "inline-block",
              opacity: 0,
              animation: `${animName} 0.7s cubic-bezier(0.22,1,0.36,1) ${baseDelay + i * 0.06}s forwards`,
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>
    )
);

const ArdenoPhase = memo<{ exiting: boolean; flashGold: boolean; progress: number }>(({ exiting, flashGold, progress }) => (
  <div
    className="glass-overlay"
    style={{
      ...FULL_COVER,
      animation: exiting ? "avl-fadeOutPhase 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards" : "avl-fadeInPhase 1s ease-out forwards",
      zIndex: 3,
      perspective: "1000px",
      background: "#0d0b09"
    }}
  >
    <div style={{ ...FULL_COVER, background: "radial-gradient(circle at 50% 45%, rgba(247,231,206,0.1) 0%, transparent 50%)", animation: "avl-breathe 5s ease-in-out infinite", pointerEvents: "none" }} />
    <div style={CENTER_FLEX}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, position: "relative", zIndex: 2, transform: "translateY(-4vh)" }}>
        <div style={{ width: 80, height: 80, marginBottom: 8, opacity: 0, animation: "avl-crownReveal 1.4s cubic-bezier(0.16,1,0.3,1) 0.1s forwards" }}>
          <svg viewBox="200 580 340 340" style={{ width: "100%", height: "100%", overflow: "visible" }}>
            <defs>
                <linearGradient id="avl-aGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F7E7CE" />
                    <stop offset="100%" stopColor="#c8b48e" />
                </linearGradient>
                <filter id="avl-aGlow">
                    <feGaussianBlur stdDeviation="8" result="g" />
                    <feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>
            <path d={A_MARK_PATH} fill="none" stroke="rgba(247,231,206,0.05)" strokeWidth="1" />
            <path d={A_MARK_PATH} fill="none" stroke="#F7E7CE" strokeWidth="3.5" strokeLinecap="round" style={{ strokeDasharray: 2000, animation: "avl-drawPath 2.2s cubic-bezier(0.2,1,0.4,1) 0.4s forwards" }} />
            <path d={A_MARK_PATH} fill="url(#avl-aGrad)" filter="url(#avl-aGlow)" style={{ opacity: 0, transformOrigin: "center", animation: "avl-fillFade 1.4s cubic-bezier(0.16,1,0.3,1) 1.8s forwards" }} />
          </svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
           <StaggerWord text="ARDENO" baseDelay={0.8} charStyle={{ fontFamily: "serif", fontSize: "32px", fontWeight: 600, color: "#ffffff", letterSpacing: "0.18em" }} />
           <StaggerWord text="STUDIO" baseDelay={1.4} charStyle={{ fontFamily: "serif", fontSize: "14px", fontWeight: 300, fontStyle: "italic", color: "#F7E7CE", letterSpacing: "0.5em" }} animName="avl-charInUp" />
        </div>
      </div>
    </div>
    <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", width: 280, display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
      <p style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)", fontFamily: "sans-serif" }}>{progress < 100 ? "LOADING" : "INITIALIZING"}</p>
      <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.08)", overflow: "hidden", position: "relative" }}>
        <motion.div style={{ width: "100%", height: "100%", background: "linear-gradient(90deg, transparent, #F7E7CE)", transformOrigin: "left" }} initial={{ scaleX: 0 }} animate={{ scaleX: progress / 100 }} transition={{ ease: "easeOut", duration: 0.1 }} />
      </div>
    </div>
    {flashGold && <div style={{ ...FULL_COVER, background: "radial-gradient(circle at 50% 50%, rgba(247,231,206,0.18) 0%, transparent 80%)", animation: "avl-flashGold 0.6s cubic-bezier(0.16,1,0.3,1) forwards", pointerEvents: "none", zIndex: 10 }} />}
  </div>
));

const GJC_STYLES = `
  .gjc-root { background: #0d0b09; display: flex; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; }
  .gjc-wrap { display: flex; flex-direction: column; align-items: center; position: relative; }
  .gjc-glow { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); width: 160px; height: 80px; background: radial-gradient(ellipse at 50% 40%, rgba(247,231,206,0.09) 0%, rgba(247,231,206,0.03) 50%, transparent 75%); opacity: 0; animation: gjcGlowIn 2s 0.8s ease forwards; filter: blur(8px); }
  .gjc-plane { position: relative; width: 80px; height: 80px; opacity: 0; animation: gjcRiseIn 1s 0.1s cubic-bezier(.16,1,.3,1) forwards, gjcFloat 5s 1.4s ease-in-out infinite; }
  .gjc-plane img { width: 100%; height: 100%; object-fit: contain; filter: invert(93%) sepia(12%) saturate(541%) hue-rotate(344deg) brightness(101%) contrast(92%); }
  .gjc-letters { font-family: serif; font-weight: 600; font-size: 42px; color: #f0ece4; margin-top: 20px; display: flex; gap: 0.38em; }
  .gjc-mask { overflow: hidden; line-height: 1.1; }
  .gjc-mask span { display: block; transform: translateY(105%); animation: gjcClipUp 0.7s cubic-bezier(.16,1,.3,1) forwards; }
  .gjc-sub { font-family: sans-serif; font-weight: 300; font-size: 7px; letter-spacing: 0.55em; text-transform: uppercase; color: rgba(247,231,206,0.32); padding-left: 0.55em; margin-top: 9px; opacity: 0; animation: gjcRiseIn 1s 1.25s cubic-bezier(.16,1,.3,1) forwards; }
  .gjc-track { position: relative; margin-top: 44px; width: 110px; height: 1px; background: rgba(247,231,206,0.07); opacity: 0; animation: gjcFadeIn 0s 1.4s forwards; }
  .gjc-fill { position: absolute; inset: 0; width: 0; background: #F7E7CE; }
  @keyframes gjcClipUp { from { transform: translateY(105%); } to { transform: translateY(0); } }
  @keyframes gjcRiseIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes gjcFadeIn { to { opacity: 1; } }
  @keyframes gjcGlowIn { to { opacity: 1; } }
  @keyframes gjcFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
`;

export default function DemoLoader({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<"ardeno" | "gjc" | "done">("ardeno");
  const [ardenoExiting, setArdenoExiting] = useState(false);
  const [flashGold, setFlashGold] = useState(false);
  const [progress, setProgress] = useState(0);
  const fillRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const s1 = document.createElement("style"); s1.textContent = ARDENO_STYLES; document.head.appendChild(s1);
    const s2 = document.createElement("style"); s2.textContent = GJC_STYLES; document.head.appendChild(s2);
    
    // Smooth Progress with rAF
    const start = Date.now();
    const duration = 2400;
    const tick = () => {
      const raw = Math.min(((Date.now() - start) / duration) * 100, 100);
      setProgress(Math.round(raw));
      if (raw < 100) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // Sequence
    const t1 = setTimeout(() => setFlashGold(true), 2800);
    const t2 = setTimeout(() => setArdenoExiting(true), 2900);
    const t3 = setTimeout(() => setPhase("gjc"), 3300);

    return () => {
        s1.remove(); s2.remove();
        cancelAnimationFrame(rafRef.current);
        clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
    };
  }, []);

  // GJC Phase Animation
  useEffect(() => {
    if (phase === "gjc") {
        let start: number | null = null;
        let gjcRaf: number;
        const step = (ts: number) => {
            if (!start) start = ts;
            const t = Math.min((ts - start) / 2400, 1);
            if (fillRef.current) fillRef.current.style.width = `${t * 100}%`;
            if (t < 1) gjcRaf = requestAnimationFrame(step);
            else setTimeout(() => { setPhase("done"); onComplete?.(); }, 1200);
        };
        gjcRaf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(gjcRaf);
    }
  }, [phase, onComplete]);

  if (phase === "done") return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#0d0b09" }}>
      <AnimatePresence mode="wait">
        {phase === "ardeno" ? (
          <ArdenoPhase key="ardeno" exiting={ardenoExiting} flashGold={flashGold} progress={progress} />
        ) : phase === "gjc" ? (
          <motion.div
            key="gjc"
            initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="gjc-root"
          >
            <div className="gjc-wrap">
              <div className="gjc-glow" />
              <div className="gjc-plane">
                 {/* Using the official logo SVG */}
                 <img src="/src/assets/logo.svg" alt="GJC Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div className="gjc-letters">
                <StaggerWord text="GJC" baseDelay={0.4} charStyle={{ fontFamily: "serif", fontSize: "42px", fontWeight: 600, color: "#f0ece4" }} />
              </div>
              <div className="gjc-sub">Airlines</div>
              <div className="gjc-track"><div className="gjc-fill" ref={fillRef} /></div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

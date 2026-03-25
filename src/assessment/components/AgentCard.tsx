import { useState, useRef, useEffect } from "react";
import { T, AGENTS, AGENT_COLOR } from "../data/assessmentData";
import { mono, bebas, sans } from "../lib/styleHelpers";

interface AgentCardProps {
  activeAgent: string;
}

export function AgentCard({ activeAgent }: AgentCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);
  const prevAgent = useRef(activeAgent);

  useEffect(() => {
    if (prevAgent.current !== activeAgent) {
      setFlipped(false);
      setFadeKey(k => k + 1);
      prevAgent.current = activeAgent;
    }
  }, [activeAgent]);

  const a = AGENTS.find(x => x.id === activeAgent)!;
  const col = AGENT_COLOR[a.id];
  const otherAgents = AGENTS.filter(x => x.id !== activeAgent);

  return (
    <>
      <div style={{ position: "relative", width: 540, height: 480, flexShrink: 0 }}>
        <div style={{ position: "absolute", inset: -60, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "20%", left: "15%", width: 200, height: 200, borderRadius: "50%", background: col, filter: "blur(80px)", animation: "bg-orb-drift-1 8s ease-in-out infinite", opacity: 0.12, willChange: "transform,opacity" }} />
          <div style={{ position: "absolute", bottom: "15%", right: "10%", width: 160, height: 160, borderRadius: "50%", background: col, filter: "blur(70px)", animation: "bg-orb-drift-2 10s ease-in-out infinite", opacity: 0.10, willChange: "transform,opacity" }} />
          <div style={{ position: "absolute", top: "55%", left: "55%", width: 120, height: 120, borderRadius: "50%", background: col, filter: "blur(60px)", animation: "bg-orb-drift-3 7s ease-in-out infinite", opacity: 0.08, willChange: "transform,opacity" }} />
          <div style={{ position: "absolute", top: "50%", left: "-20%", width: "140%", height: 1, background: `linear-gradient(90deg, transparent 0%, ${col}44 30%, ${col}22 70%, transparent 100%)`, animation: "sweep-line 6s ease-in-out infinite", opacity: 0.5, willChange: "transform" }} />
        </div>

        {otherAgents.slice(0, 3).map((bg, i) => {
          const bgCol = AGENT_COLOR[bg.id];
          const offsetX = 14 + i * 18;
          const offsetY = 28 + i * 36;
          const scale = 0.97 - i * 0.02;
          const rotate = (i + 1) * 1.2;
          const cardOpacity = 0.65 - i * 0.12;
          return (
            <div key={bg.id} style={{
              position: "absolute", top: offsetY, right: -offsetX, width: 440, height: 340, borderRadius: 3,
              background: `rgba(20,24,36,${cardOpacity})`, border: `1px solid ${bgCol}22`,
              boxShadow: `0 4px 20px rgba(0,0,0,0.3)`, backdropFilter: "blur(8px)",
              transform: `scale(${scale}) rotate(${rotate}deg)`, transformOrigin: "top left",
              zIndex: 3 - i, transition: "all 0.5s cubic-bezier(.23,1,.32,1)", pointerEvents: "none",
            }} />
          );
        })}

        <div style={{ width: 440, height: 340, position: "relative", perspective: 2000, cursor: "pointer", zIndex: 10, animation: "card-float 6s ease-in-out infinite" }}
          onClick={() => setFlipped(f => !f)}>
          <div key={fadeKey} style={{
            position: "absolute", inset: 0, animation: "cardFadeIn 0.4s ease both",
            transformStyle: "preserve-3d", transition: "transform 0.6s cubic-bezier(.23,1,.32,1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}>
            {/* FRONT */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: 3, padding: 22,
              backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
              background: "rgba(8,11,20,0.92)", border: `1px solid ${col}33`,
              boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${col}12`,
              display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: col, filter: "blur(90px)", opacity: 0.08, pointerEvents: "none" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
                <span style={{ ...mono, fontSize: 8, letterSpacing: "0.2em", color: T.textDim, textTransform: "uppercase" }}>{a.ref}</span>
                <span style={{ ...mono, fontSize: 7, color: `${col}88`, letterSpacing: "0.18em", textTransform: "uppercase" }}>CLICK TO EXPLORE ›</span>
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ ...mono, fontSize: 8, letterSpacing: "0.25em", color: col, textTransform: "uppercase", marginBottom: 6 }}>{a.pillar}</div>
                <div style={{ ...bebas, fontSize: "2.6rem", lineHeight: .85, letterSpacing: "0.04em", color: T.textMain }}>{a.name}</div>
                <p style={{ ...sans, fontSize: 11, color: T.textMid, lineHeight: 1.6, marginTop: 10 }}>{a.tagline}</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", position: "relative", zIndex: 1 }}>
                <p style={{ ...mono, fontSize: 9, color: col, lineHeight: 1.55, borderLeft: `2px solid ${col}66`, paddingLeft: 10, fontStyle: "italic", maxWidth: "78%", opacity: .85 }}>{a.microcopy}</p>
                <span style={{ ...bebas, fontSize: "3rem", color: `${col}09`, lineHeight: 1 }}>{a.num}</span>
              </div>
            </div>
            {/* BACK */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: 3, padding: 22,
              backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "rgba(8,11,20,0.98)", border: `1px solid ${col}44`,
              boxShadow: `0 20px 60px rgba(0,0,0,0.8), 0 0 40px ${col}18`,
              display: "flex", flexDirection: "column", gap: 10, overflow: "hidden",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ ...bebas, fontSize: "1.7rem", color: col, lineHeight: .9 }}>{a.name}</div>
                  <div style={{ ...mono, fontSize: 7, letterSpacing: "0.18em", color: T.textDim, textTransform: "uppercase", marginTop: 4 }}>{a.role}</div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
                  style={{ ...mono, background: "none", border: `1px solid ${T.border}`, color: T.textDim, fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", padding: "5px 8px", cursor: "pointer" }}>✕</button>
              </div>
              <div style={{ width: "100%", height: 1, background: `${col}33` }} />
              <div style={{ ...mono, fontSize: 7, letterSpacing: "0.22em", color: col, textTransform: "uppercase" }}>Tools</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {a.tools.map(t => <span key={t} style={{ ...mono, fontSize: 7, letterSpacing: "0.1em", textTransform: "uppercase", border: `1px solid ${col}33`, color: col, padding: "3px 8px", background: `${col}06` }}>{t}</span>)}
              </div>
              <div style={{ ...mono, fontSize: 7, letterSpacing: "0.22em", color: col, textTransform: "uppercase" }}>Capabilities</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
                {a.caps.map((c, ci) => (
                  <li key={ci} style={{ ...sans, fontSize: 10, color: T.textMid, lineHeight: 1.45, paddingLeft: 12, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: col, fontFamily: "monospace" }}>›</span>{c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateX(8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes breathe-glow {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.5); opacity: 1; }
        }
        @keyframes ripple-ring {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(3.5); opacity: 0; }
        }
        @keyframes card-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-6px) rotate(0.3deg); }
          66% { transform: translateY(-3px) rotate(-0.2deg); }
        }
        @keyframes bg-orb-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.12; }
          25% { transform: translate(30px, -20px) scale(1.1); opacity: 0.18; }
          50% { transform: translate(15px, 10px) scale(0.95); opacity: 0.10; }
          75% { transform: translate(-20px, -10px) scale(1.05); opacity: 0.15; }
        }
        @keyframes bg-orb-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.10; }
          30% { transform: translate(-25px, 15px) scale(1.15); opacity: 0.16; }
          60% { transform: translate(10px, -20px) scale(0.9); opacity: 0.08; }
          80% { transform: translate(20px, 5px) scale(1.08); opacity: 0.14; }
        }
        @keyframes bg-orb-drift-3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.08; }
          40% { transform: translate(-15px, -25px) scale(1.2); opacity: 0.14; }
          70% { transform: translate(20px, 15px) scale(0.85); opacity: 0.06; }
        }
        @keyframes sweep-line {
          0%, 100% { transform: translateY(0px) rotate(-2deg); opacity: 0; }
          10% { opacity: 0.4; }
          50% { transform: translateY(-30px) rotate(1deg); opacity: 0.5; }
          90% { opacity: 0.3; }
        }
      `}</style>
    </>
  );
}

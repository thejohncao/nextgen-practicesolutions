import { useState } from "react";
import { T, AGENTS, AGENT_COLOR } from "../data/assessmentData";
import { mono, bebas, sans, btn } from "../lib/styleHelpers";
import { AgentCard } from "./AgentCard";

interface HomeViewProps {
  onStart: () => void;
}

export function HomeView({ onStart }: HomeViewProps) {
  const [activeAgent, setActiveAgent] = useState<string>("growth");

  const agentTags = [
    { name: "Giselle", copy: "Leads & Growth", color: "#4ade80", id: "growth" },
    { name: "Miles", copy: "Front Office", color: "#60a5fa", id: "management" },
    { name: "Devon", copy: "Case Acceptance", color: "#c084fc", id: "development" },
    { name: "Alma", copy: "Training & Playbooks", color: "#fb7185", id: "academy" },
  ];

  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", maxWidth: 1160, margin: "0 auto", padding: "40px 48px", gap: 48, width: "100%" }}>
      <div style={{ flex: "0 0 54%", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ ...mono, fontSize: 9, letterSpacing: "0.28em", color: T.amber, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ display: "inline-block", width: 18, height: 1, background: T.amberDim, flexShrink: 0 }} />
          AI Operating System for Dental Practices
        </div>
        <h1 style={{ ...bebas, fontSize: "clamp(2.6rem,4.2vw,4rem)", lineHeight: .9, letterSpacing: "0.03em", color: T.textMain, margin: 0 }}>
          The World's First<br /><span style={{ color: T.amber }}>AI Team</span><br />for Dental Practices
        </h1>
        <p style={{ ...sans, fontSize: 15, fontWeight: 500, color: T.textMain, lineHeight: 1.6, maxWidth: 480, opacity: .88 }}>
          Run your front desk, nurture leads, close treatments, and train your staff — all powered by a coordinated AI system.
        </p>
        <p style={{ ...sans, fontSize: 13, color: T.textMid, lineHeight: 1.75, maxWidth: 460 }}>
          Meet Miles, Giselle, Devon, and Alma — four specialized AI agents that grow your practice, protect your time, and help you scale without extra staff.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {agentTags.map(a => {
            const isActive = activeAgent === a.id;
            return (
              <button key={a.name} onClick={() => setActiveAgent(a.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  border: isActive ? `1px solid ${a.color}66` : `1px solid ${a.color}33`,
                  padding: "5px 12px", borderRadius: 2, cursor: "pointer",
                  background: isActive ? `${a.color}14` : `${a.color}06`,
                  boxShadow: isActive ? `0 0 12px ${a.color}18` : "none",
                  transition: "all 0.25s ease",
                }}>
                <span style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, flexShrink: 0, overflow: "visible" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: a.color, boxShadow: `0 0 8px 2px ${a.color}88`, animation: "breathe-glow 3s cubic-bezier(0.4,0,0.6,1) infinite", willChange: "transform,opacity" }} />
                  {isActive && [0, 1.5].map(d => (
                    <span key={d} style={{ position: "absolute", top: "50%", left: "50%", width: 7, height: 7, borderRadius: "50%", border: `1.5px solid ${a.color}88`, animation: `ripple-ring 3s cubic-bezier(0,0,0.2,1) ${d}s infinite`, opacity: 0, pointerEvents: "none" }} />
                  ))}
                </span>
                <span style={{ ...mono, fontSize: 8, letterSpacing: "0.15em", color: a.color, textTransform: "uppercase" }}>{a.name}</span>
                <span style={{ ...mono, fontSize: 8, color: isActive ? a.color : T.textDim, letterSpacing: "0.08em", transition: "color 0.25s ease" }}>— {a.copy}</span>
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 6, flexWrap: "wrap" }}>
          <button onClick={onStart} style={{
            ...btn(),
            display: "inline-flex", alignItems: "center", gap: 12,
            width: "fit-content", position: "relative", overflow: "hidden",
          }}>
            <span>Take the 100-Point Assessment</span>
            <span style={{ fontSize: 15 }}>→</span>
          </button>
          <span style={{ ...mono, fontSize: 8, color: T.textDim, letterSpacing: "0.12em" }}>15–20 MIN · FREE</span>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <AgentCard activeAgent={activeAgent} />
      </div>
    </div>
  );
}

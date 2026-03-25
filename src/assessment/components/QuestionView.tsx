import { useState, useEffect } from "react";
import { T, CATS, Q, CC } from "../data/assessmentData";
import type { ScoreData } from "../lib/assessmentScoring";
import { fmt } from "../lib/assessmentScoring";
import { mono, bebas, sans, btn } from "../lib/styleHelpers";

interface QuestionViewProps {
  ci: number;
  qi: number;
  ans: Record<string, number>;
  sc: ScoreData;
  onAnswer: (key: string, val: number) => void;
  onNext: (i?: number) => void;
  onPrev: () => void;
  onFinish: () => void;
  onResults: () => void;
}

export function QuestionView({ ci, qi, ans, sc, onAnswer, onNext, onPrev, onFinish, onResults }: QuestionViewProps) {
  const [tipOn, setTipOn] = useState(false);
  const catQs = Q.filter(q => q.c === ci);
  const cur = catQs[qi];
  const curKey = `${ci}-${qi}`;
  const cat = CATS[ci];
  const col = cat.color;
  const cs = sc.cd[ci];
  const catPct = Math.round((cs.ans / CC[ci]) * 100);
  const isLast = qi === catQs.length - 1;

  useEffect(() => setTipOn(false), [ci, qi]);

  const opts = [
    { label: "Yes — we have this", v: 1, icon: "✓", color: T.grn, bg: T.grnBg },
    { label: "Partial — started but inconsistent", v: 0.5, icon: "~", color: T.amb, bg: T.ambBg },
    { label: "No — we don't have this", v: 0, icon: "✗", color: T.red, bg: T.redBg },
  ];

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, ...mono }}>
          <span style={{ fontSize: 16 }}>{cat.icon}</span>
          <span style={{ fontSize: 10, color: col, letterSpacing: "0.15em", fontWeight: 600 }}>{cat.short}</span>
          <span style={{ fontSize: 9, color: T.textDim }}>·</span>
          <span style={{ fontSize: 9, color: T.textDim, letterSpacing: "0.1em" }}>{cs.ans}/{CC[ci]} answered</span>
        </div>
        <span style={{ ...mono, fontSize: 9, color: T.textDim, letterSpacing: "0.12em" }}>{cs.earned % 1 === 0 ? cs.earned : cs.earned.toFixed(1)} / {cat.weight} pts</span>
      </div>

      <div style={{ width: "100%", height: 2, background: "rgba(255,255,255,0.06)", marginBottom: 20, position: "relative", borderRadius: 1 }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", background: col, width: `${catPct}%`, transition: "width 0.4s", borderRadius: 1 }} />
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 20, flexWrap: "wrap" }}>
        {catQs.map((_, i) => {
          const k = `${ci}-${i}`;
          const a = ans[k];
          const active = i === qi;
          const bg = a === 1 ? T.grn : a === 0.5 ? T.amb : a === 0 ? T.red : active ? col : "rgba(255,255,255,0.06)";
          return (
            <button key={i} onClick={() => onNext(i)} style={{
              width: 24, height: 24, borderRadius: 2, border: active ? `1px solid ${col}` : "none",
              background: bg, color: "rgba(255,255,255,0.9)", fontSize: 9, ...mono, cursor: "pointer",
            }}>{i + 1}</button>
          );
        })}
      </div>

      <div style={{ background: `${col}08`, border: `1px solid ${col}33`, borderRadius: 4, padding: 28, marginBottom: 16 }}>
        <div style={{ ...mono, fontSize: 9, color: T.textDim, letterSpacing: "0.12em", marginBottom: 12 }}>Q{qi + 1}/{catQs.length}</div>
        <div style={{ ...sans, fontSize: 16, fontWeight: 500, color: T.textMain, lineHeight: 1.6, marginBottom: 18 }}>{cur.t}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
          <span style={{ ...mono, fontSize: 9, color: T.textDim, letterSpacing: "0.12em", textTransform: "uppercase" }}>Revenue at risk</span>
          <span style={{ ...bebas, fontSize: "1.55rem", color: col, lineHeight: 1, letterSpacing: "0.03em" }}>${fmt(cur.mn)}–${fmt(cur.mx)}</span>
          <span style={{ ...mono, fontSize: 9, color: `${col}88`, letterSpacing: "0.08em" }}>/mo</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {opts.map(o => {
          const sel = ans[curKey] === o.v;
          return (
            <button key={o.v} onClick={() => onAnswer(curKey, o.v)} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", width: "100%",
              background: sel ? o.bg : "transparent",
              border: `1px solid ${sel ? o.color : T.border}`,
              borderRadius: 2, cursor: "pointer", textAlign: "left",
              transition: "all 0.2s",
            }}>
              <span style={{ width: 22, height: 22, borderRadius: "50%", border: `1px solid ${sel ? o.color : "rgba(255,255,255,0.12)"}`, display: "flex", alignItems: "center", justifyContent: "center", ...mono, fontSize: 10, color: sel ? o.color : T.textDim, flexShrink: 0 }}>{o.icon}</span>
              <span style={{ ...sans, fontSize: 14, fontWeight: sel ? 600 : 400, color: sel ? o.color : T.textMid, flex: 1 }}>{o.label}</span>
              {sel && <span style={{ ...mono, fontSize: 9, color: o.color, letterSpacing: "0.1em" }}>{o.v === 1 ? "+1" : o.v === 0.5 ? "+0.5" : "0 pts"}</span>}
            </button>
          );
        })}
      </div>

      <button onClick={() => setTipOn(!tipOn)} style={{ ...mono, background: "transparent", border: `1px solid ${T.border}`, color: T.textDim, padding: "6px 14px", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", marginBottom: tipOn ? 10 : 0 }}>
        {tipOn ? "Hide Context ▲" : "Why This Matters ▼"}
      </button>
      {tipOn && (
        <div style={{ background: `${col}06`, border: `1px solid ${col}22`, borderLeft: `2px solid ${col}`, borderRadius: 4, padding: 16, marginTop: 10, marginBottom: 16, ...sans, fontSize: 13, color: T.textMid, lineHeight: 1.75 }}>
          {cur.tip}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
        <button onClick={onPrev} style={{ ...mono, background: "transparent", border: `1px solid ${T.border}`, color: T.textDim, padding: "10px 18px", fontSize: 10, letterSpacing: "0.15em", cursor: "pointer" }}>← Prev</button>
        <div style={{ display: "flex", gap: 10 }}>
          {sc.answered >= 50 && (
            <button onClick={onResults} style={{ ...mono, background: "transparent", border: `1px solid ${col}`, color: col, padding: "10px 16px", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>
              See Results
            </button>
          )}
          {isLast
            ? <button onClick={onFinish} style={{ ...btn({ background: ci === 5 ? T.amber : cat.color, color: T.bg, border: "none", padding: "11px 24px", fontSize: 10 }) }}><span>{ci === 5 ? "Finish → Report" : "Next Section →"}</span></button>
            : <button onClick={() => onNext()} style={{ ...btn({ background: cat.color, color: T.bg, border: "none", padding: "11px 24px", fontSize: 10 }) }}><span>Next →</span></button>
          }
        </div>
      </div>
    </div>
  );
}

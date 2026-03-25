import { T, CATS, CC, INTRO_GRADIENTS } from "../data/assessmentData";
import type { ScoreData } from "../lib/assessmentScoring";
import { mono, bebas, sans } from "../lib/styleHelpers";
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";

interface IntroViewProps {
  ci: number;
  sc: ScoreData;
  onBegin: () => void;
  onJump: (i: number) => void;
}

export function IntroView({ ci, sc, onBegin, onJump }: IntroViewProps) {
  const cat = CATS[ci];
  const cs = sc.cd[ci];
  const col = cat.color;
  return (
    <div style={{ position: "relative", overflow: "hidden", minHeight: "80vh" }}>
      <AnimatedGradient colors={INTRO_GRADIENTS[ci] ?? INTRO_GRADIENTS[0]} speed={0.05} blur="medium" />
      <div style={{ position: "relative", zIndex: 10, maxWidth: 640, margin: "0 auto", padding: "48px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 42, marginBottom: 14 }}>{cat.icon}</div>
        <div style={{ ...mono, fontSize: 9, letterSpacing: "0.25em", color: T.textDim, marginBottom: 8, textTransform: "uppercase" }}>Category {ci + 1} of 6</div>
        <div style={{ ...bebas, fontSize: "2.4rem", color: col, letterSpacing: "0.04em", marginBottom: 10 }}>{cat.name}</div>
        <p style={{ ...sans, fontSize: 14, color: T.textMid, lineHeight: 1.75, marginBottom: 28, maxWidth: 480, margin: "0 auto 28px" }}>{cat.desc}</p>
        <div style={{ display: "inline-flex", gap: 20, background: `${col}08`, border: `1px solid ${col}33`, borderRadius: 3, padding: "16px 28px", marginBottom: 28 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ ...bebas, fontSize: "1.8rem", color: col, lineHeight: 1 }}>{CC[ci]}</div>
            <div style={{ ...mono, fontSize: 8, color: T.textDim, letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 2 }}>Questions</div>
          </div>
          <div style={{ width: 1, background: `${col}33` }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ ...bebas, fontSize: "1.8rem", color: col, lineHeight: 1 }}>{cat.weight}</div>
            <div style={{ ...mono, fontSize: 8, color: T.textDim, letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 2 }}>Points</div>
          </div>
          {cs.ans > 0 && <>
            <div style={{ width: 1, background: `${col}33` }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ ...bebas, fontSize: "1.8rem", color: T.grn, lineHeight: 1 }}>{cs.earned % 1 === 0 ? cs.earned : cs.earned.toFixed(1)}</div>
              <div style={{ ...mono, fontSize: 8, color: T.textDim, letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 2 }}>Earned</div>
            </div>
          </>}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 28 }}>
          {CATS.map((c, i) => {
            const done = sc.cd[i].ans === CC[i];
            const active = i === ci;
            return (
              <button key={i} onClick={() => onJump(i)} style={{
                width: 34, height: 34, borderRadius: 2, cursor: "pointer",
                border: `1px solid ${active ? c.color : done ? "rgba(74,222,128,0.4)" : T.border}`,
                background: active ? `${c.color}18` : done ? "rgba(74,222,128,0.08)" : "transparent",
                ...mono, fontSize: 10, fontWeight: 600,
                color: active ? c.color : done ? T.grn : T.textDim,
              }}>{i + 1}</button>
            );
          })}
        </div>
        <button onClick={onBegin} style={{
          background: col, color: T.bg, border: "none", padding: "14px 36px",
          fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.2em",
          textTransform: "uppercase", cursor: "pointer",
        }}>{cs.ans > 0 ? "Continue →" : "Begin Section →"}</button>
      </div>
    </div>
  );
}

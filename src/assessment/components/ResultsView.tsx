import { T, CATS, PILS, PKGS } from "../data/assessmentData";
import { type ScoreData, getTier, fmt, bandLabel } from "../lib/assessmentScoring";
import { mono, bebas, sans, btn, card, amberCard } from "../lib/styleHelpers";
import { Ring } from "./Ring";

interface ResultsViewProps {
  sc: ScoreData;
  onReport: () => void;
  onRetake: () => void;
  onContinue: () => void;
}

export function ResultsView({ sc, onReport, onRetake, onContinue }: ResultsViewProps) {
  const score = sc.total;
  const tier = getTier(score);
  const pillarScores = PILS.map(pil => {
    const d = sc.pd[pil.key];
    return { ...pil, earned: d.earned, possible: d.possible, pct: d.possible > 0 ? Math.round((d.earned / d.possible) * 100) : 0, lkMn: d.lkMn, lkMx: d.lkMx };
  });
  const weakest = [...pillarScores].sort((a, b) => a.pct - b.pct)[0];
  const strongest = [...pillarScores].sort((a, b) => b.pct - a.pct)[0];

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px" }}>
      <div style={{ ...mono, fontSize: 9, letterSpacing: "0.25em", color: T.amber, textTransform: "uppercase", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 16, height: 1, background: T.amberDim, display: "inline-block" }} />
        Practice Health Report · {sc.answered} of 100 Questions Answered
      </div>

      <div style={{ ...amberCard({ padding: 28, marginBottom: 16, display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }) }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ring pct={score} size={110} stroke={7} color={tier.color} />
          <div style={{ position: "absolute", textAlign: "center" }}>
            <div style={{ ...bebas, fontSize: "2.2rem", color: tier.color, lineHeight: 1 }}>{score % 1 === 0 ? score : score.toFixed(1)}</div>
            <div style={{ ...mono, fontSize: 8, color: T.textDim, letterSpacing: "0.12em" }}>/100</div>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 14px", borderRadius: 2, background: tier.bg, border: `1px solid ${tier.color}30`, marginBottom: 10 }}>
            <span style={{ ...mono, fontSize: 10, fontWeight: 700, color: tier.color, letterSpacing: "0.15em", textTransform: "uppercase" }}>{tier.label}</span>
          </div>
          <p style={{ ...mono, fontSize: 11, color: T.textMid, lineHeight: 1.7, marginBottom: 12 }}>{tier.body}</p>
          <div style={{ borderLeft: `2px solid ${T.amber}`, paddingLeft: 14 }}>
            <div style={{ ...mono, fontSize: 8, color: T.amber, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>What We Would Focus On</div>
            <div style={{ ...mono, fontSize: 10, color: T.textMid, lineHeight: 1.65 }}>{tier.focus}</div>
          </div>
        </div>
      </div>

      {sc.lkMn > 0 && (
        <div style={{ ...card({ padding: 20, marginBottom: 16, borderColor: "rgba(248,113,113,0.2)", background: "rgba(248,113,113,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }) }}>
          <span style={{ ...mono, fontSize: 9, color: T.red, letterSpacing: "0.18em", textTransform: "uppercase" }}>Estimated Revenue at Risk</span>
          <div style={{ textAlign: "right" }}>
            <div style={{ ...bebas, fontSize: "1.8rem", color: T.red, lineHeight: 1 }}>${fmt(sc.lkMn)}–${fmt(sc.lkMx)}<span style={{ ...mono, fontSize: 10, fontWeight: 400 }}>/mo</span></div>
            <div style={{ ...mono, fontSize: 9, color: T.red, opacity: .6 }}>${fmt(sc.lkMn * 12)}–${fmt(sc.lkMx * 12)} / year</div>
          </div>
        </div>
      )}

      <div style={{ ...amberCard({ padding: 24, marginBottom: 16 }) }}>
        <div style={{ ...bebas, fontSize: "1.4rem", color: T.textMain, letterSpacing: "0.04em", marginBottom: 4 }}>Practice Growth Scorecard</div>
        <div style={{ ...mono, fontSize: 9, color: T.textDim, marginBottom: 20, letterSpacing: "0.1em" }}>Three pillars of a next-generation practice</div>
        {sc.answered >= 20 && (
          <div style={{ ...mono, fontSize: 10, color: T.textMid, lineHeight: 1.7, borderLeft: `2px solid ${T.amber}`, paddingLeft: 14, marginBottom: 20 }}>
            Strongest in <strong style={{ color: strongest.color }}>{strongest.name}</strong>. Biggest opportunity: <strong style={{ color: weakest.color }}>{weakest.name}</strong>.
          </div>
        )}
        {pillarScores.map((pil, i) => {
          const band = bandLabel(pil.pct);
          return (
            <div key={i} style={{ marginBottom: i < 2 ? 20 : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14 }}>{pil.icon}</span>
                  <span style={{ ...mono, fontSize: 11, color: pil.color, letterSpacing: "0.08em" }}>{pil.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ ...bebas, fontSize: "1.6rem", color: pil.color, lineHeight: 1 }}>{pil.pct}%</span>
                  <span style={{ ...mono, fontSize: 8, color: band.color, background: band.bg, padding: "2px 8px", border: `1px solid ${band.color}30`, letterSpacing: "0.1em" }}>{band.text}</span>
                </div>
              </div>
              <div style={{ height: 2, background: "rgba(255,255,255,0.05)", borderRadius: 1, marginBottom: 8 }}>
                <div style={{ height: "100%", width: `${pil.pct}%`, background: pil.color, borderRadius: 1, transition: "width 0.8s" }} />
              </div>
              <div style={{ ...mono, fontSize: 9, color: band.color, fontStyle: "italic", letterSpacing: "0.04em" }}>{pil.pct >= 70 ? pil.high : pil.pct >= 40 ? pil.mid : pil.low}</div>
            </div>
          );
        })}
      </div>

      {sc.gaps.length > 0 && (
        <div style={{ ...amberCard({ padding: 24, marginBottom: 16 }) }}>
          <div style={{ ...bebas, fontSize: "1.4rem", color: T.textMain, letterSpacing: "0.04em", marginBottom: 4 }}>Top Gaps — Ranked by Impact</div>
          <div style={{ ...mono, fontSize: 9, color: T.textDim, marginBottom: 18, letterSpacing: "0.1em" }}>Sorted by revenue at risk</div>
          {sc.gaps.slice(0, 7).map((g, i) => {
            const cm = CATS[g.c];
            const pl = PILS.find(p => p.key === g.p)!;
            const pkg = PKGS[g.pk];
            const loss = g.a === 0 ? `$${fmt(g.mn)}–$${fmt(g.mx)}/mo` : `$${fmt(Math.round(g.mn * .5))}–$${fmt(Math.round(g.mx * .5))}/mo`;
            return (
              <div key={i} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: i < 6 ? `1px solid ${T.border}` : "none" }}>
                <div style={{ ...bebas, fontSize: "1.1rem", color: g.m ? T.red : T.amber, width: 20, flexShrink: 0, lineHeight: 1, paddingTop: 2 }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ ...mono, fontSize: 8, color: cm.color, background: `${cm.color}11`, padding: "1px 6px", letterSpacing: "0.1em" }}>{cm.short}</span>
                    <span style={{ ...mono, fontSize: 8, color: pl.color, background: pl.bg, padding: "1px 6px", letterSpacing: "0.1em" }}>{pl.name.replace("Practice ", "")}</span>
                    {g.m && <span style={{ ...mono, fontSize: 8, color: T.red, background: T.redBg, padding: "1px 6px", letterSpacing: "0.1em" }}>HIGH IMPACT</span>}
                  </div>
                  <div style={{ ...mono, fontSize: 10, color: T.textMain, marginBottom: 4, lineHeight: 1.45 }}>{g.t.length > 88 ? g.t.slice(0, 88) + "..." : g.t}</div>
                  <div style={{ ...mono, fontSize: 9 }}>
                    <span style={{ color: T.red }}>{loss}</span>
                    <span style={{ color: T.textDim }}> → </span>
                    <span style={{ color: T.amber }}>{pkg.name}</span>
                  </div>
                </div>
              </div>
            );
          })}
          {sc.gaps.length > 7 && <div style={{ ...mono, fontSize: 9, color: T.textDim, paddingTop: 10, fontStyle: "italic" }}>+ {sc.gaps.length - 7} more gaps in full report</div>}
        </div>
      )}

      <div style={{ ...amberCard({ padding: 28, marginBottom: 16, textAlign: "center" }) }}>
        <div style={{ ...bebas, fontSize: "1.6rem", color: T.amber, letterSpacing: "0.04em", marginBottom: 8 }}>Get Your Full Report</div>
        <p style={{ ...mono, fontSize: 10, color: T.textMid, lineHeight: 1.7, marginBottom: 20 }}>Pillar-by-pillar breakdown with package recommendations, pricing, and ROI for every gap identified.</p>
        <button onClick={onReport} style={{ ...btn({ background: T.amber, color: T.bg, border: "none", padding: "14px 32px", fontSize: 11 }) }}>View & Download Full Report →</button>
      </div>

      <div style={{ ...card({ padding: 28, marginBottom: 16 }) }}>
        <p style={{ ...mono, fontSize: 11, color: T.textMid, lineHeight: 1.75, marginBottom: 20 }}>{tier.cta}</p>
        <button style={{ ...btn({ background: T.amber, color: T.bg, border: "none", padding: "14px 24px", fontSize: 11, width: "100%" }) }}>Book Your NextGen Roadmap Call →</button>
        <div style={{ ...mono, fontSize: 8, color: T.textDim, textAlign: "center", marginTop: 10, letterSpacing: "0.12em" }}>No pitch, no pressure. Just a conversation about your practice.</div>
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
        {sc.answered < 100 && <button onClick={onContinue} style={{ ...btn({ fontSize: 9, padding: "10px 18px" }) }}>Complete Remaining ({100 - sc.answered} left)</button>}
        <button onClick={onRetake} style={{ ...mono, background: "transparent", border: `1px solid ${T.border}`, color: T.textDim, padding: "10px 18px", fontSize: 9, cursor: "pointer", letterSpacing: "0.15em", textTransform: "uppercase" }}>Retake Assessment</button>
      </div>
    </div>
  );
}

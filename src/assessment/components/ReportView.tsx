import { T, CATS, PILS, PKGS } from "../data/assessmentData";
import { type ScoreData, getTier, fmt, getRecommendations } from "../lib/assessmentScoring";
import { mono } from "../lib/styleHelpers";
import { Ring } from "./Ring";

interface ReportViewProps {
  sc: ScoreData;
  onBack: () => void;
}

export function ReportView({ sc, onBack }: ReportViewProps) {
  const score = sc.total;
  const tier = getTier(score);
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const pillarScores = PILS.map(pil => {
    const d = sc.pd[pil.key];
    return { ...pil, earned: d.earned, possible: d.possible, pct: d.possible > 0 ? Math.round((d.earned / d.possible) * 100) : 0, lkMn: d.lkMn, lkMx: d.lkMx };
  });
  const gapsByPillar: Record<string, typeof sc.gaps> = { G: [], M: [], D: [] };
  sc.gaps.forEach(g => gapsByPillar[g.p].push(g));
  const weakest = [...pillarScores].sort((a, b) => a.pct - b.pct)[0];
  const bandLabel = (pct: number) => pct >= 70 ? "Growth Engine" : pct >= 40 ? "In Progress" : "Needs Attention";

  const rec = getRecommendations(sc);
  const basePath = import.meta.env.BASE_URL || '/';
  const portalUrl = `${basePath}portal/onboarding?score=${score}&g=${pillarScores.find(p => p.key === 'G')?.pct || 0}&m=${pillarScores.find(p => p.key === 'M')?.pct || 0}&d=${pillarScores.find(p => p.key === 'D')?.pct || 0}&pkgs=${rec.ranked.map(r => r.key).join(',')}&leak=${sc.lkMn}`;

  return (
    <div style={{ background: "white", color: "#1a1a1a", fontFamily: "'DM Mono',monospace", minHeight: "100vh" }}>
      <style>{`
        @media print{body{margin:0;}.no-print{display:none!important;}.pg{page-break-before:always;}}
        .rpt{padding:40px 48px;max-width:800px;margin:0 auto;}
        .tbl{width:100%;border-collapse:collapse;font-size:11px;margin:14px 0;}
        .tbl th{background:#1B2A4A;color:white;padding:8px 10px;text-align:left;font-weight:600;font-size:10px;letter-spacing:0.1em;}
        .tbl td{padding:8px 10px;border-bottom:1px solid #E2E5EB;vertical-align:top;}
        .tbl tr:nth-child(even){background:#F9FAFB;}
      `}</style>

      <div className="no-print" style={{ position: "sticky", top: 0, zIndex: 100, background: "#1B2A4A", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "white", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em" }}>NEXTGEN // FULL REPORT</span>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onBack} style={{ padding: "8px 18px", background: "transparent", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.4)", fontSize: 11, cursor: "pointer", letterSpacing: "0.1em" }}>← Back to Results</button>
          <button onClick={() => window.print()} style={{ padding: "8px 18px", background: "#C9A84C", color: "#1B2A4A", border: "none", fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: "0.1em" }}>Download PDF ↓</button>
        </div>
      </div>

      <div className="rpt">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#C9A84C", fontWeight: 600, marginBottom: 8 }}>NEXTGEN PRACTICE SOLUTIONS</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#1B2A4A", marginBottom: 4 }}>Practice Health Report</div>
          <div style={{ fontSize: 11, color: "#6B7280" }}>Assessment Date: {today}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24, padding: 20, border: `2px solid ${tier.color}22`, borderRadius: 8, marginBottom: 20 }}>
          <Ring pct={score} size={85} stroke={6} color={tier.color} />
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 12, background: tier.bg, marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: tier.color, letterSpacing: "0.1em" }}>{tier.label}</span>
            </div>
            <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6 }}>{tier.body}</div>
          </div>
        </div>

        {sc.lkMn > 0 && (
          <div style={{ background: "#FEF2F2", borderRadius: 8, padding: 18, textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#6B7280", letterSpacing: "0.1em", marginBottom: 4 }}>TOTAL ESTIMATED REVENUE AT RISK</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#DC2626" }}>${fmt(sc.lkMn)}–${fmt(sc.lkMx)} / month</div>
            <div style={{ fontSize: 11, color: "#DC2626", marginTop: 2 }}>${fmt(sc.lkMn * 12)}–${fmt(sc.lkMx * 12)} / year</div>
          </div>
        )}

        <div style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", marginBottom: 12 }}>Pillar Score Summary</div>
        {pillarScores.map((pil, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: pil.color }}>{pil.icon} {pil.name}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: pil.color }}>{pil.pct}%</span>
                <span style={{ fontSize: 9, color: pil.pct >= 70 ? "#16A34A" : pil.pct >= 40 ? "#EA580C" : "#DC2626", background: pil.pct >= 70 ? "#F0FDF4" : pil.pct >= 40 ? "#FFF7ED" : "#FEF2F2", padding: "2px 8px", borderRadius: 8, fontWeight: 600 }}>{bandLabel(pil.pct)}</span>
              </div>
            </div>
            <div style={{ height: 5, background: "#F1F5F9", borderRadius: 3 }}><div style={{ height: "100%", width: `${pil.pct}%`, background: pil.color, borderRadius: 3 }} /></div>
          </div>
        ))}
      </div>

      {pillarScores.map((pil, pi) => {
        const pilGaps = gapsByPillar[pil.key].slice(0, 8);
        if (pilGaps.length === 0 && pil.pct >= 70) return null;
        return (
          <div key={pi} className="pg rpt">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, borderBottom: `2px solid ${pil.color}`, paddingBottom: 10 }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: pil.color }}>{pil.icon} {pil.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: pil.color }}>{pil.pct}%</span>
                <span style={{ fontSize: 9, fontWeight: 600, color: pil.pct >= 70 ? "#16A34A" : pil.pct >= 40 ? "#EA580C" : "#DC2626", background: pil.pct >= 70 ? "#F0FDF4" : pil.pct >= 40 ? "#FFF7ED" : "#FEF2F2", padding: "3px 10px", borderRadius: 8 }}>{bandLabel(pil.pct)}</span>
              </div>
            </div>
            <div style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.65, marginBottom: 14 }}>{pil.desc}</div>
            {pil.lkMn > 0 && <div style={{ background: "#FEF2F2", borderRadius: 6, padding: 12, marginBottom: 14, fontSize: 11 }}><span style={{ fontWeight: 600, color: "#DC2626" }}>Estimated monthly leak from this pillar: ${fmt(pil.lkMn)}–${fmt(pil.lkMx)}</span></div>}
            {pilGaps.length > 0 && (
              <table className="tbl">
                <thead><tr><th style={{ width: "60%" }}>Gap</th><th>Leak/mo</th></tr></thead>
                <tbody>
                  {pilGaps.map((g, gi) => {
                    const loss = g.a === 0 ? `$${fmt(g.mn)}–$${fmt(g.mx)}` : `$${fmt(Math.round(g.mn * .5))}–$${fmt(Math.round(g.mx * .5))}`;
                    return (
                      <tr key={gi}>
                        <td style={{ fontWeight: 500 }}>{g.t.length > 68 ? g.t.slice(0, 68) + "..." : g.t}{g.m && <span style={{ color: "#DC2626", fontSize: 9 }}> ★ HIGH</span>}</td>
                        <td style={{ color: "#DC2626", fontWeight: 600, whiteSpace: "nowrap" }}>{loss}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        );
      })}

      {/* Recommended Path */}
      <div className="pg rpt">
        <div style={{ fontSize: 17, fontWeight: 700, color: "#1B2A4A", marginBottom: 16 }}>Your Recommended Path</div>
        <div style={{ fontSize: 12, color: "#2D2D2D", lineHeight: 1.7, marginBottom: 20, padding: 16, background: "#FBF6E8", borderRadius: 8, borderLeft: "3px solid #C9A84C" }}>
          Your biggest opportunity is in <strong style={{ color: weakest.color }}>{weakest.name}</strong> at <strong>{weakest.pct}%</strong>.
          {sc.lkMn > 0 && <> You're leaving an estimated <strong style={{ color: "#DC2626" }}>${fmt(sc.lkMn)}–${fmt(sc.lkMx)}/month</strong> in preventable leaks.</>}
          {rec.ranked.length > 0 && <> We've identified <strong>{rec.ranked.length} services</strong> across <strong>{rec.phases.length} phases</strong> to close your gaps.</>}
        </div>

        <div style={{ display: "flex", gap: 0, marginBottom: 24 }}>
          {rec.phases.map((ph, i) => (
            <div key={ph.num} style={{ flex: 1, position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#1B2A4A", color: "#C9A84C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{ph.num}</div>
                {i < rec.phases.length - 1 && <div style={{ flex: 1, height: 2, background: "#E2E5EB" }} />}
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#1B2A4A" }}>{ph.name}</div>
              <div style={{ fontSize: 9, color: "#C9A84C", fontWeight: 600, letterSpacing: "0.1em" }}>{ph.timeline}</div>
              <div style={{ fontSize: 9, color: "#6B7280", marginTop: 2 }}>{ph.services.length} service{ph.services.length > 1 ? "s" : ""}</div>
            </div>
          ))}
        </div>
      </div>

      {rec.phases.map(ph => (
        <div key={ph.num} className="pg rpt">
          <div style={{ borderLeft: "3px solid #C9A84C", paddingLeft: 16, marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#1B2A4A" }}>Phase {ph.num}: {ph.name}</span>
              <span style={{ fontSize: 9, fontWeight: 600, color: "#C9A84C", background: "rgba(201,168,76,0.12)", padding: "3px 10px", borderRadius: 8, letterSpacing: "0.08em" }}>{ph.timeline}</span>
            </div>
            <div style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.6 }}>{ph.desc}</div>
          </div>

          {ph.services.map((sv, si) => (
            <div key={sv.key} style={{ background: "#F9FAFB", borderLeft: `3px solid ${sv.status.color}`, borderRadius: 6, padding: 16, marginBottom: si < ph.services.length - 1 ? 12 : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A" }}>{sv.pkg.name}</span>
                  <span style={{ fontSize: 9, fontWeight: 600, color: sv.status.color, background: sv.status.bg, padding: "2px 8px", borderRadius: 8 }}>{sv.status.label}</span>
                </div>
                <span style={{ fontSize: 9, fontWeight: 600, color: "#6B7280", letterSpacing: "0.08em" }}>PRIORITY #{si + 1}</span>
              </div>
              <div style={{ display: "flex", gap: 16, marginBottom: 8, flexWrap: "wrap" }}>
                <div style={{ fontSize: 10, color: "#6B7280" }}><strong style={{ color: "#1B2A4A" }}>{sv.gapCount}</strong> gap{sv.gapCount > 1 ? "s" : ""} identified{sv.highCount > 0 && <span style={{ color: "#DC2626" }}> ({sv.highCount} high-impact)</span>}</div>
                <div style={{ fontSize: 10, color: "#DC2626", fontWeight: 600 }}>${fmt(sv.leakMin)}–${fmt(sv.leakMax)}/mo at risk</div>
              </div>
              <div style={{ marginBottom: 10 }}>
                {sv.gaps.slice(0, 3).map((g, gi) => (
                  <div key={gi} style={{ fontSize: 10, color: "#6B7280", lineHeight: 1.6, paddingLeft: 10, borderLeft: "1px solid #E2E5EB", marginBottom: 2 }}>
                    {g.t.length > 72 ? g.t.slice(0, 72) + "…" : g.t}{g.m && <span style={{ color: "#DC2626", fontSize: 8 }}> ★</span>}
                  </div>
                ))}
                {sv.gaps.length > 3 && <div style={{ fontSize: 9, color: "#9CA3AF", paddingLeft: 10 }}>+{sv.gaps.length - 3} more gap{sv.gaps.length - 3 > 1 ? "s" : ""}</div>}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Portal CTA + Footer */}
      <div className="pg rpt">
        <div style={{ textAlign: "center", padding: 28, background: "#1B2A4A", borderRadius: 8 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#C9A84C", marginBottom: 6 }}>Ready to activate your roadmap?</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 20, lineHeight: 1.6 }}>Your assessment results will pre-load into your portal — no re-entry needed.</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={portalUrl} style={{ display: "inline-block", padding: "14px 28px", background: "#C9A84C", color: "#1B2A4A", fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", textDecoration: "none", borderRadius: 4, textTransform: "uppercase" }}>Start Your Practice Roadmap →</a>
            <button onClick={() => window.print()} style={{ padding: "14px 28px", background: "transparent", border: "1px solid rgba(201,168,76,0.4)", color: "#C9A84C", fontSize: 11, letterSpacing: "0.1em", cursor: "pointer", borderRadius: 4, textTransform: "uppercase" }}>Download PDF ↓</button>
          </div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", marginTop: 14, letterSpacing: "0.1em" }}>app.nextgenpractice.org/portal</div>
        </div>
        <div style={{ textAlign: "center", marginTop: 24, fontSize: 10, color: "#9CA3AF" }}>NextGen Practice Solutions · app.nextgenpractice.org</div>
      </div>
    </div>
  );
}

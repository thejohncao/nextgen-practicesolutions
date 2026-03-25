// ═══════════════════════════════════════════════════════════
// ASSESSMENT SCORING — All scoring logic, tier computation, recommendations
// ═══════════════════════════════════════════════════════════

import {
  type Question,
  T, CATS, PILS, PKGS, SERVICE_STATUS, PHASE_MAP, PHASE_META, Q, CC,
} from "../data/assessmentData";

// ── SCORE DATA SHAPE ──
export interface ScoreData {
  total: number;
  answered: number;
  lkMn: number;
  lkMx: number;
  cd: { earned: number; ans: number; cnt: number; lkMn: number; lkMx: number }[];
  pd: Record<string, { earned: number; possible: number; lkMn: number; lkMx: number }>;
  gaps: (Question & { li: number; a: number })[];
}

// ── TIER ──
export interface Tier {
  label: string;
  color: string;
  bg: string;
  body: string;
  bullets: string[];
  focus: string;
  cta: string;
}

export function getTier(s: number): Tier {
  if (s >= 85)
    return {
      label: "HIGH PERFORMER", color: T.grn, bg: T.grnBg,
      body: "Your practice has strong systems and a clear growth engine. You're doing what most practices never get around to.",
      bullets: ["Consistent new patient flow and solid reputation.", "Team follows defined processes and tracks metrics.", "Main opportunity: leverage through automation and AI."],
      focus: "We focus on AI agents, deeper automation, and advanced reporting so you grow without more stress.",
      cta: "We can walk through your score and map how an AI-powered operating system could free up your team.",
    };
  if (s >= 65)
    return {
      label: "GROWTH READY", color: T.blue, bg: T.blueBg,
      body: "Solid foundation. The gaps that remain are fixable and highly leverageable — improvements that meaningfully increase production without starting over.",
      bullets: ["Pieces of a strong system, but not fully connected.", "Some leads, cases, or patients slipping through cracks.", "A few missing systems holding you back."],
      focus: "We tighten front-office systems, plug the biggest leaks in follow-up and acceptance, then automate.",
      cta: "We can review your results and build an action plan to turn this score into predictable growth.",
    };
  if (s >= 45)
    return {
      label: "AT RISK", color: T.amb, bg: T.ambBg,
      body: "Serious revenue slipping through the cracks. This doesn't mean bad dentistry — it means the business systems around your clinical work need to catch up.",
      bullets: ["Opportunities lost before they reach the chair.", "Treatment stalling or never getting started.", "Key processes live in people's heads, not systems."],
      focus: "We build a true operating system: clear patient journeys, consistent follow-up, automation over heroics.",
      cta: "We can walk through your gaps and outline what closing a few of them means for your monthly production.",
    };
  return {
    label: "CRITICAL", color: T.red, bg: T.redBg,
    body: "From a business and systems perspective, your practice carries unnecessary risk and avoidable loss. The good news: biggest wins come from practices starting here.",
    bullets: ["No reliable system for generating and converting patients.", "Acceptance, recall, collections depend on a few people.", "Working hard but the practice isn't giving the return it should."],
    focus: "We get fundamentals in fast: lead handling, follow-up, acceptance structure, recall, and basic automation.",
    cta: "We can review your assessment and map a step-by-step plan to move out of the critical zone.",
  };
}

// ── COMPUTE SCORE ──
export function computeScore(ans: Record<string, number>): ScoreData {
  let total = 0, answered = 0, lkMn = 0, lkMx = 0;
  const cd = CATS.map(c => ({ earned: 0, ans: 0, cnt: CC[c.id], lkMn: 0, lkMx: 0 }));
  const pd: Record<string, { earned: number; possible: number; lkMn: number; lkMx: number }> = {
    G: { earned: 0, possible: 0, lkMn: 0, lkMx: 0 },
    M: { earned: 0, possible: 0, lkMn: 0, lkMx: 0 },
    D: { earned: 0, possible: 0, lkMn: 0, lkMx: 0 },
  };
  const gaps: (Question & { li: number; a: number })[] = [];

  Q.forEach(q => { pd[q.p].possible += 1; });

  Q.forEach(q => {
    const cQs = Q.filter(qq => qq.c === q.c);
    const li = cQs.indexOf(q);
    const k = `${q.c}-${li}`;
    const a = ans[k];
    if (a !== undefined) {
      total += a; answered++;
      cd[q.c].earned += a; cd[q.c].ans++;
      pd[q.p].earned += a;
      if (a === 0) {
        lkMn += q.mn; lkMx += q.mx;
        cd[q.c].lkMn += q.mn; cd[q.c].lkMx += q.mx;
        pd[q.p].lkMn += q.mn; pd[q.p].lkMx += q.mx;
        gaps.push({ ...q, li, a });
      } else if (a === 0.5) {
        const mn2 = Math.round(q.mn * 0.5), mx2 = Math.round(q.mx * 0.5);
        lkMn += mn2; lkMx += mx2;
        cd[q.c].lkMn += mn2; cd[q.c].lkMx += mx2;
        pd[q.p].lkMn += mn2; pd[q.p].lkMx += mx2;
        gaps.push({ ...q, li, a });
      }
    }
  });
  gaps.sort((a, b) => b.mx - a.mx);
  return { total: Math.round(total * 10) / 10, answered, lkMn, lkMx, cd, pd, gaps };
}

// ── RECOMMENDATIONS ──
export interface RecService {
  key: string;
  pkg: { name: string; setup: number; mo: number; roi: string };
  status: { label: string; color: string; bg: string };
  phase: number;
  gapCount: number;
  highCount: number;
  leakMin: number;
  leakMax: number;
  gaps: (Question & { li: number; a: number })[];
}

export function getRecommendations(sc: ScoreData) {
  const pkgGaps: Record<string, { gaps: (Question & { li: number; a: number })[]; highCount: number; leakMin: number; leakMax: number }> = {};
  sc.gaps.forEach(g => {
    if (!pkgGaps[g.pk]) pkgGaps[g.pk] = { gaps: [], highCount: 0, leakMin: 0, leakMax: 0 };
    pkgGaps[g.pk].gaps.push(g);
    if (g.m) pkgGaps[g.pk].highCount++;
    const factor = g.a === 0 ? 1 : 0.5;
    pkgGaps[g.pk].leakMin += Math.round(g.mn * factor);
    pkgGaps[g.pk].leakMax += Math.round(g.mx * factor);
  });
  const ranked: RecService[] = Object.entries(pkgGaps)
    .map(([key, data]) => ({
      key,
      pkg: PKGS[key],
      status: SERVICE_STATUS[key],
      phase: PHASE_MAP[key],
      gapCount: data.gaps.length,
      highCount: data.highCount,
      leakMin: data.leakMin,
      leakMax: data.leakMax,
      gaps: data.gaps,
    }))
    .sort((a, b) => b.highCount - a.highCount || b.leakMax - a.leakMax || b.gapCount - a.gapCount);
  const phases = PHASE_META
    .map(pm => ({
      ...pm,
      services: ranked.filter(r => r.phase === pm.num).sort((a, b) => b.highCount - a.highCount || b.leakMax - a.leakMax),
    }))
    .filter(p => p.services.length > 0);
  const totalSetup = ranked.reduce((s, r) => s + r.pkg.setup, 0);
  const totalMo = ranked.reduce((s, r) => s + r.pkg.mo, 0);
  return { ranked, phases, totalSetup, totalMo };
}

// ── FORMAT HELPERS ──
export const fmt = (n: number) => n.toLocaleString("en-US");

export const bandLabel = (pct: number) =>
  pct >= 70
    ? { text: "Growth Engine", color: T.grn, bg: T.grnBg }
    : pct >= 40
      ? { text: "In Progress", color: T.amb, bg: T.ambBg }
      : { text: "Needs Attention", color: T.red, bg: T.redBg };

// src/lib/assessment-scoring.ts

import type { AssessmentPillar, ScoreBand } from '@/data/assessments/case-acceptance';

export function getBand(pct: number, bands: ScoreBand[]): ScoreBand {
  return bands.find((b) => pct >= b.min) || bands[bands.length - 1];
}

export function estimateRevenueLeak(annualProduction: number, scorePct: number) {
  const currentAcceptance = 0.4 + (scorePct / 100) * 0.4;
  const potentialAcceptance = Math.min(0.85, currentAcceptance + 0.15);
  const currentRevenue = annualProduction * currentAcceptance;
  const potentialRevenue = annualProduction * potentialAcceptance;
  const annualLeak = potentialRevenue - currentRevenue;

  return {
    currentAcceptance,
    potentialAcceptance,
    annualLeak,
    currentRevenue,
    potentialRevenue,
  };
}

export interface PillarScore extends AssessmentPillar {
  score: number;
  max: number;
  pct: number;
}

export function calculatePillarScores(
  pillars: AssessmentPillar[],
  answers: Record<string, number>
): PillarScore[] {
  return pillars.map((p) => {
    const pillarMax = p.questions.length * 2;
    const pillarScore = p.questions.reduce((s, q) => s + (answers[q.id] || 0), 0);
    return {
      ...p,
      score: pillarScore,
      max: pillarMax,
      pct: Math.round((pillarScore / pillarMax) * 100),
    };
  });
}

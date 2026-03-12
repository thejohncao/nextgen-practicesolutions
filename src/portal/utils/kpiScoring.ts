import type { KPIDefinition } from '../data/kpiDefinitions';

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export function scoreKPI(
  def: KPIDefinition,
  current: number | null
): number | null {
  if (current === null) return null;
  const { benchmarkFloor, benchmarkTop, inverted } = def;
  if (inverted) {
    return clamp((benchmarkFloor - current) / (benchmarkFloor - benchmarkTop), 0, 1) * 100;
  }
  return clamp((current - benchmarkFloor) / (benchmarkTop - benchmarkFloor), 0, 1) * 100;
}

export function pillarScore(
  defs: KPIDefinition[],
  kpis: Record<string, { current: number | null; target: number | null }>
): number | null {
  const scores: number[] = [];
  for (const def of defs) {
    const entry = kpis[def.id];
    const s = scoreKPI(def, entry?.current ?? null);
    if (s !== null) scores.push(s);
  }
  if (scores.length === 0) return null;
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

export function healthScore(pillarScores: (number | null)[]): number | null {
  const valid = pillarScores.filter((s): s is number => s !== null);
  if (valid.length === 0) return null;
  return valid.reduce((a, b) => a + b, 0) / valid.length;
}

export function scoreGrade(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 75) return 'B';
  if (score >= 60) return 'C';
  if (score >= 45) return 'D';
  return 'F';
}

export function gradeColor(grade: string): string {
  switch (grade) {
    case 'A': return '#4ade80';
    case 'B': return '#60a5fa';
    case 'C': return '#fbbf24';
    case 'D': return '#f97316';
    default: return '#ef4444';
  }
}

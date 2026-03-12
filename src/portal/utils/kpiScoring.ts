import type { KPIDefinition } from '../data/kpiDefinitions';

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export function scoreKPI(
  def: KPIDefinition,
  current: number | null
): number | null {
  if (current === null) return null;
  const { floor, top, inverted } = def;
  if (inverted) {
    return clamp((floor - current) / (floor - top), 0, 1) * 100;
  }
  return clamp((current - floor) / (top - floor), 0, 1) * 100;
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
  if (score >= 80) return 'Optimized';
  if (score >= 60) return 'Healthy';
  if (score >= 40) return 'Needs Attention';
  return 'Critical';
}

export function gradeColor(grade: string): string {
  switch (grade) {
    case 'Optimized': return '#10B981';
    case 'Healthy': return '#3B82F6';
    case 'Needs Attention': return '#F59E0B';
    default: return '#EF4444';
  }
}

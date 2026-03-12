export interface AssessmentQuestion {
  id: string;
  pillar: string;
  question: string;
}

export interface AssessmentPillar {
  name: string;
  questions: AssessmentQuestion[];
}

export type AnswerValue = 2 | 1 | 0 | null;

export interface ScoreBand {
  min: number; // percentage
  max: number;
  label: string;
  color: string;
  description: string;
}

export interface SolutionMapping {
  gap: string; // pillar name
  solution: string;
  route: string;
}

export interface AssessmentConfig {
  slug: string;
  title: string;
  subtitle: string;
  pillars: AssessmentPillar[];
  scoreBands: ScoreBand[];
  solutionMappings: SolutionMapping[];
  revenueFraming?: {
    headline: string;
    description: string;
  };
}

export const defaultScoreBands: ScoreBand[] = [
  { min: 90, max: 100, label: "Leader", color: "var(--color-success)", description: "Your systems are strong. Focus on optimization and maintaining excellence." },
  { min: 70, max: 89, label: "Solid Foundation", color: "var(--color-accent-teal)", description: "Good foundation in place. A few targeted improvements will accelerate results." },
  { min: 50, max: 69, label: "Leaking", color: "var(--color-accent-gold)", description: "Significant gaps are costing you patients and revenue. Prioritize the biggest leaks." },
  { min: 25, max: 49, label: "Critical Gaps", color: "var(--color-warning)", description: "Major systems are missing or broken. Structured intervention will have outsized impact." },
  { min: 0, max: 24, label: "Starting from Scratch", color: "var(--color-error)", description: "Foundational infrastructure needs to be built. The good news: every improvement will be immediately felt." },
];

export function getScoreBand(percent: number, bands: ScoreBand[] = defaultScoreBands): ScoreBand {
  return bands.find((b) => percent >= b.min && percent <= b.max) ?? bands[bands.length - 1];
}

export function calculatePillarScores(
  pillars: AssessmentPillar[],
  answers: Record<string, AnswerValue>
): { pillar: string; score: number; maxScore: number; percent: number }[] {
  return pillars.map((p) => {
    const maxScore = p.questions.length * 2;
    const score = p.questions.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
    return {
      pillar: p.name,
      score,
      maxScore,
      percent: maxScore > 0 ? Math.round((score / maxScore) * 100) : 0,
    };
  });
}

export function calculateTotalScore(
  pillars: AssessmentPillar[],
  answers: Record<string, AnswerValue>
): { score: number; maxScore: number; percent: number } {
  const totalQuestions = pillars.reduce((sum, p) => sum + p.questions.length, 0);
  const maxScore = totalQuestions * 2;
  const score = Object.values(answers).reduce<number>((sum, v) => sum + (v ?? 0), 0);
  return {
    score,
    maxScore,
    percent: maxScore > 0 ? Math.round((score / maxScore) * 100) : 0,
  };
}

export function getGaps(
  pillars: AssessmentPillar[],
  answers: Record<string, AnswerValue>
): { question: AssessmentQuestion; answer: AnswerValue }[] {
  return pillars.flatMap((p) =>
    p.questions
      .filter((q) => (answers[q.id] ?? 0) < 2)
      .map((q) => ({ question: q, answer: answers[q.id] ?? 0 }))
  );
}

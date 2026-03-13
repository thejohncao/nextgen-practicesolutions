import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PILLARS,
  SCORE_BANDS,
  PRODUCTION_TIERS,
  TOTAL_QUESTIONS,
  MAX_SCORE,
} from '@/data/assessments/case-acceptance';
import {
  getBand,
  estimateRevenueLeak,
  calculatePillarScores,
} from '@/lib/assessment-scoring';
import type { PillarScore } from '@/lib/assessment-scoring';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Screen = 'intro' | 'assessment' | 'lead-capture' | 'results';
type Mode = 'self' | 'guided';

interface LeadData {
  name: string;
  practiceName: string;
  email: string;
  phone: string;
}

// ---------------------------------------------------------------------------
// Guided mode coaching notes per pillar
// ---------------------------------------------------------------------------

const GUIDED_NOTES: Record<string, string> = {
  diagnosis:
    'Read each statement to the practice owner. Ask them to rate honestly. Probe with follow-up questions to validate self-reported scores. Listen for whether the doctor actually does the handoff or just thinks they do.',
  presentation:
    'Watch for overconfidence here — many practices believe they present well because they use a screen, but still read off a fee schedule. Ask for specifics: "Walk me through what the patient actually sees."',
  financial:
    'This pillar often reveals the biggest quick wins. Ask: "When a patient asks about cost, what happens next?" The answer tells you everything.',
  team:
    'Probe on consistency vs. heroics. One great TC doesn\'t mean the system works. Ask: "What happens when your best TC is on vacation?"',
  followup:
    'Most practices will score lowest here. That\'s normal — and it\'s where the revenue leak is biggest. Ask: "What happens to a $10K case when the patient says \'let me think about it\'?"',
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ScoreGauge({
  score,
  max,
  band,
}: {
  score: number;
  max: number;
  band: ReturnType<typeof getBand>;
}) {
  const pct = Math.round((score / max) * 100);
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        aria-label={`Score: ${score} out of ${max}, ${pct} percent`}
      >
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="12"
        />
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke={band.color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={mounted ? offset : circumference}
          transform="rotate(-90 100 100)"
          className="transition-all duration-1000 ease-out"
        />
        <text
          x="100"
          y="92"
          textAnchor="middle"
          className="fill-white font-serif-display"
          fontSize="48"
        >
          {score}
        </text>
        <text
          x="100"
          y="118"
          textAnchor="middle"
          className="fill-white/60 font-dm"
          fontSize="14"
        >
          out of {max}
        </text>
      </svg>
      <div className="mt-4 text-center">
        <span
          className="inline-block rounded-full px-4 py-1.5 text-sm font-semibold font-dm"
          style={{ backgroundColor: `${band.color}20`, color: band.color }}
        >
          {band.emoji} {band.label}
        </span>
      </div>
    </div>
  );
}

function PillarBreakdownCard({
  ps,
  index,
}: {
  ps: PillarScore;
  index: number;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 200 + index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="rounded-xl border border-ca-border bg-ca-card p-5 print:break-inside-avoid">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{ps.icon}</span>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-ca-text font-dm text-sm truncate">
            {ps.title}
          </h4>
          <p className="text-xs text-ca-text-muted font-dm">
            {ps.score}/{ps.max} ({ps.pct}%)
          </p>
        </div>
      </div>
      <div className="h-2.5 rounded-full bg-ca-bg-deep overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-800 ease-out"
          style={{
            width: mounted ? `${ps.pct}%` : '0%',
            backgroundColor: ps.color,
            transitionDuration: '0.8s',
          }}
        />
      </div>
      <p className="mt-3 text-xs text-ca-text-soft font-dm">
        <span className="font-semibold">Closes with:</span> {ps.solution} —{' '}
        {ps.solutionDetail}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function CaseAcceptanceAssessment() {
  // State
  const [screen, setScreen] = useState<Screen>('intro');
  const [mode, setMode] = useState<Mode>('self');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [activePillar, setActivePillar] = useState(0);
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);

  // Lead form state
  const [formName, setFormName] = useState('');
  const [formPractice, setFormPractice] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');

  // Refs
  const questionsRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // Derived
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === TOTAL_QUESTIONS;
  const totalScore = Object.values(answers).reduce((s, v) => s + v, 0);
  const scorePct = Math.round((totalScore / MAX_SCORE) * 100);
  const band = getBand(scorePct, SCORE_BANDS);
  const pillarScores = calculatePillarScores(PILLARS, answers);

  const pillarAnsweredCount = (pillarIndex: number) => {
    const p = PILLARS[pillarIndex];
    return p.questions.filter((q) => answers[q.id] !== undefined).length;
  };

  const isPillarComplete = (pillarIndex: number) =>
    pillarAnsweredCount(pillarIndex) === PILLARS[pillarIndex].questions.length;

  // Handlers
  const handleAnswer = useCallback(
    (questionId: string, value: number) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    },
    []
  );

  const goToPillar = useCallback(
    (index: number) => {
      setActivePillar(index);
      if (questionsRef.current) {
        questionsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    []
  );

  const startAssessment = useCallback(
    (selectedMode: Mode) => {
      setMode(selectedMode);
      setScreen('assessment');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: LeadData = {
      name: formName,
      practiceName: formPractice,
      email: formEmail,
      phone: formPhone,
    };
    setLeadData(data);
    console.log('Lead captured:', data);
    console.log('Assessment results:', {
      totalScore,
      scorePct,
      band: band.label,
      pillarScores: pillarScores.map((p) => ({
        pillar: p.title,
        score: p.score,
        max: p.max,
        pct: p.pct,
      })),
    });
    setScreen('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const weakest = [...pillarScores].sort((a, b) => a.pct - b.pct).slice(0, 2);
  const strongest = [...pillarScores].sort((a, b) => b.pct - a.pct)[0];

  // Revenue leak
  const revenueLeak =
    selectedTier !== null
      ? estimateRevenueLeak(PRODUCTION_TIERS[selectedTier].value, scorePct)
      : null;

  // ---------------------------------------------------------------------------
  // SCREEN 1: INTRO
  // ---------------------------------------------------------------------------

  if (screen === 'intro') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="font-dm"
        >
          {/* Hero */}
          <section className="relative overflow-hidden bg-gradient-to-br from-ca-navy via-ca-steel to-ca-steel-light py-20 px-6 md:py-28 md:px-12 lg:px-24">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(78,173,197,0.12),transparent_70%)]" />
            <div className="relative max-w-4xl mx-auto text-center">
              <p className="text-ca-teal text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                NextGen Practice Solutions
              </p>
              <h1
                className="font-serif-display text-white leading-tight mb-6"
                style={{
                  fontSize: 'clamp(32px, 5vw, 52px)',
                }}
              >
                Case Acceptance Readiness Assessment
              </h1>
              <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10 font-dm">
                50 questions across 5 pillars. 8 minutes. A complete diagnostic
                of how your practice presents, prices, and closes treatment —
                and exactly where revenue is leaking.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => startAssessment('self')}
                  className="px-8 py-3.5 rounded-lg bg-ca-teal text-white font-semibold text-base hover:bg-ca-teal/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ca-teal focus-visible:ring-offset-2 focus-visible:ring-offset-ca-navy"
                >
                  Start Self-Assessment →
                </button>
                <button
                  onClick={() => startAssessment('guided')}
                  className="px-8 py-3.5 rounded-lg border border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ca-navy"
                >
                  Guided (Sales Call Mode)
                </button>
              </div>
            </div>
          </section>

          {/* Pillar Previews */}
          <section className="bg-ca-bg py-16 px-6 md:px-12 lg:px-24">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-serif-display text-ca-text text-2xl md:text-3xl text-center mb-10">
                What You'll Be Assessed On
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {PILLARS.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-xl border border-ca-border bg-ca-card p-6 hover:shadow-md transition-shadow"
                  >
                    <span className="text-3xl mb-3 block">{p.icon}</span>
                    <h3 className="font-semibold text-ca-text text-base mb-1 font-dm">
                      {p.title}
                    </h3>
                    <p className="text-ca-text-soft text-sm mb-4 font-dm">
                      {p.description}
                    </p>
                    <p
                      className="text-xs font-semibold tracking-wider uppercase font-dm"
                      style={{ color: p.color }}
                    >
                      10 Questions · 20 Points
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How Scoring Works */}
          <section className="bg-ca-bg-deep py-16 px-6 md:px-12 lg:px-24">
            <div className="max-w-2xl mx-auto">
              <div className="rounded-xl border border-ca-border bg-ca-card p-8">
                <h3 className="font-serif-display text-ca-text text-xl mb-6 text-center">
                  How Scoring Works
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      label: 'Yes',
                      pts: '2 pts',
                      color: '#3A8B5C',
                      bg: 'rgba(58,139,92,0.08)',
                      desc: 'This is consistently in place and working',
                    },
                    {
                      label: 'Partially',
                      pts: '1 pt',
                      color: '#C9A86A',
                      bg: 'rgba(201,168,106,0.12)',
                      desc: 'Sometimes, inconsistently, or only for some cases',
                    },
                    {
                      label: 'No',
                      pts: '0 pts',
                      color: '#8A9BAC',
                      bg: '#EEF2F5',
                      desc: "Not in place or we don't do this",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-4 rounded-lg p-3"
                      style={{ backgroundColor: item.bg }}
                    >
                      <span
                        className="shrink-0 inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-semibold font-dm"
                        style={{
                          color: item.color,
                          border: `1.5px solid ${item.color}`,
                        }}
                      >
                        {item.label}
                      </span>
                      <span className="font-semibold text-sm text-ca-text font-dm">
                        {item.pts}
                      </span>
                      <span className="text-sm text-ca-text-soft font-dm">
                        — {item.desc}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-center text-sm text-ca-text-muted font-dm">
                  Total: {TOTAL_QUESTIONS} questions × 2 pts = {MAX_SCORE}{' '}
                  points possible
                </p>
              </div>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>
    );
  }

  // ---------------------------------------------------------------------------
  // SCREEN 2: ASSESSMENT
  // ---------------------------------------------------------------------------

  if (screen === 'assessment') {
    const currentPillar = PILLARS[activePillar];

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="assessment"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="font-dm bg-ca-bg min-h-screen"
        >
          {/* Sticky Top Bar */}
          <div className="sticky top-0 z-40 bg-ca-card border-b border-ca-border shadow-sm print:hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4 flex-wrap">
              <h2 className="font-serif-display text-ca-text text-base sm:text-lg whitespace-nowrap">
                Case Acceptance Assessment
              </h2>
              {mode === 'guided' && (
                <span className="shrink-0 inline-flex items-center rounded-full bg-ca-amber-dim px-2.5 py-0.5 text-xs font-semibold text-ca-amber border border-ca-amber/30">
                  Guided Mode
                </span>
              )}
              <div className="flex items-center gap-3 ml-auto">
                <span className="text-sm text-ca-text-soft whitespace-nowrap">
                  {answeredCount}/{TOTAL_QUESTIONS} answered
                </span>
                <div
                  className="w-32 sm:w-40 h-2 rounded-full bg-ca-bg-deep overflow-hidden"
                  role="progressbar"
                  aria-valuenow={answeredCount}
                  aria-valuemax={TOTAL_QUESTIONS}
                  aria-label={`${answeredCount} of ${TOTAL_QUESTIONS} questions answered`}
                >
                  <div
                    className="h-full rounded-full bg-ca-teal transition-all duration-300 ease-out"
                    style={{
                      width: `${(answeredCount / TOTAL_QUESTIONS) * 100}%`,
                    }}
                  />
                </div>
                <button
                  disabled={!allAnswered}
                  onClick={() => {
                    setScreen('lead-capture');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={cn(
                    'shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ca-teal',
                    allAnswered
                      ? 'bg-ca-teal text-white hover:bg-ca-teal/90'
                      : 'bg-ca-bg-deep text-ca-text-muted cursor-not-allowed'
                  )}
                >
                  See Results →
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
            {/* Mobile Pillar Pills */}
            <div className="md:hidden mb-6 -mx-4 px-4 overflow-x-auto print:hidden">
              <div className="flex gap-2 pb-2" style={{ minWidth: 'max-content' }}>
                {PILLARS.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => goToPillar(i)}
                    className={cn(
                      'shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2',
                      i === activePillar
                        ? 'text-white'
                        : 'bg-ca-card border border-ca-border text-ca-text-soft hover:bg-ca-bg-deep'
                    )}
                    style={
                      i === activePillar
                        ? { backgroundColor: p.color }
                        : undefined
                    }
                  >
                    <span>{p.icon}</span>
                    <span className="truncate max-w-[100px]">{p.title.split(' ')[0]}</span>
                    {isPillarComplete(i) && (
                      <span className="text-[10px]">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-6" ref={topRef}>
              {/* Desktop Sidebar */}
              <aside className="hidden md:block w-[220px] shrink-0 print:hidden">
                <nav className="sticky top-20 space-y-1.5">
                  {PILLARS.map((p, i) => {
                    const count = pillarAnsweredCount(i);
                    const complete = isPillarComplete(i);
                    const active = i === activePillar;
                    return (
                      <button
                        key={p.id}
                        onClick={() => goToPillar(i)}
                        className={cn(
                          'w-full text-left rounded-lg px-3 py-2.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ca-teal',
                          active
                            ? 'border-l-[3px]'
                            : 'border-l-[3px] border-transparent hover:bg-ca-bg-deep'
                        )}
                        style={
                          active
                            ? {
                                borderLeftColor: p.color,
                                backgroundColor: p.colorDim,
                              }
                            : undefined
                        }
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{p.icon}</span>
                          <span
                            className={cn(
                              'text-sm font-medium truncate',
                              active ? 'text-ca-text' : 'text-ca-text-soft'
                            )}
                          >
                            {p.title}
                          </span>
                        </div>
                        <p className="mt-0.5 ml-7 text-xs text-ca-text-muted">
                          {complete ? (
                            <span style={{ color: p.color }}>✓ Complete</span>
                          ) : (
                            `${count}/${p.questions.length}`
                          )}
                        </p>
                      </button>
                    );
                  })}
                </nav>
              </aside>

              {/* Questions Area */}
              <div className="flex-1 min-w-0" ref={questionsRef}>
                {/* Pillar Header */}
                <div className="mb-6">
                  <p className="text-xs font-semibold text-ca-text-muted uppercase tracking-wider mb-1 font-dm">
                    Pillar {activePillar + 1} of {PILLARS.length}
                  </p>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{currentPillar.icon}</span>
                    <div>
                      <h3 className="font-serif-display text-ca-text text-xl md:text-2xl">
                        {currentPillar.title}
                      </h3>
                      <p className="text-sm text-ca-text-soft font-dm">
                        {currentPillar.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-ca-text-soft font-dm">
                    {currentPillar.description}
                  </p>
                </div>

                {/* Guided Mode Coaching Box */}
                {mode === 'guided' && GUIDED_NOTES[currentPillar.id] && (
                  <div className="mb-6 rounded-lg border border-ca-amber/30 bg-ca-amber-dim p-4">
                    <p className="text-xs font-semibold text-ca-amber uppercase tracking-wider mb-1 font-dm">
                      Consultant Note
                    </p>
                    <p className="text-sm text-ca-text font-dm">
                      {GUIDED_NOTES[currentPillar.id]}
                    </p>
                  </div>
                )}

                {/* Question Cards */}
                <div className="space-y-3">
                  {currentPillar.questions.map((q, qi) => {
                    const answered = answers[q.id] !== undefined;
                    const value = answers[q.id];
                    return (
                      <div
                        key={q.id}
                        className={cn(
                          'rounded-xl border p-4 sm:p-5 transition-colors',
                          answered
                            ? 'border-ca-border bg-ca-card'
                            : 'border-ca-border-light bg-ca-card'
                        )}
                      >
                        <div className="flex gap-3">
                          <span
                            className={cn(
                              'shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-dm',
                              answered ? 'text-white' : 'text-ca-text-muted bg-ca-bg-deep'
                            )}
                            style={
                              answered
                                ? { backgroundColor: currentPillar.color }
                                : undefined
                            }
                          >
                            {qi + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-ca-text font-dm mb-3">
                              {q.text}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {(
                                [
                                  { label: 'Yes', val: 2, color: '#3A8B5C', dim: 'rgba(58,139,92,0.08)' },
                                  { label: 'Partially', val: 1, color: '#C9A86A', dim: 'rgba(201,168,106,0.12)' },
                                  { label: 'No', val: 0, color: '#8A9BAC', dim: '#EEF2F5' },
                                ] as const
                              ).map((opt) => {
                                const selected = value === opt.val;
                                return (
                                  <button
                                    key={opt.label}
                                    onClick={() => handleAnswer(q.id, opt.val)}
                                    className={cn(
                                      'px-4 py-1.5 rounded-md text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
                                      selected
                                        ? 'font-semibold'
                                        : 'hover:opacity-80'
                                    )}
                                    style={
                                      selected
                                        ? {
                                            backgroundColor: opt.dim,
                                            color: opt.color,
                                            border: `1.5px solid ${opt.color}`,
                                          }
                                        : {
                                            backgroundColor: 'transparent',
                                            color: '#5A6B7C',
                                            border: '1.5px solid #DDE4EA',
                                          }
                                    }
                                    aria-pressed={selected}
                                  >
                                    {opt.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pillar Navigation */}
                <div className="flex items-center justify-between mt-8 print:hidden">
                  <button
                    onClick={() => goToPillar(activePillar - 1)}
                    disabled={activePillar === 0}
                    className={cn(
                      'px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ca-teal',
                      activePillar === 0
                        ? 'text-ca-text-muted cursor-not-allowed'
                        : 'text-ca-text-soft hover:bg-ca-bg-deep'
                    )}
                  >
                    ← Previous Pillar
                  </button>
                  {activePillar < PILLARS.length - 1 ? (
                    <button
                      onClick={() => goToPillar(activePillar + 1)}
                      className="px-5 py-2.5 rounded-lg text-sm font-semibold text-ca-teal hover:bg-ca-teal-dim transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ca-teal"
                    >
                      Next Pillar →
                    </button>
                  ) : (
                    <button
                      disabled={!allAnswered}
                      onClick={() => {
                        setScreen('lead-capture');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={cn(
                        'px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ca-teal',
                        allAnswered
                          ? 'bg-ca-teal text-white hover:bg-ca-teal/90'
                          : 'bg-ca-bg-deep text-ca-text-muted cursor-not-allowed'
                      )}
                    >
                      See My Results →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // ---------------------------------------------------------------------------
  // LEAD CAPTURE GATE
  // ---------------------------------------------------------------------------

  if (screen === 'lead-capture') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="lead-capture"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="font-dm bg-ca-bg min-h-screen flex items-center justify-center px-6 py-16"
        >
          <div className="w-full max-w-md">
            <div className="rounded-xl border border-ca-border bg-ca-card p-8 shadow-lg">
              <div className="text-center mb-8">
                <span className="inline-block text-4xl mb-3">📊</span>
                <h2 className="font-serif-display text-ca-text text-2xl mb-2">
                  Your results are ready.
                </h2>
                <p className="text-sm text-ca-text-soft font-dm">
                  Enter your details below to see your full diagnostic report.
                </p>
              </div>
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="lead-name"
                    className="block text-sm font-medium text-ca-text mb-1 font-dm"
                  >
                    Your Name <span className="text-ca-red">*</span>
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full rounded-lg border border-ca-border bg-ca-bg px-3 py-2.5 text-sm text-ca-text font-dm placeholder:text-ca-text-muted focus:outline-none focus:ring-2 focus:ring-ca-teal focus:border-transparent"
                    placeholder="Dr. Jane Smith"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lead-practice"
                    className="block text-sm font-medium text-ca-text mb-1 font-dm"
                  >
                    Practice Name <span className="text-ca-red">*</span>
                  </label>
                  <input
                    id="lead-practice"
                    type="text"
                    required
                    value={formPractice}
                    onChange={(e) => setFormPractice(e.target.value)}
                    className="w-full rounded-lg border border-ca-border bg-ca-bg px-3 py-2.5 text-sm text-ca-text font-dm placeholder:text-ca-text-muted focus:outline-none focus:ring-2 focus:ring-ca-teal focus:border-transparent"
                    placeholder="Bright Smiles Dental"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lead-email"
                    className="block text-sm font-medium text-ca-text mb-1 font-dm"
                  >
                    Email <span className="text-ca-red">*</span>
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full rounded-lg border border-ca-border bg-ca-bg px-3 py-2.5 text-sm text-ca-text font-dm placeholder:text-ca-text-muted focus:outline-none focus:ring-2 focus:ring-ca-teal focus:border-transparent"
                    placeholder="jane@brightsmiles.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lead-phone"
                    className="block text-sm font-medium text-ca-text mb-1 font-dm"
                  >
                    Phone{' '}
                    <span className="text-ca-text-muted font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="lead-phone"
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full rounded-lg border border-ca-border bg-ca-bg px-3 py-2.5 text-sm text-ca-text font-dm placeholder:text-ca-text-muted focus:outline-none focus:ring-2 focus:ring-ca-teal focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-ca-teal text-white font-semibold py-3 text-sm hover:bg-ca-teal/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ca-teal focus-visible:ring-offset-2"
                >
                  See My Results
                </button>
                <p className="text-xs text-ca-text-muted text-center font-dm">
                  We'll send you a PDF copy of your results.
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // ---------------------------------------------------------------------------
  // SCREEN 3: RESULTS
  // ---------------------------------------------------------------------------

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="results"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="font-dm"
      >
        {/* Print Header (hidden on screen) */}
        <div className="hidden print:block print:mb-6 print:text-center">
          <p className="text-lg font-bold">
            NextGen Practice Solutions — Case Acceptance Readiness Assessment
          </p>
          {leadData && (
            <p className="text-sm text-gray-600">
              {leadData.name} · {leadData.practiceName} · {leadData.email}
            </p>
          )}
        </div>

        {/* Score Hero */}
        <section className="bg-gradient-to-br from-ca-navy via-ca-steel to-ca-steel-light py-16 px-6 md:py-20 md:px-12 lg:px-24 print:bg-white print:py-8">
          <div className="max-w-3xl mx-auto text-center">
            <ScoreGauge score={totalScore} max={MAX_SCORE} band={band} />
            <p className="mt-6 text-white/70 max-w-xl mx-auto text-sm font-dm print:text-gray-600">
              {band.summary}
            </p>
          </div>
        </section>

        {/* Pillar Breakdown */}
        <section className="bg-ca-bg py-12 px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-serif-display text-ca-text text-xl md:text-2xl text-center mb-8">
              Pillar Breakdown
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pillarScores.map((ps, i) => (
                <PillarBreakdownCard key={ps.id} ps={ps} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Revenue Leak Estimator */}
        <section className="bg-ca-bg-deep py-12 px-6 md:px-12 lg:px-24 print:bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-xl border border-ca-border bg-ca-card p-6 md:p-8">
              <h3 className="font-serif-display text-ca-text text-xl mb-2 text-center">
                Revenue Leak Estimator
              </h3>
              <p className="text-sm text-ca-text-soft text-center mb-6 font-dm">
                Select your annual diagnosed production
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-8 print:hidden">
                {PRODUCTION_TIERS.map((tier, i) => (
                  <button
                    key={tier.label}
                    onClick={() => setSelectedTier(i)}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ca-teal',
                      selectedTier === i
                        ? 'bg-ca-steel text-white'
                        : 'bg-ca-bg-deep text-ca-text-soft hover:bg-ca-border-light border border-ca-border'
                    )}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>

              {revenueLeak && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  <div className="rounded-lg bg-ca-bg p-4 text-center border border-ca-border-light">
                    <p className="text-xs text-ca-text-muted uppercase tracking-wider mb-1 font-dm">
                      Est. Current Acceptance
                    </p>
                    <p className="text-2xl font-bold text-ca-text font-dm">
                      {Math.round(revenueLeak.currentAcceptance * 100)}%
                    </p>
                  </div>
                  <div className="rounded-lg bg-ca-bg p-4 text-center border border-ca-border-light">
                    <p className="text-xs text-ca-text-muted uppercase tracking-wider mb-1 font-dm">
                      Potential with Narrative
                    </p>
                    <p className="text-2xl font-bold text-ca-green font-dm">
                      {Math.round(revenueLeak.potentialAcceptance * 100)}%
                    </p>
                  </div>
                  <div className="rounded-lg bg-ca-red-dim p-4 text-center border border-ca-red/20">
                    <p className="text-xs text-ca-text-muted uppercase tracking-wider mb-1 font-dm">
                      Annual Revenue Opportunity
                    </p>
                    <p className="text-2xl font-bold text-ca-red font-dm">
                      ${Math.round(revenueLeak.annualLeak).toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Biggest Gaps */}
        <section className="bg-ca-bg py-12 px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-serif-display text-ca-text text-xl md:text-2xl text-center mb-8">
              Your Biggest Gaps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {weakest.map((ps) => {
                const noAnswers = ps.questions.filter(
                  (q) => answers[q.id] === 0
                );
                const partialAnswers = ps.questions.filter(
                  (q) => answers[q.id] === 1
                );
                return (
                  <div
                    key={ps.id}
                    className="rounded-xl border border-ca-border bg-ca-card p-6 print:break-inside-avoid"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{ps.icon}</span>
                      <div>
                        <h4 className="font-semibold text-ca-text font-dm">
                          {ps.title}
                        </h4>
                        <p className="text-sm text-ca-text-muted font-dm">
                          {ps.pct}% — {ps.score}/{ps.max}
                        </p>
                      </div>
                    </div>

                    {noAnswers.length > 0 && (
                      <div className="mb-3">
                        {noAnswers.map((q) => (
                          <div
                            key={q.id}
                            className="flex items-start gap-2 mb-2"
                          >
                            <span className="shrink-0 mt-0.5 inline-block rounded px-1.5 py-0.5 text-[10px] font-bold uppercase bg-ca-red-dim text-ca-red font-dm">
                              Not in place
                            </span>
                            <p className="text-xs text-ca-text-soft font-dm">
                              {q.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {partialAnswers.length > 0 && (
                      <div className="mb-3">
                        {partialAnswers.map((q) => (
                          <div
                            key={q.id}
                            className="flex items-start gap-2 mb-2"
                          >
                            <span className="shrink-0 mt-0.5 inline-block rounded px-1.5 py-0.5 text-[10px] font-bold uppercase bg-ca-amber-dim text-ca-amber font-dm">
                              Inconsistent
                            </span>
                            <p className="text-xs text-ca-text-soft font-dm">
                              {q.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div
                      className="mt-4 rounded-lg p-3 text-sm font-dm"
                      style={{
                        backgroundColor: ps.colorDim,
                        borderLeft: `3px solid ${ps.color}`,
                      }}
                    >
                      <span className="font-semibold text-ca-text">
                        Closes with: {ps.solution}
                      </span>
                      <span className="text-ca-text-soft">
                        {' '}
                        — {ps.solutionDetail}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Strongest Pillar */}
        {strongest && (
          <section className="bg-ca-bg-deep py-12 px-6 md:px-12 lg:px-24 print:bg-white">
            <div className="max-w-3xl mx-auto">
              <div
                className="rounded-xl border p-6 md:p-8 print:break-inside-avoid"
                style={{
                  backgroundColor: 'rgba(58,139,92,0.04)',
                  borderColor: 'rgba(58,139,92,0.2)',
                }}
              >
                <h3 className="font-serif-display text-ca-text text-xl mb-4 text-center">
                  Your Strongest Pillar
                </h3>
                <div className="flex items-center gap-3 justify-center mb-3">
                  <span className="text-3xl">{strongest.icon}</span>
                  <div>
                    <h4 className="font-semibold text-ca-text font-dm text-lg">
                      {strongest.title}
                    </h4>
                    <p className="text-sm font-dm" style={{ color: '#3A8B5C' }}>
                      {strongest.pct}% — {strongest.score}/{strongest.max}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-ca-text-soft text-center font-dm">
                  This is where your practice is performing best. Protect these
                  systems, train new hires on them, and use this pillar as a
                  model for improving the others.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-ca-navy via-ca-steel to-ca-steel-light py-16 px-6 md:py-20 md:px-12 lg:px-24 print:hidden">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif-display text-white text-2xl md:text-3xl mb-4">
              Ready to Close the Gaps?
            </h3>
            <p className="text-white/70 text-base mb-8 font-dm">
              We'll walk through your results, show you how Narrative closes
              each gap, and build a custom roadmap.
            </p>
            <a
              href="https://nextgenpracticesolutions.com/book"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 rounded-lg bg-ca-teal text-white font-semibold text-base hover:bg-ca-teal/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ca-teal focus-visible:ring-offset-2 focus-visible:ring-offset-ca-navy"
            >
              Book a Free 30-Minute Strategy Call
            </a>
            <p className="mt-4 text-white/40 text-sm font-dm">
              No pitch. Just your results, your numbers, and a clear plan.
            </p>
          </div>
        </section>

        {/* Print Button */}
        <section className="bg-ca-bg py-8 px-6 text-center print:hidden">
          <button
            onClick={() => window.print()}
            className="px-6 py-2.5 rounded-lg border border-ca-border text-ca-text-soft text-sm font-semibold hover:bg-ca-bg-deep transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ca-teal font-dm"
          >
            Print / Save as PDF
          </button>
        </section>
      </motion.div>
    </AnimatePresence>
  );
}

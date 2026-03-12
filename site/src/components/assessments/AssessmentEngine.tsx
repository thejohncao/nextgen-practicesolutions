"use client";

import { useState, useMemo } from "react";
import {
  type AssessmentConfig,
  type AnswerValue,
  calculateTotalScore,
  calculatePillarScores,
  getScoreBand,
  getGaps,
} from "@/lib/assessment-types";
import { AssessmentIntro } from "./AssessmentIntro";
import { AssessmentQuestions } from "./AssessmentQuestions";
import { AssessmentLeadCapture } from "./AssessmentLeadCapture";
import { AssessmentResults } from "./AssessmentResults";

type Phase = "intro" | "questions" | "lead-capture" | "results";

interface AssessmentEngineProps {
  config: AssessmentConfig;
}

export function AssessmentEngine({ config }: AssessmentEngineProps) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [currentPillarIndex, setCurrentPillarIndex] = useState(0);

  const totalQuestions = useMemo(
    () => config.pillars.reduce((sum, p) => sum + p.questions.length, 0),
    [config.pillars]
  );

  const answeredCount = Object.values(answers).filter((v) => v !== null).length;

  function handleAnswer(questionId: string, value: AnswerValue) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function handleStart() {
    setPhase("questions");
  }

  function handleQuestionsComplete() {
    setPhase("lead-capture");
  }

  function handleLeadCaptured() {
    setPhase("results");
  }

  function handleSkipLeadCapture() {
    setPhase("results");
  }

  function handleRetake() {
    setAnswers({});
    setCurrentPillarIndex(0);
    setPhase("intro");
  }

  if (phase === "intro") {
    return (
      <AssessmentIntro
        title={config.title}
        subtitle={config.subtitle}
        pillarNames={config.pillars.map((p) => p.name)}
        totalQuestions={totalQuestions}
        onStart={handleStart}
      />
    );
  }

  if (phase === "questions") {
    return (
      <AssessmentQuestions
        pillars={config.pillars}
        answers={answers}
        currentPillarIndex={currentPillarIndex}
        onPillarChange={setCurrentPillarIndex}
        onAnswer={handleAnswer}
        onComplete={handleQuestionsComplete}
        totalQuestions={totalQuestions}
        answeredCount={answeredCount}
      />
    );
  }

  if (phase === "lead-capture") {
    return (
      <AssessmentLeadCapture
        onSubmit={handleLeadCaptured}
        onSkip={handleSkipLeadCapture}
      />
    );
  }

  const totalScore = calculateTotalScore(config.pillars, answers);
  const pillarScores = calculatePillarScores(config.pillars, answers);
  const band = getScoreBand(totalScore.percent, config.scoreBands);
  const gaps = getGaps(config.pillars, answers);

  return (
    <AssessmentResults
      config={config}
      totalScore={totalScore}
      pillarScores={pillarScores}
      band={band}
      gaps={gaps}
      onRetake={handleRetake}
    />
  );
}

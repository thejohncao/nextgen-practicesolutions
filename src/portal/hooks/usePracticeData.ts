import { useMemo } from 'react';
import { usePractice } from '../context/PracticeContext';
import {
  giselleAssets as mockGiselleAssets,
  milesWorkflows as mockMilesWorkflows,
  devonTools as mockDevonTools,
  academyPrograms as mockAcademyPrograms,
  rolePaths as mockRolePaths,
  sopLibrary as mockSopLibrary,
  globalKPIs as mockGlobalKPIs,
  pillarSummaries as mockPillarSummaries,
  packages as mockPackages,
  milestones as mockMilestones,
  insights as mockInsights,
  newPatientTrend as mockNewPatientTrend,
  speedToLeadTrend as mockSpeedToLeadTrend,
  caseAcceptanceTrend as mockCaseAcceptanceTrend,
  trainingCompletionTrend as mockTrainingCompletionTrend,
  clientRequests as mockClientRequests,
  giselleHeroKPIs as mockGiselleHeroKPIs,
  giselleDetailKPIs as mockGiselleDetailKPIs,
  milesHeroKPIs as mockMilesHeroKPIs,
  milesDetailKPIs as mockMilesDetailKPIs,
  devonHeroKPIs as mockDevonHeroKPIs,
  devonDetailKPIs as mockDevonDetailKPIs,
  almaHeroKPIs as mockAlmaHeroKPIs,
  almaDetailKPIs as mockAlmaDetailKPIs,
  almaInsights as mockAlmaInsights,
} from '../data/mock';
import type { SystemAsset, WorkflowItem, KPI, Package, Milestone, Insight, ClientRequest } from '../types';
import type { RolePath, SOPEntry } from '../data/mock';

interface AcademyProgram {
  id: string;
  name: string;
  roles: string[];
  duration: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  lastActivity: string;
}

function emptyKPI(kpi: KPI): KPI {
  return { ...kpi, value: '—', change: '—', changeDirection: 'flat' as const };
}

function emptyMetrics(metrics: { id: string; label: string; value: string; changeDirection?: 'up' | 'down' | 'flat' }[]) {
  return metrics.map((m) => ({ ...m, value: '—', ...(m.changeDirection !== undefined ? { changeDirection: 'flat' as const } : {}) }));
}

export function usePracticeData() {
  const { isDemo, getItemEnabled, getAlmaItemEnabled } = usePractice();

  const giselleAssets: SystemAsset[] = useMemo(() => {
    if (isDemo) return mockGiselleAssets;
    return mockGiselleAssets.map((a) => ({
      ...a,
      enabled: getItemEnabled('giselle', a.id),
      status: getItemEnabled('giselle', a.id) ? 'Active' : 'Not Set Up',
    }));
  }, [isDemo, getItemEnabled]);

  const milesWorkflows: WorkflowItem[] = useMemo(() => {
    if (isDemo) return mockMilesWorkflows;
    return mockMilesWorkflows.map((w) => ({
      ...w,
      status: getItemEnabled('miles', w.id) ? ('live' as const) : ('planned' as const),
    }));
  }, [isDemo, getItemEnabled]);

  const devonTools: SystemAsset[] = useMemo(() => {
    if (isDemo) return mockDevonTools;
    return mockDevonTools.map((t) => ({
      ...t,
      enabled: getItemEnabled('devon', t.id),
      status: getItemEnabled('devon', t.id) ? 'Active' : 'Not Set Up',
    }));
  }, [isDemo, getItemEnabled]);

  const academyPrograms: AcademyProgram[] = useMemo(() => {
    if (isDemo) return mockAcademyPrograms;
    return mockAcademyPrograms.map((p) => ({
      ...p,
      status: getAlmaItemEnabled('programs', p.id) ? ('in_progress' as const) : ('not_started' as const),
      progress: getAlmaItemEnabled('programs', p.id) ? p.progress : 0,
    }));
  }, [isDemo, getAlmaItemEnabled]);

  const rolePathsData: RolePath[] = useMemo(() => {
    if (isDemo) return mockRolePaths;
    return mockRolePaths.map((rp) => ({
      ...rp,
      modules: rp.modules.map((m) => ({
        ...m,
        completed: getAlmaItemEnabled('rolePaths', m.id),
      })),
    }));
  }, [isDemo, getAlmaItemEnabled]);

  const sopLibrary: SOPEntry[] = useMemo(() => {
    if (isDemo) return mockSopLibrary;
    return mockSopLibrary.map((s) => ({
      ...s,
      completionRate: getAlmaItemEnabled('sops', s.id) ? s.completionRate : 0,
    }));
  }, [isDemo, getAlmaItemEnabled]);

  // ── Practice-aware KPI and data exports ──

  const globalKPIs: KPI[] = useMemo(() => {
    if (isDemo) return mockGlobalKPIs;
    return mockGlobalKPIs.map(emptyKPI);
  }, [isDemo]);

  const pillarSummaries = useMemo(() => {
    if (isDemo) return mockPillarSummaries;
    return mockPillarSummaries.map((s) => ({
      ...s,
      topKPIs: s.topKPIs.map((k) => ({ ...k, value: '—', change: '—' })),
      activePackages: 0,
      alert: 'Complete onboarding to activate this pillar',
    }));
  }, [isDemo]);

  const packages: Package[] = useMemo(() => {
    if (isDemo) return mockPackages;
    return [];
  }, [isDemo]);

  const milestones: Milestone[] = useMemo(() => {
    if (isDemo) return mockMilestones;
    return [];
  }, [isDemo]);

  const insights: Insight[] = useMemo(() => {
    if (isDemo) return mockInsights;
    return [];
  }, [isDemo]);

  const almaInsights: Insight[] = useMemo(() => {
    if (isDemo) return mockAlmaInsights;
    return [];
  }, [isDemo]);

  const clientRequests: ClientRequest[] = useMemo(() => {
    if (isDemo) return mockClientRequests;
    return [];
  }, [isDemo]);

  const newPatientTrend = useMemo(() => {
    if (isDemo) return mockNewPatientTrend;
    return mockNewPatientTrend.map((d) => ({ ...d, value: 0 }));
  }, [isDemo]);

  const speedToLeadTrend = useMemo(() => {
    if (isDemo) return mockSpeedToLeadTrend;
    return mockSpeedToLeadTrend.map((d) => ({ ...d, value: 0 }));
  }, [isDemo]);

  const caseAcceptanceTrend = useMemo(() => {
    if (isDemo) return mockCaseAcceptanceTrend;
    return mockCaseAcceptanceTrend.map((d) => ({ ...d, value: 0 }));
  }, [isDemo]);

  const trainingCompletionTrend = useMemo(() => {
    if (isDemo) return mockTrainingCompletionTrend;
    return mockTrainingCompletionTrend.map((d) => ({ ...d, value: 0 }));
  }, [isDemo]);

  // ── Pillar-specific KPIs ──

  const giselleHeroKPIs: KPI[] = useMemo(() => {
    if (isDemo) return mockGiselleHeroKPIs;
    return mockGiselleHeroKPIs.map(emptyKPI);
  }, [isDemo]);

  const giselleDetailKPIs = useMemo(() => {
    if (isDemo) return mockGiselleDetailKPIs;
    return {
      newPatientVolume: emptyMetrics(mockGiselleDetailKPIs.newPatientVolume),
      marketingPerformance: emptyMetrics(mockGiselleDetailKPIs.marketingPerformance),
      websiteConversion: emptyMetrics(mockGiselleDetailKPIs.websiteConversion),
      reputationPresence: emptyMetrics(mockGiselleDetailKPIs.reputationPresence),
    };
  }, [isDemo]);

  const milesHeroKPIs: KPI[] = useMemo(() => {
    if (isDemo) return mockMilesHeroKPIs;
    return mockMilesHeroKPIs.map(emptyKPI);
  }, [isDemo]);

  const milesDetailKPIs = useMemo(() => {
    if (isDemo) return mockMilesDetailKPIs;
    return {
      speedToLead: emptyMetrics(mockMilesDetailKPIs.speedToLead),
      bookingShow: emptyMetrics(mockMilesDetailKPIs.bookingShow),
      recallRetention: emptyMetrics(mockMilesDetailKPIs.recallRetention),
      revenueAR: emptyMetrics(mockMilesDetailKPIs.revenueAR),
      teamSystems: emptyMetrics(mockMilesDetailKPIs.teamSystems),
    };
  }, [isDemo]);

  const devonHeroKPIs: KPI[] = useMemo(() => {
    if (isDemo) return mockDevonHeroKPIs;
    return mockDevonHeroKPIs.map(emptyKPI);
  }, [isDemo]);

  const devonDetailKPIs = useMemo(() => {
    if (isDemo) return mockDevonDetailKPIs;
    return {
      caseAcceptance: emptyMetrics(mockDevonDetailKPIs.caseAcceptance),
      treatmentOpportunity: emptyMetrics(mockDevonDetailKPIs.treatmentOpportunity),
      frontDeskConversion: emptyMetrics(mockDevonDetailKPIs.frontDeskConversion),
      trainingCoaching: emptyMetrics(mockDevonDetailKPIs.trainingCoaching),
    };
  }, [isDemo]);

  const almaHeroKPIs: KPI[] = useMemo(() => {
    if (isDemo) return mockAlmaHeroKPIs;
    return mockAlmaHeroKPIs.map(emptyKPI);
  }, [isDemo]);

  const almaDetailKPIs = useMemo(() => {
    if (isDemo) return mockAlmaDetailKPIs;
    return {
      teamOnboarding: emptyMetrics(mockAlmaDetailKPIs.teamOnboarding),
      certifications: emptyMetrics(mockAlmaDetailKPIs.certifications),
      trainingActivity: emptyMetrics(mockAlmaDetailKPIs.trainingActivity),
      sopLibrary: emptyMetrics(mockAlmaDetailKPIs.sopLibrary),
    };
  }, [isDemo]);

  return {
    isDemo,
    giselleAssets,
    milesWorkflows,
    devonTools,
    academyPrograms,
    rolePaths: rolePathsData,
    sopLibrary,
    globalKPIs,
    pillarSummaries,
    packages,
    milestones,
    insights,
    almaInsights,
    clientRequests,
    newPatientTrend,
    speedToLeadTrend,
    caseAcceptanceTrend,
    trainingCompletionTrend,
    giselleHeroKPIs,
    giselleDetailKPIs,
    milesHeroKPIs,
    milesDetailKPIs,
    devonHeroKPIs,
    devonDetailKPIs,
    almaHeroKPIs,
    almaDetailKPIs,
  };
}

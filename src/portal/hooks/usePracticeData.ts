import { useMemo } from 'react';
import { usePractice } from '../context/PracticeContext';
import {
  giselleAssets as mockGiselleAssets,
  milesWorkflows as mockMilesWorkflows,
  devonTools as mockDevonTools,
  academyPrograms as mockAcademyPrograms,
  rolePaths as mockRolePaths,
  sopLibrary as mockSopLibrary,
} from '../data/mock';
import type { SystemAsset, WorkflowItem } from '../types';
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

  return {
    giselleAssets,
    milesWorkflows,
    devonTools,
    academyPrograms,
    rolePaths: rolePathsData,
    sopLibrary,
  };
}

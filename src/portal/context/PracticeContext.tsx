import { createContext, useContext, useCallback, useState, useEffect, type ReactNode } from 'react';
import { usePortalAuth } from './PortalAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { demoPractice, demoUser } from '../data/mock';
import type { Practice, PortalUser, PillarSlug } from '../types';

export interface CreatePracticeInput {
  name: string;
  ownerName: string;
  ownerEmail: string;
  locations: string[];
  plan: string;
  phone: string;
  pms: string;
  providers: string;
  specialties: string;
  yearsInOperation: string;
}

interface OnboardingState {
  currentStep: number;
  completedAt: string | null;
  kpis: Record<string, { current: number | null; target: number | null }>;
}

interface PracticeContextValue {
  activePractice: Practice;
  activeUser: PortalUser;
  isDemo: boolean;
  allPractices: { id: string; name: string }[];
  switchPractice: (id: string) => void;
  createPractice: (data: CreatePracticeInput) => Promise<string | null>;
  deletePractice: (id: string) => void;
  onboardingState: OnboardingState | null;
  setOnboardingStep: (step: number) => void;
  completeOnboarding: () => void;
  toggleItem: (pillar: PillarSlug, itemId: string) => void;
  getItemEnabled: (pillar: PillarSlug, itemId: string) => boolean;
  toggleAlmaItem: (category: 'programs' | 'rolePaths' | 'sops', id: string) => void;
  getAlmaItemEnabled: (category: 'programs' | 'rolePaths' | 'sops', id: string) => boolean;
  setKPI: (kpiId: string, field: 'current' | 'target', value: number | null) => void;
  getKPI: (kpiId: string) => { current: number | null; target: number | null };
}

const PracticeContext = createContext<PracticeContextValue | null>(null);

export function PracticeProvider({ children }: { children: ReactNode }) {
  const { profile, isAdmin, activePracticeId, setActivePracticeId, refreshProfile } = usePortalAuth();

  const [practiceData, setPracticeData] = useState<any>(null);
  const [allPractices, setAllPractices] = useState<{ id: string; name: string }[]>([]);
  const [onboardingStep, setOnboardingStepState] = useState(0);
  const [toggles, setToggles] = useState<Record<string, boolean>>({});
  const [kpiValues, setKpiValues] = useState<Record<string, { current: number | null; target: number | null }>>({});

  const isDemo = !activePracticeId;

  // Fetch practice data when activePracticeId changes
  useEffect(() => {
    if (!activePracticeId) {
      setPracticeData(null);
      return;
    }
    supabase
      .from('portal_practices')
      .select('*')
      .eq('id', activePracticeId)
      .single()
      .then(({ data }) => {
        if (data) {
          setPracticeData(data);
          setOnboardingStepState(data.status === 'active' ? 6 : 0);
        }
      });
  }, [activePracticeId]);

  // Fetch all practices for admin
  useEffect(() => {
    if (isAdmin) {
      supabase
        .from('portal_practices')
        .select('id, name')
        .order('created_at', { ascending: false })
        .then(({ data }) => {
          const practices = data ?? [];
          // Always include Demo as first option for admin
          setAllPractices([{ id: 'demo', name: 'Demo Practice' }, ...practices]);
        });
    } else if (activePracticeId && practiceData) {
      setAllPractices([{ id: practiceData.id, name: practiceData.name }]);
    }
  }, [isAdmin, activePracticeId, practiceData]);

  // Fetch toggles for active practice
  useEffect(() => {
    if (!activePracticeId) {
      setToggles({});
      return;
    }
    supabase
      .from('system_toggles')
      .select('item_name, is_active')
      .eq('practice_id', activePracticeId)
      .then(({ data }) => {
        const map: Record<string, boolean> = {};
        data?.forEach((t: any) => { map[t.item_name] = t.is_active; });
        setToggles(map);
      });
  }, [activePracticeId]);

  // Fetch KPI snapshots (month 0) for active practice
  useEffect(() => {
    if (!activePracticeId) {
      setKpiValues({});
      return;
    }
    supabase
      .from('kpi_snapshots')
      .select('kpi_definition_id, value, target')
      .eq('practice_id', activePracticeId)
      .eq('month', 0)
      .then(({ data }) => {
        const map: Record<string, { current: number | null; target: number | null }> = {};
        data?.forEach((s: any) => {
          map[s.kpi_definition_id] = { current: s.value, target: s.target };
        });
        setKpiValues(map);
      });
  }, [activePracticeId]);

  const activePractice: Practice = practiceData
    ? {
        id: practiceData.id,
        name: practiceData.name,
        locations: practiceData.location ? [practiceData.location] : [],
        ownerName: practiceData.doctor,
        ownerEmail: practiceData.email || '',
        plan: practiceData.plan_tier || '',
        phone: practiceData.phone || '',
        pms: practiceData.pms || '',
        providers: practiceData.providers || '',
        specialties: practiceData.specialties || '',
        yearsInOperation: practiceData.years_open || '',
        onboardedAt: practiceData.onboarded_at || practiceData.created_at,
      }
    : demoPractice;

  const activeUser: PortalUser = profile
    ? {
        id: profile.id,
        name: profile.name || profile.email,
        email: profile.email,
        role: (profile.role === 'admin' ? 'owner' : profile.role === 'owner' ? 'owner' : profile.role === 'manager' ? 'manager' : 'staff') as any,
        practiceId: activePracticeId || '',
      }
    : demoUser;

  const switchPractice = useCallback((id: string) => {
    setActivePracticeId(id === 'demo' ? null : id);
  }, [setActivePracticeId]);

  const createPractice = useCallback(async (data: CreatePracticeInput): Promise<string | null> => {
    const { data: practice, error } = await supabase
      .from('portal_practices')
      .insert({
        name: data.name,
        doctor: data.ownerName,
        email: data.ownerEmail,
        location: data.locations[0] || null,
        phone: data.phone,
        pms: data.pms,
        providers: data.providers,
        specialties: data.specialties,
        years_open: data.yearsInOperation,
        plan_tier: data.plan || null,
      })
      .select('id')
      .single();

    if (error || !practice) {
      console.error('Error creating practice:', error);
      return null;
    }

    // Link user's profile to this practice
    if (profile) {
      await supabase
        .from('profiles')
        .update({ practice_id: practice.id })
        .eq('id', profile.id);
      await refreshProfile();
    }

    setActivePracticeId(practice.id);
    return practice.id;
  }, [profile, refreshProfile, setActivePracticeId]);

  const deletePractice = useCallback(async (id: string) => {
    await supabase.from('portal_practices').delete().eq('id', id);
    if (activePracticeId === id) {
      setActivePracticeId(null);
    }
    // Refresh all practices list
    if (isAdmin) {
      const { data } = await supabase.from('portal_practices').select('id, name').order('created_at', { ascending: false });
      setAllPractices(data ?? []);
    }
  }, [activePracticeId, isAdmin, setActivePracticeId]);

  const onboardingState: OnboardingState | null = activePracticeId
    ? { currentStep: onboardingStep, completedAt: practiceData?.status === 'active' ? (practiceData.onboarded_at || 'done') : null, kpis: kpiValues }
    : null;

  const setOnboardingStep = useCallback((step: number) => {
    setOnboardingStepState(step);
  }, []);

  const completeOnboarding = useCallback(async () => {
    if (!activePracticeId) return;
    setOnboardingStepState(6);
    await supabase
      .from('portal_practices')
      .update({ status: 'active', onboarded_at: new Date().toISOString() })
      .eq('id', activePracticeId);
  }, [activePracticeId]);

  const toggleItem = useCallback(async (pillar: PillarSlug, itemId: string) => {
    if (!activePracticeId || pillar === 'alma') return;
    const newVal = !toggles[itemId];
    setToggles((prev) => ({ ...prev, [itemId]: newVal }));

    // Upsert toggle
    const { data: existing } = await supabase
      .from('system_toggles')
      .select('id')
      .eq('practice_id', activePracticeId)
      .eq('item_name', itemId)
      .maybeSingle();

    if (existing) {
      await supabase.from('system_toggles').update({ is_active: newVal }).eq('id', existing.id);
    } else {
      await supabase.from('system_toggles').insert({
        practice_id: activePracticeId,
        pillar,
        category: 'Systems & Assets',
        item_name: itemId,
        is_active: newVal,
      });
    }
  }, [activePracticeId, toggles]);

  const getItemEnabled = useCallback((pillar: PillarSlug, itemId: string): boolean => {
    if (!activePracticeId) return true; // demo
    return !!toggles[itemId];
  }, [activePracticeId, toggles]);

  const toggleAlmaItem = useCallback(async (category: 'programs' | 'rolePaths' | 'sops', id: string) => {
    if (!activePracticeId) return;
    const key = `alma_${category}_${id}`;
    const newVal = !toggles[key];
    setToggles((prev) => ({ ...prev, [key]: newVal }));

    const { data: existing } = await supabase
      .from('system_toggles')
      .select('id')
      .eq('practice_id', activePracticeId)
      .eq('item_name', key)
      .maybeSingle();

    if (existing) {
      await supabase.from('system_toggles').update({ is_active: newVal }).eq('id', existing.id);
    } else {
      await supabase.from('system_toggles').insert({
        practice_id: activePracticeId,
        pillar: 'alma',
        category,
        item_name: key,
        is_active: newVal,
      });
    }
  }, [activePracticeId, toggles]);

  const getAlmaItemEnabled = useCallback((category: 'programs' | 'rolePaths' | 'sops', id: string): boolean => {
    if (!activePracticeId) return true;
    return !!toggles[`alma_${category}_${id}`];
  }, [activePracticeId, toggles]);

  const setKPI = useCallback(async (kpiId: string, field: 'current' | 'target', value: number | null) => {
    setKpiValues((prev) => ({
      ...prev,
      [kpiId]: {
        ...(prev[kpiId] ?? { current: null, target: null }),
        [field]: value,
      },
    }));

    if (!activePracticeId) return;

    const existing = kpiValues[kpiId];
    const newValue = field === 'current' ? value : (existing?.current ?? null);
    const newTarget = field === 'target' ? value : (existing?.target ?? null);

    // Upsert
    const { data: snap } = await supabase
      .from('kpi_snapshots')
      .select('id')
      .eq('practice_id', activePracticeId)
      .eq('kpi_definition_id', kpiId)
      .eq('month', 0)
      .maybeSingle();

    if (snap) {
      await supabase.from('kpi_snapshots').update({ value: newValue, target: newTarget }).eq('id', snap.id);
    } else {
      await supabase.from('kpi_snapshots').insert({
        practice_id: activePracticeId,
        kpi_definition_id: kpiId,
        month: 0,
        value: newValue,
        target: newTarget,
      });
    }
  }, [activePracticeId, kpiValues]);

  const getKPI = useCallback((kpiId: string): { current: number | null; target: number | null } => {
    return kpiValues[kpiId] ?? { current: null, target: null };
  }, [kpiValues]);

  return (
    <PracticeContext.Provider
      value={{
        activePractice,
        activeUser,
        isDemo,
        allPractices,
        switchPractice,
        createPractice,
        deletePractice,
        onboardingState,
        setOnboardingStep,
        completeOnboarding,
        toggleItem,
        getItemEnabled,
        toggleAlmaItem,
        getAlmaItemEnabled,
        setKPI,
        getKPI,
      }}
    >
      {children}
    </PracticeContext.Provider>
  );
}

export function usePractice(): PracticeContextValue {
  const ctx = useContext(PracticeContext);
  if (!ctx) throw new Error('usePractice must be used within PracticeProvider');
  return ctx;
}

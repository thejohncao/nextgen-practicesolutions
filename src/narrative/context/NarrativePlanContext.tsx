import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type {
  NarrativePlan,
  NarrativePlanItem,
  NarrativePatient,
  NarrativeMode,
  Phase,
  PhaseGroup,
  PHASE_CONFIG,
} from '../types';

interface NarrativePlanContextValue {
  plan: NarrativePlan | null;
  patient: NarrativePatient | null;
  items: NarrativePlanItem[];
  mode: NarrativeMode;
  setMode: (mode: NarrativeMode) => void;
  loading: boolean;
  addItem: (item: Omit<NarrativePlanItem, 'id' | 'plan_id' | 'created_at'>) => Promise<void>;
  updateItem: (id: string, updates: Partial<NarrativePlanItem>) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updatePlan: (updates: Partial<NarrativePlan>) => Promise<void>;
  refreshItems: () => Promise<void>;
  phaseGroups: PhaseGroup[];
  totalFeeCents: number;
}

const NarrativePlanContext = createContext<NarrativePlanContextValue | null>(null);

export function NarrativePlanProvider({
  planId,
  children,
}: {
  planId: string;
  children: ReactNode;
}) {
  const [plan, setPlan] = useState<NarrativePlan | null>(null);
  const [patient, setPatient] = useState<NarrativePatient | null>(null);
  const [items, setItems] = useState<NarrativePlanItem[]>([]);
  const [mode, setMode] = useState<NarrativeMode>('build');
  const [loading, setLoading] = useState(true);

  // Fetch plan + patient
  useEffect(() => {
    async function fetchPlan() {
      setLoading(true);
      try {
        const { data: planData, error: planError } = await supabase
          .from('narrative_plans')
          .select('*')
          .eq('id', planId)
          .single();

        if (planError) throw planError;
        setPlan(planData as NarrativePlan);

        if (planData?.patient_id) {
          const { data: patientData } = await supabase
            .from('narrative_patients')
            .select('*')
            .eq('id', planData.patient_id)
            .single();

          setPatient(patientData as NarrativePatient);
        }
      } catch (err) {
        console.error('Failed to fetch plan:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPlan();
  }, [planId]);

  // Fetch plan items
  const refreshItems = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('narrative_plan_items')
        .select('*')
        .eq('plan_id', planId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setItems((data || []) as NarrativePlanItem[]);
    } catch (err) {
      console.error('Failed to fetch plan items:', err);
    }
  }, [planId]);

  useEffect(() => {
    refreshItems();
  }, [refreshItems]);

  const addItem = useCallback(
    async (item: Omit<NarrativePlanItem, 'id' | 'plan_id' | 'created_at'>) => {
      try {
        const { error } = await supabase
          .from('narrative_plan_items')
          .insert({ ...item, plan_id: planId });

        if (error) throw error;
        await refreshItems();
      } catch (err) {
        console.error('Failed to add item:', err);
        throw err;
      }
    },
    [planId, refreshItems]
  );

  const updateItem = useCallback(
    async (id: string, updates: Partial<NarrativePlanItem>) => {
      try {
        const { error } = await supabase
          .from('narrative_plan_items')
          .update(updates)
          .eq('id', id);

        if (error) throw error;
        await refreshItems();
      } catch (err) {
        console.error('Failed to update item:', err);
        throw err;
      }
    },
    [refreshItems]
  );

  const removeItem = useCallback(
    async (id: string) => {
      try {
        const { error } = await supabase
          .from('narrative_plan_items')
          .delete()
          .eq('id', id);

        if (error) throw error;
        await refreshItems();
      } catch (err) {
        console.error('Failed to remove item:', err);
        throw err;
      }
    },
    [refreshItems]
  );

  const updatePlan = useCallback(
    async (updates: Partial<NarrativePlan>) => {
      try {
        const { error } = await supabase
          .from('narrative_plans')
          .update(updates)
          .eq('id', planId);

        if (error) throw error;
        setPlan((prev) => (prev ? { ...prev, ...updates } : prev));
      } catch (err) {
        console.error('Failed to update plan:', err);
        throw err;
      }
    },
    [planId]
  );

  // Compute phase groups
  const phaseGroups: PhaseGroup[] = ([1, 2, 3] as Phase[]).map((phase) => {
    const phaseItems = items.filter((item) => item.phase === phase);
    const config = {
      1: { label: 'Phase 1', priority: 'urgent' as const, color: '#E85D5D' },
      2: { label: 'Phase 2', priority: 'important' as const, color: '#B68D40' },
      3: { label: 'Phase 3', priority: 'maintenance' as const, color: '#8B8B8B' },
    }[phase];

    return {
      phase,
      label: config.label,
      priority: config.priority,
      color: config.color,
      items: phaseItems,
      totalFeeCents: phaseItems.reduce((sum, item) => sum + item.fee_cents, 0),
      totalDurationMinutes: phaseItems.reduce((sum, item) => sum + item.duration_minutes, 0),
      date: phaseItems[0]?.phase_date || null,
    };
  });

  const totalFeeCents = items.reduce((sum, item) => sum + item.fee_cents, 0);

  return (
    <NarrativePlanContext.Provider
      value={{
        plan,
        patient,
        items,
        mode,
        setMode,
        loading,
        addItem,
        updateItem,
        removeItem,
        updatePlan,
        refreshItems,
        phaseGroups,
        totalFeeCents,
      }}
    >
      {children}
    </NarrativePlanContext.Provider>
  );
}

export function useNarrativePlan() {
  const ctx = useContext(NarrativePlanContext);
  if (!ctx) {
    throw new Error('useNarrativePlan must be used within NarrativePlanProvider');
  }
  return ctx;
}

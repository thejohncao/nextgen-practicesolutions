// Demo data store — in-memory + localStorage persistence
// Replaces Supabase calls so the Narrative feature works without database tables

import type {
  NarrativePatient,
  NarrativePlan,
  NarrativePlanItem,
  PlanStatus,
} from '../types';
import { SEED_PLANS, type SeedPlan } from './seed';

const STORAGE_KEY = 'narrative_demo_data';
const DEMO_PRACTICE_ID = 'demo-practice-001';

interface DemoData {
  patients: NarrativePatient[];
  plans: NarrativePlan[];
  items: NarrativePlanItem[];
}

function buildSeedData(): DemoData {
  const patients: NarrativePatient[] = [];
  const plans: NarrativePlan[] = [];
  const items: NarrativePlanItem[] = [];
  const now = new Date().toISOString();

  for (const seed of SEED_PLANS) {
    const patientId = crypto.randomUUID();
    const planId = crypto.randomUUID();

    patients.push({
      id: patientId,
      practice_id: DEMO_PRACTICE_ID,
      first_name: seed.patient.first_name,
      last_name: seed.patient.last_name,
      phone: seed.patient.phone || null,
      email: seed.patient.email || null,
      insurance_status: seed.patient.insurance_status,
      membership_tier: seed.patient.membership_tier ?? null,
      created_at: now,
    });

    plans.push({
      id: planId,
      patient_id: patientId,
      practice_id: DEMO_PRACTICE_ID,
      provider_name: seed.provider_name || 'Dr. Kansagra',
      status: seed.status as PlanStatus,
      decision_at: null,
      signature_data: null,
      notes: null,
      created_at: now,
      updated_at: now,
    });

    for (const item of seed.items) {
      items.push({
        id: crypto.randomUUID(),
        plan_id: planId,
        tooth_number: item.tooth_number,
        diagnosis: item.diagnosis,
        treatment_code: item.treatment_code,
        treatment_name: item.treatment_name,
        phase: item.phase as 1 | 2 | 3,
        fee_cents: item.fee_cents,
        duration_minutes: item.duration_minutes,
        phase_date: null,
        notes: null,
        created_at: now,
      });
    }
  }

  return { patients, plans, items };
}

function load(): DemoData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  const data = buildSeedData();
  persist(data);
  return data;
}

function persist(data: DemoData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

let data = load();

// --- Reads ---

export function getPlansWithPatients(): (NarrativePlan & { narrative_patients: NarrativePatient })[] {
  return data.plans
    .map((plan) => ({
      ...plan,
      narrative_patients: data.patients.find((p) => p.id === plan.patient_id)!,
    }))
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function getPlan(id: string): NarrativePlan | null {
  return data.plans.find((p) => p.id === id) ?? null;
}

export function getPatient(id: string): NarrativePatient | null {
  return data.patients.find((p) => p.id === id) ?? null;
}

export function getItemsForPlan(planId: string): NarrativePlanItem[] {
  return data.items.filter((i) => i.plan_id === planId);
}

// --- Writes ---

export function createPatient(
  input: Omit<NarrativePatient, 'id' | 'created_at'>
): NarrativePatient {
  const patient: NarrativePatient = {
    ...input,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };
  data.patients.push(patient);
  persist(data);
  return patient;
}

export function createPlan(
  input: Omit<NarrativePlan, 'id' | 'created_at' | 'updated_at'>
): NarrativePlan {
  const now = new Date().toISOString();
  const plan: NarrativePlan = {
    ...input,
    id: crypto.randomUUID(),
    created_at: now,
    updated_at: now,
  };
  data.plans.push(plan);
  persist(data);
  return plan;
}

export function addItem(
  input: Omit<NarrativePlanItem, 'id' | 'created_at'>
): NarrativePlanItem {
  const item: NarrativePlanItem = {
    ...input,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };
  data.items.push(item);
  persist(data);
  return item;
}

export function updateItem(id: string, updates: Partial<NarrativePlanItem>) {
  const idx = data.items.findIndex((i) => i.id === id);
  if (idx >= 0) {
    data.items[idx] = { ...data.items[idx], ...updates };
    persist(data);
  }
}

export function removeItem(id: string) {
  data.items = data.items.filter((i) => i.id !== id);
  persist(data);
}

export function updatePlan(id: string, updates: Partial<NarrativePlan>) {
  const idx = data.plans.findIndex((p) => p.id === id);
  if (idx >= 0) {
    data.plans[idx] = { ...data.plans[idx], ...updates, updated_at: new Date().toISOString() };
    persist(data);
  }
}

// --- Utility ---

export function resetToSeed() {
  data = buildSeedData();
  persist(data);
}

// Narrative — TypeScript Types

export type InsuranceStatus = 'insured' | 'self_pay' | 'membership';
export type MembershipTier = 'glow' | 'luminate' | 'radiate';
export type PlanStatus = 'draft' | 'presented' | 'accepted' | 'declined' | 'scheduled' | 'thinking' | 'expired' | 'completed' | 'cancelled';
export type Phase = 1 | 2 | 3;
export type DecisionType = 'start_today' | 'schedule_later' | 'think_about_it';
export type NarrativeMode = 'build' | 'present';

export interface NarrativePatient {
  id: string;
  practice_id: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  email: string | null;
  insurance_status: InsuranceStatus;
  membership_tier: MembershipTier | null;
  created_at: string;
}

export interface NarrativePlan {
  id: string;
  patient_id: string;
  practice_id: string;
  provider_name: string;
  status: PlanStatus;
  decision_at: string | null;
  signature_data: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  patient?: NarrativePatient;
}

export interface NarrativePlanItem {
  id: string;
  plan_id: string;
  tooth_number: number | null;
  diagnosis: string;
  treatment_code: string;
  treatment_name: string;
  phase: Phase;
  fee_cents: number;
  duration_minutes: number;
  phase_date: string | null;
  notes: string | null;
  created_at: string;
}

export interface NarrativeFeeSchedule {
  id: string;
  practice_id: string;
  code: string;
  label: string;
  fee_cents: number;
  category: string;
  duration_minutes: number;
}

// Computed / UI types

export interface PhaseGroup {
  phase: Phase;
  label: string;
  priority: 'urgent' | 'important' | 'maintenance';
  color: string;
  items: NarrativePlanItem[];
  totalFeeCents: number;
  totalDurationMinutes: number;
  date: string | null;
}

export interface PricingBreakdown {
  fullFeeCents: number;
  insuranceEstimateCents: number;
  membershipDiscountCents: number;
  patientResponsibilityCents: number;
  monthlyPaymentCents: number;
  financingTermMonths: number;
}

export interface MembershipTierConfig {
  tier: MembershipTier;
  name: string;
  monthlyPriceCents: number;
  discountPercent: number;
  annualAllowanceCents: number;
}

export const PHASE_CONFIG: Record<Phase, { label: string; priority: PhaseGroup['priority']; color: string }> = {
  1: { label: 'Phase 1', priority: 'urgent', color: '#E85D5D' },
  2: { label: 'Phase 2', priority: 'important', color: '#B68D40' },
  3: { label: 'Phase 3', priority: 'maintenance', color: '#8B8B8B' },
};

export const STEPS = [
  { number: 1, label: 'Intake', path: 'new' },
  { number: 2, label: 'Build', path: 'build' },
  { number: 3, label: 'Timeline', path: 'timeline' },
  { number: 4, label: 'Present', path: 'present' },
  { number: 5, label: 'Checkout', path: 'checkout' },
  { number: 6, label: 'Decision', path: 'commit' },
  { number: 7, label: 'Export', path: 'export' },
] as const;

// Seed utility — creates sample patients, plans, and plan items
// Call from browser console: import('/src/narrative/lib/seed.ts').then(m => m.seedNarrativeData())
// Or use the "Seed Sample Data" button on the dashboard (dev only)

import { supabase } from '@/integrations/supabase/client';

interface SeedPatient {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  insurance_status: 'insured' | 'self_pay' | 'membership';
  membership_tier?: 'glow' | 'luminate' | 'radiate';
}

interface SeedPlanItem {
  tooth_number: number;
  diagnosis: string;
  treatment_code: string;
  treatment_name: string;
  phase: number;
  fee_cents: number;
  duration_minutes: number;
}

interface SeedPlan {
  patient: SeedPatient;
  status: string;
  provider_name?: string;
  items: SeedPlanItem[];
}

const SEED_PLANS: SeedPlan[] = [
  {
    patient: {
      first_name: 'Maria',
      last_name: 'Garcia',
      phone: '5551234567',
      email: 'maria.garcia@example.com',
      insurance_status: 'insured',
    },
    status: 'accepted',
    items: [
      { tooth_number: 14, diagnosis: 'Dental Caries', treatment_code: 'D2740', treatment_name: 'Porcelain Crown', phase: 1, fee_cents: 135000, duration_minutes: 90 },
      { tooth_number: 19, diagnosis: 'Dental Caries', treatment_code: 'D2392', treatment_name: 'Composite Filling (2 surfaces, posterior)', phase: 1, fee_cents: 28000, duration_minutes: 40 },
      { tooth_number: 30, diagnosis: 'Pulpitis (Irreversible)', treatment_code: 'D3330', treatment_name: 'Root Canal (Molar)', phase: 1, fee_cents: 115000, duration_minutes: 90 },
      { tooth_number: 30, diagnosis: 'Pulpitis (Irreversible)', treatment_code: 'D2750', treatment_name: 'Crown (Porcelain Fused to Metal)', phase: 2, fee_cents: 120000, duration_minutes: 90 },
      { tooth_number: 3, diagnosis: 'Missing Tooth (Extraction)', treatment_code: 'D6010', treatment_name: 'Implant (Endosteal)', phase: 2, fee_cents: 250000, duration_minutes: 120 },
      { tooth_number: 3, diagnosis: 'Missing Tooth (Extraction)', treatment_code: 'D6058', treatment_name: 'Implant Crown (Porcelain)', phase: 2, fee_cents: 150000, duration_minutes: 60 },
      { tooth_number: 8, diagnosis: 'Discolored Tooth', treatment_code: 'D2962', treatment_name: 'Veneer (Porcelain)', phase: 3, fee_cents: 130000, duration_minutes: 90 },
      { tooth_number: 9, diagnosis: 'Discolored Tooth', treatment_code: 'D2962', treatment_name: 'Veneer (Porcelain)', phase: 3, fee_cents: 130000, duration_minutes: 90 },
    ],
  },
  {
    patient: {
      first_name: 'James',
      last_name: 'Wilson',
      phone: '5559876543',
      email: 'james.w@example.com',
      insurance_status: 'self_pay',
    },
    status: 'draft',
    items: [
      { tooth_number: 18, diagnosis: 'Caries on Pit & Fissure', treatment_code: 'D2391', treatment_name: 'Composite Filling (1 surface, posterior)', phase: 1, fee_cents: 22000, duration_minutes: 30 },
      { tooth_number: 31, diagnosis: 'Caries on Pit & Fissure', treatment_code: 'D2392', treatment_name: 'Composite Filling (2 surfaces, posterior)', phase: 1, fee_cents: 28000, duration_minutes: 40 },
      { tooth_number: 4, diagnosis: 'Dental Caries', treatment_code: 'D2391', treatment_name: 'Composite Filling (1 surface, posterior)', phase: 1, fee_cents: 22000, duration_minutes: 30 },
    ],
  },
  {
    patient: {
      first_name: 'Sarah',
      last_name: 'Chen',
      phone: '5555551234',
      email: 'sarah.chen@example.com',
      insurance_status: 'membership',
      membership_tier: 'luminate',
    },
    status: 'thinking',
    items: [
      { tooth_number: 2, diagnosis: 'Chronic Periodontitis (Localized)', treatment_code: 'D4341', treatment_name: 'Scaling & Root Planing (per quadrant)', phase: 1, fee_cents: 28000, duration_minutes: 60 },
      { tooth_number: 15, diagnosis: 'Chronic Periodontitis (Localized)', treatment_code: 'D4341', treatment_name: 'Scaling & Root Planing (per quadrant)', phase: 1, fee_cents: 28000, duration_minutes: 60 },
      { tooth_number: 18, diagnosis: 'Chronic Periodontitis (Localized)', treatment_code: 'D4341', treatment_name: 'Scaling & Root Planing (per quadrant)', phase: 1, fee_cents: 28000, duration_minutes: 60 },
      { tooth_number: 31, diagnosis: 'Chronic Periodontitis (Localized)', treatment_code: 'D4341', treatment_name: 'Scaling & Root Planing (per quadrant)', phase: 1, fee_cents: 28000, duration_minutes: 60 },
      { tooth_number: 2, diagnosis: 'Chronic Periodontitis (Localized)', treatment_code: 'D4260', treatment_name: 'Osseous Surgery (per quadrant)', phase: 2, fee_cents: 85000, duration_minutes: 120 },
      { tooth_number: 15, diagnosis: 'Chronic Periodontitis (Localized)', treatment_code: 'D4260', treatment_name: 'Osseous Surgery (per quadrant)', phase: 2, fee_cents: 85000, duration_minutes: 120 },
    ],
  },
  {
    patient: {
      first_name: 'Robert',
      last_name: 'Martinez',
      phone: '5558765432',
      email: 'rob.martinez@example.com',
      insurance_status: 'insured',
    },
    status: 'scheduled',
    items: [
      { tooth_number: 15, diagnosis: 'Necrotic Pulp', treatment_code: 'D7210', treatment_name: 'Extraction (Surgical)', phase: 1, fee_cents: 35000, duration_minutes: 45 },
      { tooth_number: 15, diagnosis: 'Missing Tooth (Extraction)', treatment_code: 'D6010', treatment_name: 'Implant (Endosteal)', phase: 2, fee_cents: 250000, duration_minutes: 120 },
      { tooth_number: 15, diagnosis: 'Missing Tooth (Extraction)', treatment_code: 'D6056', treatment_name: 'Implant Abutment (Custom)', phase: 2, fee_cents: 80000, duration_minutes: 45 },
      { tooth_number: 15, diagnosis: 'Missing Tooth (Extraction)', treatment_code: 'D6058', treatment_name: 'Implant Crown (Porcelain)', phase: 2, fee_cents: 150000, duration_minutes: 60 },
    ],
  },
  {
    patient: {
      first_name: 'Emily',
      last_name: 'Thompson',
      phone: '5554321000',
      email: 'emily.t@example.com',
      insurance_status: 'insured',
    },
    status: 'draft',
    items: [],
  },
];

// Helper: wrap a promise with a timeout so it doesn't hang forever
function withTimeout<T>(promise: PromiseLike<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`${label} timed out after ${ms / 1000}s — the narrative tables may not exist in your Supabase database. Run the migration SQL first (see supabase/migrations/20260312200000_narrative_tables.sql).`)),
      ms
    );
    Promise.resolve(promise).then(
      (val) => { clearTimeout(timer); resolve(val); },
      (err) => { clearTimeout(timer); reject(err); },
    );
  });
}

const TIMEOUT_MS = 10_000;

export async function seedNarrativeData(): Promise<{ success: boolean; message: string }> {
  try {
    // Get current user and practice
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, message: 'Not authenticated. Please log in first.' };

    const { data: profile } = await supabase
      .from('profiles')
      .select('practice_id')
      .eq('id', user.id)
      .single();

    if (!profile?.practice_id) return { success: false, message: 'No practice found for your account.' };

    const practiceId = profile.practice_id;

    // Verify narrative tables exist before inserting
    const { error: tableCheck } = await withTimeout(
      supabase.from('narrative_patients' as any).select('id').limit(0),
      TIMEOUT_MS,
      'Table check for narrative_patients'
    );

    if (tableCheck) {
      console.error('Table check failed:', tableCheck);
      return {
        success: false,
        message: `narrative_patients table not accessible: ${tableCheck.message}. Run the migration first.`,
      };
    }

    let createdPlans = 0;
    let createdItems = 0;

    for (const seedPlan of SEED_PLANS) {
      // Create patient
      const { data: patient, error: patientError } = await withTimeout(
        supabase
          .from('narrative_patients' as any)
          .insert({
            practice_id: practiceId,
            first_name: seedPlan.patient.first_name,
            last_name: seedPlan.patient.last_name,
            phone: seedPlan.patient.phone,
            email: seedPlan.patient.email,
            insurance_status: seedPlan.patient.insurance_status,
            ...(seedPlan.patient.membership_tier ? { membership_tier: seedPlan.patient.membership_tier } : {}),
          })
          .select()
          .single(),
        TIMEOUT_MS,
        `Insert patient ${seedPlan.patient.first_name}`
      );

      if (patientError) {
        console.error(`Failed to create patient ${seedPlan.patient.first_name}:`, patientError);
        return { success: false, message: `Failed to create patient ${seedPlan.patient.first_name}: ${patientError.message}` };
      }

      if (!patient) {
        return { success: false, message: `Patient ${seedPlan.patient.first_name} insert returned no data — RLS may be blocking SELECT after INSERT.` };
      }

      // Create plan
      const { data: plan, error: planError } = await withTimeout(
        supabase
          .from('narrative_plans' as any)
          .insert({
            patient_id: (patient as any).id,
            practice_id: practiceId,
            provider_name: seedPlan.provider_name || 'Dr. Kansagra',
            status: seedPlan.status,
          })
          .select()
          .single(),
        TIMEOUT_MS,
        `Insert plan for ${seedPlan.patient.first_name}`
      );

      if (planError) {
        console.error(`Failed to create plan for ${seedPlan.patient.first_name}:`, planError);
        return { success: false, message: `Failed to create plan for ${seedPlan.patient.first_name}: ${planError.message}` };
      }

      if (!plan) {
        return { success: false, message: `Plan for ${seedPlan.patient.first_name} insert returned no data — RLS may be blocking SELECT after INSERT.` };
      }

      createdPlans++;

      // Create plan items
      if (seedPlan.items.length > 0) {
        const itemsToInsert = seedPlan.items.map((item) => ({
          plan_id: (plan as any).id,
          ...item,
        }));

        const { error: itemsError } = await withTimeout(
          supabase
            .from('narrative_plan_items' as any)
            .insert(itemsToInsert),
          TIMEOUT_MS,
          `Insert items for ${seedPlan.patient.first_name}`
        );

        if (itemsError) {
          console.error(`Failed to create items for ${seedPlan.patient.first_name}:`, itemsError);
          return { success: false, message: `Failed to create plan items for ${seedPlan.patient.first_name}: ${itemsError.message}` };
        }

        createdItems += seedPlan.items.length;
      }
    }

    return {
      success: true,
      message: `Seeded ${createdPlans} plans with ${createdItems} treatment items across 5 patients.`,
    };
  } catch (err: any) {
    console.error('Seed failed:', err);
    return { success: false, message: `Seed failed: ${err.message}` };
  }
}

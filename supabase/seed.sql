-- Seed data for Narrative treatment plans
-- Run with: supabase db reset (applies migrations + seed)
-- Or manually via Supabase SQL editor
--
-- PREREQUISITE: The narrative tables must exist first!
-- If they don't, run the migration SQL from:
--   supabase/migrations/20260312200000_narrative_tables.sql
-- You can copy-paste that file into the Supabase SQL Editor and execute it.
--
-- NOTE: This seed uses the FIRST practice found in portal_practices.
-- If you need a specific practice, replace the subquery with a UUID.

DO $$
DECLARE
  v_practice_id uuid;
  v_patient1_id uuid;
  v_patient2_id uuid;
  v_patient3_id uuid;
  v_patient4_id uuid;
  v_patient5_id uuid;
  v_plan1_id uuid;
  v_plan2_id uuid;
  v_plan3_id uuid;
  v_plan4_id uuid;
  v_plan5_id uuid;
BEGIN
  -- Get the first practice
  SELECT id INTO v_practice_id FROM portal_practices LIMIT 1;

  IF v_practice_id IS NULL THEN
    RAISE EXCEPTION 'No practice found in portal_practices. Create a practice first.';
  END IF;

  RAISE NOTICE 'Using practice_id: %', v_practice_id;

  -- ============================================================
  -- PATIENT 1: Maria Garcia — Comprehensive case (accepted)
  -- ============================================================
  INSERT INTO narrative_patients (id, practice_id, first_name, last_name, phone, email, insurance_status)
  VALUES (gen_random_uuid(), v_practice_id, 'Maria', 'Garcia', '5551234567', 'maria.garcia@example.com', 'insured')
  RETURNING id INTO v_patient1_id;

  INSERT INTO narrative_plans (id, patient_id, practice_id, provider_name, status, decision_at)
  VALUES (gen_random_uuid(), v_patient1_id, v_practice_id, 'Dr. Kansagra', 'accepted', now() - interval '2 days')
  RETURNING id INTO v_plan1_id;

  INSERT INTO narrative_plan_items (plan_id, tooth_number, diagnosis, treatment_code, treatment_name, phase, fee_cents, duration_minutes, phase_date) VALUES
    (v_plan1_id, 14, 'Dental Caries', 'D2740', 'Porcelain Crown', 1, 135000, 90, CURRENT_DATE + 7),
    (v_plan1_id, 19, 'Dental Caries', 'D2392', 'Composite Filling (2 surfaces, posterior)', 1, 28000, 40, CURRENT_DATE + 7),
    (v_plan1_id, 30, 'Pulpitis (Irreversible)', 'D3330', 'Root Canal (Molar)', 1, 115000, 90, CURRENT_DATE + 14),
    (v_plan1_id, 30, 'Pulpitis (Irreversible)', 'D2750', 'Crown (Porcelain Fused to Metal)', 2, 120000, 90, CURRENT_DATE + 28),
    (v_plan1_id, 3,  'Missing Tooth (Extraction)', 'D6010', 'Implant (Endosteal)', 2, 250000, 120, CURRENT_DATE + 60),
    (v_plan1_id, 3,  'Missing Tooth (Extraction)', 'D6058', 'Implant Crown (Porcelain)', 2, 150000, 60, CURRENT_DATE + 120),
    (v_plan1_id, 8,  'Discolored Tooth', 'D2962', 'Veneer (Porcelain)', 3, 130000, 90, NULL),
    (v_plan1_id, 9,  'Discolored Tooth', 'D2962', 'Veneer (Porcelain)', 3, 130000, 90, NULL);

  -- ============================================================
  -- PATIENT 2: James Wilson — Simple fillings (draft)
  -- ============================================================
  INSERT INTO narrative_patients (id, practice_id, first_name, last_name, phone, email, insurance_status)
  VALUES (gen_random_uuid(), v_practice_id, 'James', 'Wilson', '5559876543', 'james.w@example.com', 'self_pay')
  RETURNING id INTO v_patient2_id;

  INSERT INTO narrative_plans (id, patient_id, practice_id, provider_name, status)
  VALUES (gen_random_uuid(), v_patient2_id, v_practice_id, 'Dr. Kansagra', 'draft')
  RETURNING id INTO v_plan2_id;

  INSERT INTO narrative_plan_items (plan_id, tooth_number, diagnosis, treatment_code, treatment_name, phase, fee_cents, duration_minutes) VALUES
    (v_plan2_id, 18, 'Caries on Pit & Fissure', 'D2391', 'Composite Filling (1 surface, posterior)', 1, 22000, 30),
    (v_plan2_id, 31, 'Caries on Pit & Fissure', 'D2392', 'Composite Filling (2 surfaces, posterior)', 1, 28000, 40),
    (v_plan2_id, 4,  'Dental Caries', 'D2391', 'Composite Filling (1 surface, posterior)', 1, 22000, 30);

  -- ============================================================
  -- PATIENT 3: Sarah Chen — Perio case (presented, thinking)
  -- ============================================================
  INSERT INTO narrative_patients (id, practice_id, first_name, last_name, phone, email, insurance_status, membership_tier)
  VALUES (gen_random_uuid(), v_practice_id, 'Sarah', 'Chen', '5555551234', 'sarah.chen@example.com', 'membership', 'luminate')
  RETURNING id INTO v_patient3_id;

  INSERT INTO narrative_plans (id, patient_id, practice_id, provider_name, status, decision_at)
  VALUES (gen_random_uuid(), v_patient3_id, v_practice_id, 'Dr. Kansagra', 'thinking', now() - interval '1 day')
  RETURNING id INTO v_plan3_id;

  INSERT INTO narrative_plan_items (plan_id, tooth_number, diagnosis, treatment_code, treatment_name, phase, fee_cents, duration_minutes, phase_date) VALUES
    (v_plan3_id, 2,  'Chronic Periodontitis (Localized)', 'D4341', 'Scaling & Root Planing (per quadrant)', 1, 28000, 60, CURRENT_DATE + 3),
    (v_plan3_id, 15, 'Chronic Periodontitis (Localized)', 'D4341', 'Scaling & Root Planing (per quadrant)', 1, 28000, 60, CURRENT_DATE + 3),
    (v_plan3_id, 18, 'Chronic Periodontitis (Localized)', 'D4341', 'Scaling & Root Planing (per quadrant)', 1, 28000, 60, CURRENT_DATE + 10),
    (v_plan3_id, 31, 'Chronic Periodontitis (Localized)', 'D4341', 'Scaling & Root Planing (per quadrant)', 1, 28000, 60, CURRENT_DATE + 10),
    (v_plan3_id, 2,  'Chronic Periodontitis (Localized)', 'D4260', 'Osseous Surgery (per quadrant)', 2, 85000, 120, CURRENT_DATE + 60),
    (v_plan3_id, 15, 'Chronic Periodontitis (Localized)', 'D4260', 'Osseous Surgery (per quadrant)', 2, 85000, 120, CURRENT_DATE + 60);

  -- ============================================================
  -- PATIENT 4: Robert Martinez — Extraction + implant (scheduled)
  -- ============================================================
  INSERT INTO narrative_patients (id, practice_id, first_name, last_name, phone, email, insurance_status)
  VALUES (gen_random_uuid(), v_practice_id, 'Robert', 'Martinez', '5558765432', 'rob.martinez@example.com', 'insured')
  RETURNING id INTO v_patient4_id;

  INSERT INTO narrative_plans (id, patient_id, practice_id, provider_name, status, decision_at)
  VALUES (gen_random_uuid(), v_patient4_id, v_practice_id, 'Dr. Kansagra', 'scheduled', now() - interval '5 days')
  RETURNING id INTO v_plan4_id;

  INSERT INTO narrative_plan_items (plan_id, tooth_number, diagnosis, treatment_code, treatment_name, phase, fee_cents, duration_minutes, phase_date) VALUES
    (v_plan4_id, 15, 'Necrotic Pulp', 'D7210', 'Extraction (Surgical)', 1, 35000, 45, CURRENT_DATE + 2),
    (v_plan4_id, 15, 'Missing Tooth (Extraction)', 'D6010', 'Implant (Endosteal)', 2, 250000, 120, CURRENT_DATE + 90),
    (v_plan4_id, 15, 'Missing Tooth (Extraction)', 'D6056', 'Implant Abutment (Custom)', 2, 80000, 45, CURRENT_DATE + 120),
    (v_plan4_id, 15, 'Missing Tooth (Extraction)', 'D6058', 'Implant Crown (Porcelain)', 2, 150000, 60, CURRENT_DATE + 150);

  -- ============================================================
  -- PATIENT 5: Emily Thompson — Wisdom teeth (draft, no items yet)
  -- ============================================================
  INSERT INTO narrative_patients (id, practice_id, first_name, last_name, phone, email, insurance_status)
  VALUES (gen_random_uuid(), v_practice_id, 'Emily', 'Thompson', '5554321000', 'emily.t@example.com', 'insured')
  RETURNING id INTO v_patient5_id;

  INSERT INTO narrative_plans (id, patient_id, practice_id, provider_name, status)
  VALUES (gen_random_uuid(), v_patient5_id, v_practice_id, 'Dr. Kansagra', 'draft')
  RETURNING id INTO v_plan5_id;

  -- Empty plan — good for testing the builder from scratch

  RAISE NOTICE 'Seed data inserted successfully!';
  RAISE NOTICE 'Patient 1 (Maria Garcia) - Plan: % (accepted, 8 items)', v_plan1_id;
  RAISE NOTICE 'Patient 2 (James Wilson) - Plan: % (draft, 3 items)', v_plan2_id;
  RAISE NOTICE 'Patient 3 (Sarah Chen) - Plan: % (thinking, 6 items)', v_plan3_id;
  RAISE NOTICE 'Patient 4 (Robert Martinez) - Plan: % (scheduled, 4 items)', v_plan4_id;
  RAISE NOTICE 'Patient 5 (Emily Thompson) - Plan: % (draft, empty)', v_plan5_id;
END $$;

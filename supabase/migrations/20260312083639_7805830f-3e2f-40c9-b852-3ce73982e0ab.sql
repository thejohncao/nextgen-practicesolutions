
-- ============================================================
-- NextGen Portal Schema Migration
-- ============================================================

-- 1. Create portal_practices table
CREATE TABLE public.portal_practices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  doctor text NOT NULL,
  location text,
  phone text,
  email text,
  pms text,
  providers text,
  specialties text,
  years_open text,
  plan_tier text,
  baseline_score integer,
  current_score integer,
  status text NOT NULL DEFAULT 'onboarding',
  onboarded_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 2. Add practice_id to profiles (references portal_practices)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS name text,
  ADD COLUMN IF NOT EXISTS practice_id uuid REFERENCES public.portal_practices(id) ON DELETE SET NULL;

-- 3. System toggles
CREATE TABLE public.system_toggles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id uuid NOT NULL REFERENCES public.portal_practices(id) ON DELETE CASCADE,
  pillar text NOT NULL,
  category text NOT NULL,
  item_name text NOT NULL,
  is_active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 4. KPI definitions (master reference)
CREATE TABLE public.kpi_definitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  pillar text NOT NULL,
  unit text NOT NULL DEFAULT '',
  format text NOT NULL DEFAULT 'num',
  invert boolean NOT NULL DEFAULT false,
  benchmark_avg text,
  benchmark_top text,
  benchmark_floor numeric,
  benchmark_ceiling numeric,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 5. KPI snapshots
CREATE TABLE public.kpi_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id uuid NOT NULL REFERENCES public.portal_practices(id) ON DELETE CASCADE,
  kpi_definition_id uuid NOT NULL REFERENCES public.kpi_definitions(id) ON DELETE CASCADE,
  month integer NOT NULL DEFAULT 0,
  value numeric,
  target numeric,
  snapshot_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (practice_id, kpi_definition_id, month)
);

-- 6. Pillar scores
CREATE TABLE public.pillar_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id uuid NOT NULL REFERENCES public.portal_practices(id) ON DELETE CASCADE,
  pillar text NOT NULL,
  month integer NOT NULL DEFAULT 0,
  score integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (practice_id, pillar, month)
);

-- 7. Assessments (pre-sale, public insert)
CREATE TABLE public.portal_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_name text,
  doctor_name text,
  email text,
  phone text,
  location text,
  status text NOT NULL DEFAULT 'in_progress',
  submitted_at timestamptz,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 8. Assessment responses
CREATE TABLE public.assessment_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid NOT NULL REFERENCES public.portal_assessments(id) ON DELETE CASCADE,
  section text NOT NULL,
  question_key text NOT NULL,
  question_text text NOT NULL,
  response_type text NOT NULL DEFAULT 'text',
  response_value text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- Security definer function to check portal roles
-- ============================================================
CREATE OR REPLACE FUNCTION public.portal_has_role(_user_id uuid, _role text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = _user_id AND role = _role
  )
$$;

-- Helper: get user's practice_id without recursion
CREATE OR REPLACE FUNCTION public.portal_user_practice_id(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT practice_id FROM public.profiles WHERE id = _user_id LIMIT 1
$$;

-- ============================================================
-- RLS Policies
-- ============================================================

-- portal_practices
ALTER TABLE public.portal_practices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can do everything on practices"
  ON public.portal_practices FOR ALL TO authenticated
  USING (public.portal_has_role(auth.uid(), 'admin'))
  WITH CHECK (public.portal_has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view own practice"
  ON public.portal_practices FOR SELECT TO authenticated
  USING (id = public.portal_user_practice_id(auth.uid()));

CREATE POLICY "Users can update own practice"
  ON public.portal_practices FOR UPDATE TO authenticated
  USING (id = public.portal_user_practice_id(auth.uid()));

CREATE POLICY "Authenticated users can insert practices"
  ON public.portal_practices FOR INSERT TO authenticated
  WITH CHECK (true);

-- system_toggles
ALTER TABLE public.system_toggles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can do everything on toggles"
  ON public.system_toggles FOR ALL TO authenticated
  USING (public.portal_has_role(auth.uid(), 'admin'))
  WITH CHECK (public.portal_has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view own toggles"
  ON public.system_toggles FOR SELECT TO authenticated
  USING (practice_id = public.portal_user_practice_id(auth.uid()));

CREATE POLICY "Users can manage own toggles"
  ON public.system_toggles FOR INSERT TO authenticated
  WITH CHECK (practice_id = public.portal_user_practice_id(auth.uid()));

CREATE POLICY "Users can update own toggles"
  ON public.system_toggles FOR UPDATE TO authenticated
  USING (practice_id = public.portal_user_practice_id(auth.uid()));

-- kpi_definitions (read-only for everyone)
ALTER TABLE public.kpi_definitions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read kpi definitions"
  ON public.kpi_definitions FOR SELECT TO authenticated, anon
  USING (true);

-- kpi_snapshots
ALTER TABLE public.kpi_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can do everything on snapshots"
  ON public.kpi_snapshots FOR ALL TO authenticated
  USING (public.portal_has_role(auth.uid(), 'admin'))
  WITH CHECK (public.portal_has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view own snapshots"
  ON public.kpi_snapshots FOR SELECT TO authenticated
  USING (practice_id = public.portal_user_practice_id(auth.uid()));

CREATE POLICY "Owners can insert own snapshots"
  ON public.kpi_snapshots FOR INSERT TO authenticated
  WITH CHECK (practice_id = public.portal_user_practice_id(auth.uid()));

CREATE POLICY "Owners can update own snapshots"
  ON public.kpi_snapshots FOR UPDATE TO authenticated
  USING (practice_id = public.portal_user_practice_id(auth.uid()));

-- pillar_scores
ALTER TABLE public.pillar_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can do everything on pillar_scores"
  ON public.pillar_scores FOR ALL TO authenticated
  USING (public.portal_has_role(auth.uid(), 'admin'))
  WITH CHECK (public.portal_has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view own pillar scores"
  ON public.pillar_scores FOR SELECT TO authenticated
  USING (practice_id = public.portal_user_practice_id(auth.uid()));

CREATE POLICY "Users can insert own pillar scores"
  ON public.pillar_scores FOR INSERT TO authenticated
  WITH CHECK (practice_id = public.portal_user_practice_id(auth.uid()));

-- portal_assessments (public insert, admin select)
ALTER TABLE public.portal_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create assessments"
  ON public.portal_assessments FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can view all assessments"
  ON public.portal_assessments FOR SELECT TO authenticated
  USING (public.portal_has_role(auth.uid(), 'admin'));

-- assessment_responses
ALTER TABLE public.assessment_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert assessment responses"
  ON public.assessment_responses FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can view all assessment responses"
  ON public.assessment_responses FOR SELECT TO authenticated
  USING (public.portal_has_role(auth.uid(), 'admin'));

-- ============================================================
-- Updated at triggers
-- ============================================================
CREATE TRIGGER update_portal_practices_updated_at
  BEFORE UPDATE ON public.portal_practices
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_system_toggles_updated_at
  BEFORE UPDATE ON public.system_toggles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- Update handle_new_user trigger to include name
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(
      NULLIF(TRIM(COALESCE(NEW.raw_user_meta_data->>'first_name', '') || ' ' || COALESCE(NEW.raw_user_meta_data->>'last_name', '')), ''),
      NEW.raw_user_meta_data->>'name',
      split_part(NEW.email, '@', 1)
    ),
    COALESCE(NEW.raw_user_meta_data->>'portal_role', 'patient')
  );
  RETURN NEW;
END;
$$;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- Seed KPI Definitions (36 rows)
-- ============================================================
INSERT INTO public.kpi_definitions (key, pillar, unit, format, invert, benchmark_avg, benchmark_top, benchmark_floor, benchmark_ceiling, sort_order) VALUES
-- Growth (11)
('New Patient Leads / Month', 'growth', '', 'num', false, '20-30', '50-80+', 20, 80, 1),
('Lead-to-Appointment Rate', 'growth', '%', 'pct', false, '30-40%', '60-70%', 30, 70, 2),
('New Patients Booked / Month', 'growth', '', 'num', false, '15-25', '40-65', 15, 65, 3),
('New Patient Show Rate', 'growth', '%', 'pct', false, '80-85%', '92-95%', 80, 95, 4),
('New Patient No-Show Rate', 'growth', '%', 'pct', true, '15-20%', '5-8%', 20, 5, 5),
('Cost Per Lead', 'growth', '$', 'cur', true, '$50-$150', '$25-$50', 150, 25, 6),
('Cost Per Acquisition', 'growth', '$', 'cur', true, '$200-$500', '$80-$150', 500, 80, 7),
('Google Reviews (Count)', 'growth', '', 'num', false, '50-100', '300+', 50, 300, 8),
('Google Rating', 'growth', '★', 'dec', false, '4.2-4.5', '4.8-5.0', 4.2, 5.0, 9),
('Website Conversion Rate', 'growth', '%', 'pct', false, '2-4%', '6-10%', 2, 10, 10),
('Referral Rate', 'growth', '%', 'pct', false, '15-25%', '30-40%', 15, 40, 11),
-- Management (17)
('Monthly Collections', 'management', '$', 'bigcur', false, '$150k-$250k', '$400k+', 150000, 400000, 12),
('Monthly Production', 'management', '$', 'bigcur', false, '$160k-$270k', '$425k+', 160000, 425000, 13),
('Collection Rate', 'management', '%', 'dec', false, '95-97%', '98-99%+', 95, 99, 14),
('Avg Production Per Visit', 'management', '$', 'cur', false, '$250-$400', '$500-$700', 250, 700, 15),
('Schedule Utilization', 'management', '%', 'pct', false, '85-90%', '94-97%', 85, 97, 16),
('Hygiene Schedule (Weeks Out)', 'management', 'wks', 'num', false, '2-4', '6-8', 2, 8, 17),
('Doctor Schedule (Weeks Out)', 'management', 'wks', 'num', false, '1-2', '3-5', 1, 5, 18),
('Speed to Lead (Minutes)', 'management', 'min', 'num', true, '240-480', '<5', 480, 5, 19),
('Missed / Unanswered Calls', 'management', '%', 'pct', true, '25-35%', '<10%', 35, 5, 20),
('Same-Day Treatment Acceptance', 'management', '%', 'pct', false, '30-40%', '60-75%', 30, 75, 21),
('Overall Treatment Acceptance', 'management', '%', 'pct', false, '40-55%', '75-85%', 40, 85, 22),
('Unscheduled Treatment', 'management', '$', 'bigcur', true, '$200k-$400k', '<$80k', 400000, 80000, 23),
('Recall Compliance Rate', 'management', '%', 'pct', false, '60-70%', '85-92%', 60, 92, 24),
('Reactivation Rate', 'management', '%', 'pct', false, '5-10%', '20-30%', 5, 30, 25),
('Cancellation Rate', 'management', '%', 'pct', true, '10-15%', '<5%', 15, 3, 26),
('No-Show Rate (All Patients)', 'management', '%', 'pct', true, '8-12%', '<3%', 12, 3, 27),
('Accounts Receivable (Days)', 'management', 'days', 'num', true, '30-45', '<20', 45, 15, 28),
-- Development (8)
('High-Value Case Acceptance', 'development', '%', 'pct', false, '25-35%', '55-70%', 25, 70, 29),
('Avg Case Value Presented', 'development', '$', 'bigcur', false, '$3k-$5k', '$6k-$10k', 3000, 10000, 30),
('Avg Case Value Accepted', 'development', '$', 'bigcur', false, '$1.5k-$2.5k', '$4k-$6k', 1500, 6000, 31),
('FD Booking Conversion', 'development', '%', 'pct', false, '50-60%', '80-90%', 50, 90, 32),
('TC Presentation-to-Close', 'development', '%', 'pct', false, '40-50%', '70-80%', 40, 80, 33),
('Patient Satisfaction Score', 'development', '/10', 'dec', false, '7-8', '9.5+', 7, 10, 34),
('Team Turnover Rate', 'development', '%', 'pct', true, '20-30%', '<10%', 30, 5, 35),
('Training Hours / Month', 'development', 'hrs', 'num', false, '1-2', '4-6', 1, 6, 36);

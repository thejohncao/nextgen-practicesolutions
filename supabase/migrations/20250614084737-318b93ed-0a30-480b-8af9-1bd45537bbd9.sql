
-- 1. Extend profiles for robust user control
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active',           -- active, suspended, trial_expired, etc.
  ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '{}'::jsonb,  -- extensible fine-grained permissions (optional)
  ADD COLUMN IF NOT EXISTS notes TEXT;                             -- admin/internal-only notes

-- 2. Admin logs: record of every admin action
CREATE TABLE IF NOT EXISTS public.admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,                                -- e.g. "add_credits", "update_role"
  target_user_id UUID REFERENCES public.profiles(id),  -- user impacted, if relevant
  details JSONB DEFAULT '{}'::jsonb,                   -- extra info (changes made, reason, etc.)
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Credit logs: record all movements of credits
CREATE TABLE IF NOT EXISTS public.credit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  admin_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,   -- who made the change (nullable for system)
  source TEXT NOT NULL,                                              -- "manual", "referral", "auto_drop", "redemption"
  amount INT NOT NULL,
  balance_after INT,
  notes TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. System-wide settings -- key/value, extensible for many use cases.
CREATE TABLE IF NOT EXISTS public.system_settings (
  key TEXT PRIMARY KEY,
  value JSONB,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Feature flags: toggle modules on/off per tenant
CREATE TABLE IF NOT EXISTS public.feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  feature TEXT NOT NULL,   -- "wallet", "referrals", "onboarding", etc.
  enabled BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (tenant_id, feature)
);

-- 6. Enable RLS on all new tables with secure policies
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;

-- Only admins can select/insert/update/delete admin logs and credit logs
CREATE POLICY "Admins can manage admin_logs"
  ON public.admin_logs
  FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can manage credit_logs"
  ON public.credit_logs
  FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- System settings: admins only
CREATE POLICY "Admins manage system_settings"
  ON public.system_settings
  FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Feature flags: admins and staff can view for their tenant, only admins can write
CREATE POLICY "Admins can manage feature_flags"
  ON public.feature_flags
  FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Staff can view feature_flags for their tenant"
  ON public.feature_flags
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
        AND tenant_id = feature_flags.tenant_id
        AND (role = 'admin' OR role = 'staff')
    )
  );



-- 1. Membership Tiers Table
CREATE TABLE public.membership_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  monthly_price_cents INTEGER NOT NULL CHECK (monthly_price_cents > 0),
  credits_per_month INTEGER NOT NULL CHECK (credits_per_month > 0),
  perks JSONB NOT NULL DEFAULT '[]'::jsonb,
  referral_bonus_multiplier NUMERIC NOT NULL DEFAULT 1,
  upgrade_eligible BOOLEAN NOT NULL DEFAULT TRUE,
  stripe_price_id TEXT, -- maps to Stripe price for billing
  badge_label TEXT,     -- e.g., "Most Popular"
  annual_price_cents INTEGER, -- optional annual plan
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. User Memberships Table
CREATE TABLE public.user_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  tier_id UUID REFERENCES public.membership_tiers(id),
  status TEXT NOT NULL DEFAULT 'active', -- active, cancelled, trialing, etc
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ,
  stripe_subscription_id TEXT,
  is_trial BOOLEAN NOT NULL DEFAULT FALSE,
  trial_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- 3. (Optional) Track tier for credit drops
ALTER TABLE public.credits
  ADD COLUMN IF NOT EXISTS membership_tier_id UUID REFERENCES public.membership_tiers(id);

-- RLS for membership_tiers: only admins can modify, anyone can read active
ALTER TABLE public.membership_tiers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "read active tiers" ON public.membership_tiers
  FOR SELECT
  USING (is_active);

CREATE POLICY "admins can manage tiers" ON public.membership_tiers
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- RLS for user_memberships: users can see/manage their own only
ALTER TABLE public.user_memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can access their memberships" ON public.user_memberships
  FOR ALL
  USING (user_id = auth.uid());

-- RLS for credits (if not already enabled)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE tablename = 'credits'
      AND policyname = 'users can access their credits'
  ) THEN
    ALTER TABLE public.credits ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "users can access their credits"
      ON public.credits FOR ALL
      USING (user_id = auth.uid());
  END IF;
END $$;

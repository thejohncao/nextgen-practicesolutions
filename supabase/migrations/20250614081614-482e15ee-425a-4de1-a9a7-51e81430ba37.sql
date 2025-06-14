
-- Create the referral_settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.referral_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bonus_credits integer NOT NULL DEFAULT 1,
  milestone_count integer DEFAULT NULL,
  milestone_bonus integer DEFAULT NULL,
  link_expiry_days integer DEFAULT NULL,
  max_per_user integer DEFAULT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Add missing columns to referrals for invite tracking & expiration
ALTER TABLE public.referrals
  ADD COLUMN IF NOT EXISTS invitee_email text,
  ADD COLUMN IF NOT EXISTS credited_at timestamp with time zone,
  ADD COLUMN IF NOT EXISTS expires_at timestamp with time zone;

-- Enable Row-Level Security if not enabled, and add all policies for correct access (for both tables)
ALTER TABLE public.referral_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Allow admin to SELECT/UPDATE referral_settings. No user can INSERT/DELETE except backend
CREATE POLICY "Admin can view and update referral settings"
  ON public.referral_settings
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admin can update referral settings"
  ON public.referral_settings
  FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Allow all users to SELECT referrals where they are referrer or referred by email
CREATE POLICY "Users can view their referral activity"
  ON public.referrals
  FOR SELECT
  USING (
    referrer_id = auth.uid()
    OR invitee_email = (SELECT email FROM public.profiles WHERE id = auth.uid())
    OR referred_id = auth.uid()
  );

-- Only backend logic can update/inserts/delete referrals, not direct by users (no insert/update/delete policies for client)


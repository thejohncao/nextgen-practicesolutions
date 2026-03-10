
-- Add tenant_id to bookings
ALTER TABLE public.bookings ADD COLUMN tenant_id UUID REFERENCES public.tenants(id);

-- Add foreign key from bookings.user_id to profiles
ALTER TABLE public.bookings ADD CONSTRAINT bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id);

-- Add foreign key from credits.user_id to profiles
ALTER TABLE public.credits ADD CONSTRAINT credits_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id);

-- User memberships table
CREATE TABLE public.user_memberships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  tier_id UUID NOT NULL REFERENCES public.membership_tiers(id),
  status TEXT NOT NULL DEFAULT 'active',
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.user_memberships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own memberships" ON public.user_memberships FOR SELECT TO authenticated USING (auth.uid()::text = user_id::text);
CREATE POLICY "Admins can manage memberships" ON public.user_memberships FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Referrals table
CREATE TABLE public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID NOT NULL,
  referred_id UUID,
  referral_code TEXT NOT NULL,
  invitee_email TEXT,
  bonus_credits INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own referrals" ON public.referrals FOR SELECT TO authenticated USING (auth.uid()::text = referrer_id::text);
CREATE POLICY "Authenticated can insert referrals" ON public.referrals FOR INSERT TO authenticated WITH CHECK (auth.uid()::text = referrer_id::text);

-- Share events table
CREATE TABLE public.share_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  channel TEXT NOT NULL,
  referral_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.share_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own share events" ON public.share_events FOR SELECT TO authenticated USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own share events" ON public.share_events FOR INSERT TO authenticated WITH CHECK (auth.uid()::text = user_id::text);

-- Rewards table
CREATE TABLE public.rewards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  credit_cost INTEGER NOT NULL DEFAULT 0,
  category TEXT,
  frequency_limit_days INTEGER,
  requires_booking BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  image_url TEXT,
  visibility TEXT DEFAULT 'all',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Rewards are viewable by everyone" ON public.rewards FOR SELECT USING (true);
CREATE POLICY "Admins can manage rewards" ON public.rewards FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Redemptions table
CREATE TABLE public.redemptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reward_id UUID NOT NULL REFERENCES public.rewards(id),
  user_id UUID NOT NULL,
  credits_deducted INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'completed',
  booking_id UUID,
  notes TEXT,
  redeemed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.redemptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own redemptions" ON public.redemptions FOR SELECT TO authenticated USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own redemptions" ON public.redemptions FOR INSERT TO authenticated WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Admins can view all redemptions" ON public.redemptions FOR SELECT TO authenticated USING (true);

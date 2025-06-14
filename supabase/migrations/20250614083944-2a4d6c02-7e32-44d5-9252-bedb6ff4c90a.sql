
-- 1. Create share_events table for social/growth campaign tracking
CREATE TABLE public.share_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  channel TEXT NOT NULL,                -- e.g., sms, instagram, tiktok, email, etc
  referral_code TEXT,                   -- which code/link was shared
  clicks INT NOT NULL DEFAULT 0,        -- number of unique link clicks
  conversions INT NOT NULL DEFAULT 0,   -- signups or actions after click
  rewarded BOOLEAN NOT NULL DEFAULT FALSE,
  metadata JSONB DEFAULT '{}'::jsonb,   -- attribution (e.g., UTM params, campaign_id, friend_email)
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE public.share_events ENABLE ROW LEVEL SECURITY;

-- 3. RLS: Users can only manage their own share events
CREATE POLICY "Users can see their own share events"
  ON public.share_events
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their share events"
  ON public.share_events
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own share events"
  ON public.share_events
  FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their share events"
  ON public.share_events
  FOR DELETE
  USING (user_id = auth.uid());

-- 4. Admins can see/update all (for support/leaderboards/campaign analytics)
CREATE POLICY "Admins can view and update all share events"
  ON public.share_events
  FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- (referrals table is already robust with proper RLS and columns!)


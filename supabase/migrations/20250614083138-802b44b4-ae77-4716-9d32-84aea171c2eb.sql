
-- REWARDS CATALOG TABLE
CREATE TABLE IF NOT EXISTS public.rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  credit_cost integer NOT NULL,
  category text,
  description text,
  frequency_limit_days integer,
  requires_booking boolean NOT NULL DEFAULT false,
  active boolean NOT NULL DEFAULT true,
  visibility text, -- e.g. 'all', 'member', 'vip'
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- REDEMPTION RECORD TABLE
CREATE TABLE IF NOT EXISTS public.redemptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  reward_id uuid NOT NULL REFERENCES public.rewards(id) ON DELETE CASCADE,
  redeemed_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'pending', -- pending/completed/cancelled
  booking_id uuid, -- If a booking is created
  notes text,
  credits_deducted integer NOT NULL,
  location_id uuid, -- For location-specific rewards (future use)
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- USER-REWARD LIMIT TRACKER
CREATE TABLE IF NOT EXISTS public.user_reward_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reward_id uuid NOT NULL REFERENCES public.rewards(id) ON DELETE CASCADE,
  period_start timestamptz NOT NULL,
  period_end timestamptz NOT NULL,
  redemption_count integer NOT NULL DEFAULT 0,
  last_redeemed_at timestamptz,
  UNIQUE (user_id, reward_id, period_start, period_end)
);

-- Row Level Security
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_reward_limits ENABLE ROW LEVEL SECURITY;

-- Policies for rewards: all users can read active rewards
CREATE POLICY "Everyone can view active rewards"
  ON public.rewards
  FOR SELECT
  USING (active = true);

-- Admins can manage rewards
CREATE POLICY "Admin can manage rewards"
  ON public.rewards
  FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Users can view/create their own redemptions
CREATE POLICY "Users can view their own redemptions"
  ON public.redemptions
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create their own redemptions"
  ON public.redemptions
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Admins can update redemptions
CREATE POLICY "Admins can update any redemption"
  ON public.redemptions
  FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Users can view their own reward usage limits
CREATE POLICY "Users can view their reward limit records"
  ON public.user_reward_limits
  FOR SELECT
  USING (user_id = auth.uid());

-- Admins can update/insert into user_reward_limits
CREATE POLICY "Admins can manage reward limit records"
  ON public.user_reward_limits
  FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

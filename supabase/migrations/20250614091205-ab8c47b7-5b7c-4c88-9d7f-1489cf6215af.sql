
-- 1. Core Wallet Table
CREATE TABLE public.wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  tenant_id UUID NOT NULL,
  balance INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_updated TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT fk_wallets_user FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
  CONSTRAINT fk_wallets_tenant FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON DELETE CASCADE,
  UNIQUE (user_id, tenant_id)
);

-- 2. Wallet-Specific Transaction Ledger
CREATE TABLE public.wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID NOT NULL,
  type TEXT NOT NULL, -- 'earn', 'redeem', 'bonus', 'admin_adjust', 'referral'
  amount INTEGER NOT NULL,
  source TEXT,
  notes TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT fk_wallet_transactions_wallet FOREIGN KEY (wallet_id) REFERENCES public.wallets(id) ON DELETE CASCADE
);

-- 3. Bonus/Special Credit Events
CREATE TABLE public.credit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL, -- 'birthday','referral','prepaid','manual','expiration'
  user_id UUID NOT NULL,
  value INTEGER NOT NULL,
  status TEXT DEFAULT 'active', -- 'active','expired','pending'
  expires_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT fk_credit_events_user FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_events ENABLE ROW LEVEL SECURITY;

-- RLS: Users can only access their own wallet
CREATE POLICY "Users can view/edit their wallets" ON public.wallets
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update their wallet" ON public.wallets
  FOR UPDATE USING (user_id = auth.uid());

-- RLS: Only see wallet transactions for their wallet
CREATE POLICY "Users can view their own wallet transactions" ON public.wallet_transactions
  FOR SELECT USING (
    wallet_id IN (
      SELECT id FROM public.wallets WHERE user_id = auth.uid()
    )
  );

-- RLS: Only see their credit events
CREATE POLICY "Users can view their own credit events" ON public.credit_events
  FOR SELECT USING (user_id = auth.uid());

-- Insert policy for system functions (admin/automation)
CREATE POLICY "Public can insert" ON public.wallets
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert" ON public.wallet_transactions
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert" ON public.credit_events
  FOR INSERT WITH CHECK (true);

-- Optional: Admins unrestricted
CREATE POLICY "Admin full access to wallets" ON public.wallets
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
CREATE POLICY "Admin full access to wallet_transactions" ON public.wallet_transactions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
CREATE POLICY "Admin full access to credit_events" ON public.credit_events
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

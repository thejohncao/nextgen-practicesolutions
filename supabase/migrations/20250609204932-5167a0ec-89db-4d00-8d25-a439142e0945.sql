
-- Create enum types for user roles and other categorical data
CREATE TYPE user_role AS ENUM ('patient', 'staff', 'admin');
CREATE TYPE booking_status AS ENUM ('scheduled', 'completed', 'cancelled', 'no_show');
CREATE TYPE transaction_type AS ENUM ('credit_drop', 'redemption', 'referral_bonus', 'manual_adjustment');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'patient',
  tenant_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tenants table for multi-tenant support
CREATE TABLE public.tenants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  domain TEXT,
  logo_url TEXT,
  brand_colors JSONB,
  settings JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Treatments/Services table
CREATE TABLE public.treatments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id),
  name TEXT NOT NULL,
  description TEXT,
  credit_cost INTEGER NOT NULL DEFAULT 0,
  price_cents INTEGER NOT NULL,
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Credits table
CREATE TABLE public.credits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES public.tenants(id),
  amount INTEGER NOT NULL,
  source TEXT NOT NULL, -- 'monthly_drop', 'referral', 'manual', 'signup_bonus'
  expires_at TIMESTAMP WITH TIME ZONE,
  used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Referrals table
CREATE TABLE public.referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  referred_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES public.tenants(id),
  referral_code TEXT UNIQUE NOT NULL,
  bonus_credits INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'expired'
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  treatment_id UUID REFERENCES public.treatments(id),
  tenant_id UUID REFERENCES public.tenants(id),
  staff_id UUID REFERENCES public.profiles(id),
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status booking_status DEFAULT 'scheduled',
  notes TEXT,
  credits_used INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions table for credit tracking
CREATE TABLE public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES public.tenants(id),
  booking_id UUID REFERENCES public.bookings(id),
  type transaction_type NOT NULL,
  amount INTEGER NOT NULL,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Agents log table
CREATE TABLE public.agents_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id),
  agent_name TEXT NOT NULL, -- 'miles', 'giselle', 'devon', 'alma'
  action TEXT NOT NULL,
  user_id UUID REFERENCES public.profiles(id),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily analytics cache table
CREATE TABLE public.analytics_daily (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id),
  date DATE NOT NULL,
  total_bookings INTEGER DEFAULT 0,
  total_credits_used INTEGER DEFAULT 0,
  total_revenue_cents INTEGER DEFAULT 0,
  new_patients INTEGER DEFAULT 0,
  referrals_completed INTEGER DEFAULT 0,
  metrics JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tenant_id, date)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_daily ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Staff can view profiles in their tenant" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = auth.uid() 
      AND p.role IN ('staff', 'admin') 
      AND p.tenant_id = profiles.tenant_id
    )
  );

-- RLS Policies for credits
CREATE POLICY "Users can view own credits" ON public.credits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Staff can view tenant credits" ON public.credits
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = auth.uid() 
      AND p.role IN ('staff', 'admin') 
      AND p.tenant_id = credits.tenant_id
    )
  );

-- RLS Policies for bookings
CREATE POLICY "Users can view own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Staff can view tenant bookings" ON public.bookings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = auth.uid() 
      AND p.role IN ('staff', 'admin') 
      AND p.tenant_id = bookings.tenant_id
    )
  );

-- RLS Policies for transactions
CREATE POLICY "Users can view own transactions" ON public.transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Staff can view tenant transactions" ON public.transactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = auth.uid() 
      AND p.role IN ('staff', 'admin') 
      AND p.tenant_id = transactions.tenant_id
    )
  );

-- Admin-only policies for sensitive tables
CREATE POLICY "Admin can manage tenants" ON public.tenants
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Admin can manage agents_log" ON public.agents_log
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Admin can view analytics" ON public.analytics_daily
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert a default tenant for testing
INSERT INTO public.tenants (name, slug, domain) 
VALUES ('NextGen Practice', 'nextgen', 'nextgenpractice.org');

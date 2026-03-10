
-- Referral settings table
CREATE TABLE public.referral_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bonus_credits INTEGER NOT NULL DEFAULT 1,
  milestone_count INTEGER NOT NULL DEFAULT 5,
  milestone_bonus INTEGER NOT NULL DEFAULT 2,
  link_expiry_days INTEGER NOT NULL DEFAULT 30,
  max_per_user INTEGER NOT NULL DEFAULT 30,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.referral_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Referral settings viewable by authenticated" ON public.referral_settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage referral settings" ON public.referral_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Kit files table
CREATE TABLE public.kit_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  kit_id UUID NOT NULL REFERENCES public.kits(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL DEFAULT 'document',
  description TEXT,
  order_number INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.kit_files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Kit files viewable by authenticated" ON public.kit_files FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage kit files" ON public.kit_files FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Kit SOPs table
CREATE TABLE public.kit_sops (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  kit_id UUID NOT NULL REFERENCES public.kits(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  order_number INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.kit_sops ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Kit SOPs viewable by authenticated" ON public.kit_sops FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage kit SOPs" ON public.kit_sops FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Kit videos table
CREATE TABLE public.kit_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  kit_id UUID NOT NULL REFERENCES public.kits(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  video_url TEXT NOT NULL,
  description TEXT,
  order_number INTEGER NOT NULL DEFAULT 0,
  duration_seconds INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.kit_videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Kit videos viewable by authenticated" ON public.kit_videos FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage kit videos" ON public.kit_videos FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- Add a table to store agent conversation memory (recent prompts)
CREATE TABLE IF NOT EXISTS public.agent_conversation_memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  agent_name TEXT NOT NULL, -- e.g., 'miles', 'giselle', etc
  prompt TEXT NOT NULL,
  response TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index for efficient latest-prompt queries
CREATE INDEX IF NOT EXISTS idx_agent_memory_user_agent ON public.agent_conversation_memory (user_id, agent_name, created_at DESC);

-- Office-specific playbooks/offers, per location (tenant)
CREATE TABLE IF NOT EXISTS public.office_playbooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  key TEXT NOT NULL, -- e.g., "invisalign_offer", "first_visit_script"
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS and set policies
ALTER TABLE public.agent_conversation_memory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can access their memory" ON public.agent_conversation_memory
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert their own prompts" ON public.agent_conversation_memory
  FOR INSERT WITH CHECK (user_id = auth.uid());

ALTER TABLE public.office_playbooks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenant staff can read playbooks" ON public.office_playbooks
  FOR SELECT USING (
    tenant_id IN (
      SELECT tenant_id FROM public.profiles WHERE id = auth.uid()
    )
  );
CREATE POLICY "Admins can insert/update playbooks" ON public.office_playbooks
  FOR INSERT WITH CHECK (
    tenant_id IN (SELECT tenant_id FROM public.profiles WHERE id = auth.uid())
  );


-- Admin notes for assessment practices
CREATE TABLE public.admin_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  admin_id uuid NOT NULL,
  content text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Add unique constraint so one note per user per admin (we'll upsert)
CREATE UNIQUE INDEX admin_notes_user_admin_idx ON public.admin_notes (user_id, admin_id);

ALTER TABLE public.admin_notes ENABLE ROW LEVEL SECURITY;

-- Only admins can manage notes
CREATE POLICY "Admins can manage admin notes" ON public.admin_notes
  FOR ALL TO authenticated
  USING (portal_has_role(auth.uid(), 'admin'))
  WITH CHECK (portal_has_role(auth.uid(), 'admin'));

-- Enable realtime on assessment_progress for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.assessment_progress;

-- Add RLS policy for admins to read all assessment progress
CREATE POLICY "Admins can view all assessment progress" ON public.assessment_progress
  FOR SELECT TO authenticated
  USING (portal_has_role(auth.uid(), 'admin'));

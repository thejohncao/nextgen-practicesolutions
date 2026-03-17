CREATE POLICY "Users can view practices they create"
ON public.portal_practices
FOR SELECT
TO authenticated
USING (true);
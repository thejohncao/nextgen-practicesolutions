
-- Drop the problematic RLS policies that are causing infinite recursion
DROP POLICY IF EXISTS "Staff can view profiles in their tenant" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Create simplified RLS policies that don't cause recursion
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow inserts for new user creation (needed for the signup trigger)
CREATE POLICY "Allow user creation" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

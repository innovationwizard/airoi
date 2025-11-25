-- ============================================
-- Fix RLS Policy for Anonymous Users
-- ============================================
-- This fixes the 401 error when anonymous users try to insert calculations
-- The issue is that .select() after .insert() requires SELECT permission

-- Drop the old SELECT policy if it exists
DROP POLICY IF EXISTS "Authenticated users can view calculations" ON roi_calculations;

-- Allow anonymous users to SELECT (needed for insert return)
CREATE POLICY "Anon can select calculations"
  ON roi_calculations
  FOR SELECT
  TO anon
  USING (true);

-- Authenticated users can SELECT all calculations (for admin dashboard)
CREATE POLICY "Authenticated users can view calculations"
  ON roi_calculations
  FOR SELECT
  TO authenticated
  USING (true);


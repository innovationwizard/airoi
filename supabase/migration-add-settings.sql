-- ============================================
-- Migration: Add settings table for PAYP percentage
-- ============================================

-- Create settings table
CREATE TABLE IF NOT EXISTS app_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can view settings
CREATE POLICY "Authenticated users can view settings"
  ON app_settings
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update settings
CREATE POLICY "Authenticated users can update settings"
  ON app_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can insert settings
CREATE POLICY "Authenticated users can insert settings"
  ON app_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert default PAYP percentage (25%)
INSERT INTO app_settings (key, value)
VALUES ('payp_fee_percentage', '0.25')
ON CONFLICT (key) DO NOTHING;


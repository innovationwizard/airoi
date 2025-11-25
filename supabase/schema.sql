-- ============================================
-- AI ROI Calculator - Supabase Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- ROI Calculations (lead capture + results)
CREATE TABLE roi_calculations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- Lead info
  company_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  industry TEXT,
  sku_count INTEGER,
  
  -- Input data
  inventory_value NUMERIC NOT NULL,
  storage_costs NUMERIC NOT NULL,
  current_turnover NUMERIC NOT NULL,
  annual_purchases NUMERIC NOT NULL,
  lost_sales_stockouts NUMERIC NOT NULL,
  
  -- Calculated results
  savings_storage NUMERIC NOT NULL,
  capital_freed NUMERIC NOT NULL,
  savings_purchases NUMERIC NOT NULL,
  savings_stockouts NUMERIC NOT NULL,
  total_benefit NUMERIC NOT NULL,
  payp_fee NUMERIC NOT NULL,
  net_benefit NUMERIC NOT NULL,
  
  -- Metadata
  ip_address TEXT,
  user_agent TEXT
);

-- Admin users (separate from Supabase Auth for simplicity)
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_calculations_created_at ON roi_calculations(created_at DESC);
CREATE INDEX idx_calculations_email ON roi_calculations(contact_email);
CREATE INDEX idx_calculations_company ON roi_calculations(company_name);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE roi_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public can INSERT calculations (lead capture)
CREATE POLICY "Anyone can submit calculations"
  ON roi_calculations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can SELECT calculations
CREATE POLICY "Authenticated users can view calculations"
  ON roi_calculations
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can view admin_users
CREATE POLICY "Authenticated users can view admin_users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Get dashboard stats
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_leads', COUNT(*),
    'total_projected_value', COALESCE(SUM(total_benefit), 0),
    'total_net_value', COALESCE(SUM(net_benefit), 0),
    'avg_benefit', COALESCE(AVG(total_benefit), 0),
    'leads_this_week', COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days'),
    'leads_this_month', COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '30 days')
  ) INTO result
  FROM roi_calculations;
  
  RETURN result;
END;
$$;

-- ============================================
-- INITIAL ADMIN USER
-- ============================================

-- Insert your admin email (will use Supabase Auth)
INSERT INTO admin_users (email) VALUES ('tu-email@dominio.com');

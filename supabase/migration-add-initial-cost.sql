-- ============================================
-- Migration: Add initial_cost column
-- ============================================
-- This migration adds the initial_cost field to roi_calculations table
-- Run this in your Supabase SQL Editor

-- Add initial_cost column (defaults to 0 for existing records)
ALTER TABLE roi_calculations 
ADD COLUMN IF NOT EXISTS initial_cost NUMERIC DEFAULT 0;

-- Update existing records to have 0 if they're NULL (safety measure)
UPDATE roi_calculations 
SET initial_cost = 0 
WHERE initial_cost IS NULL;


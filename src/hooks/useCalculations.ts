import { useState, useCallback } from 'react';
import {
  insertCalculation,
  getCalculations,
  getDashboardStats,
} from '../lib/supabase';
import type { ROICalculation, DashboardStats } from '../types';

interface CalculationsState {
  calculations: ROICalculation[];
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;
}

export const useCalculations = () => {
  const [state, setState] = useState<CalculationsState>({
    calculations: [],
    stats: null,
    loading: false,
    error: null,
  });

  const saveCalculation = useCallback(
    async (calculation: Record<string, unknown>) => {
      setState((s) => ({ ...s, loading: true, error: null }));

      const { data, error } = await insertCalculation(calculation);

      if (error) {
        setState((s) => ({
          ...s,
          loading: false,
          error: error.message,
        }));
        return { success: false, data: null };
      }

      setState((s) => ({ ...s, loading: false }));
      return { success: true, data };
    },
    []
  );

  const fetchCalculations = useCallback(async (limit = 50) => {
    setState((s) => ({ ...s, loading: true, error: null }));

    const { data, error } = await getCalculations(limit);

    if (error) {
      setState((s) => ({
        ...s,
        loading: false,
        error: error.message,
      }));
      return;
    }

    setState((s) => ({
      ...s,
      calculations: data || [],
      loading: false,
    }));
  }, []);

  const fetchStats = useCallback(async () => {
    const { data, error } = await getDashboardStats();

    if (error) {
      console.error('Error fetching stats:', error);
      return;
    }

    setState((s) => ({ ...s, stats: data }));
  }, []);

  const fetchAll = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    await Promise.all([fetchCalculations(), fetchStats()]);
    setState((s) => ({ ...s, loading: false }));
  }, [fetchCalculations, fetchStats]);

  const clearError = useCallback(() => {
    setState((s) => ({ ...s, error: null }));
  }, []);

  return {
    ...state,
    saveCalculation,
    fetchCalculations,
    fetchStats,
    fetchAll,
    clearError,
  };
};

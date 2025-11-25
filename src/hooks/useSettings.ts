import { useState, useEffect } from 'react';
import { getSetting } from '../lib/supabase';
import { PAYP_FEE_PERCENTAGE } from '../lib/constants';

export const useSettings = () => {
  const [paypFeePercentage, setPaypFeePercentage] = useState<number>(PAYP_FEE_PERCENTAGE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { value, error } = await getSetting('payp_fee_percentage');
      if (!error && value) {
        setPaypFeePercentage(parseFloat(value));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      // Fallback to default
      setPaypFeePercentage(PAYP_FEE_PERCENTAGE);
    } finally {
      setLoading(false);
    }
  };

  return {
    paypFeePercentage,
    loading,
    refresh: loadSettings,
  };
};


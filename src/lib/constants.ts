import type { Benchmark, Industry } from '../types';

// McKinsey benchmarks (November 2024)
export const MCKINSEY_BENCHMARKS: Record<string, Benchmark> = {
  storage: { min: 5, max: 15, label: '5-15%' },
  turnover: { min: 20, max: 35, label: '20-35%' },
  purchases: { min: 5, max: 20, label: '5-20%' },
  stockouts: { min: 15, max: 65, label: '15-65%' },
  inventory: { min: 20, max: 30, label: '20-30%' },
  logistics: { min: 5, max: 20, label: '5-20%' },
  forecast: { min: 20, max: 50, label: '20-50%' },
  service: { min: 65, max: 65, label: '65%' },
};

// Client's committed targets
export const CLIENT_TARGETS = {
  storage: { value: 15, timeline: '6 meses' },
  turnover: { value: 20, timeline: '12 meses' },
  purchases: { value: 20, timeline: '9 meses' },
  stockouts: { value: 15, timeline: '6 meses' },
};

// PAYP fee percentage
export const PAYP_FEE_PERCENTAGE = 0.25;

// Industries
export const INDUSTRIES: Industry[] = [
  { value: 'distribution', label: 'Distribución' },
  { value: 'pharma', label: 'Farmacéutica' },
  { value: 'retail', label: 'Retail' },
  { value: 'manufacturing', label: 'Manufactura' },
  { value: 'fmcg', label: 'FMCG' },
  { value: 'other', label: 'Otro' },
];

// McKinsey source citation
export const MCKINSEY_SOURCE = {
  title: 'Harnessing the power of AI in distribution operations',
  publisher: 'McKinsey & Company',
  date: 'Noviembre 2024',
  url: 'https://www.mckinsey.com/industries/industrials-and-electronics/our-insights/distribution-blog/harnessing-the-power-of-ai-in-distribution-operations',
};

import type { CalculatorFormData, CalculationResults } from '../types';
import { CLIENT_TARGETS, PAYP_FEE_PERCENTAGE } from './constants';

// Format currency (Guatemalan Quetzal)
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: 'GTQ',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Format percentage
export const formatPercent = (value: number): string => `${value}%`;

// Format payback period
export const formatPayback = (initialCost: number, annualNetBenefit: number): { value: string; sublabel: string } => {
  // If no initial cost, payback is immediate
  if (initialCost <= 0) {
    return { value: 'Inmediato', sublabel: 'Sin costo inicial' };
  }

  // If no net benefit, payback cannot be calculated
  if (annualNetBenefit <= 0) {
    return { value: 'N/A', sublabel: 'Sin beneficio neto' };
  }

  // Calculate payback in months
  const paybackMonths = (initialCost / annualNetBenefit) * 12;

  // If less than 12 months, show in months
  if (paybackMonths < 12) {
    const months = Math.ceil(paybackMonths);
    return { 
      value: `${months} ${months === 1 ? 'mes' : 'meses'}`, 
      sublabel: 'Período de recuperación' 
    };
  }

  // If 12 months or more, show in years and months
  const years = Math.floor(paybackMonths / 12);
  const remainingMonths = Math.ceil(paybackMonths % 12);
  
  if (remainingMonths === 0) {
    return { 
      value: `${years} ${years === 1 ? 'año' : 'años'}`, 
      sublabel: 'Período de recuperación' 
    };
  }
  
  return { 
    value: `${years} ${years === 1 ? 'año' : 'años'} ${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`, 
    sublabel: 'Período de recuperación' 
  };
};

// Format date
export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('es-GT', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
};

// Parse numeric input
const parseNum = (value: string): number => parseFloat(value) || 0;

// Calculate ROI results
export const calculateROI = (
  data: CalculatorFormData,
  paypFeePercentage: number = PAYP_FEE_PERCENTAGE
): CalculationResults => {
  const inventoryValue = parseNum(data.inventoryValue);
  const storageCosts = parseNum(data.storageCosts);
  const currentTurnover = parseNum(data.currentTurnover) || 1;
  const annualPurchases = parseNum(data.annualPurchases);
  const lostSales = parseNum(data.lostSales);

  // Goal 1: Storage cost reduction (15%)
  const savingsStorage = storageCosts * (CLIENT_TARGETS.storage.value / 100);

  // Goal 2: Inventory turnover increase (20%)
  const newTurnover = currentTurnover * (1 + CLIENT_TARGETS.turnover.value / 100);
  const capitalFreed = inventoryValue * (1 - currentTurnover / newTurnover);

  // Goal 3: Unnecessary purchases reduction (20%)
  const savingsPurchases = annualPurchases * (CLIENT_TARGETS.purchases.value / 100);

  // Goal 4: Stockout losses reduction (15%)
  const savingsStockouts = lostSales * (CLIENT_TARGETS.stockouts.value / 100);

  // Totals
  const totalBenefit = savingsStorage + capitalFreed + savingsPurchases + savingsStockouts;
  // PAYP fee: percentage of total benefit (configurable via admin panel)
  // Max cap commented out for testing scenarios
  // const paypFee = Math.max(0, Math.min(142000, totalBenefit * paypFeePercentage));
  const paypFee = Math.max(0, totalBenefit * paypFeePercentage);
  const netBenefit = totalBenefit - paypFee;

  return {
    savingsStorage,
    capitalFreed,
    savingsPurchases,
    savingsStockouts,
    totalBenefit,
    paypFee,
    netBenefit,
  };
};

// Validate form data
export const validateForm = (data: CalculatorFormData): string[] => {
  const errors: string[] = [];

  // Lead capture fields validation - commented out for later version
  // if (!data.companyName.trim()) errors.push('Nombre de empresa es requerido');
  // if (!data.email.trim()) errors.push('Email es requerido');
  // if (!data.email.includes('@')) errors.push('Email inválido');
  
  if (!data.inventoryValue) errors.push('Valor de inventario es requerido');
  if (!data.storageCosts) errors.push('Costos de almacenamiento es requerido');
  if (!data.currentTurnover) errors.push('Rotación de inventario es requerida');
  if (!data.annualPurchases) errors.push('Compras anuales es requerido');
  if (!data.lostSales) errors.push('Ventas perdidas es requerido');

  return errors;
};

// Prepare data for Supabase insert
export const prepareCalculationForDB = (
  formData: CalculatorFormData,
  results: CalculationResults
) => ({
  // Lead capture fields - optional for now
  company_name: formData.companyName.trim() || null,
  contact_email: formData.email.trim() ? formData.email.trim().toLowerCase() : null,
  industry: formData.industry || null,
  sku_count: formData.skuCount ? parseInt(formData.skuCount) : null,
  inventory_value: parseNum(formData.inventoryValue),
  storage_costs: parseNum(formData.storageCosts),
  current_turnover: parseNum(formData.currentTurnover),
  annual_purchases: parseNum(formData.annualPurchases),
  lost_sales_stockouts: parseNum(formData.lostSales),
  initial_cost: parseNum(formData.initialCost),
  savings_storage: results.savingsStorage,
  capital_freed: results.capitalFreed,
  savings_purchases: results.savingsPurchases,
  savings_stockouts: results.savingsStockouts,
  total_benefit: results.totalBenefit,
  payp_fee: results.paypFee,
  net_benefit: results.netBenefit,
});

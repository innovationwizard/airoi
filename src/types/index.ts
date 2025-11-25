export interface CalculatorFormData {
  companyName: string;
  email: string;
  industry: string;
  skuCount: string;
  inventoryValue: string;
  storageCosts: string;
  currentTurnover: string;
  annualPurchases: string;
  lostSales: string;
  initialCost: string;
}

export interface CalculationResults {
  savingsStorage: number;
  capitalFreed: number;
  savingsPurchases: number;
  savingsStockouts: number;
  totalBenefit: number;
  paypFee: number;
  netBenefit: number;
}

export interface ROICalculation {
  id: string;
  created_at: string;
  company_name: string;
  contact_email: string;
  industry: string | null;
  sku_count: number | null;
  inventory_value: number;
  storage_costs: number;
  current_turnover: number;
  annual_purchases: number;
  lost_sales_stockouts: number;
  savings_storage: number;
  capital_freed: number;
  savings_purchases: number;
  savings_stockouts: number;
  total_benefit: number;
  payp_fee: number;
  net_benefit: number;
}

export interface DashboardStats {
  total_leads: number;
  total_projected_value: number;
  total_net_value: number;
  avg_benefit: number;
  leads_this_week: number;
  leads_this_month: number;
}

export interface Benchmark {
  min: number;
  max: number;
  label: string;
}

export interface Industry {
  value: string;
  label: string;
}

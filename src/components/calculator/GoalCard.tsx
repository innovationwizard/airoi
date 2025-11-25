import { Package, TrendingUp, ShoppingCart, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';

interface GoalCardProps {
  icon: typeof Package | typeof TrendingUp | typeof ShoppingCart | typeof AlertTriangle;
  title: string;
  target: number;
  savings: number;
  benchmark: string;
  benchmarkMax: number;
  timeline: string;
  color: string;
}

export const GoalCard = ({ 
  icon: Icon, 
  title, 
  target, 
  savings, 
  benchmark, 
  benchmarkMax,
  timeline, 
  color 
}: GoalCardProps) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
    <div className="flex items-start justify-between mb-3">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <span className="text-xs font-medium text-slate-500">{timeline}</span>
    </div>
    <h3 className="font-semibold text-slate-800 mb-1">{title}</h3>
    <p className="text-2xl font-bold text-slate-900 mb-3">{formatCurrency(savings)}</p>
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2">
        <span className="text-slate-500">Tu meta:</span>
        <span className="font-semibold text-blue-600">{target}%</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-slate-500">McKinsey:</span>
        <span className="font-semibold text-emerald-600">{benchmark}</span>
      </div>
    </div>
    <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div 
        className="h-full bg-emerald-500 rounded-full" 
        style={{ width: `${Math.min((target / benchmarkMax) * 100, 100)}%` }} 
      />
    </div>
  </div>
);


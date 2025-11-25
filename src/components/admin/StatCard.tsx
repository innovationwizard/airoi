import { Users, TrendingUp, BarChart3, Calculator } from 'lucide-react';

interface StatCardProps {
  icon: typeof Users | typeof TrendingUp | typeof BarChart3 | typeof Calculator;
  label: string;
  value: string | number;
  color: string;
}

export const StatCard = ({ icon: Icon, label, value, color }: StatCardProps) => (
  <div className="bg-white rounded-xl p-5 border border-slate-200">
    <div className="flex items-center gap-3 mb-2">
      <Icon className={`w-5 h-5 ${color}`} />
      <span className="text-sm text-slate-500">{label}</span>
    </div>
    <p className="text-2xl font-bold text-slate-900">{value}</p>
  </div>
);


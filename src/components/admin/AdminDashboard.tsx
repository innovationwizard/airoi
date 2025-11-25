import { useState } from 'react';
import { BarChart3, LogOut, Loader2, Users, TrendingUp, Calculator, Settings } from 'lucide-react';
import { StatCard } from './StatCard';
import { SettingsPanel } from './SettingsPanel';
import { formatCurrency, formatDate } from '../../lib/utils';
import type { ROICalculation, DashboardStats } from '../../types';

interface AdminDashboardProps {
  calculations: ROICalculation[];
  stats: DashboardStats | null;
  loading: boolean;
  onLogout: () => void;
  onRefresh: () => void;
}

export const AdminDashboard = ({
  calculations,
  stats,
  loading,
  onLogout,
  onRefresh,
}: AdminDashboardProps) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <h1 className="font-semibold text-slate-800">AI ROI Calculator - Admin</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
          >
            <Settings className="w-4 h-4" /> Configuración
          </button>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Actualizar'}
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
          >
            <LogOut className="w-4 h-4" /> Salir
          </button>
        </div>
      </div>
    </header>

    <main className="max-w-6xl mx-auto p-6">
      {showSettings && (
        <div className="mb-6">
          <SettingsPanel onUpdate={onRefresh} />
        </div>
      )}
      
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={Users}
          label="Total Leads"
          value={stats?.total_leads || 0}
          color="text-blue-500"
        />
        <StatCard
          icon={TrendingUp}
          label="Valor Total Proyectado"
          value={formatCurrency(stats?.total_projected_value || 0)}
          color="text-emerald-500"
        />
        <StatCard
          icon={BarChart3}
          label="Promedio por Lead"
          value={formatCurrency(stats?.avg_benefit || 0)}
          color="text-violet-500"
        />
        <StatCard
          icon={Calculator}
          label="Leads este mes"
          value={stats?.leads_this_month || 0}
          color="text-amber-500"
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="font-semibold text-slate-800">Cálculos Recientes</h2>
        </div>
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-slate-400" />
          </div>
        ) : calculations.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No hay cálculos registrados</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 text-left text-xs text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3">Fecha</th>
                  <th className="px-6 py-3">Empresa</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Industria</th>
                  <th className="px-6 py-3 text-right">Beneficio Proyectado</th>
                  <th className="px-6 py-3 text-right">Beneficio Neto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {calculations.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-600">{formatDate(c.created_at)}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{c.company_name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{c.contact_email}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 capitalize">{c.industry || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-900 text-right font-medium">
                      {formatCurrency(c.total_benefit)}
                    </td>
                    <td className="px-6 py-4 text-sm text-emerald-600 text-right font-medium">
                      {formatCurrency(c.net_benefit)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  </div>
  );
};


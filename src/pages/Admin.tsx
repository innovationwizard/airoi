import { AdminLogin } from '../components/admin/AdminLogin';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import type { ROICalculation, DashboardStats } from '../types';

interface AdminProps {
  view: 'admin-login' | 'admin';
  calculations: ROICalculation[];
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;
  onLogin: (email: string, password: string) => void;
  onLogout: () => void;
  onRefresh: () => void;
}

export const Admin = ({
  view,
  calculations,
  stats,
  loading,
  error,
  onLogin,
  onLogout,
  onRefresh,
}: AdminProps) => {
  if (view === 'admin-login') {
    return <AdminLogin onLogin={onLogin} loading={loading} error={error} />;
  }

  return (
    <AdminDashboard
      calculations={calculations}
      stats={stats}
      loading={loading}
      onLogout={onLogout}
      onRefresh={onRefresh}
    />
  );
};


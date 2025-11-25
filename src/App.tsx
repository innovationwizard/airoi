import { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { useCalculations } from './hooks/useCalculations';
import { calculateROI, prepareCalculationForDB } from './lib/utils';
import { Calculator } from './pages/Calculator';
import { Admin } from './pages/Admin';
import type { CalculatorFormData, CalculationResults } from './types';

type View = 'calculator' | 'results' | 'admin-login' | 'admin';

export default function App() {
  const [view, setView] = useState<View>('calculator');
  const [formData, setFormData] = useState<CalculatorFormData | null>(null);
  const [results, setResults] = useState<CalculationResults | null>(null);

  const auth = useAuth();
  const calc = useCalculations();

  // Redirect to admin if already logged in
  useEffect(() => {
    if (auth.isAdmin && view === 'admin-login') {
      setView('admin');
      calc.fetchAll();
    }
  }, [auth.isAdmin, view, calc]);

  const handleCalculate = async (data: CalculatorFormData) => {
    const roi = calculateROI(data);
    const dbData = prepareCalculationForDB(data, roi);

    const { success } = await calc.saveCalculation(dbData);

    if (success) {
      setFormData(data);
      setResults(roi);
      setView('results');
    }
  };

  const handleLogin = async (email: string, password: string) => {
    const success = await auth.login(email, password);
    if (success) {
      setView('admin');
      calc.fetchAll();
    }
  };

  const handleLogout = async () => {
    await auth.logout();
    setView('calculator');
  };

  // Admin views
  if (view === 'admin-login' || view === 'admin') {
    return (
      <Admin
        view={view}
        calculations={calc.calculations}
        stats={calc.stats}
        loading={calc.loading}
        error={auth.error}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onRefresh={calc.fetchAll}
      />
    );
  }

  // Public calculator view
  return (
    <Calculator
      view={view}
      formData={formData}
      results={results}
      loading={calc.loading}
      onCalculate={handleCalculate}
      onReset={() => setView('calculator')}
      onAdminClick={() => setView('admin-login')}
    />
  );
}

import { CalculatorForm } from '../components/calculator/CalculatorForm';
import { ResultsView } from '../components/calculator/ResultsView';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import type { CalculatorFormData, CalculationResults } from '../types';

interface CalculatorProps {
  view: 'calculator' | 'results';
  formData: CalculatorFormData | null;
  results: CalculationResults | null;
  paypFeePercentage: number;
  loading: boolean;
  onCalculate: (data: CalculatorFormData) => void;
  onReset: () => void;
  onAdminClick: () => void;
}

export const Calculator = ({
  view,
  formData,
  results,
  paypFeePercentage,
  loading,
  onCalculate,
  onReset,
  onAdminClick,
}: CalculatorProps) => (
  <div className="min-h-screen bg-slate-100">
    <Header onAdminClick={onAdminClick} />
    <main className="max-w-4xl mx-auto p-6">
      {view === 'calculator' && (
        <>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Calcula el ROI de tus escenarios</h1>
            <p className="text-slate-600">
              Ingresa los datos para proyectar el retorno de inversión
            </p>
          </div>
          <CalculatorForm onCalculate={onCalculate} loading={loading} />
        </>
      )}

      {view === 'results' && formData && results && (
        <ResultsView data={formData} results={results} paypFeePercentage={paypFeePercentage} onReset={onReset} />
      )}
    </main>
    <Footer />
  </div>
);


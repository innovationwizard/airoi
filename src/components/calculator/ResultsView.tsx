import { Package, TrendingUp, ShoppingCart, AlertTriangle, Download } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { GoalCard } from './GoalCard';
import { SummaryCard } from './SummaryCard';
import { formatCurrency, formatPayback } from '../../lib/utils';
import { exportToPDF } from '../../lib/pdfExport';
import { MCKINSEY_BENCHMARKS, CLIENT_TARGETS, MCKINSEY_SOURCE, PAYP_FEE_PERCENTAGE } from '../../lib/constants';
import type { CalculatorFormData, CalculationResults } from '../../types';

interface ResultsViewProps {
  data: CalculatorFormData;
  results: CalculationResults;
  onReset: () => void;
}

export const ResultsView = ({ data, results, onReset }: ResultsViewProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const filename = `ROI-${data.companyName || 'Calculo'}-${new Date().toISOString().split('T')[0]}.pdf`;
      await exportToPDF('results-printable', filename);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Error al exportar PDF. Por favor intenta de nuevo.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div id="results-printable">
      <div className="flex items-center justify-between mb-6 print:mb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{data.companyName || 'Cálculo de ROI'}</h2>
          <p className="text-sm text-slate-500">Proyección de ROI con AI Refill</p>
        </div>
        <div className="flex gap-2 print:hidden">
          <Button 
            variant="secondary" 
            onClick={handleExportPDF}
            disabled={isExporting}
          >
            <Download className="w-4 h-4" /> 
            {isExporting ? 'Exportando...' : 'Exportar PDF'}
          </Button>
          <Button variant="secondary" onClick={onReset}>
            Nuevo Cálculo
          </Button>
        </div>
      </div>

    <div className="grid md:grid-cols-2 gap-4 mb-6">
      <GoalCard
        icon={Package}
        title="Reducción costos almacenamiento"
        target={CLIENT_TARGETS.storage.value}
        savings={results.savingsStorage}
        benchmark={MCKINSEY_BENCHMARKS.storage.label}
        benchmarkMax={MCKINSEY_BENCHMARKS.storage.max}
        timeline={CLIENT_TARGETS.storage.timeline}
        color="bg-violet-500"
      />
      <GoalCard
        icon={TrendingUp}
        title="Aumento rotación inventario"
        target={CLIENT_TARGETS.turnover.value}
        savings={results.capitalFreed}
        benchmark={MCKINSEY_BENCHMARKS.turnover.label}
        benchmarkMax={MCKINSEY_BENCHMARKS.turnover.max}
        timeline={CLIENT_TARGETS.turnover.timeline}
        color="bg-emerald-500"
      />
      <GoalCard
        icon={ShoppingCart}
        title="Reducción compras innecesarias"
        target={CLIENT_TARGETS.purchases.value}
        savings={results.savingsPurchases}
        benchmark={MCKINSEY_BENCHMARKS.purchases.label}
        benchmarkMax={MCKINSEY_BENCHMARKS.purchases.max}
        timeline={CLIENT_TARGETS.purchases.timeline}
        color="bg-amber-500"
      />
      <GoalCard
        icon={AlertTriangle}
        title="Reducción ventas perdidas"
        target={CLIENT_TARGETS.stockouts.value}
        savings={results.savingsStockouts}
        benchmark={MCKINSEY_BENCHMARKS.stockouts.label}
        benchmarkMax={MCKINSEY_BENCHMARKS.stockouts.max}
        timeline={CLIENT_TARGETS.stockouts.timeline}
        color="bg-rose-500"
      />
    </div>

    <div className="grid md:grid-cols-4 gap-4 mb-6">
      <SummaryCard label="Beneficio Total Anual" value={formatCurrency(results.totalBenefit)} />
      <SummaryCard
        label="Fee PAYP (Año 1)"
        value={formatCurrency(results.paypFee)}
        sublabel={`${Math.round(PAYP_FEE_PERCENTAGE * 100)}% de ahorros demostrados`}
      />
      <SummaryCard label="Beneficio Neto Anual" value={formatCurrency(results.netBenefit)} highlight />
      {(() => {
        const initialCost = parseFloat(data.initialCost) || 0;
        const payback = formatPayback(initialCost, results.netBenefit);
        return <SummaryCard label="Payback" value={payback.value} sublabel={payback.sublabel} />;
      })()}
    </div>

    <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
      <h3 className="font-semibold mb-4">Tus metas vs. Benchmarks de McKinsey (2024)</h3>
      <p className="text-slate-300 text-sm mb-4">
        Tus expectativas están dentro del rango factible de los benchmarks de la industria.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-emerald-400">{MCKINSEY_BENCHMARKS.inventory.label}</p>
          <p className="text-xs text-slate-400">Reducción inventario</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-emerald-400">{MCKINSEY_BENCHMARKS.logistics.label}</p>
          <p className="text-xs text-slate-400">Reducción costos logísticos</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-emerald-400">{MCKINSEY_BENCHMARKS.forecast.label}</p>
          <p className="text-xs text-slate-400">Mejora precisión forecast</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-emerald-400">{MCKINSEY_BENCHMARKS.service.label}</p>
          <p className="text-xs text-slate-400">Mejora nivel de servicio</p>
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-4">
        Fuente: {MCKINSEY_SOURCE.publisher}, "{MCKINSEY_SOURCE.title}", {MCKINSEY_SOURCE.date}
      </p>
    </div>
  </div>
  );
};


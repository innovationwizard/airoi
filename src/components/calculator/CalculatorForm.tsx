import { useState } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';
import { Input } from '../ui/Input';
// import { Select } from '../ui/Select'; // Commented out - lead capture fields for later version
import { Button } from '../ui/Button';
import { validateForm } from '../../lib/utils';
// import { INDUSTRIES } from '../../lib/constants'; // Commented out - lead capture fields for later version
import type { CalculatorFormData } from '../../types';

interface CalculatorFormProps {
  onCalculate: (data: CalculatorFormData) => void;
  loading: boolean;
}

export const CalculatorForm = ({ onCalculate, loading }: CalculatorFormProps) => {
  const [form, setForm] = useState<CalculatorFormData>({
    companyName: '',
    email: '',
    industry: 'distribution',
    skuCount: '',
    inventoryValue: '',
    storageCosts: '',
    currentTurnover: '',
    annualPurchases: '',
    lostSales: '',
  });
  const [errors, setErrors] = useState<string[]>([]);

  const update = (key: keyof CalculatorFormData, value: string) => {
    setForm((prev: CalculatorFormData) => ({ ...prev, [key]: value }));
    setErrors([]);
  };

  const handleSubmit = () => {
    const validationErrors = validateForm(form);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    onCalculate(form);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      {/* Lead capture fields - commented out for later version */}
      {/* <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Calculator className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-lg font-semibold text-slate-800">Datos de tu empresa</h2>
      </div> */}

      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-lg mb-6">
          <ul className="list-disc list-inside space-y-1">
            {errors.map((err: string, i: number) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Lead capture fields - commented out for later version */}
      {/* <div className="grid md:grid-cols-2 gap-x-6">
        <Input
          label="Nombre de empresa"
          value={form.companyName}
          onChange={(v) => update('companyName', v)}
          required
          placeholder="Ej: Distribuidora ABC"
        />
        <Input
          label="Email de contacto"
          type="email"
          value={form.email}
          onChange={(v) => update('email', v)}
          required
          placeholder="contacto@empresa.com"
        />
        <Select
          label="Industria"
          value={form.industry}
          onChange={(v) => update('industry', v)}
          options={INDUSTRIES}
        />
        <Input
          label="Número de SKUs"
          type="number"
          value={form.skuCount}
          onChange={(v) => update('skuCount', v)}
          placeholder="Ej: 5000"
        />
      </div>

      <hr className="my-6 border-slate-200" /> */}
      <h3 className="font-semibold text-slate-800 mb-4">Datos financieros</h3>

      <div className="grid md:grid-cols-2 gap-x-6">
        <Input
          label="Valor anual de inventario"
          type="number"
          prefix="Q"
          value={form.inventoryValue}
          onChange={(v) => update('inventoryValue', v)}
          required
          placeholder="10,000,000"
        />
        <Input
          label="Costos anuales de almacenamiento"
          type="number"
          prefix="Q"
          value={form.storageCosts}
          onChange={(v) => update('storageCosts', v)}
          required
          placeholder="2,000,000"
        />
        <Input
          label="Rotación de inventario actual"
          type="number"
          value={form.currentTurnover}
          onChange={(v) => update('currentTurnover', v)}
          required
          placeholder="Ej: 4 (veces/año)"
        />
        <Input
          label="Compras anuales totales"
          type="number"
          prefix="Q"
          value={form.annualPurchases}
          onChange={(v) => update('annualPurchases', v)}
          required
          placeholder="15,000,000"
        />
        <Input
          label="Ventas perdidas por desabasto (anual)"
          type="number"
          prefix="Q"
          value={form.lostSales}
          onChange={(v) => update('lostSales', v)}
          required
          placeholder="1,000,000"
        />
      </div>

      <Button onClick={handleSubmit} disabled={loading} className="w-full mt-6">
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            Calcular ROI <ChevronRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </div>
  );
};


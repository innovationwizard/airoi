import { useState, useEffect } from 'react';
import { Settings, Save, Loader2 } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { getSetting, updateSetting } from '../../lib/supabase';

interface SettingsPanelProps {
  onUpdate?: () => void;
}

export const SettingsPanel = ({ onUpdate }: SettingsPanelProps) => {
  const [paypPercentage, setPaypPercentage] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      const { value, error: fetchError } = await getSetting('payp_fee_percentage');
      if (fetchError) throw fetchError;
      setPaypPercentage(value ? (parseFloat(value) * 100).toString() : '25');
    } catch (err) {
      setError('Error al cargar configuración');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const percentage = parseFloat(paypPercentage);
    
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      setError('El porcentaje debe ser un número entre 0 y 100');
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const decimalValue = (percentage / 100).toString();
      const { error: updateError } = await updateSetting('payp_fee_percentage', decimalValue);
      
      if (updateError) throw updateError;
      
      setSuccess(true);
      if (onUpdate) onUpdate();
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Error al guardar configuración');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-3">
        <Settings className="w-5 h-5 text-slate-600" />
        <h2 className="font-semibold text-slate-800">Configuración</h2>
      </div>
      
      <div className="p-6">
        <div className="max-w-md">
          <Input
            label="Porcentaje Fee PAYP"
            type="number"
            value={paypPercentage}
            onChange={setPaypPercentage}
            placeholder="25"
          />
          <p className="text-xs text-slate-500 mb-4">
            Porcentaje del beneficio total que se cobra como fee PAYP (0-100%)
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm p-3 rounded-lg mb-4">
              Configuración guardada exitosamente
            </div>
          )}

          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Guardando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Guardar Configuración
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};


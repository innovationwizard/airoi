import { Calculator } from 'lucide-react';

interface HeaderProps {
  onAdminClick?: () => void;
}

export const Header = ({ onAdminClick }: HeaderProps) => (
  <header className="bg-white border-b border-slate-200 px-6 py-4 print:hidden">
    <div className="max-w-4xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
          <Calculator className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-slate-800">AI ROI Calculator</span>
      </div>
      {onAdminClick && (
        <button onClick={onAdminClick} className="text-sm text-slate-500 hover:text-slate-700">
          Admin
        </button>
      )}
    </div>
  </header>
);


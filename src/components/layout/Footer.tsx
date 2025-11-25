import { MCKINSEY_SOURCE } from '../../lib/constants';

export const Footer = () => (
  <footer className="text-center py-6 text-xs text-slate-400 print:hidden">
    • Los resultados son proyecciones estimadas • <br />
    Benchmarks basados en {MCKINSEY_SOURCE.publisher} ({MCKINSEY_SOURCE.date}) <br /> 
    <p className="text-xs text-gray-400 text-center mt-6">
      Powered by <span style={{ color: '#dc2626' }}>Artificial Intelligence Developments</span> © 2025
    </p>
  </footer>
);


import { Calculator } from 'lucide-react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export const Logo = ({ size = 24, showText = false, className = '' }: LogoProps) => {
  const iconSize = size;
  const padding = Math.max(4, size / 4);
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div 
        className="bg-blue-600 rounded-lg flex items-center justify-center"
        style={{ padding: `${padding}px` }}
      >
        <Calculator 
          className="text-white" 
          style={{ width: `${iconSize}px`, height: `${iconSize}px` }} 
        />
      </div>
      {showText && (
        <span className="text-xl font-semibold text-slate-800">Calculadora de ROI</span>
      )}
    </div>
  );
};


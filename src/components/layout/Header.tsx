import { Logo } from '../ui/Logo';

interface HeaderProps {
  onAdminClick?: () => void;
}

export const Header = ({ onAdminClick }: HeaderProps) => (
  <header className="bg-white border-b border-slate-200 px-6 py-4 print:hidden">
    <div className="max-w-4xl mx-auto flex items-center justify-between">
      <Logo showText size={24} />
      {onAdminClick && (
        <button onClick={onAdminClick} className="text-sm text-slate-500 hover:text-slate-700">
          Admin
        </button>
      )}
    </div>
  </header>
);


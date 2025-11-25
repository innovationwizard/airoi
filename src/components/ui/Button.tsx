interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({ 
  children, 
  onClick, 
  disabled, 
  variant = 'primary', 
  className = '',
  type = 'button'
}: ButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`font-semibold py-3 px-6 rounded-xl transition flex items-center justify-center gap-2 ${
      variant === 'primary'
        ? 'bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white'
        : 'bg-white border border-slate-300 hover:bg-slate-50 text-slate-700'
    } disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);


interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => (
  <div className={`bg-white rounded-xl border border-slate-200 p-5 shadow-sm ${className}`}>
    {children}
  </div>
);


interface SummaryCardProps {
  label: string;
  value: string;
  sublabel?: string;
  highlight?: boolean;
}

export const SummaryCard = ({ label, value, sublabel, highlight }: SummaryCardProps) => (
  <div className={`p-5 rounded-xl ${highlight ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200'}`}>
    <p className={`text-sm ${highlight ? 'text-blue-100' : 'text-slate-500'}`}>{label}</p>
    <p className={`text-2xl font-bold mt-1 ${highlight ? 'text-white' : 'text-slate-900'}`}>{value}</p>
    {sublabel && (
      <p className={`text-xs mt-1 ${highlight ? 'text-blue-200' : 'text-slate-400'}`}>{sublabel}</p>
    )}
  </div>
);


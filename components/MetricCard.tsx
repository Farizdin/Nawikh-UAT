interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
}

export function MetricCard({ label, value, subtext }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-cyan-200 bg-gradient-to-br from-white/70 to-cyan-100/70 p-4 shadow-soft">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-brand-900">{value}</p>
      {subtext ? <p className="mt-1 text-xs text-slate-500">{subtext}</p> : null}
    </div>
  );
}



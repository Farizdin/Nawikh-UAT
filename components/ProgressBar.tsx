interface ProgressBarProps {
  value: number;
  label: string;
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-600">{label}</span>
        <span className="font-semibold text-brand-700">{safeValue}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded bg-emerald-100">
        <div className="h-full rounded bg-gradient-to-r from-cyan-600 to-emerald-500 transition-all" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}



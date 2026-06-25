type BadgeTone = "blue" | "green" | "amber" | "red" | "slate";

const toneClasses: Record<BadgeTone, string> = {
  blue: "bg-cyan-50 text-cyan-700 ring-cyan-200",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  amber: "bg-amber-50 text-amber-800 ring-amber-200",
  red: "bg-red-50 text-red-700 ring-red-200",
  slate: "bg-slate-100 text-slate-700 ring-slate-200"
};

interface BadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
}

export function Badge({ children, tone = "blue" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded px-2 py-1 text-xs font-semibold ring-1 ${toneClasses[tone]}`}>
      {children}
    </span>
  );
}


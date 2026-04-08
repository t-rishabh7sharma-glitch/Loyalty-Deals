import { cn } from "../../lib/cn";

type MetricCardProps = {
  label: string;
  value: string;
  sublabel?: string;
  className?: string;
};

export function MetricCard({ label, value, sublabel, className }: MetricCardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-black/5 bg-white p-4 shadow-card md:p-5",
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-navy">{label}</p>
      <p className="mt-2 text-2xl font-bold text-black md:text-3xl">{value}</p>
      {sublabel ? <p className="mt-1 text-sm text-muted-navy">{sublabel}</p> : null}
    </div>
  );
}

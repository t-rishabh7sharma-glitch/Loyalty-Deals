import { cn } from "../../lib/cn";

const variants = {
  active: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  inactive: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
  admin: "bg-sky-50 text-sky-800 ring-1 ring-sky-200",
  subAdmin: "bg-indigo-50 text-indigo-800 ring-1 ring-indigo-200",
  live: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200",
  uat: "bg-amber-50 text-amber-900 ring-1 ring-amber-200",
  integration: "bg-sky-50 text-sky-900 ring-1 ring-sky-200",
  scheduled: "bg-sky-50 text-sky-800 ring-1 ring-sky-200",
  expired: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
  stockIn: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200",
  stockOut: "bg-rose-50 text-rose-800 ring-1 ring-rose-200",
  used: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
  locked: "bg-indigo-50 text-indigo-800 ring-1 ring-indigo-200",
} as const;

export type StatusTone = keyof typeof variants;

export function StatusPill({
  label,
  tone,
  className,
}: {
  label: string;
  tone: StatusTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variants[tone] ?? "bg-slate-100 text-slate-700 ring-1 ring-slate-200",
        className,
      )}
    >
      {label}
    </span>
  );
}

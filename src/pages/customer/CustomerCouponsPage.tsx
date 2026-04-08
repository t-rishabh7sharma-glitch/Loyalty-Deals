import { Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import { StatusPill, type StatusTone } from "../../components/ui/StatusPill";
import { mppsDataset } from "../../data/mpps";

function tone(s: string): StatusTone {
  if (s === "Active") return "active";
  if (s === "Used") return "used";
  return "locked";
}

export function CustomerCouponsPage() {
  const { walletCoupons: rows, appBranding } = mppsDataset.customer;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-secondary/10 bg-gradient-to-r from-primary/10 to-transparent px-4 py-5 md:flex md:items-center md:justify-between md:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
            <Ticket className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-black md:text-2xl">My coupons</h1>
            <p className="mt-1 text-sm text-muted-navy">Active coupons — redeem with points or cashback (PRD §3.5).</p>
            <p className="mt-0.5 text-xs text-muted-navy">{appBranding}</p>
          </div>
        </div>
      </div>

      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rows.map((c) => (
          <li key={c.id}>
            <Link
              to={`/app/coupons/${c.id}`}
              className="flex flex-col rounded-2xl border border-black/5 bg-white p-5 shadow-card transition hover:border-primary/20 hover:shadow-md active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-base font-bold text-black">{c.title}</p>
                  <p className="mt-1 text-sm text-muted-navy">{c.merchant}</p>
                  <p className="mt-3 text-xs text-muted-navy">Expires {c.expiresOn}</p>
                  <p className="mt-2 text-xs font-semibold text-secondary">View details →</p>
                </div>
                <StatusPill label={c.state} tone={tone(c.state)} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

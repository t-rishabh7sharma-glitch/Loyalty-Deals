import { Star } from "lucide-react";
import { mppsDataset } from "../../data/mpps";
import { formatInr, formatInt } from "../../lib/format";

/** PRD §3.2–3.3 — points display & configurable Rs/pt (prototype). */
export function CustomerPointsPage() {
  const { loyalty } = mppsDataset.customer;
  const value = loyalty.points * loyalty.pointsToRupee;

  return (
    <div className="space-y-6 pb-8">
      <div className="rounded-2xl bg-gradient-to-br from-secondary to-[#003d99] p-6 text-white shadow-card">
        <div className="flex items-center gap-2 text-primary">
          <Star className="h-6 w-6 fill-amber-300 text-amber-200" />
          <span className="text-sm font-semibold">{loyalty.tier} member</span>
        </div>
        <p className="mt-4 text-4xl font-bold tabular-nums">{formatInt(loyalty.points)}</p>
        <p className="mt-1 text-sm text-white/80">My points</p>
        <p className="mt-4 text-sm text-white/90">
          ≈ {formatInr(value)} redeemable value @ {loyalty.pointsToRupee} Rs per point (admin-configurable in full product).
        </p>
      </div>
      <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-card">
        <h2 className="font-bold text-black">History</h2>
        <p className="mt-2 text-sm text-muted-navy">Prototype: point earn/burn ledger would appear here per PRD detail view.</p>
        <ul className="mt-4 space-y-2 text-sm text-muted-navy">
          <li className="flex justify-between border-b border-black/5 py-2">
            <span>FreshMart purchase</span>
            <span className="font-semibold text-emerald-600">+120</span>
          </li>
          <li className="flex justify-between border-b border-black/5 py-2">
            <span>Coupon redeemed</span>
            <span className="font-semibold text-rose-600">−500</span>
          </li>
          <li className="flex justify-between py-2">
            <span>Booking bonus</span>
            <span className="font-semibold text-emerald-600">+80</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

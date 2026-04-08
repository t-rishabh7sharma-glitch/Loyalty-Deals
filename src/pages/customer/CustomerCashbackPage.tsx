import { ArrowLeft, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { mppsDataset } from "../../data/mpps";
import { formatInr } from "../../lib/format";

/** PRD §3.4 — cashback display & history (prototype). */
export function CustomerCashbackPage() {
  const { cashbackInr } = mppsDataset.customer.loyalty;

  return (
    <div className="space-y-6 pb-8">
      <Link to="/app" className="inline-flex items-center gap-1 text-sm font-semibold text-secondary">
        <ArrowLeft className="h-4 w-4" />
        Home
      </Link>
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
          <Wallet className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-black">My cashback</h1>
          <p className="text-sm text-muted-navy">Redeem at checkout on eligible deals.</p>
        </div>
      </div>
      <div className="rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-card">
        <p className="text-sm text-muted-navy">Available balance</p>
        <p className="mt-1 text-3xl font-bold text-emerald-700">{formatInr(cashbackInr)}</p>
      </div>
      <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-card">
        <h2 className="font-bold text-black">History</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-navy">
          <li className="flex justify-between border-b border-black/5 py-2">
            <span>FreshMart order</span>
            <span className="font-semibold text-emerald-600">+₹120</span>
          </li>
          <li className="flex justify-between py-2">
            <span>Redeemed on TechZone</span>
            <span className="font-semibold text-rose-600">−₹50</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

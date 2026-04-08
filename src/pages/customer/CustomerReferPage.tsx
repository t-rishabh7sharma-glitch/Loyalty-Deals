import { ArrowLeft, Gift, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

export function CustomerReferPage() {
  return (
    <div className="space-y-6 pb-8">
      <Link to="/app" className="inline-flex items-center gap-1 text-sm font-semibold text-secondary">
        <ArrowLeft className="h-4 w-4" />
        Home
      </Link>
      <div className="rounded-2xl border border-black/5 bg-gradient-to-br from-[#0066CC] to-secondary p-6 text-white shadow-card">
        <Gift className="h-10 w-10 text-amber-300" />
        <h1 className="mt-4 text-2xl font-bold">Refer &amp; earn</h1>
        <p className="mt-2 text-sm text-white/90">Get ₹200 for every friend who joins and makes their first purchase (prototype copy).</p>
      </div>
      <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-card">
        <p className="text-sm text-muted-navy">Your referral link would appear here in production.</p>
        <code className="mt-3 block rounded-xl bg-surface px-3 py-2.5 text-xs font-mono text-secondary">rewardz.app/r/ANANYA-DEMO</code>
        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-secondary py-3 text-sm font-semibold text-white"
        >
          <Share2 className="h-4 w-4" />
          Share invite
        </button>
      </div>
    </div>
  );
}

import { MousePointerClick, ShoppingCart, Tag, Wallet } from "lucide-react";
import { RewardzShell } from "../../components/bo/RewardzShell";
import { mppsDataset } from "../../data/mpps";
import { formatInr, formatInt, formatPct } from "../../lib/formatLakh";

export function MerchantHomePage() {
  const m = mppsDataset.merchant;
  const d = m.dashboard;

  return (
    <RewardzShell role="merchant">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-black">Storefront overview</h1>
          <p className="mt-1 text-sm text-muted-navy">
            {m.merchantName} · <span className="font-mono text-xs">{m.merchantId}</span>
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Kpi icon={Tag} label="Active deals" value={formatInt(d.activeDeals)} sub="Matches Admin row for FreshMart" />
          <Kpi icon={MousePointerClick} label="Total clicks" value={formatInt(d.totalClicks)} />
          <Kpi icon={ShoppingCart} label="Checkouts" value={formatInt(d.totalCheckouts)} />
          <Kpi icon={Wallet} label="Revenue (deals)" value={formatInr(d.revenueFromDealsInr)} />
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-black/5">
          <h2 className="text-sm font-bold text-black">Deal performance</h2>
          <p className="mt-1 text-xs text-muted-navy">Row totals roll up to the KPI cards above.</p>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-[640px] w-full text-sm">
              <thead className="text-left text-xs font-semibold uppercase tracking-wide text-muted-navy">
                <tr>
                  <th className="pb-2">Deal</th>
                  <th className="pb-2 text-right">Clicks</th>
                  <th className="pb-2 text-right">Checkouts</th>
                  <th className="pb-2 text-right">CVR</th>
                  <th className="pb-2 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {m.deals.map((row) => (
                  <tr key={row.id} className="border-t border-black/5">
                    <td className="py-2 font-medium text-black">{row.title}</td>
                    <td className="py-2 text-right">{formatInt(row.clicks)}</td>
                    <td className="py-2 text-right">{formatInt(row.checkouts)}</td>
                    <td className="py-2 text-right font-semibold text-bo-sidebar">{formatPct(row.conversionRate, 0)}</td>
                    <td className="py-2 text-right font-semibold">{formatInr(row.revenueInr)}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-black/10 font-semibold">
                  <td className="py-2">Total</td>
                  <td className="py-2 text-right">{formatInt(d.totalClicks)}</td>
                  <td className="py-2 text-right">{formatInt(d.totalCheckouts)}</td>
                  <td className="py-2 text-right">{formatPct(d.totalCheckouts / d.totalClicks, 0)}</td>
                  <td className="py-2 text-right">{formatInr(d.revenueFromDealsInr)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-dashed border-bo-sidebar/30 bg-bo-sidebar/5 p-5 text-sm text-muted-navy">
          Engagement: bounce rate <strong>{formatPct(d.bounceRate, 0)}</strong> (views without checkout).
        </div>
      </div>
    </RewardzShell>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Tag;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-navy">{label}</p>
        <Icon className="h-5 w-5 text-bo-sidebar" />
      </div>
      <p className="mt-3 text-2xl font-bold text-black">{value}</p>
      {sub ? <p className="mt-1 text-[11px] text-muted-navy">{sub}</p> : null}
    </div>
  );
}

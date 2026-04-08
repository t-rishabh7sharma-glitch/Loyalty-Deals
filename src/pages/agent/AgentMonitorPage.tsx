import { RewardzShell } from "../../components/bo/RewardzShell";
import { mppsDataset } from "../../data/mpps";
import { formatInt } from "../../lib/formatLakh";

export function AgentMonitorPage() {
  const { campaignMonitor, campaignTotals } = mppsDataset.agent;

  return (
    <RewardzShell role="agent">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-black">Deal promotion monitor</h1>
          <p className="mt-1 text-sm text-muted-navy">
            Campaign metrics mirror Admin deal performance (clicks & checkouts per deal ID).
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <TotalCard label="Tracked deals" value={campaignTotals.activeDeals} />
          <TotalCard label="Total clicks" value={campaignTotals.totalClicks} />
          <TotalCard label="Total checkouts" value={campaignTotals.totalCheckouts} />
          <TotalCard label="Attributed revenue (₹)" value={campaignTotals.totalRevenueInr} money />
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/5">
          <table className="w-full text-sm">
            <thead className="bg-surface text-left text-xs font-semibold uppercase tracking-wide text-muted-navy">
              <tr>
                <th className="px-4 py-3">Campaign</th>
                <th className="px-4 py-3">Deal ID</th>
                <th className="px-4 py-3 text-right">Active deals</th>
                <th className="px-4 py-3 text-right">Clicks</th>
                <th className="px-4 py-3 text-right">Checkouts</th>
                <th className="px-4 py-3 text-right">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {campaignMonitor.map((c) => (
                <tr key={c.dealId} className="border-t border-black/5">
                  <td className="px-4 py-3 font-medium text-black">{c.campaign}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-navy">{c.dealId}</td>
                  <td className="px-4 py-3 text-right">{formatInt(c.activeDeals)}</td>
                  <td className="px-4 py-3 text-right">{formatInt(c.clicks)}</td>
                  <td className="px-4 py-3 text-right">{formatInt(c.checkouts)}</td>
                  <td className="px-4 py-3 text-right font-semibold">₹{c.revenueInr.toLocaleString("en-IN")}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-black/10 font-semibold">
                <td className="px-4 py-3" colSpan={2}>
                  Total
                </td>
                <td className="px-4 py-3 text-right">{formatInt(campaignTotals.activeDeals)}</td>
                <td className="px-4 py-3 text-right">{formatInt(campaignTotals.totalClicks)}</td>
                <td className="px-4 py-3 text-right">{formatInt(campaignTotals.totalCheckouts)}</td>
                <td className="px-4 py-3 text-right">₹{campaignTotals.totalRevenueInr.toLocaleString("en-IN")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </RewardzShell>
  );
}

function TotalCard({ label, value, money }: { label: string; value: number; money?: boolean }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-black/5">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-navy">{label}</p>
      <p className="mt-2 text-2xl font-bold text-black">
        {money ? `₹${value.toLocaleString("en-IN")}` : formatInt(value)}
      </p>
    </div>
  );
}

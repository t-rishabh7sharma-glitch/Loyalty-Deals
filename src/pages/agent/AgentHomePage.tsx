import { Building2, IndianRupee, Gem, Users } from "lucide-react";
import { RewardzShell } from "../../components/bo/RewardzShell";
import { mppsDataset } from "../../data/mpps";
import { formatInt, formatLakhShort } from "../../lib/formatLakh";

export function AgentHomePage() {
  const { dashboard, campaignTotals } = mppsDataset.agent;
  const admin = mppsDataset.admin.dashboardHome;

  return (
    <RewardzShell role="agent">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-black">Agent command center</h1>
          <p className="mt-1 text-sm text-muted-navy">
            MPPS field view · Live deals & MTD revenue are locked to Admin dashboard totals.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Kpi icon={Users} label="Total merchants" value={formatInt(dashboard.totalMerchants)} />
          <Kpi icon={Building2} label="Active merchants" value={formatInt(dashboard.activeMerchants)} />
          <Kpi icon={Gem} label="Live deals (portfolio)" value={formatInt(dashboard.totalLiveDeals)} sub={`Admin active deals: ${formatInt(admin.activeDeals)}`} />
          <Kpi icon={IndianRupee} label="MTD revenue" value={formatLakhShort(dashboard.mtdRevenueInr)} sub="Matches Admin MTD" />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-black/5">
            <h2 className="text-sm font-bold text-black">Key campaign throughput</h2>
            <p className="mt-1 text-xs text-muted-navy">Summed across monitor table rows.</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-muted-navy">Tracked deals</span>
                <span className="font-semibold">{formatInt(campaignTotals.activeDeals)}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-navy">Clicks</span>
                <span className="font-semibold">{formatInt(campaignTotals.totalClicks)}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-navy">Checkouts</span>
                <span className="font-semibold">{formatInt(campaignTotals.totalCheckouts)}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-navy">Attributed revenue</span>
                <span className="font-semibold">₹{campaignTotals.totalRevenueInr.toLocaleString("en-IN")}</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-black/5">
            <h2 className="text-sm font-bold text-black">Onboarding</h2>
            <p className="mt-1 text-xs text-muted-navy">YTD merchants onboarded (prototype).</p>
            <p className="mt-6 text-4xl font-bold text-bo-sidebar">{formatInt(dashboard.merchantsOnboardedYtd)}</p>
            <p className="mt-2 text-xs text-muted-navy">Matches the four partners in your pipeline roster.</p>
          </div>
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
  icon: typeof Users;
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

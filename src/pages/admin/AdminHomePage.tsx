import { BOLayout } from "../../components/bo/BOLayout";
import { MetricCard } from "../../components/ui/MetricCard";
import { adminKpis } from "../../data/loaders";
import { formatInr, formatInt, formatPct } from "../../lib/format";

export function AdminHomePage() {
  const d = adminKpis;
  const stages = d.partnerPipelineAndGrowth.pipelineStages;
  const stageTotal = stages.pipeline + stages.integration + stages.uat + stages.live;
  const partners = [...d.detailedAnalytics.partnerPerformance].sort(
    (a, b) => b.totalSalesInr - a.totalSalesInr,
  );

  return (
    <BOLayout role="admin" title="Admin Dashboard" badge="Platform KPIs">
      <div className="mx-auto max-w-6xl space-y-8">
        <section>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-wide text-muted-navy">Dashboard overview</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Total active users" value={formatInt(d.dashboardOverview.totalActiveUsers)} />
            <MetricCard label="Active deals" value={formatInt(d.dashboardOverview.activeDeals)} />
            <MetricCard
              label="Top partner revenue (rank 1)"
              value={formatInr(d.dashboardOverview.topPerformingPartners[0].revenueInr)}
              sublabel={d.dashboardOverview.topPerformingPartners[0].name}
            />
            <MetricCard
              label="Top category (deals)"
              value={d.dashboardOverview.topCategories[0].name}
              sublabel={`${d.dashboardOverview.topCategories[0].dealCount} deals · ${formatPct(d.dashboardOverview.topCategories[0].redemptionRate, 1)} redemption`}
            />
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-card border border-black/5 bg-white p-4 shadow-card md:p-5">
            <h3 className="text-sm font-semibold text-black">Top-performing partners (by revenue)</h3>
            <table className="mt-4 w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-muted-navy">
                  <th className="pb-2">#</th>
                  <th className="pb-2">Partner</th>
                  <th className="pb-2 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((p, i) => (
                  <tr key={p.partnerId} className="border-t border-black/5">
                    <td className="py-3 font-medium text-primary">{i + 1}</td>
                    <td className="py-3 text-black">{p.name}</td>
                    <td className="py-3 text-right font-semibold text-black">{formatInr(p.totalSalesInr)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-card border border-black/5 bg-white p-4 shadow-card md:p-5">
            <h3 className="text-sm font-semibold text-black">Top categories</h3>
            <table className="mt-4 w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-muted-navy">
                  <th className="pb-2">Category</th>
                  <th className="pb-2 text-right">Deals</th>
                  <th className="pb-2 text-right">Redemption</th>
                </tr>
              </thead>
              <tbody>
                {d.dashboardOverview.topCategories.map((c) => (
                  <tr key={c.categoryId} className="border-t border-black/5">
                    <td className="py-3 text-black">{c.name}</td>
                    <td className="py-3 text-right">{formatInt(c.dealCount)}</td>
                    <td className="py-3 text-right font-semibold text-primary">{formatPct(c.redemptionRate, 1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-wide text-muted-navy">Partner pipeline &amp; growth</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard label="Pipeline" value={formatInt(stages.pipeline)} />
            <MetricCard label="Integration" value={formatInt(stages.integration)} />
            <MetricCard label="UAT" value={formatInt(stages.uat)} />
            <MetricCard label="Live" value={formatInt(stages.live)} />
          </div>
          <p className="mt-2 text-xs text-muted-navy">
            Stage counts sum to <strong>{formatInt(stageTotal)}</strong> merchants.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <MetricCard
              label="New coupons"
              value={formatInt(d.partnerPipelineAndGrowth.newCoupons)}
              sublabel="Reporting period (mock)"
            />
            <MetricCard label="New merchants" value={formatInt(d.partnerPipelineAndGrowth.newMerchants)} />
            <MetricCard label="New products" value={formatInt(d.partnerPipelineAndGrowth.newProducts)} />
          </div>
        </section>
      </div>
    </BOLayout>
  );
}

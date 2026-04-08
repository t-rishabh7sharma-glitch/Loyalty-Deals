import raw from "./dataset.json";

export type MppsDataset = typeof raw;

export const mppsDataset = raw as MppsDataset;

function approxEqual(a: number, b: number, eps = 1e-6) {
  return Math.abs(a - b) <= eps;
}

function assertMppsDatasetInternal(data: MppsDataset): void {
  const { admin, merchant, agent, customer } = data;

  const sumMerchantLiveDeals = admin.merchants.reduce((s, m) => s + m.liveDeals, 0);
  if (sumMerchantLiveDeals !== admin.dashboardHome.activeDeals) {
    throw new Error(`MPPS: merchant liveDeals sum ${sumMerchantLiveDeals} !== dashboard activeDeals ${admin.dashboardHome.activeDeals}`);
  }

  const pipe = admin.dashboardHome.pipelineBars;
  const pipeSum = pipe.liveMerchant + pipe.uat + pipe.integration;
  if (pipeSum !== admin.merchants.length) {
    throw new Error(`MPPS: pipeline bar sum ${pipeSum} !== merchants listed ${admin.merchants.length}`);
  }

  const liveCount = admin.merchants.filter((m) => m.pipeline === "Live Merchant").length;
  const uatCount = admin.merchants.filter((m) => m.pipeline === "UAT").length;
  const intCount = admin.merchants.filter((m) => m.pipeline === "Integration").length;
  if (liveCount !== pipe.liveMerchant || uatCount !== pipe.uat || intCount !== pipe.integration) {
    throw new Error("MPPS: pipeline stage counts mismatch between merchants[] and pipelineBars");
  }

  const catSum = admin.categories.reduce((s, c) => s + c.productCount, 0);
  if (catSum !== admin.products.totalCatalogProducts) {
    throw new Error(`MPPS: category product counts ${catSum} !== totalCatalogProducts`);
  }

  const statusSum =
    admin.dealStatusCounts.active + admin.dealStatusCounts.scheduled + admin.dealStatusCounts.expired;
  if (statusSum !== admin.deals.length) {
    throw new Error("MPPS: deal status counts must sum to deals list length");
  }

  for (const row of admin.dashboardHome.dealPerformance) {
    const cvr = row.clicks === 0 ? 0 : row.orders / row.clicks;
    if (!approxEqual(cvr, row.cvr, 0.002)) {
      throw new Error(`MPPS: dealPerformance CVR mismatch for ${row.dealId}`);
    }
  }

  for (const row of admin.dashboardHome.dealPerformance) {
    const deal = admin.deals.find((d) => d.id === row.dealId);
    if (!deal) throw new Error(`MPPS: dealPerformance references missing deal ${row.dealId}`);
    if (deal.clicks !== row.clicks) {
      throw new Error(`MPPS: deal ${row.dealId} clicks mismatch dashboard vs deals list`);
    }
  }

  const md = merchant.deals;
  const sumC = md.reduce((s, r) => s + r.clicks, 0);
  const sumCo = md.reduce((s, r) => s + r.checkouts, 0);
  const sumR = md.reduce((s, r) => s + r.revenueInr, 0);
  if (sumC !== merchant.dashboard.totalClicks) throw new Error("MPPS: merchant deal clicks rollup");
  if (sumCo !== merchant.dashboard.totalCheckouts) throw new Error("MPPS: merchant deal checkouts rollup");
  if (sumR !== merchant.dashboard.revenueFromDealsInr) throw new Error("MPPS: merchant deal revenue rollup");
  for (const r of md) {
    const cvr = r.clicks === 0 ? 0 : r.checkouts / r.clicks;
    if (!approxEqual(cvr, r.conversionRate, 0.002)) throw new Error(`MPPS: merchant deal ${r.id} conversion mismatch`);
  }
  if (merchant.merchantId !== "M001") throw new Error("MPPS: merchant console expects M001");
  const fm = admin.merchants.find((m) => m.id === "M001");
  if (!fm || fm.liveDeals !== merchant.dashboard.activeDeals) {
    throw new Error("MPPS: FreshMart live deals mismatch admin vs merchant dashboard");
  }

  const cm = agent.campaignMonitor;
  const t = agent.campaignTotals;
  if (cm.reduce((s, r) => s + r.activeDeals, 0) !== t.activeDeals) throw new Error("MPPS: agent campaign activeDeals sum");
  if (cm.reduce((s, r) => s + r.clicks, 0) !== t.totalClicks) throw new Error("MPPS: agent campaign clicks sum");
  if (cm.reduce((s, r) => s + r.checkouts, 0) !== t.totalCheckouts) throw new Error("MPPS: agent checkouts sum");
  if (cm.reduce((s, r) => s + r.revenueInr, 0) !== t.totalRevenueInr) throw new Error("MPPS: agent revenue sum");

  if (agent.dashboard.totalLiveDeals !== admin.dashboardHome.activeDeals) {
    throw new Error("MPPS: agent live deals must match admin active deals");
  }
  if (agent.dashboard.mtdRevenueInr !== admin.dashboardHome.revenueMtdInr) {
    throw new Error("MPPS: agent MTD revenue must match admin MTD revenue");
  }
  if (agent.pipelineMerchants.length !== agent.dashboard.totalMerchants) {
    throw new Error("MPPS: agent pipeline list vs total merchants");
  }

  for (const pm of agent.pipelineMerchants) {
    const src = admin.merchants.find((m) => m.id === pm.merchantId);
    if (!src || src.name !== pm.name || src.pipeline !== pm.stage) {
      throw new Error(`MPPS: agent pipeline row mismatch for ${pm.merchantId}`);
    }
  }

  for (const c of agent.campaignMonitor) {
    const perf = admin.dashboardHome.dealPerformance.find((p) => p.dealId === c.dealId);
    const deal = admin.deals.find((d) => d.id === c.dealId);
    if (!perf || !deal) throw new Error(`MPPS: agent campaign ${c.dealId} must exist in admin`);
    if (perf.clicks !== c.clicks || perf.orders !== c.checkouts) {
      throw new Error(`MPPS: agent campaign metrics must match admin deal performance`);
    }
  }

  const pts = customer.loyalty.points * customer.loyalty.pointsToRupee;
  if (!approxEqual(pts, 4210, 0.01)) {
    throw new Error("MPPS: customer points rupee value should be 8420 * 0.5 = 4210");
  }
}

export function validateMppsDataset(): void {
  assertMppsDatasetInternal(mppsDataset);
}

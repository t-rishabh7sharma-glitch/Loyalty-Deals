import type { AdminKpis, AgentKpis, MerchantKpis } from "../types/kpis";
import platformKpis from "./platformKpis.json";
import merchantKpis from "./merchantKpis.json";
import agentKpis from "./agentKpis.json";
import customerKpis from "./customerKpis.json";

export const adminKpis: AdminKpis = platformKpis as AdminKpis;
export const merchantKpisData: MerchantKpis = merchantKpis as MerchantKpis;
export const agentKpisData: AgentKpis = agentKpis as AgentKpis;
export { customerKpis };

/** Validates mock arithmetic for Admin deal analytics (redemption rate). */
export function assertAdminDealAnalyticsConsistency(data: AdminKpis): void {
  const { totalRedemptions, totalIssued } = data.detailedAnalytics.dealAnalytics;
  const expectedRate = totalRedemptions / totalIssued;
  const diff = Math.abs(expectedRate - data.detailedAnalytics.dealAnalytics.overallRedemptionRate);
  if (diff > 1e-9) {
    throw new Error(`Admin dealAnalytics: redemption rate mismatch (${expectedRate} vs ${data.detailedAnalytics.dealAnalytics.overallRedemptionRate})`);
  }
  const partnerSum = data.detailedAnalytics.partnerPerformance.reduce((s, r) => s + r.totalSalesInr, 0);
  if (partnerSum !== data.detailedAnalytics.dealAnalytics.revenueFromDealsInr) {
    throw new Error(`Admin: partner sales sum (${partnerSum}) must equal revenueFromDealsInr (${data.detailedAnalytics.dealAnalytics.revenueFromDealsInr})`);
  }
}

export function assertMerchantDealRollups(data: MerchantKpis): void {
  const rows = data.dealSpecificAnalysis;
  const sumClicks = rows.reduce((s, r) => s + r.clicks, 0);
  const sumCo = rows.reduce((s, r) => s + r.checkouts, 0);
  const sumRev = rows.reduce((s, r) => s + r.revenueInr, 0);
  if (sumClicks !== data.performanceOverview.totalClicksOnDeals) {
    throw new Error(`Merchant: deal clicks ${sumClicks} !== overview ${data.performanceOverview.totalClicksOnDeals}`);
  }
  if (sumCo !== data.performanceOverview.totalCheckouts) {
    throw new Error(`Merchant: deal checkouts ${sumCo} !== overview ${data.performanceOverview.totalCheckouts}`);
  }
  if (sumRev !== data.performanceOverview.totalRevenueFromDealsInr) {
    throw new Error(`Merchant: deal revenue ${sumRev} !== overview ${data.performanceOverview.totalRevenueFromDealsInr}`);
  }
  if (data.userEngagement.userClicksOnDeals !== data.performanceOverview.totalClicksOnDeals) {
    throw new Error("Merchant: engagement clicks must match performance overview clicks");
  }
  if (data.userEngagement.userCheckouts !== data.performanceOverview.totalCheckouts) {
    throw new Error("Merchant: engagement checkouts must match performance overview checkouts");
  }
}

export function assertAgentRollups(data: AgentKpis): void {
  const { totals, campaigns, deals } = data.dealPromotionMonitor;
  const sumCampDeals = campaigns.reduce((s, c) => s + c.activeDeals, 0);
  const sumCampClicks = campaigns.reduce((s, c) => s + c.totalClicks, 0);
  const sumCampCo = campaigns.reduce((s, c) => s + c.totalCheckouts, 0);
  const sumCampRev = campaigns.reduce((s, c) => s + c.revenueInr, 0);
  if (sumCampDeals !== totals.activeDeals) throw new Error("Agent: campaign deal counts ≠ totals");
  if (sumCampClicks !== totals.totalClicks) throw new Error("Agent: campaign clicks ≠ totals");
  if (sumCampCo !== totals.totalCheckouts) throw new Error("Agent: campaign checkouts ≠ totals");
  if (sumCampRev !== totals.totalRevenueInr) throw new Error("Agent: campaign revenue ≠ totals");

  const sumDealRev = deals.reduce((s, d) => s + d.revenueInr, 0);
  const sumDealClicks = deals.reduce((s, d) => s + d.clicks, 0);
  const sumDealCo = deals.reduce((s, d) => s + d.checkouts, 0);
  if (sumDealRev !== totals.totalRevenueInr) throw new Error("Agent: deal rows revenue ≠ totals");
  if (sumDealClicks !== totals.totalClicks) throw new Error("Agent: deal rows clicks ≠ totals");
  if (sumDealCo !== totals.totalCheckouts) throw new Error("Agent: deal rows checkouts ≠ totals");
  if (deals.length !== totals.activeDeals) throw new Error("Agent: deal row count ≠ active deals");

  const stageSum =
    data.pipelineAndOnboarding.stages.pipeline +
    data.pipelineAndOnboarding.stages.integration +
    data.pipelineAndOnboarding.stages.uat +
    data.pipelineAndOnboarding.stages.liveMerchant;
  if (stageSum !== data.dashboard.totalMerchants) {
    throw new Error("Agent: pipeline stage counts must sum to total merchants");
  }

  const onboardSum = data.pipelineAndOnboarding.merchantsOnboardedByMonth.reduce((s, m) => s + m.merchantsOnboarded, 0);
  if (onboardSum !== data.personalTracking.myPerformance.onboardedYtd) {
    throw new Error("Agent: monthly onboarded sum must equal YTD onboarded");
  }

  if (data.dashboard.totalLiveDeals !== totals.activeDeals) {
    throw new Error("Agent: dashboard live deals must equal promotion monitor active deals");
  }
  if (data.dashboard.mtdRevenueInr !== totals.totalRevenueInr) {
    throw new Error("Agent: dashboard MTD revenue must equal promotion monitor revenue");
  }
}

/** Call in dev to ensure JSON stays consistent; no-op in production unless imported. */
export function validateAllMockKpis(): void {
  assertAdminDealAnalyticsConsistency(adminKpis);
  assertMerchantDealRollups(merchantKpisData);
  assertAgentRollups(agentKpisData);
}

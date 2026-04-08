/** Currency + snapshot metadata shared across mock datasets */
export type CurrencyMeta = {
  code: "INR";
  symbol: "₹";
  lastUpdatedIso: string;
};

/** ---------- Admin ---------- */
export type AdminPipelineStages = {
  pipeline: number;
  integration: number;
  uat: number;
  live: number;
};

export type AdminTopPartner = {
  partnerId: string;
  name: string;
  revenueInr: number;
  rank: number;
};

export type AdminTopCategory = {
  categoryId: string;
  name: string;
  dealCount: number;
  redemptionRate: number;
};

export type AdminPartnerPerformanceRow = {
  partnerId: string;
  name: string;
  totalSalesInr: number;
  activeDeals: number;
  avgDealPerformanceScore: number;
};

export type AdminProductPerformanceRow = {
  productId: string;
  name: string;
  redemptions: number;
  conversionRate: number;
};

export type AdminDealAnalytics = {
  revenueFromDealsInr: number;
  overallRedemptionRate: number;
  totalRedemptions: number;
  totalIssued: number;
};

export type AdminActiveUserRow = {
  userId: string;
  displayName: string;
  engagements30d: number;
};

export type AdminEngagementTrendPoint = {
  weekLabel: string;
  activeUsers: number;
  sessions: number;
};

export type AdminKpis = {
  meta: CurrencyMeta;
  dashboardOverview: {
    totalActiveUsers: number;
    activeDeals: number;
    topPerformingPartners: AdminTopPartner[];
    topCategories: AdminTopCategory[];
  };
  partnerPipelineAndGrowth: {
    pipelineStages: AdminPipelineStages;
    newCoupons: number;
    newMerchants: number;
    newProducts: number;
  };
  detailedAnalytics: {
    partnerPerformance: AdminPartnerPerformanceRow[];
    productPerformance: AdminProductPerformanceRow[];
    dealAnalytics: AdminDealAnalytics;
    userBehavior: {
      mostActiveUsers: AdminActiveUserRow[];
      engagementTrends: AdminEngagementTrendPoint[];
    };
  };
};

/** ---------- Merchant ---------- */
export type MerchantDealRow = {
  dealId: string;
  title: string;
  clicks: number;
  checkouts: number;
  revenueInr: number;
  conversionRate: number;
};

export type MerchantKpis = {
  meta: CurrencyMeta;
  merchantId: string;
  merchantName: string;
  performanceOverview: {
    totalActiveDeals: number;
    totalClicksOnDeals: number;
    totalCheckouts: number;
    totalRevenueFromDealsInr: number;
  };
  dealSpecificAnalysis: MerchantDealRow[];
  userEngagement: {
    userClicksOnDeals: number;
    userCheckouts: number;
    bounceRate: number;
  };
  realTimeTracking: {
    activeDeals: number;
    uniqueClicks: number;
    checkouts: number;
    revenueInr: number;
    /** ISO timestamp for prototype “live” feel */
    lastTickIso: string;
  };
};

/** ---------- Agent ---------- */
export type AgentPipelineStages = {
  pipeline: number;
  integration: number;
  uat: number;
  liveMerchant: number;
};

export type AgentCampaignRow = {
  campaignId: string;
  name: string;
  activeDeals: number;
  totalClicks: number;
  totalCheckouts: number;
  revenueInr: number;
};

export type AgentDealRow = {
  dealId: string;
  campaign: string;
  merchantName: string;
  revenueInr: number;
  clicks: number;
  checkouts: number;
};

export type AgentOnboardingByMonth = {
  month: string;
  merchantsOnboarded: number;
};

export type AgentKpis = {
  meta: CurrencyMeta;
  agentId: string;
  agentName: string;
  dashboard: {
    totalMerchants: number;
    activeMerchants: number;
    totalLiveDeals: number;
    mtdRevenueInr: number;
  };
  pipelineAndOnboarding: {
    stages: AgentPipelineStages;
    merchantsOnboardedByMonth: AgentOnboardingByMonth[];
  };
  dealPromotionMonitor: {
    totals: {
      activeDeals: number;
      totalClicks: number;
      totalCheckouts: number;
      totalRevenueInr: number;
    };
    campaigns: AgentCampaignRow[];
    deals: AgentDealRow[];
  };
  personalTracking: {
    topDeal: { dealId: string; title: string; revenueInr: number };
    myPerformance: {
      onboardedYtd: number;
      pipelineConversionRate: number;
      avgDaysToLive: number;
    };
  };
};

/** ---------- Customer ---------- */
export type LoyaltyTier = "Bronze" | "Silver" | "Gold" | "Platinum";

export type CustomerKpis = {
  meta: CurrencyMeta;
  userId: string;
  loyaltyBalances: {
    tier: LoyaltyTier;
    myPoints: number;
    /** 1 point = 0.5 Rs */
    pointsToRupee: number;
    myCashbackInr: number;
  };
};

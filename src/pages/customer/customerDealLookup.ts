import { mppsDataset } from "../../data/mpps";

export type ResolvedCustomerDeal = {
  dealId: string;
  title: string;
  merchant: string;
  discountLabel: string;
  source: "popular" | "today" | "nearby" | "admin";
  productName?: string;
  expiresOn?: string;
  endsInHours?: number;
  icon?: string;
};

/** Resolve a deal id from any customer or admin list (for links & detail screens). */
export function getCustomerDealById(dealId: string): ResolvedCustomerDeal | null {
  const c = mppsDataset.customer;
  const p = c.popularDeals.find((d) => d.dealId === dealId);
  if (p) {
    return {
      dealId: p.dealId,
      title: p.title,
      merchant: p.merchant,
      discountLabel: p.discountLabel,
      source: "popular",
      expiresOn: p.expiresOn,
      icon: p.icon,
    };
  }
  const t = c.todaysDeals.find((d) => d.dealId === dealId);
  if (t) {
    return {
      dealId: t.dealId,
      title: t.title,
      merchant: t.merchant,
      discountLabel: t.discountLabel,
      source: "today",
      endsInHours: t.endsInHours,
    };
  }
  const n = c.nearbyDeals.find((d) => d.dealId === dealId);
  if (n) {
    return {
      dealId: n.dealId,
      title: n.title,
      merchant: n.merchant,
      discountLabel: n.discountLabel,
      source: "nearby",
      icon: n.icon,
    };
  }
  const a = mppsDataset.admin.deals.find((d) => d.id === dealId);
  if (a) {
    return {
      dealId: a.id,
      title: a.title,
      merchant: a.merchantName,
      discountLabel: a.valueLabel,
      source: "admin",
      productName: a.productName,
    };
  }
  return null;
}

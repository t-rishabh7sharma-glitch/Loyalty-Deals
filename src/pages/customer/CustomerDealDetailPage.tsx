import { ArrowLeft, Package } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { mppsDataset } from "../../data/mpps";
import { formatInt } from "../../lib/format";
import { getCustomerDealById } from "./customerDealLookup";

export function CustomerDealDetailPage() {
  const { dealId } = useParams();
  const deal = dealId ? getCustomerDealById(dealId) : null;
  const popularRow = deal ? mppsDataset.customer.popularDeals.find((d) => d.dealId === deal.dealId) : undefined;

  return (
    <div className="space-y-4 pb-8">
      <Link to="/app/browse" className="inline-flex items-center gap-1 text-sm font-semibold text-secondary">
        <ArrowLeft className="h-4 w-4" />
        Browse deals
      </Link>
      {deal ? (
        <div className="space-y-4">
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-navy">{deal.source} offer</p>
            <h1 className="mt-2 text-2xl font-bold text-black">{deal.title}</h1>
            <p className="mt-2 text-muted-navy">{deal.merchant}</p>
            <p className="mt-4 text-2xl font-bold text-primary">{deal.discountLabel}</p>
            {deal.expiresOn ? <p className="mt-2 text-sm text-muted-navy">Expires {deal.expiresOn}</p> : null}
            {deal.endsInHours != null ? <p className="mt-2 text-sm text-muted-navy">Ends in {deal.endsInHours} hours</p> : null}
            {popularRow ? <p className="mt-2 text-sm text-muted-navy">{formatInt(popularRow.clicks)} clicks</p> : null}
          </div>
          {deal.productName ? (
            <div className="flex items-start gap-3 rounded-2xl border border-black/5 bg-surface p-4">
              <Package className="h-5 w-5 shrink-0 text-amber-700" />
              <div>
                <p className="text-xs font-semibold uppercase text-muted-navy">Linked product</p>
                <p className="font-medium text-black">{deal.productName}</p>
                <p className="mt-1 text-xs text-muted-navy">Deals are tied to catalog products (PRD §1.4).</p>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="text-muted-navy">Deal not found.</p>
      )}
    </div>
  );
}

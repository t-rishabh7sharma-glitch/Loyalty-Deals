import { Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { mppsDataset } from "../../data/mpps";
import { formatInt } from "../../lib/format";
import { CustomerDealIcon } from "./customerIcons";

type Row = {
  dealId: string;
  title: string;
  discountLabel: string;
  merchant: string;
  clicks: number;
  sub: string;
  icon?: string;
  source: string;
};

/** PRD §3.8 — consolidated listing for Browse tab. */
export function CustomerBrowsePage() {
  const { popularDeals, todaysDeals, nearbyDeals } = mppsDataset.customer;

  const rows: Row[] = [
    ...popularDeals.map((d) => ({
      dealId: d.dealId,
      title: d.title,
      discountLabel: d.discountLabel,
      merchant: d.merchant,
      clicks: d.clicks,
      sub: `Expires ${d.expiresOn}`,
      icon: d.icon,
      source: "Popular",
    })),
    ...todaysDeals.map((d) => ({
      dealId: d.dealId,
      title: d.title,
      discountLabel: d.discountLabel,
      merchant: d.merchant,
      clicks: 0,
      sub: `Ends in ${d.endsInHours}h`,
      icon: "coffee",
      source: "Today's deals",
    })),
    ...nearbyDeals.map((d) => ({
      dealId: d.dealId,
      title: d.title,
      discountLabel: d.discountLabel,
      merchant: d.merchant,
      clicks: 0,
      sub: `${d.distanceKm} km away`,
      icon: d.icon,
      source: "Nearby",
    })),
  ];

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-secondary">
          <Tag className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-black">Browse deals</h1>
          <p className="text-sm text-muted-navy">Offers from the prototype catalog</p>
        </div>
      </div>
      <ul className="space-y-3">
        {rows.map((d, i) => (
          <li key={`${d.dealId}-${i}`}>
            <Link
              to={`/app/deals/${d.dealId}`}
              className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-card transition active:scale-[0.99] hover:border-primary/25"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-800">
                <CustomerDealIcon name={d.icon} className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-black">{d.title}</p>
                <p className="text-sm text-muted-navy">
                  {d.merchant} · {d.sub}
                  {d.clicks ? ` · ${formatInt(d.clicks)} clicks` : ""}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-bold text-secondary">{d.discountLabel}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

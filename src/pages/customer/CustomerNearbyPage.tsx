import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { mppsDataset } from "../../data/mpps";
import { CustomerDealIcon } from "./customerIcons";

/** PRD §3.7 — deals within 10 km (prototype distances from mock data). */
export function CustomerNearbyPage() {
  const rows = mppsDataset.customer.nearbyDeals;

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
          <MapPin className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-black">Deals nearby</h1>
          <p className="text-sm text-muted-navy">Within ~10 km · tap a card for details</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((d) => (
          <Link
            key={d.dealId}
            to={`/app/deals/${d.dealId}`}
            className="flex flex-col rounded-2xl border border-black/5 bg-white p-4 shadow-card transition hover:border-primary/30"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50">
                <CustomerDealIcon name={d.icon} className="h-5 w-5 text-sky-700" />
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-muted-navy">{d.distanceKm} km</span>
            </div>
            <p className="mt-3 font-bold text-black">{d.merchant}</p>
            <p className="mt-1 text-sm text-muted-navy line-clamp-2">{d.title}</p>
            <span className="mt-3 inline-flex w-fit rounded-full bg-bo-orange/15 px-2.5 py-1 text-xs font-bold text-bo-orange">{d.discountLabel}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

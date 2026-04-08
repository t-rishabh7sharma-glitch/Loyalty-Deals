import { ArrowLeft, Ticket } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { StatusPill, type StatusTone } from "../../components/ui/StatusPill";
import { mppsDataset } from "../../data/mpps";

function tone(s: string): StatusTone {
  if (s === "Active") return "active";
  if (s === "Used") return "used";
  return "locked";
}

export function CustomerCouponDetailPage() {
  const { couponId } = useParams();
  const row = mppsDataset.customer.walletCoupons.find((c) => c.id === couponId);

  return (
    <div className="space-y-6 pb-8">
      <Link to="/app/coupons" className="inline-flex items-center gap-1 text-sm font-semibold text-secondary">
        <ArrowLeft className="h-4 w-4" />
        My coupons
      </Link>
      {row ? (
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-card">
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
              <Ticket className="h-6 w-6" />
            </div>
            <StatusPill label={row.state} tone={tone(row.state)} />
          </div>
          <h1 className="mt-4 text-xl font-bold text-black">{row.title}</h1>
          <p className="mt-1 text-muted-navy">{row.merchant}</p>
          <p className="mt-2 text-sm text-muted-navy">Expires {row.expiresOn}</p>
          {"code" in row && typeof (row as { code?: string }).code === "string" ? (
            <p className="mt-4 rounded-xl bg-surface px-3 py-2 font-mono text-sm font-semibold text-secondary">
              {(row as { code: string }).code}
            </p>
          ) : null}
          {"linkedDealId" in row && typeof (row as { linkedDealId?: string }).linkedDealId === "string" ? (
            <Link
              to={`/app/deals/${(row as { linkedDealId: string }).linkedDealId}`}
              className="mt-6 block w-full rounded-xl bg-secondary py-3 text-center text-sm font-semibold text-white"
            >
              View linked deal
            </Link>
          ) : null}
        </div>
      ) : (
        <p className="text-muted-navy">Coupon not found.</p>
      )}
    </div>
  );
}

import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { RewardzShell } from "../../components/bo/RewardzShell";
import { SimpleDialog } from "../../components/ui/SimpleDialog";
import { StatusPill, type StatusTone } from "../../components/ui/StatusPill";
import { mppsDataset } from "../../data/mpps";
import { formatInt } from "../../lib/formatLakh";

function dealTone(s: string): StatusTone {
  if (s === "Active") return "active";
  if (s === "Scheduled") return "scheduled";
  return "expired";
}

type StoreRun = (typeof mppsDataset.merchant.deals)[number];

export function MerchantDealsPage() {
  const mid = mppsDataset.merchant.merchantId;
  const platformDeals = mppsDataset.admin.deals.filter((d) => d.merchantId === mid);
  const seedRuns = useMemo(() => [...mppsDataset.merchant.deals], []);
  const [storeRuns, setStoreRuns] = useState<StoreRun[]>(seedRuns);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const addRun = () => {
    if (!title.trim()) return;
    setStoreRuns((r) => [
      ...r,
      {
        id: `MD-FM-${Date.now()}`,
        title: title.trim(),
        clicks: 0,
        checkouts: 0,
        revenueInr: 0,
        conversionRate: 0,
      },
    ]);
    setTitle("");
    setOpen(false);
  };

  return (
    <RewardzShell role="merchant">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Deals & promotions</h1>
            <p className="mt-1 text-sm text-muted-navy">Campaigns linked to the loyalty platform + your storefront schedules.</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-bo-orange px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95"
          >
            <Plus className="h-4 w-4" />
            Schedule deal
          </button>
        </div>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-black">Platform campaigns (Admin)</h2>
          <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/5">
            <div className="overflow-x-auto">
              <table className="min-w-[640px] w-full text-sm">
                <thead className="bg-surface text-left text-xs font-semibold uppercase tracking-wide text-muted-navy">
                  <tr>
                    <th className="px-4 py-3">Deal</th>
                    <th className="px-4 py-3">Window</th>
                    <th className="px-4 py-3 text-right">Clicks</th>
                    <th className="px-4 py-3">Offer</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {platformDeals.map((d) => (
                    <tr key={d.id} className="border-t border-black/5">
                      <td className="px-4 py-3 font-medium text-black">{d.title}</td>
                      <td className="px-4 py-3 text-xs text-muted-navy">
                        {d.start} → {d.end}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold">{formatInt(d.clicks)}</td>
                      <td className="px-4 py-3 font-semibold text-bo-orange">{d.valueLabel}</td>
                      <td className="px-4 py-3">
                        <StatusPill label={d.status} tone={dealTone(d.status)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-black">Storefront schedules</h2>
          <p className="text-xs text-muted-navy">
            New rows start at zero traction. Dashboard KPIs above still reflect the seeded snapshot.
          </p>
          <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/5">
            <div className="overflow-x-auto">
              <table className="min-w-[520px] w-full text-sm">
                <thead className="bg-surface text-left text-xs font-semibold uppercase tracking-wide text-muted-navy">
                  <tr>
                    <th className="px-4 py-3">Run</th>
                    <th className="px-4 py-3 text-right">Clicks</th>
                    <th className="px-4 py-3 text-right">Checkouts</th>
                    <th className="px-4 py-3 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {storeRuns.map((r) => (
                    <tr key={r.id} className="border-t border-black/5">
                      <td className="px-4 py-3 font-medium text-black">{r.title}</td>
                      <td className="px-4 py-3 text-right">{formatInt(r.clicks)}</td>
                      <td className="px-4 py-3 text-right">{formatInt(r.checkouts)}</td>
                      <td className="px-4 py-3 text-right font-semibold">₹{r.revenueInr.toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      <SimpleDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Schedule storefront deal"
        footer={
          <>
            <button type="button" className="rounded-btn border border-black/15 px-4 py-2 text-sm font-medium hover:bg-surface" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="button" className="rounded-btn bg-bo-orange px-4 py-2 text-sm font-semibold text-white hover:opacity-95" onClick={addRun}>
              Add schedule
            </button>
          </>
        }
      >
        <div>
          <label className="text-xs font-semibold text-muted-navy" htmlFor="md-title">
            Run title
          </label>
          <input
            id="md-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-bo-orange focus:ring-2"
            placeholder="e.g. Monsoon pantry sale"
          />
        </div>
      </SimpleDialog>
    </RewardzShell>
  );
}

import { Plus, Tag } from "lucide-react";
import { useMemo, useState } from "react";
import { BOLayout } from "../../components/bo/BOLayout";
import { SimpleDialog } from "../../components/ui/SimpleDialog";
import { StatusPill, type StatusTone } from "../../components/ui/StatusPill";
import { mppsDataset } from "../../data/mpps";
import { formatInt } from "../../lib/format";

function dealTone(s: string): StatusTone {
  if (s === "Active") return "active";
  if (s === "Scheduled") return "scheduled";
  return "expired";
}

type DealRow = (typeof mppsDataset.admin.deals)[number];

export function AdminDealsPage() {
  const seed = useMemo(() => [...mppsDataset.admin.deals], []);
  const [deals, setDeals] = useState<DealRow[]>(seed);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [productName, setProductName] = useState("");
  const [merchantId, setMerchantId] = useState(mppsDataset.admin.merchants[0]?.id ?? "M001");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [valueLabel, setValueLabel] = useState("10%");
  const [status, setStatus] = useState<DealRow["status"]>("Scheduled");

  const dealStatusCounts = useMemo(() => {
    const c = { active: 0, scheduled: 0, expired: 0 };
    for (const d of deals) {
      if (d.status === "Active") c.active++;
      else if (d.status === "Scheduled") c.scheduled++;
      else c.expired++;
    }
    return c;
  }, [deals]);

  const submit = () => {
    if (!title.trim() || !productName.trim() || !start.trim() || !end.trim()) return;
    const m = mppsDataset.admin.merchants.find((x) => x.id === merchantId);
    if (!m) return;
    const valueKind = valueLabel.includes("%") ? "percent" : "flat";
    setDeals((d) => [
      ...d,
      {
        id: `D-${Date.now()}`,
        title: title.trim(),
        productName: productName.trim(),
        merchantName: m.name,
        merchantId: m.id,
        start: start.trim(),
        end: end.trim(),
        clicks: 0,
        valueLabel: valueLabel.trim(),
        valueKind,
        status,
      },
    ]);
    setTitle("");
    setProductName("");
    setStart("");
    setEnd("");
    setOpen(false);
  };

  return (
    <BOLayout role="admin" title="Deal Management" badge="Catalog">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-btn bg-bo-orange px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95"
          >
            <Plus className="h-4 w-4" />
            Create Deal
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-card border border-black/5 bg-white p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-navy">Active</p>
            <p className="mt-2 text-3xl font-bold text-emerald-600">{formatInt(dealStatusCounts.active)}</p>
          </div>
          <div className="rounded-card border border-black/5 bg-white p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-navy">Scheduled</p>
            <p className="mt-2 text-3xl font-bold text-primary">{formatInt(dealStatusCounts.scheduled)}</p>
          </div>
          <div className="rounded-card border border-black/5 bg-white p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-navy">Expired</p>
            <p className="mt-2 text-3xl font-bold text-slate-600">{formatInt(dealStatusCounts.expired)}</p>
          </div>
        </div>

        <div className="space-y-4">
          {deals.map((d) => (
            <div
              key={d.id}
              className="flex flex-col gap-4 rounded-card border border-black/5 bg-white p-5 shadow-card lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="flex min-w-0 flex-1 gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                  <Tag className="h-6 w-6 text-amber-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-base font-bold text-black">{d.title}</p>
                  <p className="mt-1 text-sm text-muted-navy">
                    {d.productName} · {d.merchantName}
                  </p>
                  <p className="mt-1 text-xs text-muted-navy">
                    {d.start} → {d.end} · {formatInt(d.clicks)} clicks
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                <div className="text-right">
                  <p className="text-2xl font-bold text-bo-orange">{d.valueLabel}</p>
                  <div className="mt-1 flex justify-end">
                    <StatusPill label={d.status} tone={dealTone(d.status)} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="rounded-btn border border-secondary px-3 py-1.5 text-xs font-semibold text-secondary hover:bg-primary/10">
                    Edit
                  </button>
                  <button type="button" className="rounded-btn border border-rose-300 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50">
                    Del
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SimpleDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Create deal"
        footer={
          <>
            <button type="button" className="rounded-btn border border-black/15 px-4 py-2 text-sm font-medium hover:bg-surface" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="button" className="rounded-btn bg-bo-orange px-4 py-2 text-sm font-semibold text-white hover:opacity-95" onClick={submit}>
              Save deal
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="ad-title">
              Deal title
            </label>
            <input id="ad-title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-bo-orange focus:ring-2" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="ad-prod">
              Product name
            </label>
            <input id="ad-prod" value={productName} onChange={(e) => setProductName(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-bo-orange focus:ring-2" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="ad-merch">
              Partner
            </label>
            <select id="ad-merch" value={merchantId} onChange={(e) => setMerchantId(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-bo-orange focus:ring-2">
              {mppsDataset.admin.merchants.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-muted-navy" htmlFor="ad-start">
                Start
              </label>
              <input id="ad-start" type="date" value={start} onChange={(e) => setStart(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-bo-orange focus:ring-2" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-navy" htmlFor="ad-end">
                End
              </label>
              <input id="ad-end" type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-bo-orange focus:ring-2" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="ad-val">
              Offer label
            </label>
            <input id="ad-val" value={valueLabel} onChange={(e) => setValueLabel(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-bo-orange focus:ring-2" placeholder="15% or ₹200" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="ad-st">
              Status
            </label>
            <select id="ad-st" value={status} onChange={(e) => setStatus(e.target.value as DealRow["status"])} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-bo-orange focus:ring-2">
              <option value="Scheduled">Scheduled</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>
      </SimpleDialog>
    </BOLayout>
  );
}

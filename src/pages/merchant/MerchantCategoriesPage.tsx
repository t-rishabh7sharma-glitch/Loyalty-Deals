import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { RewardzShell } from "../../components/bo/RewardzShell";
import { SimpleDialog } from "../../components/ui/SimpleDialog";
import { mppsDataset } from "../../data/mpps";
import { formatInt } from "../../lib/formatLakh";

type MixRow = (typeof mppsDataset.merchant.categoryMix)[number];

export function MerchantCategoriesPage() {
  const seed = useMemo(() => [...mppsDataset.merchant.categoryMix], []);
  const [mix, setMix] = useState<MixRow[]>(seed);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [productCount, setProductCount] = useState("1");

  const total = mix.reduce((s, c) => s + c.productCount, 0);

  const submit = () => {
    const n = Number(productCount);
    if (!name.trim() || !Number.isFinite(n) || n < 0) return;
    const categoryId = `CAT-LOC-${Date.now()}`;
    setMix((m) => [...m, { categoryId, name: name.trim(), productCount: Math.floor(n), shareOfStorePct: 0 }]);
    setName("");
    setProductCount("1");
    setOpen(false);
  };

  return (
    <RewardzShell role="merchant">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Categories</h1>
            <p className="mt-1 text-sm text-muted-navy">
              Assign products to categories · {formatInt(total)} SKUs in this storefront slice.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-bo-sidebar px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-bo-accent"
          >
            <Plus className="h-4 w-4" />
            Add category
          </button>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {mix.map((c) => (
            <div key={c.categoryId} className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-black/5">
              <h2 className="text-lg font-bold text-black">{c.name}</h2>
              <p className="mt-2 text-sm text-muted-navy">{formatInt(c.productCount)} products</p>
              <p className="mt-1 text-xs text-muted-navy">Share of store: {c.shareOfStorePct}%</p>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-bo-sidebar" style={{ width: `${Math.min(100, c.shareOfStorePct || (total ? (c.productCount / total) * 100 : 0))}%` }} />
              </div>
              <div className="mt-4 flex gap-2">
                <button type="button" className="rounded-lg border border-bo-sidebar px-3 py-1.5 text-xs font-semibold text-bo-sidebar hover:bg-bo-sidebar/5">
                  Bulk assign
                </button>
                <button type="button" className="rounded-lg border border-black/10 px-3 py-1.5 text-xs font-semibold text-muted-navy hover:bg-surface">
                  View SKUs
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SimpleDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Add category"
        footer={
          <>
            <button type="button" className="rounded-btn border border-black/15 px-4 py-2 text-sm font-medium hover:bg-surface" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="button" className="rounded-btn bg-bo-sidebar px-4 py-2 text-sm font-semibold text-white hover:bg-bo-accent" onClick={submit}>
              Save
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="mc-name">
              Category name
            </label>
            <input
              id="mc-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-bo-sidebar focus:ring-2"
              placeholder="e.g. Pantry staples"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="mc-count">
              Initial product count
            </label>
            <input
              id="mc-count"
              inputMode="numeric"
              value={productCount}
              onChange={(e) => setProductCount(e.target.value)}
              className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-bo-sidebar focus:ring-2"
            />
          </div>
        </div>
      </SimpleDialog>
    </RewardzShell>
  );
}

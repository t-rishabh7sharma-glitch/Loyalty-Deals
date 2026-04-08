import { Package, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { BOLayout } from "../../components/bo/BOLayout";
import { SimpleDialog } from "../../components/ui/SimpleDialog";
import { StatusPill } from "../../components/ui/StatusPill";
import { mppsDataset } from "../../data/mpps";
import { formatInr, formatInt } from "../../lib/format";

type Featured = (typeof mppsDataset.admin.products.featured)[number];

export function AdminProductsPage() {
  const baseTotal = mppsDataset.admin.products.totalCatalogProducts;
  const seed = useMemo(() => [...mppsDataset.admin.products.featured], []);
  const [extra, setExtra] = useState<Featured[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [merchantName, setMerchantName] = useState(mppsDataset.admin.merchants[0]?.name ?? "FreshMart");
  const [categoryName, setCategoryName] = useState("Food & Bev");
  const [priceInr, setPriceInr] = useState("");
  const [inStock, setInStock] = useState(true);
  const [bulkHint, setBulkHint] = useState(false);

  const list = useMemo(() => [...seed, ...extra], [seed, extra]);
  const totalDisplay = baseTotal + extra.length;

  const submit = () => {
    const price = Number(priceInr);
    const m = mppsDataset.admin.merchants.find((x) => x.name === merchantName);
    if (!name.trim() || !Number.isFinite(price) || price < 0 || !m) return;
    const cat = mppsDataset.admin.categories.find((c) => c.name === categoryName);
    setExtra((e) => [
      ...e,
      {
        id: `SKU-A-${Date.now()}`,
        name: name.trim(),
        merchantId: m.id,
        merchantName: m.name,
        categoryId: cat?.id ?? "CAT-FB",
        categoryName: cat?.name ?? categoryName,
        priceInr: price,
        inStock,
      },
    ]);
    setName("");
    setPriceInr("");
    setOpen(false);
  };

  return (
    <BOLayout role="admin" title="Product Management" badge={`${formatInt(totalDisplay)} products in catalog`}>
      <div className="mx-auto max-w-6xl space-y-6">
        {bulkHint ? (
          <p className="rounded-btn border border-primary/25 bg-primary/10 px-3 py-2 text-xs text-secondary">Prototype: CSV bulk upload would run here.</p>
        ) : null}
        <div className="flex flex-wrap justify-end gap-2">
          <button
            type="button"
            className="rounded-btn border border-secondary px-4 py-2.5 text-sm font-semibold text-secondary hover:bg-primary/10"
            onClick={() => {
              setBulkHint(true);
              window.setTimeout(() => setBulkHint(false), 4000);
            }}
          >
            Bulk Upload
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-btn bg-primary px-4 py-2.5 text-sm font-semibold text-secondary shadow-sm hover:opacity-95"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((p) => (
            <div key={p.id} className="flex flex-col rounded-card border border-black/5 bg-white p-5 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-lg">
                  <Package className="h-5 w-5 text-amber-700" />
                </div>
                <StatusPill label={p.inStock ? "In Stock" : "Out of Stock"} tone={p.inStock ? "stockIn" : "stockOut"} />
              </div>
              <h2 className="mt-4 text-base font-bold text-black">{p.name}</h2>
              <p className="mt-1 text-xs text-muted-navy">
                {p.merchantName} · {p.categoryName}
              </p>
              <p className="mt-3 text-2xl font-bold text-primary">{formatInr(p.priceInr)}</p>
              <div className="mt-4 flex justify-end gap-2">
                <button type="button" className="rounded-btn border border-secondary px-3 py-1.5 text-xs font-semibold text-secondary hover:bg-primary/10">
                  Edit
                </button>
                <button type="button" className="rounded-btn border border-rose-300 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50">
                  Del
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SimpleDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Add catalog product"
        footer={
          <>
            <button type="button" className="rounded-btn border border-black/15 px-4 py-2 text-sm font-medium hover:bg-surface" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="button" className="rounded-btn bg-primary px-4 py-2 text-sm font-semibold text-secondary hover:opacity-95" onClick={submit}>
              Save
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="ap-name">
              Product name
            </label>
            <input id="ap-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-primary focus:ring-2" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="ap-merch">
              Partner
            </label>
            <select id="ap-merch" value={merchantName} onChange={(e) => setMerchantName(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-primary focus:ring-2">
              {mppsDataset.admin.merchants.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="ap-cat">
              Category
            </label>
            <select id="ap-cat" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-primary focus:ring-2">
              {mppsDataset.admin.categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="ap-price">
              Price (INR)
            </label>
            <input id="ap-price" inputMode="decimal" value={priceInr} onChange={(e) => setPriceInr(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-primary focus:ring-2" />
          </div>
          <label className="flex items-center gap-2 text-sm text-black">
            <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="rounded border-black/20" />
            In stock
          </label>
        </div>
      </SimpleDialog>
    </BOLayout>
  );
}

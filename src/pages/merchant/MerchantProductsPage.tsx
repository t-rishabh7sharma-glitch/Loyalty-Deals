import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { RewardzShell } from "../../components/bo/RewardzShell";
import { SimpleDialog } from "../../components/ui/SimpleDialog";
import { StatusPill } from "../../components/ui/StatusPill";
import { mppsDataset } from "../../data/mpps";
import { formatInr } from "../../lib/formatLakh";

type ProductRow = (typeof mppsDataset.merchant.products)[number];

export function MerchantProductsPage() {
  const seed = useMemo(() => [...mppsDataset.merchant.products], []);
  const [rows, setRows] = useState<ProductRow[]>(seed);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [categoryName, setCategoryName] = useState("Food & Bev");
  const [priceInr, setPriceInr] = useState("");
  const [inStock, setInStock] = useState(true);

  const submit = () => {
    const price = Number(priceInr);
    if (!name.trim() || !Number.isFinite(price) || price < 0) return;
    const id = `SKU-M-${Date.now()}`;
    setRows((r) => [...r, { id, name: name.trim(), categoryName, priceInr: price, inStock }]);
    setName("");
    setPriceInr("");
    setInStock(true);
    setOpen(false);
  };

  return (
    <RewardzShell role="merchant">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Products</h1>
            <p className="mt-1 text-sm text-muted-navy">FreshMart catalog slice · adds stay in this session (prototype).</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-bo-sidebar px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-bo-accent"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/5">
          <div className="overflow-x-auto">
            <table className="min-w-[640px] w-full text-sm">
              <thead className="bg-surface text-left text-xs font-semibold uppercase tracking-wide text-muted-navy">
                <tr>
                  <th className="px-4 py-3">SKU</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3 text-right">Price</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.id} className="border-t border-black/5">
                    <td className="px-4 py-3 font-mono text-xs text-muted-navy">{p.id}</td>
                    <td className="px-4 py-3 font-medium text-black">{p.name}</td>
                    <td className="px-4 py-3 text-muted-navy">{p.categoryName}</td>
                    <td className="px-4 py-3 text-right font-semibold">{formatInr(p.priceInr)}</td>
                    <td className="px-4 py-3">
                      <StatusPill label={p.inStock ? "In Stock" : "Out of Stock"} tone={p.inStock ? "stockIn" : "stockOut"} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <SimpleDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Add product"
        footer={
          <>
            <button type="button" className="rounded-btn border border-black/15 px-4 py-2 text-sm font-medium text-black hover:bg-surface" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="button" className="rounded-btn bg-bo-sidebar px-4 py-2 text-sm font-semibold text-white hover:bg-bo-accent" onClick={submit}>
              Save product
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="mp-name">
              Name
            </label>
            <input
              id="mp-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-bo-sidebar focus:ring-2"
              placeholder="e.g. Organic Honey 500g"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="mp-cat">
              Category
            </label>
            <select
              id="mp-cat"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-bo-sidebar focus:ring-2"
            >
              <option>Food & Bev</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Health & Beauty</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="mp-price">
              Price (INR)
            </label>
            <input
              id="mp-price"
              inputMode="decimal"
              value={priceInr}
              onChange={(e) => setPriceInr(e.target.value)}
              className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-bo-sidebar focus:ring-2"
              placeholder="199"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-black">
            <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="rounded border-black/20" />
            In stock
          </label>
        </div>
      </SimpleDialog>
    </RewardzShell>
  );
}

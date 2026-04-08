import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { BOLayout } from "../../components/bo/BOLayout";
import { SimpleDialog } from "../../components/ui/SimpleDialog";
import { mppsDataset } from "../../data/mpps";
import { formatInt } from "../../lib/format";

type CatRow = (typeof mppsDataset.admin.categories)[number];

export function AdminCategoriesPage() {
  const seed = useMemo(() => [...mppsDataset.admin.categories], []);
  const [categories, setCategories] = useState<CatRow[]>(seed);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("📦");
  const [productCount, setProductCount] = useState("0");

  const submit = () => {
    const n = Number(productCount);
    if (!name.trim() || !Number.isFinite(n) || n < 0) return;
    setCategories((c) => [
      ...c,
      {
        id: `CAT-NEW-${Date.now()}`,
        name: name.trim(),
        description: description.trim() || name.trim(),
        emoji,
        productCount: Math.floor(n),
      },
    ]);
    setName("");
    setDescription("");
    setProductCount("0");
    setOpen(false);
  };

  return (
    <BOLayout role="admin" title="Category Management" badge="Catalog">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-btn bg-primary px-4 py-2.5 text-sm font-semibold text-secondary shadow-sm hover:opacity-95"
          >
            <Plus className="h-4 w-4" />
            Add Category
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((c) => (
            <div key={c.id} className="flex flex-col rounded-card border border-black/5 bg-white p-5 shadow-card">
              <div className="text-2xl">{c.emoji}</div>
              <h2 className="mt-3 text-lg font-bold text-black">{c.name}</h2>
              <p className="mt-1 text-sm text-muted-navy">{c.description}</p>
              <p className="mt-4 text-sm font-semibold text-primary">{formatInt(c.productCount)} products</p>
              <div className="mt-4 flex gap-2">
                <button type="button" className="rounded-btn border border-secondary px-3 py-1.5 text-xs font-semibold text-secondary hover:bg-primary/10">
                  Edit
                </button>
                <button type="button" className="rounded-btn border border-rose-300 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50">
                  Delete
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
            <button type="button" className="rounded-btn bg-primary px-4 py-2 text-sm font-semibold text-secondary hover:opacity-95" onClick={submit}>
              Save
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="ac-name">
              Name
            </label>
            <input id="ac-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-primary focus:ring-2" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="ac-desc">
              Description
            </label>
            <input id="ac-desc" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-primary focus:ring-2" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="ac-emoji">
              Emoji
            </label>
            <input id="ac-emoji" value={emoji} onChange={(e) => setEmoji(e.target.value.slice(0, 4))} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-primary focus:ring-2" maxLength={4} />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="ac-pc">
              Product count
            </label>
            <input id="ac-pc" inputMode="numeric" value={productCount} onChange={(e) => setProductCount(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-primary focus:ring-2" />
          </div>
        </div>
      </SimpleDialog>
    </BOLayout>
  );
}

import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { mppsDataset } from "../../data/mpps";
import { getCustomerDealById } from "./customerDealLookup";
import { CustomerDealIcon } from "./customerIcons";

/** PRD §3.10 — category → deals in that category. */
export function CustomerCategoryPage() {
  const { categoryId } = useParams();
  const cat = mppsDataset.customer.popularCategories.find((c) => c.categoryId === categoryId);

  return (
    <div className="space-y-6 pb-8">
      <Link to="/app" className="inline-flex items-center gap-1 text-sm font-semibold text-secondary">
        <ArrowLeft className="h-4 w-4" />
        Home
      </Link>
      {cat ? (
        <>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{cat.emoji}</span>
            <div>
              <h1 className="text-2xl font-bold text-black">{cat.name}</h1>
              <p className="text-sm text-muted-navy">{cat.dealCount} deals on platform</p>
            </div>
          </div>
          <ul className="space-y-3">
            {cat.dealIds.map((id) => {
              const d = getCustomerDealById(id);
              if (!d) return null;
              return (
                <li key={id}>
                  <Link
                    to={`/app/deals/${id}`}
                    className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-card transition hover:border-primary/25"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface">
                      <CustomerDealIcon name={d.icon} className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-black">{d.title}</p>
                      <p className="text-sm text-muted-navy">{d.merchant}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-bold text-secondary">{d.discountLabel}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p className="text-muted-navy">Category not found.</p>
      )}
    </div>
  );
}

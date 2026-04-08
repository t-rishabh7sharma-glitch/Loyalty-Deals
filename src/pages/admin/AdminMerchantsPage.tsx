import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { BOLayout } from "../../components/bo/BOLayout";
import { SimpleDialog } from "../../components/ui/SimpleDialog";
import { StatusPill, type StatusTone } from "../../components/ui/StatusPill";
import { mppsDataset } from "../../data/mpps";
import { formatInt } from "../../lib/format";

function pipelineTone(p: string): StatusTone {
  if (p === "Live Merchant") return "live";
  if (p === "UAT") return "uat";
  return "integration";
}

type MerchantRow = (typeof mppsDataset.admin.merchants)[number];

export function AdminMerchantsPage() {
  const seed = useMemo(() => [...mppsDataset.admin.merchants], []);
  const [merchants, setMerchants] = useState<MerchantRow[]>(seed);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [model, setModel] = useState("Affiliate Type 1");
  const [country, setCountry] = useState("India");
  const [pipeline, setPipeline] = useState<MerchantRow["pipeline"]>("Integration");
  const [liveDeals, setLiveDeals] = useState("0");

  const live = merchants.filter((m) => m.pipeline === "Live Merchant").length;
  const uat = merchants.filter((m) => m.pipeline === "UAT").length;
  const integration = merchants.filter((m) => m.pipeline === "Integration").length;

  const submit = () => {
    if (!name.trim()) return;
    const deals = Number(liveDeals);
    if (!Number.isFinite(deals) || deals < 0) return;
    const id = `M-NEW-${Date.now()}`;
    setMerchants((m) => [...m, { id, name: name.trim(), model, liveDeals: Math.floor(deals), country, pipeline }]);
    setName("");
    setLiveDeals("0");
    setOpen(false);
  };

  return (
    <BOLayout role="admin" title="Partner Management" badge={`${formatInt(merchants.length)} partners onboarded`}>
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-btn bg-primary px-4 py-2.5 text-sm font-semibold text-secondary shadow-sm hover:opacity-95"
          >
            <Plus className="h-4 w-4" />
            Add Partner
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi label="Live" value={live} valueClass="text-emerald-600" />
          <Kpi label="UAT" value={uat} valueClass="text-amber-600" />
          <Kpi label="Integration" value={integration} valueClass="text-sky-700" />
          <Kpi label="Total" value={merchants.length} valueClass="text-black" />
        </div>

        <div className="overflow-hidden rounded-card border border-black/5 bg-white shadow-card">
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full text-sm">
              <thead className="bg-surface text-left text-xs font-semibold uppercase tracking-wide text-muted-navy">
                <tr>
                  <th className="px-4 py-3">Merchant</th>
                  <th className="px-4 py-3">Model</th>
                  <th className="px-4 py-3 text-right">Live deals</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">Pipeline</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {merchants.map((m) => (
                  <tr key={m.id} className="border-t border-black/5">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-secondary">
                          {m.name.slice(0, 1)}
                        </div>
                        <div>
                          <p className="font-semibold text-black">{m.name}</p>
                          <p className="text-xs text-muted-navy">{m.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-navy">{m.model}</td>
                    <td className="px-4 py-3 text-right font-semibold text-black">{formatInt(m.liveDeals)}</td>
                    <td className="px-4 py-3 text-muted-navy">{m.country}</td>
                    <td className="px-4 py-3">
                      <StatusPill label={m.pipeline} tone={pipelineTone(m.pipeline)} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button type="button" className="mr-2 rounded-btn border border-secondary px-3 py-1.5 text-xs font-semibold text-secondary hover:bg-primary/10">
                        Edit
                      </button>
                      <button type="button" className="rounded-btn border border-rose-300 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-muted-navy">
          Prototype roster — new partners are kept in memory until refresh. Platform KPIs on the dashboard use seeded JSON.
        </p>
      </div>

      <SimpleDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Add partner"
        footer={
          <>
            <button type="button" className="rounded-btn border border-black/15 px-4 py-2 text-sm font-medium hover:bg-surface" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="button" className="rounded-btn bg-primary px-4 py-2 text-sm font-semibold text-secondary hover:opacity-95" onClick={submit}>
              Save partner
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="am-name">
              Partner name
            </label>
            <input id="am-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-primary focus:ring-2" placeholder="Nova Retail Group" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="am-model">
              Model
            </label>
            <select id="am-model" value={model} onChange={(e) => setModel(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-primary focus:ring-2">
              <option>Affiliate Type 1</option>
              <option>Affiliate Type 2</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="am-country">
              Country
            </label>
            <input id="am-country" value={country} onChange={(e) => setCountry(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-primary focus:ring-2" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="am-pipe">
              Pipeline stage
            </label>
            <select id="am-pipe" value={pipeline} onChange={(e) => setPipeline(e.target.value as MerchantRow["pipeline"])} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-primary focus:ring-2">
              <option value="Integration">Integration</option>
              <option value="UAT">UAT</option>
              <option value="Live Merchant">Live Merchant</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="am-deals">
              Live deals count
            </label>
            <input id="am-deals" inputMode="numeric" value={liveDeals} onChange={(e) => setLiveDeals(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-primary focus:ring-2" />
          </div>
        </div>
      </SimpleDialog>
    </BOLayout>
  );
}

function Kpi({ label, value, valueClass }: { label: string; value: number; valueClass: string }) {
  return (
    <div className="rounded-card border border-black/5 bg-white p-5 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-navy">{label}</p>
      <p className={`mt-2 text-3xl font-bold ${valueClass}`}>{formatInt(value)}</p>
    </div>
  );
}

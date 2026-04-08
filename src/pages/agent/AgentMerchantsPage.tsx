import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { RewardzShell } from "../../components/bo/RewardzShell";
import { SimpleDialog } from "../../components/ui/SimpleDialog";
import { StatusPill, type StatusTone } from "../../components/ui/StatusPill";
import { mppsDataset } from "../../data/mpps";
import { formatInt } from "../../lib/formatLakh";

function pipelineTone(p: string): StatusTone {
  if (p === "Live Merchant") return "live";
  if (p === "UAT") return "uat";
  return "integration";
}

type MerchantRow = (typeof mppsDataset.admin.merchants)[number];

export function AgentMerchantsPage() {
  const seed = useMemo(() => [...mppsDataset.admin.merchants], []);
  const [merchants, setMerchants] = useState<MerchantRow[]>(seed);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [model, setModel] = useState("Affiliate Type 1");
  const [country, setCountry] = useState("India");
  const [pipeline, setPipeline] = useState<MerchantRow["pipeline"]>("Integration");
  const [liveDeals, setLiveDeals] = useState("0");

  const submit = () => {
    if (!name.trim()) return;
    const deals = Number(liveDeals);
    if (!Number.isFinite(deals) || deals < 0) return;
    setMerchants((m) => [...m, { id: `M-AG-${Date.now()}`, name: name.trim(), model, liveDeals: Math.floor(deals), country, pipeline }]);
    setName("");
    setLiveDeals("0");
    setOpen(false);
  };

  return (
    <RewardzShell role="agent">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">My merchants</h1>
            <p className="mt-1 text-sm text-muted-navy">Same view as admin partner roster — add rows for demos (session only).</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-bo-sidebar px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-bo-accent"
          >
            <Plus className="h-4 w-4" />
            Add merchant
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/5">
          <div className="overflow-x-auto">
            <table className="min-w-[800px] w-full text-sm">
              <thead className="bg-surface text-left text-xs font-semibold uppercase tracking-wide text-muted-navy">
                <tr>
                  <th className="px-4 py-3">Merchant</th>
                  <th className="px-4 py-3">Model</th>
                  <th className="px-4 py-3 text-right">Live deals</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">Pipeline</th>
                </tr>
              </thead>
              <tbody>
                {merchants.map((m) => (
                  <tr key={m.id} className="border-t border-black/5">
                    <td className="px-4 py-3 font-semibold text-black">
                      {m.name} <span className="text-xs font-normal text-muted-navy">{m.id}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-navy">{m.model}</td>
                    <td className="px-4 py-3 text-right font-semibold">{formatInt(m.liveDeals)}</td>
                    <td className="px-4 py-3 text-muted-navy">{m.country}</td>
                    <td className="px-4 py-3">
                      <StatusPill label={m.pipeline} tone={pipelineTone(m.pipeline)} />
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
        title="Add merchant"
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
            <label className="text-xs font-semibold text-muted-navy" htmlFor="agm-name">
              Name
            </label>
            <input id="agm-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-bo-sidebar focus:ring-2" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="agm-model">
              Model
            </label>
            <select id="agm-model" value={model} onChange={(e) => setModel(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-bo-sidebar focus:ring-2">
              <option>Affiliate Type 1</option>
              <option>Affiliate Type 2</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="agm-cty">
              Country
            </label>
            <input id="agm-cty" value={country} onChange={(e) => setCountry(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-bo-sidebar focus:ring-2" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="agm-pipe">
              Pipeline
            </label>
            <select id="agm-pipe" value={pipeline} onChange={(e) => setPipeline(e.target.value as MerchantRow["pipeline"])} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-bo-sidebar focus:ring-2">
              <option value="Integration">Integration</option>
              <option value="UAT">UAT</option>
              <option value="Live Merchant">Live Merchant</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="agm-ld">
              Live deals
            </label>
            <input id="agm-ld" inputMode="numeric" value={liveDeals} onChange={(e) => setLiveDeals(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-bo-sidebar focus:ring-2" />
          </div>
        </div>
      </SimpleDialog>
    </RewardzShell>
  );
}

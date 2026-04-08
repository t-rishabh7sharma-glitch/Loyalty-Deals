import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { RewardzShell } from "../../components/bo/RewardzShell";
import { SimpleDialog } from "../../components/ui/SimpleDialog";
import { StatusPill, type StatusTone } from "../../components/ui/StatusPill";
import { mppsDataset } from "../../data/mpps";
import { formatInt } from "../../lib/formatLakh";

function stageTone(s: string): StatusTone {
  if (s === "Live Merchant") return "live";
  if (s === "UAT") return "uat";
  return "integration";
}

type PipeRow = (typeof mppsDataset.agent.pipelineMerchants)[number];

export function AgentPipelinePage() {
  const seed = useMemo(() => [...mppsDataset.agent.pipelineMerchants], []);
  const [rows, setRows] = useState<PipeRow[]>(seed);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [stage, setStage] = useState<PipeRow["stage"]>("Integration");

  const stages = ["Integration", "UAT", "Live Merchant"] as const;

  const submit = () => {
    if (!name.trim()) return;
    const id = merchantId.trim() || `M-AG-${Date.now()}`;
    setRows((r) => [...r, { merchantId: id, name: name.trim(), stage }]);
    setName("");
    setMerchantId("");
    setOpen(false);
  };

  return (
    <RewardzShell role="agent">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Merchant pipeline</h1>
            <p className="mt-1 text-sm text-muted-navy">
              {formatInt(rows.length)} merchants · add rows for this session (prototype).
            </p>
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

        <div className="grid gap-4 lg:grid-cols-3">
          {stages.map((st) => {
            const bucket = rows.filter((r) => r.stage === st);
            return (
              <div key={st} className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/5">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-black">{st}</h2>
                  <span className="text-xs font-semibold text-muted-navy">{formatInt(bucket.length)}</span>
                </div>
                <ul className="mt-4 space-y-3">
                  {bucket.map((m, i) => (
                    <li key={`${st}-${m.merchantId}-${i}`} className="rounded-xl border border-black/5 bg-surface px-3 py-2">
                      <p className="text-sm font-semibold text-black">{m.name}</p>
                      <p className="text-xs text-muted-navy">{m.merchantId}</p>
                    </li>
                  ))}
                  {bucket.length === 0 ? <li className="text-xs text-muted-navy">No merchants in this stage.</li> : null}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/5">
          <div className="overflow-x-auto">
            <table className="min-w-[480px] w-full text-sm">
              <thead className="bg-surface text-left text-xs font-semibold uppercase tracking-wide text-muted-navy">
                <tr>
                  <th className="px-4 py-3">Merchant</th>
                  <th className="px-4 py-3">Stage</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={`${r.merchantId}-${i}`} className="border-t border-black/5">
                    <td className="px-4 py-3 font-medium text-black">
                      {r.name} <span className="text-xs font-normal text-muted-navy">({r.merchantId})</span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill label={r.stage} tone={stageTone(r.stage)} />
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
        title="Add pipeline merchant"
        footer={
          <>
            <button type="button" className="rounded-btn border border-black/15 px-4 py-2 text-sm font-medium hover:bg-surface" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="button" className="rounded-btn bg-bo-sidebar px-4 py-2 text-sm font-semibold text-white hover:bg-bo-accent" onClick={submit}>
              Add
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="ag-name">
              Merchant name
            </label>
            <input id="ag-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-bo-sidebar focus:ring-2" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="ag-id">
              Merchant ID (optional)
            </label>
            <input id="ag-id" value={merchantId} onChange={(e) => setMerchantId(e.target.value)} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 font-mono text-sm outline-none ring-bo-sidebar focus:ring-2" placeholder="M005" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="ag-stage">
              Stage
            </label>
            <select id="ag-stage" value={stage} onChange={(e) => setStage(e.target.value as PipeRow["stage"])} className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-bo-sidebar focus:ring-2">
              <option value="Integration">Integration</option>
              <option value="UAT">UAT</option>
              <option value="Live Merchant">Live Merchant</option>
            </select>
          </div>
        </div>
      </SimpleDialog>
    </RewardzShell>
  );
}

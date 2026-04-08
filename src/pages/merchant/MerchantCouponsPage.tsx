import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { RewardzShell } from "../../components/bo/RewardzShell";
import { SimpleDialog } from "../../components/ui/SimpleDialog";
import { StatusPill } from "../../components/ui/StatusPill";
import { mppsDataset } from "../../data/mpps";
import { formatInr, formatInt, formatPct } from "../../lib/formatLakh";

type CouponRow = (typeof mppsDataset.merchant.coupons)[number];

export function MerchantCouponsPage() {
  const seed = useMemo(() => [...mppsDataset.merchant.coupons], []);
  const [coupons, setCoupons] = useState<CouponRow[]>(seed);
  const [open, setOpen] = useState(false);
  const [campaign, setCampaign] = useState("");
  const [code, setCode] = useState("");
  const [issued, setIssued] = useState("100");
  const [faceValueInr, setFaceValueInr] = useState("25");

  const issuedSum = coupons.reduce((s, c) => s + c.issued, 0);
  const redeemedSum = coupons.reduce((s, c) => s + c.redeemed, 0);

  const submit = () => {
    const nIssued = Number(issued);
    const face = Number(faceValueInr);
    if (!campaign.trim() || !code.trim() || !Number.isFinite(nIssued) || nIssued < 0 || !Number.isFinite(face) || face < 0) return;
    setCoupons((c) => [
      ...c,
      {
        id: `CP-FM-${Date.now()}`,
        campaign: campaign.trim(),
        code: code.trim().toUpperCase(),
        issued: Math.floor(nIssued),
        redeemed: 0,
        faceValueInr: face,
        status: "Active",
      },
    ]);
    setCampaign("");
    setCode("");
    setIssued("100");
    setFaceValueInr("25");
    setOpen(false);
  };

  return (
    <RewardzShell role="merchant">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Coupons</h1>
            <p className="mt-1 text-sm text-muted-navy">
              Issued <strong>{formatInt(issuedSum)}</strong> · Redeemed <strong>{formatInt(redeemedSum)}</strong> (
              {issuedSum === 0 ? "0%" : formatPct(redeemedSum / issuedSum, 1)} redemption)
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-bo-sidebar px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-bo-accent"
          >
            <Plus className="h-4 w-4" />
            Issue batch
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/5">
          <div className="overflow-x-auto">
            <table className="min-w-[800px] w-full text-sm">
              <thead className="bg-surface text-left text-xs font-semibold uppercase tracking-wide text-muted-navy">
                <tr>
                  <th className="px-4 py-3">Campaign</th>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3 text-right">Issued</th>
                  <th className="px-4 py-3 text-right">Redeemed</th>
                  <th className="px-4 py-3 text-right">Redemption</th>
                  <th className="px-4 py-3 text-right">Face value</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((c) => {
                  const rate = c.issued === 0 ? 0 : c.redeemed / c.issued;
                  return (
                    <tr key={c.id} className="border-t border-black/5">
                      <td className="px-4 py-3 font-medium text-black">{c.campaign}</td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-navy">{c.code}</td>
                      <td className="px-4 py-3 text-right">{formatInt(c.issued)}</td>
                      <td className="px-4 py-3 text-right">{formatInt(c.redeemed)}</td>
                      <td className="px-4 py-3 text-right font-semibold text-bo-sidebar">{formatPct(rate, 1)}</td>
                      <td className="px-4 py-3 text-right">{formatInr(c.faceValueInr)}</td>
                      <td className="px-4 py-3">
                        <StatusPill label={c.status} tone="active" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <SimpleDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Issue coupon batch"
        footer={
          <>
            <button type="button" className="rounded-btn border border-black/15 px-4 py-2 text-sm font-medium hover:bg-surface" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="button" className="rounded-btn bg-bo-sidebar px-4 py-2 text-sm font-semibold text-white hover:bg-bo-accent" onClick={submit}>
              Create batch
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="cp-camp">
              Campaign name
            </label>
            <input
              id="cp-camp"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-bo-sidebar focus:ring-2"
              placeholder="Festive stack"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="cp-code">
              Coupon code
            </label>
            <input
              id="cp-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 font-mono text-sm outline-none ring-bo-sidebar focus:ring-2"
              placeholder="SAVE20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="cp-issued">
              Issued count
            </label>
            <input
              id="cp-issued"
              inputMode="numeric"
              value={issued}
              onChange={(e) => setIssued(e.target.value)}
              className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-bo-sidebar focus:ring-2"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="cp-face">
              Face value (INR)
            </label>
            <input
              id="cp-face"
              inputMode="decimal"
              value={faceValueInr}
              onChange={(e) => setFaceValueInr(e.target.value)}
              className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-bo-sidebar focus:ring-2"
            />
          </div>
        </div>
      </SimpleDialog>
    </RewardzShell>
  );
}

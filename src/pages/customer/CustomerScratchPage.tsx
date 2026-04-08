import { ArrowLeft, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function CustomerScratchPage() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="space-y-6 pb-8">
      <Link to="/app" className="inline-flex items-center gap-1 text-sm font-semibold text-secondary">
        <ArrowLeft className="h-4 w-4" />
        Home
      </Link>
      <div>
        <h1 className="text-2xl font-bold text-black">Scratch &amp; win</h1>
        <p className="mt-1 text-sm text-muted-navy">One play per 24 hours (PRD §3.6).</p>
      </div>
      <button
        type="button"
        onClick={() => setRevealed(true)}
        className="relative w-full overflow-hidden rounded-2xl border-2 border-dashed border-primary/50 bg-gradient-to-br from-primary/20 to-white p-10 text-center shadow-card transition hover:border-primary"
      >
        {!revealed ? (
          <>
            <Sparkles className="mx-auto h-12 w-12 text-primary" />
            <p className="mt-4 font-semibold text-black">Tap to scratch</p>
            <p className="mt-1 text-sm text-muted-navy">Reveal today&apos;s reward</p>
          </>
        ) : (
          <div>
            <p className="text-sm font-semibold text-secondary">You won</p>
            <p className="mt-2 text-3xl font-bold text-black">₹25</p>
            <p className="mt-1 text-sm text-muted-navy">Cashback · credited to wallet (prototype)</p>
            <Link to="/app/cashback" className="mt-4 inline-block text-sm font-semibold text-secondary underline">
              View cashback
            </Link>
          </div>
        )}
      </button>
    </div>
  );
}

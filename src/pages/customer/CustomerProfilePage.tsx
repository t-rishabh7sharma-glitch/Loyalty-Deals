import { LogOut, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { mppsDataset } from "../../data/mpps";

export function CustomerProfilePage() {
  const { logout, state } = useAuth();
  const navigate = useNavigate();
  const name = mppsDataset.customer.profile.displayName;
  const user = state.status === "authenticated" ? state.username : "guest";

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-card">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-secondary">
          <UserRound className="h-7 w-7" />
        </div>
        <div>
          <p className="text-lg font-bold text-black">{name}</p>
          <p className="text-sm text-muted-navy capitalize">Signed in as {user}</p>
        </div>
      </div>
      <p className="text-sm text-muted-navy">
        Profile settings, cashback detail, and tier flow (PRD §3.2–3.4) would be expanded here in a full build.
      </p>
      <button
        type="button"
        onClick={() => {
          logout();
          navigate("/login", { replace: true });
        }}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 py-3.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </div>
  );
}

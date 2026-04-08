import { Building2, Shield, Store, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth, type UserRole } from "../contexts/AuthContext";
import { cn } from "../lib/cn";

const PORTALS: {
  role: UserRole;
  title: string;
  hint: string;
  icon: typeof Shield;
}[] = [
  { role: "admin", title: "Admin Console", hint: "admin123 / 1234", icon: Shield },
  { role: "merchant", title: "Merchant Console", hint: "merchant / 123", icon: Store },
  { role: "agent", title: "Agent Console", hint: "agent / 123", icon: Building2 },
  { role: "customer", title: "Customer App", hint: "customer / 123", icon: UserRound },
];

export function PortalPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-surface px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center text-2xl font-bold text-black">Switch Portal</h1>
        <p className="mt-2 text-center text-sm text-muted-navy">
          Loyalty &amp; Deals CRM Platform — pick a portal, then sign in with the matching test account.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {PORTALS.map((p) => (
            <button
              key={p.role}
              type="button"
              onClick={() => {
                logout();
                navigate("/login", { replace: true, state: { portalHint: p.hint, role: p.role } });
              }}
              className={cn(
                "flex flex-col items-start gap-3 rounded-2xl border border-black/5 bg-white p-5 text-left shadow-card ring-1 ring-black/5 transition hover:border-bo-sidebar/40 hover:shadow-md",
              )}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-bo-sidebar/10 text-bo-sidebar">
                <p.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-base font-bold text-black">{p.title}</p>
                <p className="mt-1 text-xs text-muted-navy">Login: {p.hint}</p>
              </div>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mx-auto mt-8 block text-sm font-medium text-bo-sidebar hover:underline"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

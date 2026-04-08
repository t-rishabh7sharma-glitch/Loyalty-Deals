import {
  ArrowLeft,
  Gem,
  LayoutDashboard,
  LayoutGrid,
  MapIcon,
  Menu,
  Package,
  Sparkles,
  Tag,
  Target,
  TicketPercent,
  Users,
  X,
} from "lucide-react";
import { useState, type ComponentType, type ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth, type UserRole } from "../../contexts/AuthContext";
import { mppsDataset } from "../../data/mpps";
import { cn } from "../../lib/cn";

export type BoRole = Exclude<UserRole, "customer">;

type NavDef = {
  to: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  end?: boolean;
};

const ADMIN_NAV: NavDef[] = [
  { to: "/admin", label: "Dashboard", icon: Gem, end: true },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/partners", label: "Partners", icon: Target },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: LayoutGrid },
  { to: "/admin/deals", label: "Deals", icon: Tag },
];

const MERCHANT_NAV: NavDef[] = [
  { to: "/merchant", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/merchant/products", label: "Products", icon: Package },
  { to: "/merchant/categories", label: "Categories", icon: LayoutGrid },
  { to: "/merchant/deals", label: "Deals", icon: Tag },
  { to: "/merchant/coupons", label: "Coupons", icon: TicketPercent },
];

const AGENT_NAV: NavDef[] = [
  { to: "/agent", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/agent/pipeline", label: "Pipeline", icon: MapIcon },
  { to: "/agent/monitor", label: "Deal Monitor", icon: Tag },
  { to: "/agent/merchants", label: "Merchants", icon: Target },
];

const NAV: Record<BoRole, NavDef[]> = {
  admin: ADMIN_NAV,
  merchant: MERCHANT_NAV,
  agent: AGENT_NAV,
};

const CONSOLE: Record<BoRole, string> = {
  admin: "Admin Console",
  merchant: "Merchant Console",
  agent: "Agent Console",
};

export function RewardzShell({ role, children }: { role: BoRole; children: ReactNode }) {
  const navigate = useNavigate();
  const { logout, state } = useAuth();
  const [open, setOpen] = useState(false);
  const nav = NAV[role];
  const profile =
    role === "admin"
      ? mppsDataset.profiles.admin
      : role === "merchant"
        ? mppsDataset.profiles.merchant
        : mppsDataset.profiles.agent;

  const usernameOk = state.status === "authenticated";

  return (
    <div className="flex min-h-screen bg-surface">
      <aside
        style={{ backgroundColor: "#4F46E5" }}
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-screen min-h-0 w-64 flex-col text-white shadow-lg ring-1 ring-black/10 transition-transform lg:static lg:h-auto lg:min-h-screen lg:translate-x-0",
          "bg-bo-sidebar",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold leading-tight text-white">Loyalty &amp; Deals CRM</p>
            <p className="text-xs text-white/75">{CONSOLE[role]}</p>
          </div>
        </div>

        <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-3">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end ?? true}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-white/25 text-white shadow-inner ring-1 ring-white/20"
                      : "text-white hover:bg-white/15 hover:text-white",
                  )
                }
              >
                <Icon className="h-4 w-4 shrink-0 text-white" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-xs font-bold text-white">
              {profile.initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{profile.name}</p>
              <p className="truncate text-xs text-white/70">{profile.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate("/portal")}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 px-3 py-2 text-xs font-medium text-white/95 hover:bg-white/10"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Switch Portal
          </button>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
            className="mt-2 w-full rounded-xl px-3 py-2 text-xs font-medium text-white/80 hover:bg-white/10"
          >
            Sign out
          </button>
          {!usernameOk ? (
            <p className="mt-2 text-[10px] text-white/50">Session: guest (prototype)</p>
          ) : null}
        </div>
      </aside>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-black/5 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
          <button
            type="button"
            className="rounded-lg p-2 text-bo-sidebar hover:bg-surface"
            onClick={() => setOpen((s) => !s)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <p className="text-sm font-bold text-black">Loyalty &amp; Deals</p>
        </header>
        <main className="flex-1 px-4 py-6 lg:px-10 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

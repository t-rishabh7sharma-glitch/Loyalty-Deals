import { Bell, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth, type UserRole } from "../../contexts/AuthContext";
import { cn } from "../../lib/cn";

type NavItem = { to: string; label: string };

const NAV_BY_ROLE: Record<UserRole, NavItem[]> = {
  admin: [
    { to: "/admin", label: "Dashboard" },
    { to: "/admin/users", label: "Users" },
    { to: "/admin/partners", label: "Partners" },
    { to: "/admin/deals", label: "Deals" },
  ],
  merchant: [
    { to: "/merchant", label: "Dashboard" },
    { to: "/merchant/products", label: "Products" },
    { to: "/merchant/deals", label: "Deals" },
  ],
  agent: [
    { to: "/agent", label: "Dashboard" },
    { to: "/agent/pipeline", label: "Pipeline" },
    { to: "/agent/monitor", label: "Deal Monitor" },
  ],
  customer: [],
};

const ROLE_LABEL: Record<UserRole, string> = {
  admin: "Admin",
  merchant: "Merchant",
  agent: "Agent",
  customer: "Customer",
};

export function BOLayout({
  role,
  title,
  badge,
  children,
}: {
  role: Exclude<UserRole, "customer">;
  title: string;
  badge?: string;
  children: ReactNode;
}) {
  const { state, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const nav = NAV_BY_ROLE[role];

  const displayName =
    state.status === "authenticated" ? state.username : "Guest";

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar — desktop */}
      <aside
        style={{ backgroundColor: "#002970" }}
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-screen min-h-0 w-64 flex-col bg-secondary text-white shadow-xl ring-1 ring-black/20 transition-transform md:static md:h-auto md:min-h-screen md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-secondary shadow-sm">
            LD
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-snug">Loyalty &amp; Deals CRM Platform</p>
            <p className="text-xs text-white/70">Admin &amp; operations</p>
          </div>
        </div>
        <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-3">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center rounded-btn border-l-[3px] py-2.5 pl-2 pr-3 text-sm font-semibold transition-colors",
                  isActive
                    ? "border-primary bg-primary text-secondary shadow-sm"
                    : "border-transparent text-white/90 hover:bg-white/10",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">
              {displayName.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium capitalize">{displayName}</p>
              <p className="text-xs text-white/70">{ROLE_LABEL[role]}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate("/portal")}
            className="mt-3 w-full rounded-btn border border-white/25 px-3 py-2 text-xs font-medium text-white hover:bg-white/10"
          >
            ← Switch portal
          </button>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
            className="mt-2 w-full rounded-btn border border-white/20 px-3 py-2 text-xs font-medium text-white/90 hover:bg-white/10"
          >
            Sign out
          </button>
        </div>
      </aside>

      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div className="flex min-h-screen flex-1 flex-col md:pl-0">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-black/5 bg-white px-4 py-3 md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              className="rounded-btn p-2 text-secondary hover:bg-surface md:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold text-black md:text-xl">{title}</h1>
              {badge ? (
                <span className="mt-1 inline-flex rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-secondary">
                  {badge}
                </span>
              ) : null}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p className="hidden text-xs text-muted-navy sm:block">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 align-middle" />{" "}
              Last sync {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            </p>
            <button
              type="button"
              className="rounded-btn p-2 text-secondary hover:bg-surface"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}

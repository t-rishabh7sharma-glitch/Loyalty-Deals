import { Home, LayoutGrid, Ticket, User } from "lucide-react";
import { NavLink, Outlet, useLocation as useRouterLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LocationProvider } from "../../contexts/LocationContext";
import { mppsDataset } from "../../data/mpps";
import { cn } from "../../lib/cn";

const tabs = [
  { to: "/app", label: "Home", icon: Home, end: true },
  { to: "/app/browse", label: "Browse", icon: LayoutGrid, end: false },
  { to: "/app/coupons", label: "Coupons", icon: Ticket, end: false },
  { to: "/app/profile", label: "Profile", icon: User, end: false },
];

function tabClassName(isActive: boolean, desktop?: boolean) {
  if (desktop) {
    return cn(
      "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors",
      isActive ? "bg-primary/15 text-secondary" : "text-muted-navy hover:bg-black/[0.04] hover:text-black",
    );
  }
  return cn(
    "flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 transition-colors",
    isActive ? "text-secondary" : "text-muted-navy",
  );
}

export function CustomerLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useRouterLocation();
  const brand = mppsDataset.customer.appBranding;

  return (
    <LocationProvider>
    <div className="min-h-screen bg-[#EEF2F7] md:bg-gradient-to-b md:from-secondary/[0.06] md:via-surface md:to-surface">
      <header className="sticky top-0 z-30 hidden border-b border-black/[0.06] bg-white/95 shadow-sm backdrop-blur-md md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-8 py-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold uppercase tracking-wider text-primary">{brand}</p>
            <p className="truncate text-base font-bold text-secondary">Customer app</p>
          </div>

          <nav className="flex items-center gap-1" aria-label="Main">
            {tabs.map((tab) => (
              <NavLink key={tab.to} to={tab.to} end={tab.end} className={({ isActive }) => tabClassName(isActive, true)}>
                {({ isActive }) => (
                  <>
                    <tab.icon className={cn("h-4 w-4", isActive && "stroke-[2.5px]")} />
                    {tab.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className="shrink-0 rounded-xl border border-secondary/20 px-4 py-2 text-xs font-semibold text-secondary hover:bg-primary/10"
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
          >
            Sign out
          </button>
        </div>
      </header>

      <div
        className={cn(
          "mx-auto w-full max-w-6xl px-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-1 md:px-8 md:pb-10 md:pt-8",
          location.pathname === "/app" && "pt-0 md:pt-8",
        )}
      >
        <Outlet />
      </div>

      <nav
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-black/[0.08] bg-white pb-[max(0.35rem,env(safe-area-inset-bottom))] pt-1 shadow-[0_-8px_30px_rgba(0,41,112,0.12)] md:hidden"
        aria-label="Main"
      >
        <div className="mx-auto flex max-w-lg px-2">
          {tabs.map((tab) => (
            <NavLink key={tab.to} to={tab.to} end={tab.end} className={({ isActive }) => tabClassName(isActive, false)}>
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-2xl transition-colors",
                      isActive ? "bg-primary/20 text-secondary" : "bg-transparent text-muted-navy",
                    )}
                  >
                    <tab.icon className={cn("h-5 w-5", isActive && "stroke-[2.5px]")} />
                  </span>
                  <span className={cn("text-[10px] font-semibold leading-none", isActive && "text-secondary")}>{tab.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
    </LocationProvider>
  );
}

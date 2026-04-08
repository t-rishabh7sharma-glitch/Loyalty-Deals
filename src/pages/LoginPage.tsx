import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth, type UserRole } from "../contexts/AuthContext";

const ROLE_HOME: Record<UserRole, string> = {
  admin: "/admin",
  merchant: "/merchant",
  agent: "/agent",
  customer: "/app",
};

export function LoginPage() {
  const { login, state } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string }; portalHint?: string })?.from?.pathname;
  const portalHint = (location.state as { portalHint?: string } | null)?.portalHint;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (state.status === "authenticated") {
      navigate(from ?? ROLE_HOME[state.role], { replace: true });
    }
  }, [state, navigate, from]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const ok = login(username, password);
    if (!ok) {
      setError("Invalid credentials. Use admin123 / 1234, merchant / 123, agent / 123, or customer / 123.");
      return;
    }
  };

  const quick = (u: string, p: string) => {
    setError(null);
    setUsername(u);
    setPassword(p);
    if (login(u, p)) {
      const role: UserRole =
        u.toLowerCase() === "admin123"
          ? "admin"
          : u === "merchant"
            ? "merchant"
            : u === "agent"
              ? "agent"
              : "customer";
      navigate(ROLE_HOME[role], { replace: true });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-12">
      <div className="w-full max-w-md rounded-card border border-black/5 bg-white p-8 shadow-card">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-card bg-primary text-lg font-bold text-secondary shadow-sm">
            LD
          </div>
          <h1 className="text-xl font-bold text-black">Sign in</h1>
          <p className="mt-1 text-sm text-muted-navy">Loyalty &amp; Deals CRM Platform</p>
          {portalHint ? (
            <p className="mt-2 rounded-lg bg-surface px-3 py-2 text-xs text-muted-navy">
              Suggested account: <span className="font-semibold text-black">{portalHint}</span>
            </p>
          ) : null}
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="user">
              User ID
            </label>
            <input
              id="user"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-primary focus:ring-2"
              placeholder="e.g. admin123"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-navy" htmlFor="pass">
              Password
            </label>
            <input
              id="pass"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-btn border border-black/10 px-3 py-2 text-sm outline-none ring-primary focus:ring-2"
              placeholder="••••"
            />
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            className="w-full rounded-btn bg-bo-sidebar py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-bo-accent"
          >
            Continue
          </button>
        </form>

        <div className="mt-6 border-t border-black/5 pt-6">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-navy">
            Quick login (prototype)
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className="rounded-btn border border-black/10 bg-surface px-3 py-2 text-xs font-medium text-black hover:border-bo-sidebar/40"
              onClick={() => quick("admin123", "1234")}
            >
              Admin
            </button>
            <button
              type="button"
              className="rounded-btn border border-black/10 bg-surface px-3 py-2 text-xs font-medium text-black hover:border-bo-sidebar/40"
              onClick={() => quick("merchant", "123")}
            >
              Merchant
            </button>
            <button
              type="button"
              className="rounded-btn border border-black/10 bg-surface px-3 py-2 text-xs font-medium text-black hover:border-bo-sidebar/40"
              onClick={() => quick("agent", "123")}
            >
              Agent
            </button>
            <button
              type="button"
              className="rounded-btn border border-black/10 bg-surface px-3 py-2 text-xs font-medium text-black hover:border-bo-sidebar/40"
              onClick={() => quick("customer", "123")}
            >
              Customer
            </button>
          </div>
          <button
            type="button"
            onClick={() => navigate("/portal")}
            className="mt-4 w-full text-center text-xs font-medium text-bo-sidebar hover:underline"
          >
            Switch portal
          </button>
        </div>
      </div>
    </div>
  );
}

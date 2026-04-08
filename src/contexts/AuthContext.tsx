import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type UserRole = "admin" | "merchant" | "agent" | "customer";

type AuthState =
  | { status: "anonymous" }
  | { status: "authenticated"; role: UserRole; username: string };

type AuthContextValue = {
  state: AuthState;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const STORAGE_KEY = "ldcrm-auth-v1";

const ACCOUNTS: Record<string, { password: string; role: UserRole }> = {
  admin123: { password: "1234", role: "admin" },
  merchant: { password: "123", role: "merchant" },
  agent: { password: "123", role: "agent" },
  customer: { password: "123", role: "customer" },
};

function loadStored(): AuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { status: "anonymous" };
    const parsed = JSON.parse(raw) as { role: UserRole; username: string };
    return { status: "authenticated", role: parsed.role, username: parsed.username };
  } catch {
    return { status: "anonymous" };
  }
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() =>
    typeof window === "undefined" ? { status: "anonymous" } : loadStored(),
  );

  const login = useCallback((username: string, password: string) => {
    const key = username.trim().toLowerCase();
    const acc = ACCOUNTS[key];
    if (!acc || acc.password !== password) return false;
    const next: AuthState = { status: "authenticated", role: acc.role, username: key };
    setState(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ role: acc.role, username: key }));
    return true;
  }, []);

  const logout = useCallback(() => {
    setState({ status: "anonymous" });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(() => ({ state, login, logout }), [state, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

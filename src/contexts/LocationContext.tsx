import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { MapPin, Navigation } from "lucide-react";
import { mppsDataset } from "../data/mpps";

type LocationStatus = "idle" | "prompting" | "loading" | "granted" | "denied";

type Coords = { lat: number; lng: number; label: string };

type LocationContextValue = {
  status: LocationStatus;
  coords: Coords;
  requestLocation: () => void;
  dismiss: () => void;
};

const fallback: Coords = {
  lat: mppsDataset.customer.profile.lat,
  lng: mppsDataset.customer.profile.lng,
  label: mppsDataset.customer.profile.locationLabel,
};

const LocationContext = createContext<LocationContextValue | null>(null);

function reverseGeocode(lat: number, lng: number): Promise<string> {
  return fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=16&addressdetails=1`,
    { headers: { "Accept-Language": "en" } },
  )
    .then((r) => r.json())
    .then((data) => {
      const a = data.address ?? {};
      const parts = [
        a.neighbourhood || a.suburb || a.hamlet || "",
        a.city || a.town || a.village || a.county || "",
      ].filter(Boolean);
      return parts.length ? parts.join(", ") : data.display_name?.split(",").slice(0, 2).join(",") || fallback.label;
    })
    .catch(() => fallback.label);
}

export function LocationProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<LocationStatus>("idle");
  const [coords, setCoords] = useState<Coords>(fallback);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === "idle") setStatus("prompting");
    }, 600);
    return () => clearTimeout(timer);
  }, [status]);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus("denied");
      return;
    }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const label = await reverseGeocode(latitude, longitude);
        setCoords({ lat: latitude, lng: longitude, label });
        setStatus("granted");
      },
      () => {
        setStatus("denied");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  const dismiss = useCallback(() => {
    setStatus("denied");
  }, []);

  const value = useMemo(
    () => ({ status, coords, requestLocation, dismiss }),
    [status, coords, requestLocation, dismiss],
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
      {status === "prompting" && (
        <LocationPrompt onAllow={requestLocation} onDeny={dismiss} />
      )}
      {status === "loading" && <LocationLoading />}
    </LocationContext.Provider>
  );
}

export function useLocation(): LocationContextValue {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocation must be used within LocationProvider");
  return ctx;
}

function LocationPrompt({ onAllow, onDeny }: { onAllow: () => void; onDeny: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative z-10 mt-auto w-full max-w-sm animate-[slideUp_0.35s_ease-out] rounded-t-3xl bg-white p-6 shadow-2xl sm:mt-0 sm:rounded-3xl">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-200">
            <Navigation className="h-7 w-7 text-white" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-gray-900">
            Enable location access
          </h2>
          <p className="mt-2 max-w-[260px] text-sm leading-relaxed text-gray-500">
            Allow <span className="font-semibold text-gray-700">Rewardz</span> to access your
            location so we can show deals and merchants near you.
          </p>

          <div className="mt-5 flex w-full items-center gap-2 rounded-xl bg-blue-50 px-3 py-2.5 text-left">
            <MapPin className="h-4 w-4 shrink-0 text-blue-600" />
            <span className="text-xs leading-snug text-blue-800">
              Your location is only used during this session and is never stored.
            </span>
          </div>

          <button
            type="button"
            onClick={onAllow}
            className="mt-6 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-200 transition hover:shadow-lg active:scale-[0.98]"
          >
            Allow location access
          </button>

          <button
            type="button"
            onClick={onDeny}
            className="mt-2 w-full rounded-2xl py-3 text-sm font-semibold text-gray-400 transition hover:bg-gray-50 hover:text-gray-600"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}

function LocationLoading() {
  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative z-10 mt-auto w-full max-w-sm rounded-t-3xl bg-white p-6 shadow-2xl sm:mt-0 sm:rounded-3xl">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
            <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-blue-200 border-t-blue-600" />
          </div>
          <h2 className="mt-5 text-lg font-bold text-gray-900">Finding your location…</h2>
          <p className="mt-2 text-sm text-gray-500">
            Please allow access when your browser asks.
          </p>
        </div>
      </div>
    </div>
  );
}

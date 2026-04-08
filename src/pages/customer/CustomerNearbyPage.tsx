import { MapPin, Navigation, LocateFixed } from "lucide-react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Circle, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import { mppsDataset } from "../../data/mpps";
import { useLocation } from "../../contexts/LocationContext";
import { CustomerDealIcon } from "./customerIcons";

import "leaflet/dist/leaflet.css";

const RADIUS_KM = 10;
const RADIUS_M = RADIUS_KM * 1000;

function customerIcon() {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:38px;height:38px;border-radius:50%;
      background:linear-gradient(135deg,#3b82f6,#1e40af);
      border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,.35);
      display:flex;align-items:center;justify-content:center;
    "><svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><circle cx='12' cy='12' r='3'/></svg></div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
  });
}

function dealIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:32px;height:32px;border-radius:50%;
      background:${color};
      border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3);
      display:flex;align-items:center;justify-content:center;
    "><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='white' stroke='white' stroke-width='0'><path d='M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z'/><line x1='7' y1='7' x2='7.01' y2='7' stroke='${color}' stroke-width='3' stroke-linecap='round'/></svg></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], map.getZoom(), { duration: 0.8 });
  }, [lat, lng, map]);
  return null;
}

function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  map.flyTo([lat, lng], 14, { duration: 0.8 });
  return null;
}

export function CustomerNearbyPage() {
  const { nearbyDeals } = mppsDataset.customer;
  const { coords, status, requestLocation } = useLocation();

  const customerLat = coords.lat;
  const customerLng = coords.lng;
  const locationLabel = coords.label;
  const isLive = status === "granted";

  const [flyTarget, setFlyTarget] = useState<{ lat: number; lng: number } | null>(null);

  return (
    <div className="space-y-4 pb-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
          <MapPin className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-black">Deals nearby</h1>
          <p className="truncate text-sm text-muted-navy">
            Within ~{RADIUS_KM} km · {locationLabel}
            {isLive && <span className="ml-1 inline-block h-2 w-2 rounded-full bg-green-500" title="Live location" />}
          </p>
        </div>
        {status === "denied" && (
          <button
            type="button"
            onClick={requestLocation}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
          >
            <LocateFixed className="h-3.5 w-3.5" />
            Use my location
          </button>
        )}
      </div>

      {/* Location status banner */}
      {status === "denied" && (
        <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-800">
          <MapPin className="h-4 w-4 shrink-0 text-amber-500" />
          <span>Showing default location. Tap <strong>Use my location</strong> for deals near you.</span>
        </div>
      )}

      {/* Map */}
      <div className="relative overflow-hidden rounded-2xl border border-black/[0.08] shadow-card">
        <div className="h-[340px] w-full sm:h-[400px]">
          <MapContainer
            center={[customerLat, customerLng]}
            zoom={13}
            scrollWheelZoom={true}
            className="h-full w-full z-0"
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <RecenterMap lat={customerLat} lng={customerLng} />
            {flyTarget && <FlyTo lat={flyTarget.lat} lng={flyTarget.lng} />}

            <Circle
              center={[customerLat, customerLng]}
              radius={RADIUS_M}
              pathOptions={{
                color: "#3b82f6",
                fillColor: "#3b82f6",
                fillOpacity: 0.06,
                weight: 2,
                dashArray: "6 4",
              }}
            />

            <Marker position={[customerLat, customerLng]} icon={customerIcon()}>
              <Popup>
                <span className="font-semibold">You are here</span>
                <br />
                <span className="text-xs text-gray-500">{locationLabel}</span>
              </Popup>
            </Marker>

            {nearbyDeals.map((d) => (
              <Marker key={d.dealId} position={[d.lat, d.lng]} icon={dealIcon(d.color)}>
                <Popup>
                  <div className="min-w-[140px]">
                    <p className="font-bold text-sm">{d.merchant}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{d.title}</p>
                    <span className="inline-block mt-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-600">{d.discountLabel}</span>
                    <p className="text-[10px] text-gray-400 mt-1">{d.distanceKm} km away</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <button
          type="button"
          onClick={() => setFlyTarget({ lat: customerLat, lng: customerLng })}
          className="absolute bottom-3 right-3 z-[500] flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg border border-black/10 hover:bg-gray-50 transition"
          title="Center on my location"
        >
          <Navigation className="h-4 w-4 text-blue-600" />
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl bg-white/80 border border-black/5 px-3 py-2 text-xs text-muted-navy">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-800 ring-2 ring-white" />
          Your location
        </span>
        {nearbyDeals.map((d) => (
          <span key={d.dealId} className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full ring-2 ring-white" style={{ background: d.color }} />
            {d.merchant}
          </span>
        ))}
      </div>

      {/* Deal cards */}
      <h2 className="text-base font-bold text-black">Nearby deals</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {nearbyDeals.map((d) => (
          <Link
            key={d.dealId}
            to={`/app/deals/${d.dealId}`}
            className="flex flex-col rounded-2xl border border-black/5 bg-white p-4 shadow-card transition hover:border-primary/30"
            onMouseEnter={() => setFlyTarget({ lat: d.lat, lng: d.lng })}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full ring-2 ring-white shadow" style={{ background: d.color }} />
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50">
                  <CustomerDealIcon name={d.icon} className="h-5 w-5 text-sky-700" />
                </div>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-muted-navy">{d.distanceKm} km</span>
            </div>
            <p className="mt-3 font-bold text-black">{d.merchant}</p>
            <p className="mt-1 text-sm text-muted-navy line-clamp-2">{d.title}</p>
            <span className="mt-3 inline-flex w-fit rounded-full bg-bo-orange/15 px-2.5 py-1 text-xs font-bold text-bo-orange">{d.discountLabel}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

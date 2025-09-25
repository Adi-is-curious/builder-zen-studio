import { useEffect, useMemo, useRef, useState } from "react";
import AppLayout from "@/components/common/AppLayout";
import { getInitialLocale, tFor, type Locale } from "@/lib/i18n";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import type { LeafletMouseEvent } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const CATEGORIES = ["pothole", "garbage", "streetlight", "water", "drainage", "encroachment"] as const;

type LatLng = { lat: number; lng: number };

function LocationPicker({ value, onChange }: { value: LatLng | null; onChange: (v: LatLng) => void }) {
  useMapEvents({
    click: (e: LeafletMouseEvent) => onChange({ lat: e.latlng.lat, lng: e.latlng.lng }),
  });
  return value ? <Marker position={[value.lat, value.lng]} /> : null;
}

export default function Report() {
  const [locale, setLocale] = useState<Locale>("en");
  useEffect(() => {
    setLocale(getInitialLocale());
    const handler = (e: any) => setLocale(e.detail);
    window.addEventListener("locale-changed", handler as any);
    return () => window.removeEventListener("locale-changed", handler as any);
  }, []);
  const t = tFor(locale);

  const [photo, setPhoto] = useState<File | null>(null);
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState<typeof CATEGORIES[number]>("pothole");
  const [urgent, setUrgent] = useState(false);
  const [anon, setAnon] = useState(false);
  const [pos, setPos] = useState<LatLng | null>(null);

  const defaultCenter = useMemo<LatLng>(() => ({ lat: 23.36, lng: 85.33 }), []); // Ranchi approx

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { photo: photo?.name ?? null, desc, category: cat, urgent, anonymous: anon, location: pos };
    console.log("submit-issue", payload);
    alert("Issue saved locally (stub). Integrate backend to persist.");
  };

  return (
    <AppLayout>
      <form onSubmit={submit} className="space-y-4">
        <h1 className="text-lg font-semibold">{t("report_issue")}</h1>

        <div className="space-y-1">
          <label className="text-xs font-medium">{t("optional_photo")}</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
            className="block w-full rounded-md border bg-white p-2 text-sm file:mr-3 file:rounded file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-primary-foreground hover:file:bg-primary/90"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium" htmlFor="desc">{t("description")}</label>
          <textarea
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={3}
            className="w-full rounded-md border bg-white p-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 dark:bg-neutral-900"
            placeholder={t("description")}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium" htmlFor="cat">{t("category")}</label>
          <select
            id="cat"
            value={cat}
            onChange={(e) => setCat(e.target.value as any)}
            className="w-full rounded-md border bg-white p-2 text-sm dark:bg-neutral-900"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {t(c as any)}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium">{t("location")}</label>
          <div className="overflow-hidden rounded-md border">
            <MapContainer center={[defaultCenter.lat, defaultCenter.lng]} zoom={12} className="h-56 w-full">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationPicker value={pos} onChange={setPos} />
            </MapContainer>
          </div>
          <div className="text-[11px] text-neutral-500">{t("select_on_map")}</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center gap-2 rounded-md border bg-white p-3 text-sm dark:bg-neutral-900">
            <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} />
            {t("urgency")}
          </label>
          <label className="flex items-center gap-2 rounded-md border bg-white p-3 text-sm dark:bg-neutral-900">
            <input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} />
            {t("anonymous")}
          </label>
        </div>

        <button type="submit" className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90">
          {t("submit_issue")}
        </button>
      </form>
    </AppLayout>
  );
}

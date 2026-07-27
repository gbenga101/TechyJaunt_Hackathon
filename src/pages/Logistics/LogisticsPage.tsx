import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Warehouse,
  Truck,
  Phone,
  Clock,
  ChevronRight,
  X,
  CheckCircle,
  AlertTriangle,
  Loader2,
  MapPin,
  Package,
} from "lucide-react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import {
  listStorageFacilities,
  listTransporters,
  bookStorage,
  createTransportRequest,
} from "@/services/api/logistics";
import type {
  StorageFacility,
  Transporter,
  BookStoragePayload,
  StorageStatus,
} from "@/types/logistics";

// ─── Helpers ────────────────────────────────────────────────────────────────

const today = new Date().toISOString().split("T")[0];
const tomorrow = new Date(Date.now() + 86_400_000).toISOString().split("T")[0];

function capacityPercent(f: StorageFacility) {
  return Math.round(
    ((f.capacityTotal - f.capacityAvailable) / f.capacityTotal) * 100
  );
}

const STATUS_STYLES: Record<
  StorageStatus,
  { label: string; pill: string; bar: string }
> = {
  available: {
    label: "Available",
    pill: "bg-green-100 text-green-700",
    bar: "bg-green-500",
  },
  limited: {
    label: "Limited",
    pill: "bg-amber-100 text-amber-700",
    bar: "bg-amber-500",
  },
  full: {
    label: "Full",
    pill: "bg-red-100 text-red-600",
    bar: "bg-red-500",
  },
};

// ─── Storage booking modal ───────────────────────────────────────────────────

interface BookModalProps {
  facility: StorageFacility;
  onClose: () => void;
}

function BookModal({ facility, onClose }: BookModalProps) {
  const qc = useQueryClient();
  const [form, setForm] = useState<BookStoragePayload>({
    quantity: 10,
    startDate: today,
    endDate: tomorrow,
  });
  const [success, setSuccess] = useState<string | null>(null);

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => bookStorage(facility.id, form),
    onSuccess: (booking) => {
      setSuccess(booking.confirmation);
      qc.invalidateQueries({ queryKey: ["storage"] });
    },
  });

  const errMsg = error instanceof Error ? error.message : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center
        bg-black/40 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-6 shadow-xl space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-bold text-gray-900 text-base">{facility.name}</h2>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
              <MapPin size={11} /> {facility.location}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <CheckCircle size={40} className="text-green-500" />
            <p className="font-semibold text-gray-800">{success}</p>
            <button
              onClick={onClose}
              className="mt-2 bg-[#1a3a2a] text-white font-semibold px-6 py-2.5 rounded-full text-sm"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600">
              <span className="font-medium">₦{facility.pricePerUnit}</span> / unit ·{" "}
              <span className="font-medium">{facility.capacityAvailable}</span> units
              available
            </p>

            {/* Quantity */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">
                Quantity (units)
              </label>
              <input
                type="number"
                min={1}
                max={facility.capacityAvailable}
                value={form.quantity}
                onChange={(e) =>
                  setForm((f) => ({ ...f, quantity: Number(e.target.value) }))
                }
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm
                  focus:outline-none focus:ring-2 focus:ring-[#1a3a2a]/30 focus:border-[#1a3a2a]"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600">Start date</label>
                <input
                  type="date"
                  value={form.startDate}
                  min={today}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, startDate: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#1a3a2a]/30 focus:border-[#1a3a2a]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600">End date</label>
                <input
                  type="date"
                  value={form.endDate}
                  min={form.startDate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, endDate: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#1a3a2a]/30 focus:border-[#1a3a2a]"
                />
              </div>
            </div>

            {/* Total estimate */}
            <p className="text-xs text-gray-500">
              Estimated cost:{" "}
              <span className="font-semibold text-gray-800">
                ₦{(form.quantity * facility.pricePerUnit).toLocaleString()}
              </span>
            </p>

            {errMsg && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-xl">
                <AlertTriangle size={14} /> {errMsg}
              </div>
            )}

            <button
              onClick={() => mutate()}
              disabled={isPending || facility.status === "full"}
              className="w-full flex items-center justify-center gap-2 bg-[#1a3a2a] hover:bg-[#153020]
                disabled:opacity-50 text-white font-semibold py-3 rounded-full transition-colors text-sm"
            >
              {isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Warehouse size={16} />
              )}
              {isPending ? "Booking…" : "Confirm Booking"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Transport request modal ─────────────────────────────────────────────────

interface TransportModalProps {
  transporter: Transporter;
  onClose: () => void;
}

function TransportModal({ transporter, onClose }: TransportModalProps) {
  const [form, setForm] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    produce: "Tomatoes",
    quantity: 50,
    unit: "crates",
  });
  const [success, setSuccess] = useState<string | null>(null);

  const { mutate, isPending, error } = useMutation({
    mutationFn: () =>
      createTransportRequest({
        pickupLocation: form.pickupLocation,
        dropoffLocation: form.dropoffLocation,
        produceDetails: {
          produce: form.produce,
          quantity: form.quantity,
          unit: form.unit,
        },
      }),
    onSuccess: (req) => {
      setSuccess(
        req.status === "accepted"
          ? `Request accepted! ${transporter.name} will handle your delivery.`
          : "Request submitted — we'll assign a transporter shortly."
      );
    },
  });

  const errMsg = error instanceof Error ? error.message : null;
  const valid =
    form.pickupLocation.trim().length > 0 &&
    form.dropoffLocation.trim().length > 0 &&
    form.quantity > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center
        bg-black/40 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-6 shadow-xl space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-bold text-gray-900 text-base">{transporter.name}</h2>
            <p className="text-xs text-gray-500">{transporter.vehicleType} · {transporter.capacity.toLocaleString()} kg capacity</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <CheckCircle size={40} className="text-green-500" />
            <p className="font-semibold text-gray-800">{success}</p>
            <button
              onClick={onClose}
              className="mt-2 bg-[#c0392b] text-white font-semibold px-6 py-2.5 rounded-full text-sm"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600">Pickup location</label>
                <input
                  type="text"
                  placeholder="e.g. Wuse, Abuja"
                  value={form.pickupLocation}
                  onChange={(e) => setForm((f) => ({ ...f, pickupLocation: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#c0392b]/30 focus:border-[#c0392b]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600">Dropoff location</label>
                <input
                  type="text"
                  placeholder="e.g. Ikeja, Lagos"
                  value={form.dropoffLocation}
                  onChange={(e) => setForm((f) => ({ ...f, dropoffLocation: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#c0392b]/30 focus:border-[#c0392b]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">Produce</label>
                  <input
                    type="text"
                    value={form.produce}
                    onChange={(e) => setForm((f) => ({ ...f, produce: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm
                      focus:outline-none focus:ring-2 focus:ring-[#c0392b]/30 focus:border-[#c0392b]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">Quantity</label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      min={1}
                      value={form.quantity}
                      onChange={(e) => setForm((f) => ({ ...f, quantity: Number(e.target.value) }))}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm
                        focus:outline-none focus:ring-2 focus:ring-[#c0392b]/30 focus:border-[#c0392b]"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600">Unit</label>
                <select
                  value={form.unit}
                  onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#c0392b]/30 focus:border-[#c0392b] bg-white"
                >
                  {["crates", "bags", "baskets", "tons", "kg"].map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
            </div>

            {errMsg && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-xl">
                <AlertTriangle size={14} /> {errMsg}
              </div>
            )}

            <button
              onClick={() => mutate()}
              disabled={isPending || !valid}
              className="w-full flex items-center justify-center gap-2 bg-[#c0392b] hover:bg-[#a93226]
                disabled:opacity-50 text-white font-semibold py-3 rounded-full transition-colors text-sm"
            >
              {isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Truck size={16} />
              )}
              {isPending ? "Submitting…" : "Request Transport"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Storage facility card ───────────────────────────────────────────────────

function FacilityCard({
  facility,
  onBook,
}: {
  facility: StorageFacility;
  onBook: () => void;
}) {
  const s = STATUS_STYLES[facility.status];
  const pct = capacityPercent(facility);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#1a3a2a]/10 flex items-center justify-center shrink-0">
            <Warehouse size={20} className="text-[#1a3a2a]" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm leading-snug">{facility.name}</p>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
              <MapPin size={10} className="shrink-0" /> {facility.location}
            </p>
          </div>
        </div>
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${s.pill}`}>
          {s.label}
        </span>
      </div>

      {/* Capacity bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] text-gray-400 font-medium">
          <span>{facility.capacityAvailable.toLocaleString()} units free</span>
          <span>{pct}% used</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${s.bar}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
        <div className="flex items-center gap-1.5">
          <Phone size={11} className="text-gray-400 shrink-0" />
          {facility.contactPhone}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={11} className="text-gray-400 shrink-0" />
          {facility.operatingHours}
        </div>
        <div className="flex items-center gap-1.5 col-span-2">
          <Package size={11} className="text-gray-400 shrink-0" />
          ₦{facility.pricePerUnit} / unit · {facility.capacityTotal.toLocaleString()} total capacity
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onBook}
        disabled={facility.status === "full"}
        className="w-full flex items-center justify-center gap-2 bg-[#1a3a2a] hover:bg-[#153020]
          disabled:opacity-40 disabled:cursor-not-allowed
          text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
      >
        <Warehouse size={15} />
        {facility.status === "full" ? "No Space Available" : "Book Storage"}
      </button>
    </div>
  );
}

// ─── Transporter card ────────────────────────────────────────────────────────

function TransporterCard({
  transporter,
  onRequest,
}: {
  transporter: Transporter;
  onRequest: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#c0392b]/10 flex items-center justify-center shrink-0">
            <Truck size={20} className="text-[#c0392b]" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm leading-snug">{transporter.name}</p>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
              <MapPin size={10} className="shrink-0" /> {transporter.location}
            </p>
          </div>
        </div>
        <span
          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${
            transporter.isAvailable
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {transporter.isAvailable ? "Available" : "Busy"}
        </span>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
        <div className="flex items-center gap-1.5">
          <Truck size={11} className="text-gray-400 shrink-0" />
          {transporter.vehicleType}
        </div>
        <div className="flex items-center gap-1.5">
          <Package size={11} className="text-gray-400 shrink-0" />
          {transporter.capacity.toLocaleString()} kg
        </div>
        <div className="flex items-center gap-1.5 col-span-2">
          <Phone size={11} className="text-gray-400 shrink-0" />
          {transporter.contactPhone}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onRequest}
        disabled={!transporter.isAvailable}
        className="w-full flex items-center justify-center gap-2 bg-[#c0392b] hover:bg-[#a93226]
          disabled:opacity-40 disabled:cursor-not-allowed
          text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
      >
        <ChevronRight size={15} />
        {transporter.isAvailable ? "Request Transport" : "Currently Unavailable"}
      </button>
    </div>
  );
}

// ─── Skeleton loader ─────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3 animate-pulse">
      <div className="flex gap-3">
        <div className="h-10 w-10 rounded-xl bg-gray-100" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 bg-gray-100 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
        </div>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full" />
      <div className="grid grid-cols-2 gap-2">
        <div className="h-3 bg-gray-100 rounded" />
        <div className="h-3 bg-gray-100 rounded" />
        <div className="h-3 bg-gray-100 rounded col-span-2" />
      </div>
      <div className="h-9 bg-gray-100 rounded-xl" />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────

type Tab = "storage" | "transport";

export default function LogisticsPage() {
  const [tab, setTab] = useState<Tab>("storage");
  const [bookingFacility, setBookingFacility] = useState<StorageFacility | null>(null);
  const [requestTransporter, setRequestTransporter] = useState<Transporter | null>(null);

  const {
    data: facilities,
    isLoading: loadingStorage,
    error: storageError,
    refetch: refetchStorage,
  } = useQuery({
    queryKey: ["storage"],
    queryFn: listStorageFacilities,
    staleTime: 60_000,
  });

  const {
    data: transporters,
    isLoading: loadingTransport,
    error: transportError,
    refetch: refetchTransport,
  } = useQuery({
    queryKey: ["transporters"],
    queryFn: listTransporters,
    staleTime: 60_000,
  });

  const isLoading = tab === "storage" ? loadingStorage : loadingTransport;
  const fetchError = tab === "storage" ? storageError : transportError;
  const refetch = tab === "storage" ? refetchStorage : refetchTransport;

  return (
    <div className="min-h-screen bg-[#faf9f7] font-sans">
      <TopBar />

      <main className="px-4 sm:px-6 lg:px-8 pt-5 pb-28 max-w-4xl mx-auto space-y-5">

        {/* ── Page heading ──────────────────────────────────── */}
        <section>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Logistics</h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Book storage space or arrange transport for your tomatoes.
          </p>
        </section>

        {/* ── Tabs ──────────────────────────────────────────── */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-2xl w-full sm:w-fit">
          {(["storage", "transport"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5
                rounded-xl text-sm font-semibold transition-all capitalize
                ${tab === t
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {t === "storage" ? <Warehouse size={15} /> : <Truck size={15} />}
              {t === "storage" ? "Storage" : "Transport"}
            </button>
          ))}
        </div>

        {/* ── Error state ───────────────────────────────────── */}
        {fetchError && (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <AlertTriangle size={36} className="text-amber-400" />
            <p className="font-semibold text-gray-700">
              {fetchError instanceof Error ? fetchError.message : "Failed to load data"}
            </p>
            <button
              onClick={() => refetch()}
              className="text-sm text-[#c0392b] font-medium hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* ── Loading skeletons ─────────────────────────────── */}
        {isLoading && !fetchError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* ── Storage tab ───────────────────────────────────── */}
        {!isLoading && !fetchError && tab === "storage" && (
          <>
            <p className="text-xs text-gray-400 font-medium">
              {facilities?.length ?? 0} facilit{facilities?.length === 1 ? "y" : "ies"} available
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(facilities ?? []).map((f) => (
                <FacilityCard
                  key={f.id}
                  facility={f}
                  onBook={() => setBookingFacility(f)}
                />
              ))}
            </div>
          </>
        )}

        {/* ── Transport tab ─────────────────────────────────── */}
        {!isLoading && !fetchError && tab === "transport" && (
          <>
            <p className="text-xs text-gray-400 font-medium">
              {transporters?.filter((t) => t.isAvailable).length ?? 0} of{" "}
              {transporters?.length ?? 0} transporters available
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(transporters ?? []).map((t) => (
                <TransporterCard
                  key={t.id}
                  transporter={t}
                  onRequest={() => setRequestTransporter(t)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* ── Modals ────────────────────────────────────────── */}
      {bookingFacility && (
        <BookModal
          facility={bookingFacility}
          onClose={() => setBookingFacility(null)}
        />
      )}
      {requestTransporter && (
        <TransportModal
          transporter={requestTransporter}
          onClose={() => setRequestTransporter(null)}
        />
      )}

      <BottomNav />
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  BadgeCheck,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Pencil,
  X,
} from "lucide-react";
import { getMyProfile, updateMyProfile } from "@/services/api/user";
import type { UpdateProfilePayload } from "@/types/user";
import BottomNav from "@/components/BottomNav";

// ─── Read-only field row ──────────────────────────────────────────────────────

function InfoRow({
  icon,
  label,
  value,
  verified,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  verified?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-gray-50 last:border-0">
      <div className="h-9 w-9 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-sm font-semibold text-gray-800 mt-0.5 wrap-break-word">{value || "—"}</p>
      </div>
      {verified !== undefined && (
        verified
          ? <BadgeCheck size={16} className="text-green-500 shrink-0 mt-1" />
          : <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full shrink-0 mt-1">Unverified</span>
      )}
    </div>
  );
}

// ─── Edit form ────────────────────────────────────────────────────────────────

interface EditFormProps {
  initial: UpdateProfilePayload & { lga: string; state: string };
  onSave: (payload: UpdateProfilePayload) => void;
  onCancel: () => void;
  isPending: boolean;
  error: string | null;
}

function EditForm({ initial, onSave, onCancel, isPending, error }: EditFormProps) {
  const [form, setForm] = useState(initial);

  const set = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = () => {
    onSave({
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      location: { lga: form.lga, state: form.state },
    });
  };

  return (
    <div className="space-y-4">
      {/* Full name */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-600">Full name</label>
        <input
          type="text"
          value={form.fullName ?? ""}
          onChange={(e) => set("fullName", e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm
            focus:outline-none focus:ring-2 focus:ring-[#1a3a2a]/30 focus:border-[#1a3a2a]"
        />
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-600">Email address</label>
        <input
          type="email"
          value={form.email ?? ""}
          onChange={(e) => set("email", e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm
            focus:outline-none focus:ring-2 focus:ring-[#1a3a2a]/30 focus:border-[#1a3a2a]"
        />
      </div>

      {/* Phone */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-600">Phone number</label>
        <input
          type="tel"
          value={form.phone ?? ""}
          onChange={(e) => set("phone", e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm
            focus:outline-none focus:ring-2 focus:ring-[#1a3a2a]/30 focus:border-[#1a3a2a]"
        />
      </div>

      {/* Location */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-600">State</label>
          <input
            type="text"
            value={form.state ?? ""}
            onChange={(e) => set("state", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-[#1a3a2a]/30 focus:border-[#1a3a2a]"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-600">LGA</label>
          <input
            type="text"
            value={form.lga ?? ""}
            onChange={(e) => set("lga", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-[#1a3a2a]/30 focus:border-[#1a3a2a]"
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2.5 rounded-xl">
          <AlertTriangle size={14} className="shrink-0" /> {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 pt-1">
        <button
          onClick={onCancel}
          disabled={isPending}
          className="py-3 rounded-full border border-gray-200 text-sm font-semibold
            text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="py-3 rounded-full bg-[#1a3a2a] hover:bg-[#153020] text-white
            text-sm font-semibold transition-colors disabled:opacity-50
            flex items-center justify-center gap-2"
        >
          {isPending ? <Loader2 size={15} className="animate-spin" /> : null}
          {isPending ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-start gap-3 py-3.5">
          <div className="h-9 w-9 rounded-xl bg-gray-100 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-2.5 bg-gray-100 rounded w-1/4" />
            <div className="h-3.5 bg-gray-100 rounded w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PersonalDetailsPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const { data: profile, isLoading, error: fetchError } = useQuery({
    queryKey: ["profile", "me"],
    queryFn: getMyProfile,
    staleTime: 5 * 60_000,
  });

  const { mutate: save, isPending, error: saveError } = useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateMyProfile(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile", "me"] });
      setEditing(false);
      setSaved(true);
    },
  });

  // Auto-hide the saved banner
  useEffect(() => {
    if (!saved) return;
    const t = setTimeout(() => setSaved(false), 3000);
    return () => clearTimeout(t);
  }, [saved]);

  const saveErrMsg = saveError instanceof Error ? saveError.message : null;

  return (
    <div className="min-h-screen bg-[#faf9f7] font-sans">
      {/* ── Inline header (back arrow instead of TopBar) ── */}
      <header className="sticky top-0 z-40 flex items-center gap-3
        px-4 sm:px-6 pt-4 pb-3 bg-white border-b border-gray-100 shadow-sm">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="h-9 w-9 rounded-xl flex items-center justify-center
            text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-base font-bold text-gray-900 flex-1">Personal Details</h1>
        {!editing && profile && (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 text-sm font-semibold text-[#1a3a2a]
              hover:text-[#c0392b] transition-colors"
          >
            <Pencil size={14} /> Edit
          </button>
        )}
        {editing && (
          <button
            onClick={() => setEditing(false)}
            aria-label="Cancel edit"
            className="h-9 w-9 rounded-xl flex items-center justify-center
              text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </header>

      <main className="px-4 sm:px-6 lg:px-8 pt-5 pb-28 max-w-lg mx-auto space-y-4">

        {/* ── Saved banner ─────────────────────────────────── */}
        {saved && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-100
            text-green-700 text-sm px-4 py-3 rounded-2xl">
            <CheckCircle size={15} className="shrink-0" />
            Profile updated successfully.
          </div>
        )}

        {/* ── Fetch error ───────────────────────────────────── */}
        {fetchError && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-100
            text-red-700 text-sm px-4 py-3 rounded-2xl">
            <AlertTriangle size={15} className="shrink-0" />
            {fetchError instanceof Error ? fetchError.message : "Failed to load profile"}
          </div>
        )}

        {/* ── Loading ───────────────────────────────────────── */}
        {isLoading && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-2">
            <Skeleton />
          </div>
        )}

        {/* ── View mode ─────────────────────────────────────── */}
        {!isLoading && profile && !editing && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-2">
            <InfoRow
              icon={<User size={16} className="text-[#c0392b]" />}
              label="Full name"
              value={profile.fullName}
            />
            <InfoRow
              icon={<Mail size={16} className="text-[#c0392b]" />}
              label="Email address"
              value={profile.email}
              verified={profile.isVerified}
            />
            <InfoRow
              icon={<Phone size={16} className="text-[#c0392b]" />}
              label="Phone number"
              value={profile.phone}
            />
            <InfoRow
              icon={<MapPin size={16} className="text-[#1a3a2a]" />}
              label="Location"
              value={`${profile.location?.lga}, ${profile.location?.state}`}
            />
            <InfoRow
              icon={<BadgeCheck size={16} className="text-amber-500" />}
              label="Role"
              value={profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
            />
          </div>
        )}

        {/* ── Edit mode ─────────────────────────────────────── */}
        {!isLoading && profile && editing && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <EditForm
              initial={{
                fullName: profile.fullName,
                email: profile.email,
                phone: profile.phone,
                lga: profile.location?.lga ?? "",
                state: profile.location?.state ?? "",
              }}
              onSave={save}
              onCancel={() => setEditing(false)}
              isPending={isPending}
              error={saveErrMsg}
            />
          </div>
        )}

        {/* ── Account meta ──────────────────────────────────── */}
        {profile && !editing && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3">
            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-2">
              Account info
            </p>
            <p className="text-xs text-gray-500">
              Member since{" "}
              <span className="font-semibold text-gray-700">
                {new Date(profile.createdAt).toLocaleDateString("en-NG", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Account ID:{" "}
              <span className="font-mono text-gray-600 text-[11px]">
                {profile._id.slice(-8).toUpperCase()}
              </span>
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}

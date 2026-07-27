import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  User,
  Sprout,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Star,
  Loader2,
  AlertTriangle,
  X,
  ShieldCheck,
} from "lucide-react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { logout } from "@/services/api/auth";
import { tokenStorage } from "@/lib/tokenStorage";
import { ROUTES } from "@/routes/paths";

// ─── Avatar initials ─────────────────────────────────────────────────────────

function Initials({ name }: { name: string }) {
  const parts = name.trim().split(" ");
  const initials =
    parts.length >= 2
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`
      : parts[0].slice(0, 2);
  return (
    <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-[#1a3a2a] flex items-center justify-center
      text-white text-2xl sm:text-3xl font-bold select-none ring-4 ring-white shadow-md">
      {initials.toUpperCase()}
    </div>
  );
}

// ─── Role badge label ─────────────────────────────────────────────────────────

const ROLE_LABELS: Record<string, string> = {
  farmer: "Premium Tomato Producer",
  trader: "Tomato Trader",
  logistics: "Logistics Provider",
  storage: "Storage Provider",
};

// ─── Menu row ─────────────────────────────────────────────────────────────────

interface MenuRowProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  badge?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
  loading?: boolean;
}

function MenuRow({ icon, iconBg, label, badge, onClick, danger, loading }: MenuRowProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl
        transition-colors text-left
        ${danger
          ? "hover:bg-red-50 active:bg-red-100"
          : "hover:bg-gray-50 active:bg-gray-100"
        }
        disabled:opacity-60`}
    >
      <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <span className={`flex-1 text-sm font-semibold ${danger ? "text-[#c0392b]" : "text-gray-800"}`}>
        {label}
      </span>
      {loading ? (
        <Loader2 size={16} className="text-gray-400 animate-spin" />
      ) : badge ? (
        badge
      ) : (
        <ChevronRight size={16} className={danger ? "text-[#c0392b]" : "text-gray-400"} />
      )}
    </button>
  );
}

// ─── Confirm logout modal ─────────────────────────────────────────────────────

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

function LogoutModal({ onConfirm, onCancel, isPending }: LogoutModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center
        bg-black/40 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-red-50 flex items-center justify-center">
              <LogOut size={18} className="text-[#c0392b]" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-base">Log out?</h2>
              <p className="text-xs text-gray-500 mt-0.5">You'll need to sign in again to continue.</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
            aria-label="Cancel"
          >
            <X size={18} />
          </button>
        </div>

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
            onClick={onConfirm}
            disabled={isPending}
            className="py-3 rounded-full bg-[#c0392b] hover:bg-[#a93226] text-white
              text-sm font-semibold transition-colors disabled:opacity-50
              flex items-center justify-center gap-2"
          >
            {isPending ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <LogOut size={15} />
            )}
            {isPending ? "Logging out…" : "Log out"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { auth, clearAuth } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const user = auth?.user;
  const firstName = user?.name?.split(" ")[0] ?? "";
  const roleLabel = ROLE_LABELS[user?.role ?? ""] ?? "FarmRoute User";

  // ── Logout mutation ────────────────────────────────────────────────────────
  const { mutate: doLogout, isPending } = useMutation({
    mutationFn: async () => {
      const tokens = tokenStorage.get();
      // Always try the backend call; if token missing just proceed locally
      if (tokens?.refreshToken) {
        await logout(tokens.refreshToken);
      }
    },
    onSuccess: () => {
      tokenStorage.clear();
      clearAuth();
      navigate(ROUTES.LOGIN, { replace: true });
    },
    onError: (err) => {
      // Even if the backend call fails, clear local state so user isn't stuck
      tokenStorage.clear();
      clearAuth();
      setLogoutError(err instanceof Error ? err.message : "Logout failed");
      setTimeout(() => navigate(ROUTES.LOGIN, { replace: true }), 1500);
    },
  });

  return (
    <div className="min-h-screen bg-[#faf9f7] font-sans">
      <TopBar />

      <main className="px-4 sm:px-6 lg:px-8 pt-6 pb-28 max-w-lg mx-auto space-y-6">

        {/* ── Profile hero ──────────────────────────────────── */}
        <section className="flex flex-col items-center gap-3 pt-2">
          <div className="relative">
            <Initials name={user?.name ?? "User"} />
            <button
              aria-label="Edit profile picture"
              className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-[#c0392b]
                flex items-center justify-center shadow-md border-2 border-white"
            >
              <User size={13} className="text-white" />
            </button>
          </div>
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {user?.name ?? "—"}
            </h1>
            <p className="text-sm text-[#1a3a2a] font-medium flex items-center justify-center gap-1 mt-1">
              <ShieldCheck size={14} className="text-green-600" />
              {roleLabel}
            </p>
            {user?.phone && (
              <p className="text-xs text-gray-400 mt-0.5">{user.phone}</p>
            )}
          </div>
        </section>

        {/* ── Stats ─────────────────────────────────────────── */}
        <section className="grid grid-cols-2 gap-3">
          <div className="bg-[#fef2f2] rounded-2xl p-4">
            <p className="text-2xl font-bold text-[#c0392b]">12</p>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Active Orders</p>
          </div>
          <div className="bg-[#fef2f2] rounded-2xl p-4">
            <p className="text-2xl font-bold text-[#c0392b] flex items-center gap-1">
              4.9 <Star size={16} className="fill-[#c0392b] text-[#c0392b]" />
            </p>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Farm Rating</p>
          </div>
        </section>

        {/* ── Account management ────────────────────────────── */}
        <section>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">
            Account Management
          </p>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
            <MenuRow
              icon={<User size={17} className="text-[#c0392b]" />}
              iconBg="bg-red-50"
              label="Personal Details"
              onClick={() => navigate(ROUTES.PROFILE_PERSONAL)}
            />
            <MenuRow
              icon={<Sprout size={17} className="text-[#1a3a2a]" />}
              iconBg="bg-[#1a3a2a]/10"
              label="Farm Details"
            />
            <MenuRow
              icon={<CreditCard size={17} className="text-amber-600" />}
              iconBg="bg-amber-50"
              label="Payment Methods"
            />
          </div>
        </section>

        {/* ── Preferences ───────────────────────────────────── */}
        <section>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">
            Preferences
          </p>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
            <MenuRow
              icon={<Bell size={17} className="text-[#c0392b]" />}
              iconBg="bg-red-50"
              label="Notification Settings"
              badge={
                <span className="text-[11px] font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  Enabled
                </span>
              }
            />
            <MenuRow
              icon={<HelpCircle size={17} className="text-[#c0392b]" />}
              iconBg="bg-red-50"
              label="Help Center"
            />
            <MenuRow
              icon={<LogOut size={17} className="text-[#c0392b]" />}
              iconBg="bg-red-50"
              label="Log Out"
              danger
              loading={isPending}
              onClick={() => setShowLogoutModal(true)}
            />
          </div>
        </section>

        {/* ── Error toast ───────────────────────────────────── */}
        {logoutError && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-700
            text-sm px-4 py-3 rounded-2xl">
            <AlertTriangle size={15} className="shrink-0" />
            {logoutError} — redirecting…
          </div>
        )}

        {/* ── Footer ────────────────────────────────────────── */}
        <p className="text-center text-xs text-gray-400 pt-2">
          Version 1.0.0 • Secure &amp; Protected
        </p>
      </main>

      {/* ── Logout confirm modal ──────────────────────────── */}
      {showLogoutModal && (
        <LogoutModal
          isPending={isPending}
          onConfirm={() => doLogout()}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}

      <BottomNav />
    </div>
  );
}

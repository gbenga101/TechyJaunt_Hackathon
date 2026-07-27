import { useState } from "react";
import {
  ClipboardList,
  MapPin,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  ChevronRight,
  Search,
  Filter,
} from "lucide-react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

// ─── Types ──────────────────────────────────────────────────────────────────

type OrderStatus = "processing" | "shipped" | "in-transit" | "delivered" | "cancelled";

interface OrderItem {
  name: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
}

interface Order {
  id: string;
  ref: string;
  date: string;
  items: OrderItem[];
  origin: string;
  destination: string;
  status: OrderStatus;
  transporter?: string;
}

// ─── Mock data (orders API not yet live on backend) ─────────────────────────

const MOCK_ORDERS: Order[] = [
  {
    id: "1",
    ref: "TF-8821",
    date: "2026-07-25",
    items: [{ name: "Roma Plum Tomatoes", quantity: 10, unit: "crates", pricePerUnit: 12500 }],
    origin: "Jos North, Plateau",
    destination: "Wuse, Abuja",
    status: "in-transit",
    transporter: "SwiftFarm Logistics",
  },
  {
    id: "2",
    ref: "TF-8756",
    date: "2026-07-22",
    items: [
      { name: "Cherry Mix", quantity: 5, unit: "baskets", pricePerUnit: 8200 },
      { name: "Cocktail Tomatoes", quantity: 3, unit: "punnets", pricePerUnit: 4500 },
    ],
    origin: "Ogbomosho, Oyo",
    destination: "Ikeja, Lagos",
    status: "delivered",
    transporter: "Coastal Produce Movers",
  },
  {
    id: "3",
    ref: "TF-8690",
    date: "2026-07-20",
    items: [{ name: "Beefsteak Heirloom", quantity: 2, unit: "tons", pricePerUnit: 450000 }],
    origin: "Zaria, Kaduna",
    destination: "Kano Municipal, Kano",
    status: "delivered",
    transporter: "Arewa Haulage",
  },
  {
    id: "4",
    ref: "TF-8640",
    date: "2026-07-18",
    items: [{ name: "Sun-Dried Tomatoes", quantity: 20, unit: "bags", pricePerUnit: 6800 }],
    origin: "Kano Municipal, Kano",
    destination: "GRA, Enugu",
    status: "processing",
  },
  {
    id: "5",
    ref: "TF-8510",
    date: "2026-07-14",
    items: [{ name: "Green Tomatoes", quantity: 8, unit: "crates", pricePerUnit: 9000 }],
    origin: "Enugu GRA, Enugu",
    destination: "Bodija, Ibadan",
    status: "cancelled",
  },
  {
    id: "6",
    ref: "TF-8499",
    date: "2026-07-12",
    items: [{ name: "Roma Plum Tomatoes", quantity: 15, unit: "crates", pricePerUnit: 12500 }],
    origin: "Jos North, Plateau",
    destination: "Ikeja, Lagos",
    status: "shipped",
    transporter: "FarmLink Express",
  },
];

// ─── Status config ───────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; pill: string; icon: React.ReactNode; progress: number }
> = {
  processing: {
    label: "Processing",
    pill: "bg-amber-100 text-amber-700",
    icon: <Clock size={13} />,
    progress: 20,
  },
  shipped: {
    label: "Shipped",
    pill: "bg-blue-100 text-blue-700",
    icon: <Package size={13} />,
    progress: 50,
  },
  "in-transit": {
    label: "In Transit",
    pill: "bg-green-100 text-green-700",
    icon: <Truck size={13} />,
    progress: 75,
  },
  delivered: {
    label: "Delivered",
    pill: "bg-[#1a3a2a]/10 text-[#1a3a2a]",
    icon: <CheckCircle size={13} />,
    progress: 100,
  },
  cancelled: {
    label: "Cancelled",
    pill: "bg-red-100 text-red-600",
    icon: <XCircle size={13} />,
    progress: 0,
  },
};

const TABS: { key: OrderStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "processing", label: "Processing" },
  { key: "in-transit", label: "In Transit" },
  { key: "delivered", label: "Delivered" },
  { key: "cancelled", label: "Cancelled" },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function orderTotal(items: OrderItem[]) {
  return items.reduce((sum, i) => sum + i.quantity * i.pricePerUnit, 0);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Order detail drawer ─────────────────────────────────────────────────────

function OrderDrawer({ order, onClose }: { order: Order; onClose: () => void }) {
  const cfg = STATUS_CONFIG[order.status];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center
        bg-black/40 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-xl overflow-hidden">
        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="h-1 w-10 rounded-full bg-gray-200" />
        </div>

        <div className="px-5 pb-6 pt-2 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                Order reference
              </p>
              <h2 className="text-lg font-bold text-gray-900">#{order.ref}</h2>
              <p className="text-xs text-gray-500 mt-0.5">{formatDate(order.date)}</p>
            </div>
            <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.pill}`}>
              {cfg.icon} {cfg.label}
            </span>
          </div>

          {/* Progress bar (not shown for cancelled) */}
          {order.status !== "cancelled" && (
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-gray-400 font-medium uppercase tracking-wide">
                <span>Processing</span>
                <span>Shipped</span>
                <span>In Transit</span>
                <span>Delivered</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1a3a2a] rounded-full transition-all"
                  style={{ width: `${cfg.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Route */}
          <div className="bg-gray-50 rounded-2xl p-3 space-y-2">
            <div className="flex items-start gap-2">
              <MapPin size={13} className="text-[#c0392b] mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">From</p>
                <p className="text-sm font-medium text-gray-800">{order.origin}</p>
              </div>
            </div>
            <div className="h-4 w-px bg-gray-200 ml-1.25" />
            <div className="flex items-start gap-2">
              <MapPin size={13} className="text-[#1a3a2a] mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">To</p>
                <p className="text-sm font-medium text-gray-800">{order.destination}</p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Items</p>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.quantity} {item.unit} × ₦{item.pricePerUnit.toLocaleString()}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-gray-900">
                    ₦{(item.quantity * item.pricePerUnit).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Divider + total */}
          <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-600">Total</p>
            <p className="text-base font-bold text-[#c0392b]">
              ₦{orderTotal(order.items).toLocaleString()}
            </p>
          </div>

          {/* Transporter */}
          {order.transporter && (
            <div className="flex items-center gap-2 bg-green-50 rounded-xl px-3 py-2.5">
              <Truck size={15} className="text-green-600 shrink-0" />
              <p className="text-xs text-green-800 font-medium">{order.transporter}</p>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full bg-[#1a3a2a] hover:bg-[#153020] text-white font-semibold
              py-3 rounded-full transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Order card ──────────────────────────────────────────────────────────────

function OrderCard({ order, onClick }: { order: Order; onClick: () => void }) {
  const cfg = STATUS_CONFIG[order.status];
  const total = orderTotal(order.items);
  const firstItem = order.items[0];

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl border border-gray-100 shadow-sm
        p-4 flex flex-col gap-3 hover:shadow-md hover:border-gray-200 transition-all"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-gray-400 font-medium">#{order.ref}</p>
          <p className="font-semibold text-gray-900 text-sm mt-0.5 leading-snug">
            {firstItem.name}
            {order.items.length > 1 && (
              <span className="text-gray-400 font-normal">
                {" "}+{order.items.length - 1} more
              </span>
            )}
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
            <MapPin size={10} className="shrink-0" />
            {order.origin} → {order.destination}
          </p>
        </div>
        <span className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${cfg.pill}`}>
          {cfg.icon}
          {cfg.label}
        </span>
      </div>

      {/* Progress bar */}
      {order.status !== "cancelled" && (
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1a3a2a] rounded-full"
            style={{ width: `${cfg.progress}%` }}
          />
        </div>
      )}

      {/* Bottom row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Package size={11} />
            {order.items.reduce((s, i) => s + i.quantity, 0)}{" "}
            {order.items.length === 1 ? order.items[0].unit : "items"}
          </span>
          <span>{formatDate(order.date)}</span>
        </div>
        <div className="flex items-center gap-1">
          <p className="text-sm font-bold text-[#c0392b]">
            ₦{total.toLocaleString()}
          </p>
          <ChevronRight size={14} className="text-gray-400" />
        </div>
      </div>
    </button>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ListingsPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus | "all">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Order | null>(null);

  const filtered = MOCK_ORDERS.filter((o) => {
    const matchTab = activeTab === "all" || o.status === activeTab;
    const q = query.toLowerCase();
    const matchSearch =
      q.length === 0 ||
      o.ref.toLowerCase().includes(q) ||
      o.items.some((i) => i.name.toLowerCase().includes(q)) ||
      o.origin.toLowerCase().includes(q) ||
      o.destination.toLowerCase().includes(q);
    return matchTab && matchSearch;
  });

  // Summary counts
  const counts = MOCK_ORDERS.reduce<Record<string, number>>(
    (acc, o) => ({ ...acc, [o.status]: (acc[o.status] ?? 0) + 1 }),
    {}
  );
  const active = (counts["processing"] ?? 0) + (counts["shipped"] ?? 0) + (counts["in-transit"] ?? 0);
  const delivered = counts["delivered"] ?? 0;
  const totalSpend = MOCK_ORDERS.filter((o) => o.status === "delivered")
    .reduce((s, o) => s + orderTotal(o.items), 0);

  return (
    <div className="min-h-screen bg-[#faf9f7] font-sans">
      <TopBar />

      <main className="px-4 sm:px-6 lg:px-8 pt-5 pb-28 max-w-4xl mx-auto space-y-5">

        {/* ── Heading ─────────────────────────────────────── */}
        <section>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Track and manage your tomato purchases.
          </p>
        </section>

        {/* ── Summary cards ────────────────────────────────── */}
        <section className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-[#c0392b]">{active}</p>
            <p className="text-[11px] sm:text-xs text-gray-500 font-medium mt-0.5 leading-tight">
              Active
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-[#1a3a2a]">{delivered}</p>
            <p className="text-[11px] sm:text-xs text-gray-500 font-medium mt-0.5 leading-tight">
              Delivered
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4 text-center">
            <p className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">
              ₦{(totalSpend / 1000).toFixed(0)}k
            </p>
            <p className="text-[11px] sm:text-xs text-gray-500 font-medium mt-0.5 leading-tight">
              Total Spent
            </p>
          </div>
        </section>

        {/* ── Search ───────────────────────────────────────── */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by ref, product or location…"
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 bg-white
              text-sm text-gray-800 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#c0392b]/30 focus:border-[#c0392b]
              transition shadow-sm"
          />
        </div>

        {/* ── Tab filter ───────────────────────────────────── */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {TABS.map(({ key, label }) => {
            const isActive = activeTab === key;
            const count = key === "all" ? MOCK_ORDERS.length : (counts[key] ?? 0);
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border
                  text-xs sm:text-sm font-medium whitespace-nowrap transition-colors shrink-0
                  ${isActive
                    ? "bg-[#1a3a2a] border-[#1a3a2a] text-white"
                    : "bg-white border-gray-200 text-gray-600 hover:border-[#1a3a2a] hover:text-[#1a3a2a]"
                  }`}
              >
                <Filter size={11} />
                {label}
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full
                  ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Results ──────────────────────────────────────── */}
        <p className="text-xs text-gray-400 font-medium">
          {filtered.length} {filtered.length === 1 ? "order" : "orders"}
        </p>

        {/* 1-col mobile, 2-col md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onClick={() => setSelected(order)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <ClipboardList size={40} className="text-gray-200" />
            <p className="font-semibold text-gray-600">No orders found</p>
            <p className="text-sm text-gray-400">
              {query ? `Nothing matches "${query}"` : "You have no orders in this category yet."}
            </p>
          </div>
        )}
      </main>

      {/* ── Order detail drawer ──────────────────────────── */}
      {selected && (
        <OrderDrawer order={selected} onClose={() => setSelected(null)} />
      )}

      <BottomNav />
    </div>
  );
}

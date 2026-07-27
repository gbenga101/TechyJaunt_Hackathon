import { Link } from "react-router-dom";
import {
  ShoppingBasket,
  ClipboardList,
  ChevronRight,
  Truck,
  BadgePercent,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/routes/paths";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

// ─── Time-based greeting ────────────────────────────────────────────────────
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

// ─── Tomato product data ────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: "Roma Tomatoes (Box)",
    subtitle: "Direct from Jos Farms, 25 kg crate",
    price: "₦12,500",
    unit: "/crate",
    badge: "Best Value",
    badgeColor: "bg-[#1a3a2a] text-white",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80",
  },
  {
    id: 2,
    name: "Cherry Tomatoes (Punnet)",
    subtitle: "Greenhouse grown, Plateau State",
    price: "₦3,200",
    unit: "/kg",
    badge: "Fresh Today",
    badgeColor: "bg-red-600 text-white",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=800&q=80",
  },
  {
    id: 3,
    name: "Plum Tomatoes (Bag)",
    subtitle: "Kano farms, 10 kg bag",
    price: "₦5,400",
    unit: "/bag",
    badge: "Top Pick",
    badgeColor: "bg-amber-500 text-white",
    image: "https://images.unsplash.com/photo-1558818498-28c1e002b655?w=800&q=80",
  },
];

export default function DashboardPage() {
  const { auth } = useAuth();
  const firstName = auth?.user?.name?.split(" ")[0] ?? "there";
  const greeting = getGreeting();

  return (
    <div className="min-h-screen bg-[#faf9f7] font-sans">
      <TopBar />

      <main className="px-4 sm:px-6 lg:px-8 pt-5 pb-24 space-y-6 max-w-2xl mx-auto">

        {/* ── Greeting ──────────────────────────────────────── */}
        <section>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {greeting}, {firstName}
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Find the freshest tomatoes from across Nigeria today.
          </p>
        </section>

        {/* ── CTA buttons ───────────────────────────────────── */}
        <section className="flex gap-3">
          <Link
            to={ROUTES.MARKET}
            className="flex-1 flex items-center justify-center gap-2 bg-[#c0392b] hover:bg-[#a93226]
              text-white font-semibold py-3 rounded-full transition-colors text-sm sm:text-base"
          >
            <ShoppingBasket size={16} />
            Browse Marketplace
          </Link>
          <Link
            to={ROUTES.LISTINGS}
            className="flex-1 flex items-center justify-center gap-2 bg-[#1a3a2a] hover:bg-[#153020]
              text-white font-semibold py-3 rounded-full transition-colors text-sm sm:text-base"
          >
            <ClipboardList size={16} />
            My Orders
          </Link>
        </section>

        {/* ── Active Orders ──────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800 text-base sm:text-lg">Active Orders</h2>
            <Link
              to={ROUTES.LISTINGS}
              className="text-sm text-[#c0392b] font-medium flex items-center gap-0.5 hover:underline"
            >
              View All <ChevronRight size={14} />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                <Truck size={20} className="text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm">Order #TF-8821</p>
                <p className="text-xs text-gray-500">Arriving today, 2:00 PM</p>
              </div>
              <span className="text-xs font-medium bg-green-100 text-green-700 px-2.5 py-1 rounded-full whitespace-nowrap">
                In Transit
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-gray-400 font-medium uppercase tracking-wide">
                <span>Processing</span>
                <span>Shipped</span>
                <span>Delivery</span>
              </div>
              <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-[72%] bg-[#1a3a2a] rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Recommended products ───────────────────────────── */}
        <section>
          <h2 className="font-bold text-gray-800 text-base sm:text-lg mb-3">
            Recommended for You
          </h2>
          {/* single-col on mobile, two-col on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRODUCTS.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <div className="relative h-44 sm:h-48">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                </div>
                <div className="px-4 py-3 flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{p.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{p.subtitle}</p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <p className="font-bold text-[#c0392b] text-sm">{p.price}</p>
                    <p className="text-xs text-gray-400">{p.unit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Promo banner ───────────────────────────────────── */}
        <section>
          <div className="relative bg-[#c0392b] rounded-2xl p-5 sm:p-6 overflow-hidden">
            <div
              className="absolute inset-0 opacity-10 bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=400&q=60')" }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <BadgePercent size={18} className="text-red-200" />
                <h3 className="font-bold text-white text-base sm:text-lg">Harvest Season Sale</h3>
              </div>
              <p className="text-red-100 text-sm sm:text-base mb-4">
                Up to 20% off on bulk tomato purchases this week.
              </p>
              <Link
                to={ROUTES.MARKET}
                className="inline-block bg-white text-[#c0392b] font-semibold text-sm px-5 py-2 rounded-full hover:bg-red-50 transition-colors"
              >
                Shop the Sale
              </Link>
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

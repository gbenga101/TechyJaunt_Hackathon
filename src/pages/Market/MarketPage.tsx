import { useState } from "react";
import { Search, MapPin, SlidersHorizontal, Star, ShoppingCart, Zap, Mail } from "lucide-react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

// ─── Types ──────────────────────────────────────────────────────────────────
interface Product {
  id: number;
  name: string;
  location: string;
  state: string;
  rating: number;
  available: number;
  availableUnit: string;
  price: number;
  priceUnit: string;
  badge?: string;
  badgeColor?: string;
  image: string;
  cta: "cart" | "quickbuy" | "contact";
}

// ─── Catalogue data ──────────────────────────────────────────────────────────
const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Roma Plum Tomatoes",
    location: "Jos North",
    state: "Plateau",
    rating: 4.8,
    available: 45,
    availableUnit: "Crates",
    price: 12500,
    priceUnit: "Per Crate",
    badge: "Premium Grade",
    badgeColor: "bg-[#1a3a2a]",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80",
    cta: "cart",
  },
  {
    id: 2,
    name: "Cherry Mix",
    location: "Ogbomosho",
    state: "Oyo",
    rating: 4.5,
    available: 120,
    availableUnit: "Baskets",
    price: 8200,
    priceUnit: "Per Basket",
    badge: "Ships Today",
    badgeColor: "bg-amber-600",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=800&q=80",
    cta: "quickbuy",
  },
  {
    id: 3,
    name: "Beefsteak Heirloom",
    location: "Zaria",
    state: "Kaduna",
    rating: 5.0,
    available: 15,
    availableUnit: "Tons",
    price: 450000,
    priceUnit: "Per Ton",
    badge: "Bulk Discount",
    badgeColor: "bg-purple-700",
    image: "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=800&q=80",
    cta: "contact",
  },
  {
    id: 4,
    name: "Cocktail Tomatoes",
    location: "Ibadan",
    state: "Oyo",
    rating: 4.6,
    available: 80,
    availableUnit: "Punnets",
    price: 4500,
    priceUnit: "Per Punnet",
    badge: "Fresh Today",
    badgeColor: "bg-red-600",
    image: "https://images.unsplash.com/photo-1558818498-28c1e002b655?w=800&q=80",
    cta: "cart",
  },
  {
    id: 5,
    name: "Sun-Dried Tomatoes",
    location: "Kano Municipal",
    state: "Kano",
    rating: 4.7,
    available: 200,
    availableUnit: "Bags",
    price: 6800,
    priceUnit: "Per Bag",
    badge: "Best Value",
    badgeColor: "bg-[#1a3a2a]",
    image: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=800&q=80",
    cta: "quickbuy",
  },
  {
    id: 6,
    name: "Green Tomatoes",
    location: "Enugu GRA",
    state: "Enugu",
    rating: 4.3,
    available: 60,
    availableUnit: "Crates",
    price: 9000,
    priceUnit: "Per Crate",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80",
    cta: "cart",
  },
];

const FILTERS = ["Location", "Price Range", "Grade", "More Filters"] as const;

// ─── CTA button per product ──────────────────────────────────────────────────
function CtaButton({ type }: { type: Product["cta"] }) {
  if (type === "cart") {
    return (
      <button className="w-full flex items-center justify-center gap-2 bg-[#c0392b] hover:bg-[#a93226]
        text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
        <ShoppingCart size={15} /> Add to Cart
      </button>
    );
  }
  if (type === "quickbuy") {
    return (
      <button className="w-full flex items-center justify-center gap-2 bg-[#1a3a2a] hover:bg-[#153020]
        text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
        <Zap size={15} /> Quick Buy
      </button>
    );
  }
  return (
    <button className="w-full flex items-center justify-center gap-2 bg-[#c0392b] hover:bg-[#a93226]
      text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
      <Mail size={15} /> Contact Farmer
    </button>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function MarketPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filtered = ALL_PRODUCTS.filter((p) =>
    query.length === 0 ||
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.location.toLowerCase().includes(query.toLowerCase()) ||
    p.state.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#faf9f7] font-sans">
      <TopBar />

      <main className="px-4 sm:px-6 lg:px-8 pt-4 pb-28 max-w-4xl mx-auto space-y-4">

        {/* ── Search bar ──────────────────────────────────────── */}
        <div className="relative">
          <Search
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tomato varieties..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 bg-white
              text-sm sm:text-base text-gray-800 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#c0392b]/30 focus:border-[#c0392b]
              transition shadow-sm"
          />
        </div>

        {/* ── Filter chips ─────────────────────────────────────── */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {FILTERS.map((f) => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(isActive ? null : f)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm
                  font-medium whitespace-nowrap transition-colors shrink-0
                  ${isActive
                    ? "bg-[#1a3a2a] border-[#1a3a2a] text-white"
                    : "bg-white border-gray-200 text-gray-600 hover:border-[#1a3a2a] hover:text-[#1a3a2a]"
                  }`}
              >
                {f === "Location" && <MapPin size={12} />}
                {f === "More Filters" && <SlidersHorizontal size={12} />}
                {f}
              </button>
            );
          })}
        </div>

        {/* ── Results count ────────────────────────────────────── */}
        <p className="text-xs text-gray-400 font-medium">
          {filtered.length} {filtered.length === 1 ? "listing" : "listings"} found
        </p>

        {/* ── Product grid ─────────────────────────────────────── */}
        {/* 1-col mobile, 2-col sm, 3-col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative h-44 sm:h-48">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {p.badge && (
                  <span className={`absolute top-3 right-3 text-[11px] font-semibold
                    px-2.5 py-1 rounded-full text-white ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="px-4 pt-3 pb-1 flex-1 flex flex-col gap-2">
                {/* Name + rating */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm leading-snug">{p.name}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin size={11} className="shrink-0" />
                      {p.location}, {p.state}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-[#1a3a2a]">{p.rating.toFixed(1)}</span>
                    <p className="text-[9px] text-gray-400 uppercase tracking-wide flex items-center gap-0.5 justify-end">
                      <Star size={9} className="fill-amber-400 text-amber-400" /> Rating
                    </p>
                  </div>
                </div>

                {/* Availability + price */}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Available</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {p.available} {p.availableUnit}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">{p.priceUnit}</p>
                    <p className="text-sm font-bold text-[#c0392b]">
                      ₦{p.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-auto pt-2 pb-3">
                  <CtaButton type={p.cta} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🍅</p>
            <p className="font-medium">No listings match "{query}"</p>
            <p className="text-sm mt-1">Try a different variety or location</p>
          </div>
        )}
      </main>

      {/* ── Floating action button ────────────────────────────── */}
      <button
        aria-label="Compare selected"
        className="fixed bottom-20 right-4 sm:right-6 z-40 h-12 w-12 rounded-full
          bg-[#c0392b] text-white shadow-lg flex items-center justify-center
          hover:bg-[#a93226] active:scale-95 transition-all"
      >
        <SlidersHorizontal size={20} />
      </button>

      <BottomNav />
    </div>
  );
}

import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingBasket, Truck, ClipboardList, User } from "lucide-react";
import { ROUTES } from "@/routes/paths";

const NAV_ITEMS = [
  { label: "Home",      icon: Home,           to: ROUTES.DASHBOARD },
  { label: "Market",    icon: ShoppingBasket, to: ROUTES.MARKET    },
  { label: "Logistics", icon: Truck,          to: ROUTES.LOGISTICS },
  { label: "Listings",  icon: ClipboardList,  to: ROUTES.LISTINGS  },
  { label: "Profile",   icon: User,           to: ROUTES.PROFILE   },
] as const;

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-100 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
      <ul className="flex items-center justify-around w-full max-w-lg mx-auto px-1 py-1 sm:py-2">
        {NAV_ITEMS.map(({ label, icon: Icon, to }) => {
          const active = pathname === to;
          return (
            <li key={label} className="flex-1">
              <Link
                to={to}
                className={`flex flex-col items-center gap-0.5 py-1.5 sm:py-2 rounded-xl transition-colors w-full
                  ${active ? "text-[#c0392b]" : "text-gray-400 hover:text-gray-600"}`}
              >
                <Icon
                  size={22}
                  strokeWidth={active ? 2.5 : 1.8}
                  aria-hidden="true"
                />
                <span className="text-[10px] sm:text-xs font-medium leading-tight">
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

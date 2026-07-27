import { Bell } from "lucide-react";

interface TopBarProps {
  /** Override the notification badge visibility */
  hasNotification?: boolean;
}

export default function TopBar({ hasNotification = true }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between
      px-4 sm:px-6 lg:px-8
      pt-4 pb-3
      bg-white border-b border-gray-100 shadow-sm">
      {/* Logo */}
      <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#1a3a2a] select-none">
        FarmRoute
      </span>

      {/* Bell */}
      <button
        aria-label="Notifications"
        className="relative p-1.5 text-gray-500 hover:text-[#c0392b] transition-colors rounded-lg hover:bg-red-50"
      >
        <Bell size={22} />
        {hasNotification && (
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
        )}
      </button>
    </header>
  );
}

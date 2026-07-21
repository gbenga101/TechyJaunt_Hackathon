import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

interface TopAppBarProps {
  title: string;
  onBack?: () => void;
  rightSlot?: ReactNode;
}

// Matches OTP/Register/Reset screens: back arrow, centered bold title, hairline bottom border
export function TopAppBar({ title, onBack, rightSlot }: TopAppBarProps) {
  return (
    <header className="flex items-center h-14 px-screen-x border-b border-border bg-background">
      <div className="w-8">
        {onBack && (
          <button onClick={onBack} aria-label="Go back" className="text-primary">
            <ArrowLeft className="h-6 w-6" />
          </button>
        )}
      </div>
      <h1 className="flex-1 text-center font-heading font-bold text-lg text-primary">{title}</h1>
      <div className="w-8 flex justify-end">{rightSlot}</div>
    </header>
  );
}
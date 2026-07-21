import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

// Matches Market Results screen: rounded card, hairline border, white surface
export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-card border border-border bg-white overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
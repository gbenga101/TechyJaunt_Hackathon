import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  isLoading?: boolean;
}

// Matches Welcome screen: filled primary (Login) + outlined secondary (Create Account)
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", fullWidth = true, isLoading, disabled, className = "", children, ...props },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 h-12 rounded-control px-6 font-body font-medium text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-primary text-background hover:bg-primary/90",
      secondary: "bg-transparent text-primary border border-primary hover:bg-primary/5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
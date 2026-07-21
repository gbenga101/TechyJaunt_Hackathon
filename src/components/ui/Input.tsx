import { type InputHTMLAttributes, forwardRef, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
}

// Matches Register screen: label above, asterisk for required, single hairline border
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, required, error, className = "", id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="font-body text-sm font-medium text-primary">
          {label}
          {required && (
            <span className="text-accent ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={`h-12 rounded-control border border-border bg-background px-4 font-body text-base text-primary placeholder:text-text-muted focus-visible:border-focus-ring ${
            error ? "border-accent" : ""
          } ${className}`}
          {...props}
        />
        {error && (
          <p id={errorId} className="font-body text-sm text-accent" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
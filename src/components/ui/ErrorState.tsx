import { AlertCircle } from "lucide-react";
import { Button } from "./Button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  description = "Check your connection and try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center text-center gap-3 py-12 px-screen-x">
      <AlertCircle className="h-10 w-10 text-accent" aria-hidden="true" />
      <p className="font-heading font-bold text-lg text-primary">{title}</p>
      <p className="font-body text-sm text-text-muted">{description}</p>
      {onRetry && (
        <Button variant="secondary" fullWidth={false} onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
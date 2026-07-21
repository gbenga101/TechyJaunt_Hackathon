import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center text-center gap-2 py-12 px-screen-x">
      <Icon className="h-10 w-10 text-text-muted" aria-hidden="true" />
      <p className="font-heading font-bold text-lg text-primary">{title}</p>
      {description && <p className="font-body text-sm text-text-muted">{description}</p>}
      {action}
    </div>
  );
}
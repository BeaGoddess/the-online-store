import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface StatePlaceholderProps {
  icon?: LucideIcon;
  title: string;
  message?: ReactNode;
  action?: ReactNode;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
}

export const StatePlaceholder = ({
  icon: Icon = AlertTriangle,
  title,
  message,
  action,
  className,
  iconClassName,
  titleClassName,
}: StatePlaceholderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-3 py-24 text-center",
        className,
      )}
    >
      <Icon
        className={cn("text-primary size-10", iconClassName)}
        strokeWidth={1.5}
      />
      <p className={cn("font-ubuntu text-xl font-bold", titleClassName)}>
        {title}
      </p>
      {message && <p className="text-primary/60 text-sm">{message}</p>}
      {action}
    </div>
  );
};

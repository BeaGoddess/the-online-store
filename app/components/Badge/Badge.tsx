import type { HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

export type BadgeVariant = "primary" | "secondary";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const badgeVariants: Record<BadgeVariant, string> = {
  primary: "bg-primary text-white",
  secondary: "bg-white text-primary",
};

export const Badge = ({
  variant = "primary",
  className,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={cn(
        "rounded px-1.5 py-0.5 text-xs font-bold",
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  );
};

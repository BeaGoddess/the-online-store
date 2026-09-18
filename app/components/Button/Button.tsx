import type { ButtonHTMLAttributes } from "react";
import { cn } from "~/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "icon" | "unstyled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary hover:bg-primary/90 px-4 py-2 font-mono text-white transition-all duration-300 rounded-lg disabled:hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50",
  secondary:
    "text-primary hover:text-primary/70 text-sm transition-colors duration-300",
  icon: "text-primary hover:text-primary/70 transition-colors duration-300",
  unstyled: "",
};

export const Button = ({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn("cursor-pointer", buttonVariants[variant], className)}
      {...props}
    />
  );
};

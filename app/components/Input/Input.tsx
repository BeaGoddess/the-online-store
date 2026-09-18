import type { InputHTMLAttributes, Ref } from "react";
import { cn } from "~/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
}

export const Input = ({ className, type = "text", ...props }: InputProps) => {
  return (
    <input
      type={type}
      className={cn(
        "border-primary hover:border-primary/70 focus:border-primary/40 w-full appearance-none rounded-lg border px-4 py-2 transition-colors duration-300 focus:outline-none",
        className,
      )}
      {...props}
    />
  );
};

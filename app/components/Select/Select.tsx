import { ChevronDown } from "lucide-react";
import type { SelectHTMLAttributes } from "react";
import { cn } from "~/lib/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  wrapperClassName?: string;
}

export const Select = ({
  className,
  wrapperClassName,
  children,
  ...props
}: SelectProps) => {
  return (
    <div className={cn("relative inline-block", wrapperClassName)}>
      <select
        className={cn(
          "border-primary appearance-none rounded-lg border px-4 py-2 pr-9 focus:outline-none",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" />
    </div>
  );
};

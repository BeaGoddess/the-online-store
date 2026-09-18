import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/Button";

interface AccordionProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const Accordion = ({
  title,
  children,
  defaultOpen = false,
  className,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Button
        variant="unstyled"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between gap-2 text-left"
      >
        {title}
        <ChevronDown
          className={cn(
            "size-4 shrink-0 transition-transform duration-300",
            isOpen && "rotate-180",
          )}
          strokeWidth={1.5}
        />
      </Button>
      <div
        className={cn(
          "grid transition-all duration-300",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

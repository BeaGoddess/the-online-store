import { cn } from "~/lib/utils";

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const Overlay = ({ isOpen, onClose, className }: OverlayProps) => {
  return (
    <div
      onClick={onClose}
      className={cn(
        "z-10 h-screen bg-black/50 opacity-0 transition-opacity duration-300",
        isOpen ? "opacity-100" : "pointer-events-none",
        className,
      )}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    />
  );
};

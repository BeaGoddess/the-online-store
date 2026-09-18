import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "../Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({
  className,
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  if (totalPages <= 1) return null;

  return (
    <div className={cn("flex items-center", className)}>
      {currentPage > 1 && (
        <Button
          variant="unstyled"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="text-primary cursor-pointer disabled:opacity-30"
        >
          <ChevronLeft className="size-5" strokeWidth={1.5} />
        </Button>
      )}
      {pages.map((page) => (
        <Button
          variant="unstyled"
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors duration-300",
            currentPage === page
              ? "bg-primary text-white"
              : "text-primary hover:bg-primary/10",
          )}
        >
          {page}
        </Button>
      ))}
      {currentPage < totalPages && (
        <Button
          variant="unstyled"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="text-primary cursor-pointer disabled:opacity-30"
        >
          <ChevronRight className="size-5" strokeWidth={1.5} />
        </Button>
      )}
    </div>
  );
};

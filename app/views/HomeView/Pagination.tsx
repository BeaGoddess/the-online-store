import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "~/lib/utils";

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
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className="text-primary cursor-pointer disabled:opacity-30"
        >
          <ChevronLeft className="size-5" strokeWidth={1.5} />
        </button>
      )}
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={cn(
            "flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors duration-300",
            currentPage === page
              ? "bg-primary text-white"
              : "text-primary hover:bg-primary/10",
          )}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
          className="text-primary cursor-pointer disabled:opacity-30"
        >
          <ChevronRight className="size-5" strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
};

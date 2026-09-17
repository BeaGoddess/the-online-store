import { useSearchParams } from "react-router";
import { FILTER_OPTIONS } from "~/constants/filters";
import { DEFAULT_LIMIT } from "~/lib/product";

interface UsePaginationOptions {
  total: number;
  limit?: number;
}

export const usePagination = ({
  total,
  limit = DEFAULT_LIMIT,
}: UsePaginationOptions) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get(FILTER_OPTIONS.PAGE) || "1");

  const onPageChange = (page: number) => {
    const next = new URLSearchParams(searchParams);
    next.set(FILTER_OPTIONS.PAGE, page.toString());
    if (page === 1) next.delete(FILTER_OPTIONS.PAGE);
    setSearchParams(next);
  };

  const totalPages = Math.ceil(total / limit);
  const currentStartCount = (currentPage - 1) * limit + 1;
  const currentEndCount = Math.min(currentPage * limit, total);

  return {
    currentPage,
    totalPages,
    currentStartCount,
    currentEndCount,
    onPageChange,
  };
};

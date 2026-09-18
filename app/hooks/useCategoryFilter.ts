import { FILTER_OPTIONS } from "~/constants/filters";
import { useOptimisticSearchParams } from "~/hooks/useOptimisticSearchParams";

export const useCategoryFilter = () => {
  const [searchParams, setSearchParams] = useOptimisticSearchParams();
  const selectedCategory = searchParams.get(FILTER_OPTIONS.CATEGORY) ?? "";

  const selectCategory = (slug: string) => {
    const next = new URLSearchParams(searchParams);
    if (slug) {
      next.set(FILTER_OPTIONS.CATEGORY, slug);
    } else {
      next.delete(FILTER_OPTIONS.CATEGORY);
    }
    next.delete(FILTER_OPTIONS.PAGE);
    next.delete(FILTER_OPTIONS.Q);
    setSearchParams(next);
  };

  return { selectedCategory, selectCategory };
};

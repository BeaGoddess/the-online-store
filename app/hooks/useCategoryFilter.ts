import { useSearchParams } from "react-router";
import { FILTER_OPTIONS } from "~/constants/filters";

export const useCategoryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { selectedCategory, selectCategory };
};

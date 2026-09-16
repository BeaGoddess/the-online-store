import { ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router";
import { FILTER_OPTIONS } from "~/constants/filters";

export const SortFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getValue = () => {
    const sortBy = searchParams.get(FILTER_OPTIONS.SORT_BY);
    const order = searchParams.get(FILTER_OPTIONS.ORDER);
    if (sortBy && order) {
      return `${sortBy}-${order}`;
    }
    return "all";
  };

  const onSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const next = new URLSearchParams(searchParams);
    switch (event.target.value) {
      case "price-asc":
        next.set(FILTER_OPTIONS.SORT_BY, "price");
        next.set(FILTER_OPTIONS.ORDER, "asc");
        break;
      case "price-desc":
        next.set(FILTER_OPTIONS.SORT_BY, "price");
        next.set(FILTER_OPTIONS.ORDER, "desc");
        break;
      default:
        next.delete(FILTER_OPTIONS.SORT_BY);
        next.delete(FILTER_OPTIONS.ORDER);
        break;
    }
    setSearchParams(next);
  };

  return (
    <div className="relative inline-block">
      <select
        className="border-primary appearance-none rounded-lg border px-4 py-2 pr-9 focus:outline-none"
        onChange={onSortChange}
        value={getValue()}
      >
        <option value="all">Sort by</option>
        <option value="price-asc">Sort by price: Low to High</option>
        <option value="price-desc">Sort by price: High to Low</option>
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" />
    </div>
  );
};

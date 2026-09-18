import { Select } from "~/components/Select";
import { FILTER_OPTIONS } from "~/constants/filters";
import { SORT_OPTIONS } from "~/constants/filters";
import { useOptimisticSearchParams } from "~/hooks/useOptimisticSearchParams";

export const SortFilter = () => {
  const [searchParams, setSearchParams] = useOptimisticSearchParams();

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
      case "title-asc":
        next.set(FILTER_OPTIONS.SORT_BY, "title");
        next.set(FILTER_OPTIONS.ORDER, "asc");
        break;
      case "title-desc":
        next.set(FILTER_OPTIONS.SORT_BY, "title");
        next.set(FILTER_OPTIONS.ORDER, "desc");
        break;
      default:
        next.delete(FILTER_OPTIONS.SORT_BY);
        next.delete(FILTER_OPTIONS.ORDER);
        break;
    }
    next.delete(FILTER_OPTIONS.PAGE);
    setSearchParams(next);
  };

  return (
    <Select onChange={onSortChange} value={getValue()}>
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

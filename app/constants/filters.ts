export const FILTER_OPTIONS = {
  CATEGORY: "category",
  SORT_BY: "sortBy",
  ORDER: "order",
  LIMIT: "limit",
  SKIP: "skip",
  SELECT: "select",
  PAGE: "page",
  Q: "q",
} as const;

export const SORT_OPTIONS = [
  {
    value: "all",
    label: "Sort by",
  },
  {
    value: "price-asc",
    label: "Price (Low-High)",
  },
  {
    value: "price-desc",
    label: "Price (High-Low)",
  },
  {
    value: "title-asc",
    label: "Name (A-Z)",
  },
  {
    value: "title-desc",
    label: "Name (Z-A)",
  },
] as const;

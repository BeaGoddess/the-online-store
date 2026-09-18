import { FILTER_OPTIONS } from "~/constants/filters";
import { DEFAULT_LIMIT } from "./product";

interface BuildProductQueryParams {
  sortBy?: string;
  order?: string;
  currentPage: number;
  limit: number;
  search?: string;
}

export const getProductQueryParams = (url: URL): BuildProductQueryParams => {
  return {
    sortBy: url.searchParams.get(FILTER_OPTIONS.SORT_BY) || undefined,
    order: url.searchParams.get(FILTER_OPTIONS.ORDER) || undefined,
    currentPage: parseInt(url.searchParams.get(FILTER_OPTIONS.PAGE) || "1"),
    limit: parseInt(
      url.searchParams.get(FILTER_OPTIONS.LIMIT) || DEFAULT_LIMIT.toString(),
    ),
    search: url.searchParams.get(FILTER_OPTIONS.Q) || undefined,
  };
};

export const buildProductQueryParams = ({
  sortBy,
  order,
  currentPage,
  limit,
  search,
}: BuildProductQueryParams) => {
  const params = new URLSearchParams();
  if (sortBy) {
    params.set(FILTER_OPTIONS.SORT_BY, sortBy);
  }
  if (order) {
    params.set(FILTER_OPTIONS.ORDER, order);
  }
  if (search) {
    params.set(FILTER_OPTIONS.Q, search);
  }
  params.set(FILTER_OPTIONS.LIMIT, limit.toString());
  if (currentPage > 1) {
    params.set(FILTER_OPTIONS.SKIP, ((currentPage - 1) * limit).toString());
  }
  params.set(
    FILTER_OPTIONS.SELECT,
    "title,price,description,images,brand,rating,discountPercentage,stock,availabilityStatus,warrantyInformation,shippingInformation,returnPolicy",
  );

  return params;
};

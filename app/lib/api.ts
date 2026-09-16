import { FILTER_OPTIONS } from "~/constants/filters";
import type { Category } from "~/types/category";
import type { ProductResponse } from "~/types/product";

const BASE_URL = "https://dummyjson.com";

export const DEFAULT_LIMIT = 9;

interface BuildProductQueryParams {
  sortBy?: string;
  order?: string;
  currentPage: number;
  limit: number;
}

const getProductQueryParams = (url: URL): BuildProductQueryParams => {
  return {
    sortBy: url.searchParams.get(FILTER_OPTIONS.SORT_BY) || undefined,
    order: url.searchParams.get(FILTER_OPTIONS.ORDER) || undefined,
    currentPage: parseInt(url.searchParams.get(FILTER_OPTIONS.PAGE) || "1"),
    limit: DEFAULT_LIMIT,
  };
};

const buildProductQueryParams = ({
  sortBy,
  order,
  currentPage,
  limit,
}: BuildProductQueryParams) => {
  const params = new URLSearchParams();
  if (sortBy) {
    params.set(FILTER_OPTIONS.SORT_BY, sortBy);
  }
  if (order) {
    params.set(FILTER_OPTIONS.ORDER, order);
  }
  params.set(FILTER_OPTIONS.LIMIT, limit.toString());
  if (currentPage > 1) {
    params.set(FILTER_OPTIONS.SKIP, ((currentPage - 1) * limit).toString());
  }
  params.set(FILTER_OPTIONS.SELECT, "title,price,description,images");

  return params;
};

export const getProducts = async (url: URL): Promise<ProductResponse> => {
  const category = url.searchParams.get(FILTER_OPTIONS.CATEGORY);
  const queryParams = getProductQueryParams(url);
  const buildParams = buildProductQueryParams(queryParams);

  const apiUrl = category
    ? `${BASE_URL}/products/category/${category}?${buildParams.toString()}`
    : `${BASE_URL}/products?${buildParams.toString()}`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

export const getProductCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${BASE_URL}/products/categories`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

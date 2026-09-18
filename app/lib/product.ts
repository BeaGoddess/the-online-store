import { FILTER_OPTIONS } from "~/constants/filters";
import { apiFetch } from "~/lib/api-fetch";
import type { Product, ProductResponse } from "~/types/product";
import {
  getProductQueryParams,
  buildProductQueryParams,
} from "~/lib/product-query";

// Figma shows 9 products per page, but 12 is a better number for better responsive layouts (mobile & desktop)
export const DEFAULT_LIMIT = 12;

export const getDiscountedPrice = (price: number, discountPercentage: number) =>
  price - (price * discountPercentage) / 100;

export const getProduct = async (id: string): Promise<Product> => {
  const response = await apiFetch<Product>({
    path: `/products/${id}`,
  });
  return response.data;
};

export const getProducts = async (url: URL): Promise<ProductResponse> => {
  const category = url.searchParams.get(FILTER_OPTIONS.CATEGORY);
  const search = url.searchParams.get(FILTER_OPTIONS.Q);
  const queryParams = getProductQueryParams(url);
  const buildParams = buildProductQueryParams(queryParams);

  const path = search
    ? `/products/search?${buildParams.toString()}`
    : category
      ? // Since this API doesn't has a way to filter by more than one category
        // It's needed to use the category endpoint to get the products for that category
        `/products/category/${category}?${buildParams.toString()}`
      : `/products?${buildParams.toString()}`;

  const response = await apiFetch<ProductResponse>({
    path,
  });
  return response.data;
};

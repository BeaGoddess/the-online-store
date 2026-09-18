import type { Category } from "~/types/category";
import { apiFetch } from "~/lib/api-fetch";

export const getProductCategories = async (): Promise<Category[]> => {
  const response = await apiFetch<Category[]>({
    path: "/products/categories",
  });
  return response.data;
};

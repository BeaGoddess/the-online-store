import type { Route } from "./+types/search-preview";
import { getProducts } from "~/lib/product";
import type { ProductResponse } from "~/types/product";
import { getErrorMessage } from "~/lib/errors";

export const shouldRevalidate = () => false;

export interface SearchPreviewResponse {
  query: string;
  productsData: ProductResponse | null;
  error: string | null;
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<SearchPreviewResponse> {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  url.searchParams.set("limit", "5");

  try {
    const productsData = await getProducts(url);
    return { query: q, productsData, error: null };
  } catch (err) {
    return {
      query: q,
      productsData: null,
      error: getErrorMessage(err, "We couldn't load the products."),
    };
  }
}

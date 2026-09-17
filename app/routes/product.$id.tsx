import type { Route } from "./+types/product.$id";
import { getProduct } from "~/lib/product";
import { ProductDetailsView } from "~/views/ProductDetailsView";

export async function loader({ params }: Route.LoaderArgs) {
  try {
    const product = await getProduct(params.id);
    return { product, error: null };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Something went wrong.";
    return { product: null, error: message };
  }
}

export default function ProductPage() {
  return <ProductDetailsView />;
}

import type { Route } from "./+types/home";
import { HomeView } from "~/views/HomeView";
import { getProductCategories } from "~/lib/category";
import { getProducts } from "~/lib/product";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "THE ONLINE STORE" },
    { name: "description", content: "The online store for all your needs" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  try {
    const [products, categories] = await Promise.all([
      getProducts(url),
      getProductCategories(),
    ]);
    return { productsData: products, categories, error: null };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Something went wrong.";
    return {
      productsData: null,
      categories: [],
      error: message,
    };
  }
}

export default function Home() {
  return <HomeView />;
}

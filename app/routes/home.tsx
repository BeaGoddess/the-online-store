import type { Route } from "./+types/home";
import { HomeView } from "~/views/HomeView";
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
    const products = await getProducts(url);
    return { productsData: products, error: null };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Something went wrong.";
    return {
      productsData: null,
      error: message,
    };
  }
}

export default function Home() {
  return <HomeView />;
}

import type { Route } from "./+types/home";
import { HomeView } from "~/views/HomeView";
import { getProducts } from "~/lib/product";
import { getErrorMessage } from "~/lib/errors";

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
    return {
      productsData: null,
      error: getErrorMessage(err, "We couldn't load the products."),
    };
  }
}

export default function Home() {
  return <HomeView />;
}

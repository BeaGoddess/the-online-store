import type { Route } from "./+types/home";
import { Header } from "../components/Header";
import { HomeView } from "~/views/HomeView";
import { getProductCategories, getProducts } from "~/lib/api";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "THE ONLINE STORE" },
    { name: "description", content: "The online store for all your needs" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);

  const [products, categories] = await Promise.all([
    getProducts(url),
    getProductCategories(),
  ]);

  return {
    productsData: products,
    categories,
  };
}

export default function Home() {
  return (
    <>
      <Header />
      <HomeView />
    </>
  );
}

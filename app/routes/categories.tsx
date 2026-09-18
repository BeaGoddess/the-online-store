import { Outlet } from "react-router";
import { getProductCategories } from "~/lib/category";

export async function loader() {
  console.log("loader");
  const categories = await getProductCategories();
  return { categories };
}

export function shouldRevalidate() {
  return false;
}

export default function CategoriesLayout() {
  return <Outlet />;
}

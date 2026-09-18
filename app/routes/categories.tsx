import { Outlet } from "react-router";
import { getProductCategories } from "~/lib/category";
import { getErrorMessage } from "~/lib/errors";

export async function loader() {
  try {
    const categories = await getProductCategories();
    return { categories, error: null };
  } catch (err) {
    return {
      categories: null,
      error: getErrorMessage(err, "We couldn't load the categories."),
    };
  }
}

export function shouldRevalidate() {
  return false;
}

export default function CategoriesLayout() {
  return <Outlet />;
}

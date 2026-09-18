import { type Category } from "~/types/category";
import { useRouteLoaderData } from "react-router";
import type { loader } from "~/routes/categories";
import { useCategoryFilter } from "~/hooks/useCategoryFilter";

export const CategorySection = () => {
  const { categories } =
    useRouteLoaderData<typeof loader>("routes/categories")!;
  const { selectedCategory, selectCategory } = useCategoryFilter();

  const toggleCategory = (category: Category) => {
    const sameCategory = selectedCategory === category.slug;
    selectCategory(sameCategory ? "" : category.slug);
  };

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="hidden min-w-[240px] flex-col gap-4 py-6 md:flex">
      <p className="mb-2 font-semibold">Categories</p>

      <div className="border-primary flex max-h-[305px] flex-col gap-4 overflow-y-auto border-b pb-4">
        {categories.map((category) => (
          <label key={category.slug} className="flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-primary"
              checked={selectedCategory === category.slug}
              onChange={() => toggleCategory(category)}
            />
            {category.name}
          </label>
        ))}
      </div>
    </div>
  );
};

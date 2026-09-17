import { type Category } from "~/types/category";
import { useLoaderData } from "react-router";
import type { loader } from "~/routes/home";
import { useCategoryFilter } from "~/hooks/useCategoryFilter";

export const CategorySection = () => {
  const { categories } = useLoaderData<typeof loader>();
  const { selectedCategory, selectCategory } = useCategoryFilter();

  const toggleCategory = (category: Category) => {
    const sameCategory = selectedCategory === category.slug;
    selectCategory(sameCategory ? "" : category.slug);
  };

  return (
    <div className="sticky top-0 hidden min-w-60 flex-col gap-4 py-6 md:flex">
      <p className="mb-2 font-semibold">Categories</p>
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
  );
};

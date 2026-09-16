import { type Category } from "~/types/category";
import { useLoaderData, useSearchParams } from "react-router";
import { FILTER_OPTIONS } from "~/constants/filters";
import type { loader } from "~/routes/home";

export const CategorySection = () => {
  const { categories } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get(FILTER_OPTIONS.CATEGORY);

  const toggleCategory = (category: Category) => {
    const sameCategory = selectedCategory === category.slug;
    const next = new URLSearchParams(searchParams);
    if (sameCategory) {
      next.delete(FILTER_OPTIONS.CATEGORY);
    } else {
      next.set(FILTER_OPTIONS.CATEGORY, category.slug);
    }
    next.delete(FILTER_OPTIONS.PAGE);
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="sticky top-0 flex min-w-60 flex-col gap-4 py-6">
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

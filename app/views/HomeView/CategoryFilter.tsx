import { useRouteLoaderData } from "react-router";
import type { loader } from "~/routes/categories";
import { Select } from "~/components/Select";
import { useCategoryFilter } from "~/hooks/useCategoryFilter";

export const CategoryFilter = () => {
  const { categories } =
    useRouteLoaderData<typeof loader>("routes/categories")!;
  const { selectedCategory, selectCategory } = useCategoryFilter();

  return (
    <Select
      wrapperClassName="md:hidden"
      value={selectedCategory}
      onChange={(event) => selectCategory(event.target.value)}
    >
      <option value="">All categories</option>
      {categories.map((category) => (
        <option key={category.slug} value={category.slug}>
          {category.name}
        </option>
      ))}
    </Select>
  );
};

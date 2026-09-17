import { useLoaderData } from "react-router";
import type { loader } from "~/routes/home";
import { Select } from "~/components/Select";
import { useCategoryFilter } from "~/hooks/useCategoryFilter";

export const CategoryFilter = () => {
  const { categories } = useLoaderData<typeof loader>();
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

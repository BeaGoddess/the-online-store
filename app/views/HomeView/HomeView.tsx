import { useLoaderData } from "react-router";
import type { loader } from "~/routes/home";
import { ProductsGrid } from "~/components/ProductsGrid";
import { usePagination } from "~/hooks/usePagination";
import { ActiveSearch, CategorySection, SortFilter } from "~/views/HomeView";

export const HomeView = () => {
  const { productsData, error } = useLoaderData<typeof loader>();
  const { products } = productsData ?? { products: [] };
  const {
    currentPage,
    totalPages,
    currentStartCount,
    currentEndCount,
    onPageChange,
  } = usePagination({ total: productsData?.total ?? 0 });

  return (
    <div className="flex w-full flex-row items-start gap-12">
      <div className="my-6 flex w-full flex-col gap-6">
        <div className="flex flex-row items-center justify-between">
          <SortFilter />
          {productsData && (
            <p>
              Showing {currentStartCount}-{currentEndCount} of{" "}
              {productsData.total}
            </p>
          )}
        </div>
        <ActiveSearch />
        <ProductsGrid
          products={products}
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
      <CategorySection />
    </div>
  );
};

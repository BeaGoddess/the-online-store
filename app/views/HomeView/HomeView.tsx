import { CategorySection } from "./CategorySection";
import { SortFilter } from "./SortFilter";
import { useLoaderData, useSearchParams } from "react-router";
import type { loader } from "~/routes/home";
import { Pagination } from "./Pagination";
import { FILTER_OPTIONS } from "~/constants/filters";
import { DEFAULT_LIMIT } from "~/lib/api";

export const HomeView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { productsData } = useLoaderData<typeof loader>();
  const { products } = productsData;
  const currentPage = parseInt(searchParams.get(FILTER_OPTIONS.PAGE) || "1");

  const onPageChange = (page: number) => {
    const next = new URLSearchParams(searchParams);
    next.set(FILTER_OPTIONS.PAGE, page.toString());
    setSearchParams(next);
  };

  const totalPages = Math.ceil(productsData.total / DEFAULT_LIMIT);
  const currentStartCount = (currentPage - 1) * DEFAULT_LIMIT + 1;
  const currentEndCount = Math.min(
    currentPage * DEFAULT_LIMIT,
    productsData.total,
  );

  return (
    <main className="container mx-auto mb-12 w-full px-12">
      <div className="flex w-full flex-row items-start gap-12">
        <div className="my-6 flex w-full flex-col gap-6">
          <div className="flex flex-row items-center justify-between">
            <SortFilter />
            <p>
              Showing {currentStartCount}-{currentEndCount} of{" "}
              {productsData.total}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((item) => (
              <div key={item.id} className="flex flex-col gap-3">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="bg-primary/10 aspect-square w-full shrink-0 object-cover"
                />
                <div className="flex flex-col">
                  <p className="text-base">{item.title}</p>
                  <p className="text-base">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            className="justify-end"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
        <CategorySection />
      </div>
    </main>
  );
};

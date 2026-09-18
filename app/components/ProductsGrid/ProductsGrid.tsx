import { Link, useRevalidator } from "react-router";
import { SearchX } from "lucide-react";
import { Badge } from "~/components/Badge";
import { Button } from "~/components/Button";
import { StatePlaceholder } from "~/components/StatePlaceholder";
import type { Product } from "~/types/product";
import { DEFAULT_LIMIT } from "~/lib/product";
import { getDiscountedPrice } from "~/lib/product";
import { Pagination } from "~/components/Pagination";
import { ProductSkeleton } from "~/components/ProductsGrid";
import { useOptimisticSearchParams } from "~/hooks/useOptimisticSearchParams";

interface ProductsGridProps {
  products: Product[];
  error: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const ProductsGrid = ({
  products,
  error,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: ProductsGridProps) => {
  const revalidator = useRevalidator();
  const isRetrying = revalidator.state === "loading";

  const [, setSearchParams] = useOptimisticSearchParams();

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const handleRetry = () => {
    revalidator.revalidate();
  };

  if (isLoading) {
    return (
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
        {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </ul>
    );
  }

  if (error) {
    return (
      <StatePlaceholder
        titleClassName="text-3xl"
        title="Something went wrong"
        message={error}
        action={
          <Button className="mt-2" disabled={isRetrying} onClick={handleRetry}>
            {revalidator.state === "loading" ? "Retrying..." : "Try again"}
          </Button>
        }
      />
    );
  }

  if (products.length === 0) {
    return (
      <StatePlaceholder
        icon={SearchX}
        titleClassName="text-3xl"
        title="No products found"
        message="Try adjusting your search or filters."
        action={
          <Button className="mt-2" onClick={handleResetFilters}>
            Reset filters
          </Button>
        }
      />
    );
  }

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
        {products.map((item) => (
          <li key={item.id}>
            <Link
              to={`/product/${item.id}`}
              className="group flex flex-col gap-3"
            >
              <div className="bg-primary/10 relative aspect-square w-full shrink-0 overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="aspect-square w-full shrink-0 object-cover transition-all duration-300 group-hover:scale-110"
                />
                {Math.round(item.discountPercentage) > 0 && (
                  <Badge className="absolute top-2 left-2">
                    -{Math.round(item.discountPercentage)}%
                  </Badge>
                )}
                {item.stock === 0 && (
                  <Badge variant="secondary" className="absolute top-2 right-2">
                    Out of stock
                  </Badge>
                )}
              </div>
              <div className="flex flex-col">
                <p className="text-base">{item.title}</p>
                <div className="flex items-center gap-2">
                  <p className="text-base">
                    $
                    {getDiscountedPrice(
                      item.price,
                      item.discountPercentage,
                    ).toFixed(2)}
                  </p>
                  {Math.round(item.discountPercentage) > 0 && (
                    <p className="text-primary/50 text-sm line-through">
                      ${item.price.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination
        className="justify-end"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
};

import { Link } from "react-router";
import { Badge } from "~/components/Badge";
import type { Product } from "~/types/product";
import { Pagination } from "../Pagination/Pagination";
import { getDiscountedPrice } from "~/lib/product";

interface ProductsGridProps {
  products: Product[];
  error: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ProductsGrid = ({
  products,
  error,
  currentPage,
  totalPages,
  onPageChange,
}: ProductsGridProps) => {
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
        {error && <p>{error}</p>}
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

import { Link } from "react-router";
import type { Product } from "~/types/product";
import { Pagination } from "../Pagination/Pagination";

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
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
        {products.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            className="group flex flex-col gap-3"
          >
            <div className="bg-primary/10 aspect-square w-full shrink-0 overflow-hidden">
              <img
                src={item.images[0]}
                alt={item.title}
                className="aspect-square w-full shrink-0 object-cover transition-all duration-300 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-base">{item.title}</p>
              <p className="text-base">${item.price}</p>
            </div>
          </Link>
        ))}
        {error && <p>{error}</p>}
      </div>
      <Pagination
        className="justify-end"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
};

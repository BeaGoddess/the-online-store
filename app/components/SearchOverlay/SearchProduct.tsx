import { Link } from "react-router";
import type { Product } from "~/types/product";

interface SearchProductProps {
  product: Product;
  handleClose: () => void;
}

export const SearchProduct = ({ product, handleClose }: SearchProductProps) => {
  return (
    <Link
      className="flex max-w-30 shrink-0 flex-col gap-1"
      to={`/product/${product.id}`}
      onClick={handleClose}
    >
      <img
        src={product.images[0]}
        alt={product.title}
        className="bg-primary/10 aspect-square shrink-0"
      />
      <p className="text-sm">{product.title}</p>
      <p className="text-sm">${product.price}</p>
    </Link>
  );
};

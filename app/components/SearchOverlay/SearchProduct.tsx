import { Link } from "react-router";
import { Badge } from "~/components/Badge";
import type { Product } from "~/types/product";
import { getDiscountedPrice } from "~/lib/product";

interface SearchProductProps {
  product: Product;
  handleClose: () => void;
}

export const SearchProduct = ({ product, handleClose }: SearchProductProps) => {
  const discountedPrice = getDiscountedPrice(
    product.price,
    product.discountPercentage,
  );

  return (
    <Link
      className="flex max-w-30 shrink-0 flex-col gap-1"
      to={`/product/${product.id}`}
      onClick={handleClose}
    >
      <div className="bg-primary/10 relative aspect-square shrink-0 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="aspect-square size-full object-cover"
        />
        {Math.round(product.discountPercentage) > 0 && (
          <Badge className="absolute top-1 left-1 px-1 text-[10px]">
            -{Math.round(product.discountPercentage)}%
          </Badge>
        )}
        {product.stock === 0 && (
          <Badge
            variant="secondary"
            className="absolute top-1 right-1 px-1 text-[10px]"
          >
            Out of stock
          </Badge>
        )}
      </div>
      <p className="text-sm">{product.title}</p>
      <div className="flex items-center gap-1">
        <p className="text-sm">${discountedPrice.toFixed(2)}</p>
        {Math.round(product.discountPercentage) > 0 && (
          <p className="text-primary/50 text-xs line-through">
            ${product.price.toFixed(2)}
          </p>
        )}
      </div>
    </Link>
  );
};

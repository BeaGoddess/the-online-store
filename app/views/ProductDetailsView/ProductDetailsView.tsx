import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useFetcher, useLoaderData } from "react-router";
import { ProductImageSlider } from "~/views/ProductDetailsView";
import type { action, loader } from "~/routes/product.$id";
import { useLastAddedProduct } from "~/hooks/useLastAddedProduct";
import { Accordion } from "~/components/Accordion";
import { Badge } from "~/components/Badge";
import { Button } from "~/components/Button";
import { Rating } from "~/components/Rating";
import { getDiscountedPrice } from "~/lib/product";

export const ProductDetailsView = () => {
  const { product } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const { showLastAddedProduct } = useLastAddedProduct();

  useEffect(() => {
    if (fetcher.data?.success) showLastAddedProduct(fetcher.data.addedItem);
  }, [fetcher.data, showLastAddedProduct]);

  if (!product) return null;

  const isAddingToCart = fetcher.state !== "idle";
  const isOutOfStock = product.stock === 0;
  const discountedPrice = getDiscountedPrice(
    product.price,
    product.discountPercentage,
  );
  const averageReviewRating =
    product.reviews.reduce((sum, review) => sum + review.rating, 0) /
    product.reviews.length;

  // I didn't use the fetcher.Form because the form does not include any input fields to write data
  const handleAddToCart = () => {
    fetcher.submit(
      {
        intent: "add",
        id: product.id,
        title: product.title,
        price: discountedPrice,
        image: product.images[0],
        quantity: 1,
      },
      { method: "post" },
    );
  };

  return (
    <div className="mt-6 flex w-full flex-col items-start gap-12 lg:flex-row">
      <div className="bg-primary/5 w-full">
        <ProductImageSlider images={product.images} alt={product.title} />
      </div>
      <div className="flex w-full shrink-0 flex-col gap-6 lg:w-[400px] lg:min-w-[400px]">
        <div className="font-ubuntu flex flex-col gap-1">
          {product.brand && (
            <p className="text-primary/60 text-sm">{product.brand}</p>
          )}
          <h2 className="text-primary text-[28px] leading-8 font-bold tracking-[-1%]">
            {product.title}
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-primary text-[28px] leading-8 font-bold tracking-[-1%]">
              ${discountedPrice.toFixed(2)}
            </p>
            {Math.round(product.discountPercentage) > 0 && (
              <>
                <p className="text-primary/50 text-lg line-through">
                  ${product.price.toFixed(2)}
                </p>
                <Badge>-{Math.round(product.discountPercentage)}%</Badge>
              </>
            )}
          </div>
          <p className={isOutOfStock ? "text-red-600" : "text-primary/60"}>
            {isOutOfStock ? "Out of stock" : product.availabilityStatus}
          </p>
        </div>
        <Button
          className="flex w-full items-center justify-center gap-2 rounded-none"
          onClick={handleAddToCart}
          disabled={isOutOfStock || isAddingToCart}
        >
          {isAddingToCart && <Loader2 className="size-4 animate-spin" />}
          {isOutOfStock
            ? "Available Soon"
            : isAddingToCart
              ? "Adding..."
              : "Add to Cart"}
        </Button>

        <div className="border-primary font-ubuntu flex flex-col gap-2 border-t pt-4">
          <h2>Product Details</h2>
          <Rating rating={product.rating} />
          <p>{product.description}</p>
        </div>
        <div className="border-primary font-ubuntu flex flex-col gap-1 border-t pt-4 text-sm">
          <p>{product.warrantyInformation}</p>
          <p>{product.shippingInformation}</p>
          <p>{product.returnPolicy}</p>
        </div>

        <Accordion
          className="border-primary font-ubuntu border-t pt-4"
          title={
            <div className="flex items-center gap-2">
              <h2>Reviews ({product.reviews.length})</h2>
              {product.reviews.length > 0 && (
                <Rating rating={averageReviewRating} />
              )}
            </div>
          }
        >
          {product.reviews.length === 0 ? (
            <p className="text-primary/60 pt-2 text-sm">No reviews yet.</p>
          ) : (
            <div className="flex flex-col gap-4 pt-4">
              {product.reviews.map((review, index) => (
                <div
                  key={`${review.reviewerEmail}-${index}`}
                  className="border-primary/20 flex flex-col gap-1 border-t pt-3 first:border-t-0 first:pt-0"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{review.reviewerName}</p>
                    <Rating rating={review.rating} />
                  </div>
                  <p className="text-primary/70 text-sm">{review.comment}</p>
                  <p className="text-primary/40 text-xs">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Accordion>
      </div>
    </div>
  );
};

import { useLoaderData } from "react-router";
import type { loader } from "~/routes/product.$id";
import { ProductImageSlider } from "./ProductImageSlider";

export const ProductDetailsView = () => {
  const { product } = useLoaderData<typeof loader>();
  if (!product) return null;

  return (
    <div className="mt-6 flex w-full flex-col items-start gap-12 lg:flex-row">
      <div className="bg-primary/5 w-full">
        <ProductImageSlider images={product.images} alt={product.title} />
      </div>
      <div className="flex w-full flex-col gap-6 lg:max-w-100 lg:min-w-100">
        <div className="font-ubuntu flex flex-col">
          <p className="text-primary text-[28px] leading-8 font-bold tracking-[-1%]">
            {product.title}
          </p>
          <p className="text-primary text-[28px] leading-8 font-bold tracking-[-1%]">
            ${product.price}
          </p>
        </div>
        <button className="bg-primary hover:bg-primary/90 w-full cursor-pointer px-4 py-2 font-mono text-white transition-all duration-300">
          Add to Cart
        </button>
        <div className="border-primary font-ubuntu flex flex-col gap-2 border-t pt-4">
          <p>Product Details</p>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

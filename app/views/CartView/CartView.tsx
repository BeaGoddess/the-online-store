import { Link, useFetcher, useRouteLoaderData } from "react-router";
import { Minus, Plus, Trash } from "lucide-react";
import { useMemo } from "react";
import { Button, buttonVariants } from "~/components/Button";
import { Input } from "~/components/Input";
import { SHIPPING_FEE } from "~/constants/cart";
import { cn } from "~/lib/utils";
import type { loader as rootLoader } from "~/root";

export const CartView = () => {
  const rootData = useRouteLoaderData<typeof rootLoader>("root");
  const { cartItems } = rootData ?? { cartItems: [] };
  const fetcher = useFetcher();

  const handleRemoveCartItem = (id: number) => {
    fetcher.submit({ intent: "remove", id }, { method: "post" });
  };

  const handleUpdateCartItemQuantity = (id: number, quantity: number) => {
    fetcher.submit({ intent: "update", id, quantity }, { method: "post" });
  };

  const totalCartPrice = useMemo(
    () =>
      cartItems.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0,
      ),
    [cartItems],
  );

  const totalShippingFee = useMemo(() => {
    return totalCartPrice + SHIPPING_FEE;
  }, [totalCartPrice]);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="font-ubuntu text-xl">Your cart is empty.</p>
        <Link to="/" className={cn(buttonVariants.primary, "cursor-pointer")}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-12 lg:flex-row lg:items-start">
      <div className="my-2 flex w-full flex-col divide-y divide-black">
        {cartItems.map((cartItem) => (
          <div key={cartItem.id} className="flex items-start gap-6 py-4">
            <Link
              to={`/product/${cartItem.id}`}
              className="bg-primary/5 size-39 shrink-0 overflow-hidden"
            >
              <img
                src={cartItem.image}
                alt={cartItem.title}
                className="size-full object-cover"
              />
            </Link>
            <div className="flex flex-col justify-between self-stretch">
              <div className="flex flex-1 flex-col">
                <p className="text-md">{cartItem.title}</p>
                <p className="text-md font-ubuntu">
                  ${cartItem.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="border-primary flex w-fit items-center gap-2 rounded-lg border px-3 py-1">
                  <Button
                    variant="icon"
                    onClick={() =>
                      handleUpdateCartItemQuantity(
                        cartItem.id,
                        cartItem.quantity - 1,
                      )
                    }
                  >
                    <Minus className="size-4" strokeWidth={1} />
                  </Button>
                  <span className="w-4 text-center">{cartItem.quantity}</span>
                  <Button
                    variant="icon"
                    onClick={() =>
                      handleUpdateCartItemQuantity(
                        cartItem.id,
                        cartItem.quantity + 1,
                      )
                    }
                  >
                    <Plus className="size-4" strokeWidth={1.5} />
                  </Button>
                </div>

                <Button
                  variant="icon"
                  onClick={() => handleRemoveCartItem(cartItem.id)}
                >
                  <Trash className="size-6" strokeWidth={1.5} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="font-ubuntu border-primary my-6 flex w-full flex-col gap-6 rounded-2xl border p-6 lg:max-w-[400px] lg:min-w-[400px]">
        <div className="flex flex-col gap-3">
          <p className="text-xl font-bold">Cart Summary</p>

          <div>
            <div className="mt-3 flex items-center justify-between">
              <p>Subtotal</p>
              <p>${totalCartPrice.toFixed(2)}</p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p>Shipping</p>
              <p>${SHIPPING_FEE.toFixed(2)}</p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p>Total</p>
              <p>${totalShippingFee.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <Button className="w-full font-normal">Check out</Button>
        <Button variant="secondary" className="text-center font-normal">
          Or pay with PayPal
        </Button>
        <div className="border-primary flex flex-row items-end gap-3 border-t pt-4">
          <div className="flex w-full flex-col gap-1">
            <label htmlFor="promo-code" className="text-sm font-normal">
              Promo Code
            </label>
            <Input
              id="promo-code"
              placeholder="Enter code"
              className="leading-5"
            />
          </div>
          <Button className="font-ubuntu inline-block leading-5 font-normal">
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

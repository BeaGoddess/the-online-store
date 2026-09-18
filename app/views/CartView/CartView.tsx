import { Link, useFetchers, useRouteLoaderData } from "react-router";
import { useMemo } from "react";
import { Button, buttonVariants } from "~/components/Button";
import { Input } from "~/components/Input";
import { SHIPPING_FEE } from "~/constants/cart";
import { cn } from "~/lib/utils";
import type { loader as rootLoader } from "~/root";
import type { CartItem } from "~/types/cart";
import { CartItemRow } from "~/views/CartView";

export const CartView = () => {
  const rootData = useRouteLoaderData<typeof rootLoader>("root");
  const { cartItems } = rootData ?? { cartItems: [] };
  const fetchers = useFetchers();

  const optimisticCartItems = useMemo(() => {
    return cartItems.flatMap((item): CartItem[] => {
      const pending = fetchers.filter(
        (f) => Number(f.formData?.get("id")) === item.id && f.formData,
      );

      // If there are multiple pending updates, use the last one
      const last = pending.at(-1);
      if (!last?.formData) return [item];

      const intent = last.formData.get("intent");
      if (intent === "remove") return [];
      if (intent === "update") {
        const quantity = Number(last.formData.get("quantity"));
        return quantity < 1 ? [] : [{ ...item, quantity }];
      }
      return [item];
    });
  }, [cartItems, fetchers]);

  const subTotal = optimisticCartItems.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );

  const totalOrder = subTotal + SHIPPING_FEE;

  if (optimisticCartItems.length === 0) {
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
        {optimisticCartItems.map((cartItem) => (
          <CartItemRow key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
      <div className="font-ubuntu border-primary my-6 flex w-full flex-col gap-6 rounded-2xl border p-6 lg:max-w-[400px] lg:min-w-[400px]">
        <div className="flex flex-col gap-3">
          <p className="text-xl font-bold">Cart Summary</p>

          <div>
            <div className="mt-3 flex items-center justify-between">
              <p>Subtotal</p>
              <p>${subTotal.toFixed(2)}</p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p>Shipping</p>
              <p>${SHIPPING_FEE.toFixed(2)}</p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p>Total</p>
              <p>${totalOrder.toFixed(2)}</p>
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

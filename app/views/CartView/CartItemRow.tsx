import { Link, useFetcher } from "react-router";
import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "~/components/Button";
import type { CartItem } from "~/types/cart";
import type { action } from "~/routes/cart";

interface CartItemRowProps {
  cartItem: CartItem;
}

export const CartItemRow = ({ cartItem }: CartItemRowProps) => {
  const fetcher = useFetcher<typeof action>();

  const isPending = fetcher.state !== "idle";
  const pendingIntent = fetcher.formData?.get("intent");

  // Optmistic update
  const pendingQuantity = fetcher.formData?.has("quantity")
    ? Number(fetcher.formData.get("quantity"))
    : undefined;

  // Optimistic removal
  const isOptimisticallyRemoved =
    isPending &&
    (pendingIntent === "remove" ||
      (pendingIntent === "update" &&
        pendingQuantity !== undefined &&
        pendingQuantity < 1));

  if (isOptimisticallyRemoved) return null;

  const quantity =
    isPending && pendingIntent === "update" && pendingQuantity !== undefined
      ? pendingQuantity
      : cartItem.quantity;

  const handleRemove = () => {
    fetcher.submit({ intent: "remove", id: cartItem.id }, { method: "post" });
  };

  const handleUpdateQuantity = (nextQuantity: number) => {
    fetcher.submit(
      { intent: "update", id: cartItem.id, quantity: nextQuantity },
      { method: "post" },
    );
  };

  return (
    <div className="flex items-start gap-6 py-4">
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
          <p className="text-md font-ubuntu">${cartItem.price.toFixed(2)}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="border-primary flex w-fit items-center gap-2 rounded-lg border px-3 py-1">
            <Button
              variant="icon"
              onClick={() => handleUpdateQuantity(quantity - 1)}
            >
              <Minus className="size-4" strokeWidth={1} />
            </Button>
            <span className="w-4 text-center">{quantity}</span>
            <Button
              variant="icon"
              onClick={() => handleUpdateQuantity(quantity + 1)}
            >
              <Plus className="size-4" strokeWidth={1.5} />
            </Button>
          </div>

          <Button variant="icon" onClick={handleRemove}>
            <Trash className="size-6" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </div>
  );
};

import { data } from "react-router";
import { CartView } from "~/views/CartView";
import type { Route } from "./+types/cart";
import { cartCookie, getCartFromRequest } from "~/lib/cart-cookie.server";
import type { CartItem } from "~/types/cart";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cart" },
    {
      name: "description",
      content: "View your cart items and checkout process",
    },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  let cartItems: CartItem[] = [];

  try {
    cartItems = await getCartFromRequest(request);
  } catch {
    return data(
      {
        success: false as const,
        error: "Something happened with your cart. Please try again.",
      },
      { headers: { "Set-Cookie": await cartCookie.serialize([]) } },
    );
  }

  const intent = formData.get("intent");

  if (intent === "remove") {
    const id = Number(formData.get("id"));
    const nextCartItems = cartItems.filter((item) => item.id !== id);

    return data(
      { success: true as const },
      { headers: { "Set-Cookie": await cartCookie.serialize(nextCartItems) } },
    );
  }

  if (intent === "update") {
    const id = Number(formData.get("id"));
    const quantity = Number(formData.get("quantity"));
    const nextCartItems =
      quantity < 1
        ? cartItems.filter((item) => item.id !== id)
        : cartItems.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          );

    return data(
      { success: true as const },
      { headers: { "Set-Cookie": await cartCookie.serialize(nextCartItems) } },
    );
  }

  if (intent === "clear") {
    return data(
      { success: true as const },
      { headers: { "Set-Cookie": await cartCookie.serialize([]) } },
    );
  }

  return data({ success: false as const, error: "Unknown intent." });
}

export default function CartPage() {
  return <CartView />;
}

import { createCookie } from "react-router";
import type { CartItem } from "~/types/cart";

export const cartCookie = createCookie("cart", {
  path: "/",
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 30,
});

export const getCartFromRequest = async (
  request: Request,
): Promise<CartItem[]> => {
  const parsed = await cartCookie.parse(request.headers.get("Cookie"));
  return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
};

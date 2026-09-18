import { data } from "react-router";
import type { Route } from "./+types/product.$id";
import { getProduct } from "~/lib/product";
import { ProductDetailsView } from "~/views/ProductDetailsView";
import { cartCookie, getCartFromRequest } from "~/lib/cart-cookie.server";
import type { CartItem } from "~/types/cart";
import { getErrorMessage } from "~/lib/errors";

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData?.product) {
    return [{ title: "Product not found" }];
  }
  return [
    { title: loaderData.product.title },
    { name: "description", content: loaderData.product.description },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  try {
    const product = await getProduct(params.id);
    return { product, error: null };
  } catch (err) {
    return {
      product: null,
      error: getErrorMessage(err, "We couldn't load this product."),
    };
  }
}

// Normally I would use the zod library to validate the form data
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const id = Number(formData.get("id"));
  const title = formData.get("title");
  const price = Number(formData.get("price"));
  const image = formData.get("image");
  const quantity = Number(formData.get("quantity"));

  if (
    !Number.isInteger(id) ||
    typeof title !== "string" ||
    !Number.isFinite(price) ||
    typeof image !== "string" ||
    !Number.isInteger(quantity) ||
    quantity < 1
  ) {
    return data({
      success: false as const,
      error: "Invalid product or quantity.",
    });
  }

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

  const existing = cartItems.find((item) => item.id === id)!;
  const nextCartItems = existing
    ? cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + quantity } : item,
      )
    : [...cartItems, { id, title, price, image, quantity }];
  const addedItem = nextCartItems.find((item) => item.id === id)!;

  return data(
    { success: true as const, addedItem },
    { headers: { "Set-Cookie": await cartCookie.serialize(nextCartItems) } },
  );
}

export default function ProductPage() {
  return <ProductDetailsView />;
}

import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("product/:id", "routes/product.$id.tsx"),
    route("cart", "routes/cart.tsx"),
    route("shop", "routes/shop.tsx"),
    route("deals", "routes/deals.tsx"),
    route("contact", "routes/contact.tsx"),
    route("account", "routes/account.tsx"),
  ]),
  route("search-preview", "routes/search-preview.ts"),
] satisfies RouteConfig;

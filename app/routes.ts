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
  ]),
  route("search-preview", "routes/search-preview.ts"),
] satisfies RouteConfig;

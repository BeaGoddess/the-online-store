# THE ONLINE STORE

**Live demo:** [the-online-store.vercel.app](https://the-online-store.vercel.app)

A e-commerce storefront built with React Router 8 (framework mode), TypeScript, and Tailwind CSS. Product data comes from the [DummyJSON](https://dummyjson.com/) API, and the cart is persisted server-side via an HTTP cookie.

## Tech Stack

- **React Router 8** — routing, SSR, loaders/actions
- **TypeScript**
- **Tailwind CSS 4**
- **lucide-react** — icons
- **DummyJSON API** — products

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

### Production build

```bash
npm run build
npm run start
```



### Other scripts

```bash
npm run typecheck   # react-router typegen + tsc
npm run lint        # eslint
```



## Pages & Features



### Home (`/`)

- Product grid with pagination (12 products per page — the design showed 9, but the grid is 2 columns on mobile and 3 on desktop; 9 items leaves a lone item dangling in the last row on mobile (9 ÷ 2), while 12 divides evenly into both layouts with no orphan row)
- Sort by price (low/high) and title (A-Z/Z-A)
- Filter by category (desktop: sidebar checkbox list, scrollable; mobile: dropdown select)
- Search results view — shows an active "Results for `<search>`" chip with a clear button when arriving from a search
- Out of stock products are badged on their card



### Shop (`/shop`), Deals (`/deals`), Contact (`/contact`), Account (`/account`)

- These routes display "Coming soon" placeholders to avoid triggering the 404 page



### Product details (`/product/:id`)

- Infinite-loop image carousel with arrow navigation and dot indicators
- Price with automatic discount calculation, strikethrough original price, and discount badge (badge hidden when the rounded discount is 0%)
- Stock status ("In Stock" / "Out of stock", with the "Add to Cart" button disabled and relabeled "Available Soon" when out of stock)
- Product details: rating, description, warranty, shipping, and return policy
- Reviews accordion — collapsible section showing `Reviews (count)` and the average star rating in the header. Expands to list each reviewer's name, star rating, comment, and date. Shows "No reviews yet" when a product has none.
- Add to cart, with a confirmation in the header



### Cart (`/cart`)

- Server-persisted cart (HTTP cookie)
- Update item quantity, remove items — optimistic UI (each row updates instantly on click and rolls back automatically if the request fails, via `fetcher.formData`)
- Checkout summary: subtotal, shipping fee, total
- Promo code input (UI only)
- Empty-cart state with a "Continue Shopping" link



### Header / global

- Sticky header that hides on scroll-down and reappears on scroll-up (mobile)
- Search overlay: product search with debounced fetch, auto-focuses the input when opened, and links to full search results
- Cart icon with live item count badge
- Mobile menu drawer with the same nav links as desktop



## Project Structure

```
app/
├── components/     # Reusable UI building blocks (Button, Badge, Rating, Accordion, ...)
├── views/          # Page-level composition (HomeView, ProductDetailsView, CartView)
├── routes/         # React Router route modules (loaders/actions)
├── hooks/
├── context/        # React context providers
├── lib/            # API client, product, category and cart logic, server utilities
├── constants/
└── types/
```



## Screenshots



### Home

**Desktop**


|                                                                                                                                   |                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| ![Home](public/desktop-main.png) Home                                                                                             | ![Pagination](public/desktop-pagination.png) Pagination             |
| ![Filter by category](public/desktop-search-by-category.png) Filter by category                                                   | ![Search results](public/desktop-search-results.png) Search results |
| ![Search results with an out-of-stock product](public/desktop-search-results-product-out-of-stock.png) Out-of-stock product badge |                                                                     |


**Mobile**


|                                                                                                                                         |                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| ![Home mobile](public/mobile-main.png) Home                                                                                             | ![Pagination mobile](public/mobile-pagination.png) Pagination |
| ![Search results mobile](public/mobile-search-results.png) Search results                                                               | ![Menu drawer](public/mobile-menu-drawer.png) Menu drawer     |
| ![Search results with an out-of-stock product mobile](public/mobile-search-results-product-out-of-stock.png) Out-of-stock product badge |                                                               |




### Search

**Desktop**


|                                                                     |                                                                                                      |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| ![Search overlay](public/desktop-search-overlay.png) Search overlay | ![Search overlay preview results](public/desktop-search-overlay-preview-results.png) Preview results |


**Mobile**


|                                                                           |                                                                                                            |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| ![Search overlay mobile](public/mobile-search-overlay.png) Search overlay | ![Search overlay preview results mobile](public/mobile-search-overlay-preview-results.png) Preview results |




### Product Details

**Desktop**


|                                                                               |                                                                                        |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| ![Product details](public/desktop-product-details.png) Product details        | ![Reviews accordion](public/desktop-product-details-reviews.png) Reviews accordion     |
| ![Add to cart](public/desktop-product-add-to-cart.png) Add to cart            | ![Product without a discount](public/desktop-product-without-discount.png) No discount |
| ![Out-of-stock product](public/desktop-product-out-of-stock.png) Out of stock |                                                                                        |


**Mobile**


|                                                                                              |                                                                                     |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| ![Product details mobile](public/mobile-product-details.png) Product details                 | ![Add to cart mobile](public/mobile-product-add-tp-cart.png) Add to cart            |
| ![Product without a discount mobile](public/mobile-product-without-discount.png) No discount | ![Out-of-stock product mobile](public/mobile-product-out-of-stock.png) Out of stock |




### Cart

**Desktop**


|                                                             |                                                         |
| ----------------------------------------------------------- | ------------------------------------------------------- |
| ![Cart with items](public/desktop-cart.png) Cart with items | ![Empty cart](public/desktop-cart-empty.png) Empty cart |


**Mobile**


|                                                        |                                                        |
| ------------------------------------------------------ | ------------------------------------------------------ |
| ![Cart mobile](public/mobile-cart.png) Cart with items | ![Empty cart](public/mobile-cart-empty.png) Empty cart |



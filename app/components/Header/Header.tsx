import { User, ShoppingBag } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useRouteLoaderData } from "react-router";
import { NavItem } from "~/components/NavItem";
import { navLinks } from "~/constants/navLinks";
import { cn } from "~/lib/utils";
import { SearchOverlay } from "~/components/SearchOverlay";
import { MenuDrawer } from "~/components/MenuDrawer";
import { AddedToCartToast } from "~/components/AddedToCartToast";
import { useLastAddedProduct } from "~/hooks/useLastAddedProduct";
import type { loader as rootLoader } from "~/root";

export const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const rootData = useRouteLoaderData<typeof rootLoader>("root");
  const totalCartItems = useMemo(
    () =>
      rootData?.cartItems.reduce((sum, item) => sum + item.quantity, 0) ?? 0,
    [rootData?.cartItems],
  );
  const { lastAddedProduct } = useLastAddedProduct();

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const isAtTop = currentScrollY < 64; // header height

      setIsVisible(!isScrollingDown || isAtTop);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-10 h-16 w-full bg-white transition-transform duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-black md:relative md:translate-y-0",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="container mx-auto grid h-full grid-cols-4 place-items-center px-4 md:px-12 lg:grid-cols-8">
        <Link to="/" className="col-span-2 justify-self-start">
          <h1 className="text-2xl tracking-[6%] uppercase md:text-[32px]">
            The Online Store
          </h1>
        </Link>
        <nav className="col-span-4 hidden w-full flex-row justify-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavItem key={link.to} to={link.to}>
              {link.label}
            </NavItem>
          ))}
        </nav>
        <div className="col-span-2 flex h-full flex-row items-center gap-6 justify-self-end">
          <SearchOverlay />
          <Link
            to="/account"
            className="hover:text-primary/70 transition-colors duration-300"
          >
            <User className="size-6" strokeWidth={1.5} />
          </Link>

          <div className="relative">
            <Link
              to="/cart"
              className="hover:text-primary/70 relative transition-colors duration-300"
            >
              <ShoppingBag className="size-6" strokeWidth={1.5} />
              {totalCartItems > 0 && (
                <span className="bg-primary absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full text-[9px] leading-none text-white">
                  {totalCartItems}
                </span>
              )}
            </Link>
            {lastAddedProduct && (
              <AddedToCartToast
                cartItem={lastAddedProduct}
                key={lastAddedProduct.id}
              />
            )}
          </div>
          <MenuDrawer />
        </div>
      </div>
    </header>
  );
};

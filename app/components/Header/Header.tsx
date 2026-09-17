import { User, ShoppingBag, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { NavItem } from "~/components/NavItem";
import { navLinks } from "~/constants/navLinks";
import { cn } from "~/lib/utils";
import { SearchOverlay } from "~/components/SearchOverlay";

export const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

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
          <Link
            to="/cart"
            className="hover:text-primary/70 transition-colors duration-300"
          >
            <ShoppingBag className="size-6" strokeWidth={1.5} />
          </Link>
          <button className="lg:hidden" type="button">
            <Menu className="size-6" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  );
};

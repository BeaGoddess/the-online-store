import { Search, User, ShoppingBag } from "lucide-react";
import { Link } from "react-router";
import { NavLink } from "~/components/NavLink";
import { navLinks } from "~/constants/navLinks";

export const Header = () => {
  return (
    <header className="relative h-16 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-black">
      <div className="relative container mx-auto flex h-full items-center px-12">
        <Link to="/">
          <h1 className="text-[32px] tracking-[6%] uppercase">
            The online store
          </h1>
        </Link>
        <nav className="absolute left-1/2 flex -translate-x-1/2 flex-row gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex flex-row items-center gap-6">
          <Link
            to="/search"
            className="hover:text-primary/70 transition-colors duration-300"
          >
            <Search className="size-6" strokeWidth={1.5} aria-label="Search" />
          </Link>
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
        </div>
      </div>
    </header>
  );
};

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavItem } from "~/components/NavItem";
import { Overlay } from "~/components/Overlay";
import { navLinks } from "~/constants/navLinks";
import { cn } from "~/lib/utils";
import { Button } from "~/components/Button";

export const MenuDrawer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((open) => !open);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <Button className="lg:hidden" onClick={toggleMenu} variant="unstyled">
        {isMenuOpen ? (
          <X className="size-6" strokeWidth={1.5} />
        ) : (
          <Menu className="size-6" strokeWidth={1.5} />
        )}
      </Button>

      <nav
        className={cn(
          "fixed top-0 right-0 z-20 flex h-screen w-72 max-w-[80%] flex-col gap-1 bg-white px-6 py-6 shadow-lg transition-transform duration-300 lg:hidden",
          isMenuOpen ? "translate-x-0" : "pointer-events-none translate-x-full",
        )}
      >
        <Button
          className="mb-4 self-end"
          onClick={closeMenu}
          variant="unstyled"
        >
          <X className="size-6" strokeWidth={1.5} />
        </Button>
        {navLinks.map((link) => (
          <NavItem
            key={link.to}
            to={link.to}
            onClick={closeMenu}
            className="my-2"
          >
            {link.label}
          </NavItem>
        ))}
      </nav>
      <Overlay
        isOpen={isMenuOpen}
        onClose={closeMenu}
        className="fixed inset-0 lg:hidden"
      />
    </>
  );
};

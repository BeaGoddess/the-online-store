import { cn } from "~/lib/utils";
import { NavLink as RouterNavLink } from "react-router";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

export const NavLink = ({ to, children }: NavLinkProps) => {
  return (
    <RouterNavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        cn(
          "mr-4 transition-colors duration-300",
          isActive ? "font-medium" : "hover:text-primary/70",
        )
      }
    >
      {children}
    </RouterNavLink>
  );
};

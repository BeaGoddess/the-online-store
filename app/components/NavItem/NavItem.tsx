import { cn } from "~/lib/utils";
import { NavLink } from "react-router";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
}

export const NavItem = ({ to, children }: NavItemProps) => {
  return (
    <NavLink
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
    </NavLink>
  );
};

import { cn } from "~/lib/utils";
import { NavLink } from "react-router";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const NavItem = ({ to, children, onClick, className }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "mr-4 transition-colors duration-300",
          isActive ? "font-medium" : "hover:text-primary/70",
          className,
        )
      }
    >
      {children}
    </NavLink>
  );
};

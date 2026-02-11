// Import the NavLink component from react-router-dom along with its props interface
// Also import forwardRef for DOM element referencing and cn utility for conditional classnames
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// Define the interface for NavLinkCompatProps extending the original NavLinkProps
// but omitting className to allow custom handling of active and pending states
interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;        // Base CSS classes applied to the link
  activeClassName?: string;  // CSS classes applied when the link is active
  pendingClassName?: string; // CSS classes applied when the link is in pending state
}

// Custom NavLink component that wraps the react-router-dom NavLink
// Allows for custom styling based on active and pending states
const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  // Destructure the props and spread the rest
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}  // Forward the ref to the underlying DOM element
        to={to}    // The destination route for the link
        // Custom className function that applies different classes based on state
        className={({ isActive, isPending }) =>
          // Use cn utility to conditionally join class names
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        }
        {...props} // Spread any additional props to the RouterNavLink
      />
    );
  },
);

// Set the display name for the component to improve debugging in React DevTools
NavLink.displayName = "NavLink";

// Export the custom NavLink component
export { NavLink };

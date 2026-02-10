// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import ChevronLeft, ChevronRight, and MoreHorizontal icons from lucide-react icon library
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";
// Import ButtonProps type and buttonVariants function for consistent button styling
import { ButtonProps, buttonVariants } from "@/components/ui/button";

// Main Pagination component - container for the entire pagination functionality
// This is a navigation component that helps users navigate through multiple pages
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  // Nav element with role and aria-label for accessibility
  <nav
    role="navigation" // ARIA role indicating this is a navigation element
    aria-label="pagination" // ARIA label describing the purpose of this navigation
    // CSS classes for horizontal centering, flex layout, full width, and item centering
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props} // Spread any additional props passed to the component
  />
);
// Set display name for debugging purposes in React DevTools
Pagination.displayName = "Pagination";

// Pagination Content component - container for pagination items
// Uses React.forwardRef to allow parent components to reference the DOM element
const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    // Unordered list with flex row layout, item centering, and gap between items
    <ul
      ref={ref} // Reference to the underlying DOM element
      // CSS classes for flex row layout, item centering, and gap between items
      className={cn("flex flex-row items-center gap-1", className)}
      {...props} // Spread any additional props passed to the component
    />
  ),
);
// Set display name for debugging purposes in React DevTools
PaginationContent.displayName = "PaginationContent";

// Pagination Item component - individual item in the pagination list
// Uses React.forwardRef to allow parent components to reference the DOM element
const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  // List item with optional custom classes
  <li
    ref={ref} // Reference to the underlying DOM element
    className={cn("", className)} // Apply any additional custom classes
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name for debugging purposes in React DevTools
PaginationItem.displayName = "PaginationItem";

// Define props type for the PaginationLink component
type PaginationLinkProps = {
  // Optional flag to indicate if this link is the currently active page
  isActive?: boolean;
} & 
// Include size property from ButtonProps
Pick<ButtonProps, "size"> &
// Include all anchor element properties
React.ComponentProps<"a">;

// Pagination Link component - link element for navigating to different pages
// Can be styled differently when active (current page)
const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
  // Anchor element with accessibility attributes and conditional styling
  <a
    // ARIA attribute to indicate if this is the current page
    aria-current={isActive ? "page" : undefined}
    // Apply button variants with different styles based on active state
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost", // Outline style when active, ghost style when inactive
        size, // Apply the specified size
      }),
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  />
);
// Set display name for debugging purposes in React DevTools
PaginationLink.displayName = "PaginationLink";

// Pagination Previous component - link to navigate to the previous page
// Uses the PaginationLink component with specific styling and content
const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  // Link with "Previous" text and left chevron icon
  <PaginationLink
    aria-label="Go to previous page" // Accessibility label for screen readers
    size="default" // Default button size
    // CSS classes for gap between elements, left padding
    className={cn("gap-1 pl-2.5", className)}
    {...props} // Spread any additional props passed to the component
  >
    <ChevronLeft className="h-4 w-4" /> {/* Left chevron icon */}
    <span>Previous</span> {/* Text label */}
  </PaginationLink>
);
// Set display name for debugging purposes in React DevTools
PaginationPrevious.displayName = "PaginationPrevious";

// Pagination Next component - link to navigate to the next page
// Uses the PaginationLink component with specific styling and content
const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  // Link with "Next" text and right chevron icon
  <PaginationLink
    aria-label="Go to next page" // Accessibility label for screen readers
    size="default" // Default button size
    // CSS classes for gap between elements, right padding
    className={cn("gap-1 pr-2.5", className)}
    {...props} // Spread any additional props passed to the component
  >
    <span>Next</span> {/* Text label */}
    <ChevronRight className="h-4 w-4" /> {/* Right chevron icon */}
  </PaginationLink>
);
// Set display name for debugging purposes in React DevTools
PaginationNext.displayName = "PaginationNext";

// Pagination Ellipsis component - indicates there are more pages between the current page and other pages
// Uses a span element with a horizontal dots icon
const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  // Span element with flex layout and centering
  <span
    aria-hidden // Hide from screen readers as it's purely visual
    // CSS classes for flex layout, size, and item centering
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props} // Spread any additional props passed to the component
  >
    <MoreHorizontal className="h-4 w-4" /> {/* Horizontal dots icon */}
    <span className="sr-only">More pages</span> {/* Screen reader only text */}
  </span>
);
// Set display name for debugging purposes in React DevTools
PaginationEllipsis.displayName = "PaginationEllipsis";

// Export all pagination components for use in other parts of the application
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};

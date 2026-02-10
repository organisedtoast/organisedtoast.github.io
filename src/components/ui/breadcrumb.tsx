// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Slot from Radix UI to allow passing props through to child components
import { Slot } from "@radix-ui/react-slot";
// Import ChevronRight and MoreHorizontal icons from lucide-react icon library
import { ChevronRight, MoreHorizontal } from "lucide-react";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Main Breadcrumb component - container for the entire breadcrumb navigation
// Uses React.forwardRef to allow parent components to reference the DOM element
const Breadcrumb = React.forwardRef<
  HTMLElement, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<"nav"> & { // Props type combining nav element props with custom props
    separator?: React.ReactNode; // Optional custom separator element
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
// Set display name for debugging purposes in React DevTools
Breadcrumb.displayName = "Breadcrumb";

// Breadcrumb List component - ordered list container for breadcrumb items
// Uses React.forwardRef to allow parent components to reference the DOM element
const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => (
    // Ordered list with flex layout and styling for breadcrumb items
    <ol
      ref={ref} // Reference to the underlying DOM element
      // CSS classes for flex wrapping, alignment, gaps, text sizing, and muted foreground color
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className, // Allow additional custom classes to be passed in
      )}
      {...props} // Spread any additional props passed to the component
    />
  ),
);
// Set display name for debugging purposes in React DevTools
BreadcrumbList.displayName = "BreadcrumbList";

// Breadcrumb Item component - individual list item in the breadcrumb trail
// Uses React.forwardRef to allow parent components to reference the DOM element
const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => (
    // List item with inline flex layout and spacing between elements
    <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
  ),
);
// Set display name for debugging purposes in React DevTools
BreadcrumbItem.displayName = "BreadcrumbItem";

// Breadcrumb Link component - clickable link in the breadcrumb trail
// Uses React.forwardRef to allow parent components to reference the DOM element
const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement, // Type for the DOM element being referenced (anchor tag)
  React.ComponentPropsWithoutRef<"a"> & { // Props type combining anchor element props with custom props
    asChild?: boolean; // Flag to determine if child component should be used instead of 'a'
  }
>(({ asChild, className, ...props }, ref) => {
  // Determine which component to render based on asChild prop
  const Comp = asChild ? Slot : "a";

  // Render the chosen component with link styling and transitions
  return <Comp ref={ref} className={cn("transition-colors hover:text-foreground", className)} {...props} />;
});
// Set display name for debugging purposes in React DevTools
BreadcrumbLink.displayName = "BreadcrumbLink";

// Breadcrumb Page component - represents the current page in the breadcrumb trail
// Uses React.forwardRef to allow parent components to reference the DOM element
const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    // Span element representing the current page with specific accessibility attributes
    <span
      ref={ref} // Reference to the underlying DOM element
      role="link" // Accessibility role indicating this acts like a link
      aria-disabled="true" // Accessibility attribute indicating this is not clickable
      aria-current="page" // Accessibility attribute indicating this is the current page
      className={cn("font-normal text-foreground", className)} // Styling for current page
      {...props} // Spread any additional props passed to the component
    />
  ),
);
// Set display name for debugging purposes in React DevTools
BreadcrumbPage.displayName = "BreadcrumbPage";

// Breadcrumb Separator component - visual separator between breadcrumb items
// Usually displays a chevron icon but can accept custom children
const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  // List item with presentation role and hidden from screen readers
  <li role="presentation" aria-hidden="true" className={cn("[&>svg]:size-3.5", className)} {...props}>
    {/* Display custom children if provided, otherwise default to ChevronRight icon */}
    {children ?? <ChevronRight />}
  </li>
);
// Set display name for debugging purposes in React DevTools
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

// Breadcrumb Ellipsis component - indicates there are more items in the breadcrumb trail
// Used when the breadcrumb trail is too long and needs to be collapsed
const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  // Span element with presentation role and hidden from screen readers
  <span
    role="presentation" // Accessibility role indicating this is for visual presentation only
    aria-hidden="true" // Accessibility attribute hiding this from screen readers
    className={cn("flex h-9 w-9 items-center justify-center", className)} // Styling for ellipsis container
    {...props} // Spread any additional props passed to the component
  >
    {/* MoreHorizontal icon indicating additional items */}
    <MoreHorizontal className="h-4 w-4" />
    {/* Screen reader only text for accessibility */}
    <span className="sr-only">More</span>
  </span>
);
// Set display name for debugging purposes in React DevTools
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

// Export all breadcrumb components for use in other parts of the application
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};

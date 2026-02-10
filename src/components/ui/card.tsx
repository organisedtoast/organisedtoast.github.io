// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Card component - main container for the card UI element
// Uses React.forwardRef to allow parent components to reference the DOM element
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  // Div element with rounded corners, border, background, text color, and subtle shadow
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
));
// Set display name for debugging purposes in React DevTools
Card.displayName = "Card";

// CardHeader component - container for the card's header content (title and description)
// Uses React.forwardRef to allow parent components to reference the DOM element
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    // Div element with flex column layout, vertical spacing, and padding
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
// Set display name for debugging purposes in React DevTools
CardHeader.displayName = "CardHeader";

// CardTitle component - heading text for the card
// Uses React.forwardRef to allow parent components to reference the DOM element
const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    // Heading element (h3) with large, bold text styling
    <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
);
// Set display name for debugging purposes in React DevTools
CardTitle.displayName = "CardTitle";

// CardDescription component - descriptive text for the card
// Uses React.forwardRef to allow parent components to reference the DOM element
const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    // Paragraph element with small, muted text styling
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
// Set display name for debugging purposes in React DevTools
CardDescription.displayName = "CardDescription";

// CardContent component - main content area of the card
// Uses React.forwardRef to allow parent components to reference the DOM element
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
);
// Set display name for debugging purposes in React DevTools
CardContent.displayName = "CardContent";

// CardFooter component - container for the card's footer content
// Uses React.forwardRef to allow parent components to reference the DOM element
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    // Div element with flex layout, item centering, and padding (with top padding adjustment)
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
// Set display name for debugging purposes in React DevTools
CardFooter.displayName = "CardFooter";

// Export all card components for use in other parts of the application
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };

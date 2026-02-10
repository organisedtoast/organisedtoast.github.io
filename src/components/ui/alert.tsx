// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import cva (Class Variance Authority) for defining conditional CSS classes and VariantProps for type definitions
import { cva, type VariantProps } from "class-variance-authority";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Define alert variants using Class Variance Authority (CVA)
// CVA allows us to define different styles based on props (like variant prop)
const alertVariants = cva(
  // Base CSS classes that apply to all alerts regardless of variant
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    // Different style variants based on the 'variant' prop
    variants: {
      variant: {
        // Default alert styling - standard background and text colors
        default: "bg-background text-foreground",
        // Destructive alert styling - typically for error/warning messages with red colors
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    // Set default variant to 'default' when no variant prop is provided
    defaultVariants: {
      variant: "default",
    },
  },
);

// Main Alert component - container for alert messages with different variants
// Uses React.forwardRef to allow parent components to reference the DOM element
const Alert = React.forwardRef<
  HTMLDivElement, // Type for the DOM element being referenced (div)
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants> // Combined props type
>(({ className, variant, ...props }, ref) => (
  // Div element with role="alert" for accessibility, applying variant styles and custom classes
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
// Set display name for debugging purposes in React DevTools
Alert.displayName = "Alert";

// AlertTitle component - heading text for the alert
// Uses React.forwardRef to allow parent components to reference the DOM element
const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    // Heading element (h5) with specific styling for alert titles
    <h5 ref={ref} className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
  ),
);
// Set display name for debugging purposes in React DevTools
AlertTitle.displayName = "AlertTitle";

// AlertDescription component - descriptive text for the alert
// Uses React.forwardRef to allow parent components to reference the DOM element
const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    // Div element with specific styling for alert descriptions
    <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
  ),
);
// Set display name for debugging purposes in React DevTools
AlertDescription.displayName = "AlertDescription";

// Export all alert components for use in other parts of the application
export { Alert, AlertTitle, AlertDescription };

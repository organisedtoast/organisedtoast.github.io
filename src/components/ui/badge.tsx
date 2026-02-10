// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import cva (Class Variance Authority) for defining conditional CSS classes and VariantProps for type definitions
import { cva, type VariantProps } from "class-variance-authority";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Define badge variants using Class Variance Authority (CVA)
// CVA allows us to define different styles based on props (like variant prop)
const badgeVariants = cva(
  // Base CSS classes that apply to all badges regardless of variant
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    // Different style variants based on the 'variant' prop
    variants: {
      variant: {
        // Default badge styling - primary color scheme
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        // Secondary badge styling - secondary color scheme
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // Destructive badge styling - typically for error/warning badges with red colors
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        // Outline badge styling - only border and text, transparent background
        outline: "text-foreground",
      },
    },
    // Set default variant to 'default' when no variant prop is provided
    defaultVariants: {
      variant: "default",
    },
  },
);

// Define the BadgeProps interface that combines HTML attributes and variant props
// This defines the expected props for the Badge component
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

// Badge component - small decorative element to highlight information
// Can be customized with different variants (colors/styles) using the 'variant' prop
function Badge({ className, variant, ...props }: BadgeProps) {
  // Return a div element with the appropriate variant styling and any additional classes
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

// Export both the Badge component and badgeVariants for use in other parts of the application
export { Badge, badgeVariants };

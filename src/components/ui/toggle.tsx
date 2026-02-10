// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Radix UI's toggle primitive components for accessible toggle functionality
import * as TogglePrimitive from "@radix-ui/react-toggle";
// Import cva (Class Variance Authority) for defining conditional CSS classes and VariantProps for type definitions
import { cva, type VariantProps } from "class-variance-authority";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Define toggle variants using Class Variance Authority (CVA)
// CVA allows us to define different styles based on props (like variant and size props)
const toggleVariants = cva(
  // Base CSS classes that apply to all toggles regardless of variant or size
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    // Different style variants based on the 'variant' prop
    variants: {
      variant: {
        // Default variant - transparent background
        default: "bg-transparent",
        // Outline variant - border with transparent background that changes on hover
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      // Different sizes based on the 'size' prop
      size: {
        // Default size - medium toggle with specific height and horizontal padding
        default: "h-10 px-3",
        // Small size - compact toggle with reduced height and horizontal padding
        sm: "h-9 px-2.5",
        // Large size - bigger toggle with increased height and horizontal padding
        lg: "h-11 px-5",
      },
    },
    // Set default values when no props are provided
    defaultVariants: {
      variant: "default", // Default variant is 'default'
      size: "default",    // Default size is 'default'
    },
  },
);

// Toggle component - interactive button that can be toggled on/off
// Uses React.forwardRef to allow parent components to reference the DOM element
const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants> // Props type combining primitive props with variant props
>(({ className, variant, size, ...props }, ref) => (
  // Toggle primitive with variant-specific styling and custom classes
  <TogglePrimitive.Root
    ref={ref} // Reference to the underlying DOM element
    // Apply the appropriate variant styling and any additional custom classes
    className={cn(toggleVariants({ variant, size, className }))}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
Toggle.displayName = TogglePrimitive.Root.displayName;

// Export both the Toggle component and toggleVariants for use in other parts of the application
export { Toggle, toggleVariants };

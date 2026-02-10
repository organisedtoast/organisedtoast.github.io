// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Radix UI's separator primitive component for accessible visual separators
import * as SeparatorPrimitive from "@radix-ui/react-separator";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Separator component - creates a visual separator between elements
// Uses React.forwardRef to allow parent components to reference the DOM element
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> // Props type excluding ref
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  // Root element with shrinking behavior, border background, and orientation-specific dimensions
  <SeparatorPrimitive.Root
    ref={ref} // Reference to the underlying DOM element
    decorative={decorative} // Flag indicating whether the separator is purely decorative (defaults to true)
    orientation={orientation} // Orientation of the separator - either horizontal or vertical (defaults to horizontal)
    // CSS classes for shrinking, border background, and orientation-specific dimensions
    className={cn(
      "shrink-0 bg-border", // Base classes for shrinking and border background
      orientation === "horizontal" ? "h-px w-full" : "h-full w-px", // Dimensions based on orientation (thin horizontal or thin vertical)
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
Separator.displayName = SeparatorPrimitive.Root.displayName;

// Export the Separator component for use in other parts of the application
export { Separator };

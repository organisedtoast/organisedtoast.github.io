// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Radix UI's toggle group primitive components for accessible toggle group functionality
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
// Import VariantProps type from class-variance-authority for type definitions
import { type VariantProps } from "class-variance-authority";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";
// Import toggle variants from the toggle component to maintain consistent styling
import { toggleVariants } from "@/components/ui/toggle";

// Create a React context to share toggle group properties (like variant and size) with child components
const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  size: "default", // Default size for toggle items
  variant: "default", // Default variant for toggle items
});

// ToggleGroup component - container for a group of related toggle items
// Uses React.forwardRef to allow parent components to reference the DOM element
const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants> // Props type combining primitive props with variant props
>(({ className, variant, size, children, ...props }, ref) => (
  // Root element with flex layout, item centering, space distribution, and gap between items
  <ToggleGroupPrimitive.Root
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for flex layout, item centering, space distribution, and gap between items
    className={cn("flex items-center justify-center gap-1", className)}
    {...props} // Spread any additional props passed to the component
  >
    {/* Provide the variant and size to child components via context */}
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children} {/* Render child elements */}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));
// Set display name to match the primitive's display name for consistency
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

// ToggleGroupItem component - individual toggle item within the toggle group
// Uses React.forwardRef to allow parent components to reference the DOM element
const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants> // Props type combining primitive props with variant props
>(({ className, children, variant, size, ...props }, ref) => {
  // Get the context value (parent group's variant and size)
  const context = React.useContext(ToggleGroupContext);

  return (
    // Toggle item with styling based on context or individual props
    <ToggleGroupPrimitive.Item
      ref={ref} // Reference to the underlying DOM element
      // Apply toggle variants with either context values (from parent group) or individual values
      className={cn(
        toggleVariants({
          variant: context.variant || variant, // Use context variant if available, otherwise use individual variant
          size: context.size || size, // Use context size if available, otherwise use individual size
        }),
        className, // Allow additional custom classes to be passed in
      )}
      {...props} // Spread any additional props passed to the component
    >
      {children} {/* Render child elements */}
    </ToggleGroupPrimitive.Item>
  );
});
// Set display name to match the primitive's display name for consistency
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

// Export both ToggleGroup and ToggleGroupItem components for use in other parts of the application
export { ToggleGroup, ToggleGroupItem };

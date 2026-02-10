// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Radix UI's radio group primitive components for accessible radio group functionality
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
// Import Circle icon from lucide-react icon library for the radio button indicator
import { Circle } from "lucide-react";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// RadioGroup component - container for a group of related radio buttons
// Uses React.forwardRef to allow parent components to reference the DOM element
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> // Props type excluding ref
>(({ className, ...props }, ref) => {
  return (
    // Root element with grid layout and gap between items
    <RadioGroupPrimitive.Root
      ref={ref} // Reference to the underlying DOM element
      // CSS classes for grid layout and gap between items
      className={cn("grid gap-2", className)}
      {...props} // Spread any additional props passed to the component
    />
  );
});
// Set display name to match the primitive's display name for consistency
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

// RadioGroupItem component - individual radio button in the radio group
// Uses React.forwardRef to allow parent components to reference the DOM element
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> // Props type excluding ref
>(({ className, ...props }, ref) => {
  return (
    // Radio item with square aspect ratio, fixed size, rounded shape, border, primary color, and focus states
    <RadioGroupPrimitive.Item
      ref={ref} // Reference to the underlying DOM element
      // CSS classes for square aspect ratio, size, rounded shape, border, primary color, focus states, and disabled states
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className, // Allow additional custom classes to be passed in
      )}
      {...props} // Spread any additional props passed to the component
    >
      {/* Indicator that appears when the radio button is selected */}
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        {/* Circle icon that fills the radio button when selected */}
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
// Set display name to match the primitive's display name for consistency
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

// Export both RadioGroup and RadioGroupItem components for use in other parts of the application
export { RadioGroup, RadioGroupItem };

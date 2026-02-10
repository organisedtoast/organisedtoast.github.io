// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Radix UI's switch primitive components for accessible switch functionality
import * as SwitchPrimitives from "@radix-ui/react-switch";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Switch component - toggle control that switches between on/off states
// Uses React.forwardRef to allow parent components to reference the DOM element
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Root element with inline flex layout, fixed height/width, shrinking, cursor, item centering, rounded corners, border, transition, and state-dependent background colors
  <SwitchPrimitive.Root
    // CSS classes for inline flex layout, height, width, shrinking, cursor, item centering, rounded corners, border, transition, and various state styles
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:translate-x-4 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
    ref={ref} // Reference to the underlying DOM element
  >
    {/* Thumb element that moves left/right based on checked state */}
    <SwitchPrimitive.Thumb
      // CSS classes for pointer events, block display, size, rounded corners, background, shadow, ring removal, transition, and position transformation based on state
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitive.Root>
));
// Set display name to match the primitive's display name for consistency
Switch.displayName = SwitchPrimitive.Root.displayName;

// Export the Switch component for use in other parts of the application
export { Switch };

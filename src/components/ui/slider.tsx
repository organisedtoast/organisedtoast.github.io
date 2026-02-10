// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Radix UI's slider primitive components for accessible slider functionality
import * as SliderPrimitive from "@radix-ui/react-slider";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Slider component - interactive control for selecting a value from a range
// Uses React.forwardRef to allow parent components to reference the DOM element
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Root element with relative positioning, flex layout, full width, touch handling, selection prevention, and item centering
  <SliderPrimitive.Root
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for relative positioning, flex layout, full width, touch handling, selection prevention, and item centering
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props} // Spread any additional props passed to the component
  >
    {/* Track element - the main track of the slider with relative positioning, height, full width, growth, overflow handling, rounded corners, and secondary background */}
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      {/* Range element - the filled portion of the track that shows the current value */}
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    {/* Thumb element - the draggable handle that represents the current value */}
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
// Set display name to match the primitive's display name for consistency
Slider.displayName = SliderPrimitive.Root.displayName;

// Export the Slider component for use in other parts of the application
export { Slider };

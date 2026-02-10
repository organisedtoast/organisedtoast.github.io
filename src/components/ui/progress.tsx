// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Radix UI's progress primitive components for accessible progress bar functionality
import * as ProgressPrimitive from "@radix-ui/react-progress";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Progress component - visual indicator showing the completion progress of a task
// Uses React.forwardRef to allow parent components to reference the DOM element
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> // Props type excluding ref
>(({ className, value, ...props }, ref) => (
  // Root element with relative positioning, fixed height, full width, overflow handling, rounded corners, and background color
  <ProgressPrimitive.Root
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for relative positioning, height, width, overflow handling, rounded corners, and background color
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
    {...props} // Spread any additional props passed to the component
  >
    {/* Progress indicator with full height, full width, flex growth, primary background, and smooth transition */}
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all" // Styling for the progress indicator
      // Transform the indicator to show progress percentage by moving it from right to left
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }} // Calculate the translateX value based on the progress percentage
    />
  </ProgressPrimitive.Root>
));
// Set display name to match the primitive's display name for consistency
Progress.displayName = ProgressPrimitive.Root.displayName;

// Export the Progress component for use in other parts of the application
export { Progress };

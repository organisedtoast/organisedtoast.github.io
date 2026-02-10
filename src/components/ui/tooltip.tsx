// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Radix UI's tooltip primitive components for accessible tooltip functionality
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Tooltip Provider component - context provider that manages all tooltips in the application
// This component should wrap the entire application to enable proper tooltip functionality
const TooltipProvider = TooltipPrimitive.Provider;

// Main Tooltip component - container for the entire tooltip functionality
// This is the root component that manages the open/closed state of the tooltip
const Tooltip = TooltipPrimitive.Root;

// Tooltip Trigger component - element that shows the tooltip when hovered
// This component will trigger the tooltip to appear when the user hovers over it
const TooltipTrigger = TooltipPrimitive.Trigger;

// Tooltip Content component - the actual content that appears when the tooltip is shown
// Uses React.forwardRef to allow parent components to reference the DOM element
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> // Props type excluding ref
>(({ className, sideOffset = 4, ...props }, ref) => (
  // Content with z-index, overflow handling, rounded corners, border, background, padding, text size, text color, shadow, and animations
  <TooltipPrimitive.Content
    ref={ref} // Reference to the underlying DOM element
    sideOffset={sideOffset} // Offset distance from the trigger element (defaults to 4)
    // CSS classes for z-index, overflow handling, rounded corners, border, background, padding, text size, text color, shadow, and various animation states
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// Export all tooltip components for use in other parts of the application
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

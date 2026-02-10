// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Radix UI's hover card primitive components for accessible hover cards
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Main Hover Card component - container for the hover card functionality
const HoverCard = HoverCardPrimitive.Root;

// Hover Card Trigger component - element that shows the hover card when hovered
const HoverCardTrigger = HoverCardPrimitive.Trigger;

// Hover Card Content component - the content that appears when hovering over the trigger
// Uses React.forwardRef to allow parent components to reference the DOM element
const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> // Props type excluding ref
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  // Content with positioning, styling, and animations
  <HoverCardPrimitive.Content
    ref={ref} // Reference to the underlying DOM element
    align={align} // Alignment of the content relative to the trigger (defaults to center)
    sideOffset={sideOffset} // Offset distance from the trigger element (defaults to 4)
    // CSS classes for z-index, width, rounded corners, border, background, padding, text color, shadow, outline, and various animation states
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

// Export all hover card components for use in other parts of the application
export { HoverCard, HoverCardTrigger, HoverCardContent };

// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Radix UI's popover primitive components for accessible popover functionality
import * as PopoverPrimitive from "@radix-ui/react-popover";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Main Popover component - container for the entire popover functionality
// This is the root component that manages the open/closed state of the popover
const Popover = PopoverPrimitive.Root;

// Popover Trigger component - element that opens the popover when clicked
// This component will toggle the popover's open state when interacted with
const PopoverTrigger = PopoverPrimitive.Trigger;

// Popover Anchor component - allows positioning the popover relative to another element
// This is useful when you want to anchor the popover to a specific element that is not the trigger
const PopoverAnchor = PopoverPrimitive.Anchor;

// Popover Content component - the actual content that appears when the popover is open
// Uses React.forwardRef to allow parent components to reference the DOM element
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> // Props type excluding ref
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  // Portal to render the content outside the normal DOM hierarchy (into document.body by default)
  <PopoverPrimitive.Portal>
    {/* Popover content with z-index, width, rounded corners, border, background, padding, text color, shadow, outline, and animations */}
    <PopoverPrimitive.Content
      ref={ref} // Reference to the underlying DOM element
      align={align} // Alignment of the popover relative to the trigger (default is center)
      sideOffset={sideOffset} // Offset distance from the trigger element (default is 4 pixels)
      // CSS classes for z-index, width, rounded corners, border, background, padding, text color, shadow, outline, and various animation states
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className, // Allow additional custom classes to be passed in
      )}
      {...props} // Spread any additional props passed to the component
    />
  </PopoverPrimitive.Portal>
));
// Set display name to match the primitive's display name for consistency
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// Export all popover components for use in other parts of the application
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };

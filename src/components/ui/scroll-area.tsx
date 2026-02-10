// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Radix UI's scroll area primitive components for accessible scrollable areas
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// ScrollArea component - container for a scrollable area with custom styled scrollbar
// Uses React.forwardRef to allow parent components to reference the DOM element
const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> // Props type excluding ref
>(({ className, children, ...props }, ref) => (
  // Root element with relative positioning and hidden overflow to create scrollable container
  <ScrollAreaPrimitive.Root ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
    {/* Viewport with full height and width, inheriting rounded corners */}
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">{children}</ScrollAreaPrimitive.Viewport>
    {/* Custom scrollbar component */}
    <ScrollBar />
    {/* Corner component where both scrollbars meet */}
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
// Set display name to match the primitive's display name for consistency
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

// ScrollBar component - custom styled scrollbar for the scroll area
// Uses React.forwardRef to allow parent components to reference the DOM element
const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> // Props type excluding ref
>(({ className, orientation = "vertical", ...props }, ref) => (
  // Scrollbar with flex layout, touch handling, selection prevention, and transition effects
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref} // Reference to the underlying DOM element
    orientation={orientation} // Orientation of the scrollbar (vertical or horizontal, defaults to vertical)
    // CSS classes for flex layout, touch handling, selection prevention, transition effects, and orientation-specific styling
    className={cn(
      "flex touch-none select-none transition-colors", // Base classes for all orientations
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", // Vertical scrollbar styling
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", // Horizontal scrollbar styling
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  >
    {/* Thumb element that represents the draggable part of the scrollbar */}
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
// Set display name to match the primitive's display name for consistency
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

// Export both ScrollArea and ScrollBar components for use in other parts of the application
export { ScrollArea, ScrollBar };

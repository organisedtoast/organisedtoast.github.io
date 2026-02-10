// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Drawer primitive from vaul library for accessible sliding panel functionality
import { Drawer as DrawerPrimitive } from "vaul";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Main Drawer component - container for the entire drawer functionality
// Uses the vaul library's Drawer primitive with scaling background enabled by default
const Drawer = ({ shouldScaleBackground = true, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  // Root drawer element with scaling background enabled by default
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
// Set display name for debugging purposes in React DevTools
Drawer.displayName = "Drawer";

// Drawer Trigger component - element that opens the drawer when clicked
const DrawerTrigger = DrawerPrimitive.Trigger;

// Drawer Portal component - renders the drawer content into a separate DOM node (typically body)
const DrawerPortal = DrawerPrimitive.Portal;

// Drawer Close component - element that closes the drawer when clicked
const DrawerClose = DrawerPrimitive.Close;

// Drawer Overlay component - semi-transparent backdrop behind the drawer content
// Uses React.forwardRef to allow parent components to reference the DOM element
const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Overlay element with fixed positioning covering the entire screen
  <DrawerPrimitive.Overlay ref={ref} className={cn("fixed inset-0 z-50 bg-black/80", className)} {...props} />
));
// Set display name to match the primitive's display name for consistency
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

// Drawer Content component - the main drawer panel containing content
// Uses React.forwardRef to allow parent components to reference the DOM element
const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> // Props type excluding ref
>(({ className, children, ...props }, ref) => (
  // Portal to render the content outside the normal DOM hierarchy
  <DrawerPortal>
    {/* Semi-transparent overlay behind the drawer */}
    <DrawerOverlay />
    {/* The actual drawer content positioned at the bottom of the screen */}
    <DrawerPrimitive.Content
      ref={ref} // Reference to the underlying DOM element
      // CSS classes for positioning, size, layout, and styling
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className, // Allow additional custom classes to be passed in
      )}
      {...props} // Spread any additional props passed to the component
    >
      {/* Handle element for dragging the drawer */}
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children} {/* Render child elements inside the drawer */}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
// Set display name for debugging purposes in React DevTools
DrawerContent.displayName = "DrawerContent";

// Drawer Header component - container for the drawer's header content
// Simple div wrapper with consistent styling for header content
const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  // Grid layout with vertical spacing, padding, and centered text (left-aligned on larger screens)
  <div className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props} />
);
// Set display name for debugging purposes in React DevTools
DrawerHeader.displayName = "DrawerHeader";

// Drawer Footer component - container for the drawer's footer content
// Simple div wrapper with consistent styling for footer content
const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  // Flex layout with automatic top margin, vertical stacking, gap, and padding
  <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
);
// Set display name for debugging purposes in React DevTools
DrawerFooter.displayName = "DrawerFooter";

// Drawer Title component - the heading text for the drawer
// Uses React.forwardRef to allow parent components to reference the DOM element
const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Title element with large, bold text styling
  <DrawerPrimitive.Title
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for text size, font weight, line height, and letter tracking
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

// Drawer Description component - the descriptive text for the drawer
// Uses React.forwardRef to allow parent components to reference the DOM element
const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Description element with small, muted text styling
  <DrawerPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
// Set display name to match the primitive's display name for consistency
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

// Export all drawer components for use in other parts of the application
export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};

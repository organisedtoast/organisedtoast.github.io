// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Radix UI's alert dialog primitive components for accessible modal dialogs
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";
// Import button variants to apply consistent styling to dialog buttons
import { buttonVariants } from "@/components/ui/button";

// Main Alert Dialog component - serves as the root container for the alert dialog
const AlertDialog = AlertDialogPrimitive.Root;

// Alert Dialog Trigger component - element that opens the alert dialog when clicked
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

// Alert Dialog Portal component - renders the dialog content into a separate DOM node (typically body)
const AlertDialogPortal = AlertDialogPrimitive.Portal;

// Alert Dialog Overlay component - semi-transparent backdrop behind the dialog content
// Uses React.forwardRef to allow parent components to reference the DOM element
const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // The overlay element with fixed positioning covering the entire screen
  <AlertDialogPrimitive.Overlay
    // CSS classes for positioning, z-index, background color with opacity, and animation states
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
    ref={ref} // Reference to the underlying DOM element
  />
));
// Set display name to match the primitive's display name for consistency
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

// Alert Dialog Content component - the main dialog box containing title, description, and actions
// Uses React.forwardRef to allow parent components to reference the DOM element
const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Wrap content in portal to render outside normal DOM hierarchy
  <AlertDialogPortal>
    {/* Semi-transparent overlay behind the dialog */}
    <AlertDialogOverlay />
    {/* The actual dialog content with centering and animations */}
    <AlertDialogPrimitive.Content
      ref={ref} // Reference to the underlying DOM element
      // CSS classes for centering, sizing, positioning, styling, and animations
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className, // Allow additional custom classes to be passed in
      )}
      {...props} // Spread any additional props passed to the component
    />
  </AlertDialogPortal>
));
// Set display name to match the primitive's display name for consistency
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

// Alert Dialog Header component - container for the dialog's title
// Simple div wrapper with consistent styling for header content
const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  // Flex column layout with spacing between elements, centered on small screens
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
// Set display name for debugging purposes in React DevTools
AlertDialogHeader.displayName = "AlertDialogHeader";

// Alert Dialog Footer component - container for the dialog's action buttons
// Simple div wrapper with consistent styling for footer content
const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  // Flex layout that stacks buttons vertically on small screens and horizontally on larger screens
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
// Set display name for debugging purposes in React DevTools
AlertDialogFooter.displayName = "AlertDialogFooter";

// Alert Dialog Title component - the heading text for the dialog
// Uses Radix primitive with consistent styling
const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Title element with large, bold text styling
  <AlertDialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
));
// Set display name to match the primitive's display name for consistency
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

// Alert Dialog Description component - the descriptive text for the dialog
// Uses Radix primitive with consistent styling
const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Description element with muted, smaller text styling
  <AlertDialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
// Set display name to match the primitive's display name for consistency
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

// Alert Dialog Action component - primary action button (usually "OK" or "Confirm")
// Uses Radix primitive with button variants for consistent styling
const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Button with default styling applied via buttonVariants()
  <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
));
// Set display name to match the primitive's display name for consistency
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

// Alert Dialog Cancel component - secondary action button (usually "Cancel")
// Uses Radix primitive with outlined button variant for visual distinction
const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Button with outlined variant and margin adjustment for responsive layouts
  <AlertDialogPrimitive.Cancel
    ref={ref} // Reference to the underlying DOM element
    // Apply outlined button variant with top margin on small screens, no margin on larger screens
    className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

// Export all alert dialog components for use in other parts of the application
export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};

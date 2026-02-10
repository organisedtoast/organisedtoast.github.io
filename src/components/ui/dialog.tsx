// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Radix UI's dialog primitive components for accessible modal dialogs
import * as DialogPrimitive from "@radix-ui/react-dialog";
// Import X icon from lucide-react icon library for the close button
import { X } from "lucide-react";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Main Dialog component - container for the entire dialog functionality
const Dialog = DialogPrimitive.Root;

// Dialog Trigger component - element that opens the dialog when clicked
const DialogTrigger = DialogPrimitive.Trigger;

// Dialog Portal component - renders the dialog content into a separate DOM node (typically body)
const DialogPortal = DialogPrimitive.Portal;

// Dialog Close component - element that closes the dialog when clicked
const DialogClose = DialogPrimitive.Close;

// Dialog Overlay component - semi-transparent backdrop behind the dialog content
// Uses React.forwardRef to allow parent components to reference the DOM element
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Overlay element with fixed positioning covering the entire screen
  <DialogPrimitive.Overlay
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for fixed positioning, z-index, background color with opacity, and animation states
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// Dialog Content component - the main dialog box containing title, description, and actions
// Uses React.forwardRef to allow parent components to reference the DOM element
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> // Props type excluding ref
>(({ className, children, ...props }, ref) => (
  // Portal to render the content outside the normal DOM hierarchy
  <DialogPortal>
    {/* Semi-transparent overlay behind the dialog */}
    <DialogOverlay />
    {/* The actual dialog content with centering and animations */}
    <DialogPrimitive.Content
      ref={ref} // Reference to the underlying DOM element
      // CSS classes for centering, sizing, positioning, styling, and animations
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className, // Allow additional custom classes to be passed in
      )}
      {...props} // Spread any additional props passed to the component
    >
      {children} {/* Render child elements inside the dialog */}
      {/* Close button positioned in the top-right corner */}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
        {/* X icon for closing the dialog */}
        <X className="h-4 w-4" />
        {/* Screen reader only text for accessibility */}
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
// Set display name to match the primitive's display name for consistency
DialogContent.displayName = DialogPrimitive.Content.displayName;

// Dialog Header component - container for the dialog's header content
// Simple div wrapper with consistent styling for header content
const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  // Flex column layout with vertical spacing and centered text (left-aligned on larger screens)
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
// Set display name for debugging purposes in React DevTools
DialogHeader.displayName = "DialogHeader";

// Dialog Footer component - container for the dialog's footer content
// Simple div wrapper with consistent styling for footer content
const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  // Flex layout that stacks items vertically on small screens and horizontally on larger screens, with right justification
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
// Set display name for debugging purposes in React DevTools
DialogFooter.displayName = "DialogFooter";

// Dialog Title component - the heading text for the dialog
// Uses React.forwardRef to allow parent components to reference the DOM element
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Title element with large, bold text styling
  <DialogPrimitive.Title
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for text size, font weight, line height, and letter tracking
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
DialogTitle.displayName = DialogPrimitive.Title.displayName;

// Dialog Description component - the descriptive text for the dialog
// Uses React.forwardRef to allow parent components to reference the DOM element
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Description element with small, muted text styling
  <DialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
// Set display name to match the primitive's display name for consistency
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// Export all dialog components for use in other parts of the application
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};

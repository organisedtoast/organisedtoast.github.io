// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Radix UI's toast primitive components for accessible toast notifications
import * as ToastPrimitive from "@radix-ui/react-toast";
// Import cva (Class Variance Authority) for defining conditional CSS classes and VariantProps for type definitions
import { cva, type VariantProps } from "class-variance-authority";
// Import X icon from lucide-react icon library for the close button
import { X } from "lucide-react";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Toast Provider component - context provider for managing toast notifications
// This component manages the state and lifecycle of all toasts in the application
const ToastProvider = ToastPrimitive.Provider;

// Toast Viewport component - container where toast notifications appear
// Uses React.forwardRef to allow parent components to reference the DOM element
const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Viewport with fixed positioning, z-index, flex layout, maximum height, full width, reversed column layout, and padding
  <ToastPrimitive.Viewport
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for fixed positioning, z-index, flex layout, maximum height, full width, reversed column layout, padding, and responsive adjustments
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", // Base classes for positioning, layout, and responsive behavior
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

// Define toast variants using Class Variance Authority (CVA)
// CVA allows us to define different styles based on props (like variant prop)
const toastVariants = cva(
  // Base CSS classes that apply to all toasts regardless of variant
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    // Different style variants based on the 'variant' prop
    variants: {
      variant: {
        // Default toast styling - standard border, background, and text colors
        default: "border bg-background text-foreground",
        // Destructive toast styling - typically for error messages with red colors
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    // Set default variant to 'default' when no variant prop is provided
    defaultVariants: {
      variant: "default",
    },
  },
);

// Toast component - individual toast notification
// Uses React.forwardRef to allow parent components to reference the DOM element
const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> & VariantProps<typeof toastVariants> // Props type combining primitive props with variant props
>(({ className, variant, ...props }, ref) => {
  return (
    // Root element with variant-specific styling and custom classes
    <ToastPrimitive.Root
      ref={ref} // Reference to the underlying DOM element
      // Apply the appropriate variant styling and any additional custom classes
      className={cn(toastVariants({ variant }), className)}
      {...props} // Spread any additional props passed to the component
    />
  );
});
// Set display name to match the primitive's display name for consistency
Toast.displayName = ToastPrimitive.Root.displayName;

// Toast Action component - action button within a toast notification
// Uses React.forwardRef to allow parent components to reference the DOM element
const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Action button with inline flex layout, height, shrinking, item centering, padding, text size, font weight, background, transition, and various interaction states
  <ToastPrimitive.Action
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for inline flex layout, height, shrinking, item centering, padding, text size, font weight, background, transition, and various interaction states
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
ToastAction.displayName = ToastPrimitive.Action.displayName;

// Toast Close component - close button for dismissing the toast
// Uses React.forwardRef to allow parent components to reference the DOM element
const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Close button with absolute positioning, rounded corners, padding, text color, opacity, transition, and various interaction states
  <ToastPrimitive.Close
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for absolute positioning, rounded corners, padding, text color, opacity, transition, and various interaction states
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className, // Allow additional custom classes to be passed in
    )}
    toast-close="" // Attribute to identify this as a toast close button
    {...props} // Spread any additional props passed to the component
  >
    <X className="h-4 w-4" /> {/* X icon for closing */}
  </ToastPrimitive.Close>
));
// Set display name to match the primitive's display name for consistency
ToastClose.displayName = ToastPrimitive.Close.displayName;

// Toast Title component - heading text for the toast notification
// Uses React.forwardRef to allow parent components to reference the DOM element
const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Title element with small text size and bold font weight
  <ToastPrimitive.Title
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for text size and font weight
    className={cn("text-sm font-semibold", className)}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
ToastTitle.displayName = ToastPrimitive.Title.displayName;

// Toast Description component - descriptive text for the toast notification
// Uses React.forwardRef to allow parent components to reference the DOM element
const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Description element with small text size and reduced opacity
  <ToastPrimitive.Description
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for text size and opacity
    className={cn("text-sm opacity-90", className)}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
ToastDescription.displayName = ToastPrimitive.Description.displayName;

// Define ToastProps type that combines the props from the Toast component with variant props
type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

// Define ToastActionElement type for toast action elements
type ToastActionElement = React.ReactElement<typeof ToastAction>;

// Export all toast components, types, and the provider for use in other parts of the application
export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};

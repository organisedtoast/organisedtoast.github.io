// Import SheetPrimitive components from Radix UI's dialog module (sheets are implemented as dialogs)
import * as SheetPrimitive from "@radix-ui/react-dialog";
// Import cva (Class Variance Authority) for defining conditional CSS classes and VariantProps for type definitions
import { cva, type VariantProps } from "class-variance-authority";
// Import X icon from lucide-react icon library for the close button
import { X } from "lucide-react";
// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Main Sheet component - container for the entire sheet functionality
// This is the root component that manages the open/closed state of the sheet
const Sheet = SheetPrimitive.Root;

// Sheet Trigger component - element that opens the sheet when clicked
// This component will toggle the sheet's open state when interacted with
const SheetTrigger = SheetPrimitive.Trigger;

// Sheet Close component - element that closes the sheet when clicked
// This component allows users to dismiss the sheet
const SheetClose = SheetPrimitive.Close;

// Sheet Portal component - renders the sheet content into a separate DOM node (typically document.body)
// This ensures the sheet appears above other content regardless of DOM structure
const SheetPortal = SheetPrimitive.Portal;

// Sheet Overlay component - semi-transparent backdrop behind the sheet content
// Uses React.forwardRef to allow parent components to reference the DOM element
const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Overlay with fixed positioning, full coverage, z-index, semi-transparent black background, and animation states
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
    ref={ref} // Reference to the underlying DOM element
  />
));
// Set display name to match the primitive's display name for consistency
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

// Define sheet variants using Class Variance Authority (CVA)
// CVA allows us to define different styles based on props (like side prop)
const sheetVariants = cva(
  // Base CSS classes that apply to all sheets regardless of side
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    // Different style variants based on the 'side' prop
    variants: {
      side: {
        // Top sheet styling - covers horizontal edges, positioned at top with bottom border
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        // Bottom sheet styling - covers horizontal edges, positioned at bottom with top border
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        // Left sheet styling - covers vertical edges, full height, 3/4 width with right border and max width on small screens
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        // Right sheet styling - covers vertical edges, full height, 3/4 width with left border and max width on small screens
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    // Set default variant to 'right' when no side prop is provided
    defaultVariants: {
      side: "right",
    },
  },
);

// Define props interface for SheetContent component that extends primitive props and adds variant props
interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>, // Base content props from SheetPrimitive
    VariantProps<typeof sheetVariants> {} // Side variant props from CVA

// Sheet Content component - the main sheet panel that slides in from a specified side
// Uses React.forwardRef to allow parent components to reference the DOM element
const SheetContent = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Content>, SheetContentProps>(
  ({ side = "right", className, children, ...props }, ref) => (
    // Portal to render the content outside the normal DOM hierarchy
    <SheetPortal>
      {/* Semi-transparent overlay behind the sheet */}
      <SheetOverlay />
      {/* Sheet content with specified side, styling, and close button */}
      <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
        {children} {/* Render child elements inside the sheet */}
        {/* Close button positioned in the top-right corner */}
        <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <X className="h-4 w-4" /> {/* X icon for closing */}
          <span className="sr-only">Close</span> {/* Screen reader only text */}
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  ),
);
// Set display name to match the primitive's display name for consistency
SheetContent.displayName = SheetPrimitive.Content.displayName;

// Sheet Header component - container for the sheet's header content
// Simple div wrapper with consistent styling for header content
const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  // Flex column layout with vertical spacing and centered text (left-aligned on larger screens)
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
// Set display name for debugging purposes in React DevTools
SheetHeader.displayName = "SheetHeader";

// Sheet Footer component - container for the sheet's footer content
// Simple div wrapper with consistent styling for footer content
const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  // Flex layout that stacks items vertically on small screens and horizontally on larger screens, with right justification
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
// Set display name for debugging purposes in React DevTools
SheetFooter.displayName = "SheetFooter";

// Sheet Title component - heading text for the sheet
// Uses React.forwardRef to allow parent components to reference the DOM element
const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Title element with large, bold text styling
  <SheetPrimitive.Title ref={ref} className={cn("text-lg font-semibold text-foreground", className)} {...props} />
));
// Set display name to match the primitive's display name for consistency
SheetTitle.displayName = SheetPrimitive.Title.displayName;

// Sheet Description component - descriptive text for the sheet
// Uses React.forwardRef to allow parent components to reference the DOM element
const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Description element with small, muted text styling
  <SheetPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
// Set display name to match the primitive's display name for consistency
SheetDescription.displayName = SheetPrimitive.Description.displayName;

// Export all sheet components for use in other parts of the application
export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};

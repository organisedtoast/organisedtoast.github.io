// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Radix UI's accordion primitive components for accessible accordion functionality
import * as AccordionPrimitive from "@radix-ui/react-accordion";
// Import ChevronDown icon from lucide-react icon library to show/hide indicator
import { ChevronDown } from "lucide-react";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Main Accordion component - serves as the root container for all accordion items
const Accordion = AccordionPrimitive.Root;

// AccordionItem component - represents a single expandable/collapsible section
// Uses React.forwardRef to allow parent components to reference the DOM element
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Render the primitive accordion item with a bottom border and custom classes
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
// Set display name for debugging purposes in React DevTools
AccordionItem.displayName = "AccordionItem";

// AccordionTrigger component - clickable element that opens/closes the accordion content
// Uses React.forwardRef to allow parent components to reference the DOM element
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> // Props type excluding ref
>(({ className, children, ...props }, ref) => (
  // Wrap trigger in a header element with flex layout
  <AccordionPrimitive.Header className="flex">
    {/* The actual clickable trigger element */}
    <AccordionPrimitive.Trigger
      ref={ref} // Reference to the underlying DOM element
      // CSS classes for styling: flex layout, alignment, padding, font, transitions, and hover effect
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className, // Allow additional custom classes to be passed in
      )}
      {...props} // Spread any additional props passed to the component
    >
      {/* Content inside the trigger (usually text label) */}
      {children}
      {/* Chevron icon that rotates when accordion is opened/closed */}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
// Set display name to match the primitive's display name for consistency
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

// AccordionContent component - the expandable/collapsible content area
// Uses React.forwardRef to allow parent components to reference the DOM element
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> // Props type excluding ref
>(({ className, children, ...props }, ref) => (
  // The actual content container with animations and transitions
  <AccordionPrimitive.Content
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for hiding overflow, text sizing, transitions, and custom animations
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props} // Spread any additional props passed to the component
  >
    {/* Inner div with vertical padding to create space around content */}
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

// Set display name for debugging purposes in React DevTools
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

// Export all accordion components for use in other parts of the application
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

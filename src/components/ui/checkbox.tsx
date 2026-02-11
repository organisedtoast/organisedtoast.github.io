/* Import React library to enable JSX syntax for creating UI elements */
import * as React from "react";
/* Import Radix UI's checkbox primitive components for accessible checkbox functionality */
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
/* Import Check icon from lucide-react icon library to show checked state */
import { Check } from "lucide-react";

/* Import utility function to conditionally join CSS classes together */
import { cn } from "@/lib/utils";

/* Checkbox component - interactive element that allows users to select one or more options
Uses React.forwardRef to allow parent components to reference the DOM element */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>, /* Type for the DOM element being referenced */
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> /* Props type excluding ref */
>(({ className, ...props }, ref) => (
  /* Root element for the checkbox with styling for different states */
  <CheckboxPrimitive.Root
    ref={ref} /* Reference to the underlying DOM element */
    /* CSS classes for size, shape, border, background when checked, focus states, and disabled states */
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className, /* Allow additional custom classes to be passed in */
    )}
    {...props} /* Spread any additional props passed to the component */
  >
    {/* Indicator element that shows the checkmark when checkbox is checked */}
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      {/* Check icon with size matching the checkbox */}
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
/* Set display name to match the primitive's display name for consistency */
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

/* Export the checkbox component for use in other parts of the application */
export { Checkbox };

// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Label primitive from Radix UI for accessible labeling
import * as LabelPrimitive from "@radix-ui/react-label";
// Import cva (Class Variance Authority) for defining conditional CSS classes and VariantProps for type definitions
import { cva, type VariantProps } from "class-variance-authority";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Define label variants using Class Variance Authority (CVA)
// CVA allows us to define different styles based on props (though no variants are defined here)
const labelVariants = cva(
  // Base CSS classes that apply to all labels regardless of variant
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

// Label component - accessible label element that can be associated with form controls
// Uses React.forwardRef to allow parent components to reference the DOM element
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants> // Props type combining label primitive props with variant props
>(({ className, ...props }, ref) => (
  // Label primitive with variant styling and custom classes
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
// Set display name to match the primitive's display name for consistency
Label.displayName = LabelPrimitive.Root.displayName;

// Export the Label component for use in other parts of the application
export { Label };

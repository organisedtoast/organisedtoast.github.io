// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Define TextareaProps interface that extends the standard textarea HTML attributes
// This allows the component to accept all standard textarea props plus any additional custom ones
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// Textarea component - a styled textarea input with consistent styling and accessibility features
// Uses React.forwardRef to allow parent components to reference the DOM element
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    // Textarea element with consistent styling and accessibility features
    <textarea
      // CSS classes for flex layout, minimum height, full width, rounded corners, border, background, padding, text size, 
      // placeholder text color, focus states, and disabled states
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className, // Allow additional custom classes to be passed in
      )}
      ref={ref} // Reference to the underlying DOM element
      {...props} // Spread any additional props passed to the component (like onChange, value, etc.)
    />
  );
});
// Set display name for debugging purposes in React DevTools
Textarea.displayName = "Textarea";

// Export the Textarea component for use in other parts of the application
export { Textarea };

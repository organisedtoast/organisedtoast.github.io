// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Input component - a styled input field with consistent styling and accessibility features
// Uses React.forwardRef to allow parent components to reference the DOM element
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      // Input element with consistent styling and accessibility features
      <input
        type={type} // Set the input type (text, password, email, etc.)
        // CSS classes for flex layout, height, width, rounded corners, border, background, padding, text size, 
        // file input styling, placeholder text color, focus states, and disabled states
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className, // Allow additional custom classes to be passed in
        )}
        ref={ref} // Reference to the underlying DOM element
        {...props} // Spread any additional props passed to the component (like onChange, value, etc.)
      />
    );
  },
);
// Set display name for debugging purposes in React DevTools
Input.displayName = "Input";

// Export the Input component for use in other parts of the application
export { Input };

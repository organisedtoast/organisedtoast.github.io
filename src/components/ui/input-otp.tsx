// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import OTPInput component and OTPInputContext from input-otp library for one-time password input functionality
import { OTPInput, OTPInputContext } from "input-otp";
// Import Dot icon from lucide-react icon library for the separator
import { Dot } from "lucide-react";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// InputOTP component - main container for the one-time password input field
// Uses React.forwardRef to allow parent components to reference the DOM element
const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, React.ComponentPropsWithoutRef<typeof OTPInput>>(
  ({ className, containerClassName, ...props }, ref) => (
    // OTP input with flex layout, item centering, gap, and opacity for disabled state
    <OTPInput
      ref={ref} // Reference to the underlying DOM element
      // Container styling with flex layout, item centering, gap, and opacity for disabled state
      containerClassName={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)}
      // Input styling with cursor not allowed when disabled
      className={cn("disabled:cursor-not-allowed", className)}
      {...props} // Spread any additional props passed to the component
    />
  ),
);
// Set display name for debugging purposes in React DevTools
InputOTP.displayName = "InputOTP";

// InputOTPGroup component - container for grouping OTP slots together
// Uses React.forwardRef to allow parent components to reference the DOM element
const InputOTPGroup = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    // Div with flex layout and item centering to group OTP slots
    <div ref={ref} className={cn("flex items-center", className)} {...props} />
  ),
);
// Set display name for debugging purposes in React DevTools
InputOTPGroup.displayName = "InputOTPGroup";

// InputOTPSlot component - individual slot for each character in the OTP
// Uses React.forwardRef to allow parent components to reference the DOM element
const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<"div"> & { // Props type excluding ref with additional props
    index: number; // Index of the slot in the OTP sequence
  }
>(({ index, className, ...props }, ref) => {
  // Get the OTP input context to access slot information
  const inputOTPContext = React.useContext(OTPInputContext);
  // Extract character, caret visibility, and active state for the specific slot
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    // Slot container with relative positioning, size, borders, and active state styling
    <div
      ref={ref} // Reference to the underlying DOM element
      // CSS classes for relative positioning, flex layout, size, borders, text size, transition, and rounded corners for first/last elements
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        // Add ring styling when the slot is active
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className, // Allow additional custom classes to be passed in
      )}
      {...props} // Spread any additional props passed to the component
    >
      {char} {/* Display the character in the slot */}
      {/* Show fake caret when needed */}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {/* Caret animation element */}
          <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
// Set display name for debugging purposes in React DevTools
InputOTPSlot.displayName = "InputOTPSlot";

// InputOTPSeparator component - separator between OTP slots (uses a dot icon)
// Uses React.forwardRef to allow parent components to reference the DOM element
const InputOTPSeparator = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ ...props }, ref) => (
    // Separator div with role attribute for accessibility
    <div ref={ref} role="separator" {...props}>
      {/* Dot icon as the separator */}
      <Dot />
    </div>
  ),
);
// Set display name for debugging purposes in React DevTools
InputOTPSeparator.displayName = "InputOTPSeparator";

// Export all OTP input components for use in other parts of the application
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };

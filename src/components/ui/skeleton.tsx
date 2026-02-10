// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Skeleton component - visual placeholder for content that is loading
// Creates a pulsing effect to indicate that content is being loaded
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    // Div element with pulse animation, rounded corners, and muted background color
    <div
      // CSS classes for animation (pulse effect), rounded corners, and background color
      className={cn(
        "animate-pulse rounded-md bg-muted", // Base classes for animation, rounded corners, and background
        className, // Allow additional custom classes to be passed in
      )}
      {...props} // Spread any additional props passed to the component (like style, id, etc.)
    />
  );
}

// Export the Skeleton component for use in other parts of the application
export { Skeleton };

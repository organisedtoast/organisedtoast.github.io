// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Radix UI's tabs primitive components for accessible tabs functionality
import * as TabsPrimitive from "@radix-ui/react-tabs";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Main Tabs component - container for the entire tabs functionality
// This is the root component that manages the active tab state
const Tabs = TabsPrimitive.Root;

// Tabs List component - container for the tab triggers (the clickable tabs)
// Uses React.forwardRef to allow parent components to reference the DOM element
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // List element with inline flex layout, height, item centering, spacing, rounded corners, background, and muted text color
  <TabsPrimitive.List
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for inline flex layout, height, item centering, spacing, rounded corners, background, and muted text color
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", // Base classes for layout, appearance, and text color
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
TabsList.displayName = TabsPrimitive.List.displayName;

// Tabs Trigger component - individual tab that can be clicked to activate content
// Uses React.forwardRef to allow parent components to reference the DOM element
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Trigger element with inline flex layout, item centering, white space handling, rounded corners, padding, text size, font weight, background transition, and active state styles
  <TabsPrimitive.Trigger
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for inline flex layout, item centering, white space handling, rounded corners, padding, text size, font weight, background transition, and various active state styles
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm", // Base classes for layout, appearance, focus states, disabled states, and active state styles
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

// Tabs Content component - container for the content that appears when a tab is active
// Uses React.forwardRef to allow parent components to reference the DOM element
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Content element with top margin, background offset, focus outline, and focus ring
  <TabsPrimitive.Content
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for top margin, background offset, focus outline removal, focus ring, and focus ring offset
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", // Base classes for spacing, focus states, and ring appearance
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
TabsContent.displayName = TabsPrimitive.Content.displayName;

// Export all tabs components for use in other parts of the application
export { Tabs, TabsList, TabsTrigger, TabsContent };

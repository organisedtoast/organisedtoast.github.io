// Import Radix UI's collapsible primitive components for accessible collapsible functionality
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

// Main Collapsible component - container for the collapsible functionality
// This is the root component that manages the open/closed state
const Collapsible = CollapsiblePrimitive.Root;

// CollapsibleTrigger component - element that toggles the collapsible content
// When clicked, it will open or close the collapsible content
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

// CollapsibleContent component - the content that gets shown or hidden
// This is the content that will be animated in/out when toggled
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

// Export all collapsible components for use in other parts of the application
export { Collapsible, CollapsibleTrigger, CollapsibleContent };

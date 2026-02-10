// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Radix UI's context menu primitive components for accessible context menu functionality
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
// Import Check, ChevronRight, and Circle icons from lucide-react icon library
import { Check, ChevronRight, Circle } from "lucide-react";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Main Context Menu component - container for the context menu functionality
const ContextMenu = ContextMenuPrimitive.Root;

// Context Menu Trigger component - element that opens the context menu when right-clicked
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

// Context Menu Group component - groups related context menu items together
const ContextMenuGroup = ContextMenuPrimitive.Group;

// Context Menu Portal component - renders the context menu content into a separate DOM node (typically body)
const ContextMenuPortal = ContextMenuPrimitive.Portal;

// Context Menu Sub component - container for submenu functionality
const ContextMenuSub = ContextMenuPrimitive.Sub;

// Context Menu Radio Group component - groups radio items together
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

// Context Menu Sub Trigger component - trigger for opening a submenu
// Uses React.forwardRef to allow parent components to reference the DOM element
const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & { // Props type excluding ref with additional props
    inset?: boolean; // Optional flag to add left padding
  }
>(({ className, inset, children, ...props }, ref) => (
  // Submenu trigger with flex layout, cursor, selection handling, and interaction states
  <ContextMenuPrimitive.SubTrigger
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for flex layout, cursor, selection, padding, text size, outline, and interaction states
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8", // Add left padding if inset prop is true
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  >
    {children} {/* Render child elements */}
    {/* Chevron icon that appears on the right side */}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
));
// Set display name to match the primitive's display name for consistency
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

// Context Menu Sub Content component - content container for submenu items
// Uses React.forwardRef to allow parent components to reference the DOM element
const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Submenu content with z-index, minimum width, overflow handling, rounded corners, border, background, padding, text color, shadow, and animations
  <ContextMenuPrimitive.SubContent
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for z-index, minimum width, overflow handling, rounded corners, border, background, padding, text color, shadow, and various animation states
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

// Context Menu Content component - main content container for the context menu
// Uses React.forwardRef to allow parent components to reference the DOM element
const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Portal to render the content outside the normal DOM hierarchy
  <ContextMenuPrimitive.Portal>
    {/* Context menu content with z-index, minimum width, overflow handling, rounded corners, border, background, padding, text color, shadow, and animations */}
    <ContextMenuPrimitive.Content
      ref={ref} // Reference to the underlying DOM element
      // CSS classes for z-index, minimum width, overflow handling, rounded corners, border, background, padding, text color, shadow, and various animation states
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className, // Allow additional custom classes to be passed in
      )}
      {...props} // Spread any additional props passed to the component
    />
  </ContextMenuPrimitive.Portal>
));
// Set display name to match the primitive's display name for consistency
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

// Context Menu Item component - individual selectable item in the context menu
// Uses React.forwardRef to allow parent components to reference the DOM element
const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & { // Props type excluding ref with additional props
    inset?: boolean; // Optional flag to add left padding
  }
>(({ className, inset, ...props }, ref) => (
  // Menu item with relative positioning, flex layout, cursor, selection handling, padding, text size, outline, and interaction states
  <ContextMenuPrimitive.Item
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for relative positioning, flex layout, cursor, selection, padding, text size, outline, and interaction states
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8", // Add left padding if inset prop is true
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

// Context Menu Checkbox Item component - checkbox item in the context menu
// Uses React.forwardRef to allow parent components to reference the DOM element
const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem> // Props type excluding ref
>(({ className, children, checked, ...props }, ref) => (
  // Checkbox item with relative positioning, flex layout, cursor, selection handling, padding, text size, outline, and interaction states
  <ContextMenuPrimitive.CheckboxItem
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for relative positioning, flex layout, cursor, selection, padding, text size, outline, and interaction states
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className, // Allow additional custom classes to be passed in
    )}
    checked={checked} // Checked state of the checkbox
    {...props} // Spread any additional props passed to the component
  >
    {/* Container for the checkbox indicator */}
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {/* Indicator that shows when the checkbox is checked */}
      <ContextMenuPrimitive.ItemIndicator>
        {/* Check icon for the checkbox */}
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children} {/* Render child elements */}
  </ContextMenuPrimitive.CheckboxItem>
));
// Set display name to match the primitive's display name for consistency
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

// Context Menu Radio Item component - radio button item in the context menu
// Uses React.forwardRef to allow parent components to reference the DOM element
const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem> // Props type excluding ref
>(({ className, children, ...props }, ref) => (
  // Radio item with relative positioning, flex layout, cursor, selection handling, padding, text size, outline, and interaction states
  <ContextMenuPrimitive.RadioItem
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for relative positioning, flex layout, cursor, selection, padding, text size, outline, and interaction states
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  >
    {/* Container for the radio indicator */}
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {/* Indicator that shows when the radio button is selected */}
      <ContextMenuPrimitive.ItemIndicator>
        {/* Circle icon for the radio button */}
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children} {/* Render child elements */}
  </ContextMenuPrimitive.RadioItem>
));
// Set display name to match the primitive's display name for consistency
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

// Context Menu Label component - label for grouping context menu items
// Uses React.forwardRef to allow parent components to reference the DOM element
const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & { // Props type excluding ref with additional props
    inset?: boolean; // Optional flag to add left padding
  }
>(({ className, inset, ...props }, ref) => (
  // Label with padding, text size, font weight, and text color
  <ContextMenuPrimitive.Label
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for padding, text size, font weight, and text color
    className={cn("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className)} // Add left padding if inset prop is true
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

// Context Menu Separator component - visual separator between context menu items
// Uses React.forwardRef to allow parent components to reference the DOM element
const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Separator with negative horizontal margin, vertical margin, thin height, and border color
  <ContextMenuPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
));
// Set display name to match the primitive's display name for consistency
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

// Context Menu Shortcut component - displays keyboard shortcuts for context menu items
const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  // Span element with auto left margin, small text size, wide letter spacing, and muted color
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
};
// Set display name for debugging purposes in React DevTools
ContextMenuShortcut.displayName = "ContextMenuShortcut";

// Export all context menu components for use in other parts of the application
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};

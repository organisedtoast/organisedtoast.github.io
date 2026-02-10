// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Radix UI's dropdown menu primitive components for accessible dropdown functionality
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
// Import Check, ChevronRight, and Circle icons from lucide-react icon library
import { Check, ChevronRight, Circle } from "lucide-react";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Main Dropdown Menu component - container for the dropdown menu functionality
const DropdownMenu = DropdownMenuPrimitive.Root;

// Dropdown Menu Trigger component - element that opens the dropdown menu when clicked
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

// Dropdown Menu Group component - groups related dropdown menu items together
const DropdownMenuGroup = DropdownMenuPrimitive.Group;

// Dropdown Menu Portal component - renders the dropdown menu content into a separate DOM node (typically body)
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

// Dropdown Menu Sub component - container for submenu functionality
const DropdownMenuSub = DropdownMenuPrimitive.Sub;

// Dropdown Menu Radio Group component - groups radio items together
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

// Dropdown Menu Sub Trigger component - trigger for opening a submenu
// Uses React.forwardRef to allow parent components to reference the DOM element
const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & { // Props type excluding ref with additional props
    inset?: boolean; // Optional flag to add left padding
  }
>(({ className, inset, children, ...props }, ref) => (
  // Submenu trigger with flex layout, cursor, selection handling, and interaction states
  <DropdownMenuPrimitive.SubTrigger
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for flex layout, cursor, selection, padding, text size, outline, and interaction states
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent focus:bg-accent",
      inset && "pl-8", // Add left padding if inset prop is true
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  >
    {children} {/* Render child elements */}
    {/* Chevron icon that appears on the right side */}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
// Set display name to match the primitive's display name for consistency
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

// Dropdown Menu Sub Content component - content container for submenu items
// Uses React.forwardRef to allow parent components to reference the DOM element
const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Submenu content with z-index, minimum width, overflow handling, rounded corners, border, background, padding, text color, shadow, and animations
  <DropdownMenuPrimitive.SubContent
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for z-index, minimum width, overflow handling, rounded corners, border, background, padding, text color, shadow, and various animation states
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

// Dropdown Menu Content component - main content container for the dropdown menu
// Uses React.forwardRef to allow parent components to reference the DOM element
const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> // Props type excluding ref
>(({ className, sideOffset = 4, ...props }, ref) => (
  // Portal to render the content outside the normal DOM hierarchy
  <DropdownMenuPrimitive.Portal>
    {/* Dropdown menu content with z-index, minimum width, overflow handling, rounded corners, border, background, padding, text color, shadow, and animations */}
    <DropdownMenuPrimitive.Content
      ref={ref} // Reference to the underlying DOM element
      sideOffset={sideOffset} // Offset distance from the trigger element (defaults to 4)
      // CSS classes for z-index, minimum width, overflow handling, rounded corners, border, background, padding, text color, shadow, and various animation states
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className, // Allow additional custom classes to be passed in
      )}
      {...props} // Spread any additional props passed to the component
    />
  </DropdownMenuPrimitive.Portal>
));
// Set display name to match the primitive's display name for consistency
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

// Dropdown Menu Item component - individual selectable item in the dropdown menu
// Uses React.forwardRef to allow parent components to reference the DOM element
const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & { // Props type excluding ref with additional props
    inset?: boolean; // Optional flag to add left padding
  }
>(({ className, inset, ...props }, ref) => (
  // Menu item with relative positioning, flex layout, cursor, selection handling, padding, text size, outline, and interaction states
  <DropdownMenuPrimitive.Item
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for relative positioning, flex layout, cursor, selection, padding, text size, outline, and interaction states
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8", // Add left padding if inset prop is true
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

// Dropdown Menu Checkbox Item component - checkbox item in the dropdown menu
// Uses React.forwardRef to allow parent components to reference the DOM element
const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> // Props type excluding ref
>(({ className, children, checked, ...props }, ref) => (
  // Checkbox item with relative positioning, flex layout, cursor, selection handling, padding, text size, outline, and interaction states
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for relative positioning, flex layout, cursor, selection, padding, text size, outline, and interaction states
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className, // Allow additional custom classes to be passed in
    )}
    checked={checked} // Checked state of the checkbox
    {...props} // Spread any additional props passed to the component
  >
    {/* Container for the checkbox indicator */}
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {/* Indicator that shows when the checkbox is checked */}
      <DropdownMenuPrimitive.ItemIndicator>
        {/* Check icon for the checkbox */}
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children} {/* Render child elements */}
  </DropdownMenuPrimitive.CheckboxItem>
));
// Set display name to match the primitive's display name for consistency
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

// Dropdown Menu Radio Item component - radio button item in the dropdown menu
// Uses React.forwardRef to allow parent components to reference the DOM element
const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> // Props type excluding ref
>(({ className, children, ...props }, ref) => (
  // Radio item with relative positioning, flex layout, cursor, selection handling, padding, text size, outline, and interaction states
  <DropdownMenuPrimitive.RadioItem
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for relative positioning, flex layout, cursor, selection, padding, text size, outline, and interaction states
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  >
    {/* Container for the radio indicator */}
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {/* Indicator that shows when the radio button is selected */}
      <DropdownMenuPrimitive.ItemIndicator>
        {/* Circle icon for the radio button */}
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children} {/* Render child elements */}
  </DropdownMenuPrimitive.RadioItem>
));
// Set display name to match the primitive's display name for consistency
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

// Dropdown Menu Label component - label for grouping dropdown menu items
// Uses React.forwardRef to allow parent components to reference the DOM element
const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & { // Props type excluding ref with additional props
    inset?: boolean; // Optional flag to add left padding
  }
>(({ className, inset, ...props }, ref) => (
  // Label with padding, text size, and font weight
  <DropdownMenuPrimitive.Label
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for padding, text size, and font weight
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)} // Add left padding if inset prop is true
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

// Dropdown Menu Separator component - visual separator between dropdown menu items
// Uses React.forwardRef to allow parent components to reference the DOM element
const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Separator with negative horizontal margin, vertical margin, thin height, and muted color
  <DropdownMenuPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
));
// Set display name to match the primitive's display name for consistency
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

// Dropdown Menu Shortcut component - displays keyboard shortcuts for dropdown menu items
const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  // Span element with auto left margin, small text size, wide letter spacing, and reduced opacity
  return <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />;
};
// Set display name for debugging purposes in React DevTools
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// Export all dropdown menu components for use in other parts of the application
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};

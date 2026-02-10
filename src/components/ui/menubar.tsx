// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Radix UI's menubar primitive components for accessible menubar functionality
import * as MenubarPrimitive from "@radix-ui/react-menubar";
// Import Check, ChevronRight, and Circle icons from lucide-react icon library
import { Check, ChevronRight, Circle } from "lucide-react";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Menubar Menu component - container for a single menu in the menubar
const MenubarMenu = MenubarPrimitive.Menu;

// Menubar Group component - groups related menubar items together
const MenubarGroup = MenubarPrimitive.Group;

// Menubar Portal component - renders the menubar content into a separate DOM node (typically body)
const MenubarPortal = MenubarPrimitive.Portal;

// Menubar Sub component - container for submenu functionality
const MenubarSub = MenubarPrimitive.Sub;

// Menubar Radio Group component - groups radio items together
const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

// Main Menubar component - container for the entire menubar functionality
// Uses React.forwardRef to allow parent components to reference the DOM element
const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Root element with flex layout, height, item centering, spacing, rounded corners, border, background, and padding
  <MenubarPrimitive.Root
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for flex layout, height, item centering, spacing, rounded corners, border, background, and padding
    className={cn("flex h-10 items-center space-x-1 rounded-md border bg-background p-1", className)}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
Menubar.displayName = MenubarPrimitive.Root.displayName;

// Menubar Trigger component - element that opens a menu when clicked
// Uses React.forwardRef to allow parent components to reference the DOM element
const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Trigger with flex layout, cursor, selection handling, padding, text size, font weight, outline, and interaction states
  <MenubarPrimitive.Trigger
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for flex layout, cursor, selection, padding, text size, font weight, outline, and interaction states
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

// Menubar Sub Trigger component - trigger for opening a submenu
// Uses React.forwardRef to allow parent components to reference the DOM element
const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & { // Props type excluding ref with additional props
    inset?: boolean; // Optional flag to add left padding
  }
>(({ className, inset, children, ...props }, ref) => (
  // Submenu trigger with flex layout, cursor, selection handling, padding, text size, outline, and interaction states
  <MenubarPrimitive.SubTrigger
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
  </MenubarPrimitive.SubTrigger>
));
// Set display name to match the primitive's display name for consistency
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

// Menubar Sub Content component - content container for submenu items
// Uses React.forwardRef to allow parent components to reference the DOM element
const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Submenu content with z-index, minimum width, overflow handling, rounded corners, border, background, padding, text color, and animations
  <MenubarPrimitive.SubContent
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for z-index, minimum width, overflow handling, rounded corners, border, background, padding, text color, and various animation states
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

// Menubar Content component - main content container for a menu
// Uses React.forwardRef to allow parent components to reference the DOM element
const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content> // Props type excluding ref
>(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  // Portal to render the content outside the normal DOM hierarchy
  <MenubarPrimitive.Portal>
    {/* Menu content with z-index, minimum width, overflow handling, rounded corners, border, background, padding, text color, shadow, and animations */}
    <MenubarPrimitive.Content
      ref={ref} // Reference to the underlying DOM element
      align={align} // Alignment of the content relative to the trigger (defaults to start)
      alignOffset={alignOffset} // Offset distance for alignment (defaults to -4)
      sideOffset={sideOffset} // Offset distance from the trigger element (defaults to 8)
      // CSS classes for z-index, minimum width, overflow handling, rounded corners, border, background, padding, text color, shadow, and various animation states
      className={cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className, // Allow additional custom classes to be passed in
      )}
      {...props} // Spread any additional props passed to the component
    />
  </MenubarPrimitive.Portal>
));
// Set display name to match the primitive's display name for consistency
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

// Menubar Item component - individual selectable item in the menubar
// Uses React.forwardRef to allow parent components to reference the DOM element
const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & { // Props type excluding ref with additional props
    inset?: boolean; // Optional flag to add left padding
  }
>(({ className, inset, ...props }, ref) => (
  // Menu item with relative positioning, flex layout, cursor, selection handling, padding, text size, outline, and interaction states
  <MenubarPrimitive.Item
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
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

// Menubar Checkbox Item component - checkbox item in the menubar
// Uses React.forwardRef to allow parent components to reference the DOM element
const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem> // Props type excluding ref
>(({ className, children, checked, ...props }, ref) => (
  // Checkbox item with relative positioning, flex layout, cursor, selection handling, padding, text size, outline, and interaction states
  <MenubarPrimitive.CheckboxItem
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
      <MenubarPrimitive.ItemIndicator>
        {/* Check icon for the checkbox */}
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children} {/* Render child elements */}
  </MenubarPrimitive.CheckboxItem>
));
// Set display name to match the primitive's display name for consistency
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

// Menubar Radio Item component - radio button item in the menubar
// Uses React.forwardRef to allow parent components to reference the DOM element
const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem> // Props type excluding ref
>(({ className, children, ...props }, ref) => (
  // Radio item with relative positioning, flex layout, cursor, selection handling, padding, text size, outline, and interaction states
  <MenubarPrimitive.RadioItem
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
      <MenubarPrimitive.ItemIndicator>
        {/* Circle icon for the radio button */}
        <Circle className="h-2 w-2 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children} {/* Render child elements */}
  </MenubarPrimitive.RadioItem>
));
// Set display name to match the primitive's display name for consistency
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

// Menubar Label component - label for grouping menubar items
// Uses React.forwardRef to allow parent components to reference the DOM element
const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & { // Props type excluding ref with additional props
    inset?: boolean; // Optional flag to add left padding
  }
>(({ className, inset, ...props }, ref) => (
  // Label with padding, text size, and font weight
  <MenubarPrimitive.Label
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for padding, text size, and font weight
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)} // Add left padding if inset prop is true
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

// Menubar Separator component - visual separator between menubar items
// Uses React.forwardRef to allow parent components to reference the DOM element
const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Separator with negative horizontal margin, vertical margin, thin height, and muted color
  <MenubarPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
));
// Set display name to match the primitive's display name for consistency
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

// Menubar Shortcut component - displays keyboard shortcuts for menubar items
const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  // Span element with auto left margin, small text size, wide letter spacing, and muted color
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
};
// Set display name for debugging purposes in React DevTools
MenubarShortcut.displayname = "MenubarShortcut";

// Export all menubar components for use in other parts of the application
export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};

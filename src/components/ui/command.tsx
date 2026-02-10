// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import DialogProps type from Radix UI for dialog component properties
import { type DialogProps } from "@radix-ui/react-dialog";
// Import Command primitive from cmdk library for command palette functionality
import { Command as CommandPrimitive } from "cmdk";
// Import Search icon from lucide-react icon library for the input field
import { Search } from "lucide-react";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";
// Import Dialog and DialogContent components for modal functionality
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Command component - main container for the command palette functionality
// Uses React.forwardRef to allow parent components to reference the DOM element
const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof CommandPrimitive> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Command primitive with flex layout, full height/width, rounded corners, and popover styling
  <CommandPrimitive
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for flex layout, full dimensions, overflow handling, rounded corners, and popover colors
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
Command.displayName = CommandPrimitive.displayName;

// Interface extending DialogProps for command dialog properties
interface CommandDialogProps extends DialogProps {}

// CommandDialog component - wraps the command palette in a modal dialog
const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    // Dialog component with the command palette inside
    <Dialog {...props}>
      {/* Dialog content with no padding and shadow */}
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        {/* Command component with specific styling for dialog context */}
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children} {/* Render child components inside the command */}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

// CommandInput component - input field for the command palette
// Uses React.forwardRef to allow parent components to reference the DOM element
const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Wrapper div with flex layout, border, and padding
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    {/* Search icon with margin, size, and opacity */}
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    {/* Input field with specific styling */}
    <CommandPrimitive.Input
      ref={ref} // Reference to the underlying DOM element
      // CSS classes for flex layout, height, width, background, padding, text size, outline, placeholder, and disabled states
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className, // Allow additional custom classes to be passed in
      )}
      {...props} // Spread any additional props passed to the component
    />
  </div>
));

// Set display name to match the primitive's display name for consistency
CommandInput.displayName = CommandPrimitive.Input.displayName;

// CommandList component - container for the command items
// Uses React.forwardRef to allow parent components to reference the DOM element
const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // List with max height, vertical scrolling, and horizontal overflow hidden
  <CommandPrimitive.List
    ref={ref} // Reference to the underlying DOM element
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)} // Max height and scrolling
    {...props} // Spread any additional props passed to the component
  />
));

// Set display name to match the primitive's display name for consistency
CommandList.displayName = CommandPrimitive.List.displayName;

// CommandEmpty component - displayed when no results are found
// Uses React.forwardRef to allow parent components to reference the DOM element
const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> // Props type excluding ref
>((props, ref) => <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />);

// Set display name to match the primitive's display name for consistency
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

// CommandGroup component - groups related command items together
// Uses React.forwardRef to allow parent components to reference the DOM element
const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Group container with padding, text color, and specific styling for headings
  <CommandPrimitive.Group
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for overflow handling, padding, text color, and heading styles
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  />
));

// Set display name to match the primitive's display name for consistency
CommandGroup.displayName = CommandPrimitive.Group.displayName;

// CommandSeparator component - visual separator between command items
// Uses React.forwardRef to allow parent components to reference the DOM element
const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Separator with negative horizontal margin, thin height, and border color
  <CommandPrimitive.Separator ref={ref} className={cn("-mx-1 h-px bg-border", className)} {...props} />
));
// Set display name to match the primitive's display name for consistency
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

// CommandItem component - individual selectable item in the command palette
// Uses React.forwardRef to allow parent components to reference the DOM element
const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Item with relative positioning, cursor, selection handling, padding, and interaction states
  <CommandPrimitive.Item
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for relative positioning, flex layout, cursor, selection, padding, text size, outline, and interaction states
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  />
));

// Set display name to match the primitive's display name for consistency
CommandItem.displayName = CommandPrimitive.Item.displayName;

// CommandShortcut component - displays keyboard shortcuts for command items
const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  // Span element with auto left margin, small text size, wide letter spacing, and muted color
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
};
// Set display name for debugging purposes in React DevTools
CommandShortcut.displayName = "CommandShortcut";

// Export all command components for use in other parts of the application
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};

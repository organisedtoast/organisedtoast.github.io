/* Import React library to enable JSX syntax for creating UI elements */
import * as React from "react";
/* Import Radix UI's select primitive components for accessible select functionality */
import * as SelectPrimitive from "@radix-ui/react-select";
/* Import Check, ChevronDown, and ChevronUp icons from lucide-react icon library */
import { Check, ChevronDown, ChevronUp } from "lucide-react";

/* Import utility function to conditionally join CSS classes together */
import { cn } from "@/lib/utils";

/* Main Select component - container for the entire select functionality
This is the root component that manages the open/closed state of the select dropdown */
const Select = SelectPrimitive.Root;

/* Select Group component - groups related select items together
Useful for organizing options into logical sections */
const SelectGroup = SelectPrimitive.Group;

/* Select Value component - displays the currently selected value
Shows the selected option in the trigger button before the dropdown opens */
const SelectValue = SelectPrimitive.Value;

/* Select Trigger component - clickable element that opens the select dropdown
Uses React.forwardRef to allow parent components to reference the DOM element */
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>, /* Type for the DOM element being referenced */
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> /* Props type excluding ref */
>(({ className, children, ...props }, ref) => (
  /* Trigger element with flex layout, height, width, item centering, spacing, rounded corners, border, background, text size, and focus states */
  <SelectPrimitive.Trigger
    ref={ref} /* Reference to the underlying DOM element */
    /* CSS classes for flex layout, height, width, item centering, spacing, rounded corners, border, background, text size, and focus states */
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className, /* Allow additional custom classes to be passed in */
    )}
    {...props} /* Spread any additional props passed to the component */
  >
    {children} {/* Render child elements (usually the selected value) */}
    {/* Chevron icon that indicates the dropdown direction */}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
/* Set display name to match the primitive's display name for consistency */
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

/* Select Scroll Up Button component - button to scroll up in the select content when it overflows
Uses React.forwardRef to allow parent components to reference the DOM element */
const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>, /* Type for the DOM element being referenced */
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton> /* Props type excluding ref */
>(({ className, ...props }, ref) => (
  /* Scroll up button with flex layout, cursor, item centering, vertical padding, and custom classes */
  <SelectPrimitive.ScrollUpButton
    ref={ref} /* Reference to the underlying DOM element */
    /* CSS classes for flex layout, cursor, item centering, vertical padding, and custom classes */
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props} /* Spread any additional props passed to the component */
  >
    <ChevronUp className="h-4 w-4" /> {/* Up arrow icon */}
  </SelectPrimitive.ScrollUpButton>
));
/* Set display name to match the primitive's display name for consistency */
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

/* Select Scroll Down Button component - button to scroll down in the select content when it overflows
Uses React.forwardRef to allow parent components to reference the DOM element */
const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>, /* Type for the DOM element being referenced */
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton> /* Props type excluding ref */
>(({ className, ...props }, ref) => (
  /* Scroll down button with flex layout, cursor, item centering, vertical padding, and custom classes */
  <SelectPrimitive.ScrollDownButton
    ref={ref} /* Reference to the underlying DOM element */
    /* CSS classes for flex layout, cursor, item centering, vertical padding, and custom classes */
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props} /* Spread any additional props passed to the component */
  >
    <ChevronDown className="h-4 w-4" /> {/* Down arrow icon */}
  </SelectPrimitive.ScrollDownButton>
));
/* Set display name to match the primitive's display name for consistency */
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

/* Select Content component - container for the select dropdown options
Uses React.forwardRef to allow parent components to reference the DOM element */
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>, /* Type for the DOM element being referenced */
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> /* Props type excluding ref */
>(({ className, children, position = "popper", ...props }, ref) => (
  /* Portal to render the content outside the normal DOM hierarchy (into document.body by default) */
  <SelectPrimitive.Portal>
    {/* Select dropdown with z-index, max height, minimum width, overflow handling, rounded corners, border, background, text color, shadow, and animations */}
    <SelectPrimitive.Content
      ref={ref} /* Reference to the underlying DOM element */
      /* CSS classes for relative positioning, z-index, max height, minimum width, overflow handling, rounded corners, border, background, text color, shadow, and various animation states */
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        /* Position-specific transformations when using popper positioning */
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className, /* Allow additional custom classes to be passed in */
      )}
      position={position} /* Positioning strategy (defaults to popper) */
      {...props} /* Spread any additional props passed to the component */
    >
      {/* Scroll up button for navigating options when content overflows */}
      <SelectScrollUpButton />
      {/* Viewport for the select options with padding and popper-specific sizing */}
      <SelectPrimitive.Viewport
        /* CSS classes for padding and popper-specific height/width based on trigger dimensions */
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]", /* Use trigger dimensions when using popper positioning */
        )}
      >
        {children} {/* Render the select options */}
      </SelectPrimitive.Viewport>
      {/* Scroll down button for navigating options when content overflows */}
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
/* Set display name to match the primitive's display name for consistency */
SelectContent.displayName = SelectPrimitive.Content.displayName;

/* Select Label component - label for grouping select items
Uses React.forwardRef to allow parent components to reference the DOM element */
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>, /* Type for the DOM element being referenced */
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> /* Props type excluding ref */
>(({ className, ...props }, ref) => (
  /* Label with vertical padding, left/right padding, text size, and font weight */
  <SelectPrimitive.Label
    ref={ref} /* Reference to the underlying DOM element */
    /* CSS classes for vertical padding, left/right padding, text size, and font weight */
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props} /* Spread any additional props passed to the component */
  />
));
/* Set display name to match the primitive's display name for consistency */
SelectLabel.displayName = SelectPrimitive.Label.displayName;

/* Select Item component - individual option in the select dropdown
Uses React.forwardRef to allow parent components to reference the DOM element */
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>, /* Type for the DOM element being referenced */
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> /* Props type excluding ref */
>(({ className, children, ...props }, ref) => (
  /* Select item with relative positioning, flex layout, full width, cursor, selection handling, item centering, rounded corners, padding, text size, outline, and interaction states */
  <SelectPrimitive.Item
    ref={ref} /* Reference to the underlying DOM element */
    /* CSS classes for relative positioning, flex layout, full width, cursor, selection, item centering, rounded corners, padding, text size, outline, and interaction states */
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className, /* Allow additional custom classes to be passed in */
    )}
    {...props} /* Spread any additional props passed to the component */
  >
    {/* Container for the selection indicator */}
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {/* Indicator that appears when the item is selected */}
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" /> {/* Check icon for selected state */}
      </SelectPrimitive.ItemIndicator>
    </span>

    {/* Text content of the select item */}
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
/* Set display name to match the primitive's display name for consistency */
SelectItem.displayName = SelectPrimitive.Item.displayName;

/* Select Separator component - visual separator between select items
Uses React.forwardRef to allow parent components to reference the DOM element */
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>, /* Type for the DOM element being referenced */
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> /* Props type excluding ref */
>(({ className, ...props }, ref) => (
  /* Separator with negative horizontal margin, vertical margin, thin height, and muted background */
  <SelectPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
));
/* Set display name to match the primitive's display name for consistency */
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

/* Export all select components for use in other parts of the application */
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};

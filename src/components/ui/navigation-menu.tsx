// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Radix UI's navigation menu primitive components for accessible navigation menus
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
// Import cva (Class Variance Authority) for defining conditional CSS classes
import { cva } from "class-variance-authority";
// Import ChevronDown icon from lucide-react icon library for dropdown indicators
import { ChevronDown } from "lucide-react";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Main Navigation Menu component - container for the entire navigation menu functionality
// Uses React.forwardRef to allow parent components to reference the DOM element
const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> // Props type excluding ref
>(({ className, children, ...props }, ref) => (
  // Root element with relative positioning, z-index, flex layout, max width, and item centering
  <NavigationMenuPrimitive.Root
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for relative positioning, z-index, flex layout, max width, flex growth, and item centering
    className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
    {...props} // Spread any additional props passed to the component
  >
    {children} {/* Render child elements */}
    {/* Viewport for displaying the navigation menu content */}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
// Set display name to match the primitive's display name for consistency
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

// Navigation Menu List component - container for navigation menu items
// Uses React.forwardRef to allow parent components to reference the DOM element
const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // List with group styling, flex layout, flex growth, list style removal, item centering, and spacing
  <NavigationMenuPrimitive.List
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for group styling, flex layout, flex growth, list style removal, item centering, and horizontal spacing
    className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

// Navigation Menu Item component - individual item in the navigation menu
const NavigationMenuItem = NavigationMenuPrimitive.Item;

// Define the trigger style using Class Variance Authority (CVA)
// CVA allows us to define different styles based on props (like state and active props)
const navigationMenuTriggerStyle = cva(
  // Base CSS classes that apply to all navigation menu triggers regardless of state
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
);

// Navigation Menu Trigger component - element that opens a submenu when clicked
// Uses React.forwardRef to allow parent components to reference the DOM element
const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> // Props type excluding ref
>(({ className, children, ...props }, ref) => (
  // Trigger with predefined styling, group class, and chevron icon
  <NavigationMenuPrimitive.Trigger
    ref={ref} // Reference to the underlying DOM element
    // Apply the navigation menu trigger style along with group class and custom classes
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props} // Spread any additional props passed to the component
  >
    {children} {/* Render child elements */}
    {/* Chevron icon that rotates when the menu is open */}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" // Rotate when open
      aria-hidden="true" // Hide from screen readers as it's purely decorative
    />
  </NavigationMenuPrimitive.Trigger>
));
// Set display name to match the primitive's display name for consistency
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

// Navigation Menu Content component - content that appears when a menu is opened
// Uses React.forwardRef to allow parent components to reference the DOM element
const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Content with positioning, full width, and motion animations
  <NavigationMenuPrimitive.Content
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for positioning, full width, and various motion animations for different states
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  />
));
// Set display name to match the primitive's display name for consistency
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

// Navigation Menu Link component - link element for navigation items
const NavigationMenuLink = NavigationMenuPrimitive.Link;

// Navigation Menu Viewport component - container for displaying the menu content
// Uses React.forwardRef to allow parent components to reference the DOM element
const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Wrapper div for centering the viewport
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    {/* Viewport with origin, relative positioning, margin, height/width variables, overflow handling, rounded corners, border, background, text color, shadow, and state animations */}
    <NavigationMenuPrimitive.Viewport
      // CSS classes for origin, relative positioning, margin, height/width variables, overflow handling, rounded corners, border, background, text color, shadow, and state animations
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className, // Allow additional custom classes to be passed in
      )}
      ref={ref} // Reference to the underlying DOM element
      {...props} // Spread any additional props passed to the component
    />
  </div>
));
// Set display name to match the primitive's display name for consistency
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

// Navigation Menu Indicator component - visual indicator for active menu
// Uses React.forwardRef to allow parent components to reference the DOM element
const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator> // Props type excluding ref
>(({ className, ...props }, ref) => (
  // Indicator with top positioning, z-index, flex layout, height, item alignment, overflow handling, and state animations
  <NavigationMenuPrimitive.Indicator
    ref={ref} // Reference to the underlying DOM element
    // CSS classes for top positioning, z-index, flex layout, height, item alignment, overflow handling, and state animations
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  >
    {/* Triangle indicator with relative positioning, size, rotation, rounded corner, background, and shadow */}
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
// Set display name to match the primitive's display name for consistency
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

// Export all navigation menu components and the trigger style for use in other parts of the application
export {
  navigationMenuTriggerStyle, // Export the trigger style separately for reuse
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};

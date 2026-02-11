/* Import React library to enable JSX syntax for creating UI elements */
import * as React from "react";
/* Import Radix UI's avatar primitive components for accessible user profile pictures */
import * as AvatarPrimitive from "@radix-ui/react-avatar";

/* Import utility function to conditionally join CSS classes together */
import { cn } from "@/lib/utils";

/* Main Avatar component - container for the avatar image and fallback content
Uses React.forwardRef to allow parent components to reference the DOM element */
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>, /* Type for the DOM element being referenced */
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> /* Props type excluding ref */
>(({ className, ...props }, ref) => (
  /* Root element with circular styling and overflow hidden to create the avatar shape */
  <AvatarPrimitive.Root
    ref={ref} /* Reference to the underlying DOM element */
    /* CSS classes for circular shape, size, and layout properties */
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props} /* Spread any additional props passed to the component */
  />
));
/* Set display name to match the primitive's display name for consistency */
Avatar.displayName = AvatarPrimitive.Root.displayName;

/* Avatar Image component - displays the actual image for the avatar
Uses React.forwardRef to allow parent components to reference the DOM element */
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>, /* Type for the DOM element being referenced */
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> /* Props type excluding ref */
>(({ className, ...props }, ref) => (
  /* Image element that fills the avatar container while maintaining aspect ratio */
  <AvatarPrimitive.Image ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
));
/* Set display name to match the primitive's display name for consistency */
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

/* Avatar Fallback component - displays when the image fails to load or isn't provided
Uses React.forwardRef to allow parent components to reference the DOM element */
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>, /* Type for the DOM element being referenced */
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> /* Props type excluding ref */
>(({ className, ...props }, ref) => (
  /* Fallback element with centered content and muted background */
  <AvatarPrimitive.Fallback
    ref={ref} /* Reference to the underlying DOM element */
    /* CSS classes for centering content, circular shape, and background styling */
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
    {...props} /* Spread any additional props passed to the component */
  />
));
/* Set display name to match the primitive's display name for consistency */
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

/* Export all avatar components for use in other parts of the application */
export { Avatar, AvatarImage, AvatarFallback };

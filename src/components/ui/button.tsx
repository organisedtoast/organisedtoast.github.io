/* Import React library to enable JSX syntax for creating UI elements */
import * as React from "react";
/* Import Slot from Radix UI to allow passing props through to child components */
import { Slot } from "@radix-ui/react-slot";
/* Import cva (Class Variance Authority) for defining conditional CSS classes and VariantProps for type definitions */
import { cva, type VariantProps } from "class-variance-authority";

/* Import utility function to conditionally join CSS classes together */
import { cn } from "@/lib/utils";

/* Define button variants using Class Variance Authority (CVA)
CVA allows us to define different styles based on props (like variant and size props) */
const buttonVariants = cva(
  /* Base CSS classes that apply to all buttons regardless of variant or size */
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    /* Different style variants based on the 'variant' prop */
    variants: {
      variant: {
        /* Default button styling - primary color scheme */
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        /* Destructive button styling - typically for dangerous actions with red colors */
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        /* Outline button styling - only border with transparent background */
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        /* Secondary button styling - secondary color scheme with subtle appearance */
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        /* Ghost button styling - transparent with hover effects */
        ghost: "hover:bg-accent hover:text-accent-foreground",
        /* Link button styling - appears like a text link */
        link: "text-primary underline-offset-4 hover:underline",
      },
      /* Different sizes based on the 'size' prop */
      size: {
        /* Default size - medium button */
        default: "h-10 px-4 py-2",
        /* Small size - compact button */
        sm: "h-9 rounded-md px-3",
        /* Large size - bigger button */
        lg: "h-11 rounded-md px-8",
        /* Icon size - square button for icons only */
        icon: "h-10 w-10",
      },
    },
    /* Set default values when no props are provided */
    defaultVariants: {
      variant: "default", /* Default variant is 'default' */
      size: "default",    /* Default size is 'default' */
    },
  },
);

/* Define the ButtonProps interface that combines button HTML attributes and variant props
This defines the expected props for the Button component */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, /* Standard button HTML attributes */
    VariantProps<typeof buttonVariants> {                /* Variant props from the CVA definition */
  asChild?: boolean; /* Flag to determine if child component should be used instead of 'button' */
}

/* Button component - interactive element that triggers actions when clicked
Uses React.forwardRef to allow parent components to reference the DOM element */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    /* Determine which component to render based on asChild prop */
    const Comp = asChild ? Slot : "button";

    /* Return the chosen component with appropriate styling and attributes */
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
/* Set display name for debugging purposes in React DevTools */
Button.displayName = "Button";

/* Export both the Button component and buttonVariants for use in other parts of the application */
export { Button, buttonVariants };

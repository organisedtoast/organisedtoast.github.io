// Import useTheme hook from next-themes to access the current theme (light, dark, or system)
import { useTheme } from "next-themes";
// Import Toaster component and toast function from sonner notification library
import { Toaster as Sonner, toast } from "sonner";

// Define ToasterProps type that extends the props from the Sonner component
type ToasterProps = React.ComponentProps<typeof Sonner>;

// Toaster component - container for displaying toast notifications
// This component adapts to the current theme and provides consistent styling
const Toaster = ({ ...props }: ToasterProps) => {
  // Get the current theme from the theme context, defaulting to "system" if not set
  const { theme = "system" } = useTheme();

  return (
    // Sonner Toaster component with theme adaptation and custom styling
    <Sonner
      // Set the theme based on the current app theme
      theme={theme as ToasterProps["theme"]}
      // CSS class for styling the toaster container
      className="toaster group"
      // Custom styling options for different parts of the toast
      toastOptions={{
        // Class names for different elements within the toast
        classNames: {
          // Styling for the main toast element
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          // Styling for the toast description
          description: "group-[.toast]:text-muted-foreground",
          // Styling for action buttons in the toast
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          // Styling for cancel buttons in the toast
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      // Spread any additional props passed to the component
      {...props}
    />
  );
};

// Export both the Toaster component and the toast function for use in other parts of the application
export { Toaster, toast };

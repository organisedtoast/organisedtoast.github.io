// Import the useToast hook to access toast state and functions
import { useToast } from "@/hooks/use-toast";
// Import all necessary toast components for building the toast UI
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

// Toaster component - container that displays all active toast notifications
// This component renders all toasts that are currently in the application state
export function Toaster() {
  // Get the current toasts array from the toast hook
  const { toasts } = useToast();

  return (
    // Toast provider to manage the toast context
    <ToastProvider>
      {/* Map through each toast in the toasts array and render it */}
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          // Individual toast with unique key and spread props
          <Toast key={id} {...props}>
            {/* Grid container for the toast content with small gap */}
            <div className="grid gap-1">
              {/* Conditionally render the toast title if it exists */}
              {title && <ToastTitle>{title}</ToastTitle>}
              {/* Conditionally render the toast description if it exists */}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {/* Render the action component if provided */}
            {action}
            {/* Close button for dismissing the toast */}
            <ToastClose />
          </Toast>
        );
      })}
      {/* Viewport where toasts will be displayed */}
      <ToastViewport />
    </ToastProvider>
  );
}

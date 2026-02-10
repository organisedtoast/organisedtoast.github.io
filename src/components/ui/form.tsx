// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Label primitive from Radix UI for accessible labeling
import * as LabelPrimitive from "@radix-ui/react-label";
// Import Slot from Radix UI to allow passing props through to child components
import { Slot } from "@radix-ui/react-slot";
// Import react-hook-form utilities for form management and validation
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from "react-hook-form";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";
// Import Label component for form labels
import { Label } from "@/components/ui/label";

// Form component - wraps the entire form using react-hook-form's FormProvider
const Form = FormProvider;

// Type definition for the FormField context value
// Contains the name of the form field for context sharing
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues, // Generic type for form field values
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>, // Generic type for field path
> = {
  name: TName; // The name of the form field
};

// Context to share form field information between components
const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

// FormField component - wraps a form field with context for validation and error handling
// Uses react-hook-form's Controller to manage the field state
const FormField = <
  TFieldValues extends FieldValues = FieldValues, // Generic type for form field values
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>, // Generic type for field path
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    // Provide the field name to child components via context
    <FormFieldContext.Provider value={{ name: props.name }}>
      {/* Controller component from react-hook-form to manage the field */}
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

// Custom hook to access form field context values
// Provides field state, IDs, and error information
const useFormField = () => {
  // Get field context (name of the field)
  const fieldContext = React.useContext(FormFieldContext);
  // Get item context (ID of the form item)
  const itemContext = React.useContext(FormItemContext);
  // Get form state and field state functions from react-hook-form
  const { getFieldState, formState } = useFormContext();

  // Get the current field state based on the field name and form state
  const fieldState = getFieldState(fieldContext.name, formState);

  // Throw an error if the hook is used outside of a FormField component
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  // Extract the ID from the item context
  const { id } = itemContext;

  // Return field information including generated IDs for accessibility
  return {
    id, // The ID of the form item
    name: fieldContext.name, // The name of the field
    formItemId: `${id}-form-item`, // Generated ID for the form item
    formDescriptionId: `${id}-form-item-description`, // Generated ID for the description
    formMessageId: `${id}-form-item-message`, // Generated ID for the error message
    ...fieldState, // Spread the field state (errors, touched, etc.)
  };
};

// Type definition for the FormItem context value
type FormItemContextValue = {
  id: string; // The unique ID for the form item
};

// Context to share form item information between components
const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

// FormItem component - container for a single form field with associated elements
// Uses React.forwardRef to allow parent components to reference the DOM element
const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    // Generate a unique ID for this form item
    const id = React.useId();

    return (
      // Provide the ID to child components via context
      <FormItemContext.Provider value={{ id }}>
        {/* Container div with vertical spacing and custom classes */}
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
      </FormItemContext.Provider>
    );
  },
);
// Set display name for debugging purposes in React DevTools
FormItem.displayName = "FormItem";

// FormLabel component - label for a form field with error state indication
// Uses React.forwardRef to allow parent components to reference the DOM element
const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>, // Type for the DOM element being referenced
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> // Props type excluding ref
>(({ className, ...props }, ref) => {
  // Get error state and form item ID from the form field context
  const { error, formItemId } = useFormField();

  // Return a Label component with error styling if there's an error
  return <Label ref={ref} className={cn(error && "text-destructive", className)} htmlFor={formItemId} {...props} />;
});
// Set display name for debugging purposes in React DevTools
FormLabel.displayName = "FormLabel";

// FormControl component - wraps form input elements with accessibility attributes
// Uses React.forwardRef to allow parent components to reference the DOM element
const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
  ({ ...props }, ref) => {
    // Get error state and generated IDs from the form field context
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    return (
      // Slot component that passes props to its child with accessibility attributes
      <Slot
        ref={ref} // Reference to the underlying DOM element
        id={formItemId} // Set the ID for accessibility
        // Set the describedby attribute to connect the input with description and message elements
        aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error} // Set invalid state if there's an error
        {...props} // Spread any additional props passed to the component
      />
    );
  },
);
// Set display name for debugging purposes in React DevTools
FormControl.displayName = "FormControl";

// FormDescription component - description text for a form field
// Uses React.forwardRef to allow parent components to reference the DOM element
const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    // Get the form description ID from the form field context
    const { formDescriptionId } = useFormField();

    // Return a paragraph with the description ID and styling
    return <p ref={ref} id={formDescriptionId} className={cn("text-sm text-muted-foreground", className)} {...props} />;
  },
);
// Set display name for debugging purposes in React DevTools
FormDescription.displayName = "FormDescription";

// FormMessage component - displays error messages for form fields
// Uses React.forwardRef to allow parent components to reference the DOM element
const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    // Get error state and form message ID from the form field context
    const { error, formMessageId } = useFormField();
    // Use the error message if there's an error, otherwise use the children
    const body = error ? String(error?.message) : children;

    // Don't render anything if there's no message to display
    if (!body) {
      return null;
    }

    // Return a paragraph with the error message ID and error styling
    return (
      <p ref={ref} id={formMessageId} className={cn("text-sm font-medium text-destructive", className)} {...props}>
        {body}
      </p>
    );
  },
);
// Set display name for debugging purposes in React DevTools
FormMessage.displayName = "FormMessage";

// Export all form components and the custom hook for use in other parts of the application
export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField };

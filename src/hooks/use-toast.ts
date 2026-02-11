/*
 * Import React library to enable JSX syntax and access to React hooks
 * This is necessary for creating functional components and using hooks like useState and useEffect
 */
import * as React from "react";

/*
 * Import types for toast components to ensure proper typing
 * These types define the structure and properties of toast elements
 */
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

/*
 * Define the maximum number of toasts that can be displayed at once
 * Setting this to 1 means only one toast will be shown at a time
 */
const TOAST_LIMIT = 1;

/*
 * Define the delay in milliseconds before a toast is automatically removed
 * This is set to a very large number (1,000,000 ms = ~11.5 days) to essentially disable automatic removal
 * This means toasts will stay visible until manually dismissed
 */
const TOAST_REMOVE_DELAY = 1000000;

/*
 * Define the structure of a single toast object
 * Extends ToastProps with additional properties specific to our toaster
 */
type ToasterToast = ToastProps & {
  id: string;                    // Unique identifier for each toast
  title?: React.ReactNode;       // Optional title content for the toast
  description?: React.ReactNode; // Optional description content for the toast
  action?: ToastActionElement;   // Optional action element that can be included in the toast
};

/*
 * Define the possible action types for the toast reducer
 * These represent different operations that can be performed on the toast state
 */
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",       // Action to add a new toast to the list
  UPDATE_TOAST: "UPDATE_TOAST", // Action to update an existing toast
  DISMISS_TOAST: "DISMISS_TOAST", // Action to mark a toast as dismissed
  REMOVE_TOAST: "REMOVE_TOAST", // Action to completely remove a toast from the list
} as const;

/*
 * Counter variable to generate unique IDs for each toast
 * Used by the genId function to ensure each toast has a unique identifier
 */
let count = 0;

/*
 * Function to generate unique IDs for toasts
 * Increments the counter and returns a string representation of the count
 * Uses modulo with MAX_SAFE_INTEGER to prevent overflow
 */
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

/*
 * Define the type for action types based on the actionTypes object
 * This ensures type safety when referencing action types
 */
type ActionType = typeof actionTypes;

/*
 * Define the possible action structures that can be dispatched to the reducer
 * Each action has a type and associated payload data
 */
type Action =
  | {
      type: ActionType["ADD_TOAST"];  // Action type for adding a toast
      toast: ToasterToast;           // The toast object to add
    }
  | {
      type: ActionType["UPDATE_TOAST"]; // Action type for updating a toast
      toast: Partial<ToasterToast>;    // Partial toast object with updated properties
    }
  | {
      type: ActionType["DISMISS_TOAST"]; // Action type for dismissing a toast
      toastId?: ToasterToast["id"];      // Optional ID of the toast to dismiss (if undefined, all are dismissed)
    }
  | {
      type: ActionType["REMOVE_TOAST"]; // Action type for removing a toast
      toastId?: ToasterToast["id"];     // Optional ID of the toast to remove (if undefined, all are removed)
    };

/*
 * Interface defining the structure of the toast state
 * Contains an array of all current toasts
 */
interface State {
  toasts: ToasterToast[]; // Array of all active toasts
}

/*
 * Map to keep track of timeouts for each toast
 * Used to schedule automatic removal of toasts after a delay
 */
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

/*
 * Function to add a toast to the removal queue
 * Sets a timeout that will dispatch a REMOVE_TOAST action after the specified delay
 */
const addToRemoveQueue = (toastId: string) => {
  // If a timeout is already set for this toast, don't add another one
  if (toastTimeouts.has(toastId)) {
    return;
  }

  // Set a timeout to remove the toast after the specified delay
  const timeout = setTimeout(() => {
    // Remove the timeout from our tracking map
    toastTimeouts.delete(toastId);
    // Dispatch an action to remove the toast
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY); // Use the configured delay

  // Store the timeout in our tracking map
  toastTimeouts.set(toastId, timeout);
};

/*
 * Reducer function that handles state changes based on dispatched actions
 * Takes the current state and an action, and returns the new state
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      // Add a new toast to the beginning of the array
      // Limit the number of toasts to TOAST_LIMIT
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      // Update an existing toast by finding it by ID and merging new properties
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      // If a specific toast ID was provided, add only that toast to the removal queue
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        // If no ID was provided, add all toasts to the removal queue
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      // Mark the toast(s) as closed by setting open to false
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false, // Mark as closed
              }
            : t,
        ),
      };
    }
    case "REMOVE_TOAST":
      // If no toast ID was provided, remove all toasts
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [], // Empty the toasts array
        };
      }
      // Otherwise, remove only the specified toast
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId), // Filter out the specified toast
      };
  }
};

/*
 * Array to store listener functions that subscribe to state changes
 * When the state changes, all listeners are notified
 */
const listeners: Array<(state: State) => void> = [];

/*
 * Global state variable that persists outside of React components
 * This allows toast state to persist across component mounts/unmounts
 */
let memoryState: State = { toasts: [] };

/*
 * Function to dispatch actions to the reducer
 * Updates the global state and notifies all subscribed listeners
 */
function dispatch(action: Action) {
  // Calculate the new state by applying the action to the current state
  memoryState = reducer(memoryState, action);
  // Notify all subscribed listeners about the state change
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

/*
 * Define the Toast type by omitting the 'id' property
 * This is used for creating new toasts, as the ID is generated automatically
 */
type Toast = Omit<ToasterToast, "id">;

/*
 * Function to create and display a new toast
 * Generates an ID, adds the toast to the state, and returns methods to interact with it
 */
function toast({ ...props }: Toast) {
  // Generate a unique ID for this toast
  const id = genId();

  // Function to update the toast with new properties
  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id }, // Include the ID with the updated properties
    });
  
  // Function to dismiss the toast
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  // Dispatch an action to add the new toast to the state
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,        // Include all the original properties
      id,             // Add the generated ID
      open: true,      // Initially set the toast as open/visible
      onOpenChange: (open) => {
        // If the toast is closed, dismiss it
        if (!open) dismiss();
      },
    },
  });

  // Return an object with methods to interact with this specific toast
  return {
    id: id,      // The unique ID of the toast
    dismiss,     // Function to dismiss the toast
    update,      // Function to update the toast
  };
}

/*
 * Custom React hook that provides access to toast state and functions
 * Allows components to read toast state and create new toasts
 */
function useToast() {
  // Initialize component state with the current global toast state
  const [state, setState] = React.useState<State>(memoryState);

  // Effect to subscribe/unsubscribe this component to state changes
  React.useEffect(() => {
    // Add the setState function to the listeners array
    listeners.push(setState);
    // Return a cleanup function that removes the listener when the component unmounts
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1); // Remove this component's listener
      }
    };
  }, [state]); // Re-run the effect if the state changes

  // Return the current state and functions to interact with toasts
  return {
    ...state, // Spread the current toast state (the toasts array)
    toast,    // Function to create new toasts
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }), // Function to dismiss toasts
  };
}

// Export the useToast hook and the toast function for use in other components
export { useToast, toast };

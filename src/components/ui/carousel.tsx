// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Embla Carousel hook and type for carousel functionality
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
// Import ArrowLeft and ArrowRight icons from lucide-react icon library for navigation
import { ArrowLeft, ArrowRight } from "lucide-react";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";
// Import Button component for carousel navigation controls
import { Button } from "@/components/ui/button";

// Define CarouselApi type as the second return value from UseEmblaCarouselType
type CarouselApi = UseEmblaCarouselType[1];
// Extract parameters type from useEmblaCarousel hook
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
// Extract options type from the first parameter of useEmblaCarousel
type CarouselOptions = UseCarouselParameters[0];
// Extract plugin type from the second parameter of useEmblaCarousel
type CarouselPlugin = UseCarouselParameters[1];

// Define CarouselProps type for the main Carousel component
type CarouselProps = {
  // Optional carousel options to configure behavior
  opts?: CarouselOptions;
  // Optional plugins to extend carousel functionality
  plugins?: CarouselPlugin;
  // Orientation of the carousel - either horizontal or vertical
  orientation?: "horizontal" | "vertical";
  // Callback function to expose the carousel API to parent components
  setApi?: (api: CarouselApi) => void;
};

// Define CarouselContextProps type that includes all values provided by the context
type CarouselContextProps = {
  // Reference to the carousel container element
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  // Carousel API object for controlling the carousel programmatically
  api: ReturnType<typeof useEmblaCarousel>[1];
  // Function to scroll to the previous slide
  scrollPrev: () => void;
  // Function to scroll to the next slide
  scrollNext: () => void;
  // Boolean indicating if the carousel can scroll to the previous slide
  canScrollPrev: boolean;
  // Boolean indicating if the carousel can scroll to the next slide
  canScrollNext: boolean;
} & CarouselProps;

// Create a React context to share carousel state and functions with child components
const CarouselContext = React.createContext<CarouselContextProps | null>(null);

// Custom hook to access carousel context values
function useCarousel() {
  // Get the context value
  const context = React.useContext(CarouselContext);

  // Throw an error if the hook is used outside of a Carousel provider
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  // Return the context value
  return context;
}

// Main Carousel component - container for the carousel functionality
// Uses React.forwardRef to allow parent components to reference the DOM element
const Carousel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    // Initialize the Embla carousel with options and plugins
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts, // Spread any additional options
        // Set the axis based on orientation (x for horizontal, y for vertical)
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins, // Pass plugins to the carousel
    );
    
    // State to track if previous/next navigation is possible
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    // Callback to update scroll state when carousel selection changes
    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      // Update state based on carousel's ability to scroll prev/next
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    // Callback to scroll to the previous slide
    const scrollPrev = React.useCallback(() => {
      // Call the API method to scroll to the previous slide if available
      api?.scrollPrev();
    }, [api]);

    // Callback to scroll to the next slide
    const scrollNext = React.useCallback(() => {
      // Call the API method to scroll to the next slide if available
      api?.scrollNext();
    }, [api]);

    // Handle keyboard navigation for the carousel
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        // Handle left arrow key press
        if (event.key === "ArrowLeft") {
          event.preventDefault(); // Prevent default browser behavior
          scrollPrev(); // Scroll to previous slide
        } else if (event.key === "ArrowRight") { // Handle right arrow key press
          event.preventDefault(); // Prevent default browser behavior
          scrollNext(); // Scroll to next slide
        }
      },
      [scrollPrev, scrollNext], // Dependencies for the callback
    );

    // Effect to set the API in parent component if setApi is provided
    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api); // Pass the API to the parent component
    }, [api, setApi]);

    // Effect to handle carousel events and state updates
    React.useEffect(() => {
      if (!api) {
        return;
      }

      // Update scroll state initially
      onSelect(api);
      // Subscribe to reInit and select events to update state
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      // Cleanup function to unsubscribe from events
      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    // Render the carousel with context provider
    return (
      <CarouselContext.Provider
        value={{
          carouselRef, // Reference to the carousel container
          api: api, // Carousel API object
          opts, // Carousel options
          orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"), // Current orientation
          scrollPrev, // Function to scroll to previous slide
          scrollNext, // Function to scroll to next slide
          canScrollPrev, // Can scroll to previous slide
          canScrollNext, // Can scroll to next slide
        }}
      >
        {/* Main carousel container with keyboard event handling */}
        <div
          ref={ref} // Reference to the DOM element
          onKeyDownCapture={handleKeyDown} // Handle keyboard events
          className={cn("relative", className)} // Apply relative positioning and custom classes
          role="region" // Accessibility role for screen readers
          aria-roledescription="carousel" // Describe the carousel role
          {...props} // Spread any additional props
        >
          {children} {/* Render child components */}
        </div>
      </CarouselContext.Provider>
    );
  },
);
// Set display name for debugging purposes in React DevTools
Carousel.displayName = "Carousel";

// CarouselContent component - container for the slides
// Uses React.forwardRef to allow parent components to reference the DOM element
const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    // Get carouselRef and orientation from context
    const { carouselRef, orientation } = useCarousel();

    return (
      // Outer container with overflow hidden to clip slides
      <div ref={carouselRef} className="overflow-hidden">
        {/* Inner container for slides with flex layout */}
        <div
          ref={ref} // Reference to the DOM element
          // Apply flex layout and margins based on orientation, plus custom classes
          className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
          {...props} // Spread any additional props
        />
      </div>
    );
  },
);
// Set display name for debugging purposes in React DevTools
CarouselContent.displayName = "CarouselContent";

// CarouselItem component - individual slide in the carousel
// Uses React.forwardRef to allow parent components to reference the DOM element
const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    // Get orientation from context
    const { orientation } = useCarousel();

    return (
      // Slide container with appropriate role and styling
      <div
        ref={ref} // Reference to the DOM element
        role="group" // Accessibility role indicating this is a group
        aria-roledescription="slide" // Describe the slide role
        // Apply sizing and spacing based on orientation, plus custom classes
        className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)}
        {...props} // Spread any additional props
      />
    );
  },
);
// Set display name for debugging purposes in React DevTools
CarouselItem.displayName = "CarouselItem";

// CarouselPrevious component - button to navigate to the previous slide
// Uses React.forwardRef to allow parent components to reference the DOM element
const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    // Get orientation, scrollPrev function, and canScrollPrev state from context
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
      // Button with appropriate styling and positioning
      <Button
        ref={ref} // Reference to the DOM element
        variant={variant} // Button variant (defaults to outline)
        size={size} // Button size (defaults to icon)
        // Apply absolute positioning based on orientation, plus custom classes
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2" // Horizontal: position to the left
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90", // Vertical: position above and rotate
          className, // Custom classes
        )}
        disabled={!canScrollPrev} // Disable if can't scroll to previous
        onClick={scrollPrev} // Click handler to scroll to previous
        {...props} // Spread any additional props
      >
        <ArrowLeft className="h-4 w-4" /> {/* Left arrow icon */}
        <span className="sr-only">Previous slide</span> {/* Screen reader only text */}
      </Button>
    );
  },
);
// Set display name for debugging purposes in React DevTools
CarouselPrevious.displayName = "CarouselPrevious";

// CarouselNext component - button to navigate to the next slide
// Uses React.forwardRef to allow parent components to reference the DOM element
const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    // Get orientation, scrollNext function, and canScrollNext state from context
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
      // Button with appropriate styling and positioning
      <Button
        ref={ref} // Reference to the DOM element
        variant={variant} // Button variant (defaults to outline)
        size={size} // Button size (defaults to icon)
        // Apply absolute positioning based on orientation, plus custom classes
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2" // Horizontal: position to the right
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", // Vertical: position below and rotate
          className, // Custom classes
        )}
        disabled={!canScrollNext} // Disable if can't scroll to next
        onClick={scrollNext} // Click handler to scroll to next
        {...props} // Spread any additional props
      >
        <ArrowRight className="h-4 w-4" /> {/* Right arrow icon */}
        <span className="sr-only">Next slide</span> {/* Screen reader only text */}
      </Button>
    );
  },
);
// Set display name for debugging purposes in React DevTools
CarouselNext.displayName = "CarouselNext";

// Export types and components for use in other parts of the application
export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };

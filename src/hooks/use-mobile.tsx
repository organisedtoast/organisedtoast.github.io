/* 
 * Import React library to enable JSX syntax and access to React hooks
 * This is necessary for creating functional components and using hooks like useState and useEffect
 */
import * as React from "react";

/* 
 * Define a constant for the mobile breakpoint width in pixels
 * This represents the maximum screen width (in pixels) that is considered "mobile"
 * Screens with widths up to 768px will be treated as mobile devices
 */
const MOBILE_BREAKPOINT = 768;

/*
 * Custom React hook that detects if the user is viewing on a mobile device/screen
 * This hook returns a boolean value indicating whether the screen width is less than the mobile breakpoint
 * It automatically updates when the window is resized, allowing for responsive behavior
 */
export function useIsMobile() {
  /*
   * Initialize state to track whether the current screen size is mobile
   * We start with 'undefined' to distinguish between initial state and actual boolean values
   * This helps prevent potential rendering issues during the initial mount
   */
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  /*
   * useEffect hook runs after the component mounts and sets up the resize detection
   * The empty dependency array [] means this effect only runs once when the component mounts
   * and cleans up when the component unmounts
   */
  React.useEffect(() => {
    /*
     * Create a MediaQueryList object that checks if the screen width is less than our mobile breakpoint
     * matchMedia is a browser API that allows us to check CSS media queries programmatically
     * The query "(max-width: 767px)" matches screens with width 767px or less
     */
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    /*
     * Define the function that runs when the media query state changes
     * This function updates our isMobile state based on the current window width
     */
    const onChange = () => {
      /*
       * Update the isMobile state to true if the current window width is less than the mobile breakpoint
       * This comparison checks the actual window width rather than relying solely on the media query
       */
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    /*
     * Add the onChange function as an event listener to the media query
     * This ensures our state updates automatically when the screen size crosses the mobile threshold
     */
    mql.addEventListener("change", onChange);
    
    /*
     * Set the initial state based on the current window size
     * This ensures the hook returns the correct value immediately after mounting
     */
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    
    /*
     * Return a cleanup function that removes the event listener
     * This prevents memory leaks and unexpected behavior when the component unmounts
     * The cleanup function runs when the component using this hook is removed from the DOM
     */
    return () => mql.removeEventListener("change", onChange);
  }, []);

  /*
   * Return the boolean value indicating if the screen is mobile-sized
   * The double negation (!!) converts undefined to false for the initial state
   * This ensures we always return a boolean value even during initialization
   */
  return !!isMobile;
}

/*
 * Import Jest DOM extension methods
 * This adds custom jest matchers for asserting on DOM nodes
 * These matchers improve the readability and functionality of DOM-related tests
 * Examples include: toBeInTheDocument(), toHaveClass(), toHaveTextContent(), etc.
 */
import "@testing-library/jest-dom";

/*
 * Define a mock implementation of window.matchMedia
 * This is necessary because jsdom (which runs tests in Node.js) doesn't implement matchMedia
 * matchMedia is a browser API used for responsive design and media queries
 * Without this mock, tests that use matchMedia would fail
 */
Object.defineProperty(window, "matchMedia", {
  /*
   * Set the property to be writable so it can be redefined if needed
   */
  writable: true,
  
  /*
   * Define the mock implementation of matchMedia
   * This function takes a media query string and returns a MediaQueryList-like object
   * The mock always returns matches: false, which means media queries won't match
   * This is a simple mock that implements the minimal required API surface
   */
  value: (query: string) => ({
    matches: false,                    // Whether the media query currently matches (always false in this mock)
    media: query,                      // The media query string that was passed in
    onchange: null,                    // Event handler for when the media query match status changes
    
    /*
     * Mock implementations of the MediaQueryList methods
     * These are no-op functions (they do nothing) since we're not testing media query changes
     */
    addListener: () => {},             // Deprecated method for adding change listeners
    removeListener: () => {},          // Deprecated method for removing change listeners
    addEventListener: () => {},        // Modern method for adding event listeners
    removeEventListener: () => {},     // Modern method for removing event listeners
    dispatchEvent: () => {},           // Method to dispatch events (not used in this context)
  }),
});

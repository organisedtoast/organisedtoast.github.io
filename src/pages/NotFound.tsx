/*
 * Import the useLocation hook from react-router-dom
 * This hook allows us to access the current URL path and other location information
 */
import { useLocation } from "react-router-dom";

/*
 * Import the useEffect hook from React
 * This hook allows us to run side effects in functional components
 */
import { useEffect } from "react";

/*
 * NotFound component - displays when a user navigates to a non-existent route
 * This component is typically used as a catch-all for routes that don't match any defined routes
 */
const NotFound = () => {
  /*
   * Get the current location object using the useLocation hook
   * This provides information about the current URL, including the pathname
   */
  const location = useLocation();

  /*
   * Use the useEffect hook to run code after the component renders
   * This logs an error message to the console when a 404 error occurs
   * The dependency array [location.pathname] ensures this effect runs when the pathname changes
   */
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  /*
   * Return the JSX for the 404 page
   * This creates a full-screen centered message informing the user that the page wasn't found
   */
  return (
    /*
     * Main container div that takes up the full screen height
     * Uses flexbox to center content both vertically and horizontally
     * Applies a muted background color
     */
    <div className="flex min-h-screen items-center justify-center bg-muted">
      {/* Inner container for the content with centered text alignment */}
      <div className="text-center">
        {/* Large heading displaying the 404 error code */}
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        {/* Paragraph explaining the error in user-friendly terms */}
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        {/* Link back to the home page with styling */}
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

/*
 * Export the NotFound component as the default export
 * This allows other files to import it without specifying a name
 */
export default NotFound;

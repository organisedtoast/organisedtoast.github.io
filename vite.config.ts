// IMPORT VITE CONFIGURATION FUNCTIONS AND PLUGINS
// Import the defineConfig function from Vite to create the configuration
import { defineConfig } from "vite";
// Import the React plugin for Vite that enables React support with SWC (Speedy Web Compiler)
import react from "@vitejs/plugin-react-swc";
// Import the path module to work with file and directory paths
import path from "path";
// Import the componentTagger from lovable-tagger for development tooling
import { componentTagger } from "lovable-tagger";

// EXPORT VITE CONFIGURATION
// Export the Vite configuration object that defines how the development server and build process work
// The configuration is a function that receives the mode (development, production, etc.) as a parameter
export default defineConfig(({ mode }) => ({
  // SERVER CONFIGURATION
  // Configure the development server settings
  server: {
    host: "::",              // Listen on all IPv4 and IPv6 interfaces
    port: 8080,              // Port number for the development server
    hmr: {                   // Hot Module Replacement settings
      overlay: false,        // Disable the error overlay to prevent it from covering the UI
    },
  },
  
  // PLUGINS CONFIGURATION
  // Define plugins that enhance Vite's functionality
  plugins: [
    react(),                                    // Enable React support with SWC
    mode === "development" && componentTagger() // Only enable componentTagger in development mode
  ].filter(Boolean),                          // Remove any falsy values (when componentTagger is not included in production)
  
  // RESOLVE CONFIGURATION
  // Configure how modules are resolved
  resolve: {
    alias: {
      // Create an alias '@' that points to the src directory for easier imports
      // This allows importing from src using @/path instead of ../../path
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  // BASE PATH CONFIGURATION
  // Set the base public path for the application
  base: '/'
  // NOTE: The commented configuration below was previously considered for GitHub Pages deployment
  // base: '/organisedtoast.github.io/'
  // Normally, when hosting on GitHub Pages, you need to set the base path to the repository name.
  // For example, if your repository is named "my-app", you would set base: '/my-app/'
  // However, this didn't work for the original developer, so they set it to '/' according to a forum suggestion.

}));

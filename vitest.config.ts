// IMPORT VITEST CONFIGURATION FUNCTIONS AND PLUGINS
// Import the defineConfig function from Vitest for test configuration
import { defineConfig } from "vitest/config";
// Import the React plugin that enables React support in the test environment
import react from "@vitejs/plugin-react-swc";
// Import the path module to work with file and directory paths
import path from "path";

// EXPORT VITEST CONFIGURATION
// Export the Vitest configuration object that defines how tests are run
export default defineConfig({
  // PLUGINS CONFIGURATION
  // Define plugins that enhance Vitest's functionality
  plugins: [
    react()  // Enable React support with SWC for testing React components
  ],
  
  // TEST CONFIGURATION
  // Configure how Vitest runs tests
  test: {
    environment: "jsdom",                           // Use jsdom environment to simulate browser APIs
    globals: true,                                 // Enable global test functions (describe, test, expect, etc.)
    setupFiles: ["./src/test/setup.ts"],           // Run setup file before each test file
    include: ["src/**/*.{test,spec}.{ts,tsx}"],   // Include all test files in src directory with .test or .spec extensions
  },
  
  // RESOLVE CONFIGURATION
  // Configure how modules are resolved during testing
  resolve: {
    alias: { 
      // Create an alias '@' that points to the src directory for easier imports in tests
      "@": path.resolve(__dirname, "./src") 
    },
  },
});

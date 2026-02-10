// Import JavaScript configuration from ESLint for recommended JavaScript rules
import js from "@eslint/js";
// Import global variables configuration for different environments (browser, node, etc.)
import globals from "globals";
// Import React Hooks ESLint plugin for enforcing React Hooks rules
import reactHooks from "eslint-plugin-react-hooks";
// Import React Refresh ESLint plugin for React Fast Refresh functionality
import reactRefresh from "eslint-plugin-react-refresh";
// Import TypeScript ESLint configuration for TypeScript-specific linting rules
import tseslint from "typescript-eslint";

// Export the ESLint configuration for the project
// This configuration sets up linting rules for TypeScript and React files
export default tseslint.config(
  // Ignore the dist directory (build output)
  { ignores: ["dist"] },
  {
    // Extend recommended configurations from both JavaScript and TypeScript ESLint packages
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    // Specify which files this configuration applies to (all TypeScript and TSX files)
    files: ["**/*.{ts,tsx}"],
    // Language-specific options for parsing and interpretation
    languageOptions: {
      // Set ECMAScript version to 2020 for modern JavaScript features
      ecmaVersion: 2020,
      // Define global variables available in browser environment
      globals: globals.browser,
    },
    // Plugins to extend ESLint functionality with React-specific rules
    plugins: {
      // Configure the React Hooks plugin to enforce rules of hooks
      "react-hooks": reactHooks,
      // Configure the React Refresh plugin for Fast Refresh compatibility
      "react-refresh": reactRefresh,
    },
    // Specific rules to apply to the codebase
    rules: {
      // Include all recommended React Hooks rules
      ...reactHooks.configs.recommended.rules,
      // Warn when non-component exports are found (allowing constant exports)
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // Turn off the unused variables rule from TypeScript ESLint (to avoid duplicate warnings with TypeScript compiler)
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
);

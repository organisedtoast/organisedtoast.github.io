// IMPORT TYPE DEFINITIONS
// Import the Config type from Tailwind CSS for TypeScript support
import type { Config } from "tailwindcss";

// EXPORT TAILWIND CONFIGURATION OBJECT
// This configuration defines how Tailwind CSS will work in the project
export default {
  // DARK MODE CONFIGURATION
  // Enable dark mode using the 'class' strategy (requires adding 'dark' class to HTML element)
  darkMode: ["class"],
  
  // CONTENT PATHS
  // Tell Tailwind which files to scan for class names to include in the final CSS
  content: [
    "./pages/**/*.{ts,tsx}",     // Scan all TypeScript/TSX files in the pages directory
    "./components/**/*.{ts,tsx}", // Scan all TypeScript/TSX files in the components directory
    "./app/**/*.{ts,tsx}",       // Scan all TypeScript/TSX files in the app directory
    "./src/**/*.{ts,tsx}"        // Scan all TypeScript/TSX files in the src directory
  ],
  
  // PREFIX CONFIGURATION
  // Add a prefix to all Tailwind classes (empty string means no prefix)
  prefix: "",
  
  // THEME CONFIGURATION
  // Customize the default Tailwind theme with project-specific values
  theme: {
    // CONTAINER UTILITY
    // Configure the container component for centering content with padding
    container: {
      center: true,               // Center the container horizontally
      padding: "2rem",            // Add horizontal padding to the container
      screens: {
        "2xl": "1400px",         // Define the maximum width for the 2xl breakpoint
      },
    },
    
    // EXTEND DEFAULT THEME
    // Add custom values to override or extend the default Tailwind theme
    extend: {
      // FONT FAMILY CONFIGURATION
      // Define custom font families for headings and body text
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],  // Font for headings
        body: ["Inter", "sans-serif"],             // Font for body text
      },
      
      // COLOR PALETTE
      // Define custom colors that reference CSS variables defined in index.css
      colors: {
        // Basic color references that map to CSS variables
        border: "hsl(var(--border))",              // Border color
        input: "hsl(var(--input))",                // Input field color
        ring: "hsl(var(--ring))",                  // Focus ring color
        background: "hsl(var(--background))",      // Background color
        foreground: "hsl(var(--foreground))",      // Foreground/text color
        
        // PRIMARY COLOR PALETTE
        primary: {
          DEFAULT: "hsl(var(--primary))",          // Default primary color
          foreground: "hsl(var(--primary-foreground))", // Text color on primary background
        },
        
        // SECONDARY COLOR PALETTE
        secondary: {
          DEFAULT: "hsl(var(--secondary))",        // Default secondary color
          foreground: "hsl(var(--secondary-foreground))", // Text color on secondary background
        },
        
        // DESTRUCTIVE COLOR PALETTE (for errors/warnings)
        destructive: {
          DEFAULT: "hsl(var(--destructive))",      // Default destructive color
          foreground: "hsl(var(--destructive-foreground))", // Text color on destructive background
        },
        
        // MUTED COLOR PALETTE (for subtle elements)
        muted: {
          DEFAULT: "hsl(var(--muted))",            // Default muted color
          foreground: "hsl(var(--muted-foreground))", // Text color on muted background
        },
        
        // ACCENT COLOR PALETTE
        accent: {
          DEFAULT: "hsl(var(--accent))",           // Default accent color
          foreground: "hsl(var(--accent-foreground))", // Text color on accent background
        },
        
        // POPOVER COLOR PALETTE
        popover: {
          DEFAULT: "hsl(var(--popover))",          // Default popover color
          foreground: "hsl(var(--popover-foreground))", // Text color on popover background
        },
        
        // CARD COLOR PALETTE
        card: {
          DEFAULT: "hsl(var(--card))",             // Default card color
          foreground: "hsl(var(--card-foreground))", // Text color on card background
        },
        
        // SIDEBAR COLOR PALETTE
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",      // Sidebar background color
          foreground: "hsl(var(--sidebar-foreground))",   // Sidebar text color
          primary: "hsl(var(--sidebar-primary))",         // Sidebar primary color
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))", // Text on sidebar primary
          accent: "hsl(var(--sidebar-accent))",           // Sidebar accent color
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",   // Text on sidebar accent
          border: "hsl(var(--sidebar-border))",           // Sidebar border color
          ring: "hsl(var(--sidebar-ring))",               // Sidebar focus ring color
        },
      },
      
      // BORDER RADIUS VALUES
      // Define custom border radius sizes that reference the CSS variable
      borderRadius: {
        lg: "var(--radius)",                        // Large border radius
        md: "calc(var(--radius) - 2px)",            // Medium border radius
        sm: "calc(var(--radius) - 4px)",            // Small border radius
      },
      
      // KEYFRAMES FOR ANIMATIONS
      // Define custom animation keyframes for UI transitions
      keyframes: {
        // Accordion down animation - expands content
        "accordion-down": {
          from: {
            height: "0",                            // Start with zero height
          },
          to: {
            height: "var(--radix-accordion-content-height)", // End with full height
          },
        },
        
        // Accordion up animation - collapses content
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)", // Start with full height
          },
          to: {
            height: "0",                           // End with zero height
          },
        },
      },
      
      // ANIMATION CLASSES
      // Define animation classes that use the keyframes above
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",  // Apply accordion down animation
        "accordion-up": "accordion-up 0.2s ease-out",      // Apply accordion up animation
      },
    },
  },
  
  // PLUGINS
  // Additional functionality for Tailwind CSS
  plugins: [require("tailwindcss-animate")],       // Plugin for additional UI animations
} satisfies Config;

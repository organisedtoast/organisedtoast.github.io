/*
 * Import the clsx function and ClassValue type from the clsx library
 * clsx is a utility for constructing class name strings conditionally
 * ClassValue is a type that represents possible values that can be passed to clsx
 */
import { clsx, type ClassValue } from "clsx";

/*
 * Import the twMerge function from the tailwind-merge library
 * twMerge intelligently merges Tailwind CSS classes, handling conflicts properly
 * For example, it will correctly handle conflicts like "text-red-500 text-blue-600" by keeping the last one
 */
import { twMerge } from "tailwind-merge";

/*
 * Utility function that combines class names with intelligent merging
 * This function accepts multiple class name inputs and returns a merged string
 * It's particularly useful in React components where you want to conditionally apply classes
 * 
 * Example usage:
 * cn("text-red-500", "font-bold", condition && "bg-blue-300", falsyValue && "hidden")
 * 
 * @param inputs - A spread of class values that can be strings, booleans, objects, or arrays
 * @returns A merged string of class names with conflicts resolved properly
 */
export function cn(...inputs: ClassValue[]) {
  // First, use clsx to process the inputs and handle conditional class names
  // Then, use twMerge to intelligently merge Tailwind classes and resolve conflicts
  return twMerge(clsx(inputs));
}
